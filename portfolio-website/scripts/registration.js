import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zrdounnixaotzltptnbe.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM'; // Replace with your Supabase public API key
const supabase = createClient(supabaseUrl, supabaseKey);

// Form Containers
const signUpForm = document.getElementById('signup');
const signInForm = document.getElementById('signIn');

// Form Toggle Buttons
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');

// Show Sign Up Form
signUpButton.addEventListener('click', function () {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

// Show Sign In Form
signInButton.addEventListener('click', function () {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

// User Sign Up
document.getElementById('submitSignUp').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        }
    });

    if (error) {
        console.error('Error signing up:', error.message);
        showMessage('Error signing up. Please try again.', 'signUpMessage');
    } else {
        console.log('User signed up:', user);
        showMessage('Account created successfully!', 'signUpMessage');
        window.location.href = 'index.html'; // Redirect to login or home page after sign up
    }
});

// User Sign In
document.getElementById('submitSignIn').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error('Error signing in:', error.message);
        showMessage('Incorrect Email or Password', 'signInMessage');
    } else {
        console.log('User signed in:', user);
        showMessage('Login successful', 'signInMessage');
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Current session:', session);
        if (session) {
            window.location.href = 'dashboard.html'; // Redirect to dashboard if user is authenticated
        } else {
            console.log('No session found after login');
        }
    }
});

// Function to show messages to the user
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}


























// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// const supabaseUrl = 'https://zrdounnixaotzltptnbe.supabase.co'; // Replace with your Supabase URL
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM'; // Replace with your Supabase public API key
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Form Containers
// const signUpForm = document.getElementById('signup');
// const signInForm = document.getElementById('signIn');

// // Form Toggle Buttons
// const signUpButton = document.getElementById('signUpButton');
// const signInButton = document.getElementById('signInButton');

// // Show Sign Up Form
// signUpButton.addEventListener('click', function () {
//     signInForm.style.display = 'none';
//     signUpForm.style.display = 'block';
// });

// // Show Sign In Form
// signInButton.addEventListener('click', function () {
//     signUpForm.style.display = 'none';
//     signInForm.style.display = 'block';
// });

// // User Sign Up
// document.getElementById('submitSignUp').addEventListener('click', async (event) => {
//     event.preventDefault();
//     const email = document.getElementById('rEmail').value;
//     const password = document.getElementById('rPassword').value;
//     const firstName = document.getElementById('fName').value;
//     const lastName = document.getElementById('lName').value;

//     const { user, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             data: {
//                 first_name: firstName,
//                 last_name: lastName,
//             }
//         }
//     });

//     if (error) {
//         console.error('Error signing up:', error.message);
//         showMessage('Error signing up. Please try again.', 'signUpMessage');
//     } else {
//         console.log('User signed up:', user);
//         showMessage('Account created successfully!', 'signUpMessage');
//         window.location.href = 'index.html'; // Redirect to login or home page after sign up
//     }
// });

// // User Sign In
// document.getElementById('submitSignIn').addEventListener('click', async (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const { user, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//         console.error('Error signing in:', error.message);
//         showMessage('Incorrect Email or Password', 'signInMessage');
//     } else {
//         console.log('User signed in:', user);
//         showMessage('Login successful', 'signInMessage');
//         // Check if user is authenticated
//         const session = supabase.auth.session();
//         console.log('Current session:', session);
//         if (session) {
//             window.location.href = 'dashboard.html'; // Redirect to dashboard if user is authenticated
//         } else {
//             console.log('No session found after login');
//         }
//     }
// });

// // Function to show messages to the user
// function showMessage(message, divId) {
//     var messageDiv = document.getElementById(divId);
//     messageDiv.style.display = 'block';
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }





























// // Supabase Authentication Setup
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// const supabaseUrl = 'https://zrdounnixaotzltptnbe.supabase.co'; // Replace with your Supabase URL
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM'; // Replace with your Supabase public API key
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Form Containers
// const signUpForm = document.getElementById('signup');
// const signInForm = document.getElementById('signIn');

// // Form Toggle Buttons
// const signUpButton = document.getElementById('signUpButton');
// const signInButton = document.getElementById('signInButton');

// // Show Sign Up Form
// signUpButton.addEventListener('click', function () {
//     signInForm.style.display = 'none';
//     signUpForm.style.display = 'block';
// });

// // Show Sign In Form
// signInButton.addEventListener('click', function () {
//     signUpForm.style.display = 'none';
//     signInForm.style.display = 'block';
// });

// // User Sign Up
// document.getElementById('submitSignUp').addEventListener('click', async (event) => {
//     event.preventDefault();
//     const email = document.getElementById('rEmail').value;
//     const password = document.getElementById('rPassword').value;
//     const firstName = document.getElementById('fName').value;
//     const lastName = document.getElementById('lName').value;

