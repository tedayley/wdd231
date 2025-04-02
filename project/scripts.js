document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Dark Mode";
    toggleButton.style.position = "fixed";
    toggleButton.style.top = "10px";
    toggleButton.style.right = "10px";
    toggleButton.style.padding = "10px";
    toggleButton.style.cursor = "pointer";
    
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});
