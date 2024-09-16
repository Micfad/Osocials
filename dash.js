// Toggle menu visibility
document.getElementById('menu').addEventListener('click', function() {
    document.getElementById('main_div').style.display = 'none';
    document.getElementById('menu_div').style.display = 'block';
});

// Toggle menu visibility
document.getElementById('close_menu').addEventListener('click', function() {
    document.getElementById('main_div').style.display = 'block';
    document.getElementById('menu_div').style.display = 'none';
});


// Navigate to other pages
function navigate(page) {
    window.location.href = page;
}


