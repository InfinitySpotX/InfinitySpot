// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAcyuhXTQb1wz4f8MWTlnUp5KI7kGfAm1k",
  authDomain: "infinityspot-78ac4.firebaseapp.com",
  databaseURL: "https://infinityspot-78ac4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "infinityspot-78ac4",
  storageBucket: "infinityspot-78ac4.firebasestorage.app",
  messagingSenderId: "321996507857",
  appId: "1:321996507857:web:30433a9d435365aa3713f0"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elements
const postBtn = document.getElementById("postBtn");
const message = document.getElementById("message");
const posts = document.getElementById("posts");

// Post Button
postBtn.addEventListener("click", async () => {

    const text = message.value.trim();

    if(text === ""){
        alert("Write something...");
        return;
    }

    await addDoc(collection(db,"posts"),{
        user:"User",
        message:text,
        createdAt:serverTimestamp()
    });

    message.value="";
});

// Live Posts
const q = query(collection(db,"posts"), orderBy("createdAt","desc"));

onSnapshot(q,(snapshot)=>{

    posts.innerHTML="";

    snapshot.forEach((doc)=>{

        const data = doc.data();

        posts.innerHTML += `
        <div class="post">
            <div class="user">${data.user}</div>
            <div class="text">${data.message}</div>
        </div>
        `;

    });

});
