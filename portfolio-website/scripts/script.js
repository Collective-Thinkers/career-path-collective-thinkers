import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://zrdounnixaotzltptnbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch and display student profiles immediately on DOMContentLoaded
    await fetchStudentProfiles();

    // Check if a user is logged in and update the navigation accordingly
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;
    const nav = document.querySelector("nav ul");

    if (user) {
        nav.innerHTML = `
            <li><a href="#home">Home</a></li>
            <li><a href="about_us.html">About Us</a></li>
            <li><a href="#search">Search</a></li>
            <li><a href="dashboard.html" id="dashboard">Dashboard</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="#" id="logout">Logout</a></li>
        `;

        document.getElementById("logout").addEventListener("click", async function () {
            await supabase.auth.signOut();
            window.location.reload();
        });
    } else {
        nav.innerHTML = `
            <li><a href="#home">Home</a></li>
            <li><a href="about_us.html">About Us</a></li>
            <li><a href="#search">Search</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="registration.html">Login</a></li>
            <li><a href="registration.html">Sign Up</a></li>
        `;
    }
});

async function fetchStudentProfiles() {
    const profilesContainer = document.getElementById('profiles-container');
    if (!profilesContainer) {
        console.error('profiles-container element not found');
        return;
    }

    profilesContainer.innerHTML = "<p>Loading profiles...</p>";

    // Fetch students with their skills
    const { data: students, error } = await supabase
        .from('students')
        .select(`
            id, name, profile_picture, email, contact, skills, description
        `);

    if (error) {
        console.error('Error fetching students:', error);
        profilesContainer.innerHTML = "<p>Failed to load profiles. Please try again.</p>";
        return;
    }

    if (!students.length) {
        profilesContainer.innerHTML = "<p>No student profiles found.</p>";
        return;
    }

    // Create a grid layout
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    students.forEach(student => {
        const profilePicture = student.profile_picture || 'default-profile.png';
        const skills = student.skills ? student.skills.join(', ') : "No skills listed";

        const profileDiv = document.createElement('div');
        profileDiv.className = 'grid-item';

        profileDiv.innerHTML = `
            <div class="student-profile">
                <img src="${profilePicture}" alt="${student.name}" class="profile-picture">
                <h3>${student.name}</h3>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Contact:</strong> ${student.contact}</p>
                <p><strong>Skills:</strong> ${student.skills}</p>
                <p>${student.description}</p>
            </div>
        `;

        gridContainer.appendChild(profileDiv);
    });

    profilesContainer.innerHTML = '';
    profilesContainer.appendChild(gridContainer);
}
