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
// Return the todo with the given id
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

// Return the array (either todos or a todo.children) holding the todo with the given id
function findArray(array, id) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.id === id) {
			return array;
		}
		if (todo.children.length > 0) {
			var match = findArray(todo.children, id);
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
var entryIndex = 9;
var todoLiUlIndex = 10;
var completeSelectedChildrenIndex = 7;
var deleteSelectedChildrenIndex = 8;

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
	selectedButton.classList.add('inactive');
	todoLi.appendChild(selectedButton);
	
	var completeButton = document.createElement('button')
	completeButton.name = 'completed';
	completeButton.type = 'button';
	if (todo.completed) {
		completeButton.textContent = 'Uncomplete';
	} else {
		completeButton.textContent = 'Complete';
	}
	todoLi.appendChild(completeButton);

	var deleteButton = document.createElement('button')
	deleteButton.name = 'deleted';
	deleteButton.type = 'button';
	if (todo.deleted) {
		deleteButton.textContent = 'Undelete';
		todoLi.classList.add('deleted-removed');		// hide deleted todos by default
	} else {
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

	var completeSelectedChildrenButton = document.createElement('button');
	completeSelectedChildrenButton.name = 'completeSelectedChildren';
	completeSelectedChildrenButton.type = 'button';
	completeSelectedChildrenButton.textContent = 'Complete selected children';
	completeSelectedChildrenButton.classList.add('inactive');
	todoLi.appendChild(completeSelectedChildrenButton);

	var deleteSelectedChildrenButton = document.createElement('button');
	deleteSelectedChildrenButton.name = 'deleteSelectedChildren';
	deleteSelectedChildrenButton.type = 'button';
	deleteSelectedChildrenButton.textContent = 'Delete selected children';
	deleteSelectedChildrenButton.classList.add('inactive');
	todoLi.appendChild(deleteSelectedChildrenButton);

	var entry = document.createElement('p');
	entry.contentEditable = true;
	entry.textContent = todo.entry;
	entry.classList.remove('highlighted');
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

function removeClassDeletedRemoved(todoUl) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var entry = todoLi.children[entryIndex];
		var todoLiUl = todoLi.children[todoLiUlIndex];
		if (todoLiUl && todoLiUl.children.length > 0) {
			removeClassDeletedRemoved(todoLiUl);
		}
		if (entry.classList.contains('faded')) {
			todoLi.classList.remove('deleted-removed');
		}
	}
}

function addClassDeletedRemoved(todoUl) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var entry = todoLi.children[entryIndex];
		var todoLiUl = todoLi.children[todoLiUlIndex];
		if (todoLiUl && todoLiUl.children.length > 0) {
			addClassDeletedRemoved(todoLiUl);
		}
		if (entry.classList.contains('faded')) {
			todoLi.classList.add('deleted-removed');
		}
	}
}

