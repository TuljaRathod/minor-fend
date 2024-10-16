import React from 'react';

function TrainSearch() {
    return (
        <div class="form-container">
    <h2>Search Trains for Parcel Delivery</h2>
    <form id="trainSearchForm">
        <label for="fromLocation">From (City/Station)</label>
        <input type="text" id="fromLocation" name="fromLocation" placeholder="Enter departure location" required>

        <label for="toLocation">To (City/Station)</label>
        <input type="text" id="toLocation" name="toLocation" placeholder="Enter destination" required>

        <label for="travelDate">Date of Travel</label>
        <input type="date" id="travelDate" name="travelDate" required>

        <input type="submit" value="Search Trains">
    </form>
</div>

<div class="results-container">
    <div class="train-results" id="trainResults">
        <!-- Trains will be displayed here -->
    </div>
</div>

<div class="confirmation-container" id="confirmationContainer">
    <h2>Confirm Your Parcel Delivery</h2>
    <p id="confirmationMessage"></p>
    <button class="confirm-btn" id="confirmBtn">Confirm</button>
    <button class="cancel-btn" id="cancelBtn">Cancel</button>
</div>

<script>
    // Mock Data for Trains and Passengers
    const trains = [
        {
            id: 1,
            trainName: 'Rajdhani Express',
            from: 'Delhi',
            to: 'Mumbai',
            passengers: [
                { name: 'John Doe', price: 100 },
                { name: 'Jane Doe', price: 50 }
            ]
        },
        {
            id: 2,
            trainName: 'Shatabdi Express',
            from: 'Delhi',
            to: 'Chandigarh',
            passengers: [
                { name: 'Michael Johnson', price: 200 },
                { name: 'Emily Davis', price: 150 }
            ]
        },
        {
            id: 3,
            trainName: 'Duronto Express',
            from: 'Kolkata',
            to: 'Delhi',
            passengers: [
                { name: 'Sarah Williams', price: 100 },
                { name: 'David Brown', price: 150 }
            ]
        }
    ];

    let selectedTrain = null;
    let selectedPassenger = null;

    // Handle Form Submission
    document.getElementById('trainSearchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload on form submit

        const fromLocation = document.getElementById('fromLocation').value.trim().toLowerCase();
        const toLocation = document.getElementById('toLocation').value.trim().toLowerCase();
        const travelDate = document.getElementById('travelDate').value;

        // Filter trains based on departure and destination
        const availableTrains = trains.filter(train => train.from.toLowerCase() === fromLocation && train.to.toLowerCase() === toLocation);

        // Display the results
        const resultsDiv = document.getElementById('trainResults');
        resultsDiv.innerHTML = ''; // Clear previous results

        if (availableTrains.length > 0) {
            availableTrains.forEach(train => {
                // Create train section
                const trainDiv = document.createElement('div');
                trainDiv.classList.add('train');

                // Add train details
                const trainHeader = document.createElement('h3');
                trainHeader.innerText = `${train.trainName} - ${train.from} to ${train.to}`;
                trainDiv.appendChild(trainHeader);

                // Add passenger details for each train
                train.passengers.forEach(passenger => {
                    const passengerDiv = document.createElement('div');
                    passengerDiv.classList.add('passenger');

                    const passengerInfo = `
                        <p>Passenger: ${passenger.name}</p>
                        <p>Delivery Price: ₹${passenger.price}</p>
                    `;

                    passengerDiv.innerHTML = passengerInfo;

                    // Add select button for each passenger
                    const selectButton = document.createElement('button');
                    selectButton.innerText = 'Select';
                    selectButton.classList.add('select-btn');

                    // On select button click, show confirmation
                    selectButton.addEventListener('click', () => {
                        selectedTrain = train;
                        selectedPassenger = passenger;
                        showConfirmation(train, passenger);
                    });

                    passengerDiv.appendChild(selectButton);
                    trainDiv.appendChild(passengerDiv);
                });

                resultsDiv.appendChild(trainDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No trains available for this route.</p>';
        }
    });

    // Show confirmation container
    function showConfirmation(train, passenger) {
        const confirmationContainer = document.getElementById('confirmationContainer');
        const confirmationMessage = document.getElementById('confirmationMessage');

        confirmationMessage.innerHTML = `
            <strong>Train:</strong> ${train.trainName} (${train.from} to ${train.to})<br>
            <strong>Passenger:</strong> ${passenger.name}<br>
            <strong>Price:</strong> ₹${passenger.price}
        `;

        confirmationContainer.style.display = 'block';
    }

    // Handle Confirm button
    document.getElementById('confirmBtn').addEventListener('click', function() {
        alert(`Parcel delivery confirmed with ${selectedPassenger.name} on ${selectedTrain.trainName}.`);
        // Here you can redirect to another page or reset the form
    });

    // Handle Cancel button
    document.getElementById('cancelBtn').addEventListener('click', function() {
        // Hide confirmation and reset selection
        document.getElementById('confirmationContainer').style.display = 'none';
        selectedTrain = null;
        selectedPassenger = null;
    });

</script>
    );
}

export default TrainSearch;
