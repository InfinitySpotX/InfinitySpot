// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC8YUJxjoCJoMfsncLolXd-GfzvDxL7-i4",
  authDomain: "infinityspot-779bb.firebaseapp.com",
  projectId: "infinityspot-779bb",
  storageBucket: "infinityspot-779bb.firebasestorage.app",
  messagingSenderId: "716001400461",
  appId: "1:716001400461:web:9fcb1a1ab1543b0d0474c4"
};


// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// FAMILY CODE
const FAMILY_CODE = "JKFAMILY";


// ================= REGISTER =================
window.registerUser = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const code = document.getElementById("familyCode").value;

  if (code !== FAMILY_CODE) {
    alert("Wrong Family Code");
    return;
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // 👇 USERNAME FUNCTION (IMPORTANT)
    const username = email.split("@")[0]; 
    setUser(username, email);

    alert("Account Created 🚀");

    window.location.href = "home.html";

  } catch (error) {
    alert(error.code);
  }
};


// ================= LOGIN =================
window.loginUser = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(auth, email, password);

    const username = email.split("@")[0];
    setUser(username, email);

    alert("Login Success 🚀");

    window.location.href = "home.html";

  } catch (error) {
    alert(error.code);
  }
};


// ================= USER FUNCTION =================
function setUser(username, email){

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
}