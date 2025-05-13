const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true, 
    },
    taste: {
        type: String,
        enum: ['sweet', 'sour', 'spicy'],
        required: true, 
    },
    is_drink: {
        type: Boolean,
        default: false, 
    },
    // ingredients: {
    //     type: [String],
    //     default: [],
    // },
    sales: {
        type: Number,
        default: 0, 
    },
    image: {
        type: String,
        default: '', 
    },
    
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

module.exports = MenuItem;