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

window.onload = () => {
  renderContacts();
};

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (!name || !phone) {
    showAlert("Please fill in both fields.", "error");
    return;
  }

  const contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];

  if (editIndex == -1) {
    contacts.push({ name, phone });
    showAlert("Contact added successfully.", "success");
  } else {
    contacts[editIndex] = { name, phone };
    showAlert("Contact updated successfully.", "info");
    document.getElementById("editIndex").value = -1;
  }

  localStorage.setItem("sosContacts", JSON.stringify(contacts));
  document.getElementById("contact-form").reset();
  renderContacts();
});

function renderContacts() {
  const list = document.getElementById("contact-list");
  list.innerHTML = "";
  const contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    infoDiv.textContent = `${contact.name} - ${contact.phone}`;

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editContact(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteContact(index);

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionDiv);

    list.appendChild(li);
  });
}

function editContact(index) {
  const contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];
  const contact = contacts[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("editIndex").value = index;
}

function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];
  contacts.splice(index, 1);
  localStorage.setItem("sosContacts", JSON.stringify(contacts));
  showAlert("Contact deleted.", "error");
  renderContacts();
}

function sendSOS() {
  const contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];

  if (contacts.length === 0) {
    showAlert("No contacts found! Please save emergency contacts first.", "error");
    return;
  }

  const names = contacts.map((c) => c.name).join(", ");
  showAlert(`🚨 SOS sent to: ${names}`, "info");
}

function showAlert(message, type = "info") {
  const alertBox = document.getElementById("alert-box");
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}
