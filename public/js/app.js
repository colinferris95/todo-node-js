
function todoClick(){


	var todoItems = document.querySelectorAll(".todo_item");


	console.log(todoItems);
	//todo_items.style.backgroundColor = "black";

	todoItems.forEach(function(elem){


		var click = elem.children[0].children[0];



		var todoLink = elem.children[1];


		console.log(click);

		console.log(todoLink);


		click.addEventListener("click",function(){

			todoLink.classList.toggle("clicked");

		});


		
	});

};

function formValidateNew(){

	

	var todoItem = document.getElementById("title").value;

	if(todoItem == ""){

		document.getElementById("empty").textContent = "Field is required";

		return false;
	}




}