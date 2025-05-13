var prompt = require('prompt-sync')()
var age = prompt("Enter your age: ");
if(age < 18){
    console.log("You got discount of 30%.");
}
else if(age >= 18 && age <= 60){
    console.log("normal ticket price");
}
else{
    console.log("you will get 60% discount.");
}
