// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {

    // Toggle Mobile Navigation Menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 20, // Adjust for fixed header
                behavior: 'smooth'
            });
        });
    });

    // Simulate Weather Data (Replace with actual weather API call if desired)
    const weatherElement = document.querySelector('.weather-placeholder');
    if (weatherElement) {
        // Example data, replace with actual API call
        const weatherData = {
            temperature: '22°C',
            condition: 'Partly Cloudy',
            city: 'Denver, CO'
        };
        weatherElement.innerHTML = `
            <p>Temperature: ${weatherData.temperature}</p>
            <p>Condition: ${weatherData.condition}</p>
            <p>Location: ${weatherData.city}</p>
        `;
    }

});

// Async function to fetch members data and display it
async function loadMembers() {
    try {
        // Fetch members data from the JSON file
        const response = await fetch('members.json');
        const data = await response.json();

        // Get the container where members will be displayed
        const membersList = document.getElementById('members-list');

        // Loop through the members and create HTML elements for each
        data.members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            // Add member information
            memberCard.innerHTML = `
                <img src="images/${member.image_file_name}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>Phone: ${member.phone}</p>
                <p><a href="${member.website_url}" target="_blank">Visit Website</a></p>
                <p>Membership: ${member.membership_level}</p>
            `;

            // Append the card to the members list container
            membersList.appendChild(memberCard);
        });
    } catch (error) {
        console.error("Error loading members data:", error);
    }
}

// Toggle between grid and list view
document.getElementById('toggle-view').addEventListener('click', () => {
    const membersList = document.getElementById('members-list');
    const button = document.getElementById('toggle-view');

    // Toggle the grid/list class
    membersList.classList.toggle('grid');
    membersList.classList.toggle('list');

    // Toggle button text
    if (membersList.classList.contains('grid')) {
        button.textContent = 'Switch to List View';
    } else {
        button.textContent = 'Switch to Grid View';
    }
});

// Call the loadMembers function when the page loads
window.onload = loadMembers;
