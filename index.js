// ============================
// SPLASH SCREEN LOGIC
// ============================

// Get the splash screen element by its ID
const splashScreen = document.getElementById('splash-screen');

// Check if the splash screen exists before applying logic
if (splashScreen) {
    splashScreen.style.display = 'flex'; // Initially show the splash screen

    setTimeout(() => {
        splashScreen.style.opacity = '0'; // Begin fading out by setting opacity to 0

        setTimeout(() => {
            splashScreen.style.display = 'none'; // After fading out, completely hide the splash screen
        }, 1000); // This timeout should match the CSS transition duration (1s fade-out)
    }, 1600); // The splash screen remains visible for 1.6 seconds before starting the fade-out
}

// ============================
// PAGE NAVIGATION LOGIC
// ============================

// Check if the 'pages' object exists and is valid before using it
/*if (typeof pages === 'object' && pages !== null) {
    // Iterate over each key in the 'pages' object
    /*Object.keys(pages).forEach(buttonId => {
        // Get the button element by its ID
        const btn = document.getElementById(buttonId);
        
        // Ensure the button exists before adding an event listener
        if (btn) {
            btn.addEventListener('click', function () {
                // Redirect the user to the corresponding page URL from the 'pages' object
                window.location.href = pages[buttonId];
            });
        }
    });
} */

// ============================
// DISPLAY USER GREETING
// ============================

// Retrieve the user's name from localStorage
function validateForm(event) {
    event.preventDefault(); // Prevent page reload

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("pass").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Simple validation (replace with actual authentication logic)
    if (emailInput === "" || passwordInput === "og") {
        errorMessage.style.display = "block"; // Show error message
    } else {
        errorMessage.style.display = "none"; 

        // Store the email (HealthGuru ID) in localStorage
        localStorage.setItem("name", emailInput);

        // Redirect to home page after successful login
        window.location.href = "home.html";
    }
}

// ============================
// CREATE BUTTON NAVIGATION
// ============================

// Get the button that will navigate to the "create.html" page
const createButton = document.getElementById("myButton");

// Ensure the button exists before attaching an event listener
if (createButton) {
    createButton.addEventListener("click", function() {
        window.location.href = "create.html"; // Redirect to "create.html" when clicked
    });
}

// Handle Google OAuth response
function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    // Verify the token with Google API
    fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`)
        .then(res => res.json())
        .then(data => {
            console.log("Google User Data:", data);

            // Store user info in localStorage for later use
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userPicture", data.picture);

            // Redirect to the next page
            window.location.href = "home.html";  // Change to your desired page
        })
        .catch(error => console.error('Error:', error));
}

// ============================
// VALIDATE FORM SUBMISSION
// ============================
function validateForm(event) {
    event.preventDefault();  // Prevent the form from submitting by default

    const email = document.getElementById("email").value;  // Get the entered email
    const password = document.getElementById("pass").value;  // Get the entered password

    // Allow any email but only accept "og" as the valid password
    if (password === "og") {
        alert("Login successful!");
        window.location.href = "home.html";  // Redirect to the home page
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Invalid password! Try again.";
    }
}
