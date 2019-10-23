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
	this.collapsed = false;
	this.deleted = false;
	this.completed = false;
	this.selected = false;
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
Todo.prototype.markCollapsed = function(bool) {
	this.collapsed = bool;
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

// index positions of todoLi.children[i]
var selectedIndex = 0;
var completedIndex = 1;
var deleteIndex = 2;
var addSiblingIndex = 3;
var addChildIndex = 4;
var showChildrenIndex = 5;
var selectChildrenIndex = 6;
var entryIndex = 7;
var todoLiUlIndex = 8;

function createTodoLi(todo) {
	var todoLi = document.createElement('li');
	todoLi.id = todo.id;

	var selectedButton = document.createElement('button')
	selectedButton.name = 'selected';
	selectedButton.type = 'button';	// to distinguish from a submit or reset button
	selectedButton.textContent = 'Select';
	if (todo.selected) {
		todo.selected = false;		// clean slate when todoLi's are created
	}
	todoLi.appendChild(selectedButton);
	
	var completeButton = document.createElement('button')
	completeButton.name = 'completed';
	completeButton.type = 'button';
	if (todo.completed) {
//		completeButton.classList.add('completed');
		completeButton.textContent = 'Uncomplete';
	} else {
//		completeButton.classList.remove('completed');
		completeButton.textContent = 'Complete';
	}
	todoLi.appendChild(completeButton);

	var deleteButton = document.createElement('button')
	deleteButton.name = 'deleted';
	deleteButton.type = 'button';
	if (todo.deleted) {
		deleteButton.classList.add('deleted');
		deleteButton.textContent = 'Undelete';	// should only be visible when todos are filtered
												// to show deleted todos
	} else {
		deleteButton.classList.remove('deleted');
		deleteButton.textContent = 'Delete';
	}
	todoLi.appendChild(deleteButton);

	var siblingButton = document.createElement('button')
	siblingButton.name = 'addSibling';
	siblingButton.type = 'button';
	siblingButton.textContent = 'Add sibling';
	todoLi.appendChild(siblingButton);

	var childButton = document.createElement('button')
	childButton.name = 'addChild';
	childButton.type = 'button';
	childButton.textContent = 'Add child';
	todoLi.appendChild(childButton);

	var showChildrenButton = document.createElement('button');
	showChildrenButton.name = 'showChildren';
	showChildrenButton.type = 'button';
	if (todo.collapsed) {
		showChildrenButton.textContent = 'Show children';
	} else {
		showChildrenButton.textContent = 'Hide children';
	}
	if (todo.children.length === 0) {
		showChildrenButton.classList.add('inactive');
	}
	todoLi.appendChild(showChildrenButton);

	var selectChildrenButton = document.createElement('button');
	selectChildrenButton.name = 'selectChildren';
	selectChildrenButton.type = 'button';
	selectChildrenButton.textContent = 'Select children';
	if (todo.children.length === 0 || todo.collapsed === true) {
		selectChildrenButton.classList.add('inactive');
	} else {
		for (var i = 0; i < todo.children.length; i++) {
			var count = 0;
			if (todo.children[i].selected === true) {
				count++
			}
		}
		if (count === todo.children.length) {
			selectChildrenButton.textContent = 'Unselect children';
		}
	}
	todoLi.appendChild(selectChildrenButton);

	var entry = document.createElement('p');
	entry.contentEditable = true;
	entry.textContent = todo.entry;
	if (todo.completed) {
		entry.classList.add('struck');
	}
	if (todo.deleted) {
		entry.classList.add('faded');
	}
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
		} else if (filter === 'selected') {
			return todo.selected;
		} else {
			return true
		}
	});

	for (var i = 0; i < filteredArray.length; i++) {
		var todo = filteredArray[i];
		var todoLi = createTodoLi(todo);
		if (todo.children.length > 0) {
			var nestedTodosUl = createTodosUl(todo.children);	// TODO add filter here to filter children?
			if (todo.collapsed) {
				nestedTodosUl.classList.add('collapsed');
			}
			todoLi.appendChild(nestedTodosUl);
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
	newLi.children[entryIndex].focus();
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
	if (todoLi.children[todoLiUlIndex] && todoLi.children[todoLiUlIndex].nodeName === "UL") {
		existingUl = todoLi.children[todoLiUlIndex];
		existingUl.appendChild(newLi);	

	} else {

	// Case two: there are no children yet, create the <ul> to hold them
	
		var newUl = document.createElement('ul');
		newUl.appendChild(newLi);
		todoLi.appendChild(newUl);
	}

	newLi.children[entryIndex].focus();	// focus the entry <p>
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
			var todoLiSelectButton = todoLi.children[selectedIndex];
//			todoLiSelectButton.classList.toggle('selected');
			todo.selected = !todo.selected;
			var selectAllButton = document.getElementsByName('selectAll')[0];
			if (todo.selected) {
				todoLiSelectButton.textContent = 'Unselect';
				selectAllButton.classList.add('selected');
			} else {
				todoLiSelectButton.textContent = 'Select';
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
			var todoLiCompleteButton = todoLi.children[completedIndex];
//			todoLiCompleteButton.classList.toggle('completed');
			todo.completed = !todo.completed;
			var completeSelectedButton = document.getElementsByName('completeSelected')[0];
			if (todo.selected) {
				completeSelectedButton.classList.add('completed');
			}
			if (!todo.completed) {
				todoLiCompleteButton.textContent = 'Complete';
				todoLi.children[entryIndex].classList.remove('struck');
				// TODO convert to array.find() to stop looping as soon as a match is found
				var count = 0;
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].selected === true && todos[i].completed === true) {
						count++;
					}
				}
				if (count === 0) {
					completeSelectedButton.classList.remove('completed');
				}
			} else {
				todoLiCompleteButton.textContent = 'Uncomplete';
				todoLi.children[entryIndex].classList.add('struck');
			}
		}
		if (event.target.name === "deleted") {
			var todoLiDeleteButton = todoLi.children[deleteIndex];
			todoLiDeleteButton.classList.toggle('deleted');
			todo.deleted = !todo.deleted;
			if (todo.deleted) {
				todoLiDeleteButton.textContent = 'Undelete';
				todoLi.children[entryIndex].classList.add('faded');
				todoLi.classList.add('removed');
			} else {
				todoLiDeleteButton.textContent = 'Delete';
				todoLi.children[entryIndex].classList.remove('faded');
				todoLi.classList.remove('removed');
			}
		}
		if (event.target.name === "addSibling") {
			insertNewTodoLi(todos, todoLi.id)
		}
		if (event.target.name === "addChild") {
			appendNewChildTodoLi(todoLi)
			todo.collapsed = false;
			todoLi.children[todoLiUlIndex].classList.remove('collapsed');
			todoLi.children[showChildrenIndex].classList.remove('inactive');
			todoLi.children[selectChildrenIndex].classList.remove('inactive');
		}
		if (event.target.name === "showChildren") {
			var todoLiShowChildrenButton = todoLi.children[showChildrenIndex];
			var todoLiUl = todoLi.children[todoLiUlIndex];
			
			// don't need to test for nesting because button is not available otherwise
			if (todo.collapsed) {
				todo.markCollapsed(false);
				todoLiUl.classList.remove('collapsed');
				todoLiShowChildrenButton.textContent = 'Hide children';
				todoLi.children[selectChildrenIndex].classList.remove('inactive');
			} else {
				todo.markCollapsed(true);
				todoLiUl.classList.add('collapsed');
				todoLiShowChildrenButton.textContent = 'Show children';
				todoLi.children[selectChildrenIndex].classList.add('inactive');
			}
		}
		if (event.target.name === "selectChildren") {
			var todoLiSelectChildrenButton = todoLi.children[selectChildrenIndex];
			var todoLiUl = todoLi.children[todoLiUlIndex];
			if (todoLiUl && todoLiUl.children.length > 0) {
				if (todoLiSelectChildrenButton.textContent === 'Select children') {
					todoLiSelectChildrenButton.textContent = 'Unselect children';
					for (var i = 0; i < todo.children.length; i++) {
						todo.children[i].selected = true;
						todoLiUl.children[i].children[selectedIndex].textContent = 'Unselect';
					}
				} else {
					todoLiSelectChildrenButton.textContent = 'Select children';
					for (var i = 0; i < todo.children.length; i++) {
						todo.children[i].selected = false;
						todoLiUl.children[i].children[selectedIndex].textContent = 'Select';
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
			var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
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
				if (deleteSelectedButton.classList.contains('deleted')) {
					deleteSelectedButton.classList.remove('deleted');
					deleteSelectedButton.textContent = 'Delete selected';
					// remove selected from selected and deleted todos
					for (var i = 0; i < todos.length; i++) {
						if (todos[i].selected && todos[i].deleted) {
							todos[i].selected = false;
						}
					}
					document.getElementById('todolist').innerHTML = '';
					todolist.appendChild(createTodosUl(todos, 'selected'));
				}
			}
		}
		if (event.target.name === 'completeSelected') {
			var completeSelectedButton = event.target;
			var todosUl = todolist.children[0];
			if (completeSelectedButton.classList.contains('completed')) {
				completeSelectedButton.classList.remove('completed');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					var todoLiCompleteButton = todoLi.children[1];
					if (todoLiSelectButton.classList.contains('selected')) {
						todoLiCompleteButton.classList.remove('completed');
						var todo = findTodo(todos, todoLi.id);
						todo.markCompleted(false);
					}	
				}
			} else {
				completeSelectedButton.classList.add('completed');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					var todoLiCompleteButton = todoLi.children[1];
					if (todoLiSelectButton.classList.contains('selected')) {
						todoLiCompleteButton.classList.add('completed');
						var todo = findTodo(todos, todoLi.id);
						todo.completed = true;
				
					}
				}
			}
		}
		if (event.target.name === 'deleteSelected') {
			var deleteSelectedButton = event.target;
			var todosUl = todolist.children[0];
			if (deleteSelectedButton.classList.contains('deleted')) {
				deleteSelectedButton.classList.remove('deleted');
				deleteSelectedButton.textContent = 'Delete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					var todoLiDeleteButton = todoLi.children[2];
					if (todoLiSelectButton.classList.contains('selected')) {
						todoLiDeleteButton.classList.remove('deleted');
						var todo = findTodo(todos, todoLi.id);
						todo.deleted = false;
						todoLi.classList.remove('hide');
						todoLi.style.display = '';		// TODO replace with css on class 'hide'
					}
				}
			} else {
				deleteSelectedButton.classList.add('deleted')
				deleteSelectedButton.textContent = 'Undelete';
				var selectAllButton = document.getElementsByName('selectAll')[0];
				selectAllButton.classList.remove('selected');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[0];
					var todoLiDeleteButton = todoLi.children[2];
					if (todoLiSelectButton.classList.contains('selected')) {
						todoLiDeleteButton.classList.add('deleted');
						var todo = findTodo(todos, todoLi.id);
						todo.deleted = true;
						todoLi.classList.add('hide');
						todoLi.style.display = 'none';	// TODO replace with css on class 'hide'
					}
				}
			}
		}
		if (event.target.name === 'addTodo') {
			insertNewTodoLi(todos);
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

function startApp() {
	if (todos.length === 0) {
		todo1 = new Todo();
		insertTodo(todos, todo1);
	}
	var todolist = document.getElementById('todolist');
	todolist.innerHTML = '';
	todolist.appendChild(createTodosUl(todos));

	var selectAllButton = document.getElementsByName('selectAll')[0];
	selectAllButton.classList.remove('selected');
	selectAllButton.textContent = 'Select all';
	var completeSelectedButton = document.getElementsByName('completeSelected')[0];
	var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];


}

setUpEventListeners();

