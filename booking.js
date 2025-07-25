document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const bookedTripsList = document.getElementById('booked-trips');

    // Load booked trips from local storage
    function loadBookedTrips() {
        const bookedTrips = JSON.parse(localStorage.getItem('bookedTrips')) || [];
        bookedTripsList.innerHTML = '';
        bookedTrips.forEach(trip => {
            const li = document.createElement('li');
            li.innerHTML = `<b>Destination:</b> ${trip.destination}<br><b>Date:</b> ${trip.date}<br><b>Traveler:</b> ${trip.name}`;
            bookedTripsList.appendChild(li);
        });
    }

    // Clear error messages
    function clearErrors() {
        document.getElementById('destination-error').textContent = '';
        document.getElementById('date-error').textContent = '';
        document.getElementById('name-error').textContent = '';
    }

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors(); // Clear previous error messages

        const destination = document.getElementById('destination').value;
        const date = document.getElementById('travel-date').value;
        const name = document.getElementById('traveler-name').value;

        let valid = true; // Flag to track form validity

        const bookedTrips = JSON.parse(localStorage.getItem('bookedTrips')) || [];
        if (bookedTrips.length > 0) {
            alert('You already have a trip booked. You cannot book another trip.');
            return;
        }

        // Validate destination
        else if (!destination) {
            document.getElementById('destination-error').textContent = 'Please select a destination.';
            valid = false;
        }

        // Validate travel date
        else if (!date) {
            document.getElementById('date-error').textContent = 'Please select a travel date.';
            valid = false;
        }

        // Validate traveler name
        else if (!name) {
            document.getElementById('name-error').textContent = 'Please enter your name.';
            valid = false;
        }

        // Check if there's already a trip booked


        // If all fields are valid, proceed to save the new trip
        if (valid) {
            const newTrip = { destination, date, name };

            // Save new trip to local storage
            bookedTrips.push(newTrip);
            localStorage.setItem('bookedTrips', JSON.stringify(bookedTrips));

            // Clear the form
            form.reset();

            // Reload booked trips
            loadBookedTrips();
        }
    });

    // Initial load of booked trips
    loadBookedTrips();
});
