const db = require('../db'); // Database connection
const ServerTaskPoints = require('../models/server_task_points'); // Import the ServerTaskPoints class

class taskCenterController {
    // Helper function to process tasks
    static processTasks(tasks) {
        const taskPoints = new ServerTaskPoints();

        return tasks.map(task => {
            let price;
            if (task.todo === 'Add my own task') {
                price = task.points_to_pay;
            } else {
                price = taskPoints.getPoints(task.platform, task.todo);
                if (task.premium_freelancer === 1) {
                    price *= 4;
                }
            }

            return {
                taskTitle: task.todo === 'Add my own task' ? task.task_title : task.todo,
                points: price,
                date: task.created_at
            };
        });
    }

   // Retrieve first batch of tasks (20 tasks) and handle pagination
    static async getTasks(req, res) {
        let { batch = 0 } = req.query;
        const tasksPerPage = 20;
        const offset = batch * tasksPerPage;
        const userId = req.session.user_id; // Get the userId from the session

        try {
        const tasks = await db.query(
                `SELECT task_title, todo, points_to_pay, premium_freelancer, platform, created_at 
                FROM client_task_table 
                WHERE client_id = ? AND status = 'active' 
                ORDER BY created_at DESC
                LIMIT ?, ?`,
                [userId, offset, tasksPerPage] // Use userId from the session
            );

            // Log the result of the query to see its structure
            console.log('Tasks from database:', tasks);

            // Check if the result is an array
            if (!Array.isArray(tasks) || tasks.length === 0) {
                return res.json({ tasks: [] }); // Return an empty array if no tasks found
            }

            const processedTasks = this.processTasks(tasks);
            res.json({ tasks: processedTasks });
        } catch (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).json({ error: 'Error retrieving tasks' });
        }
    }


    // Method to get tasks created by the user but not in freelancer_tasks
    static async getCreatedTask(req, res) {
        let { batch = 0 } = req.query;
        const tasksPerPage = 20;
        const offset = batch * tasksPerPage;
        const userId = req.session.user_id;

        try {
            const tasks = await db.query(
                `SELECT task_title, todo, points_to_pay, premium_freelancer, platform, created_at 
                 FROM client_task_table 
                 WHERE client_id = ? 
                 AND task_id NOT IN (SELECT task_id FROM freelancer_tasks) 
                 LIMIT ?, ?`, 
                 [userId, offset, tasksPerPage]
            );

            // Log the result of the query to see its structure
            console.log('Created tasks from database:', tasks);

            // Check if the result is an array
            if (!Array.isArray(tasks) || tasks.length === 0) {
                return res.json({ tasks: [] }); // Return an empty array if no tasks found
            }

            const processedTasks = this.processTasks(tasks);
            res.json({ tasks: processedTasks });
        } catch (err) {
            console.error('Error retrieving created tasks:', err);
            res.status(500).json({ error: 'Error retrieving created tasks' });
        }
    }

  

  static getCompletedTasks(req, res) {
    const batch = parseInt(req.query.batch, 10) || 0;
    const tasksPerPage = 20;
    const offset = batch * tasksPerPage;

    const query = `
      SELECT task_title, todo, points_to_pay, premium_freelancer, platform, created_at 
      FROM client_task_table
      WHERE status = 'completed'
      ORDER BY created_at DESC
      LIMIT ?, ?`;

    // Execute query
    db.query(query, [offset, tasksPerPage], (err, results) => {
      if (err) {
        console.error('Error retrieving completed tasks:', err);
        return res.status(500).json({ error: 'Error retrieving completed tasks' });
      }

      // Log the actual results
      console.log('Completed tasks from database:', results);

      // Send the result back to the client
      res.json({ tasks: results });
    });
  }



    // Method to get rejected tasks
    static async getRejectedTasks(req, res) {
        let { batch = 0 } = req.query;
        const tasksPerPage = 20;
        const offset = batch * tasksPerPage;

        try {
            const tasks = await db.query(
                `SELECT task_title, todo, points_to_pay, premium_freelancer, platform, created_at 
                 FROM client_task_table 
                 WHERE status = 'rejected' 
                 ORDER BY created_at DESC 
                 LIMIT ?, ?`, 
                 [offset, tasksPerPage]
            );

            // Log the result of the query to see its structure
            console.log('Rejected tasks from database:', tasks);

            // Check if the result is an array
            if (!Array.isArray(tasks) || tasks.length === 0) {
                return res.json({ tasks: [] }); // Return an empty array if no tasks found
            }

            const processedTasks = this.processTasks(tasks);
            res.json({ tasks: processedTasks });
        } catch (err) {
            console.error('Error retrieving rejected tasks:', err);
            res.status(500).json({ error: 'Error retrieving rejected tasks' });
        }
    }
}

module.exports = taskCenterController;
