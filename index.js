// ============================
// SPLASH SCREEN LOGIC
// ============================
const splashScreen = document.getElementById('splash-screen');

if (splashScreen) {
    splashScreen.style.display = 'flex'; // Show the splash screen

    setTimeout(() => {
        splashScreen.style.opacity = '0'; // Start fading out
        setTimeout(() => {
            splashScreen.style.display = 'none'; // Hide the splash screen
        }, 1000); // Match this with the CSS transition duration
    }, 1600); // Show for 1.6 seconds
}

// ============================
// FORM VALIDATION LOGIC
// ============================
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("pass").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Simple validation (replace with actual authentication logic)
    if (emailInput === "" || passwordInput === "") {
        errorMessage.style.display = "block"; // Show error message for empty fields
        errorMessage.textContent = "Please fill in all fields.";
    } else if (passwordInput === "og") {
        errorMessage.style.display = "none"; // Hide error message
        localStorage.setItem("name", emailInput); // Store email in localStorage
        window.location.href = "home.html"; // Redirect to home page
    } else {
        errorMessage.style.display = "block"; // Show error message for invalid password
        errorMessage.textContent = "Invalid password! Try again.";
    }
});

// ============================
// GOOGLE OAUTH LOGIC
// ============================
function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    // Verify the token with Google API
    fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`)
        .then(res => res.json())
        .then(data => {
            console.log("Google User Data:", data);
            // Store user info in localStorage
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userPicture", data.picture);
            window.location.href = "home.html"; // Redirect to the home page
        })
        .catch(error => console.error('Error:', error));
}

// ============================
// CREATE BUTTON NAVIGATION LOGIC
// ============================
const createButton = document.getElementById("myButton");
if (createButton) {
    createButton.addEventListener("click", function() {
        window.location.href = "create.html"; // Redirect to "create.html"
    });
}
