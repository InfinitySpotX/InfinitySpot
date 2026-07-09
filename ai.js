const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

function sendMessage(){

const text = input.value.trim();

if(text==="") return;

const msg = document.createElement("div");
msg.className="message user";
msg.textContent=text;

chatBox.appendChild(msg);

input.value="";

chatBox.scrollTop=chatBox.scrollHeight;

}

sendBtn.onclick=sendMessage;

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

sendMessage();

}

});
