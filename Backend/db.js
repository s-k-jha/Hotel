require('dotenv').config(); 
const mongoose = require('mongoose');


//define the mongodb connection url
// const mongoURL ='mongodb://localhost:27017/hotels';
// const mongoURL ='mongodb+srv://shivam:mongodb12345@cluster.mikylaq.mongodb.net/';

const mongoURL = process.env.MONGODB_URI;

//connect to the mongodb database
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//get the default connection
//mongoose maintain a default connection object representing the mongodb database
const db = mongoose.connection;

//define event listeners for the connection object
db.on('connected', () => {
    console.log('Connected to MongoDB database successfully!');
} );


//for error handling
db.on('error', (err) => {
    console.error('Error connecting to MongoDB database:', err);
});

//for disconnection handling
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB database!');
});

//export the connection object for use in other modules
module.exports = db;