/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyBa-wRW2iRnlsneuf8FiI6woBiVYlXQMCg",
    authDomain: "hot-and-cold-26728.firebaseapp.com",
    projectId: "hot-and-cold-26728",
    storageBucket: "hot-and-cold-26728.firebasestorage.app",
    messagingSenderId: "394606284456",
    appId: "1:394606284456:web:7b66af2c81a0ffa87e7c9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const user = auth.currentUser;


/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")

const userGreetingEl = document.getElementById("user-greeting")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */

showLoggedOutView()
onAuthStateChanged(auth, (user) => {
    if (user) {
      showLoggedInView()
      const uid = user.uid;
      showProfilePicture(userProfilePictureEl, user);
      showUserGreeting(userGreetingEl, user)
    } 
    else {
      showLoggedOutView()
    }
});
   
 

/* === Functions === */

function showProfilePicture(imgElement, user) {
    if (user && user.profilePictureURL) {
        imgElement.src = user.profilePictureURL;
    } 
    else {
        imgElement.src = "assets/images/defaultPic.jpg";
    }

}
 

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")
    const email = emailInputEl.value
    const password= passwordInputEl.value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        showLoggedInView()
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    const email = emailInputEl.value
    const password= passwordInputEl.value
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showLoggedInView()
    })
    .catch((error) => {
        console.error(error.message)
    });
}

function authSignOut() {
    signOut(auth)
    .then(() => {
        showLoggedOutView()
    })
    .catch((error) => {
        console.error(error.message)
        });
}
 

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
} 

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
} 

function showView(view) {
    view.style.display = "flex"
} 

function hideView(view) {
    view.style.display = "none"
} 

//credit: coursera

function showUserGreeting(element, user) {
    const displayName = user.displayName;
    console.log(displayName)
    if (user.displayName) {
        const firstName = user.displayName.split(' ')[0];
        element.textContent = `Hi ${firstName}, how are you?`;
    } 
    else {
        element.textContent = "Hey friend, how are you?";
    }
}