// ============================
// SPLASH SCREEN LOGIC
// ============================
const splashScreen = document.getElementById('splash-screen');

if (splashScreen) {
    splashScreen.style.display = 'flex';

    setTimeout(() => {
        splashScreen.style.opacity = '0';

        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 1600);
}

// ============================
// LOCAL STORAGE HELPER FUNCTION
// ============================
function safeGetItem(key) {
    try {
        return localStorage.getItem(key) || null;
    } catch (error) {
        console.error("LocalStorage access error:", error);
        return null;
    }
}

// ============================
// DISPLAY USER GREETING
// ============================
// DISPLAY USER GREETING
const greetingElement = document.getElementById('user-name');

function displayGreeting() {
    const name = localStorage.getItem('userName');
// your code goes here
    if (greetingElement) {
        greetingElement.textContent = ` ${name}!`;
    }
    else{
        greetingElement.textContent = `Welcome, Guest`;
    }
}

// Show greeting on page load
displayGreeting();

// ============================
// BUTTON NAVIGATION
// ============================
const createButton = document.getElementById("myButton");

if (createButton) {
    createButton.addEventListener("click", () => {
        window.location.href = "consult.html";
    });
}

// ============================
// GOOGLE SIGN-IN LOGIC
// ============================
function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    try {
        const data = jwt_decode(response.credential);
        console.log("Google User Data:", data);

        const userName = data.name || "Guest";

        localStorage.setItem("userName", userName);

        displayGreeting(); // Update greeting with user's name
    } catch (error) {
        console.error("Error decoding Google token:", error);
        alert("Failed to authenticate. Please try again.");
    }
}

// ============================
// LOGOUT LOGIC
// ============================
const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";  // Redirect to login or splash screen
    });
}

// ============================
// GOOGLE AUTH INITIALIZATION
// ============================
google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",  // Replace with your Google Client ID
    callback: handleCredentialResponse,
});

google.accounts.id.prompt();  // Display Google One Tap prompt



    window.addEventListener('scroll', function () {
        const section = document.querySelector('.animate-on-scroll');
        const sectionTop = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionTop < screenPosition) {
            section.classList.add('visible');
        }
    });
