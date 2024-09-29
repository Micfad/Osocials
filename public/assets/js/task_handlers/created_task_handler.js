export default class CreatedTaskHandler {
    fetchTasks(batch) { // Accept 'batch' as a parameter for pagination
        $.ajax({
            url: '/task_center_created_tasks', // Fetch created tasks
            type: 'GET',
            data: { batch: batch }, // Send the current batch number to the server
            success: (response) => {
                $('#display_tasks').html(''); // Clear existing tasks
                $('#created_task_indicator').show();
                $('#available_task_indicator').hide();
                $('#completed_task_indicator').hide();
                $('#rejected_task_indicator').hide();
                
                if (response.tasks.length === 0) {
                    // No tasks available, show the "No task yet" message
                    $('#nothing').css('display', 'block');
                    $('#nothing_span').text('you have not created any task yet.');
                } else {
                    // Tasks are available, hide the "No task yet" message
                    $('#nothing').css('display', 'none');

                    // Iterate over the response and append created task HTML
                    response.tasks.forEach(task => {
                        $('#display_tasks').append(`
                            <div class="tasks_loop_divs">
                                <div class="tasks__divs">
                                    <img class="dinamic_img" id="dinamic_img_default" src="assets/img/icons8-task-50.png" style="display:none;" />
                                    <!-- Add other platform icons similarly -->
                                    <div class="task_txt_div">
                                        <span class="task_txt">${task.taskTitle}</span>
                                    </div>
                                    <div class="dinamic_img2_div">
                                        <img class="dinamic_img2" id="dinamic_img_edit" src="assets/img/icons8-edit.png" alt="" />
                                        <img class="dinamic_img2" id="dinamic_img_star" src="assets/img/icons8-star-48.png" alt="" style="display:none;" />
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

                        // Hide all platform icons first
                        $(`
                            #dinamic_img_fb, 
                            #dinamic_img_tk, 
                            #dinamic_img_ig, 
                            #dinamic_img_tw, 
                            #dinamic_img_tele, 
                            #dinamic_img_play, 
                            #dinamic_img_whats, 
                            #dinamic_img_yt, 
                            #dinamic_img_snaps, 
                            #dinamic_img_default
                        `).hide();

                        if (task.premium_freelancer === 1) {
                            $('#dinamic_img_star').show(); // Show the star image if premium
                        }

                        // Use switch to show the correct platform icon
                        switch (task.platform) {
                            case "Facebook":
                                $('#dinamic_img_fb').show(); // Show Facebook icon
                                break;
                            case "Instagram":
                                $('#dinamic_img_ig').show(); // Show Instagram icon
                                break;
                            case "Tiktok":
                                $('#dinamic_img_tk').show(); // Show Tiktok icon
                                break;
                            case "YouTube":
                                $('#dinamic_img_yt').show(); // Show YouTube icon
                                break;
                            case "Twitter":
                                $('#dinamic_img_tw').show(); // Show Twitter icon
                                break;
                            case "Snapchat":
                                $('#dinamic_img_snaps').show(); // Show Snapchat icon
                                break;
                            case "WhatsApp":
                                $('#dinamic_img_whats').show(); // Show WhatsApp icon
                                break;
                            case "Telegram":
                                $('#dinamic_img_tele').show(); // Show Telegram icon
                                break;
                            case "Playstore":
                                $('#dinamic_img_play').show(); // Show Playstore icon
                                break;
                            default:
                                $('#dinamic_img_default').show(); // Show default icon for unknown platforms
                        }
                    });
                }
            },
            error: function(error) {
                console.error('Error fetching created tasks:', error);
            }
        });
    }
}
