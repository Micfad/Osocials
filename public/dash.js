// Menu Toggle for mobile view
document.getElementById('menu').addEventListener('click', function() {
    document.getElementById('main_div').style.display = 'none';
    document.getElementById('menu_div').style.display = 'block';
});

document.getElementById('close_menu').addEventListener('click', function() {
    document.getElementById('main_div').style.display = 'block';
    document.getElementById('menu_div').style.display = 'none';
});

const overview = document.getElementById('OVERVIEW');
const task_center = document.getElementById('TASK_CENTER');
const wallet = document.getElementById('WALLET');
const over_nav_span = document.getElementById('over_span_id');
const task_nav_span = document.getElementById('task_span_id');
const wall_nav_span = document.getElementById('wall_span_id');

const create_task = document.getElementById('create_task');
overview.addEventListener('click', function () {
    if (over_nav_span.innerHTML != "1") {
        window.location.href = '/';  // Redirects to task_center page
   }
   
});


task_center.addEventListener('click', function() {
     if (task_nav_span.innerHTML != "1") {
        window.location.href = '/task_center';  // Redirects to task_center page
   }
   
});

wallet.addEventListener('click', function() {
     if (wall_nav_span.innerHTML != "1") {
        window.location.href = '/wallet';  // Redirects to task_center page
   }
   
});

create_task.addEventListener('click', function() {
   window.location.href = '/create_task';  // Redirects to task_center page
   
});




