const Memory = {

save(key, value){
    localStorage.setItem("SPYMO_" + key, JSON.stringify(value));
},

load(key){
    const data = localStorage.getItem("SPYMO_" + key);
    return data ? JSON.parse(data) : null;
},

rememberName(message){

    message = message.trim();

    const match = message.match(/my name is (.+)/i);

    if(match){

        const name = match[1].trim();

        this.save("username", name);

        return "Nice to meet you, " + name + " 😊";
    }

    return null;
},

getName(){

    return this.load("username");

}

};
