// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAcyuhXTQb1wz4f8MWTlnUp5KI7kGfAm1k",
  authDomain: "infinityspot-78ac4.firebaseapp.com",
  projectId: "infinityspot-78ac4",
  storageBucket: "infinityspot-78ac4.firebasestorage.app",
  messagingSenderId: "321996507857",
  appId: "1:321996507857:web:0f263aeeeb2770bd3713f0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// HTML Elements
const postBtn = document.getElementById("postBtn");
const message = document.getElementById("message");
const posts = document.getElementById("posts");

// Add Post
postBtn.addEventListener("click", function () {

    const text = message.value.trim();

    if (text === "") {
        alert("Write something...");
        return;
    }

    db.collection("posts").add({
        user: "User",
        message: text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function () {
        message.value = "";
    })
    .catch(function (error) {
        console.error(error);
        alert(error.message);
    });

});

// Load Posts
db.collection("posts")
.onSnapshot(function(snapshot){

    posts.innerHTML = "";

    snapshot.forEach(function(doc){

        const data = doc.data();

        posts.innerHTML += `
        <div class="post">
            <div class="user">${data.user || "User"}</div>
            <div class="text">${data.message || ""}</div>
        </div>
        `;

    });

}, function(error){

    console.error(error);
    alert(error.message);

});
