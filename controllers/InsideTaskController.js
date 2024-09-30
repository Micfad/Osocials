const db = require('../db'); // Database connection

class InsideTaskController {
    static async getTask(req, res) {
        const taskId = req.params.id;

        // Ensure user is authenticated
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        try {
            // Query to get task and user details
            const taskQuery = `
                SELECT 
                    ct.*, 
                    u.username AS client_username, 
                    u.email AS client_email 
                FROM client_task_table ct
                JOIN users u ON ct.client_id = u.user_id
                WHERE ct.task_id = ?
            `;
            const taskResults = await db.query(taskQuery, [taskId]);

            if (taskResults.length === 0) {
                return res.status(404).send('Task not found');
            }

            const task = taskResults[0];

            // Render task details in inside_task.ejs
            res.render('inside_task', { 
                task, 
                clientUsername: task.client_username 
            });

        } catch (error) {
            console.error('Error fetching task data:', error);
            res.status(500).send('An error occurred while retrieving the task.');
        }
    }
}

module.exports = InsideTaskController;
