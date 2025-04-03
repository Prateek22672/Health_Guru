
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
    
    // your code goes here
document.addEventListener("DOMContentLoaded", function () {
    const reminderInput = document.getElementById("reminderText");
    const timeInput = document.getElementById("reminderTime");
    const addReminderBtn = document.getElementById("addReminder");
    const reminderList = document.getElementById("reminderList");
    const completedList = document.getElementById("completedList");

    // Load existing reminders from local storage
    loadReminders();

    addReminderBtn.addEventListener("click", function () {
        const reminderText = reminderInput.value.trim();
        const reminderTime = timeInput.value;

        if (!reminderText || !reminderTime) {
            alert("Please fill in both fields.");
            return;
        }

        const listItem = createReminderItem(reminderText, reminderTime);
        reminderList.appendChild(listItem);

        // Save to local storage
        saveReminder(reminderText, reminderTime);

        // Set alert
        scheduleAlert(reminderText, reminderTime);

        // Clear inputs
        reminderInput.value = "";
        timeInput.value = "";
    });

    function createReminderItem(text, time, completed = false) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        
        listItem.textContent = `${text} - ${new Date(time).toLocaleString()}`;
        listItem.prepend(checkbox);

        checkbox.addEventListener("change", function () {
            if (this.checked) {
                completedList.appendChild(listItem);
                listItem.style.textDecoration = "line-through";
                listItem.style.color = "gray";
                saveCompletedReminder(text, time);
            } else {
                reminderList.appendChild(listItem);
                listItem.style.textDecoration = "none";
                listItem.style.color = "black";
                removeCompletedReminder(text, time);
            }
        });

        return listItem;
    }

    function scheduleAlert(text, time) {
        const reminderDate = new Date(time).getTime();
        const currentTime = new Date().getTime();
        const timeToReminder = reminderDate - currentTime;

        if (timeToReminder > 0) {
            setTimeout(() => {
                alert(`Reminder: ${text}`);
            }, timeToReminder);
        }
    }

    function saveReminder(text, time) {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.push({ text, time });
        localStorage.setItem("reminders", JSON.stringify(reminders));
    }

    function saveCompletedReminder(text, time) {
        let completed = JSON.parse(localStorage.getItem("completedReminders")) || [];
        completed.push({ text, time });
        localStorage.setItem("completedReminders", JSON.stringify(completed));
    }

    function removeCompletedReminder(text, time) {
        let completed = JSON.parse(localStorage.getItem("completedReminders")) || [];
        completed = completed.filter(reminder => reminder.text !== text || reminder.time !== time);
        localStorage.setItem("completedReminders", JSON.stringify(completed));
    }

    function loadReminders() {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        let completed = JSON.parse(localStorage.getItem("completedReminders")) || [];

        reminders.forEach(({ text, time }) => {
            const listItem = createReminderItem(text, time);
            reminderList.appendChild(listItem);
        });

        completed.forEach(({ text, time }) => {
            const listItem = createReminderItem(text, time, true);
            completedList.appendChild(listItem);
            listItem.style.textDecoration = "line-through";
            listItem.style.color = "gray";
        });
    }
});

