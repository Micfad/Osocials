const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer'); // Add Nodemailer

const app = express();
const port = 3000; // Change this to the port your hosting platform provides

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup session management
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name' // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the service
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password' // Replace with your email password or app-specific password if using Gmail
  }
});

// Middleware to check if user is logged in
function checkAuth(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Route for the home page
app.get('/', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dash.html')); // Serve your dashboard page
});

// Route for login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Serve your login page
});

// Route to handle signup form submission
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Save the user data to the database
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.log('Error saving data: ', err);
      res.send('Error signing up');
      return;
    }

    // Generate a simple email verification link (In production, create a real verification token)
    const verificationLink = `http://localhost:${port}/more_info?email=${email}`;

    // Email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Verify your account',
      html: `
        <h3>Hello ${username},</h3>
        <p>Thank you for signing up. Please click the link below to provide additional information and verify your email address:</p>
        <a href="${verificationLink}">Complete Your Registration</a>
        <p>If you did not request this, please ignore this email.</p>
      `
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        res.send('Error sending verification email');
        return;
      }
      console.log('Verification email sent:', info.response);

      // Redirect the user to the verify.html page
      res.redirect('/verify.html');
    });
  });
});

// Route to handle more information (after clicking the verification email link)
app.get('/more_info', (req, res) => {
  const { email } = req.query;

  // Render the more_info.html page (You can use templating engines like EJS, Pug, etc. if needed)
  res.sendFile(path.join(__dirname, 'public', 'more_info.html'));
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.log('Error fetching data:', err);
      res.send('Error logging in');
      return;
    }

    if (result.length > 0) {
      req.session.loggedIn = true; // Mark user as logged in
      res.redirect('/'); // Redirect to dashboard after login
    } else {
      res.send('Invalid email or password');
    }
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.redirect('/login'); // Redirect to login page
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