function setTodoLiClass(todoUl, cssClass, action) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var todoLiUl = todoLi.children[todoLiUlIndex];
		if (todoLiUl && todoLiUl.children.length > 0) {
			setTodoLiClass(todoLiUl, cssClass, action);
		}
		var entry = todoLi.children[entryIndex];
		var faded = entry.classList.contains('faded');
		var struck = entry.classList.contains('struck');
		if (cssClass === 'deleted-removed' && faded) {
			if (action === 'add') {
				todoLi.classList.add(cssClass);
			} else {
				todoLi.classList.remove(cssClass);
			}
		}
		if (cssClass === 'active-removed' && !struck && !faded) {
			if (action === 'add') {
				todoLi.classList.add('active-removed');
			} else {
				todoLi.classList.remove('active-removed');
			}
		}
		if (cssClass === 'completed-removed' && struck) {
			if (action === 'add') {
				todoLi.classList.add('completed-removed');
			} else {
				todoLi.classList.remove('completed-removed');
			}
		}
	}
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
		var todoLiEntry = todoLi.children[entryIndex];
		var todo = findTodo(todos, todoLi.id)
		var todoArray = findArray(todos, todoLi.id);	// todos or a todo.children array

		if (event.target.name === "selected") {
			var todoLiSelectButton = todoLi.children[selectedIndex];
//			todoLiSelectButton.classList.toggle('selected');
			todo.selected = !todo.selected;
			var selectAllButton = document.getElementsByName('selectAll')[0];
			if (todo.selected) {
				todoLiSelectButton.textContent = 'Unselect';
				todoLiEntry.classList.add('highlighted');
				selectAllButton.classList.add('selected');
			} else {
				todoLiSelectButton.textContent = 'Select';
				todoLiEntry.classList.remove('highlighted');
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
			todo.completed = !todo.completed;
//			var completeSelectedButton = document.getElementsByName('completeSelected')[0];
//			if (todo.selected) {
//				completeSelectedButton.classList.add('completed');
//			}
			if (!todo.completed) {
				todoLiCompleteButton.textContent = 'Complete';
				todoLi.children[entryIndex].classList.remove('struck');
				// TODO convert to array.find() to stop looping as soon as a match is found
//				var count = 0;
//				for (var i = 0; i < todos.length; i++) {
//					if (todos[i].selected === true && todos[i].completed === true) {
//						count++;
//					}
//				}
//				if (count === 0) {
//					completeSelectedButton.classList.remove('completed');
//				}
				todoLi.classList.remove('completed-removed');
				if (document.getElementsByName('showActive')[0].textContent === 'Active') {
					todoLi.classList.add('active-removed');
				}
			} else {
				todoLiCompleteButton.textContent = 'Uncomplete';
				todoLi.children[entryIndex].classList.add('struck');
				if (document.getElementsByName('showCompleted')[0].textContent === 'Completed') {
					todoLi.classList.add('completed-removed');
				}
			}
		}
		if (event.target.name === "deleted") {
			var todoLiDeleteButton = todoLi.children[deleteIndex];
			todoLiDeleteButton.classList.toggle('deleted');
			todo.deleted = !todo.deleted;
			if (todo.deleted) {
				todoLiDeleteButton.textContent = 'Undelete';
				todoLi.children[entryIndex].classList.add('faded');
				if (document.getElementsByName('showDeleted')[0].textContent === 'Deleted') {
					todoLi.classList.add('deleted-removed');
				}
			} else {
				todoLiDeleteButton.textContent = 'Delete';
				todoLi.children[entryIndex].classList.remove('faded');
				if (document.getElementsByName('showActive')[0].textContent === 'Active') {
					todoLi.classList.add('active-removed');
				}
				todoLi.classList.remove('deleted-removed');
			}
		}
		if (event.target.name === "addSibling") {
			insertNewTodoLi(todoArray, todoLi.id)
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
			var todoLiCompleteButton = todoLi.children[completedIndex];
			var todoLiDeleteButton = todoLi.children[deleteIndex];
			var todoLiAddSiblingButton = todoLi.children[addSiblingIndex];
			var todoLiAddChildButton = todoLi.children[addChildIndex];
			var todoLiShowChildrenButton = todoLi.children[showChildrenIndex];
			var todoLiCompleteSelectedChildrenButton = todoLi.children[completeSelectedChildrenIndex];
			var todoLiDeleteSelectedChildrenButton = todoLi.children[deleteSelectedChildrenIndex];
			var todoLiUl = todoLi.children[todoLiUlIndex];
			if (todoLiUl && todoLiUl.children.length > 0) {		// is this test necessary given that button was available to click?
				if (todoLiSelectChildrenButton.textContent === 'Select children') {
					todoLiSelectChildrenButton.textContent = 'Unselect children';
					todoLiCompleteButton.classList.add('inactive');
					todoLiDeleteButton.classList.add('inactive');
					todoLiAddSiblingButton.classList.add('inactive');
					todoLiAddChildButton.classList.add('inactive');
					todoLiShowChildrenButton.classList.add('inactive');
					todoLiCompleteSelectedChildrenButton.classList.remove('inactive');
					todoLiDeleteSelectedChildrenButton.classList.remove('inactive');
					var childrenUncompletedCount = 0;
					var childrenUndeletedCount = 0;
					for (var i = 0; i < todo.children.length; i++) {
						childLi = todoLiUl.children[i];
						if (childLi.classList.length === 0) { 
							childLi.children[selectedIndex].textContent = 'Unselect';
							childLi.children[entryIndex].classList.add('highlighted');
							childLi.children[selectedIndex].classList.remove('inactive');
							childLi.children[completedIndex].classList.add('inactive');
							childLi.children[deleteIndex].classList.add('inactive');
							childLi.children[addSiblingIndex].classList.add('inactive');
							childLi.children[addChildIndex].classList.add('inactive');

							var childTodo = todo.children[i];
							childTodo.selected = true;
							if (childTodo.completed === false) {
								childrenUncompletedCount++;
							}
							if (childTodo.deleted === false) {
								childrenUndeletedCount++;
							}
						}
					}
					if (childrenUncompletedCount === 0) {
						todoLiCompleteSelectedChildrenButton.textContent = 'Uncomplete selected children';
					} else {
						todoLiCompleteSelectedChildrenButton.textContent = 'Complete selected children';
					}
					if (childrenUndeletedCount === 0) {
						todoLiDeleteSelectedChildrenButton.textContent = 'Undelete selected children';
					} else {
						todoLiDeleteSelectedChildrenButton.textContent = 'Delete selected children';
					}
				} else {
					todoLiSelectChildrenButton.textContent = 'Select children';
					todoLiShowChildrenButton.classList.remove('inactive');
					todoLiCompleteSelectedChildrenButton.classList.add('inactive');
					todoLiDeleteSelectedChildrenButton.classList.add('inactive');
					if (!todoLi.children[entryIndex].classList.contains('highlighted')) {
						todoLiCompleteButton.classList.remove('inactive');
						todoLiDeleteButton.classList.remove('inactive');
						todoLiAddSiblingButton.classList.remove('inactive');
						todoLiAddChildButton.classList.remove('inactive');
					}
					for (var i = 0; i < todo.children.length; i++) {
						todo.children[i].selected = false;
						childLi = todoLiUl.children[i];
						childLi.children[selectedIndex].textContent = 'Select';
						childLi.children[entryIndex].classList.remove('highlighted');
						childLi.children[selectedIndex].classList.add('inactive');
						childLi.children[completedIndex].classList.remove('inactive');
						childLi.children[deleteIndex].classList.remove('inactive');
						childLi.children[addSiblingIndex].classList.remove('inactive');
						childLi.children[addChildIndex].classList.remove('inactive');
					}
				}
			}
		}
		if (event.target.name === "completeSelectedChildren") {
			var todoLiCompleteSelectedChildrenButton = todoLi.children[completeSelectedChildrenIndex];
			var todoLiUl = todoLi.children[todoLiUlIndex];
			if (todoLiUl && todoLiUl.children.length > 0) {
				var childCount = todoLiUl.children.length;
				if (todoLiCompleteSelectedChildrenButton.textContent === 'Complete selected children') {
					todoLiCompleteSelectedChildrenButton.textContent = 'Uncomplete selected children';
					for (var i = 0; i < childCount; i++) {
						var childLi = todoLiUl.children[i];	
						if (childLi.children[entryIndex].classList.contains('highlighted')) {
							childLi.children[completedIndex].textContent = 'Uncomplete';
							childLi.children[entryIndex].classList.add('struck');
							childLi.classList.remove('active-removed');		// is this needed?
							var childTodo = findTodo(todos, childLi.id);
							childTodo.markCompleted(true);
							if (document.getElementsByName('showCompleted')[0].textContent === 'Completed') {
								childLi.classList.add('completed-removed');
							}
						}
					}
				} else {
					todoLiCompleteSelectedChildrenButton.textContent = 'Complete selected children';
					for (var i = 0; i < childCount; i++) {
						var childLi = todoLiUl.children[i];	
						if (childLi.children[entryIndex].classList.contains('highlighted')) {
							childLi.children[completedIndex].textContent = 'Complete';
							childLi.children[entryIndex].classList.remove('struck');
							childLi.classList.remove('completed-removed');		// is this needed?
							var childTodo = findTodo(todos, childLi.id);
							childTodo.markCompleted(false);
							if (document.getElementsByName('showActive')[0].textContent === 'Active') {
								childLi.classList.add('active-removed');
							}
						}
					}
				}
			}
		}
		if (event.target.name === "deleteSelectedChildren") {
			var todoLiDeleteSelectedChildrenButton = todoLi.children[deleteSelectedChildrenIndex];
			var todoLiUl = todoLi.children[todoLiUlIndex];
			if (todoLiUl && todoLiUl.children.length > 0) {
				var childCount = todoLiUl.children.length;
				if (todoLiDeleteSelectedChildrenButton.textContent === 'Delete selected children') {
					todoLiDeleteSelectedChildrenButton.textContent = 'Undelete selected children';
					for (var i = 0; i < childCount; i++) {
						var childLi = todoLiUl.children[i];	
						if (childLi.children[entryIndex].classList.contains('highlighted')) {
							childLi.children[deleteIndex].textContent = 'Undelete';
							childLi.children[entryIndex].classList.add('faded');
							childLi.classList.remove('active-removed');		// is this needed?
							var childTodo = findTodo(todos, childLi.id);
							childTodo.markDeleted(true);
							if (document.getElementsByName('showDeleted')[0].textContent === 'Deleted') {
								childLi.classList.add('deleted-removed');
							}
						}
					}
				} else {
					todoLiDeleteSelectedChildrenButton.textContent = 'Delete selected children';
					for (var i = 0; i < childCount; i++) {
						var childLi = todoLiUl.children[i];	
						if (childLi.children[entryIndex].classList.contains('highlighted')) {
							childLi.children[deleteIndex].textContent = 'Delete';
							childLi.children[entryIndex].classList.remove('faded');
							childLi.classList.remove('deleted-removed');		// is this needed?
							var childTodo = findTodo(todos, childLi.id);
							childTodo.markDeleted(false);
							if (document.getElementsByName('showActive')[0].textContent === 'Active') {
								childLi.classList.add('active-removed');
							}
						}
					}
				}
			}
		}
	}
}

