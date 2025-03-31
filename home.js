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

const greetingElement = document.getElementById('allx');

function displayGreeting() {
    const name = safeGetItem('userName') || "Guest";
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
        window.location.href = "consult.html";
    });
}

// ============================
// GOOGLE SIGN-IN LOGIC
// ============================

function handleCredentialResponse(response) {
    console.log("Google OAuth Token:", response.credential);

    try {
        // Decode the JWT token using jwt-decode library
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
    let userInfo = document.getElementById("user-info");

    if (!userInfo) {
        userInfo = document.createElement('div');
        userInfo.id = "user-info";
        userInfo.style.marginTop = "20px";
        userInfo.style.textAlign = "center";

        const container = document.querySelector('.container.main');
        if (container) {
            container.appendChild(userInfo);
        }
    }

    // Update content only (avoid duplication)
    userInfo.innerHTML = `
        <h4>Welcome, ${name}</h4>
        <p>Email: ${email}</p>
        ${image ? `<img src="${image}" alt="Profile Image" width="100" />` : ""}
    `;
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
