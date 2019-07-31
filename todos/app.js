// Beasts 8. Nested todos

var todos = [];

function addNewTodo(todo) {
	todos.push(todo);
}

function Todo(entry) {
	this.id = Math.random().toString(36).slice(2);
	if (typeof entry !== "string") {
		this.entry = "";
	} else {
		this.entry = entry;
	}
	this.children = [];
	this.selected = false;
	this.deleted = false;
	this.completed = false;
}

Todo.prototype.changeId = function() {
	this.id = Math.random().toString(36).slice(2);
}

Todo.prototype.update = function(changedEntry) {
	this.entry = changedEntry;
}

Todo.prototype.markSelected = function(bool) {
	this.selected = bool;
}

Todo.prototype.markCompleted = function(bool) {
	this.completed = bool;
}

Todo.prototype.markDeleted = function(bool) {
	this.deleted = bool;
}
Todo.prototype.addChild = function(child) {
	this.children.push(child);
}

function insertTodo(array, todoToInsert, todoBeforeInsertionPoint) {

	// Enforce unique todo ids in the array.
	
	while (	array.find(function(el) {
				if (el.id === todoToInsert.id) {
					return el
				}
			})) {

		todoToInsert.id = Math.random().toString(36).slice(2);
	}

	// Default to push if not inserting.
	
	if (arguments.length < 3) {
		array.push(todoToInsert);
	} else {

	// Insert new todo.
	
	var position = array.indexOf(todoBeforeInsertionPoint) + 1;
	array.splice(position, 0, todoToInsert);
	}
}

function deleteTodo(array, todo) {
	var position = array.indexOf(todo);
	array.splice(position, 1);
}

function createTodoLi(todo) {
	var todoLi = document.createElement('li');
	todoLi.textContent = todo.entry;
	todoLi.id = todo.id;
	return todoLi;
}

// Ul parameter is e.g. the todos ul or one of the children ul.
function insertTodoLi(Ul, todoLi) {
	Ul.appendChild(todoLi);
}

/*
 * Takes an array of todos, either the main todos array or a todo's children array.
 * The main todos <ul> can be appended to <main> available with getElementById('todolist').
 * A nested todos array can be appended to the <li> it belongs to
 *		get the <li> with getElementById(todo.id)
 *

 */



function createTodosUl(todosArray, parent) {
	
	var todosUl = document.createElement('ul');

	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			return createTodosUl(todo.children, todoLi);
		}
		todoLi = createTodoLi(todo);
		todosUl.appendChild(todoLi);
	}

	if (todosArray === todos) {
		parentElement = document.getElementById('todolist');
	} else {
		parentElement = parent;
	}

	parentElement.appendChild(todosUl);
}
