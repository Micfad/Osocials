const categorySelect = document.getElementById('selectCategory');
const platformSelect = document.getElementById('selectPlatform');
const taskOptionsSelect = document.getElementById('taskOptions');
const checkoutCont = document.getElementById('checkout_container'); 

// Tasks for Instagram, Facebook, and other platforms
const instagramTasks = [
    'Add my own task', 'make a reel using sound',
    'Comment on post feed', 'Comment on reel',
    'Customized comment', 'Engage on story post',
    'Follow a page', 'Like a post feed',
    'Like a reel', 'Premium comment on post',
    'Save a post', 'Share a post to story',
    'Wish someone a Happy Birthday', 'Wish someone a Happy International Women\'s Day'
];



const facebookTasks = [
    'Add my own task',
    'make a video using sound',
    'Comment on a post',
    'Follow a page',
    'Like a post',
    'Premium comment on a post',
    'Share a content to Facebook'
];

const twitterTasks = [
    'Add my own task',
    'Comment on a tweet',
    'Follow a page',
    'Like a tweet',
    'Premium comment on a tweet',
    'Retweet a tweet'
];

const youtubeTasks = [
    'Add my own task',
    'Comment on a video',
    'Like a video',
    'Like a YouTube short',
    'Premium comment on a video',
    'Subscribe to a channel'
];

const snapchatTasks = [
    'Follow a page',
    'View story',
    'make a video using sound'
];

const telegramTasks = [
    'React to a post on channel (+ Views)',
    'Subscribe to a channel'
];

const whatsappTasks = [
    'Add my own task',
    'Post a content'
];

const tiktokTasks = [
    'Add my own task','make a video using sound',
    'Comment on post', 'Favorite a post',
    'Like a post', 'Follow a page',
    'Premium comment on a video',
    'Repost a video', 'Stitch a video',
    'Duet a video'
];

const playstoreTasks = [
    'Add my own task',
    'Download a mobile application',
    'rate a mobile application',
    'Review a  mobile application',
    'Download, Rate, and Review a mobile application'
];

const appstoreTasks = [
    'Add my own task',
    'Download a mobile application',
    'rate a mobile application',
    'Review a  mobile application',
    'Download, Rate, and Review a mobile application'
];

const bbnTasks = [
    'Add my own task',
    'Vote for someone'
];

const spotifyTasks = [
    'Add my own task',
    'Follow a profile',
    'Stream a song'
];

const AudiomackTasks = [
    'Add my own task',
    'Follow a profile',
    'Stream a song',
     'Like a song'
];

const AppleMsoundCloudTasks = [
    'Add my own task',
    'Stream a song'
];

const reviewTasks = [
    'Add my own task',
    'Write a website review'
];



// Platforms for the categories
const platforms = {
    social: ['Tiktok', 'Instagram', 'Facebook', 'YouTube', 'Twitter', 'Snapchat', 'WhatsApp', 'Telegram'],
    mobile: ['Playstore', 'Apple Store'],
    votes: ['BBN'],
    music: ['Apple Music', 'Spotify', 'Audiomack', 'SoundCloud'],
    review: ['Review'],
    create_mine: ['Custom Gig'] // "Custom Gig" is here
};

// Get all myown_div1 elements
const myOwnDivs = document.querySelectorAll('.myown_div1');

// Function to show or hide myown_div1 elements based on platform selection
function toggleMyOwnDivs(show) {
    myOwnDivs.forEach(div => {
        div.style.display = show ? 'block' : 'none'; // Show or hide based on the "show" flag
    });
}

// Update platform select options when category changes
categorySelect.addEventListener('change', function() {
    // Revert selectPlatform to default
    platformSelect.innerHTML = '<option value="">--Select Platform--</option>';
    taskOptionsSelect.innerHTML = '<option value="">--Select--</option>'; // Clear task options

    const selectedCategory = categorySelect.value;

    // Check if the category exists in the platforms object
    if (platforms[selectedCategory]) {
        platforms[selectedCategory].forEach(function(platform) {
            const option = document.createElement('option');
            option.value = platform;
            option.text = platform;
            platformSelect.appendChild(option);
        });
    }
});

