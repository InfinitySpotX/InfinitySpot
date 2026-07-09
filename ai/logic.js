const Logic = {

yesNo(){
    const answers = [
        "Yes.",
        "No.",
        "Maybe.",
        "I don't think so.",
        "Most likely yes."
    ];

    return answers[Math.floor(Math.random() * answers.length)];
},

choose(text){

    if(!text.includes(",")) return null;

    let items = text.split(",");

    items = items.map(i => i.trim());

    return items[Math.floor(Math.random() * items.length)];
},

calculate(text){

    const match = text.match(/^(\d+)\s*([\+\-\*\/])\s*(\d+)$/);

    if(!match) return null;

    const a = Number(match[1]);
    const op = match[2];
    const b = Number(match[3]);

    switch(op){
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return b===0 ? "Cannot divide by zero." : a/b;
    }

    return null;
}

};
