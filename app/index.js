const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV;
const { database }  = config[env];

// Link .env file to process.env
dotenv.config();

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err)=>{
    if(err) throw err;
    console.log("Mongo connected")
});
mongoose.set('useCreateIndex', true);

// Intializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
const products = require('./routes/products');
app.use('/api', products);

// Starting
app.listen(app.get('port'), () => {
    console.log('Server is on port', app.get('port'));
});
