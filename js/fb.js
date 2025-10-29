//===================================================================================

//firebase

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCGhKZW2DWFNdRqGF3H6B4ipXk8m5wp_Io",
    authDomain: "dvgroup12-4cb97.firebaseapp.com",
    projectId: "dvgroup12-4cb97",
    storageBucket: "dvgroup12-4cb97.firebasestorage.app",
    messagingSenderId: "292150537201",
    appId: "1:292150537201:web:9f7cc6d4a9923edb71f250"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();

    //inputs
const username = document.getElementById('signInUserName');
const email = document.getElementById('signInEmail');
const password = document.getElementById('singInPassword');

  console.log("Username: " + username.value);
  console.log("Email: " + email.value);
  console.log("Password: " + password.value);

  signInWithEmailAndPassword (auth, username, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("User Signed Up: " + user.email);
    window.location.href = "Home.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
    // ..
  });
});
//===================================================================================