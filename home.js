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
const name = localStorage.getItem('name');

// Get the greeting element where we will display the name
const greetingElement = document.getElementById('allx');

// If the name exists and the element is found, update the greeting message
if (greetingElement && name) {
    greetingElement.innerHTML = `Hello ${name},<br>`; // Display a friendly greeting
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

            // Display user info on the page
            const userInfo = document.createElement('div');
            userInfo.innerHTML = `
                <h4>Welcome, ${data.name}</h4>
                <p>Email: ${data.email}</p>
                <img src="${data.picture}" alt="Profile Image" width="100" />
            `;
            
            const container = document.querySelector('.container.main');
            container.appendChild(userInfo);

            // Store in localStorage or handle authentication flow
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userName", data.name);
        })
        .catch(error => console.error('Error:', error));
}

// Validate Form Submission
function validateForm(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    // Sample validation
    if (email === "test@healthguru.com" && password === "password123") {
        alert("Login successful!");
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
    }
}

