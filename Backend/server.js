const express = require('express');
const app = express();
const db = require('./db.js');
const personRoutes = require('./routes/PersonRoutes.js'); // Import the person routes
const menuRoutes = require('./routes/MenuRoutes.js'); // Import the menu routes
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { find } = require('lodash');
require('dotenv').config(); // Load environment variables from .env file

const cors = require('cors');
const Person = require('./models/person.js');
app.use(cors());
const PORT = process.env.PORT || 3000;


//currently we assume ki fronend se json data aa raha hai
app.use(bodyParser.json()); // store json data in req.body



//Middleware function to log endpoint request details
//Now we can pass this LogRequest function as a middleware to any route-> but we want to use it for all routes
//So we can use app.use(LogRequest) to use this middleware for all routes
const LogRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] request made to ${req.originalUrl}`);
    next();
}

app.use(LogRequest); // Use the middleware for all routes


passport.use(new LocalStrategy(async (username, password, done) => {
    // Authencation Logic here
    try {
        console.log('Received credentials:', username, password);
        const User = await Person.findOne({ username: username });
        if( !User){
            return done(null, false, {message: 'User not found'});
        }

        const isPasswordValid = User.password === password ? true : false;
        if(isPasswordValid){
            return done(null, User);
        }else{
            return done(null, false, {message: 'Invalid password'});
        }

    }
    catch (error) {
        console.error('Error during authentication:', error);
        return done(error);
    }
}));
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
