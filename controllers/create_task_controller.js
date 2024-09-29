const db = require('../db'); // Database connection
const ServerTaskPoints = require('../models/server_task_points'); // Import the ServerTaskPoints class
const mysql = require('mysql'); // Assuming you're using mysql or mysql2

class CreateTaskController {
    // Handle both GET (rendering the create_task page) and POST (submitting the task)
    static handleCreateTask(req, res) {
        const userId = req.session.user_id; // Ensure user is logged in
        
        if (!userId) {
            return res.redirect('/login'); // Redirect to login if the user is not logged in
        }

        if (req.method === 'GET') {
            // If it's a GET request, render the create_task page
            const query = 'SELECT points FROM wallet WHERE user_id = ?';
            db.query(query, [userId], (err, result) => {
                if (err) {
                    console.error('Error fetching wallet balance:', err);
                    return res.render('create_task', { walletBalance: 0 }); // Return 0 if an error occurs
                }

                const walletBalance = (result.length > 0 && result[0].points != null) ? result[0].points : 0;
                res.render('create_task', { walletBalance }); // Render the EJS template from views folder
            });
        } else if (req.method === 'POST') {
            // If it's a POST request, handle task submission
            const {
                category,
                platform,
                number_of_freelancers,
                todo,
                pay_freelancers, // This is the tasker_fee submitted from the frontend
                premium_freelancer,
                taskOptions,
                amount_2_pay, // Custom price entered for custom tasks
                title, // Required if taskOptions === 'Add my own task'
                instructions, // Optional
                link,
                proof
            } = req.body;

            // Step 1: Form validation
            let validationErrors = [];

            // Check required fields
            if (!category) validationErrors.push('Category is required');
            if (!platform) validationErrors.push('Platform is required');
            if (!number_of_freelancers || isNaN(number_of_freelancers) || number_of_freelancers <= 0) validationErrors.push('Number of freelancers is required and must be a valid number');
            if (!todo) validationErrors.push('To-do task description is required');
            if (!pay_freelancers || isNaN(pay_freelancers)) validationErrors.push('Tasker fee is required and must be a valid number');
            if (!link) validationErrors.push('Link is required');
            if (!proof) validationErrors.push('Proof type is required');

            // Check custom task-specific fields
            if (taskOptions === 'Add my own task') {
                if (!title) validationErrors.push('Title is required for custom tasks');
                if (!amount_2_pay || isNaN(amount_2_pay) || amount_2_pay <= 0) validationErrors.push('Amount to pay per freelancer is required and must be a valid number for custom tasks');
            }

            // If validation errors exist, return them to the client
            if (validationErrors.length > 0) {
                return res.json({ error: validationErrors });
            }

            // Step 3a: Check wallet balance
            const queryWallet = 'SELECT points FROM wallet WHERE user_id = ?';
            db.query(queryWallet, [userId], (err, result) => {
                if (err || result.length === 0) {
                    return res.json({ error: 'Please fund your wallet first.' });
                }

                const walletBalance = result[0].points;

                // Step 3a: Check if wallet has sufficient funds
                if (walletBalance === 0 || walletBalance < parseInt(pay_freelancers)) {
                    return res.json({ error: 'Insufficient wallet balance. Please fund your wallet.' });
                }

                // Start transaction to ensure atomicity
                db.beginTransaction((err) => {
                    if (err) return res.json({ error: 'An error occurred. Please try again.' });

                    // Initialize ServerTaskPoints to calculate points
                    const taskPoints = new ServerTaskPoints();

                    let totalPoints; // This will store the total points for all freelancers
                    let points_to_pay; // This will store the points for one freelancer

                    try {
                        if (taskOptions === 'Add my own task') {
                            // Custom task logic: amount_2_pay is the amount per freelancer
                            const customTaskFee = parseInt(amount_2_pay);
                            points_to_pay = Math.floor(customTaskFee * 0.7); // Each freelancer is paid 70% of the custom price
                            totalPoints = points_to_pay * parseInt(number_of_freelancers); // Total points for all freelancers
                        } else {
                            // Step 3b: Get task points from the platform and task for predefined tasks
                            points_to_pay = taskPoints.getPoints(platform, todo); // Get points for one freelancer

                            // Step 3c: If it's NOT 'Add my own task' and premium_freelancer is 1
                            if (premium_freelancer == 1) {
                                points_to_pay *= 4; // Multiply points by 4 for premium freelancer
                            }

                            // Freelancers are paid 70% of the points
                            points_to_pay = Math.floor(points_to_pay * 0.7);

                            // Calculate total points for all freelancers
                            totalPoints = points_to_pay * parseInt(number_of_freelancers);
                        }
                    } catch (error) {
                        return res.json({ error: `Task not found for platform: ${platform}, task: ${todo}` });
                    }

                    // Step 3e: Compare total points to the submitted tasker fee
                    if (totalPoints !== parseInt(pay_freelancers)) {
                        return res.json({
                            error: 'The total submitted does not match, please try another browser.'
                        });
                    }

                    // Deduct tasker_fee from client's wallet
                    const updatedWalletBalance = walletBalance - parseInt(pay_freelancers);

                    const updateWalletQuery = 'UPDATE wallet SET points = ? WHERE user_id = ?';
                    db.query(updateWalletQuery, [updatedWalletBalance, userId], (err, result) => {
                        if (err) {
                            db.rollback(() => {
                                return res.json({ error: 'An error occurred while updating wallet balance. Please try again.' });
                            });
                        }

                        // Step 4: Save task to the database
                        const taskQuery = `INSERT INTO client_task_table (client_id, task_title, category, platform, number_of_freelancers, todo, points_to_pay, entered_points, premium_freelancer, instructions, task_link, proof, tasker_fee, status)
                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`;


                        // Insert the entered points for custom tasks if applicable, otherwise set it as NULL
                        const enteredPoints = taskOptions === 'Add my own task' ? parseInt(amount_2_pay) : null;

                        db.query(taskQuery, [userId, title, category, platform, number_of_freelancers, todo, points_to_pay, enteredPoints, premium_freelancer, instructions, link, proof, totalPoints], (err, result) => {
                            if (err) {
                                db.rollback(() => {
                                    return res.json({ error: 'An error occurred while saving the task. Please try again.' });
                                });
                            }

                            const task_id = result.insertId; // Get the newly created task ID

                            // Log the transaction in the transactions table
                            const transactionQuery = `INSERT INTO transactions (wallet_id, transaction_type, amount, description, task_id)
                                                    VALUES ((SELECT wallet_id FROM wallet WHERE user_id = ?), 'debit', ?, 'Task creation', ?)`;

                            db.query(transactionQuery, [userId, parseInt(pay_freelancers), task_id], (err, result) => {
                                if (err) {
                                    db.rollback(() => {
                                        return res.json({ error: 'An error occurred while logging the transaction. Please try again.' });
                                    });
                                }

                                // Commit transaction if everything is successful
                                db.commit((err) => {
                                    if (err) {
                                        db.rollback(() => {
                                            return res.json({ error: 'An error occurred while committing the transaction. Please try again.' });
                                        });
                                    }

                                    return res.json({ success: 'Task submitted successfully!' });
                                });
                            });
                        });
                    });
                });
            });
        }
    }
}

module.exports = CreateTaskController;
