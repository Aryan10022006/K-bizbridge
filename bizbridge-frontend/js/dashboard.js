document.addEventListener('DOMContentLoaded', () => {
    // Authentication Check
    if (!localStorage.getItem('token')) {
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = 'signup.html'; // Redirect to signup page
        return; // Prevent further execution
    }

    const merchantName = document.getElementById('merchantName');
    const serviceList = document.getElementById('serviceList');
    
    // Fetch merchant profile details from backend
    fetch('/api/merchant/profile', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(profile => {
        merchantName.textContent = profile.name;
        // Any additional profile details can be displayed here
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Handle profile update
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Profile updated successfully!');
        // Here, we would save the profile information to the backend
    });

    // Handle adding services
    document.getElementById('serviceForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const serviceName = document.getElementById('serviceName').value;
        const servicePrice = document.getElementById('servicePrice').value;
        const serviceSlots = document.getElementById('serviceSlots').value; // New field for time slots
    
        const serviceItem = `<li class="list-group-item">${serviceName} - $${servicePrice} | Available Slots: ${serviceSlots}</li>`;
        document.getElementById('serviceList').insertAdjacentHTML('beforeend', serviceItem);
    
        // Here, we would send the service data to the backend for storage
        fetch('/api/merchant/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ serviceName, servicePrice, serviceSlots }) // Send slots
        }).then(res => res.json()).then(data => {
            console.log('Service added:', data);
        });
    });

    // Mock Analytics
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Profile Views',
                data: [30, 50, 80, 40, 70, 100],
                backgroundColor: 'rgba(108, 99, 255, 0.2)',
                borderColor: '#6C63FF',
                borderWidth: 2,
                fill: true
            }]
        }
    });

    // Handle Webpage Creation
    document.getElementById('createWebpage').addEventListener('click', function () {
        alert('Your webpage has been created and is live!');
        // Here, the backend would generate the webpage for the merchant
    });
});
