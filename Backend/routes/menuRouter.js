const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem.js'); // Import the MenuItem model

//below is the post request to create a new menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        res.status(200).send(response);
    }
    catch (err) {
        console.log("internal server error");
        res.status(500).send("internal server error");
    }
})

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        const response = await MenuItem.find({ taste: tasteType }); 
        res.status(200).send(response);
    }
    catch (err) {
        console.log("enter proper taste type");
        res.status(500).send("Internal server error");
    }
})

// below is the get request to fetch all the menu items from the database
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("internal server error");
    }
})

module.exports = router; // Export the router to use in other files