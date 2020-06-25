//setting up express,path , port
const express = require('express');
const port = 8000;
const path = require('path');

//configuring mongoose and importing schema
const db = require('./config/mongoose');
const Todo = require('./models/todo');

//firing up express
const app = express();

//set up view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//...middlewares
//for decoding form data
app.use(express.urlencoded());
//for css,js files
app.use(express.static('assets'));
// for initialising req data
app.use(function(req,res,next){
    
    if(req.body.dueDate=='')
    {
        req.body.dueDate='NO DEADLINE';
    }

    req.body.checked = false;
    
    next();
});



//controller for home page and fetching data from db
app.get('/',function(req,res){

   //fetching data from db
    Todo.find({},function(err,todos){
       
        if(err)
        {
            console.log('error in fetching the tasks from the db');
            return;
        }

        return res.render('home',{
            title:"My Todo List",
            todo_list : todos
        });
    
    });
});

//controller for deleting a task 
app.get('/delete-task',function(req,res){
    let id = req.query.id;
    // console.log(req.query);
    Todo.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error in deleting object in database');
            return;
        }

       return res.redirect('back');
    });
});

//marking and unmarking the checkbox
app.get('/mark',function(req,res){
    let id = req.query.id;
    
    // console.log(req.query);
     //changing the boolean value (checked) from true to false and vise versa 
      Todo.findById(id,function(err,task){
         if(err)
         {
            console.log('error in fetching from the db');
            return;
         }

         task.checked = ! task.checked;
         task.save(function (err) {
            if(err) {
            console.error('ERROR!');
          }
      });

        return res.redirect('back');

    });
   
    
   
});

//contoller that deletes all checked:true items
app.get('/delete-all-checked',function(req,res){
    
    Todo.deleteMany({ checked: true }, function (err) {
        if(err)
         {
            console.log('error in fetching from the db');
            return;
         }
    
       return res.redirect('back');
    });
});

//controller for inserting items into db
app.post('/create-task',function(req,res){
    
    // console.log(req.body);
   
    
// populating db
    Todo.create({
        name : req.body.name,
        category : req.body.category,
        dueDate : req.body.dueDate,
        checked : req.body.checked

    },function(err,newTodo){
        if(err)
        {
            console.log('error in creating task');
            return ;
        }

        console.log('***********',newTodo);
        
       return res.redirect('back');

    });

});


//server listening to given port
app.listen(port,function(err){
  
    if(err)
    {
        console.log('Error in running the server', err);
        return;
    }
    
    console.log("Yup! My Express server is up and running on Port:",port);

});