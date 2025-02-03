document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", validateLogin);
    } else if (document.getElementById("userTableBody")) {
        loadUsers();
    }
});

function validateLogin(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    
    emailError.innerText = "";
    passwordError.innerText = "";
    
    let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    
    if (!emailValid) {
        emailError.innerText = "Invalid email format";
    }
    
    if (!passwordValid) {
        passwordError.innerText = "Password must contain 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long";
    }
    
    if (emailValid && passwordValid) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "users.html";
    }
}

// User Data
let users = [
    { name: "kows", email: "kows@gmail.com", state: "TN", country: "UK", status: "Active" },
    { name: "deeps", email: "deeps@gmail.com", state: "TN", country: "LONDON", status: "Active" },
    { name: "Arun", email: "arun@gmail.com", state: "TN", country: "USA", status: "Active" }
];

function loadUsers() {
    let userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    users.forEach((user, index) => {
        let row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.state}</td>
            <td>${user.country}</td>
            <td>
                <button class="toggle-btn ${user.status === 'Active' ? 'active' : 'deleted'}" onclick="toggleStatus(${index})">
                    ${user.status}
                </button>
            </td>
            <td>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function toggleStatus(index) {
    users[index].status = users[index].status === "Active" ? "Inactive" : "Active";
    loadUsers();
}

function deleteUser(index) {
    users[index].status = "Deleted";
    loadUsers();
}

