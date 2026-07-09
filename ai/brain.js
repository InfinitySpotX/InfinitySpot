const SPYMO_AI = {

reply(message){

message = message.toLowerCase().trim();

if(message==="hello" || message==="hi"){
return "Hello 👋";
}

if(message==="how are you"){
return "I'm doing great! 😊";
}

if(message==="who are you"){
return "I am SPYMO AI.";
}

if(message==="bye"){
return "See you later 👋";
}

return "Sorry, I don't understand.";
}

};
