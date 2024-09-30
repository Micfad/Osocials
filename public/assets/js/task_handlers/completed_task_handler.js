export default class AvailableTaskHandler {
    fetchTasks(batch) {
        $.ajax({
             url: '/task_center_completed_tasks', // Fetch completed tasks
            type: 'GET',
            data: { batch: batch }, // Send the current batch number to the server
            success: (response) => {
                $('#display_tasks').html(''); // Clear existing tasks

                $('#available_task_indicator').hide();
                $('#created_task_indicator').hide();
                $('#completed_task_indicator').show();
                $('#rejected_task_indicator').hide();
                if (response.tasks.length === 0) {
                    // No tasks available, show the "No task yet" message
                    $('#nothing').css('display', 'block');
                    $('#nothing_span').text('No completed task yet.');
                } else {
                    // Tasks are available, hide the "No task yet" message
                    $('#nothing').css('display', 'none');

                    // Iterate over the response and append task HTML
                    response.tasks.forEach(task => {
                        // Log the full task object
                        console.log('Task object:', task);

                        // Get platform and log it
                        let platform = task.platform;
                        console.log('Platform:', platform);

                        // Ensure platformIcon is properly defined
                        let platformIcon = this.getPlatformIcon(platform); // Get platform icon URL

                        // Log the selected icon for further troubleshooting
                        console.log('Selected icon URL:', platformIcon);

                        $('#display_tasks').append(`
                            <div class="tasks_loop_divs">
                                <div class="tasks__divs" data-task-id="${task.task_id}"> <!-- Added data-task-id for click event -->
                                     <img style = " margin-right :10px;" class="dinamic_img" src="${platformIcon}" alt="${task.platform} icon" /> <!-- Dynamically added icon -->
    
                                    <div class="task_txt_div">
                                        <span class="task_txt">${task.taskTitle}</span>
                                    </div>
                                    <div class="dinamic_img2_div">
                                        <img class="dinamic_img2" id="dinamic_img_edit" src="assets/img/icons8-edit.png" alt="" />
                                        <img class="dinamic_img2" id="dinamic_img_star" src="assets/img/icons8-star-48.png" alt="" />
                                    </div>
                                </div>
                                <div class="points">
                                    <span class="points">${task.points}</span>
                                </div>
                                <div class="dates">
                                    <span class="time">${new Date(task.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        `);

                        // Add event listener to navigate on task click
                        $('.tasks__divs').on('click', function() {
                            const taskId = $(this).data('task-id');
                            window.location.href = `/task/${taskId}`; // Navigate to task details page
                        });

                        if (task.premium_freelancer === 0) {
                            $('#dinamic_img_star').hide(); // Hide the star image if not premium
                        }
                    });
                }
            },
            error: function(error) {
                console.error('Error fetching tasks:', error);
            }
        });
    }

    // Helper function to return the correct platform icon URL
    getPlatformIcon(platform) {
        const platformIcons = {
            "Facebook": "assets/img/icons8-facebook-50.png",
            "Instagram": "assets/img/icons8-instagram-50.png",
            "Tiktok": "assets/img/icons8-tiktok-50.png",
            "YouTube": "assets/img/icons8-youtube-50.png",
            "Twitter": "assets/img/icons8-twitter-50.png",
            "Snapchat": "assets/img/icons8-snapchat-50.png",
            "WhatsApp": "assets/img/icons8-whatsapp-50.png",
            "Telegram": "assets/img/icons8-telegram-50.png",
            "Playstore": "assets/img/icons8-playstore-50.png",
            "default": "assets/img/icons8-task-50.png" // Default icon for unknown platforms
        };

        return platformIcons[platform] || platformIcons["default"]; // Return the icon URL or the default icon
    }
}
