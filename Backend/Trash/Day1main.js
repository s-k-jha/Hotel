var prompt = require('prompt-sync')({ sigint: true });
var a = 5;
let b = 10;
var c = a + b;
console.log(c); // Output: 15
console.log("My name is John Doe"); // Output: My name is John Doe
console.log("I am a software developer"); // Output: I am a software developer
const cars = ["BMW", "Volvo", "Mini"];
console.log(cars); // Output: [ 'BMW', 'Volvo', 'Mini' ]
console.log(cars[0]); // Output: BMW    
cars.push("Audi"); // Add a new element to the array
console.log(cars); // Output: [ 'BMW', 'Volvo', 'Mini', 'Audi' ]
console.log(typeof cars);
const person  = {
    name : "shivam",
    age :24,
    city : "delhi"

}
console.log(person); // Output: { name: 'shivam', age: 24, city: 'delhi' }
console.log(person.name); // Output: shivam

const age = [25, 30, 35, 40, 45];
const result = age.filter(checkAge);

function checkAge(age) {
    return age > 30;
}
console.log(result); // Output: [ 35, 40, 45 ]
const schoolName = prompt("Enter your school name: ");
console.log("Your school name is: " + schoolName); // Output: Your school name is: [user input]