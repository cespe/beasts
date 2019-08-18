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

// Used by appendNewChildTodoLi
function findTodo(array, id) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.id === id) {
			return todo;
		}
		if (todo.children.length > 0) {
			var match = findTodo(todo.children, id);
			if (match) {
				return match;
			}
		}
	}
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
	todoLi.contentEditable = true;
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

// Insert a new empty todoLi into the given array after the given todoLi.id, ready for text entry.
// If no todoLi.id is given, defaults to push().
// 'array' argument will be either todos or a todo.children array, so no recursive search is needed.

function insertNewTodoLi(array, id) {
	var targetLi = document.getElementById(id);
	var insertAfter = array.find(function(el) {
		if (el.id === id) {
			return el
		}
	});
	var newTodo = new Todo();
	insertTodo(array, newTodo, insertAfter);
	var newLi = createTodoLi(newTodo);
	targetLi.insertAdjacentElement('afterend', newLi);
	newLi.focus();
}

// Append a new todoLi in a child todosUl under a given todoLi, ready for text entry.
// The function creates a new UL under the parent todo if necessary. Handling this case
// explicitly avoids having to deal with the error of possibly inserting a second UL under the parent.

function appendNewChildTodoLi(todoLi) {

	var newTodo = new Todo();
	var parentTodo = findTodo(todos, todoLi.id);
	insertTodo(parentTodo.children, newTodo);
	
	var newLi = createTodoLi(newTodo);

	// Case one: there is already a <div><ul> to hold nested children
	
	if (todoLi.nextSibling && todoLi.nextSibling.nodeName === "DIV") {
		existingUl = todoLi.nextSibling.children[0];	// the <ul> in the <div>
		existingUl.appendChild(newLi);	

	} else {

	// Case two: there are no children yet, create the <div><ul> to hold them
	
		var nestingWrapper = document.createElement('div');
		var newUl = document.createElement('ul');
		nestingWrapper.appendChild(newUl);
		newUl.appendChild(newLi);
		todoLi.insertAdjacentElement('afterend', nestingWrapper);
	}

	newLi.focus();
}

/************************************* Event Handling ***********************************/

function keyUpHandler(event) {
	console.log(event);
}

function setUpEventListeners() {
	var todolist = document.getElementById('todolist');
	todolist.addEventListener('keyup', keyUpHandler);
}
