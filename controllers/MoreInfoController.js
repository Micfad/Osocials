const db = require('../db'); // Database connection
const { check, validationResult } = require('express-validator');

class MoreInfoController {
    static async updatePersonalInfo(req, res) {
        const { first_name, last_name, phone } = req.body;
        const user_id = req.session.user_id;

        // Validate the fields using express-validator
        await check('first_name', 'First name must be at least 2 characters long and contain only letters.')
            .isAlpha().isLength({ min: 2 }).run(req);
        await check('last_name', 'Last name must be at least 2 characters long and contain only letters.')
            .isAlpha().isLength({ min: 2 }).run(req);
        await check('phone', 'Phone number must be a valid 10-digit number.')
            .isNumeric().isLength({ min: 10, max: 10 }).run(req);

        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Update the user's personal information in the database
            const query = `
                UPDATE users 
                SET first_name = ?, last_name = ?, phone = ? 
                WHERE user_id = ?
            `;
            await db.query(query, [first_name, last_name, phone, user_id]);

            // Redirect to a dashboard or success page after updating information
            res.redirect('/dashboard'); // Replace with the appropriate route

        } catch (error) {
            console.error('Error updating personal info:', error);
            res.status(500).json({ error: 'An error occurred. Please try again later.' });
        }
    }
}

module.exports = MoreInfoController;
