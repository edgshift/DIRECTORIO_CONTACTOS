const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/contactos')
    }

    catch(error){
        console.error(error);
    }
}

module.exports = connectDB