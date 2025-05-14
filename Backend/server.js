const express = require('express');
const app = express();
const db = require('./db.js');
const personRoutes = require('./routes/PersonRoutes.js'); // Import the person routes
const menuRoutes = require('./routes/menuRouter.js'); // Import the menu routes
const bodyParser = require('body-parser');
const router = express.Router();


const { find } = require('lodash');
require('dotenv').config(); // Load environment variables from .env file

const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;


//currently we assume ki fronend se json data aa raha hai
app.use(bodyParser.json()); // store json data in req.body

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

/** 
//post request to create a new person
app.post('/person', (req, res) => {
    const data = req.body; //data is in json format using body-parser
    const newPerson = new Person(data); //create a new person object using the data from the request body
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.email = data.email;
    // newPerson.phone = data.phone;
    // newPerson.address = data.address;


    /**Now the below method not supported with save because callback not 
    supported with save method 
    

    newPerson.save((error, savedPerson)=>{
        if(error){
            console.error('Error saving person:', error);
            res.status(500).send('Error saving person');
        }
        else{
            console.log('Person saved successfully:', savedPerson);
            res.status(200).send(savedPerson); //200 is the status code for sucess
        }

    })
        
       //we'll use async await instead of callback
    

})
       */




app.use('/menu', menuRoutes); // Use the menu routes with the '/menu' prefix
app.use('/person', personRoutes); // Use the person routes with the '/person' prefix



app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});