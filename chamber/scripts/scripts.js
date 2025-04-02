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

    // Fetch weather data from OpenWeatherMap API
    async function fetchWeatherData() {
        const apiKey = 'your-api-key'; // Replace with your OpenWeatherMap API key
        const city = 'San Miguel'; // Replace with your desired city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Display weather data
            document.getElementById('current-temperature').textContent = `Temperature: ${data.main.temp}°F`;
            document.getElementById('current-condition').textContent = `Condition: ${data.weather[0].description}`;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Fetch forecast data from OpenWeatherMap API
    async function fetchForecastData() {
        const apiKey = 'your-api-key'; // Replace with your OpenWeatherMap API key
        const city = 'San Miguel'; // Replace with your desired city
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Display forecast data
            const forecast = data.list.slice(0, 3); // Take the first 3 days
            document.getElementById('forecast-day1').textContent = `${forecast[0].main.temp}°F, ${forecast[0].weather[0].description}`;
            document.getElementById('forecast-day2').textContent = `${forecast[1].main.temp}°F, ${forecast[1].weather[0].description}`;
            document.getElementById('forecast-day3').textContent = `${forecast[2].main.temp}°F, ${forecast[2].weather[0].description}`;
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    }

    // Fetch member data and display spotlight
    async function loadSpotlights() {
        try {
            const response = await fetch('members.json');
            const data = await response.json();

            const spotlightsContainer = document.getElementById('spotlights');
            const spotlightMembers = data.members.filter(member => member.membership_level === 'gold' || member.membership_level === 'silver');
            const selectedSpotlights = [];

            // Randomly select 2-3 members to spotlight
            while (selectedSpotlights.length < 3 && spotlightMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
                selectedSpotlights.push(spotlightMembers[randomIndex]);
                spotlightMembers.splice(randomIndex, 1); // Remove selected member from array
            }

            // Display spotlight members
            selectedSpotlights.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('spotlight-card');
                memberCard.innerHTML = `
                    <h4>${member.name}</h4>
                    <p>Membership: ${member.membership_level}</p>
                    <img src="images/${member.image_file_name}" alt="${member.name}">
                    <p>Phone: ${member.phone}</p>
                    <p>Address: ${member.address}</p>
                    <p><a href="${member.website_url}" target="_blank">Visit Website</a></p>
                `;
                spotlightsContainer.appendChild(memberCard);
            });
        } catch (error) {
            console.error('Error loading member data:', error);
        }
    }

    // Call the functions to load weather and spotlights
    fetchWeatherData();
    fetchForecastData();
    loadSpotlights();
});

document.addEventListener("DOMContentLoaded", () => {
    loadPlaces();
    trackLastVisit();
});

function loadPlaces() {
    fetch("data/places.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("discover-grid");
            data.forEach((place, index) => {
                const card = document.createElement("div");
                card.classList.add("place-card");
                card.innerHTML = `
                    <h2>${place.name}</h2>
                    <figure>
                        <img src="${place.image}" alt="${place.name}">
                    </figure>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <button>Learn More</button>
                `;
                container.appendChild(card);
            });
        });
}

function trackLastVisit() {
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");

    const now = Date.now();
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}
