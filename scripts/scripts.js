// Hamburger Menu Toggle
document.getElementById('hamburger-icon').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Wayfinding: Highlight Active Page
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Footer Date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last modified: " + document.lastModified;
