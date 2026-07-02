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


// ================= TOGGLE MENU =================
function toggleMenu(){
  const menu = document.getElementById("dropdown");

  if(!menu) return;

  if(menu.classList.contains("show")){
    menu.classList.remove("show");
  } else {
    menu.classList.add("show");
  }
}

// ================= ADD POST (TEXT ONLY FIXED) =================
function addPost(){

  const textEl = document.getElementById("postText");
  if(!textEl) return;

  let text = textEl.value;

  if(text.trim() === ""){
    return;
  }

  db.collection("posts").add({
    user: localStorage.getItem("username") || "JK",
    content: text,
    likes: 0,
    time: Date.now()
  });

  textEl.value = "";
}


// ================= REAL TIME FEED =================
db.collection("posts")
.orderBy("time","desc")
.onSnapshot(snapshot=>{

  feed.innerHTML = "";

  snapshot.forEach(doc=>{
    let p = doc.data();

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <b>${p.user}</b>
      <p>${p.content}</p>

      <button onclick="likePost('${doc.id}', ${p.likes || 0})">
        ❤️ ${p.likes || 0}
      </button>
    `;

    feed.appendChild(div);
  });

});


// ================= LIKE =================
function likePost(id, likes){

  db.collection("posts").doc(id).update({
    likes: likes + 1
  });
}


// ================= SCROLL + FOCUS =================
function scrollToTop(){
  window.scrollTo({top:0, behavior:"smooth"});
}

function focusPostBox(){
  document.getElementById("postText").focus();
}

