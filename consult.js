 // ============================
    // SPLASH SCREEN LOGIC
    // ============================

    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.querySelector('.container.mt-5');

    if (splashScreen) {
        // Show the splash screen
        splashScreen.style.display = 'flex';

        // Set a timeout to fade out the splash screen
        setTimeout(() => {
            splashScreen.style.opacity = '0'; // Start fading out

            // After the fade-out transition, hide the splash screen and show the main content
            setTimeout(() => {
                splashScreen.style.display = 'none'; // Hide splash screen
                mainContent.style.display = 'block'; // Show main content
            }, 1000); // Match this duration with the CSS transition duration
        }, 1600); // Duration to show the splash screen
    }

    // ============================
    // DISPLAY USER GREETING
    // ============================

    const greetingElement = document.getElementById('user-name');

    function displayGreeting() {
        const name = localStorage.getItem('userName') || "Guest";
        if (greetingElement) {
            greetingElement.textContent = name;
        }
    }

    // Show greeting on page load
    displayGreeting();

    // ============================
    // DEPARTMENT AND DOCTOR SELECTION LOGIC
    // ============================

    const doctorsByDepartment = {
        "Apollo": {
            "Orthopaedics": ["Dr. Ananya Sharma", "Dr. Rajiv Mehta"],
            "Cardiology": ["Dr. Priya Singh", "Dr. Vikram Rao"],
            "Neurology": ["Dr. Sneha Kapoor", "Dr. Karan Patel"],
            "Gastroenterology": ["Dr. Arjun Khanna", "Dr. Sandeep Roy"],
            "Dermatology": ["Dr. Neha Malhotra", "Dr. Ritika Das"]
        },
        "Fortis": {
            "Orthopaedics": ["Dr. Rahul Gupta", "Dr. Sneha Kapoor"],
            "Oncology": ["Dr. Vikram Rao", "Dr. Priya Singh"],
            "Pediatrics": ["Dr. Ananya Sharma", "Dr. Karan Patel"],
            "Nephrology": ["Dr. Arjun Khanna", "Dr. Sandeep Roy"],
            "Endocrinology": ["Dr. Neha Malhotra", "Dr. Ritika Das"]
        },
        "Manipal": {
            "Orthopaedics": ["Dr. Pooja Nair", "Dr. Arjun Khanna"],
            "Pulmonology": ["Dr. Vikram Rao", "Dr. Priya Singh"],
            "ENT": ["Dr. Sneha Kapoor", "Dr. Karan Patel"],
            "Urology": ["Dr. Ananya Sharma", "Dr. Sandeep Roy"],
            "Hepatology": ["Dr. Neha Malhotra", "Dr. Ritika Das"]
        },
        "AIIMS": {
            "Orthopaedics": ["Dr. Neha Malhotra", "Dr. Karan Patel"],
            "Radiology": ["Dr. Vikram Rao", "Dr. Priya Singh"],
            "Psychiatry": ["Dr. Sneha Kapoor", "Dr. Arjun Khanna"],
            "General Surgery": ["Dr. Ananya Sharma", "Dr. Sandeep Roy"],
            "Gynecology": ["Dr. Neha Malhotra", "Dr. Ritika Das"]
        }
    };

    function showDepartmentDropdown() {
        const hospital = document.getElementById("hospital").value;
        const departmentDropdown = document.getElementById("department");
        departmentDropdown.innerHTML = '<option value="">Choose...</option>';

        const departments = {
            "Apollo": ["Orthopaedics", "Cardiology", "Neurology", "Gastroenterology", "Dermatology"],
            "Fortis": ["Orthopaedics", "Oncology", "Pediatrics", "Nephrology", "Endocrinology"],
            "Manipal": ["Orthopaedics", "Pulmonology", "ENT", "Urology", "Hepatology"],
            "AIIMS": ["Orthopaedics", "Radiology", "Psychiatry", "General Surgery", "Gynecology"]
        };

        if (departments[hospital]) {
            departments[hospital].forEach(dept => {
                const option = document.createElement("option");
                option.value = dept;
                option.textContent = dept;
                departmentDropdown.appendChild(option);
            });
        }

        // Call showDoctorDropdown to update the doctor dropdown based on the selected department
        showDoctorDropdown();
    }

    function showDoctorDropdown() {
        const hospital = document.getElementById('hospital').value;
        const department = document.getElementById('department').value;
        const doctorContainer = document.getElementById('doctor-container');
        const doctorSelect = document.getElementById('doctor');

        if (hospital && department) {
            // Clear previous options
            doctorSelect.innerHTML = `<option value="">Choose...</option>`;
            
            // Populate doctor dropdown based on selected hospital and department
            const doctors = doctorsByDepartment[hospital][department];
            if (doctors) {
                doctors.forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor;
                    option.textContent = doctor;
                    doctorSelect.appendChild(option);
                });

                doctorContainer.style.display = 'block';  // Show doctor dropdown
            } else {
                doctorContainer.style.display = 'none';  // Hide if no doctors found
            }

            // Reset time dropdown and booking button
            document.getElementById('time-container').style.display = 'none';
            document.getElementById('book-btn').style.display = 'none';
        } else {
            doctorContainer.style.display = 'none';
        }
    }

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
