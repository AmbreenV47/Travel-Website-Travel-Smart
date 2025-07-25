document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        document.querySelector('.nameError').textContent = '';
        document.querySelector('.emailError').textContent = '';

        // Get form values
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const experience = form.experience.value;
        const feedback = form.feedback.value.trim();

        let valid = true;

        // Validate name
        if (!name) {
            document.querySelector('.nameError').textContent = 'Name is required.';
            valid = false;
        }
        else if(name <= 3){
            document.querySelector('.nameError').textContent = 'Name must be at least 3 characters long.';
            valid = false;
        }

        // Validate email
        else if (!email) {
            document.querySelector('.emailError').textContent = 'Email is required.';
            valid = false;
        } else if (!validateEmail(email)) {
            document.querySelector('.emailError').textContent = 'Please enter a valid email.';
            valid = false;
        }

        // Validate experience selection
        else if (!experience) {
            document.querySelector('.expError').textContent = 'Please select a experience.';
            valid = false;
        }

        // Validate feedback message
        else if (!feedback) {
            document.querySelector('.feedbackError').textContent = 'Please enter your feedback.';
            valid = false;
        }

        // If all fields are valid, show success message
        else if (valid) {
            alert('Feedback submitted successfully!');
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});