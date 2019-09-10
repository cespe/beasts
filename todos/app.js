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
	
	if (todoBeforeInsertionPoint === undefined) {
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

/*********************************** Data selection **************************************/

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

/************************************* DOM manipulation ********************************/

function createTodoLi(todo) {
	var todoLi = document.createElement('li');
	//todoLi.contentEditable = true;
	//todoLi.textContent = todo.entry;
	todoLi.id = todo.id;
	var completedButton = document.createElement('button')
	completedButton.name = 'completed';
	completedButton.type = 'button';	// to distinguish from a submit or reset button
	todoLi.appendChild(completedButton);
	var entry = document.createElement('p');
	entry.contentEditable = true;
	entry.textContent = todo.entry;
	todoLi.appendChild(entry);
	return todoLi;
}

// Builds DOM elements from the todos array, e.g. when app first loads
function initializeTodosUl(todosArray) {
	
	var todosUl = document.createElement('ul');

	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		var todoLi = createTodoLi(todo);
		if (todo.children.length > 0) {
			var nestedTodos = initializeTodosUl(todo.children);
			var nestingWrapper = document.createElement('div');
			nestingWrapper.appendChild(nestedTodos);
			todosUl.appendChild(todoLi);
			todosUl.appendChild(nestingWrapper);
		} else {
			todosUl.appendChild(todoLi);
		}
	}
	return todosUl;
}

// Insert a new empty todoLi into the given array after the given todoLi.id, ready for text entry.
// If no todoLi.id is given, defaults to push().
// 'array' argument will be either todos or a todo.children array, so no recursive search is needed.
// TODO run through debugger, looks like it needs revision
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
	if (targetLi !== null) {
		targetLi.insertAdjacentElement('afterend', newLi);
	} else {
		if (document.getElementById('todolist').children.length === 0) {
			var todosUl = document.createElement('ul');
			document.getElementById('todolist').appendChild(todosUl);
		}
		document.getElementById('todolist').children[0].appendChild(newLi);
	}
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

/************************************* Event handling ***********************************/

//function keyUpHandler(event) {
//	event.target.textContent = "triggered";
//}

//function changeHandler(event) {
	// if the target is a todoLi it already has an id that is also in todos array
	//	check if content has changed
	//		if so, update todos todo.entry
	// else ignore, other events will handle buttons, etc (?)
//	var changeEvent = event;
//	var todo = findTodo(todos, event.target.id);
//	if (todo) {
//		todo.entry = event.target.textContent
//	}
//}

function editHandler(event) {
	if (event.target.nodeName === "LI") {
		var todo = findTodo(todos, event.target.id);
		if (todo) {
			if (todo.entry !== event.target.textContent) {
				todo.update(event.target.textContent);
			}
		}
	}
}

function setUpEventListeners() {
	var todolist = document.getElementById('todolist');
	todolist.addEventListener('focusout', editHandler);
//	todolist.addEventListener('change', changeHandler);
//	todolist.addEventListener('keyup', keyUpHandler);
}

setUpEventListeners();

