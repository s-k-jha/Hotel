const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,  
    },
    work: {
        type: String,
        enum: ['developer', 'designer', 'manager', 'warden', 'BDE', 'HR', 'other'], 
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

const Person = mongoose.model('Person', personSchema);

module.exports = Person;