//     const { user, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             data: {
//                 first_name: firstName,
//                 last_name: lastName,
//             }
//         }
//     });

//     if (error) {
//         console.error('Error signing up:', error.message);
//         showMessage('Error signing up. Please try again.', 'signUpMessage');
//     } else {
//         console.log('User signed up:', user);
//         showMessage('Account created successfully!', 'signUpMessage');
//         window.location.href = 'index.html'; // Redirect to login or home page after sign up
//     }
// });

// // User Sign In
// document.getElementById('submitSignIn').addEventListener('click', async (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const { user, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//         console.error('Error signing in:', error.message);
//         showMessage('Incorrect Email or Password', 'signInMessage');
//     } else {
//         console.log('User signed in:', user);
//         showMessage('Login successful', 'signInMessage');
//         // Check if user is authenticated
//         const session = supabase.auth.session();
//         console.log('Current session:', session);
//         if (session) {
//             window.location.href = 'dashboard.html'; // Redirect to dashboard if user is authenticated
//         } else {
//             console.log('No session found after login');
//         }
//     }
// });









// User Logout
// document.getElementById('logout').addEventListener('click', async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//         console.error('Error logging out:', error.message);
//     } else {
//         window.location.href = 'index.html'; // Redirect to homepage after logout
//     }
// });

// Function to show messages to the user
// function showMessage(message, divId) {
//     var messageDiv = document.getElementById(divId);
//     messageDiv.style.display = 'block';
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }


















// // Supabase Authentication Setup
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// const supabaseUrl = 'https://zrdounnixaotzltptnbe.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZG91bm5peGFvdHpsdHB0bmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTczNjksImV4cCI6MjA1NzE5MzM2OX0.cvLC98R4w-14DIefyzyJWlLJ5OfpPe-unt8z_gixuXM';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // User Sign Up
// document.getElementById('submitSignUp').addEventListener('click', async (event) => {
//     event.preventDefault();
//     const email = document.getElementById('rEmail').value;
//     const password = document.getElementById('rPassword').value;
//     const firstName = document.getElementById('fName').value;
//     const lastName = document.getElementById('lName').value;

//     const { user, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             data: {
//                 first_name: firstName,
//                 last_name: lastName
//             }
//         }
//     });

//     if (error) {
//         console.error('Error signing up:', error.message);
//     } else {
//         console.log('User signed up:', user);
//         window.location.href = 'index.html';
//     }
// });

// // User Sign In
// document.getElementById('submitSignIn').addEventListener('click', async (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const { user, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//         console.error('Error signing in:', error.message);
//     } else {
//         console.log('User signed in:', user);
//         window.location.href = 'student.html';
//     }
// });

// // User Logout
// document.getElementById('logout').addEventListener('click', async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//         console.error('Error logging out:', error.message);
//     } else {
//         window.location.href = 'index.html';
//     }
// });




// function showMessage(message, divId) {
//     var messageDiv = document.getElementById(divId);
//     messageDiv.style.display = 'block';
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }
// const signUp = document.getElementById('submitSignUp');
// signUp.addEventListener('click', (event) => {
//     event.preventDefault();
//     const email = document.getElementById('rEmail').value;
//     const password = document.getElementById('rPassword').value;
//     const firstName = document.getElementById('fName').value;
//     const lastName = document.getElementById('lName').value;
//     const auth = getAuth();
//     const db = getFirestore();

//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             const userData = {
//                 email: email,
//                 firstName: firstName,
//                 lastName: lastName
//             };
//             showMessage('Account Created Successfully', 'signUpMessage');
//             const docRef = doc(db, 'users', user.uid);
//             setDoc(docRef, userData)
//                 .then(() => {
//                     window.location.href = 'index.html';
//                 })
//                 .catch((error) => {
//                     console.error("error writing document", error);
//                 })
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode == 'auth/email-already-in-use') {
//                 showMessage('Email Address Already in use !!!', 'signUpMessage');
//             }
//             else {
//                 showMessage('unable to create User', 'signUpMessage');
//             }
//         })
// })

// const signIn = document.getElementById('submitSignIn');
// signIn.addEventListener('click', (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const auth = getAuth();


//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             showMessage('login is successful', 'signInMessage');
//             const user = userCredential.user;
//             localStorage.setItem('loggedInUserId', user.uid);
//             window.location.href = 'dashboard.html';
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode === 'auth/invalid-credential') {
//                 showMessage('Incorrect Email or Password', 'signInMessage');
//             }
//             else {
//                 showMessage('Account Not Found', 'signInMessage');
//             }
//         })
// });