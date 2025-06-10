const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); // Import the Person model

passport.use(new LocalStrategy(async (username, password, done) => {
    // Authencation Logic here
    try {
        // console.log('Received credentials:', username, password);
        const User = await Person.findOne({ username: username });
        if(!User){
            return done(null, false, {message: 'User not found'});
        }
        // const isPasswordValid = User.password === password ? true : false;
        const isPasswordValid = await User.comparePassword(password); // Assuming comparePassword is a method defined in the Person model to compare hashed passwords
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


module.exports = passport;