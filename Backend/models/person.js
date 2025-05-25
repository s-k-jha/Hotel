const moongoose = require('mongoose');

const personSchema = new moongoose.Schema({
    name: {
        type: String,
    },
    age: {
        Number
    },
    work: {
        type: String,
        enum: ['developer', 'designer', 'manager', 'warden']
    },
    email: {
        String,
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

    }

});

// Create a model based on the schema
const Person = moongoose.model('Person', personSchema);

module.exports = Person;