const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem.js'); // Import the MenuItem model
const multer = require('multer');
//below is the post request to create a new menu item


const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

//before multer code
// router.post('/',upload.single('image'), async (req, res) => {
//     try {
//         const data = req.body;

//         //convert buffer to base64 if file exist
//         if(req.file){
//             const base64Image = req.file.buffer.toString('base64');
//             const mimeType = req.file.mimetype;
//             data.image = `data:${mimeType};base64,${base64Image}`;
//         }
//         const newMenuItem = new MenuItem(data);
//         const response = await newMenuItem.save();
//         res.status(200).send(response);
//         console.log("response of menu created is ", response);
//     }
//     catch (err) {
//         console.log("internal server error", err);
//         res.status(500).send("internal server error");
//     }
// })

//after multer implementation
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);

        const data = req.body;

        // Convert string to number
        data.price = Number(data.price);

        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            const mimeType = req.file.mimetype;
            data.image = `data:${mimeType};base64,${base64Image}`;
        }

        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();

        console.log("Menu created:", response);
        res.status(200).send(response);
    } catch (err) {
        console.error("Internal Server Error:", err);
        res.status(500).send("internal server error");
    }
});


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
