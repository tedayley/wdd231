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
