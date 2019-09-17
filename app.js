const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const expressSanitizer = require("express-sanitizer");


const app = express(); 


app.set("view engine", "ejs");

app.use(methodOverride('_method'));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.use(expressSanitizer());


//todos

let todos = [{id: 1, title: "Add user accounts", task: "task desc1"},
			{id: 2, title: "Add authentication", task: "task desc2"}];

//index route
app.get("/", (req,res)=>{

	res.redirect("/todos");

});


//index route
app.get("/todos", (req,res)=>{

	
	res.render("index.ejs", {todos:todos});

});


//new route
app.get("/todos/new", (req,res)=>{

	console.log(todos.length);

	let newId = todos.length + 1;

	res.render("new.ejs", {newId:newId});
});


//create

app.post("/todos", (req,res)=>{

	
	const id = req.body.id;

	const title = req.sanitize(req.body.title);

	const task = req.sanitize(req.body.task);

	let newTodo = {id:id, title:title, task:task};

	todos.push(newTodo);


	res.redirect("/todos");

});


//show

app.get("/todos/:id", (req,res)=>{

	let todoValue;

	let todoId = req.params.id

	for (let key in todos){
		
		if (todoId == todos[key]["id"]){

			todoValue = todos[key];
			

		}


	}

	

	res.render("show.ejs", {todoValue:todoValue})
});


//edit
app.get("/todos/:id/edit", (req,res)=>{


	let todoValue;

	let todoId = req.params.id

	for (let key in todos){
		
		if (todoId == todos[key]["id"]){

			todoValue = todos[key];
			

		}


	}


	res.render("edit.ejs", {todoValue:todoValue});

});


//update
app.put("/todos/:id", (req,res)=>{
	
	let todoId = req.params.id
	let title = req.sanitize(req.body.title);
	let task = req.sanitize(req.body.task);

	let newTodo = {id:todoId, title:title, task:task};


	for (let key in todos){
		
		if (todoId == todos[key]["id"]){

			todos[key] = newTodo;
			

		}


	}

	res.redirect("/todos");



});


app.delete("/todos/:id", (req,res)=>{


	
	let todoId = req.params.id

	for (let key in todos){

		if (todoId == todos[key]["id"]){

			todos.splice(key,1);

		}
	}


	res.redirect("/todos");

});




app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});