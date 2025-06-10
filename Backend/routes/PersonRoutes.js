const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // Import the Person model
const bodyParser = require('body-parser');

const {jwtAuthMiddleware, generateToken} = require('../jwt.js'); 


router.post('/signup', async (req, res) => {
    try {
        const data = req.body; //data is in json format using body-parser
        const newPerson = new Person(data); //create a new person object using the data from the request body

        const response = await newPerson.save(); //save the person object to the database
        console.log('Person saved successfully:');
        const payload = {
            id: response._id,
            username: response.username, 
        }
        const token = generateToken(payload); 
        console.log('Token generated successfully:', token);
        res.status(200).json({response: response, token: token}); 
    }
    catch (error) {
        console.error('Error saving person:', error);
        res.status(500).send('Internal server error');
    }
});

//Login route to authenticate user and generate JWT token

router.post('/login', async (req, res) => {
    //extract username and password from request body
    const { username, password } = req.body;
    
    //Find the user in the database based on username
    try {
        const user = await Person.findOne({ username: username });

        if(!user || !(await user.comparePassword(password))) {
            return res.status(404).send('Invalid username or password'); // If user not found, send 404 status
        }

        // if user found, generate JWT token
        const payload = {
            id: user._id,
            username: user.username, 
        }
        const token = generateToken(payload); // Generate JWT token using the payload
        console.log('Token generated successfully:', token);
        res.status(200).json({ response: user, token: token }); // Send the user data and token in the response

    }
    catch (error) {
        res.status(500).send('Internal server error'); 
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user; // Get user data from the request object
        const userId = userData.id; // Extract user ID from the user data
        const user = await Person.findById(userId); // Find the user in the database by ID
        if (!user) {
            return res.status(404).send('User not found'); // If user not found, send 404 status
        }
        res.status(200).json({user}); // Send the user data in the response
    }catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal server error'); // If an error occurs, send 500 status
    }
});


//get request to fetch all the persons data from the database
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find(); //find method is used to find all the documents in the collection
        console.log('Data fetched successfully:');
        res.status(200).send(data); 
    }
    catch (error) {
        console.error('Internal server error:');
        res.status(500).send('Internal server error');   
    }
})


//get request to fetch the person data based on work type
router.get('/:workType',async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if (workType == 'developer' || workType == 'designer' || workType == 'manager'|| workType == 'warden') {
            const response = await Person.find({ work: workType });
            console.log('Data fetched successfully:');
            res.status(200).send(response); //200 is the status code for success
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("internal server error");
    }
})

//get request to fetch the person data based on id
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; 
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,
        } )
        if(!response){
            return res.status(404).send('Person not found');
        }
        res.status(200).send(response);
    }
    catch (error) {
        console.error('Error saving person:', error);
        res.status(500).send('Internal server error');
    }
});

//delete request to delete the person data based on id
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; 
        const updatePersonData = req.body;

        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).send('Person not found');
        }
        res.status(200).send(response);
    }
    catch (error) {
        console.error('Error saving person:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router; // Export the router to use in other files
