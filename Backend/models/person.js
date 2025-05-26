const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,  
    },
    work: {
        type: String,
        enum: ['developer', 'designer', 'manager', 'warden', 'BDE', 'HR'], 
        default: 'other', 
    },
    email: {
        type: String, 
        // unique: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
});

personSchema.pre('save', async function(next){
    const Person = this; // 'this' refers to the document being saved
    try{

        if(!Person.isModified('password')) return next(); // If password is not modified, skip hashing
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(Person.password, salt); // Hash the password with the salt
        Person.password = hashedPassword; // Set the hashed password

        next(); // Call next() to proceed with the save operation

    }catch(err){
        return next(err); // If an error occurs, pass it to the next middleware

    }
})
personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password); // Compare the candidate password with the hashed password
        return isMatch; // Return true if they match, false otherwise
    } catch (error) {
        throw new Error('Error comparing passwords'); // Handle any errors that occur during comparison
    }
  }

const Person = mongoose.model('Person', personSchema);

module.exports = Person;