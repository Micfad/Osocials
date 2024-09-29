-- Use the created database
USE obtainso_o_db;

-- Create the `users` table (assuming it's already created)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    phone VARCHAR(15) NOT NULL, 
    is_email_verified BOOLEAN DEFAULT 0, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the `wallet` table --
CREATE TABLE IF NOT EXISTS wallet (
    wallet_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    points INT DEFAULT 0, -- Points system instead of currency
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Foreign key to associate the wallet with the user
    CONSTRAINT fk_user_wallet FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- Create the `transactions` table for storing transaction history
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique transaction identifier
    wallet_id INT UNSIGNED NOT NULL, -- Foreign key to reference the user's wallet
    transaction_type ENUM('credit', 'debit') NOT NULL, -- Type of transaction (credit or debit)
    amount INT NOT NULL, -- The amount of points for this transaction
    description VARCHAR(255), -- Optional description of the transaction
    payment_method ENUM('card', 'transfer') DEFAULT NULL, -- Added column to store the payment method (card or transfer)
    task_id INT UNSIGNED DEFAULT NULL, -- Optional reference to task if the transaction is task-related
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the transaction occurred
    -- Foreign key to link with the wallet
    CONSTRAINT fk_wallet_transaction FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id) ON DELETE CASCADE,
    -- Optional foreign key to link the transaction to a task
    CONSTRAINT fk_task_transaction FOREIGN KEY (task_id) REFERENCES client_task_table(task_id) ON DELETE CASCADE
);

 
-- Modify the `client_task_table` to include additional columns and changes
CREATE TABLE IF NOT EXISTS client_task_table (
    task_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Unique task identifier
    client_id INT NOT NULL, -- Foreign key referencing the user who created the task (client)
    task_title VARCHAR(255) NOT NULL, -- Title of the task
   
    category VARCHAR(100), -- Category of the task (e.g., marketing, content writing)
    platform VARCHAR(100), -- Platform where the task will take place (e.g., Facebook, Website)
    number_of_freelancers INT DEFAULT 1, -- Number of freelancers required for the task
    todo TEXT NOT NULL, -- What needs to be done for the task
    points_to_pay INT NOT NULL, -- Points to pay for the completion of the task (calculated at 70% of task fee)
    entered_points INT DEFAULT NULL, -- Points for custom tasks (entered as amount_2_pay)
    premium_freelancer BOOLEAN DEFAULT 0, -- Whether premium freelancers are required (1: Yes, 0: No)
    instructions TEXT, -- Specific instructions for the task
    task_link VARCHAR(255), -- Link associated with the task (e.g., for submission or reference)
    proof TEXT, -- Type of proof required to confirm task completion
    points_paid INT DEFAULT 0, -- This is updated when freelancers are paid
    tasker_fee INT NOT NULL, -- Total fee the client pays for the task
    deadline DATE, -- Deadline for task completion
    status ENUM('active', 'suspended', 'completed', 'rejected') DEFAULT 'active', -- Status of the task
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the task was created
    -- Foreign key to associate task with the user (client)
    CONSTRAINT fk_client_task FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE

);



-- Modify the `freelancer_tasks` table to include additional columns
CREATE TABLE IF NOT EXISTS freelancer_tasks (
    freelancer_task_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for the freelancer task entry
    freelancer_id INT NOT NULL, -- Foreign key referencing the user who is performing the task (freelancer)
    task_id INT NOT NULL, -- Foreign key referencing the task from client_task_table
    status ENUM('accepted', 'in_progress', 'completed', 'rejected') DEFAULT 'in_progress', -- Task status for the freelancer
    completed_task_proof TEXT, -- Proof submitted by the freelancer after completing the task
    task_point_earned INT, -- Points earned by the freelancer after completing the task
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the task was assigned to the freelancer
    completed_at TIMESTAMP NULL, -- When the task was completed
    -- Foreign key to associate the task with the freelancer
    CONSTRAINT fk_freelancer_task FOREIGN KEY (freelancer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    -- Foreign key to associate with the task created by a client
    CONSTRAINT fk_task_freelancer FOREIGN KEY (task_id) REFERENCES client_task_table(task_id) ON DELETE CASCADE
);

-- Create the `high_freelancers` table and associate it with the `users` table
CREATE TABLE IF NOT EXISTS high_freelancers (
    high_freelancer_id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for high_freelancers entry
    user_id INT NOT NULL, -- Foreign key referencing the user who is a high freelancer
    number_of_followers INT NOT NULL, -- Number of followers for the high freelancer
    socialmedia ENUM('tiktok', 'facebook', 'instagram', 'twitter') NOT NULL, -- Social media platform
    social_media_status ENUM('verified', 'unverified') DEFAULT 'unverified', -- Social media verification status
    status ENUM('approved', 'pending') DEFAULT 'pending', -- Approval status (default is pending)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the record was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- When the record was last updated
    -- Foreign key to associate the high freelancer with the users table
    CONSTRAINT fk_high_freelancer_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create index for faster lookups on client_id in client_task_table
CREATE INDEX idx_client_id ON client_task_table(client_id);

-- Create index for faster lookups on freelancer_id in freelancer_tasks
CREATE INDEX idx_freelancer_id ON freelancer_tasks(freelancer_id);

-- Create index for faster lookups on task_id in freelancer_tasks
CREATE INDEX idx_task_id ON freelancer_tasks(task_id);

-- Create index for faster lookups on wallet_id in transactions
CREATE INDEX idx_wallet_id ON transactions(wallet_id);

-- Optionally, create an index for task_id in transactions for task-related transactions
CREATE INDEX idx_task_id_on_transactions ON transactions(task_id);
