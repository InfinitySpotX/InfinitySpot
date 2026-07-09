// ==========================
// SPYMO AI - brain.js
// Part 1/3
// ==========================

const SPYMO_AI = {

version: "1.0",

reply(message){

message = message.trim().toLowerCase();


// ---------- MEMORY ----------

if(typeof Memory !== "undefined"){

const saved = Memory.rememberName(message);

if(saved) return saved;

if(
message==="what is my name" ||
message==="what's my name" ||
message==="my name"
){

const name = Memory.getName();

if(name){
return "Your name is " + name + ".";
}

return "I don't know your name yet.";

}

}


// ---------- KNOWLEDGE ----------

if(typeof KNOWLEDGE !== "undefined"){

if(KNOWLEDGE[message]){

return KNOWLEDGE[message];

}

}


// ---------- LOGIC ----------

if(typeof Logic !== "undefined"){

const answer = Logic.calculate(message);

if(answer!==null){

return "Answer: " + answer;

}

if(
message.startsWith("should ") ||
message.startsWith("can ") ||
message.startsWith("is ")
){

return Logic.yesNo();

}

if(message.startsWith("choose ")){

const data = message.replace("choose ","");

const choice = Logic.choose(data);

if(choice){

return "I choose: " + choice;

}

}

}


// ---------- GREETINGS ----------

const greetings=[

"hi",
"hello",
"hey",
"good morning",
"good afternoon",
"good evening"

];

for(let g of greetings){

if(message.includes(g)){

return "Hello 👋 How can I help you?";

}

}


// ---------- HOW ARE YOU ----------

const how=[

"how are you",
"how r u",
"how are u"

];

for(let h of how){

if(message.includes(h)){

return "I'm doing great 😊";

}

}


// ---------- WHO ARE YOU ----------

const who=[

"who are you",
"your name",
"what are you"

];

for(let w of who){

if(message.includes(w)){

return "I am SPYMO AI.";

}

  }
  // ---------- DATE ----------

if(
message === "date" ||
message.includes("today date")
){

const today = new Date();

return today.toDateString();

}


// ---------- TIME ----------

if(
message === "time" ||
message.includes("what time")
){

const now = new Date();

return now.toLocaleTimeString();

}


// ---------- THANKS ----------

const thanks = [

"thanks",
"thank you",
"thx"

];

for(let t of thanks){

if(message.includes(t)){

return "You're welcome ❤️";

}

}


// ---------- BYE ----------

const bye = [

"bye",
"goodbye",
"see you",
"see ya"

];

for(let b of bye){

if(message.includes(b)){

return "Goodbye 👋 Have a nice day.";

}

}


// ---------- HELP ----------

if(
message === "help" ||
message === "commands"
){

return `Available Commands

• hello
• who are you
• how are you
• date
• time
• calculator (10+20)
• choose apple,mango
• should ...
• can ...
`;

}


// ---------- SMALL TALK ----------

if(message.includes("good")){

return "😊";

}

if(message.includes("ok")){

return "👍";

}

if(message.includes("yes")){

return "Great!";

}

if(message.includes("no")){

return "Okay.";

}

if(message.includes("love")){

return "❤️";

}

if(message.includes("joke")){

return "Why do programmers prefer dark mode? Because light attracts bugs 😄";

}


// ---------- FALLBACK ----------

return this.smartReply(message);

},

smartReply(message){

const replies=[

"I don't understand that yet.",

"Can you explain differently?",

"I'm still learning.",

"Interesting.",

"Tell me more.",

"I'll learn that in the future."

];

return replies[
Math.floor(Math.random()*replies.length)
];

  }
  // ==========================
// FINAL PART
// ==========================

}; // End of SPYMO_AI object

// Optional helper
function askAI(message){
    return SPYMO_AI.reply(message);
}
