const db = require('../db'); // Import the database connection
const bcrypt = require('bcrypt');

class User {
  constructor(username, email, password, firstName, lastName, phone) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }

  async save() {
    try {
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(this.password, 10);

      // Insert user into the database
      const query = 'INSERT INTO users (username, email, password, first_name, last_name, phone, is_email_verified) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [this.username, this.email, hashedPassword, this.firstName, this.lastName, this.phone, 1]; // Assume email verified for now

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error saving user:', err);
          return;
        }
        console.log('User successfully created with ID:', result.insertId);
      });
    } catch (error) {
      console.error('Error in saving user:', error);
    } finally {
      // Close the database connection
      db.end();
    }
  }
}

// Create a new user (this example creates one user)
// Change these details for the user you want to create
const newUser = new User('johndoe', 'johndoe@example.com', 'supersecretpassword', 'John', 'Doe', '1234567890');

// Save the new user in the database
newUser.save();
