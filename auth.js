// --- User Authentication (Client-Side Simulation) ---
// User Authentication with Firebase Integration
import { saveUser as saveUserToFirebase, getUsers as getUsersFromFirebase } from './firebase-service.js';

const USERS_KEY = 'grock_users';
const CURRENT_USER_KEY = 'grock_current_user_session';

// --- Utility Functions ---
const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const getCurrentUser = () => JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
const setCurrentUser = (user) => sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
const logoutUser = () => sessionStorage.removeItem(CURRENT_USER_KEY);

// --- Core Auth Logic ---

// Sign Up
const handleSignUp = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value.toLowerCase();
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('auth-error');

    try {
        const users = getUsers();
        if (users.find(user => user.email === email)) {
            errorEl.textContent = 'An account with this email already exists.';
            return;
        }

        const newUser = { name, email, phone, password }; // In a real app, hash the password!
        
        // Save to Firebase
        await saveUserToFirebase(newUser);
        
        // Save to localStorage for backward compatibility
        users.push(newUser);
        saveUsers(users);
        
        alert('Sign up successful! Please log in.');
        window.location.href = '/login/';
    } catch (error) {
        console.error('Sign up error:', error);
        errorEl.textContent = 'An error occurred during sign up. Please try again.';
    }
};

// Login
const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('auth-error');

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password); // DO NOT compare passwords like this in production

    if (user) {
        setCurrentUser({ name: user.name, email: user.email, phone: user.phone });
        
        // Redirect logic
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get('returnUrl');
        window.location.href = returnUrl || '/profile/'; // Default to profile page
    } else {
        errorEl.textContent = 'Invalid email or password.';
    }
};

// Logout
const handleLogout = () => {
    logoutUser();
    window.location.href = '/';
};

// Update Navbar based on Auth State
const updateNavbarAuth = () => {
    const authContainer = document.querySelector('.nav-auth');
    if (!authContainer) return;

    const currentUser = getCurrentUser();
    if (currentUser) {
        authContainer.innerHTML = `
            <div class="dropdown">
                <a href="#" class="nav-link">${currentUser.name.split(' ')[0]}</a>
                <ul class="dropdown-menu">
                    <li><a href="/profile/">My Profile</a></li>
                    <li><a href="/orders/">My Orders</a></li>
                    <li><a href="#" id="logout-link">Logout</a></li>
                </ul>
            </div>
        `;
        document.getElementById('logout-link').addEventListener('click', handleLogout);
    } else {
        authContainer.innerHTML = `
            <a href="/login/" class="btn btn-secondary">Login</a>
            <a href="/signup/" class="btn btn-primary">Sign Up</a>
        `;
    }
};


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarAuth(); // Run on every page load

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
