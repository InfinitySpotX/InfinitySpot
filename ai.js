function ask(){

  let q = document.getElementById("q").value.toLowerCase();
  let a = "";

  if(q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("Hai") || q.includes("Hi")){
    a = "👋 Hello Bro! Welcome to Infinity Spot";
  }
  else if(q.includes("movie") || q.includes("Movie") || q.includes("Movies")){
    a = "🎬 Check Movie section above";
  }
  else if(q.includes("Aaro")){
    a = "Horror investigation thriller created by filmstar";
  }
  else{
    a = "😅 I don't understand that";
  }

  // ⏱️ 3 second delay
  document.getElementById("a").innerText = "Thinking... 🤖";

  setTimeout(function(){
    document.getElementById("a").innerText = a;
  }, 3000);
}