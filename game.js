let score = 0;
let time = 30;
let game;
let gameActive = true;

let box = document.getElementById("box");
let scoreText = document.getElementById("score");
let timeText = document.getElementById("time");

// 🎨 RANDOM COLOR
function randomColor(){
  let colors = ["red","blue","green","yellow","purple","orange","pink"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 📍 MOVE BOX
function moveBox(){
  let x = Math.random() * 200;
  let y = Math.random() * 300;

  box.style.position = "relative";
  box.style.left = x + "px";
  box.style.top = y + "px";

  box.style.background = randomColor();
}

// 💥 SCORE FUNCTION (FIXED)
function scoreUp(){

  if(!gameActive) return;   // 🔥 IMPORTANT FIX

  score++;
  scoreText.innerText = score;

  box.style.transform = "scale(1.3)";
  setTimeout(() => {
    box.style.transform = "scale(1)";
  }, 120);

  moveBox();
}

// 🚀 START GAME
function startGame(){

  score = 0;
  time = 30;
  gameActive = true;   // 🔥 ENABLE GAME

  scoreText.innerText = score;
  timeText.innerText = time;

  moveBox();

  game = setInterval(() => {

    time--;
    timeText.innerText = time;

    if(time <= 0){
      clearInterval(game);
      gameActive = false;  // 🔥 DISABLE GAME

      alert("Game Over! Score: " + score);

      showRestart();
    }

  }, 1000);
}

// 🔄 RESTART
function showRestart(){

  let btn = document.createElement("button");
  btn.innerText = "Restart 🔄";

  btn.style.marginTop = "20px";
  btn.style.padding = "10px 15px";
  btn.style.border = "none";
  btn.style.borderRadius = "10px";
  btn.style.background = "red";
  btn.style.color = "white";

  btn.onclick = function(){
    location.reload();
  };

  document.body.appendChild(btn);
}

// ▶️ START
startGame();
moveBox();