const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        connectionLimit: 10,
        database: process.env.DATABASE || 'mongodb+srv://sirena:sirena@cluster0-vgvxp.mongodb.net/ganymede?retryWrites=true&w=majority',    
    },
    production:{
        connectionLimit: 10,
        database: process.env.DATABASE || 'mongodb+srv://sirena:sirena@cluster0-vgvxp.mongodb.net/ganymede?retryWrites=true&w=majority',    
    }
}