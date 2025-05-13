var prompt = require('prompt-sync')();
const guestList = ['John', 'Jane', 'Jim', 'Jack', 'Jill'];
const guestName = prompt("Enter your name: ");
if(guestList.includes(guestName)) {
    console.log("Welcome to the party, " + guestName + "!");
}
else {
    console.log("Sorry, " + guestName + ". You're not on the guest list.");
}