var _ = require('lodash');

const notes = require('./notes.js'); // Importing the notes module
var age = notes.age;
console.log("notes file age value: " + age);
var fs = require('fs');
var os = require('os');

function callback() {
    console.log("Addition executed!");
}

const add = (a, b, callback) => {
    console.log(a + b); // Output: 15
    callback();
}
add(5, 10, callback); 

const list = ["shivam", "sachin", "rohit", "virat", 1,2,1,'1', '2','2'];
const uniqueList = _.uniq(list); // Using lodash to get unique values
console.log(uniqueList);
// console.log(os); 
// console.log(fs);

console.log("server is running");