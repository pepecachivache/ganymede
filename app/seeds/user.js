const User = require('../models/User');
const dotenv = require('dotenv');
const {development} = require('../config/config');
const mongoose = require('mongoose');
const database = development.database;

// Link .env file to process.env
dotenv.config();

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(err) throw err;
    
    console.log("Mongo connected")
    
    const newUser = new User({
        user: 'admin',
        password: 'admin', 
    });
    
    newUser.save((err, user)=>{
        if(err)
        console.log(err);
        
        console.log("User created")
        exit();
    });
    
    
    
});

mongoose.set('useCreateIndex', true);

function exit() {
    mongoose.disconnect();
}

