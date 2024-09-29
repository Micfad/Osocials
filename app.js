require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db'); // Database connection
const CreateTaskController = require('./controllers/create_task_controller'); // Updated path for the controller
const DashboardController = require('./controllers/DashboardController');
const taskCenterController = require('./controllers/task_center_controller'); // Import TaskCenterController



const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' ? true : false } // Set to false for development
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check if user is logged in
function checkAuth(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
}

app.get('/', checkAuth, DashboardController.getDashboardData);


// Route for task center
app.get('/task_center', checkAuth, (req, res) => {
  const firstName = req.session.firstName || 'User';
  res.render('task_center', { firstName });
});



// Route for retrieving tasks in batches (using GET with AJAX)
app.get('/task_center_tasks', checkAuth, taskCenterController.getTasks);
app.get('/task_center_created_tasks', checkAuth, taskCenterController.getCreatedTask);
app.get('/task_center_completed_tasks', checkAuth, taskCenterController.getCompletedTasks);
app.get('/task_center_rejected_tasks', checkAuth, taskCenterController.getRejectedTasks);




// Route for wallet
app.get('/wallet', checkAuth, (req, res) => {
  const firstName = req.session.firstName || 'User';
  res.render('wallet', { firstName });
});




// Route for create_task (EJS file in the views folder)
// Route for handling create_task (GET for rendering and POST for submission)
app.route('/create_task')
    .get(checkAuth, CreateTaskController.handleCreateTask)
    .post(checkAuth, CreateTaskController.handleCreateTask);


    
// Route for login page (HTML file in the public folder)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Send the static HTML file
});

// Route to handle login form submission (POST)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.send('Error logging in');
      return;
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.send('Error logging in');
          return;
        }

        if (isMatch) {
          req.session.loggedIn = true;
          req.session.user_id = result[0].user_id; // Use 'user_id' instead of 'id'
          req.session.firstName = result[0].first_name; // Save first name in session (if available)

          // Debugging line to check session content
          console.log('Session after login:', req.session);

          res.redirect('/');
        } else {
          res.send('Invalid email or password');
        }
      });
    } else {
      res.send('Invalid email or password');
    }
  });
});

// Route to handle signup form submission
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.send('Error signing up');
      return;
    }

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error saving data:', err);
        res.send('Error signing up');
        return;
      }

      res.redirect('/login');
    });
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
