const SPYMO_AI = {

greetings: [
"hello","hi","hey","good morning","good afternoon","good evening"
],

bye: [
"bye","goodbye","see you","see ya"
],

howAreYou: [
"how are you",
"how are u",
"how r u"
],

whoAreYou: [
"who are you",
"your name",
"what are you"
],

contains(text,list){
    return list.some(item => text.includes(item));
},

reply(message){

message = message.toLowerCase().trim();

// Greeting
if(this.contains(message,this.greetings)){
    return "Hello! 👋 How can I help you?";
}

// How are you
if(this.contains(message,this.howAreYou)){
    return "I'm doing great! Thanks for asking. 😊";
}

// Who are you
if(this.contains(message,this.whoAreYou)){
    return "I am SPYMO AI, created using HTML, CSS and JavaScript.";
}

// Time
if(message.includes("time")){
    return new Date().toLocaleTimeString();
}

// Date
if(message.includes("date")){
    return new Date().toDateString();
}

// Calculator
if(/^[0-9+\-*/(). ]+$/.test(message)){
    try{
        return "Answer: " + eval(message);
    }catch(e){}
}

// Bye
if(this.contains(message,this.bye)){
    return "Goodbye! 👋 Have a nice day.";
}

return "I don't know that yet. Teach me in the next version.";
}

};
