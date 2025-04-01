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

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("pass").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (!emailInput || !passwordInput) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.display = "block";
    } else if (passwordInput === "og") {
        localStorage.setItem("userName", emailInput); // Store username/email
        window.location.href = "home.html"; // Redirect to home page
    } else {
        errorMessage.textContent = "Invalid password! Try again.";
        errorMessage.style.display = "block";
    }
});


// ============================
// GOOGLE OAUTH LOGIC
// ============================
// GOOGLE OAUTH LOGIN
function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`)
        .then(res => res.json())
        .then(data => {
            if (data.email && data.name) {
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userName", data.name);
                window.location.href = "home.html"; // Redirect to home
            } else {
                alert("Google login failed. Try again.");
            }
        })
        .catch(error => {
            console.error('Google Auth Error:', error);
            alert("Google authentication failed.");
        });

// ============================
// CREATE BUTTON NAVIGATION LOGIC
// ============================
const createButton = document.getElementById("myButton");
if (createButton) {
    createButton.addEventListener("click", function() {
        window.location.href = "create.html"; // Redirect to "create.html"
    });
}
