const bcrypt = require('bcrypt');
const db = require('../db'); // Database connection
const sendVerificationEmail = require('../utils/sendVerificationEmail'); // Assume this utility sends email
const crypto = require('crypto'); // For generating verification tokens
const { check, validationResult } = require('express-validator'); // Import express-validator

class SignUpController {
    
    // Validation rules for sign-up
    static validateSignUp() {
        return [
            check('username', 'Username is required').notEmpty(),
            check('email', 'Please provide a valid email').isEmail(),
            check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
            check('first_name', 'First name is required and must contain only letters').isAlpha().notEmpty(),
            check('last_name', 'Last name is required and must contain only letters').isAlpha().notEmpty(),
            check('phone', 'Phone number must be a valid 10-digit number').isNumeric().isLength({ min: 10, max: 10 })
        ];
    }

    static async handleSignUp(req, res) {
        // Validate the input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, first_name, last_name, phone } = req.body;

        try {
            // Check if the user already exists
            const userExists = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (userExists.length > 0) {
                return res.status(400).json({ error: 'User with this email already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate a verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');

            // Insert the new user into the database
            const result = await db.query(
                `INSERT INTO users (username, email, password, first_name, last_name, phone, is_email_verified, verification_token) 
                VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
                [username, email, hashedPassword, first_name, last_name, phone, verificationToken]
            );

            // Send verification email
            const userId = result.insertId;
            const verificationLink = `${process.env.APP_URL}/verify-email?token=${verificationToken}&id=${userId}`;
            await sendVerificationEmail(email, verificationLink);
    
            // Render verify.html after signup
            res.render('verify', { first_name });

        } catch (error) {
            console.error('Error during sign-up:', error);
            res.status(500).json({ error: 'An error occurred during sign-up. Please try again later.' });
        }
    }

    // Email verification method
    static async verifyEmail(req, res) {
        const { token, id } = req.query;

        try {
            // Check if token and user exist
            const user = await db.query('SELECT * FROM users WHERE user_id = ? AND verification_token = ?', [id, token]);
            if (user.length === 0) {
                return res.status(400).json({ error: 'Invalid or expired verification link.' });
            }

            // Verify the user
            await db.query('UPDATE users SET is_email_verified = 1, verification_token = NULL WHERE user_id = ?', [id]);

            // Redirect to the more_info.html page after successful email verification
            res.redirect('/more_info'); // Assuming you have a route to serve more_info.html
            
        } catch (error) {
            console.error('Error during email verification:', error);
            res.status(500).json({ error: 'An error occurred during email verification. Please try again later.' });
        }
    }
}

module.exports = SignUpController;
