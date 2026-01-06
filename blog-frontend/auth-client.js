// 1. SESSION MANAGEMENT: Check if user is already logged in
const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;

    // Redirect away from Auth pages if already logged in
    if (token && (path.includes('login.html') || path.includes('signup.html'))) {
        window.location.href = 'index.html';
    }
}
checkLoggedIn();

// 2. SIGNUP LOGIC: Handle Account Creation & OTP Trigger
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Get the button and change text to show progress
        const submitBtn = signupForm.querySelector('.auth-btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending OTP...";
        submitBtn.disabled = true; // Disable to prevent double-clicks

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("OTP sent successfully!");
                document.getElementById('signupStep').style.display = 'none';
                document.getElementById('otpStep').style.display = 'block';
                localStorage.setItem('tempEmail', email);
            } else {
                alert(data.msg || "Signup failed");
                // Reset button if there's a user error (like username taken)
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            alert("Server Error. Please try again later.");
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// 3. OTP VERIFICATION LOGIC
const otpForm = document.getElementById('otpForm');
if (otpForm) {
    otpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('tempEmail');
        const otp = document.getElementById('otpInput').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            if (response.ok) {
                alert("Verification successful! You can now login.");
                localStorage.removeItem('tempEmail');
                window.location.href = 'login.html'; // Move to login after verifying
            } else {
                alert("Invalid OTP. Please check your email again.");
            }
        } catch (error) {
            alert("Error verifying OTP.");
        }
    });
}

// 4. LOGIN LOGIC
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.user.username);
                window.location.href = 'index.html';
            } else {
                alert(data.msg || "Login failed. Check your credentials or verification status.");
            }
        } catch (error) {
            alert("Server is offline.");
        }
    });
}

// 5. UI UPDATE: Dynamic Navbar
const updateNavbar = () => {
    const authArea = document.getElementById('nav-auth-area');
    const actionBtn = document.getElementById('dynamicActionBtn');
    
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    // IF LOGGED IN
    if (token && username) {
        // 1. Change "Create Account" to "Write a Post"
        if (actionBtn) {
            actionBtn.innerText = "Write a Post";
            actionBtn.href = "create-post.html";
            actionBtn.classList.add('logged-in-action'); // Optional: for extra styling
        }

        // 2. Replace Login button with Name and Logout
        if (authArea) {
            authArea.innerHTML = `
                <div class="user-info-nav">
                    <span class="welcome-text">Welcome, <strong>${username}</strong></span>
                    <button id="logoutBtn" class="logout-link">Logout</button>
                </div>
            `;

            // Add listener to the new logout button
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.clear();
                window.location.href = 'index.html';
            });
        }
    }
};

// Run as soon as the page is ready
document.addEventListener('DOMContentLoaded', updateNavbar);
document.addEventListener('DOMContentLoaded', updateNavbar);