// Update Div 2 with platform-specific tasks when a platform is selected
platformSelect.addEventListener('change', function() {
    const selectedPlatform = platformSelect.value;

    // Clear existing task options
    taskOptionsSelect.innerHTML = '<option value="">--Select Task--</option>';

    if (selectedPlatform === 'Custom Gig') {
        // If "Custom Gig" is selected, only show "Add my own task"
        const option = document.createElement('option');
        option.value = 'Add my own task';
        option.text = 'Add my own task';
        taskOptionsSelect.appendChild(option);

        // Show all myown_div1 elements
        toggleMyOwnDivs(true);
    } else {
        // Hide myown_div1 elements for other platforms
        toggleMyOwnDivs(false);

        // Handle other platform-specific tasks
        switch (selectedPlatform) {
            case 'Instagram':
                instagramTasks.forEach(addTaskOption);
                break;
            case 'Facebook':
                facebookTasks.forEach(addTaskOption);
                break;
            case 'Twitter':
                twitterTasks.forEach(addTaskOption);
                break;
            case 'YouTube':
                youtubeTasks.forEach(addTaskOption);
                break;
            case 'Snapchat':
                snapchatTasks.forEach(addTaskOption);
                break;
            case 'Telegram':
                telegramTasks.forEach(addTaskOption);
                break;
            case 'WhatsApp':
                whatsappTasks.forEach(addTaskOption);
                break;
            case 'Tiktok':
                tiktokTasks.forEach(addTaskOption);
                break;
              case 'Playstore': // Include Playstore handling here
                playstoreTasks.forEach(addTaskOption);
                break;
             case 'Apple Store': // Include Playstore handling here
                appstoreTasks.forEach(addTaskOption);
                break;
             case 'BBN': // Include Playstore handling here
                bbnTasks.forEach(addTaskOption);
                break;
             case 'Apple Music': // Include Playstore handling here
                AppleMsoundCloudTasks.forEach(addTaskOption);
                break;
             case 'SoundCloud': // Include Playstore handling here
                AppleMsoundCloudTasks.forEach(addTaskOption);
                break;
             case 'Spotify': // Include Playstore handling here
                spotifyTasks.forEach(addTaskOption);
                break;
             case 'Audiomack': // Include Playstore handling here
                AudiomackTasks.forEach(addTaskOption);
                break;
             case 'Review': // Include Playstore handling here
                reviewTasks.forEach(addTaskOption);
                break;
            default:
                taskOptionsSelect.innerHTML = '<option value="">--Select--</option>';
        }
    }
});

// Helper function to add task options to the dropdown
function addTaskOption(task) {
    const option = document.createElement('option');
    option.value = task;
    option.text = task;
    taskOptionsSelect.appendChild(option);
}


const amountToPay = document.getElementById('amount_2_pay');
const numOfFreelancers = document.getElementById('num_of_freelancers');
const title = document.getElementById('title');
const nextBtn = document.getElementById('next');
const nextBtn1 = document.getElementById('next1');
const divs = [document.getElementById('div1'), document.getElementById('div2'), document.getElementById('div3'), document.getElementById('div4')];
// Getting the 'Summary' button from div3
const summaryBtn = document.getElementById('Summary');

// Get the error message span
const errorMsg = document.getElementById('errormsg');
const errordiv = document.getElementById('errordiv');

// Function to show error message
function displayErrorMessage(message) {
    errorMsg.textContent = message;
     errordiv.style.display = 'block';
    errorMsg.style.display = 'block'; // Show the error message
}

// Function to clear error message
function clearErrorMessage() {
    errorMsg.textContent = '';
     errordiv.style.display = 'none';
    errorMsg.style.display = 'none'; // Hide the error message
}

// Validation for div1
function validateDiv1() {
    clearErrorMessage(); // Clear previous errors
    if (categorySelect.value === '' || platformSelect.value === '') {
        displayErrorMessage('Please select both a category and a platform.');
        return false;
    }
    return true;
}

// Validation for div2
function validateDiv2() {
    clearErrorMessage(); // Clear previous errors
    const selectedTask = taskOptionsSelect.value;

    // Ensure a valid task option is selected
    if (selectedTask === '' || selectedTask === '--Select option--') {
        displayErrorMessage('Please select a valid task option.');
        return false;
    }

     // Validate amountToPay: Check if valid number and >= 1000
    if (parseInt(amountToPay.value) < 100) {
        displayErrorMessage('Too small. Start from N100 upward.');
        return;
    }

    // Validate if "Add my own task" is selected
    
    if (selectedTask === 'Add my own task') {
        // Validate amountToPay (not empty, valid number, and at least 1 Naira)
        if (amountToPay.value === '' || isNaN(amountToPay.value) || !isValidNumberInput(amountToPay.value) || parseInt(amountToPay.value) < 1) {
            displayErrorMessage('Please enter a valid amount (at least 1000 Naira).');
            return false;
        }

        // Validate numOfFreelancers is not empty and is a valid number
        if (numOfFreelancers.value === '' || !isValidNumberInput(numOfFreelancers.value)) {
            displayErrorMessage('Please fill in the number of freelancers.');
            return false;
        }
    } 
    return true;
}