function actionsClickHandler() {
	if (event.target.nodeName === "BUTTON") {		// TODO is this conditional needed?
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		// handle case (just for tests?) where todosUl is not defined
		var todoLiCount = 0;
		if (todosUl) {
			todoLiCount = todosUl.children.length;	
		}

		if (event.target.name === "showActive") {
			var showActiveButton = event.target;
			if (showActiveButton.textContent === '√ Active') {
				showActiveButton.textContent = 'Active';
				setTodoLiClass(todosUl, 'active-removed', 'add');
			} else {
				showActiveButton.textContent = '√ Active';
				setTodoLiClass(todosUl, 'active-removed', 'remove');
			}
		}
		if (event.target.name === "showCompleted") {
			var showCompletedButton = event.target;
			if (showCompletedButton.textContent === '√ Completed') {
				showCompletedButton.textContent = 'Completed';
				setTodoLiClass(todosUl, 'completed-removed', 'add');
			} else {
				showCompletedButton.textContent = '√ Completed';
				setTodoLiClass(todosUl, 'completed-removed', 'remove');
			}
		}
		if (event.target.name === "showDeleted") {
			var showDeletedButton = event.target;
			if (showDeletedButton.textContent === '√ Deleted') {
				showDeletedButton.textContent = 'Deleted';
				setTodoLiClass(todosUl, 'deleted-removed', 'add');
			} else {
				showDeletedButton.textContent = '√ Deleted';
				setTodoLiClass(todosUl, 'deleted-removed', 'remove');	// 'remove' not needed except for documentation
			}
		}
		if (event.target.name === "selectAll") {
			var selectAllButton = event.target;
			var completeSelectedButton = document.getElementsByName('completeSelected')[0];
			var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
			var addTodoButton = document.getElementsByName('addTodo')[0];
			var undoEditButton = document.getElementsByName('undoEdit')[0];
			var todosUl = todolist.children[0];
			if (selectAllButton.textContent === 'Select all') {
				selectAllButton.textContent = 'Unselect all';
				completeSelectedButton.classList.remove('inactive');
				deleteSelectedButton.classList.remove('inactive');
				addTodoButton.classList.add('inactive');
				undoEditButton.classList.add('inactive');
				var todosUncompletedCount = 0;
				var todosUndeletedCount = 0;
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					if (todoLi.classList.length === 0) {	// true when todoLi is not hidden
						var todoLiSelectButton = todoLi.children[selectedIndex];
						var todoLiCompleteButton = todoLi.children[completedIndex];
						var todoLiDeleteButton = todoLi.children[deleteIndex];
						var todoLiAddSiblingButton = todoLi.children[addSiblingIndex];
						var todoLiAddChildButton = todoLi.children[addChildIndex];
						todoLiSelectButton.textContent = 'Unselect';
						todoLiSelectButton.classList.remove('inactive');
						todoLiCompleteButton.classList.add('inactive');
						todoLiDeleteButton.classList.add('inactive');
						todoLiAddSiblingButton.classList.add('inactive');
						todoLiAddChildButton.classList.add('inactive');
						var todoLiEntry = todoLi.children[entryIndex];
						todoLiEntry.classList.add('highlighted');
						var todo = findTodo(todos, todoLi.id)
						todo.selected = true;
						if (todo.completed === false) {
							todosUncompletedCount++;
						}
						if (todo.deleted === false) {
							todosUndeletedCount++;
						}
					}
					if (todosUncompletedCount === 0) {
						completeSelectedButton.textContent = 'Uncomplete selected';
					} else {
						completeSelectedButton.textContent = 'Complete selected';
					}
					if (todosUndeletedCount === 0) {
						deleteSelectedButton.textContent = 'Undelete selected';
					} else {
						deleteSelectedButton.textContent = 'Delete selected';
					}
				}
			} else {
				selectAllButton.textContent = 'Select all';
				completeSelectedButton.classList.add('inactive');
				deleteSelectedButton.classList.add('inactive');
				addTodoButton.classList.remove('inactive');
				undoEditButton.classList.remove('inactive');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[selectedIndex];
					var todoLiCompleteButton = todoLi.children[completedIndex];
					var todoLiDeleteButton = todoLi.children[deleteIndex];
					var todoLiAddSiblingButton = todoLi.children[addSiblingIndex];
					var todoLiAddChildButton = todoLi.children[addChildIndex];
					todoLiSelectButton.textContent = 'Select';
					todoLiSelectButton.classList.add('inactive');
					todoLiCompleteButton.classList.remove('inactive');
					todoLiDeleteButton.classList.remove('inactive');
					todoLiAddSiblingButton.classList.remove('inactive');
					todoLiAddChildButton.classList.remove('inactive');
					var todoLiEntry = todoLi.children[entryIndex];
					todoLiEntry.classList.remove('highlighted');
					var todo = findTodo(todos, todoLi.id)
					todo.selected = false;
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
			if (completeSelectedButton.textContent === 'Uncomplete selected') {
				completeSelectedButton.textContent = 'Complete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[selectedIndex];
					var todoLiCompleteButton = todoLi.children[completedIndex];
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiCompleteButton.textContent = 'Complete';
						var todoLiEntry = todoLi.children[entryIndex];
						todoLiEntry.classList.remove('struck');
						var todo = findTodo(todos, todoLi.id);
						todo.markCompleted(false);
						if (document.getElementsByName('showActive')[0].textContent === 'Active') {
							todoLi.classList.add('active-removed');
						}
					}	
				}
			} else {
				completeSelectedButton.textContent = 'Uncomplete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[selectedIndex];
					var todoLiCompleteButton = todoLi.children[completedIndex];
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiCompleteButton.textContent = 'Uncomplete';
						var todoLiEntry = todoLi.children[entryIndex];
						todoLiEntry.classList.add('struck');
						var todo = findTodo(todos, todoLi.id);
						todo.completed = true;
						if (document.getElementsByName('showCompleted')[0].textContent === 'Completed') {
							todoLi.classList.add('completed-removed');
						}
					}
				}
			}
		}
		if (event.target.name === 'deleteSelected') {
			var deleteSelectedButton = event.target;
			var todosUl = todolist.children[0];
			if (deleteSelectedButton.textContent === 'Undelete selected') {
				deleteSelectedButton.textContent = 'Delete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[selectedIndex];
					var todoLiDeleteButton = todoLi.children[deleteIndex];
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiDeleteButton.textContent = 'Delete';
						var todo = findTodo(todos, todoLi.id);
						todo.deleted = false;
						var todoLiEntry = todoLi.children[entryIndex];
						todoLiEntry.classList.remove('faded');
						todoLi.classList.remove('deleted-removed');
						if (document.getElementsByName('showActive')[0].textContent === 'Active') {
							todoLi.classList.add('active-removed');
						}
					}
				}
			} else {
				deleteSelectedButton.textContent = 'Undelete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children[selectedIndex];
					var todoLiDeleteButton = todoLi.children[deleteIndex];
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiDeleteButton.textContent = 'Undelete';
						var todo = findTodo(todos, todoLi.id);
						todo.deleted = true;
						var todoLiEntry = todoLi.children[entryIndex];
						todoLiEntry.classList.add('faded');
						if (document.getElementsByName('showDeleted')[0].textContent === 'Deleted') {
							todoLi.classList.add('deleted-removed');
						}
	
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
	var selectAllButton = document.getElementsByName('selectAll')[0];
	var completeSelectedButton = document.getElementsByName('completeSelected')[0];
	var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
	var showActiveButton = document.getElementsByName('showActive')[0];
	var showCompletedButton = document.getElementsByName('showCompleted')[0];
	var showDeletedButton = document.getElementsByName('showDeleted')[0];
	// set defaults on action bar buttons
	selectAllButton.textContent = 'Select all';
	completeSelectedButton.textContent = 'Complete selected';
	deleteSelectedButton.textContent = 'Delete selected';
	completeSelectedButton.classList.add('inactive');
	deleteSelectedButton.classList.add('inactive');
	showActiveButton.textContent = '√ Active';
	showCompletedButton.textContent = '√ Completed';
	showDeletedButton.textContent = 'Deleted';
	if (todos.length === 0) {
		insertNewTodoLi(todos);
	} else {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todolist.appendChild(createTodosUl(todos));
	}
}
//		todo1 = new Todo();
//		insertTodo(todos, todo1);
//	} else {
//		for (var i = 0; i < todos.length; i++) {
//			if (todos[i].selected === true) {
//				todos[i].selected = false;
//			}
//		}
//	}
//}

setUpEventListeners();

