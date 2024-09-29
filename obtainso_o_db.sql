-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2024 at 08:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `obtainso_o_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_task_table`
--

CREATE TABLE `client_task_table` (
  `task_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `task_title` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `platform` varchar(100) DEFAULT NULL,
  `number_of_freelancers` int(11) DEFAULT 1,
  `todo` text NOT NULL,
  `points_to_pay` int(11) NOT NULL,
  `premium_freelancer` tinyint(1) DEFAULT 0,
  `instructions` text DEFAULT NULL,
  `task_link` varchar(255) DEFAULT NULL,
  `proof` text DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` enum('active','suspended','completed','rejected') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `entered_points` int(11) DEFAULT NULL,
  `points_paid` int(11) NOT NULL DEFAULT 0,
  `tasker_fee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `freelancer_tasks`
--

CREATE TABLE `freelancer_tasks` (
  `freelancer_task_id` int(11) NOT NULL,
  `freelancer_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `status` enum('accepted','in_progress','completed','rejected') DEFAULT 'in_progress',
  `completed_task_proof` text DEFAULT NULL,
  `task_point_earned` int(11) DEFAULT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `high_freelancers`
--

CREATE TABLE `high_freelancers` (
  `high_freelancer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `number_of_followers` int(11) NOT NULL,
  `socialmedia` enum('tiktok','facebook','instagram','twitter') NOT NULL,
  `social_media_status` enum('verified','unverified') DEFAULT 'unverified',
  `status` enum('approved','pending') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `wallet_id` int(11) NOT NULL,
  `transaction_type` enum('credit','debit') NOT NULL,
  `amount` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `payment_method` enum('card','transfer') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `task_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `is_email_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `first_name`, `last_name`, `phone`, `is_email_verified`, `created_at`, `updated_at`) VALUES
(1, 'johndoe', 'johndoe@example.com', '$2b$10$kB9AVpDyG9d7GsFZh9PfG.LcEjPvfSfG2IitW.1UlWzVeO7Q02CfS', 'John', 'Doe', '1234567890', 1, '2024-09-24 07:56:31', '2024-09-24 07:56:31');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `wallet_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `points` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client_task_table`
--
ALTER TABLE `client_task_table`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `idx_client_id` (`client_id`);

--
-- Indexes for table `freelancer_tasks`
--
ALTER TABLE `freelancer_tasks`
  ADD PRIMARY KEY (`freelancer_task_id`),
  ADD KEY `idx_task_id` (`task_id`),
  ADD KEY `idx_freelancer_id` (`freelancer_id`);

--
-- Indexes for table `high_freelancers`
--
ALTER TABLE `high_freelancers`
  ADD PRIMARY KEY (`high_freelancer_id`),
  ADD KEY `fk_high_freelancer_user` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `idx_wallet_id` (`wallet_id`),
  ADD KEY `idx_task_id_on_transactions` (`task_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `idx_email` (`email`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`wallet_id`),
  ADD KEY `fk_user_wallet` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client_task_table`
--
ALTER TABLE `client_task_table`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `freelancer_tasks`
--
ALTER TABLE `freelancer_tasks`
  MODIFY `freelancer_task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `high_freelancers`
--
ALTER TABLE `high_freelancers`
  MODIFY `high_freelancer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client_task_table`
--
ALTER TABLE `client_task_table`
  ADD CONSTRAINT `fk_client_task` FOREIGN KEY (`client_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `freelancer_tasks`
--
ALTER TABLE `freelancer_tasks`
  ADD CONSTRAINT `fk_freelancer_task` FOREIGN KEY (`freelancer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_task_freelancer` FOREIGN KEY (`task_id`) REFERENCES `client_task_table` (`task_id`) ON DELETE CASCADE;

--
-- Constraints for table `high_freelancers`
--
ALTER TABLE `high_freelancers`
  ADD CONSTRAINT `fk_high_freelancer_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_wallet_transaction` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`wallet_id`) ON DELETE CASCADE;

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `fk_user_wallet` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
