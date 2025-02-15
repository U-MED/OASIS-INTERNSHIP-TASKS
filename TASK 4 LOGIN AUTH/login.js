document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const welcomeSection = document.getElementById("welcomeSection");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");
    
    const registerName = document.getElementById("registerName");
    const registerEmail = document.getElementById("registerEmail");
    const registerPassword = document.getElementById("registerPassword");
    const registerError = document.getElementById("registerError");

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    // Toggle between Login and Register Forms
    showRegister.addEventListener("click", function () {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    showLogin.addEventListener("click", function () {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Load stored user data
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if a user is already logged in
    let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        welcomeSection.style.display = "block";
        document.getElementById("welcomeMessage").innerHTML = `Welcome, <b>${loggedInUser.name}</b>!`;
    }

    // Register Function
    registerBtn.addEventListener("click", function () {
        const name = registerName.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPassword.value.trim();

        if (!name || !email || !password) {
            registerError.textContent = "All fields are required!";
            return;
        }

        // Check if email is already registered
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            registerError.textContent = "Email is already registered!";
            return;
        }

        // Save user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! You can now log in.");

        // Switch to Login Form
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Login Function
    loginBtn.addEventListener("click", function () {
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            loginForm.style.display = "none";
            welcomeSection.style.display = "block";
            document.getElementById("welcomeMessage").innerHTML = `Welcome, <b>${user.name}</b>!`;
        } else {
            loginError.textContent = "Incorrect email or password!";
        }
    });

    // Logout Function
    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("loggedInUser");
        location.reload();
    });
});
function togglePassword(inputId, toggleElement) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleElement.textContent = "🙈"; // Change icon to hide
    } else {
        passwordInput.type = "password";
        toggleElement.textContent = "👁️"; // Change icon to show
    }
}

