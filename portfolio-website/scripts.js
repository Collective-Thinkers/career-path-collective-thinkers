import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

const SUPABASE_URL = 'https://zrdounnixaotzltptnbe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Logout functionality
document.getElementById('logout').addEventListener('click', async function() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = 'index.html';
    } else {
        console.error('Error logging out:', error);
    }
});

// Save Profile Data
document.getElementById('profile-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const skills = document.getElementById('skills').value.split(',');

    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        console.error('User not authenticated');
        return;
    }

    const { error } = await supabase
        .from('students')
        .upsert({ id: user.id, name: name, email: email, contact: contact, skills: skills });

    if (!error) {
        document.getElementById('profile-message').textContent = 'Profile updated successfully!';
    } else {
        console.error('Error updating profile:', error);
    }
});

// Sign-Up functionality
document.getElementById('submitSignUp').addEventListener('click', async function(event) {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error('Error signing up:', error);
        return;
    }
    await supabase.from('users').insert({ id: data.user.id, email, firstName, lastName });
    window.location.href = 'index.html';
});

// Sign-In functionality
document.getElementById('submitSignIn').addEventListener('click', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error('Error signing in:', error);
        return;
    }
    localStorage.setItem('loggedInUserId', data.user.id);
    window.location.href = 'dashboard.html';
});

document.addEventListener('DOMContentLoaded', function () {
    // Select the form containers
    const signUpContainer = document.getElementById('signup');
    const signInContainer = document.getElementById('signIn');

    // Select the buttons for switching forms
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');

    // Show the Sign-Up form and hide the Sign-In form
    signUpButton.addEventListener('click', function () {
        signInContainer.style.display = 'none';  // Hide the Sign-In form
        signUpContainer.style.display = 'block';  // Show the Sign-Up form
    });

    // Show the Sign-In form and hide the Sign-Up form
    signInButton.addEventListener('click', function () {
        signUpContainer.style.display = 'none';  // Hide the Sign-Up form
        signInContainer.style.display = 'block';  // Show the Sign-In form
    });
});