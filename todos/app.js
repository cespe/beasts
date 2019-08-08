// Beasts 8. Nested todos

/********************************* Data manipulation ***********************************/

var todos = [];

//function addNewTodo(todo) {
//	todos.push(todo);
//}

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

/************************************* DOM manipulation ********************************/

function createTodoLi(todo) {
	var todoLi = document.createElement('li');
	todoLi.textContent = todo.entry;
	todoLi.id = todo.id;
	return todoLi;
}

function createTodosUl(todosArray) {
	
	var todosUl = document.createElement('ul');

	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		var todoLi = createTodoLi(todo);
		if (todo.children.length > 0) {
			todoLi.appendChild(createTodosUl(todo.children));
		}
		todosUl.appendChild(todoLi);
	}
	return todosUl;
}
//	while (	array.find(function(el) {
//				if (el.id === todoToInsert.id) {
//					return el
//				}
//			})) {

// Insert a new empty todoLi after the given todoLi.id, ready for text entry.

function insertNewTodoLi(id) {
	var targetLi = document.getElementById(id);
	var insertAfter = todos.find(function(el) {
		if (el.id === id) {
			return el
		}
	});
	var newTodo = new Todo();
	insertTodo(todos, newTodo, insertAfter);
	var newLi = createTodoLi(newTodo);
	targetLi.insertAdjacentElement('afterend', newLi);
}
// Insert a new todoLi in a child todosUl under a given todoLi.id, ready for text entry.
// Create the nested todosUl if necessary.
// Append a new todoLi.

function insertNewChildTodoLi() {

}
