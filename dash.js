// Cache to store loaded content
let cache = {};

// Toggle menu visibility (for mobile or collapsible menu)
document.getElementById('menu').addEventListener('click', function() {
    document.getElementById('main_div').style.display = 'none';
    document.getElementById('menu_div').style.display = 'block';
});

document.getElementById('close_menu').addEventListener('click', function() {
    document.getElementById('main_div').style.display = 'block';
    document.getElementById('menu_div').style.display = 'none';
});

// Function to load a page dynamically and cache the response
function navigate(page) {
    if (cache[page]) {
        // Use cached content if available
        document.getElementById('load_part').innerHTML = cache[page];
    } else {
        // Fetch the content if not cached
        fetch(page)
            .then(response => response.text())
            .then(data => {
                document.getElementById('load_part').innerHTML = data;  // Insert the loaded content into 'load_part'
                cache[page] = data;  // Cache the fetched content
            })
            .catch(error => console.error('Error loading content:', error));
    }
}

// Automatically load 'overview.html' when the page first loads
window.addEventListener('DOMContentLoaded', (event) => {
    navigate('overview.html');  // Automatically load overview when the page loads
});

// Add event listener to dynamically load available_task.html when clicked
document.getElementById('available_task_click').addEventListener('click', function() {
    navigate('available_task.html');  // Load available tasks only when user clicks
});
