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

// Footer Date Updates
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last modified: " + document.lastModified;

// Course List Array
const courses = [
    { code: "WDD 130", name: "Web Fundamentals", completed: false },
    { code: "WDD 230", name: "Advanced CSS", completed: false },
    { code: "WDD 330", name: "JavaScript Programming", completed: false },
    { code: "CSE 110", name: "Programming with Python", completed: false },
    { code: "CSE 210", name: "Object-Oriented Programming", completed: false },
    { code: "CSE 310", name: "Data Structures & Algorithms", completed: false }
];

// Mark completed courses (update as needed)
courses.forEach(course => {
    if (["WDD 130", "CSE 110"].includes(course.code)) {  // Replace with your completed courses
        course.completed = true;
    }
});

// Function to display courses
function displayCourses(filter = "all") {
    const courseContainer = document.getElementById("course-list");
    courseContainer.innerHTML = "";  // Clear previous content

    const filteredCourses = courses.filter(course => 
        filter === "all" || course.code.startsWith(filter)
    );

    filteredCourses.forEach(course => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course");
        courseItem.innerHTML = `<strong>${course.code}:</strong> ${course.name}`;
        
        if (course.completed) {
            courseItem.classList.add("completed");  // Apply different styling for completed courses
        }

        courseContainer.appendChild(courseItem);
    });
}

// Event Listeners for Course Filters
document.getElementById("show-all").addEventListener("click", () => displayCourses("all"));
document.getElementById("show-wdd").addEventListener("click", () => displayCourses("WDD"));
document.getElementById("show-cse").addEventListener("click", () => displayCourses("CSE"));

// Initial Course Display
displayCourses();
