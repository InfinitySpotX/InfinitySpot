// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC8YUJxjoCJoMfsncLolXd-GfzvDxL7-i4",
  authDomain: "infinityspot-779bb.firebaseapp.com",
  projectId: "infinityspot-779bb",
  storageBucket: "infinityspot-779bb.firebasestorage.app",
  messagingSenderId: "716001400461",
  appId: "1:716001400461:web:9fcb1a1ab1543b0d0474c4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let feed = document.getElementById("feed");


// =========================
// MENU
// =========================
function toggleMenu(){
  let d = document.getElementById("dropdown");
  d.style.display = (d.style.display === "block") ? "none" : "block";
}


// =========================
// CLOUDINARY UPLOAD FUNCTION
// =========================
async function uploadImage(file){

  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "infinityspot");

  let res = await fetch(
    "https://api.cloudinary.com/v1_1/dxyjhrxmx/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  let data = await res.json();
  return data.secure_url;
}


// =========================
// ADD POST (TEXT + IMAGE)
// =========================
async function addPost(){

  let text = document.getElementById("postText").value;
  let file = document.getElementById("imageFile").files[0];

  if(text.trim() === "" && !file) return;

  let imageUrl = "";

  if(file){
    imageUrl = await uploadImage(file);
  }

  db.collection("posts").add({
    user: "JK",
    content: text,
    image: imageUrl,
    likes: 0,
    time: Date.now()
  });

  document.getElementById("postText").value = "";
  document.getElementById("imageFile").value = "";
}


// =========================
// REAL TIME FEED
// =========================
db.collection("posts")
.orderBy("time", "desc")
.onSnapshot(snapshot => {

  feed.innerHTML = "";

  snapshot.forEach(doc => {
    let p = doc.data();

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <b>${p.user}</b>
      <p>${p.content}</p>

      ${p.image ? `<img src="${p.image}" class="post-img">` : ""}

      <button class="like-btn" onclick="likePost('${doc.id}', ${p.likes || 0})">
        ❤️ <span>${p.likes || 0}</span>
      </button>
    `;

    feed.appendChild(div);
  });

});


// =========================
// LIKE SYSTEM
// =========================
function likePost(id, currentLikes){

  db.collection("posts").doc(id).update({
    likes: currentLikes + 1
  });

  let btn = event.target;
  btn.classList.add("pop");

  setTimeout(() => {
    btn.classList.remove("pop");
  }, 300);
}