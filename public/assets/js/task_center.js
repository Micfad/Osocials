// Import the task handler classes
import CreatedTaskHandler from './task_handlers/created_task_handler.js';
import CompletedTaskHandler from './task_handlers/completed_task_handler.js';
import RejectedTaskHandler from './task_handlers/rejected_task_handler.js';
import AvailableTaskHandler from './task_handlers/available_task_handler.js';

let currentBatch = 0;
const availableTaskHandler = new AvailableTaskHandler(); // Assuming available tasks are loaded by default

// Load the first batch when the page loads
$(document).ready(function() {
    availableTaskHandler.fetchTasks(currentBatch); // Load the first batch

    // Load the next batch when 'more_task_click' is clicked
    $('#more_task_click').click(function() {
        currentBatch++;
        availableTaskHandler.fetchTasks(currentBatch);
    });

    // Load the previous batch when 'prev_task_click' is clicked
    $('#prev_task_click').click(function() {
        if (currentBatch > 0) {
            currentBatch--;
            availableTaskHandler.fetchTasks(currentBatch);
        }
    });



// Event listeners for click events

// When the created task button is clicked
$('#created_task_click').click(function() {
    const createdTaskHandler = new CreatedTaskHandler();
    currentBatch = 0; // Reset batch
    createdTaskHandler.fetchTasks(currentBatch); // Fetch created tasks
});

// When the completed task button is clicked
$('#completed_task_click').click(function() {
    const completedTaskHandler = new CompletedTaskHandler();
    currentBatch = 0; // Reset batch
    completedTaskHandler.fetchTasks(currentBatch); // Fetch completed tasks
});

// When the rejected task button is clicked
$('#rejected_task_click').click(function() {
    const rejectedTaskHandler = new RejectedTaskHandler();
    currentBatch = 0; // Reset batch
    rejectedTaskHandler.fetchTasks(currentBatch); // Fetch rejected tasks
});

// When the available task button is clicked
$('#available_task_click').click(function() {
    currentBatch = 0; // Reset batch
    availableTaskHandler.fetchTasks(currentBatch); // Fetch available tasks
});


    
});

