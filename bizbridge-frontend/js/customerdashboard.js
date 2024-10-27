document.addEventListener('DOMContentLoaded', () => {
    const customerName = document.getElementById('customerName');
    const bookingList = document.getElementById('bookingList');
    const searchResults = document.getElementById('searchResults');
    const bookingChart = document.getElementById('bookingChart').getContext('2d');

    // Authentication Check
    if (!localStorage.getItem('token')) {
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = 'signup.html'; // Redirect to signup page
    }

    // Fetch profile details from backend
    fetch('/api/customer/profile', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(profile => {
        customerName.textContent = profile.name;
        document.getElementById('profileDetails').innerHTML = `
            <p>Email: ${profile.email}</p>
            <p>Phone: ${profile.phone}</p>
        `;
    });

    // Fetch bookings from backend
    fetch('/api/customer/bookings', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(bookings => {
        bookings.forEach(booking => {
            const li = document.createElement('li');
            li.textContent = `Service: ${booking.serviceName}, Date: ${new Date(booking.date).toLocaleString()}`;
            bookingList.appendChild(li);
        });
    });

    // Fetch booking stats for analytics
    fetch('/api/customer/booking-stats', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(data => {
        new Chart(bookingChart, {
            type: 'line',
            data: {
                labels: data.dates,
                datasets: [{
                    label: 'Bookings',
                    data: data.bookingCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true
            }
        });
    });

    // Search nearby services with filters
    document.getElementById('searchServicesBtn').addEventListener('click', () => {
        const serviceName = document.getElementById('serviceSearch').value;
        const minPrice = document.getElementById('minPrice').value;
        const rating = document.getElementById('rating').value;

        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            fetch(`/api/customer/search?serviceName=${serviceName}&minPrice=${minPrice}&rating=${rating}&lat=${lat}&lng=${lng}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(merchants => {
                searchResults.innerHTML = '';
                merchants.forEach(merchant => {
                    const li = document.createElement('li');
                    li.textContent = `Store: ${merchant.name}, Price: ${merchant.price}, Rating: ${merchant.rating}`;
                    searchResults.appendChild(li);
                });
            });
        });
    });
});
// Fetch available services
fetch('/api/services') // Assuming an endpoint exists to fetch available services
.then(res => res.json())
.then(services => {
    services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = `${service.name} - $${service.price} | Slots: ${service.slots}`;
        li.setAttribute('data-service-id', service._id); // Store service ID for booking
        availableServicesList.appendChild(li);
    });
});

// Handle service booking
document.getElementById('bookServiceBtn').addEventListener('click', () => {
    const serviceId = document.querySelector('#availableServicesList li.selected').dataset.serviceId; // Get selected service ID
    const date = document.getElementById('bookingDate').value;
    const timeSlot = document.getElementById('bookingTimeSlot').value;

    fetch('/api/customer/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ serviceId, date, timeSlot })
    }).then(res => res.json()).then(data => {
        console.log('Booking successful:', data);
        alert('Booking created successfully!');
    }).catch(err => {
        console.error('Error booking service:', err);
    });
});
fetch('/api/customer/bookings')
.then(res => res.json())
.then(bookings => {
    bookings.forEach(booking => {
        const li = document.createElement('li');
        li.textContent = `${booking.serviceId.name} - ${new Date(booking.date).toLocaleString()}`;
        
        // Add buttons for modifying or canceling bookings
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel Booking';
        cancelBtn.addEventListener('click', () => cancelBooking(booking._id));
        li.appendChild(cancelBtn);
        
        customerBookingsList.appendChild(li);
    });
});

function cancelBooking(bookingId) {
    fetch(`/api/customer/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => res.json())
    .then(data => {
        alert('Booking canceled successfully');
        location.reload(); // Reload to update the list
    });
}

// Connect to the WebSocket server
const socket = io.connect('http://localhost:3000'); // Use your actual domain in production

// Listen for real-time booking updates
socket.on('update-booking', (data) => {
    console.log('New booking update received:', data);

    // Update the UI dynamically with new booking data
    const bookingList = document.getElementById('bookingList');
    const newBookingItem = document.createElement('li');
    newBookingItem.textContent = `New booking from ${data.customerName} for ${data.serviceName} at ${data.timeSlot}`;
    bookingList.appendChild(newBookingItem);

    alert('New booking added!');
});
