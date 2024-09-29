// controllers/DashboardController.js

const db = require('../db'); // Your database connection

class DashboardController {
    static getDashboardData(req, res) {
        const userId = req.session.user_id; // Ensure user is logged in

        if (!userId) {
            return res.redirect('/login'); // If user is not logged in, redirect to login
        }

        // Retrieve firstName from the session
        const firstName = req.session.firstName || 'User';

        // Step 1: Fetch Task Done Count
        const query1 = 'SELECT COUNT(*) AS task_done FROM freelancer_tasks WHERE freelancer_id = ? AND status = ?';
        db.query(query1, [userId, 'completed'], (err1, taskDoneResult) => {
            if (err1) {
                console.error('Error fetching task done:', err1);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const task_done = taskDoneResult.length > 0 ? taskDoneResult[0].task_done : '0';

            // Step 2: Fetch Total Earnings using task_point_earned from freelancer_tasks
            const query2 = 'SELECT SUM(task_point_earned) AS total_earnings FROM freelancer_tasks WHERE freelancer_id = ?';
            db.query(query2, [userId], (err2, earningsResult) => {
                if (err2) {
                    console.error('Error fetching total earnings:', err2);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const total_earnings = (earningsResult.length > 0 && earningsResult[0].total_earnings != null)
                    ? earningsResult[0].total_earnings.toFixed(2)
                    : '0.00';

                // Step 3: Fetch Points Balance
                const query3 = 'SELECT points AS fund_balance FROM wallet WHERE user_id = ?';
                db.query(query3, [userId], (err3, pointsBalanceResult) => {
                    if (err3) {
                        console.error('Error fetching points balance:', err3);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const fund_balance = (pointsBalanceResult.length > 0 && pointsBalanceResult[0].fund_balance != null)
                        ? pointsBalanceResult[0].fund_balance.toFixed(2)
                        : '0.00';

                    // Step 4: Render the EJS page with the fetched data
                    return res.render('index', {
                        firstName,        // Include firstName in the render
                        task_done,
                        total_earnings,
                        fund_balance
                    });
                });
            });
        });
    }
}

module.exports = DashboardController;
