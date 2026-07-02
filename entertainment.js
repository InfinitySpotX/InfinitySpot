// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
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
