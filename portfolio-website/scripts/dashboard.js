import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://zrdounnixaotzltptnbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM'; // Replace with your actual anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Logout function
document.getElementById('logout').addEventListener('click', async function() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = 'index.html'; // Redirect to homepage
    } else {
        console.error('Logout failed:', error);
    }
});

// Save Profile Data
document.getElementById('profile-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
       const skills = document.getElementById('skills').value.split(',');
    const description = document.getElementById('description').value;

    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
        // Update student profile
        const { error: updateError } = await supabase
            .from('students')
            .upsert({
                id: user.id,
                user_id: user.id,
                name: name,
                email: email,
                contact: contact,
                skills: skills,
                description: description
            });

        if (!updateError) {
            document.getElementById('profile-message').textContent = 'Profile updated successfully!';
        } else {
            console.error('Error updating profile: ', updateError);
        }

        // // Update skills
        // for (const skill of skills) {
        //     const { data: skillData, error: skillError } = await supabase
        //         .from('skills')
        //         .insert({ skill_name: skill });

        //     if (!skillError) {
        //         const { error: studentSkillError } = await supabase
        //             .from('student_skills')
        //             .insert({ student_id: user.id, skill_id: skillData[0].id });

        //         if (studentSkillError) {
        //             console.error('Error associating skill with student: ', studentSkillError);
        //         }
        //     } else {
        //         console.error('Error inserting skill: ', skillError);
        //     }
        // }
    } else {
        console.error('No authenticated user:', error);
    }
});

