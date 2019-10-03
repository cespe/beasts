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

// TODO These setters are not used consistently in the code -- do I need them? What's the point?

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
	todoLi.id = todo.id;
	var selectedButton = document.createElement('button')
	selectedButton.name = 'selected';
	selectedButton.type = 'button';	// to distinguish from a submit or reset button
	if (todo.selected) {
		selectedButton.classList.add('selected');
	}
	todoLi.appendChild(selectedButton);
	var completedButton = document.createElement('button')
	completedButton.name = 'completed';
	completedButton.type = 'button';
	if (todo.completed) {
		completedButton.classList.add('completed');
	}
	todoLi.appendChild(completedButton);
	var deleteButton = document.createElement('button')
	deleteButton.name = 'deleted';
	deleteButton.type = 'button';
	if (todo.deleted) {
		deleteButton.classList.add('deleted');
	}
	todoLi.appendChild(deleteButton);
	var siblingButton = document.createElement('button')
	siblingButton.name = 'addSibling';
	siblingButton.type = 'button';
	todoLi.appendChild(siblingButton);
	var childButton = document.createElement('button')
	childButton.name = 'addChild';
	childButton.type = 'button';
	todoLi.appendChild(childButton);
	var selectChildrenButton = document.createElement('button')
	selectChildrenButton.name = 'selectChildren';
	selectChildrenButton.type = 'button';
	todoLi.appendChild(selectChildrenButton);
	var entry = document.createElement('p');
	entry.contentEditable = true;
	entry.textContent = todo.entry;
	todoLi.appendChild(entry);
	return todoLi;
}

// Build DOM elements from the todos array, e.g. when app first loads
// or when todos are filtered for display
function createTodosUl(todosArray, filter) {
	
	var todosUl = document.createElement('ul');

	var filteredArray = todosArray.filter(function(todo) {
		if (filter === "all") {
			return !todo.deleted;
		} else if (filter === "active") {
			return !todo.deleted && !todo.completed;
		} else if (filter === "completed") {
			return todo.completed;
		} else if (filter === "deleted") {
			return todo.deleted;
		} else {
			return true;
		}
	});

	for (var i = 0; i < filteredArray.length; i++) {
		var todo = filteredArray[i];
		var todoLi = createTodoLi(todo);
		if (todo.children.length > 0) {
			var nestedTodos = createTodosUl(todo.children);	// TODO add filter here to filter children?
			todoLi.appendChild(nestedTodos);
			todosUl.appendChild(todoLi);
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
	newLi.children[6].focus();	// TODO children[x] too brittle
}

// Append a new todoLi in a child todosUl under a given todoLi, ready for text entry.
// The function creates a new UL under the parent todo if necessary. Handling this case
// explicitly avoids having to deal with the error of possibly inserting a second UL under the parent.

function appendNewChildTodoLi(todoLi) {

	var newTodo = new Todo();
	var parentTodo = findTodo(todos, todoLi.id);
	insertTodo(parentTodo.children, newTodo);
	
	var newLi = createTodoLi(newTodo);

	// Case one: there is already a <ul> to hold nested children
	// TODO Identifying the nested <ul> by children[x] is brittle. Adding a class 'children' would fix that.	
	if (todoLi.children[7] && todoLi.children[7].nodeName === "UL") {
		existingUl = todoLi.children[7];
		existingUl.appendChild(newLi);	

	} else {

	// Case two: there are no children yet, create the <ul> to hold them
	
		var newUl = document.createElement('ul');
		newUl.appendChild(newLi);
		todoLi.appendChild(newUl);
	}

	newLi.children[6].focus();	// focus the entry <p>
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
	if (event.target.nodeName === "P") {
		var todoLi = event.target.parentElement;
		var todo = findTodo(todos, todoLi.id);
		// Is this conditional necessary?
		if (todo) {
			if (todo.entry !== event.target.textContent) {
				todo.update(event.target.textContent);
			}
		}
	}
}

function todoClickHandler(event) {
	if (event.target.nodeName === "BUTTON") {
		var todoLi = event.target.parentElement;
		var todo = findTodo(todos, todoLi.id)
		if (event.target.name === "selected") {
			var todoLiSelectButton = todoLi.children[0];
			todoLiSelectButton.classList.toggle('selected');
			todo.selected = !todo.selected;
			var selectAllButton = document.getElementsByName('selectAll')[0];
			if (todo.selected) {
				selectAllButton.classList.add('selected');
			} else {
				// TODO convert to array.find() to stop looping as soon as a match is found
				var selectedCount = 0;
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].selected === true) {
						selectedCount++;
					}
				}
				if (selectedCount === 0) {
					selectAllButton.classList.remove('selected');
				}
			}
		}
		if (event.target.name === "completed") {
			var todoLiCompletedButton = todoLi.children[1];
			todoLiCompletedButton.classList.toggle('completed');
			todo.completed = !todo.completed;
			var markCompletedButton = document.getElementsByName('markCompleted')[0];
			if (todo.selected) {
				markCompletedButton.classList.add('completed');
			}
			if (!todo.completed) {
				// TODO convert to array.find() to stop looping as soon as a match is found
				var count = 0;
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].selected === true && todos[i].completed === true) {
						count++;
					}
				}
				if (count === 0) {
					markCompletedButton.classList.remove('completed');
				}
			}
		}
		if (event.target.name === "deleted") {
			var todoLiDeleteButton = todoLi.children[2];
			todoLiDeleteButton.classList.toggle('deleted');
			todo.deleted = !todo.deleted;
		}
		if (event.target.name === "addSibling") {
			insertNewTodoLi(todos, todoLi.id)
		}
		if (event.target.name === "addChild") {
			appendNewChildTodoLi(todoLi)
		}
		if (event.target.name === "selectChildren") {
			var todoLiSelectChildrenButton = todoLi.children[5];
			var todoLiUl = todoLi.children[7];
			if (todoLiUl && todoLiUl.children.length > 0) {
				todoLiSelectChildrenButton.classList.toggle('selected');
				var selected = todoLiSelectChildrenButton.classList.contains('selected');
				// TODO update children todo.selected below	
				for (var i = 0; i < todoLiUl.children.length; i++) {
					if (selected) {
						todoLiUl.children[i].children[0].classList.add('selected');
					} else {
						todoLiUl.children[i].children[0].classList.remove('selected');
					}
				}
			}
		}
	}
}

