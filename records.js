
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
    // REMINDER SELECTION LOGIC
    // ============================
    
 
         function addRecord() {
            const input = document.getElementById('record-input');
            if (input.files.length > 0) {
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    let records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
                    records.push(e.target.result);
                    localStorage.setItem('medicalRecords', JSON.stringify(records));
                    loadRecords();
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please select a file first!");
            }
        }

        function loadRecords() {
            const recordList = document.getElementById('record-list');
            let records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
            recordList.innerHTML = records.length === 0 ? "<p>No records found.</p>" : "";
            records.forEach((record, index) => {
                const recordItem = document.createElement('div');
                recordItem.classList.add('record-item');
                recordItem.innerHTML = `
                    <img src="${record}" alt="Medical Record">
                    <button class="delete-button" onclick="deleteRecord(${index})">
                        <img src="delete-icon.png" alt="Delete">
                    </button>
                `;
                recordList.appendChild(recordItem);
            });
        }

        function deleteRecord(index) {
            let records = JSON.parse(localStorage.getItem('medicalRecords')) || [];
            records.splice(index, 1);
            localStorage.setItem('medicalRecords', JSON.stringify(records));
            loadRecords();
        }

        document.addEventListener("DOMContentLoaded", loadRecords);
