// app.js

document.addEventListener('DOMContentLoaded', () => {
    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const role = document.getElementById('role').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        const signupData = { role, username, email, phone, password };

        // Simulate processing state
        showVerifyingElement(); 

        // Simulate API request (backend integration)
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });

        const result = await response.json();
        
        if (response.ok) {
            showSuccessMessage(); // Show success message
            // After a delay, redirect to the respective dashboard
            setTimeout(() => {
                if (role === 'merchant') {
                    window.location.href = 'merchant-dashboard.html';
                } else {
                    window.location.href = 'customer-dashboard.html';
                }
            }, 3000); // Wait for 3 seconds before redirecting
        } else {
            alert(result.message);
        }
    });

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const loginIdentifier = document.getElementById('loginIdentifier').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const loginData = { loginIdentifier, loginPassword };

        // Simulate API request
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = result.role === 'merchant' ? 'merchant-dashboard.html' : 'customer-dashboard.html';
        } else {
            alert('Invalid credentials, please try again!');
        }
    });
});

function showVerifyingElement() {
    const verifyingDiv = document.createElement('div');
    verifyingDiv.id = 'verifyingDiv';
    verifyingDiv.innerHTML = `<div class="verifying-message">
                                  <p>Verifying your information...</p>
                                  <div class="loader"></div>
                              </div>`;
    document.body.appendChild(verifyingDiv);
}

function showSuccessMessage() {
    const verifyingDiv = document.getElementById('verifyingDiv');
    verifyingDiv.innerHTML = `<div class="success-message">
                                  <p>Registration successful!</p>
                                  <p>Redirecting you to your dashboard...</p>
                              </div>`;
}
// In your server.js or app.js file
const io = require('socket.io')(server);

// Notify users when a booking is created
app.post('/api/customer/book', async (req, res) => {
    // existing code for booking...

    // Notify the merchant
    const merchantSocketId = // Get merchant's socket ID based on serviceId
    io.to(merchantSocketId).emit('new-booking', { booking });
    
    // Notify the customer
    io.to(req.user.socketId).emit('booking-confirmed', { booking });
});
const socket = io.connect('http://localhost:3000');

socket.on('new-booking', (data) => {
    alert(`New booking for your service: ${data.booking.serviceId}`);
});

socket.on('booking-confirmed', (data) => {
    alert(`Your booking is confirmed: ${data.booking._id}`);
});

