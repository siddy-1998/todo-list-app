//include mongoose
const mongoose = require('mongoose');
//define schema
const todoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    category:{
        type: String,
        required: true
    },
    dueDate:{
        type: String,
        required:true
    },
    checked:{
        type: Boolean,
        required: true
    }

});

//attaching schema to model
const Todo = mongoose.model('Todo',todoSchema);

//exporting this model to index.js
module.exports = Todo;