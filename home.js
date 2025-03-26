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

const greetingElement = document.getElementById('allx');

// Function to display greeting
function displayGreeting() {
    const name = localStorage.getItem('userName') || "Guest";
    if (greetingElement) {
        greetingElement.innerHTML = `Hello ${name},<br>`;
    }
}

// Display greeting on page load
displayGreeting();

// ============================
// BUTTON NAVIGATION
// ============================

const createButton = document.getElementById("myButton");

if (createButton) {
    createButton.addEventListener("click", () => {
        window.location.href = "create.html";
    });
}

// ============================
// GOOGLE SIGN-IN LOGIC
// ============================

function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    try {
        // Decode the JWT token
        const data = jwt_decode(response.credential);
        console.log("Google User Data:", data);

        // Extract user details
        const userName = data.name || "Guest";
        const userEmail = data.email || "N/A";
        const userImage = data.picture || "";

        // Store in localStorage
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);

        // Update greeting dynamically
        displayGreeting();

        // Display user info
        displayUserInfo(userName, userEmail, userImage);

    } catch (error) {
        console.error("Error decoding Google token:", error);
        alert("Failed to authenticate. Please try again.");
    }
}

// ============================
// DISPLAY USER INFO FUNCTION
// ============================

function displayUserInfo(name, email, image) {
    const container = document.querySelector('.container.main');

    // Remove existing user info to avoid duplication
    const existingInfo = document.getElementById("user-info");
    if (existingInfo) {
        existingInfo.remove();
    }

    // Create user info element
    const userInfo = document.createElement('div');
    userInfo.id = "user-info";
    userInfo.style.marginTop = "20px";
    userInfo.style.textAlign = "center";
    userInfo.innerHTML = `
        <h4>Welcome, ${name}</h4>
        <p>Email: ${email}</p>
        ${image ? `<img src="${image}" alt="Profile Image" width="100" />` : ""}
    `;

    if (container) {
        container.appendChild(userInfo);
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

    google.accounts.id.prompt();  // Display Google One Tap prompt
};
