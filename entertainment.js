const firebaseConfig = {
  apiKey: "AIzaSyCEGV0QyJJwReINDfEKzB6FODGA7dV00CE",
  authDomain: "infinityspot-7f0b8.firebaseapp.com",
  databaseURL: "https://infinityspot-7f0b8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "infinityspot-7f0b8",
  storageBucket: "infinityspot-7f0b8.firebasestorage.app",
  messagingSenderId: "356283606090",
  appId: "1:356283606090:web:9bcd0ca6437f1861ea32b3"
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
