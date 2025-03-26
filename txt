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
// DISPLAY USER GREETING
// ============================

const name = localStorage.getItem('userName');  // Retrieve name from localStorage
const greetingElement = document.getElementById('allx');

if (greetingElement && name) {
    greetingElement.innerHTML = `Hello ${name},<br>`; 
}

// ============================
// CREATE BUTTON NAVIGATION
// ============================

const createButton = document.getElementById("myButton");

if (createButton) {
    createButton.addEventListener("click", () => {
        window.location.href = "create.html";
    });
}

// ============================
// GOOGLE SIGN-IN LOGIC (Optimized)
// ============================

// Use only one `handleCredentialResponse` function
function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    // Decode the JWT to get user info
    const data = jwt_decode(response.credential);  
    console.log("Google User Data:", data);

    // Extract and display user info
    const userName = data.name || "Guest"; 
    const userEmail = data.email || "N/A"; 
    const userImage = data.picture || ""; 

    // Display user info dynamically
    const userInfo = document.createElement('div');
    userInfo.innerHTML = `
        <h4>Welcome, ${userName}</h4>
        <p>Email: ${userEmail}</p>
        ${userImage ? `<img src="${userImage}" alt="Profile Image" width="100" />` : ""}
    `;
    
    const container = document.querySelector('.container.main');
    if (container) {
        container.appendChild(userInfo);
    }

    // Store user info in localStorage
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userName", userName);

    // Update the greeting dynamically
    if (greetingElement) {
        greetingElement.innerHTML = `Hello ${userName},<br>`; 
    }
}

// ============================
// GOOGLE AUTH INITIALIZATION
// ============================

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",  // Replace with your Google Client ID
        callback: handleCredentialResponse,
    });

    google.accounts.id.prompt();  // Show the One Tap prompt
};