function validateDiv3() {
    clearErrorMessage(); // Clear previous errors

    const selectedTask = taskOptionsSelect.value;
    const linkToPost = document.getElementById('link_2_post').value;
    const proof = document.getElementById('proof').value;

    // Validate link to post (URL format)
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(linkToPost)) {
        displayErrorMessage('Please enter a valid URL.');
        return false; // Return false if validation fails
    }

    // Validate proof field
    if (proof === '') {
        displayErrorMessage('Please select a valid proof.');
        return false; // Return false if validation fails
    }

    // Validate title if "Add my own task" is selected
    if (selectedTask === 'Add my own task') {
        if (title.value.trim() === '') {
            displayErrorMessage('Please provide a title.');
            return false; // Return false if validation fails
        }
    }

    return true; // Return true if all validations pass
}

// Helper function to check for valid number input (no leading zero, positive number)
function isValidNumberInput(value) {
    return /^[1-9]\d*$/.test(value); // Ensures no leading zeros and valid positive integer
}



// Function to navigate between divs
function navigateDivs(currentDivIndex, nextDivIndex) {
    let isValid = true;

    if (currentDivIndex === 0) {
        isValid = validateDiv1(); // Validate div1 before moving to div2
    } else if (currentDivIndex === 1) {
        isValid = validateDiv2(); // Validate div2 before moving to div3
    } else if (currentDivIndex === 2) {
        isValid = validateDiv3(); // Validate div3 before moving to div4
    }

    if (isValid) {
        divs[currentDivIndex].style.display = 'none';
        divs[nextDivIndex].style.display = 'block';
    }
}


const premiumCheckbox = document.getElementById('premium_checkbox');

// Event listener to prevent checking the premium checkbox if the platform is not TikTok
premiumCheckbox.addEventListener('click', function () {
    const selectedPlatform = platformSelect.value;

    if (selectedPlatform !== 'Tiktok') {
        premiumCheckbox.checked = false;
        alert('Premium freelancers are only available for TikTok tasks.');
    }
});






// Assuming TaskPoints.js has been included in your HTML
summaryBtn.addEventListener('click', function () {
    clearErrorMessage(); // Clear any previous error messages

    // Run validation for div3 (or other validations)
    if (validateDiv3()) {
        // If validation passes, start the animation
        startTxtAnimation();

        // Get selected platform, task, and number of freelancers
        const platform = document.getElementById('selectPlatform').value;
        const task = document.getElementById('taskOptions').value;
        const numOfFreelancers = parseInt(document.getElementById('num_of_freelancers').value);
        const enteredAmount = parseInt(document.getElementById('amount_2_pay').value);

        try {
            // Check if the selected task is 'Add my own task'
            let totalPoints;
            if (task === 'Add my own task') {
                 updateSummary();
                // Use the amount entered in #amount_2_pay_div0 for calculations
                totalPoints = enteredAmount * numOfFreelancers;
            } else {
                // Call updateSummary to update Div 4
                updateSummary();
                // Initialize TaskPoints class
                const taskPoints = new TaskPoints();

                // Get points for the selected platform and task
                const pointsPerTask = taskPoints.getPoints(platform, task);
                        if (premiumCheckbox.checked) {
                totalPoints = 4 * pointsPerTask * numOfFreelancers;
                } else {
                totalPoints = pointsPerTask * numOfFreelancers;
                }

            }

            // Simulate a delay for the UI (mimicking "processing" time)
            setTimeout(() => {
                // Display the calculated task fee after the delay
                document.getElementById('tasker_fee').textContent = totalPoints;

                // Move to div4 (summary) and show checkout container
                navigateDivs(2, 3);
                checkoutCont.style.display = "block"; // Show the checkout container

                // Stop the animation
                stopTxtAnimation();
            }, 2000); // 3-second delay to mimic "processing" behavior

        } catch (error) {
            // Handle any calculation errors
            displayErrorMessage('An error occurred while calculating the task fee.');
            console.error('Error:', error);
            stopTxtAnimation();  // Stop the animation in case of error
        }
    } else {
        // If validation fails, ensure the animation and checkout container are hidden
        checkoutCont.style.display = "none"; // Hide checkout container if validation fails
        stopTxtAnimation();  // Ensure animation stops if validation fails
    }
});




// Event listeners for other navigation buttons
nextBtn.addEventListener('click', () => navigateDivs(0, 1)); // Moving from div1 to div2
nextBtn1.addEventListener('click', () => navigateDivs(1, 2)); // Moving from div2 to div3


// Get all myown_div1 and row0 elements
const row0Elements = document.querySelectorAll('.row0');

// Function to show or hide elements based on task selection
function toggleTaskElements(show) {
    myOwnDivs.forEach(div => {
        div.style.display = show ? 'block' : 'none'; // Show or hide myown_div1 elements
    });
    row0Elements.forEach(row => {
        row.style.display = show ? 'flex' : 'none'; // Show or hide row0 elements
    });
}

