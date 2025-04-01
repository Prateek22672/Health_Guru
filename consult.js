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


const doctors = {
        "Apollo": ["Dr. Ananya Sharma", "Dr. Rajiv Mehta", "Dr. Priya Singh"],
        "Fortis": ["Dr. Rahul Gupta", "Dr. Sneha Kapoor", "Dr. Vikram Rao"],
        "Manipal": ["Dr. Pooja Nair", "Dr. Arjun Khanna", "Dr. Sandeep Roy"],
        "AIIMS": ["Dr. Neha Malhotra", "Dr. Karan Patel", "Dr. Ritika Das"]
    };

    // Display doctor dropdown based on selected hospital
    function showDoctorDropdown() {
        const hospital = document.getElementById('hospital').value;
        const doctorContainer = document.getElementById('doctor-container');
        const doctorSelect = document.getElementById('doctor');

        if (hospital) {
            // Populate doctor dropdown
            doctorSelect.innerHTML = `<option value="">Choose...</option>`;
            doctors[hospital].forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor;
                option.textContent = doctor;
                doctorSelect.appendChild(option);
            });

            doctorContainer.style.display = 'block';  // Show doctor dropdown
        } else {
            doctorContainer.style.display = 'none';
        }

        // Reset time dropdown and booking button
        document.getElementById('time-container').style.display = 'none';
        document.getElementById('book-btn').style.display = 'none';
    }

    // Display time slot dropdown when a doctor is selected
    function showTimeDropdown() {
        const doctor = document.getElementById('doctor').value;
        const timeContainer = document.getElementById('time-container');

        if (doctor) {
            timeContainer.style.display = 'block';
        } else {
            timeContainer.style.display = 'none';
        }

        // Reset booking button
        document.getElementById('book-btn').style.display = 'none';
    }

    // Display booking button after selecting time slot
    document.getElementById('time').addEventListener('change', () => {
        const time = document.getElementById('time').value;
        const bookBtn = document.getElementById('book-btn');

        if (time) {
            bookBtn.style.display = 'block';
        } else {
            bookBtn.style.display = 'none';
        }
    });

    // Booking Confirmation
    function bookAppointment() {
        const hospital = document.getElementById('hospital').value;
        const doctor = document.getElementById('doctor').value;
        const time = document.getElementById('time').value;

        if (hospital && doctor && time) {
            document.getElementById('selected-hospital').textContent = hospital;
            document.getElementById('selected-doctor').textContent = doctor;
            document.getElementById('selected-time').textContent = time;

            // Display booking confirmation
            document.getElementById('booking-details').style.display = 'block';
        }
    }
