const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, type){

const div=document.createElement("div");

div.className="message "+type;

div.textContent=text;

chatBox.appendChild(div);

chatBox.scrollTop=chatBox.scrollHeight;

}

function sendMessage(){

const text=input.value.trim();

if(!text) return;

addMessage(text,"user");

input.value="";

setTimeout(()=>{

const reply=SPYMO_AI.reply(text);

addMessage(reply,"bot");

},400);

}

sendBtn.onclick=sendMessage;

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});
