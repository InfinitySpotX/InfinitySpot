import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// =======================
// FIREBASE CONFIG
// =======================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =======================
// COMMUNITY CHAT
// =======================

const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const chatRef = collection(db, "community_chat");

// Send Message
window.sendMessage = async function () {

    const text = messageInput.value.trim();

    if (!text) return;

    try {

        await addDoc(chatRef, {
            text: text,
            role: "user",
            createdAt: serverTimestamp()
        });

        messageInput.value = "";

    } catch (err) {
        console.error(err);
    }
};

// Enter key
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Load Messages
const q = query(chatRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {

    chatContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        const message = document.createElement("div");
        message.className = `message ${data.role}`;

        const bubble = document.createElement("div");
        bubble.className = "bubble";

        if (data.role === "developer") {
            bubble.innerHTML = "👑 " + data.text;
        } else {
            bubble.innerHTML = data.text;
        }

        message.appendChild(bubble);
        chatContainer.appendChild(message);

    });

    chatContainer.scrollTop = chatContainer.scrollHeight;

});