// Event listener for taskOptionsSelect dropdown
taskOptionsSelect.addEventListener('change', function () {
    const selectedTask = taskOptionsSelect.value;
    
    if (selectedTask === 'Add my own task') {
        toggleTaskElements(true); // Show myown_div1 and row0 elements
    } else {
        toggleTaskElements(false); // Hide myown_div1 and row0 elements
    }
});






const txtAnimation = document.getElementById('txt_animation');

// Helper function to show the "calculating..." animation
function startTxtAnimation() {
    txtAnimation.classList.add('blink');  // Add blinking animation
    txtAnimation.classList.add('dots');   // Add dots animation
    txtAnimation.style.display = 'block'; // Make the text visible
    txtAnimation.innerHTML = 'Calculating';  // Set the inner text
}

// Function to stop the animation and hide it
function stopTxtAnimation() {
    txtAnimation.classList.remove('blink', 'dots'); // Remove the animations
    txtAnimation.style.display = 'none'; // Hide the text
}

// Function to get user inputs and update summary
function updateSummary() {
    // Get all user inputs
    const category = document.getElementById('selectCategory').value;
    const platform = document.getElementById('selectPlatform').value;
    const todo = document.getElementById('taskOptions').value;
    const amountToPay = document.getElementById('amount_2_pay').value;
    const numOfFreelancers = document.getElementById('num_of_freelancers').value;
    const title = document.getElementById('title').value;
    const instructions = document.getElementById('Instructions').value;
    const linkToPost = document.getElementById('link_2_post').value;
    const proof = document.getElementById('proof').value;
    const premiumFreelancer = document.getElementById('premium_checkbox').checked ? "Yes" : "No"; // Get the checkbox value
    
    // Map values to spans in the summary div
    document.getElementById('category').textContent = category || 'N/A';
    document.getElementById('platform').textContent = platform || 'N/A';
    document.getElementById('todo').textContent = todo || 'N/A';
    document.getElementById('pay_freelancers').textContent = amountToPay || 'N/A';
    document.getElementById('number_of_freelancers').textContent = numOfFreelancers || 'N/A';
    document.getElementById('title_0').textContent = title || 'N/A';
    document.getElementById('Instructions_0').textContent = instructions || 'N/A';
    document.getElementById('link').textContent = linkToPost || 'N/A';
    document.getElementById('Proof1').textContent = proof || 'N/A';
    document.getElementById('premium_freelancer').textContent = premiumFreelancer; // Display premium freelancer info
    
    // Add hover event listeners to make the spans display full text on hover
    const clickableSpans = ['category', 'platform', 'todo', 'pay_freelancers', 'premium_freelancer', 'title_0', 'Instructions_0', 'link', 'Proof1'];

    clickableSpans.forEach(spanId => {
        const spanElement = document.getElementById(spanId);

        spanElement.style.cursor = 'pointer';

        // Show popup on hover
        spanElement.addEventListener('mouseenter', function () {
            showPopup(spanElement.textContent);
        });

        // Hide popup on hover out
        spanElement.addEventListener('mouseleave', function () {
            removePopup();
        });
    });
    
}

// Popup function
function showPopup(text) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = text;
    document.body.appendChild(popup);

    // Style the popup
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '2px solid #000';
    popup.style.zIndex = '1000';
    popup.style.cursor = 'pointer';
}

// Remove popup function
function removePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}



const div2BackIcon = document.getElementById('div2_backicon');
const div3BackIcon = document.getElementById('div3_backicon');
const div4BackIcon = document.getElementById('div4_backicon');
const back2 = document.getElementById('back2');
const back3 = document.getElementById('back3');
const back4 = document.getElementById('back4');
// Function to clear all input fields in the current div before navigating back
function clearInputsInDiv(div) {
    const inputs = div.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; // Clear the value of each input
    });
}

// Function to navigate back and clear inputs in the current div
function navigateBack(currentDivIndex, previousDivIndex) {
    clearInputsInDiv(divs[currentDivIndex]); // Clear input fields in the current div
    divs[currentDivIndex].style.display = 'none';
    divs[previousDivIndex].style.display = 'block';
}

// Add event listeners for back navigation
div2BackIcon.addEventListener('click', () => navigateBack(1, 0)); // From div2 to div1
div3BackIcon.addEventListener('click', () => navigateBack(2, 1)); // From div3 to div2
div4BackIcon.addEventListener('click', () => navigateBack(3, 2)); // From div4 to div3
back2.addEventListener('click', () => navigateBack(1, 0)); // From div2 to div1
back3.addEventListener('click', () => navigateBack(2, 1)); // From div4 to div3
back4.addEventListener('click', () => navigateBack(3, 2)); // From checkout to div4