function actionsClickHandler() {
	if (event.target.nodeName === "BUTTON") {		// TODO is this conditional needed?
		var todolist = document.getElementById('todolist');
		if (event.target.name === "showAll") {
			document.getElementById('todolist').innerHTML = '';
			todolist.appendChild(createTodosUl(todos, 'all'));
		}
		if (event.target.name === "showActive") {
			document.getElementById('todolist').innerHTML = '';
			todolist.appendChild(createTodosUl(todos, 'active'));
		}
		if (event.target.name === "showCompleted") {
			document.getElementById('todolist').innerHTML = '';
			todolist.appendChild(createTodosUl(todos, 'completed'));
		}
		if (event.target.name === "showDeleted") {
			document.getElementById('todolist').innerHTML = '';
			todolist.appendChild(createTodosUl(todos, 'deleted'));
		}
		if (event.target.name === "selectAll") {
			var selectAllButton = event.target;
			var todosUl = todolist.children[0];
			if (selectAllButton.classList.contains('selected')) {
				selectAllButton.classList.remove('selected');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					todoLiSelectButton.classList.remove('selected');
					var todo = findTodo(todos, todoLi.id)
					todo.selected = false;
				}
			} else {
				selectAllButton.classList.add('selected');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					todoLiSelectButton.classList.add('selected');
					var todo = findTodo(todos, todoLi.id)
					todo.selected = true;
				}
			}
		}
		if (event.target.name === 'markCompleted') {
			var markCompletedButton = event.target;
			var todosUl = todolist.children[0];
			if (markCompletedButton.classList.contains('completed')) {
				markCompletedButton.classList.remove('completed');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					var todoLiCompletedButton = todoLi.children[1];
					if (todoLiSelectButton.classList.contains('selected')) {
						todoLiCompletedButton.classList.remove('completed');
						var todo = findTodo(todos, todoLi.id);
						todo.markCompleted(false);
					}	
				}
			} else {
				markCompletedButton.classList.add('completed');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					var todoLiCompletedButton = todoLi.children[1];
					if (todoLiSelectButton.classList.contains('selected')) {
						todoLiCompletedButton.classList.add('completed');
						var todo = findTodo(todos, todoLi.id);
						todo.completed = true;
				
					}
				}
			}
		}
	}
}

function setUpEventListeners() {
	var todolist = document.getElementById('todolist');
	todolist.addEventListener('focusout', editHandler);
	todolist.addEventListener('click', todoClickHandler);
	var actions = document.getElementById('actions');
	actions.addEventListener('click', actionsClickHandler);
//	todolist.addEventListener('change', changeHandler);
//	todolist.addEventListener('keyup', keyUpHandler);
}

setUpEventListeners();

