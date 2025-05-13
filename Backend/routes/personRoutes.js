const express = require('express');
const router = express.Router();
const Person = require('../models/person.js'); // Import the Person model
const bodyParser = require('body-parser');


//post request to create a new person
router.post('/', async (req, res) => {
    try {
        const data = req.body; //data is in json format using body-parser
        const newPerson = new Person(data); //create a new person object using the data from the request body

        const response = await newPerson.save(); //save the person object to the database
        console.log('Person saved successfully:');
        res.status(200).json(response);    
    }
    catch (error) {
        console.error('Error saving person:', error);
        res.status(500).send('Internal server error');
    }
});

//get request to fetch all the persons data from the database
router.get('/', async (req, res) => {
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