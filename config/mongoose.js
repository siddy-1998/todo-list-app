//including mongoose
const mongoose = require('mongoose');

//connecting mongoose to db
mongoose.connect('mongodb://localhost/todo_list_db');

//estabilishing connection
const db = mongoose.connection;

//on event error
db.on('error',console.error.bind(console,'error connecting to db'));
//on connection is open interact with db
db.once('open',function(){

    console.log('Successfully connected to the database');

});