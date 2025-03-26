document.addEventListener("DOMContentLoaded", function() {
    // Set the timestamp value when the page loads
    let timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Form validation for organization title
    let orgTitleInput = document.getElementById("organization_title");
    if (orgTitleInput) {
        orgTitleInput.addEventListener("input", function() {
            let pattern = /^[A-Za-z\-\s]{7,}$/;
            if (!pattern.test(orgTitleInput.value)) {
                orgTitleInput.setCustomValidity("Title must be at least 7 characters long and contain only letters, hyphens, or spaces.");
            } else {
                orgTitleInput.setCustomValidity("");
            }
        });
    }

    // Ensure at least one membership level is selected
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            let membershipChecked = document.querySelector("input[name='membership_level']:checked");
            if (!membershipChecked) {
                alert("Please select a membership level.");
                event.preventDefault();
            }
        });
    }
});
