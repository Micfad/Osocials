// Frontend: create_task_checkout.js

class CreateTaskCheckout {
    constructor() {
        this.checkOutButton = document.getElementById('checkout');
        this.walletBalance = parseInt(document.getElementById('Funds_balance').innerText);
        this.taskerFee = parseInt(document.getElementById('tasker_fee').innerText);
        this.errorMsg = document.getElementById('errormsg');

        // Bind the click event for the checkout button
        this.checkOutButton.addEventListener('click', this.submitTask.bind(this));
    }

    // Method to submit the task
    submitTask() {
        // Check if wallet is funded
        if (this.walletBalance === 0) {
            this.errorMsg.innerText = "Please fund your wallet first.";
            return;
        }

        // Check if wallet balance is sufficient
        if (this.walletBalance < this.taskerFee) {
            this.errorMsg.innerText = "Insufficient funds, please fund your wallet.";
            return;
        }

        // Collect data from the form
        const taskData = {
            category: document.getElementById('category').innerText,
            platform: document.getElementById('platform').innerText,
            number_of_freelancers: document.getElementById('number_of_freelancers').value,
            todo: document.getElementById('todo').innerText,
            pay_freelancers: this.taskerFee,
            premium_freelancer: document.getElementById('premium_checkbox').checked ? 1 : 0,
            title: document.getElementById('title_0').innerText,
            instructions: document.getElementById('Instructions_0').innerText,
            link: document.getElementById('link').innerText,
            proof: document.getElementById('Proof1').innerText
        };

        // Send the data to the server using AJAX
        $.ajax({
            url: '/create-task',
            type: 'POST',
            data: taskData,
            success: (response) => {
                if (response.error) {
                    this.errorMsg.innerText = response.error;
                } else {
                    alert("Task submitted successfully!");
                }
            },
            error: (err) => {
                this.errorMsg.innerText = "An error occurred. Please try again.";
            }
        });
    }
}

// Initialize the class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CreateTaskCheckout();
});
