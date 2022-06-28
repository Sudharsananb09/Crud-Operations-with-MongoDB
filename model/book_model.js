const mongoose = require('mongoose');
const db = require('../config/db');
const bookSchema = new mongoose.Schema({
    title:{
        type:String                   
    },
    isbn:{
      type:Number
    },
    author:{
        type:String      
    }
});
const bookmodel = db.model('books',bookSchema);
module.exports = bookmodel;