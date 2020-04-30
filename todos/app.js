// Beasts 8. Nested todos 

/********************************* Data manipulation ***********************************/

var todos = [];

// Allowed values for the lifecycle stage a todo is in
var todoStages = new Set();
todoStages.add('active');
todoStages.add('completed');
todoStages.add('canceled');

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
//	this.completed = false;	
	this.stage = 'active';				// stages are active, completed, canceled
	
	this.selected = false;
	this.selectMode = false;

//	this.displayTags = new Set();
//	this.displayTags.add('#active');	// new todo is active on creation

	this.filteredIn = true;						// new todo is filtered in for display on creation 
	this.filteredOutParentOfFilteredIn = false;		// true if this todo is filtered out but descendant(s) are not
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

Todo.prototype.markSelectMode = function(bool) {
	this.selectMode = bool;
}

/*
Todo.prototype.tagForDisplay = function() {
	this.displayTags.clear();
	this.displayTags.add('#' + this.stage);
	if (this.deleted) {
		this.displayTags.add('#deleted');
	}
}

// Remove orphan
/*
Todo.prototype.tagCompleted = function(bool) {
	if (bool) {
		this.displayTags.delete('#active');
		this.displayTags.add('#completed');
	} else {
		this.displayTags.delete('#completed');
		this.displayTags.add('#active');
	}
}
// Remove orphan
Todo.prototype.tagDeleted = function(bool) {
	if (bool) {
		this.displayTags.delete('#active');
		this.displayTags.add('#deleted');
	} else {
		this.displayTags.delete('#deleted');
		if (!this.displayTags.has('#completed')) {
			this.displayTags.add('#active');
		}
	}
}

// Remove orphan
Todo.prototype.markCompleted = function(bool) {
	this.completed = bool;
}
*/
Todo.prototype.markDeleted = function(bool) {
	this.deleted = bool;
}
Todo.prototype.setStage = function(stage) {
	if (todoStages.has(stage)) {		// TODO throw error if not an allowed value?
		this.stage = stage;
	}
}
Todo.prototype.addChild = function(child) {
	this.children.push(child);
}
Todo.prototype.markCollapsed = function(bool) {
	this.collapsed = bool;
}
Todo.prototype.markFilteredIn = function(filterSet) {
	this.filteredIn = false;
	var stageTag = '#' + this.stage;
	if (filterSet.has(stageTag)) {
		this.filteredIn = true;	
		if (this.deleted && !filterSet.has('#deleted')) {
			this.filteredIn = false;
		}
	}
}
/*
	var tags = Array.from(this.displayTags);
	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];
		if (set.has(tag)) {
			this.filteredIn = true;
			return;
		}
	}
}
*/
Todo.prototype.markFilteredOutParentOfFilteredIn = function() {
	this.filteredOutParentOfFilteredIn = false;		// re-set to baseline value
	if (this.filteredIn === false && this.children.length > 0) {
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if (child.filteredIn || child.filteredOutParentOfFilteredIn) {
				this.filteredOutParentOfFilteredIn = true;
				return;
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

function applyDisplayTags(filterSet) {					// TODO Combine these into one function to avoid two recursions

	function markFilteredInTodos(todosArray) {
		for (var i = 0; i < todosArray.length; i++) {
			var todo = todosArray[i];
			if (todo.children.length > 0) {
				markFilteredInTodos(todo.children);
			}
			todo.markFilteredIn(filterSet);
		}
	}

	function markFilteredOutParentsOfFilteredInTodos(todosArray) {
		for (var i = 0; i < todosArray.length; i++) {
			var todo = todosArray[i];
			if (todo.children.length > 0) {
				markFilteredOutParentsOfFilteredInTodos(todo.children);
			}
			todo.markFilteredOutParentOfFilteredIn();
		}

	}

	markFilteredInTodos(todos);
	markFilteredOutParentsOfFilteredInTodos(todos);
}

// Recursively mark todo.selected true or false, starting with given array
function markTodosSelected(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markTodosSelected(todo.children, bool);
		}
		todo.selected = bool;
	}
}

// Recursively mark todo.selectMode true or false, starting with given array
function markTodosSelectMode(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markTodosSelectMode(todo.children, bool);
		}
		todo.selectMode = bool;
	}
}

// Recursively mark todo.selected true or false for filtered-in todos, starting with given array
function markFilteredInTodosSelected(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markFilteredInTodosSelected(todo.children, bool);
		}
		if (todo.filteredIn) {
			todo.selected = bool;
		} else {
			todo.selected = false;		// excludes filtered-out todos
		}
	}
}

// Recursively mark todo.selectMode true or false for filtered-in todos, starting with given array
function markFilteredInTodosSelectMode(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markFilteredInTodosSelectMode(todo.children, bool);
		}
		if (todo.filteredIn) {
			todo.selectMode = bool;
		} else {
			todo.selectMode = false;		// excludes filtered-out todos
		}
	}
}

// Recursively mark todo.selected and todo.selectMode true or false for filtered-in todos, starting with given array
function markSelectedAndSelectModeForFilteredInTodos(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markSelectedAndSelectModeForFilteredInTodos(todo.children, bool);
		}
		if (todo.filteredIn) {
			todo.selected = bool;
			todo.selectMode = bool;
		} else {
			todo.selected = false;
			todo.selectMode = false;		// excludes filtered-out todos
		}
	}
}

// Recursively set given stage (active, completed, etc.) for selected nested todos, starting with given array
function setSelectedTodosStage(todosArray, stage) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			setSelectedTodosStage(todo.children, stage);
		}
		if (todo.selected) {
			todo.setStage(stage);
		}
	}
}

// Recursively mark selected todos deleted or undeleted, starting with given array
function markSelectedTodosDeleted(todosArray, bool) {
	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.children.length > 0) {
			markSelectedTodosDeleted(todo.children, bool);
		}
		todo.deleted = bool;
	}
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

// Return the parent of todo or return undefined
function findParent(childTodo) {

	var parent = undefined;

	// helper function to do the actual nested search
	function recurseForParent(potentialParent, childTodo) {
		if (potentialParent.children.length > 0) {
			for (var i = 0; i < potentialParent.children.length; i++) {
				var child = potentialParent.children[i];
				if (child.id === childTodo.id) {
					parent = potentialParent;
				}
				if (child.children.length > 0) {
					var match = recurseForParent(child, childTodo);
					if (match) {
						parent = match;
					}
				}
			}
		}
	}

	for (var i = 0; i < todos.length; i++) {
		recurseForParent(todos[i], childTodo);
	}

	return parent;
}

// Return true if any todos, including nested todos, are selected
function anySelectedTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelected = anySelectedTodos(todo.children);
			if (todoSelected) {
				return true;
			} 
		}
	}
	return false;
}

// Return true if any todos, including nested todos, are unselected
function anyUnselectedTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (!todo.selected) {
			return true;
		}
		if (todo.children.length > 0) {
			var unselected = anyUnselectedTodos(todo.children);
			if (unselected) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any todos at root level of array are selected
function anySelectedRootTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected) {
			return true;
		}
	}
	return false;
}

// Return true if any todos at root level of array are in select mode
function anyRootTodosInSelectMode(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selectMode) {
			return true;
		}
	}
	return false;
}

// Return true if any todos, including nested todos, are filtered in for display
function anyFilteredInTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoFilteredIn = anyFilteredInTodos(todo.children);
			if (todoFilteredIn) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any todos, including nested todos, are both selected and filtered in for display
function anySelectedFilteredInTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected && todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelectedFilteredIn = anySelectedFilteredInTodos(todo.children);
			if (todoSelectedFilteredIn) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any todos, including nested todos, are deleted
// TODO this function might be orphaned
function anyDeletedTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.deleted) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoDeleted = anyDeletedTodos(todo.children);
			if (todoDeleted) {
				return true;
			} 
		}
	}
}

// Return true if any todos, including nested todos, are both completed and selected
function anySelectedCompletedTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.stage === 'completed' && todo.selected) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelectedCompleted = anySelectedCompletedTodos(todo.children);
			if (todoSelectedCompleted) {
				return true;
			} 
		}
	}
}

// Return true if any todos, including nested todos, are both deleted and selected
function anySelectedDeletedTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.deleted && todo.selected) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelectedDeleted = anySelectedDeletedTodos(todo.children);
			if (todoSelectedDeleted) {
				return true;
			} 
		}
	}
}


// Return true if all selected todos, including nested todos, are completed
function allSelectedTodosCompleted(array) {
	var selected = 0;
	var andCompleted = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selected) {
				selected++;
				if (todo.stage === 'completed') {
					andCompleted++;
				}
			} 

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (selected > 0 && selected === andCompleted) {
		return true;
	} else {
		return false;
	}
}

// Return true if all selected todos, including nested todos, are deleted
function allSelectedTodosDeleted(array) {
	var selected = 0;
	var andDeleted = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selected) {
				selected++;
				if (todo.deleted === true) {
					andDeleted++;
				}
			} 

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (selected > 0 && selected === andDeleted) {
		return true;
	} else {
		return false;
	}
}

function purgeSelectedDeletedTodos(array) {
	var counter = array.length;
	for (var i = counter - 1; i >= 0; i--) {
		var todo = array[i];
		if (todo.deleted && todo.selected) {
			deleteTodo(array, todo);
		} else if (todo.children.length > 0) {
			purgeSelectedDeletedTodos(todo.children);
		}
	}
	startApp();
}
/************************************* DOM manipulation ********************************/

// Fixed page elements
//var appheader = document.getElementById('appheader');
var actionsBar = document.getElementById('actions');
var selectAllButton = actionsBar.children.namedItem('selectAll');
var completeSelectedButton = actionsBar.children.namedItem('completeSelected');
var deleteSelectedButton = actionsBar.children.namedItem('deleteSelected');
var showActiveButton = actionsBar.children.namedItem('showActive');
var showCompletedButton = actionsBar.children.namedItem('showCompleted');
var showDeletedButton = actionsBar.children.namedItem('showDeleted');
var purgeSelectedDeletedButton = actionsBar.children.namedItem('purgeSelectedDeleted');
var addTodoButton = actionsBar.children.namedItem('addTodo');

var todolist = document.getElementById('todolist');

// Global variables for todo entry being edited
var originalEntry = undefined;		// entry to be restored by undoEdit	
var oldUndoEditButton = undefined;	// button to deactivate from last todoLi to be edited

// index positions of todoLi.children[i]
//var completedIndex = 0;
//var deleteIndex = 1;
//var addSiblingIndex = 2;
//var addChildIndex = 3;
//var selectedIndex = 4;
//var undoEditIndex = 5;
//var entryIndex = 6;
//var selectChildrenIndex = 7;
//var showChildrenIndex = 8;
//var completeSelectedChildrenIndex = 9;
//var deleteSelectedChildrenIndex = 10;
//var todoLiUlIndex = 11;

// index positions of parent-placeholder todoLi.children[i]
//var parentPlaceholderEntryIndex = 0;
//var parentPlaceholderUlIndex = 1;

/* Better to work with the static actionsBar buttons I think
function renderActionsBar() {
	var newActionsBar = createActionButtons();
	appheader.innerHTML = '';
	appheader.appendChild(newActionsBar);
}

function createActionButtons() {
	var actionsBar = document.createElement('div');
	actionsBar.id = 'actions';

	// All these buttons are created with button.type = 'button' to distinguish from a submit
	// or reset button, as recommended by MDN.
	
	var selectAllButton = document.createElement('button');
	selectAllButton.name = 'selectAll';
	selectAllButton.type = 'button';
	var anySelected = anySelectedRootTodos(todos);		// true if any root-level todos are selected
	if (anySelected) {
		selectAllButton.textContent = 'Unselect all';
	} else {
		selectAllButton.textContent = 'Select all';
	}
	actionsBar.appendChild(selectAllButton);

	var showActiveButton = document.createElement('button');
	showActiveButton.name = 'showActive';
	showActiveButton.type = 'button';
	actionsBar.appendChild(showActiveButton);

	return actionsBar;
}
*/

// A set to specify which todos will be displayed
function generateFilterSet() {

	var filteredIn = new Set();

	if (showActiveButton.textContent === '√ Active') {
		filteredIn.add('#active');
	}
	if (showCompletedButton.textContent === '√ Completed') {
		filteredIn.add('#completed');
	}
	if (showDeletedButton.textContent === '√ Deleted') {
		filteredIn.add('#deleted');
	}
	return filteredIn;
}

function renderTodolist() {

	var filterSet = generateFilterSet();	// set which filters determine display

	applyDisplayTags(filterSet);			// mark todos for display

	newTodolist = createTodosUl(todos);
	updateActionsBar();
	todolist.innerHTML = ''; 
	todolist.appendChild(newTodolist);
}

function updateActionsBar() {
	if (anyFilteredInTodos(todos)) {
		// Todos are displayed
		selectAllButton.disabled = false;
		if (anyRootTodosInSelectMode(todos)) {
			// selectAll put todos in select mode, time to enable completeSelected and deleteSelected
			selectAllButton.textContent = 'Unselect all';
			completeSelectedButton.disabled = false;
			deleteSelectedButton.disabled = false;
			if (allSelectedTodosCompleted(todos)) {
				completeSelectedButton.textContent = 'Uncomplete selected';	
			} else {
				completeSelectedButton.textContent = 'Complete selected';	
			}
			if (allSelectedTodosDeleted(todos)) {
				deleteSelectedButton.textContent = 'Undelete selected';	
			} else {
				deleteSelectedButton.textContent = 'Delete selected';	
			}
		} else {
			// selectAll hasn't put todos in select mode, time to disable completeSelected and deleteSelected
			selectAllButton.textContent = 'Select all';
			completeSelectedButton.disabled = true;
			deleteSelectedButton.disabled = true;
		}
	} else {
		// No todos are displayed
		selectAllButton.disabled = true;
		completeSelectedButton.disabled = true;
		deleteSelectedButton.disabled = true;
	}
}

function createParentPlaceholderLi(todo) {
	var todoLi = document.createElement('li');
	todoLi.id = todo.id;

	var entry = document.createElement('p');
	entry.contentEditable = false;
	entry.textContent = todo.entry;
	entry.classList.add('parent-placeholder');
	if (todo.stage === 'completed') {
		entry.classList.add('struck-completed');
	}
	if (todo.deleted) {
		entry.classList.add('faded-deleted');
	}
	todoLi.appendChild(entry);

	return todoLi;
}

function createTodoLi(todo, selectMode) {		// selection mode boolean is optional
	var todoLi = document.createElement('li');
	todoLi.id = todo.id;

	// All these buttons are created with button.type = 'button' to distinguish from a submit
	// or reset button, as recommended by MDN.

	var selectButton = document.createElement('button')
	selectButton.name = 'select';
	selectButton.type = 'button';	
	if (todo.selected) {
		selectButton.textContent = 'Unselect';
		selectButton.disabled = false;
	} else {
		selectButton.textContent = 'Select';
		selectButton.disabled = true;
	}

	var completeButton = document.createElement('button');
	completeButton.name = 'complete';
	completeButton.type = 'button';
	if (todo.stage === 'completed') {
		completeButton.textContent = 'Uncomplete';
	} else {
		completeButton.textContent = 'Complete';
	}

	var deleteButton = document.createElement('button')
	deleteButton.name = 'delete';
	deleteButton.type = 'button';
	if (todo.deleted) {
		deleteButton.textContent = 'Undelete';
	} else {
		deleteButton.textContent = 'Delete';
	}

	var addSiblingButton = document.createElement('button')
	addSiblingButton.name = 'addSibling';
	addSiblingButton.type = 'button';
	addSiblingButton.textContent = 'Add sibling';

	var addChildButton = document.createElement('button')
	addChildButton.name = 'addChild';
	addChildButton.type = 'button';
	addChildButton.textContent = 'Add child';

	var undoEditButton = document.createElement('button')
	undoEditButton.name = 'undoEdit';
	undoEditButton.type = 'button';
	undoEditButton.textContent = 'Undo edit';
	undoEditButton.disabled = true;

	if (todo.selectMode) {
		completeButton.disabled = true;
		deleteButton.disabled = true;
		addSiblingButton.disabled = true;
		addChildButton.disabled = true;
		selectButton.disabled = false;
	}
		
	todoLi.appendChild(selectButton);
	todoLi.appendChild(completeButton);
	todoLi.appendChild(deleteButton);
	todoLi.appendChild(addSiblingButton);
	todoLi.appendChild(addChildButton);
	todoLi.appendChild(undoEditButton);

	var entry = document.createElement('p');
	entry.contentEditable = true;
	entry.textContent = todo.entry;
	if (todo.selected) {
		entry.classList.add('highlighted');
	}
	if (todo.stage === 'completed') {
		entry.classList.add('struck-completed');
	}
	if (todo.deleted) {
		entry.classList.add('faded-deleted');
	}
	todoLi.appendChild(entry);
	
	// Only create last four buttons if there are children
	if (todo.children.length > 0) {		

		var showChildrenButton = document.createElement('button');
		showChildrenButton.name = 'showChildren';
		showChildrenButton.type = 'button';
		if (todo.collapsed) {
			showChildrenButton.textContent = 'Show children';
		} else {
			showChildrenButton.textContent = 'Hide children';
		}
		todoLi.appendChild(showChildrenButton);
		
		// Only create last three buttons if there are children showing
		if (!todo.collapsed) {
			var selectChildrenButton = document.createElement('button');
			selectChildrenButton.name = 'selectChildren';
			selectChildrenButton.type = 'button';
			selectChildrenButton.disabled = false;

			var anySelectedFilteredInChildren = anySelectedFilteredInTodos(todo.children);
			if (anySelectedFilteredInChildren) {
				selectChildrenButton.textContent = 'Unselect children';
			} else {
				selectChildrenButton.textContent = 'Select children';
			}
			todoLi.appendChild(selectChildrenButton);

			// Only create last two buttons for a root todoLi with todos selected
			if (!todo.selectMode && anySelectedFilteredInChildren) {
				var completeSelectedChildrenButton = document.createElement('button');
				completeSelectedChildrenButton.name = 'completeSelectedChildren';
				completeSelectedChildrenButton.type = 'button';
				completeSelectedChildrenButton.disabled = false;
				if (allSelectedTodosCompleted(todo.children)) {
					completeSelectedChildrenButton.textContent = 'Uncomplete selected children';
				} else {
					completeSelectedChildrenButton.textContent = 'Complete selected children';
				}
				todoLi.appendChild(completeSelectedChildrenButton);

				var deleteSelectedChildrenButton = document.createElement('button');
				deleteSelectedChildrenButton.name = 'deleteSelectedChildren';
				deleteSelectedChildrenButton.type = 'button';
				deleteSelectedChildrenButton.disabled = false;
				if (allSelectedTodosDeleted(todo.children)) {
					deleteSelectedChildrenButton.textContent = 'Undelete selected children';
				} else {
					deleteSelectedChildrenButton.textContent = 'Delete selected children';
				}
				todoLi.appendChild(deleteSelectedChildrenButton);
			}
		}
	}

	return todoLi;
}

// Build DOM elements from the todos array, e.g. when app first loads
// or when todos are filtered for display
function createTodosUl(todosArray) {
	
	var todosUl = document.createElement('ul');

	var selectionMode = false;		// determines whether 'select' buttons are enabled and others disabled

	if (todosArray === todos) {
		if (anySelectedRootTodos(todos)) {
			selectionMode = true;
		}
	} else {	// todo.children array
		if (anySelectedTodos(todosArray)) {
			selectionMode = true;
		}
	}

	for (var i = 0; i < todosArray.length; i++) {
		var todo = todosArray[i];
		if (todo.filteredIn)  {
			var todoLi = createTodoLi(todo, selectionMode)
		} else if (todo.filteredOutParentOfFilteredIn) {
			var todoLi = createParentPlaceholderLi(todo);
		}
		if (todoLi) {
			if (todo.children.length > 0 && !todo.collapsed) {
				var nestedTodosUl = createTodosUl(todo.children);
				todoLi.appendChild(nestedTodosUl);
				todosUl.appendChild(todoLi);
			} else {
				todosUl.appendChild(todoLi);
			}
		}
	}
	return todosUl;
}

// Insert a new empty todoLi into the given array after the given todo, ready for text entry.
function insertNewTodoLi(todoArray, todo) {
	var newTodo = new Todo();
	insertTodo(todoArray, newTodo, todo);
	renderTodolist();
	newTodoLi = document.getElementById(newTodo.id);
	newTodoLi.querySelector('p').focus();
}

// Append a new todoLi in a child todosUl under a given todoLi, ready for text entry.
function appendNewChildTodoLi(todo) {
	todo.markCollapsed(false);
	var newChild = new Todo();
	insertTodo(todo.children, newChild);
	renderTodolist();
	newChildLi= document.getElementById(newChild.id);
	newChildLi.querySelector('p').focus();
}

// TODO remove orphaned function
function removeClassDeletedRemoved(todoUl) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var entry = todoLi.querySelector('p');
		var todoLiUl = todoLi.querySelector('ul');
		if (todoLiUl && todoLiUl.children.length > 0) {
			removeClassDeletedRemoved(todoLiUl);
		}
		if (entry.classList.contains('faded-deleted')) {
			todoLi.classList.remove('deleted-removed');
		}
	}
}

// TODO remove orphaned function
function addClassDeletedRemoved(todoUl) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var entry = todoLi.querySelector('p');
		var todoLiUl = todoLi.querySelector('ul');
		if (todoLiUl && todoLiUl.children.length > 0) {
			addClassDeletedRemoved(todoLiUl);
		}
		if (entry.classList.contains('faded-deleted')) {
			todoLi.classList.add('deleted-removed');
		}
	}
}

function setTodoLiClass(todoUl, cssClass, action) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var todoLiUl = todoLi.querySelector('ul');
		if (todoLiUl && todoLiUl.children.length > 0) {
			setTodoLiClass(todoLiUl, cssClass, action);
		}
		var entry = todoLi.querySelector('p');
		var dottedDeleted = entry.classList.contains('faded-deleted');
		var struckCompleted = entry.classList.contains('struck-completed');
		if (cssClass === 'deleted-removed' && dottedDeleted) {
			if (action === 'add') {
				todoLi.classList.add(cssClass);
			} else {
				todoLi.classList.remove(cssClass);
			}
		}
		if (cssClass === 'active-removed' && !struckCompleted && !dottedDeleted) {
			if (action === 'add') {
				todoLi.classList.add('active-removed');
			} else {
				todoLi.classList.remove('active-removed');
			}
		}
		if (cssClass === 'completed-removed' && struckCompleted) {
			if (action === 'add') {
				todoLi.classList.add('completed-removed');
			} else {
				todoLi.classList.remove('completed-removed');
			}
		}
	}
}

function newsetTodoLiClass(todoUl, cssClass, action) {
	for (var i = 0; i < todoUl.children.length; i++) {
		var todoLi = todoUl.children[i];
		var todoLiUl = todoLi.querySelector('ul');
		if (todoLiUl && todoLiUl.children.length > 0) {
			setTodoLiClass(todoLiUl, cssClass, action);
		}
		var entry = todoLi.querySelector('p');
		var dottedDeleted = entry.classList.contains('faded-deleted');
		var struckCompleted = entry.classList.contains('struck-completed');
		if (cssClass === 'deleted-removed' && dottedDeleted) {
			if (action === 'add') {
				todoLi.classList.add(cssClass);
			} else {
				todoLi.classList.remove(cssClass);
			}
		}
		if (cssClass === 'active-removed' && !struckCompleted && !dottedDeleted) {
			if (action === 'add') {
				todoLi.classList.add('active-removed');
			} else {
				todoLi.classList.remove('active-removed');
			}
		}
		if (cssClass === 'completed-removed' && struckCompleted) {
			if (action === 'add') {
				todoLi.classList.add('completed-removed');
			} else {
				todoLi.classList.remove('completed-removed');
			}
		}
	}
}


function altSelectChildren(todoLi) {
	// Root case: clickedTodoLi is root (not already selected and controlled by a higher level). Select button inactive.
	// Branch case: clickedTodoLi is branch (already selected and controlled by a higher level). Select button active.
	//       Higher level could be selectAll or a higher-level todoLi
	//
	// Root has completeSelectedChildren and deleteSelectedChildren buttons active. Branches do not.
	//
	// If root 'Unselect children' is clicked, the todoLi and all children return to normal.
	// If branch 'Unselect children' is clicked, the todoLi and all children stay in selection mode
	// TODO unless it makes all the root children unselected, in which case root children return to normal.

	var clickedTodoLi = todoLi;
	var clickedTodo = findTodo(todos, clickedTodoLi.id);
	var clickedTodoLiSelectButton = todoLi.children.namedItem('select');
	var clickedTodoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
	// TODO Are these two declarations premature? Only needed for root. 
	var clickedTodoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var clickedTodoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	//
	var childrenUncompletedCount = 0;
	var childrenUndeletedCount = 0;

	// Handle the three possible cases: root button clicked, branch button clicked, selectAll button clicked
	// although TODO the selectAll handler currently uses the old selectChildren function via a call to selectAllChildren

	if (clickedTodoLiSelectButton.classList.contains('inactive')) {
		// root button clicked
		selectChildrenFromRoot(todoLi);
	} else {
		// branch button clicked
		selectChildrenFromBranch(todoLi);
		// Get root todoLi to toggle its selectChildrenButton if necessary
		var rootTodo = findSelectChildrenRootTodo(clickedTodo);
		if (rootTodo) {
			if (!anySelectedTodos(rootTodo.children)) {
				// restore all normal buttons under rootTodoLi
				var rootTodoLi = document.getElementById(rootTodo.id);
				unselectAllChildren(rootTodoLi);
			}	
		} else {
			// root button is selectAll
			if (!anySelectedTodos(todos)) {
				// restore all normal buttons
				unselectAll();
			}
		}
	}

	// The root and branch handlers increment counters to determine button text

	if (childrenUncompletedCount === 0) {
		clickedTodoLiCompleteSelectedChildrenButton.textContent = 'Uncomplete selected children';
	} else {
		clickedTodoLiCompleteSelectedChildrenButton.textContent = 'Complete selected children';
	}
	if (childrenUndeletedCount === 0) {
		clickedTodoLiDeleteSelectedChildrenButton.textContent = 'Undelete selected children';
	} else {
		clickedTodoLiDeleteSelectedChildrenButton.textContent = 'Delete selected children';
	}
	togglePurgeSelectedDeletedTodos();		// toggle button class active or inactive

	// The helper functions to handle root and branch clicks. TODO Do these have to be internal?

	function selectChildrenFromRoot(todoLi) {	// starts from clicked todoLi button, then recurses
		var todoLiSelectButton = todoLi.children.namedItem('select');
		var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
		var todoLiCompleteButton = todoLi.children.namedItem('complete');
		var todoLiDeleteButton = todoLi.children.namedItem('delete');
		var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
		var todoLiAddChildButton = todoLi.children.namedItem('addChild');
		var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
		var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
		var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
		var todoLiUl = todoLi.querySelector('ul');
		var todoLiEntry = todoLi.querySelector('p');
		var todo = findTodo(todos, todoLi.id)
		// Only operate on children that 1) exist and 2) are displayed
		// todoLiUl classlist.length === 1 when children are hidden
		if (todo.children.length > 0 && todoLiUl.classList.length === 0) {
			for (var i = 0; i < todo.children.length; i++) {
				childLi = todoLiUl.children[i];
				if (childLi.classList.length === 0) {
					selectChildrenFromRoot(childLi);
				}
//				childLiUl = childLi.querySelector('ul');
//				if (childLiUl && childLiUl.children.length > 0) {
//					selectChildrenFromRoot(childLi);
//				}
			}
		}
		if (clickedTodoLiSelectChildrenButton.textContent === 'Select children') {		// Root 'Select children' clicked
			todoLiCompleteButton.classList.add('inactive');
			todoLiDeleteButton.classList.add('inactive');
			todoLiAddSiblingButton.classList.add('inactive');
			todoLiAddChildButton.classList.add('inactive');
			todoLiShowChildrenButton.classList.add('inactive');
			if (todo.children.length > 0) {
				todoLiSelectChildrenButton.textContent = 'Unselect children';
				for (var i = 0; i < todo.children.length; i++) {
					var childTodo = todo.children[i];
					if (childTodo.completed === false) {
						childrenUncompletedCount++;
					}
					if (childTodo.deleted === false) {
						childrenUndeletedCount++;
					}
				}
			}
			if (todoLi === clickedTodoLi) {
				// Special handling for the root todoLi
				todoLiCompleteSelectedChildrenButton.classList.remove('inactive');
				todoLiDeleteSelectedChildrenButton.classList.remove('inactive');
			} else {
				todoLiSelectButton.textContent = 'Unselect';
				todoLiSelectButton.classList.remove('inactive');
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
				todoLiEntry.classList.add('highlighted');
				todo.selected = true;
		
			}

		} else {																		// Root 'Unselect children' clicked
			todoLiCompleteButton.classList.remove('inactive');
			todoLiDeleteButton.classList.remove('inactive');
			todoLiAddSiblingButton.classList.remove('inactive');
			todoLiAddChildButton.classList.remove('inactive');

			if (todo.children.length > 0) {
				todoLiSelectChildrenButton.textContent = 'Select children';
				todoLiShowChildrenButton.classList.remove('inactive');

				if (todoLiUl && todoLiUl.classList.length === 0) {
					for (var i = 0; i < todo.children.length; i++) {
						var childTodo = todo.children[i];
						if (childTodo.completed === false) {
							childrenUncompletedCount++;
						}
						if (childTodo.deleted === false) {
							childrenUndeletedCount++;
						}
					}
				}
			}

			if (todoLi === clickedTodoLi) {
				// Special handling for the root todoLi
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');

			} else {
				todoLiSelectButton.textContent = 'Select';
				todoLiSelectButton.classList.add('inactive');
				todoLiEntry.classList.remove('highlighted');
				todo.selected = false;

			}
		}
	}

	function selectChildrenFromBranch(todoLi) {		// starts from clicked todoLi button, then recurses
		var todoLiSelectButton = todoLi.children.namedItem('select');
		var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
		var todoLiCompleteButton = todoLi.children.namedItem('complete');
		var todoLiDeleteButton = todoLi.children.namedItem('delete');
		var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
		var todoLiAddChildButton = todoLi.children.namedItem('addChild');
		var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
		var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
		var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
		var todoLiUl = todoLi.querySelector('ul');
		var todoLiEntry = todoLi.querySelector('p');
		var todo = findTodo(todos, todoLi.id)
		// Only operate on children that 1) exist and 2) are displayed
		// todoLiUl classlist.length === 1 when children are hidden
		if (todo.children.length > 0 && todoLiUl.classList.length === 0) {
			for (var i = 0; i < todo.children.length; i++) {
				childLi = todoLiUl.children[i];
				if (childLi.classList.length === 0) {	// only process children that are not hidden
					selectChildrenFromBranch(childLi);
				}
			}
		}
		if (clickedTodoLiSelectChildrenButton.textContent === 'Select children') {		// Branch 'Select children' clicked
			todoLiCompleteButton.classList.add('inactive');
			todoLiDeleteButton.classList.add('inactive');
			todoLiAddSiblingButton.classList.add('inactive');
			todoLiAddChildButton.classList.add('inactive');
			todoLiShowChildrenButton.classList.add('inactive');
			if (todo.children.length > 0 && todoLiUl.classList.length === 0) {
				todoLiSelectChildrenButton.textContent = 'Unselect children';
				// todoLiSelectChildrenButton.classList.remove('inactive');
				for (var i = 0; i < todo.children.length; i++) {
					var childTodo = todo.children[i];
					if (childTodo.completed === false) {
						childrenUncompletedCount++;
					}
					if (childTodo.deleted === false) {
						childrenUndeletedCount++;
					}
				}
			}
			if (todoLi === clickedTodoLi) {
				// Special handling for the branch todoLi
				// TODO buttons already hidden so these are unneeded(?)
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
			} else {
				todoLiSelectButton.textContent = 'Unselect';
				todoLiSelectButton.classList.remove('inactive');
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
				todoLiEntry.classList.add('highlighted');
				todo.selected = true;
		
			}

		} else {	// Branch 'Unselect children' clicked

			if (todo.children.length > 0 && todoLiUl.classList.length === 0) {	// Conditional necessary? Yes because
				todoLiSelectChildrenButton.textContent = 'Select children';		// it acts on nested todoLis.
				for (var i = 0; i < todo.children.length; i++) {
					var childTodo = todo.children[i];
					// TODO these are not necessary for branch are they?
					if (childTodo.completed === false) {
						childrenUncompletedCount++;
					}
					if (childTodo.deleted === false) {
						childrenUndeletedCount++;
					}
				}
			}

			if (todoLi === clickedTodoLi) {
				// Special handling for the clicked todoLi TODO remove conditional
				//todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				//todoLiDeleteSelectedChildrenButton.classList.add('inactive');

			} else {
				todoLiSelectButton.textContent = 'Select';
				//todoLiSelectButton.classList.add('inactive');
				todoLiEntry.classList.remove('highlighted');
				todo.selected = false;

			}
		}
	}
}

function findSelectChildrenRootTodo(todoLi) {
	var parent = findParent(todoLi);
	if (parent) {
		var parentTodoLi = document.getElementById(parent.id);
		var parentTodoLiSelectButton = parentTodoLi.children.namedItem('select');
		if (parentTodoLiSelectButton.classList.contains('inactive')) {
			return parent;
		} else {
			findSelectChildrenRootTodo(parent);
		}
	} else {
		return undefined;
	}
}

// TODO delete unused function it is defined and used inside altSelectChildren
function xxselectChildrenFromRoot(todoLi) {
	var todoLiSelectButton = todoLi.children.namedItem('select');
	var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
	var todoLiCompleteButton = todoLi.children.namedItem('complete');
	var todoLiDeleteButton = todoLi.children.namedItem('delete');
	var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
	var todoLiAddChildButton = todoLi.children.namedItem('addChild');
	var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
	var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	var todoLiEntry = todoLi.querySelector('p');
	var todo = findTodo(todos, todoLi.id)
	// Only operate on children that 1) exist and 2) are displayed
	// todoLiUl classlist.length === 1 when children are hidden
	if (todo.children.length > 0 && todoLiUl.classList.length === 0) {
		for (var i = 0; i < todo.children.length; i++) {
			childLi = todoLiUl.children[i];
			childLiUl = childLi.querySelector('ul');
			if (childLiUl && childLiUl.children.length > 0) {
				xxselectChildrenFromRoot(childLi);
			}
		}
		if (todoLiSelectChildrenButton.textContent === 'Select children') {		// 'Select children' clicked
			todoLiSelectChildrenButton.textContent = 'Unselect children';
			todoLiCompleteButton.classList.add('inactive');
			todoLiDeleteButton.classList.add('inactive');
			todoLiAddSiblingButton.classList.add('inactive');
			todoLiAddChildButton.classList.add('inactive');
			todoLiShowChildrenButton.classList.add('inactive');
			todoLiCompleteSelectedChildrenButton.classList.add('inactive');
			todoLiDeleteSelectedChildrenButton.classList.add('inactive');

			var childrenUncompletedCount = 0;
			var childrenUndeletedCount = 0;
			for (var i = 0; i < todo.children.length; i++) {
				childLi = todoLiUl.children[i];
				if (childLi.classList.length === 0) {
					childLi.children.namedItem('select').textContent = 'Unselect';
					childLi.querySelector('p').classList.add('highlighted');
					childLi.children.namedItem('select').classList.remove('inactive');
					childLi.children.namedItem('complete').classList.add('inactive');
					childLi.children.namedItem('delete').classList.add('inactive');
					childLi.children.namedItem('addSibling').classList.add('inactive');
					childLi.children.namedItem('addChild').classList.add('inactive');

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
		} else {	// 'Unselect children' clicked
			todoLiSelectChildrenButton.textContent = 'Select children';
			if (selectAllButton.textContent === 'Unselect all') {
				todoLiShowChildrenButton.classList.add('inactive');
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
				if (!todoLiEntry.classList.contains('highlighted')) {
					todoLiCompleteButton.classList.remove('inactive');
					todoLiDeleteButton.classList.remove('inactive');
					todoLiAddSiblingButton.classList.remove('inactive');
					todoLiAddChildButton.classList.remove('inactive');
				}
				for (var i = 0; i < todo.children.length; i++) {
					todo.children[i].selected = false;
					childLi = todoLiUl.children[i];
					childLi.children.namedItem('select').textContent = 'Select';
					childLi.querySelector('p').classList.remove('highlighted');
					childLi.children.namedItem('select').classList.remove('inactive');
					childLi.children.namedItem('complete').classList.add('inactive');
					childLi.children.namedItem('delete').classList.add('inactive');
					childLi.children.namedItem('addSibling').classList.add('inactive');
					childLi.children.namedItem('addChild').classList.add('inactive');
				}
			} else {	// selectAllButton text === 'Select all' 
				todoLiShowChildrenButton.classList.remove('inactive');
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
				if (!todoLiEntry.classList.contains('highlighted')) {
					todoLiCompleteButton.classList.remove('inactive');
					todoLiDeleteButton.classList.remove('inactive');
					todoLiAddSiblingButton.classList.remove('inactive');
					todoLiAddChildButton.classList.remove('inactive');
				}
				for (var i = 0; i < todo.children.length; i++) {
					todo.children[i].selected = false;
					childLi = todoLiUl.children[i];
					childLi.children.namedItem('select').textContent = 'Select';
					childLi.querySelector('p').classList.remove('highlighted');
					childLi.children.namedItem('select').classList.add('inactive');
					childLi.children.namedItem('complete').classList.remove('inactive');
					childLi.children.namedItem('delete').classList.remove('inactive');
					childLi.children.namedItem('addSibling').classList.remove('inactive');
					childLi.children.namedItem('addChild').classList.remove('inactive');
				}
			}
		}
	}
}
// TODO delete unused function (it is defined and used inside altSelectChildren
function xxselectChildrenFromBranch(todoLi) {
	var todoLiSelectButton = todoLi.children.namedItem('select');
	var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
	var todoLiCompleteButton = todoLi.children.namedItem('complete');
	var todoLiDeleteButton = todoLi.children.namedItem('delete');
	var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
	var todoLiAddChildButton = todoLi.children.namedItem('addChild');
	var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
	var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	var todoLiEntry = todoLi.querySelector('p');
	var todo = findTodo(todos, todoLi.id)
	// Only operate on children that 1) exist and 2) are displayed
	// todoLiUl classlist.length === 1 when children are hidden
	if (todo.children.length > 0 && todoLiUl.classList.length === 0) {
		for (var i = 0; i < todo.children.length; i++) {
			childLi = todoLiUl.children[i];
			childLiUl = childLi.querySelector('ul');
			if (childLiUl && childLiUl.children.length > 0) {
				xxselectChildrenFromRoot(childLi);
			}
		}
		if (todoLiSelectChildrenButton.textContent === 'Select children') {
			todoLiSelectChildrenButton.textContent = 'Unselect children';
			todoLiCompleteButton.classList.add('inactive');
			todoLiDeleteButton.classList.add('inactive');
			todoLiAddSiblingButton.classList.add('inactive');
			todoLiAddChildButton.classList.add('inactive');
			todoLiShowChildrenButton.classList.add('inactive');
			todoLiCompleteSelectedChildrenButton.classList.add('inactive');
			todoLiDeleteSelectedChildrenButton.classList.add('inactive');

			var childrenUncompletedCount = 0;
			var childrenUndeletedCount = 0;
			for (var i = 0; i < todo.children.length; i++) {
				childLi = todoLiUl.children[i];
				if (childLi.classList.length === 0) {
					childLi.children.namedItem('select').textContent = 'Unselect';
					childLi.querySelector('p').classList.add('highlighted');
					childLi.children.namedItem('select').classList.remove('inactive');
					childLi.children.namedItem('complete').classList.add('inactive');
					childLi.children.namedItem('delete').classList.add('inactive');
					childLi.children.namedItem('addSibling').classList.add('inactive');
					childLi.children.namedItem('addChild').classList.add('inactive');

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
			todoLiShowChildrenButton.classList.add('inactive');
			todoLiCompleteSelectedChildrenButton.classList.add('inactive');
			todoLiDeleteSelectedChildrenButton.classList.add('inactive');
			if (!todoLiEntry.classList.contains('highlighted')) {
				todoLiCompleteButton.classList.remove('inactive');
				todoLiDeleteButton.classList.remove('inactive');
				todoLiAddSiblingButton.classList.remove('inactive');
				todoLiAddChildButton.classList.remove('inactive');
			}
			for (var i = 0; i < todo.children.length; i++) {
				todo.children[i].selected = false;
				childLi = todoLiUl.children[i];
				childLi.children.namedItem('select').textContent = 'Select';
				childLi.querySelector('p').classList.remove('highlighted');
				childLi.children.namedItem('select').classList.remove('inactive');
				childLi.children.namedItem('complete').classList.add('inactive');
				childLi.children.namedItem('delete').classList.add('inactive');
				childLi.children.namedItem('addSibling').classList.add('inactive');
				childLi.children.namedItem('addChild').classList.add('inactive');
			}
		}
	}
}

function selectChildren(todoLi) {
	var todoLiSelectButton = todoLi.children.namedItem('select');
	var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
	var todoLiCompleteButton = todoLi.children.namedItem('complete');
	var todoLiDeleteButton = todoLi.children.namedItem('delete');
	var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
	var todoLiAddChildButton = todoLi.children.namedItem('addChild');
	var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
	var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	var todoLiEntry = todoLi.querySelector('p');
	var todo = findTodo(todos, todoLi.id)
	// Only operate on children that 1) exist and 2) are displayed
	// todoLiUl classlist.length === 1 when children are hidden
	if (todoLiUl && todoLiUl.children.length > 0 && todoLiUl.classList.length === 0) {
		for (var i = 0; i < todoLiUl.children.length; i++) {
			childLi = todoLiUl.children[i];
			childLiUl = childLi.querySelector('ul');
			if (childLiUl && childLiUl.children.length > 0) {
				selectChildren(childLi);
			}
		}
		if (todoLiSelectChildrenButton.textContent === 'Select children') {
			todoLiSelectChildrenButton.textContent = 'Unselect children';
			todoLiCompleteButton.classList.add('inactive');
			todoLiDeleteButton.classList.add('inactive');
			todoLiAddSiblingButton.classList.add('inactive');
			todoLiAddChildButton.classList.add('inactive');
			todoLiShowChildrenButton.classList.add('inactive');
			if (selectAllButton.textContent === 'Unselect all') {
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
			} else {
				todoLiCompleteSelectedChildrenButton.classList.remove('inactive');
				todoLiDeleteSelectedChildrenButton.classList.remove('inactive');
			}
			var childrenUncompletedCount = 0;
			var childrenUndeletedCount = 0;
			for (var i = 0; i < todo.children.length; i++) {
				childLi = todoLiUl.children[i];
				if (childLi.classList.length === 0) {
					childLi.children.namedItem('select').textContent = 'Unselect';
					childLi.querySelector('p').classList.add('highlighted');
					childLi.children.namedItem('select').classList.remove('inactive');
					childLi.children.namedItem('complete').classList.add('inactive');
					childLi.children.namedItem('delete').classList.add('inactive');
					childLi.children.namedItem('addSibling').classList.add('inactive');
					childLi.children.namedItem('addChild').classList.add('inactive');

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
			if (selectAllButton.textContent === 'Unselect all') {
				todoLiShowChildrenButton.classList.add('inactive');
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
				if (!todoLiEntry.classList.contains('highlighted')) {
					todoLiCompleteButton.classList.remove('inactive');
					todoLiDeleteButton.classList.remove('inactive');
					todoLiAddSiblingButton.classList.remove('inactive');
					todoLiAddChildButton.classList.remove('inactive');
				}
				for (var i = 0; i < todo.children.length; i++) {
					todo.children[i].selected = false;
					childLi = todoLiUl.children[i];
					childLi.children.namedItem('select').textContent = 'Select';
					childLi.querySelector('p').classList.remove('highlighted');
					childLi.children.namedItem('select').classList.remove('inactive');
					childLi.children.namedItem('complete').classList.add('inactive');
					childLi.children.namedItem('delete').classList.add('inactive');
					childLi.children.namedItem('addSibling').classList.add('inactive');
					childLi.children.namedItem('addChild').classList.add('inactive');
				}
			} else {	// selectAllButton text === 'Select all' 
				todoLiShowChildrenButton.classList.remove('inactive');
				todoLiCompleteSelectedChildrenButton.classList.add('inactive');
				todoLiDeleteSelectedChildrenButton.classList.add('inactive');
				if (!todoLiEntry.classList.contains('highlighted')) {
					todoLiCompleteButton.classList.remove('inactive');
					todoLiDeleteButton.classList.remove('inactive');
					todoLiAddSiblingButton.classList.remove('inactive');
					todoLiAddChildButton.classList.remove('inactive');
				}
				for (var i = 0; i < todo.children.length; i++) {
					todo.children[i].selected = false;
					childLi = todoLiUl.children[i];
					childLi.children.namedItem('select').textContent = 'Select';
					childLi.querySelector('p').classList.remove('highlighted');
					childLi.children.namedItem('select').classList.add('inactive');
					childLi.children.namedItem('complete').classList.remove('inactive');
					childLi.children.namedItem('delete').classList.remove('inactive');
					childLi.children.namedItem('addSibling').classList.remove('inactive');
					childLi.children.namedItem('addChild').classList.remove('inactive');
				}
			}
		}
	}
}

// Called from selectAll button click. Differs from selectChildren in hiding complete/deleteSelectedChildren buttons.
function selectAllChildren(todoLi) {
	var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
	var todoLiCompleteButton = todoLi.children.namedItem('complete');
	var todoLiDeleteButton = todoLi.children.namedItem('delete');
	var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
	var todoLiAddChildButton = todoLi.children.namedItem('addChild');
	var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
	var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	var todoLiEntry = todoLi.querySelector('p');
	var todo = findTodo(todos, todoLi.id)
	// Only operate on children that 1) exist and 2) are displayed
	// todoLiUl classlist.length === 1 when children are hidden
	if (todoLiUl && todoLiUl.children.length > 0 && todoLiUl.classList.length === 0) {
		for (var i = 0; i < todoLiUl.children.length; i++) {
			childLi = todoLiUl.children[i];
			childLiUl = childLi.querySelector('ul');
			if (childLiUl && childLiUl.children.length > 0) {
				selectChildren(childLi);
			}
		}
		if (todoLiSelectChildrenButton.textContent === 'Select children') {
			todoLiSelectChildrenButton.textContent = 'Unselect children';
			todoLiCompleteButton.classList.add('inactive');
			todoLiDeleteButton.classList.add('inactive');
			todoLiAddSiblingButton.classList.add('inactive');
			todoLiAddChildButton.classList.add('inactive');
			todoLiShowChildrenButton.classList.add('inactive');
			todoLiCompleteSelectedChildrenButton.classList.add('inactive');
			todoLiDeleteSelectedChildrenButton.classList.add('inactive');
			var childrenUncompletedCount = 0;
			var childrenUndeletedCount = 0;
			for (var i = 0; i < todo.children.length; i++) {
				childLi = todoLiUl.children[i];
				if (childLi.classList.length === 0) {
					childLi.children.namedItem('select').textContent = 'Unselect';
					childLi.querySelector('p').classList.add('highlighted');
					childLi.children.namedItem('select').classList.remove('inactive');
					childLi.children.namedItem('complete').classList.add('inactive');
					childLi.children.namedItem('delete').classList.add('inactive');
					childLi.children.namedItem('addSibling').classList.add('inactive');
					childLi.children.namedItem('addChild').classList.add('inactive');

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
			if (!todoLiEntry.classList.contains('highlighted')) {
				todoLiCompleteButton.classList.remove('inactive');
				todoLiDeleteButton.classList.remove('inactive');
				todoLiAddSiblingButton.classList.remove('inactive');
				todoLiAddChildButton.classList.remove('inactive');
			}
			for (var i = 0; i < todo.children.length; i++) {
				todo.children[i].selected = false;
				childLi = todoLiUl.children[i];
				childLi.children.namedItem('select').textContent = 'Select';
				childLi.querySelector('p').classList.remove('highlighted');
				childLi.children.namedItem('select').classList.add('inactive');
				childLi.children.namedItem('complete').classList.remove('inactive');
				childLi.children.namedItem('delete').classList.remove('inactive');
				childLi.children.namedItem('addSibling').classList.remove('inactive');
				childLi.children.namedItem('addChild').classList.remove('inactive');
			}
		}
	}
}

// called from unselectAll
function unselectAllChildren(todoLi) {
	var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
	var todoLiCompleteButton = todoLi.children.namedItem('complete');
	var todoLiDeleteButton = todoLi.children.namedItem('delete');
	var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
	var todoLiAddChildButton = todoLi.children.namedItem('addChild');
	var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
	var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	var todoLiEntry = todoLi.querySelector('p');
	var todo = findTodo(todos, todoLi.id)
	// Only operate on children that 1) exist and 2) are displayed
	// todoLiUl classlist.length === 1 when children are hidden
	if (todoLiUl && todoLiUl.children.length > 0 && todoLiUl.classList.length === 0) {
		for (var i = 0; i < todoLiUl.children.length; i++) {
			todoLi = todoLiUl.children[i];
			todoLiUl == todoLi.querySelector('ul');
			if (todoLiUl && todoLiUl.children.length > 0) {
				unselectAllChildren(todoLi);
			}
		}
		todoLiSelectChildrenButton.textContent = 'Select children';
		todoLiShowChildrenButton.classList.remove('inactive');
		todoLiCompleteSelectedChildrenButton.classList.add('inactive');
		todoLiDeleteSelectedChildrenButton.classList.add('inactive');
		if (!todoLiEntry.classList.contains('highlighted')) {
			todoLiCompleteButton.classList.remove('inactive');
			todoLiDeleteButton.classList.remove('inactive');
			todoLiAddSiblingButton.classList.remove('inactive');
			todoLiAddChildButton.classList.remove('inactive');
		}
		for (var i = 0; i < todo.children.length; i++) {
			todo.children[i].selected = false;
			childLi = todoLiUl.children[i];
			childLi.children.namedItem('select').textContent = 'Select';
			childLi.querySelector('p').classList.remove('highlighted');
			childLi.children.namedItem('select').classList.add('inactive');
			childLi.children.namedItem('complete').classList.remove('inactive');
			childLi.children.namedItem('delete').classList.remove('inactive');
			childLi.children.namedItem('addSibling').classList.remove('inactive');
			childLi.children.namedItem('addChild').classList.remove('inactive');
		}
	}
}

function completeSelectedChildren(todoLi) {
	var todoLiCompleteSelectedChildrenButton = todoLi.children.namedItem('completeSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	if (todoLiUl && todoLiUl.children.length > 0) {
		var childCount = todoLiUl.children.length;
		if (todoLiCompleteSelectedChildrenButton.textContent === 'Complete selected children') {
			todoLiCompleteSelectedChildrenButton.textContent = 'Uncomplete selected children';
			for (var i = 0; i < childCount; i++) {
				var childLi = todoLiUl.children[i];
				// add recursion
				var childLiUl = childLi.querySelector('ul');
				if (childLiUl && childLiUl.children.length > 0) {
					completeSelectedChildren(childLi);
				}
				// recursion done
				if (childLi.querySelector('p').classList.contains('highlighted')) {
					childLi.children.namedItem('complete').textContent = 'Uncomplete';
					childLi.querySelector('p').classList.add('struck-completed');
					childLi.classList.remove('active-removed');		// is this needed?
					var childTodo = findTodo(todos, childLi.id);
					childTodo.markCompleted(true);
					if (showCompletedButton.textContent === 'Completed') {
						childLi.classList.add('completed-removed');
					}
				}
			}
		} else {
			todoLiCompleteSelectedChildrenButton.textContent = 'Complete selected children';
			for (var i = 0; i < childCount; i++) {
				var childLi = todoLiUl.children[i];	
				// add recursion
				var childLiUl = childLi.querySelector('ul');
				if (childLiUl && childLiUl.children.length > 0) {
					completeSelectedChildren(childLi);
				}
				// recursion done
				if (childLi.querySelector('p').classList.contains('highlighted')) {
					childLi.children.namedItem('complete').textContent = 'Complete';
					childLi.querySelector('p').classList.remove('struck-completed');
					childLi.classList.remove('completed-removed');		// is this needed?
					var childTodo = findTodo(todos, childLi.id);
					childTodo.markCompleted(false);
					if (showActiveButton.textContent === 'Active') {
						childLi.classList.add('active-removed');
					}
				}
			}
		}
	}
}

function deleteSelectedChildren(todoLi) {
	var todoLiDeleteSelectedChildrenButton = todoLi.children.namedItem('deleteSelectedChildren');
	var todoLiUl = todoLi.querySelector('ul');
	if (todoLiUl && todoLiUl.children.length > 0) {
		var childCount = todoLiUl.children.length;
		if (todoLiDeleteSelectedChildrenButton.textContent === 'Delete selected children') {
			todoLiDeleteSelectedChildrenButton.textContent = 'Undelete selected children';
			for (var i = 0; i < childCount; i++) {
				var childLi = todoLiUl.children[i];	
				// add recursion
				var childLiUl = childLi.querySelector('ul');
				if (childLiUl && childLiUl.children.length > 0) {
					deleteSelectedChildren(childLi);
				}
				// recursion done
				if (childLi.querySelector('p').classList.contains('highlighted')) {
					childLi.children.namedItem('delete').textContent = 'Undelete';
					childLi.querySelector('p').classList.add('faded-deleted');
					childLi.classList.remove('active-removed');		// is this needed?
					var childTodo = findTodo(todos, childLi.id);
					childTodo.markDeleted(true);
					if (showDeletedButton.textContent === 'Deleted') {
						childLi.classList.add('deleted-removed');
					}
				}
			}
		} else {
			todoLiDeleteSelectedChildrenButton.textContent = 'Delete selected children';
			for (var i = 0; i < childCount; i++) {
				var childLi = todoLiUl.children[i];	
				// add recursion
				var childLiUl = childLi.querySelector('ul');
				if (childLiUl && childLiUl.children.length > 0) {
					deleteSelectedChildren(childLi);
				}
				// recursion done
				if (childLi.querySelector('p').classList.contains('highlighted')) {
					childLi.children.namedItem('delete').textContent = 'Delete';
					childLi.querySelector('p').classList.remove('faded-deleted');
					childLi.classList.remove('deleted-removed');		// is this needed?
					var childTodo = findTodo(todos, childLi.id);
					childTodo.markDeleted(false);
					if (showActiveButton.textContent === 'Active') {
						childLi.classList.add('active-removed');
					}
				}
			}
		}
	}
}

// return true if any todoLi's are displayed in given todos array, else false
function todoLiDisplayed(todosArray) {
	// default setting
	var activeShown = true;
	var completedShown = true;
	var deletedShown = false;
	if (showActiveButton.textContent === 'Active') {
		activeShown = false;
	}
	if (showCompletedButton.textContent === 'Completed') {
		completedShown = false;
	}
	if (showDeletedButton.textContent === '√ Deleted') {
		deletedShown = true;
	}
	
	for (var i = 0; i < todos.length; i++) {
		if (todos[i].completed === false && todos[i].deleted === false) {
			if (activeShown === true) {
				return true;
			}
		}
		if (todos[i].completed) {
			if (completedShown) {
				return true;
			}
		}
		if (todos[i].deleted) {
			if (deletedShown) {
				return true;
			}
		}
	}
	return false;
}

// Deactivate selectChildren and showChildren buttons if no children are displayed
// Reactivate if children are put back on display
function toggleDisplayDependentTodoLiButtons(todo) {
	// Set up filter buttons that control display
	
	// Default filter settings
	var activeShown = true;
	var completedShown = true;
	var deletedShown = false;
	
	if (showActiveButton.textContent === 'Active') {
		activeShown = false;
	}
	if (showCompletedButton.textContent === 'Completed') {
		completedShown = false;
	}
	if (showDeletedButton.textContent === '√ Deleted') {
		deletedShown = true;
	}
	// return true if any child todos are displayed, else false
	function todosDisplayed(childTodosArray) {
		for (var i = 0; i < childTodosArray.length; i++) {
			if (childTodosArray[i].completed === false && childTodosArray[i].deleted === false) {
				if (activeShown === true) {
					return true;
				}
			}
			if (childTodosArray[i].completed) {
				if (completedShown) {
					return true;
				}
			}
			if (childTodosArray[i].deleted) {
				if (deletedShown) {
					return true;
				}
			}
		}
		return false;
	}
	// State of display depends on whether a todoLi completed/deleted button or a filter button was clicked
	function toggleButtons(todo) {
		if (todo) {		// Case 1: A todoLi completed or deleted button was clicked; start from the todo
			handleTodoLiCase(todo);
		} else {		// Case 2: A filter button was clicked; start from todos array
			handleFilterCase(todos);
		}
	}

	function handleTodoLiCase(todo) {
		var parentTodo = findParent(todo);
		if (parentTodo) {
			var todoLi = document.getElementById(parentTodo.id);
			var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
			var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
			var childTodosArray = parentTodo.children;
			for (var i = 0; i < childTodosArray.length; i++) {
				if (!todosDisplayed(childTodosArray)) {
					todoLiSelectChildrenButton.classList.add('inactive');
					todoLiShowChildrenButton.classList.add('inactive');
				} else {
					todoLiSelectChildrenButton.classList.remove('inactive');
					todoLiShowChildrenButton.classList.remove('inactive');
				}
			}
		}
	}

	function handleFilterCase(todosArray) {
		for (var i = 0; i < todosArray.length; i++) {
			var todo = todosArray[i];
			var todoLi = document.getElementById(todo.id);
			var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
			var todoLiAddChildButton = todoLi.children.namedItem('addChild');
			if (!activeShown) {
				todoLiAddSiblingButton.classList.add('inactive');
				todoLiAddChildButton.classList.add('inactive');
			} else {
				todoLiAddSiblingButton.classList.remove('inactive');
				todoLiAddChildButton.classList.remove('inactive');
			}
			if (todo.children && todo.children.length > 0) {
				var todoLiSelectChildrenButton = todoLi.children.namedItem('selectChildren');
				var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
				if (!todosDisplayed(todo.children)) {
					todoLiSelectChildrenButton.classList.add('inactive');
					todoLiShowChildrenButton.classList.add('inactive');
				} else {
					todoLiSelectChildrenButton.classList.remove('inactive');
					todoLiShowChildrenButton.classList.remove('inactive');
					handleFilterCase(todo.children);	// recurse for nested grandchildren
				}
			}
		}
	}

	toggleButtons(todo);	// run recursive function
}

function unselectAll() {
	var todosUl = todolist.children[0];
	selectAllButton.textContent = 'Select all';
	completeSelectedButton.classList.add('inactive');
	deleteSelectedButton.classList.add('inactive');
	addTodoButton.classList.remove('inactive');
//	undoEditButton.classList.remove('inactive');
	for (var i = 0; i < todosUl.children.length; i++) {
		var todoLi = todosUl.children[i];
		var todoLiSelectButton = todoLi.children.namedItem('select');
		var todoLiCompleteButton = todoLi.children.namedItem('complete');
		var todoLiDeleteButton = todoLi.children.namedItem('delete');
		var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
		var todoLiAddChildButton = todoLi.children.namedItem('addChild');
		todoLiSelectButton.textContent = 'Select';
		todoLiSelectButton.classList.add('inactive');
		todoLiCompleteButton.classList.remove('inactive');
		todoLiDeleteButton.classList.remove('inactive');
		todoLiAddSiblingButton.classList.remove('inactive');
		todoLiAddChildButton.classList.remove('inactive');
		var todoLiEntry = todoLi.querySelector('p');
		todoLiEntry.classList.remove('highlighted');
		var todo = findTodo(todos, todoLi.id)
		todo.selected = false;
		unselectAllChildren(todoLi);
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

function togglePurgeSelectedDeletedTodos() {
	if (showDeletedButton.textContent === '√ Deleted' && anySelectedDeletedTodos(todos)) {
		purgeSelectedDeletedButton.disabled = false;
	} else {
		purgeSelectedDeletedButton.disabled = true;
	}
}


/************************************* Event handling ***********************************/

function keyDownHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todo entry
		if (event.key === "Enter") {
			event.preventDefault();		// Prevents an unwanted return character from being added to the entry
										// Calling event.preventDefault() on keyUp event is too late to do the job
		}
	}
}

function keyUpHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todoLi entry
		var todoLi = event.target.parentElement;
		var editedEntry = event.target.textContent
		var todo = findTodo(todos, todoLi.id);
		var todoArray = findArray(todos, todo.id);
		if (event.key === "Enter") {
			if (todo.entry != editedEntry) {
				todo.update(editedEntry);			// Must update entry before re-rendering
			}
			if (event.shiftKey) {
				appendNewChildTodoLi(todo)			// Shift-return appends a new child todo
			} else {
				insertNewTodoLi(todoArray, todo);	// Return inserts a new sibling todo
			}
		} else if (event.key === "Escape") {
			// these lines lifted from undoEdit event handler, TODO consolidate
			todo.entry = originalEntry
			var todoLiEntry = todoLi.querySelector('p');
			todoLiEntry.textContent = originalEntry
			var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
			todoLiUndoEditButton.disabled = true;
			todoLiEntry.blur();		// Blur to match result of clicking undoEdit button
		}
	}
}

// Used in todolist.addEventListener('input', inputHandler);
// input event fires when the value of <textarea> changes
function inputHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todo entry
		var todoLi = event.target.parentElement;
		var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
		var todoLiEntry = todoLi.querySelector('p');
		var todo = findTodo(todos, todoLi.id);
		// set up variables for undoEdit
//		entryJustEdited = todoLiEntry;
//		todoJustEdited = todo;
		originalEntry = todo.entry;
		if (oldUndoEditButton) {
			oldUndoEditButton.disabled = true;	// only want one undoEditButton at a time
		}
		todoLiUndoEditButton.disabled = false;
		oldUndoEditButton = todoLiUndoEditButton;
	}
}

// Used in todolist.addEventListener('focusout', editHandler);
function editHandler(event) {
	if (event.target.nodeName === "P" && event.target.parentElement.nodeName === "LI") {
		// target is a todo entry
		var todoLi = event.target.parentElement;
		var editedEntry = event.target.textContent;
		var todo = findTodo(todos, todoLi.id);
		if (todo) {											// TODO Is this conditional necessary?
			if (todo.entry !== editedEntry) {
				todo.update(editedEntry);
			}
		}
	}
}

function todoClickHandler(event) {
	if (event.target.nodeName === "BUTTON") {
		var todoLi = event.target.parentElement;
		var todoLiEntry = todoLi.querySelector('p');
		var todo = findTodo(todos, todoLi.id)
		var todoArray = findArray(todos, todoLi.id);	// todos or a todo.children array

		if (event.target.name === "select") {
//			var todoLiSelectButton = todoLi.children.namedItem('select');
//			var parentTodo = findParent(todo);
			todo.selected = !todo.selected;
/*			if (todo.selected) {	// Select button was clicked, todo now selected
				todoLiSelectButton.textContent = 'Unselect';
				todoLiEntry.classList.add('highlighted');
				// if all children in branch are now selected, set parent selectChildren button to Unselect children
				if (parentTodo && !anyUnselectedTodos(parentTodo.children)) {
					var parentTodoLi = document.getElementById(parentTodo.id);
					var parentTodoLiSelectChildrenButton = parentTodoLi.children.namedItem('selectChildren');
					parentTodoLiSelectChildrenButton.textContent = 'Unselect children';
				}
			} else {	// Unselect button was clicked, todo is now unselected
				if (!anySelectedTodos(todos)) {
					unselectAll();
				} else {
					todoLiSelectButton.textContent = 'Select';
					todoLiEntry.classList.remove('highlighted');
					// if all children in branch are now unselected, set parent selectChildren button to Select children
					if (parentTodo && !anySelectedTodos(parentTodo.children)) {
						var parentTodoLi = document.getElementById(parentTodo.id);
						var parentTodoLiSelectChildrenButton = parentTodoLi.children.namedItem('selectChildren');
						parentTodoLiSelectChildrenButton.textContent = 'Select children';
					}
			
				}
			}
			togglePurgeSelectedDeletedTodos();
*/
			renderTodolist();
		}
		if (event.target.name === "complete") {
//			var todoLiCompleteButton = todoLi.children.namedItem('complete');
//			todo.completed = !todo.completed;
			if (todo.stage === 'completed') {
				todo.stage = 'active';
//				todoLiCompleteButton.textContent = 'Complete';
//				todoLi.querySelector('p').classList.remove('struck-completed');
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
//				todoLi.classList.remove('completed-removed');
//				if (showActiveButton.textContent === 'Active') {
//					todoLi.classList.add('active-removed');
//				}
			} else {
				todo.stage = 'completed';
//				todoLiCompleteButton.textContent = 'Uncomplete';
//				todoLi.querySelector('p').classList.add('struck-completed');
//				if (showCompletedButton.textContent === 'Completed') {
//					todoLi.classList.add('completed-removed');
					// if no todoLis are displayed, set selectAllButton inactive
//					if (selectAllButton.textContent === 'Select all'); {
//						if (!todoLiDisplayed(todoArray)) {
//							selectAllButton.classList.add('inactive');
//						}
//						if (todoArray !== todos) {		// only need to worry about children
//							toggleDisplayDependentTodoLiButtons(todo);
//						}
//					}
//				}
			}
			renderTodolist();
		}
		if (event.target.name === "delete") {
//			var todoLiDeleteButton = todoLi.children.namedItem('delete');
//			todoLiDeleteButton.classList.toggle('deleted');
			todo.deleted = !todo.deleted;
			renderTodolist();
//			if (todo.deleted) {
//				todoLiDeleteButton.textContent = 'Undelete';
//				todoLi.querySelector('p').classList.add('faded-deleted');
//				if (showDeletedButton.textContent === 'Deleted') {
//					todoLi.classList.add('deleted-removed');
//					// if no todoLis are displayed, set selectAllButton inactive
//					if (selectAllButton.textContent === 'Select all'); {
//						if (!todoLiDisplayed(todoArray)) {
//							selectAllButton.classList.add('inactive');
//						}
//						if (todoArray !== todos) {		// only need to worry about children
//							toggleDisplayDependentTodoLiButtons(todo);
//						}
//					}
//				}
//			} else {
//				todoLiDeleteButton.textContent = 'Delete';
//				todoLi.querySelector('p').classList.remove('faded-deleted');
//				if (showActiveButton.textContent === 'Active') {
//					todoLi.classList.add('active-removed');
//				}
//				todoLi.classList.remove('deleted-removed');
//			}
		}
		if (event.target.name === "addSibling") {
			insertNewTodoLi(todoArray, todo)		// todoArray and todo are set above by clickHandler
//			TODO consolidate into a new function addTodo(todoArray, todo)
//			var newTodo = new Todo();
//			insertTodo(todoArray, newTodo, todo);
//			renderTodolist();
//			newTodoLi = document.getElementById(newTodo.id);
//			newTodoLi.querySelector('p').focus();
		}
		if (event.target.name === "addChild") {
			appendNewChildTodoLi(todo)
//			todo.markCollapsed(false);
//			var newTodo= new Todo();
//			insertTodo(todo.children, newTodo);
//			renderTodolist();
//			newTodoLi = document.getElementById(newTodo.id);
//			newTodoLi.querySelector('p').focus();
//			todoLi.querySelector('ul').classList.remove('collapsed');
//			todoLi.children.namedItem('showChildren').classList.remove('inactive');
//			todoLi.children.namedItem('selectChildren').classList.remove('inactive');
		}
		if (event.target.name === "undoEdit") {
			todo.entry = originalEntry;
			todoLiEntry.textContent = originalEntry;
			var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
			todoLiUndoEditButton.disabled = true;
		}
		if (event.target.name === "showChildren") {
			todo.collapsed = !todo.collapsed;
			renderTodolist();

//			var todoLiShowChildrenButton = todoLi.children.namedItem('showChildren');
//			var todoLiUl = todoLi.querySelector('ul');
			
			// don't need to test for nesting because button is not available otherwise
//			if (todo.collapsed) {
//				todo.markCollapsed(false);
//				todoLiUl.classList.remove('collapsed');
//				todoLiShowChildrenButton.textContent = 'Hide children';
//				todoLi.children.namedItem('selectChildren').classList.remove('inactive');
//			} else {
//				todo.markCollapsed(true);
//				todoLiUl.classList.add('collapsed');
//				todoLiShowChildrenButton.textContent = 'Show children';
//				todoLi.children.namedItem('selectChildren').classList.add('inactive');
//			}
		}
		if (event.target.name === "selectChildren") {

			// The selectChildren button
			//	toggles between 'Select children' and 'Unselect children'
			//	has two cases root and branch
			//	root toggles nested children between normal mode and selection mode
			//		normal: Select hidden
			//				Complete, Delete, addSibling, addChild shown
			//				showChildren shown
			//				selectChildren shown if children not hidden
			//		selection:	Select shown
			//					Complete, Delete, addSibling, addChild hidden
			//					showChildren hidden
			//					selectChildren shown if children not hidden
			//	branch toggles nested childrens'  select and selectChildren buttons text
			//	root should not set text of Complete and Delete buttons when returning to normal mode
			//	root should not set text of its completeSelectedChildren and deleteSelectedChildren buttons
			//	root should not set text of child showChildren buttons or visibility of selectChildren button
			//
			//	event should bubble up so higher level buttons (branch and root) can be adjusted if necessary
			//		while bubbling up, check each todoLi for root status.
			//		event listener on body could trigger selectAll adjustment
			
			if (anySelectedTodos(todo.children)) {
				// 'Unselect children' clicked
				markFilteredInTodosSelected(todo.children, false);
				if (!todo.selectMode) {
					// Root button clicked, remove selectMode flag so normal buttons are restored
					markFilteredInTodosSelectMode(todo.children, false);
				}
			} else {
				// 'Select children' clicked
				markFilteredInTodosSelected(todo.children, true);
				if (!todo.selectMode) {
					// Root button clicked, set selectMode flag so normal buttons are disabled 
					markFilteredInTodosSelectMode(todo.children, true);
				}
			}
			renderTodolist();
				
//			altSelectChildren(todoLi);
//			togglePurgeSelectedDeletedTodos();
		}
		if (event.target.name === "completeSelectedChildren") {
//			completeSelectedChildren(todoLi);
			if (allSelectedTodosCompleted(todo.children)) {
				// 'Uncomplete selected children' clicked
				setSelectedTodosStage(todo.children, 'active');
			} else {
				// 'Complete selected children' clicked
				setSelectedTodosStage(todo.children, 'completed');
			}
			renderTodolist();
		}
		if (event.target.name === "deleteSelectedChildren") {
//			deleteSelectedChildren(todoLi);
			if (allSelectedTodosDeleted(todo.children)) {
				// 'Undelete selected children' clicked
				markSelectedTodosDeleted(todo.children, false);
			} else {
				// 'Delete selected children' clicked
				markSelectedTodosDeleted(todo.children, true);
			}
			renderTodolist();
//			togglePurgeSelectedDeletedTodos();
		}
	}
}

function actionsClickHandler(event) {
	if (event.target.nodeName === "BUTTON") {		// TODO is this conditional needed?
		var todosUl = todolist.children[0];
		// handle case (just for tests?) where todosUl is not defined
		var todoLiCount = 0;
		if (todosUl) {
			todoLiCount = todosUl.children.length;	
		}

		if (event.target.name === "showActive") {
//			var showActiveButton = event.target;
			if (showActiveButton.textContent === '√ Active') {
				showActiveButton.textContent = 'Active';
				addTodoButton.classList.add('inactive');	// disallow new todos when actives are hidden
//				setTodoLiClass(todosUl, 'active-removed', 'add');
				// if no todoLis are displayed, set selectAllButton inactive
//				if (selectAllButton.textContent === 'Select all'); {
//					if (!todoLiDisplayed(todos)) {
//						selectAllButton.classList.add('inactive');
//					}
//					toggleDisplayDependentTodoLiButtons();
//				}

			} else {
				showActiveButton.textContent = '√ Active';
				addTodoButton.classList.remove('inactive');
//				setTodoLiClass(todosUl, 'active-removed', 'remove');
//				if (selectAllButton.textContent === 'Select all') {
//					if (todoLiDisplayed(todos)) {
//						selectAllButton.classList.remove('inactive');
//					}
//					toggleDisplayDependentTodoLiButtons();
//				}
			}
			renderTodolist();
		}
		if (event.target.name === "showCompleted") {
//			var showCompletedButton = event.target;
			if (showCompletedButton.textContent === '√ Completed') {
				showCompletedButton.textContent = 'Completed';
//				setTodoLiClass(todosUl, 'completed-removed', 'add');
				// if no todoLis are displayed, set selectAllButton inactive
//				if (selectAllButton.textContent === 'Select all'); {
//					if (!todoLiDisplayed(todos)) {
//						selectAllButton.classList.add('inactive');
//					}
//					toggleDisplayDependentTodoLiButtons();
//				}

			} else {
				showCompletedButton.textContent = '√ Completed';
//				setTodoLiClass(todosUl, 'completed-removed', 'remove');
//				if (selectAllButton.textContent === 'Select all') {
//					if (todoLiDisplayed(todos)) {
//						selectAllButton.classList.remove('inactive');
//					}
//					toggleDisplayDependentTodoLiButtons();
//				}
			}
			renderTodolist();
		}
		if (event.target.name === "showDeleted") {
//			var showDeletedButton = event.target;
			if (showDeletedButton.textContent === '√ Deleted') {
				showDeletedButton.textContent = 'Deleted';
//				setTodoLiClass(todosUl, 'deleted-removed', 'add');
				// if no todoLis are displayed, set selectAllButton inactive
//				if (selectAllButton.textContent === 'Select all'); {
//					if (!todoLiDisplayed(todos)) {
//						selectAllButton.classList.add('inactive');
//					}
//					toggleDisplayDependentTodoLiButtons();
//				}
			} else {
				showDeletedButton.textContent = '√ Deleted';
//				setTodoLiClass(todosUl, 'deleted-removed', 'remove');	// 'remove' not needed except for documentation
//				if (selectAllButton.textContent === 'Select all') {
//					if (todoLiDisplayed(todos)) {
//						selectAllButton.classList.remove('inactive');
//					}
//					toggleDisplayDependentTodoLiButtons();
//				}
			}
			renderTodolist();
			togglePurgeSelectedDeletedTodos();
		}
		if (event.target.name === "selectAll") {
			if (selectAllButton.textContent === 'Select all') {
				markSelectedAndSelectModeForFilteredInTodos(todos, true);	
			} else {
				markSelectedAndSelectModeForFilteredInTodos(todos, false);	
		
			}
			renderTodolist();
		}
/*			// These two variable definitions are needed because the global variables are hidden by
			// local variables created for some reason when the button is clicked.
			// One hypothesis that it has to do with display: none on these two elements doesn't seem
			// to be the reason. TODO Figure out why.
			var completeSelectedButton = document.getElementsByName('completeSelected')[0];
			var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
			var todosUl = todolist.children[0];
			if (selectAllButton.textContent === 'Select all') {
				selectAllButton.textContent = 'Unselect all';
				completeSelectedButton.classList.remove('inactive');
				deleteSelectedButton.classList.remove('inactive');
				addTodoButton.classList.add('inactive');
				var todosUncompletedCount = 0;
				var todosUndeletedCount = 0;
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					if (todoLi.classList.length === 0) {	// true when todoLi is not hidden
						var todoLiSelectButton = todoLi.children.namedItem('select');
						var todoLiCompleteButton = todoLi.children.namedItem('complete');
						var todoLiDeleteButton = todoLi.children.namedItem('delete');
						var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
						var todoLiAddChildButton = todoLi.children.namedItem('addChild');
//						var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
						todoLiSelectButton.textContent = 'Unselect';
						todoLiSelectButton.classList.remove('inactive');
						todoLiCompleteButton.classList.add('inactive');
						todoLiDeleteButton.classList.add('inactive');
						todoLiAddSiblingButton.classList.add('inactive');
						todoLiAddChildButton.classList.add('inactive');
//						todoLiUndoEditButton.classList.add('inactive');
						var todoLiEntry = todoLi.querySelector('p');
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
					selectAllChildren(todoLi);		// recursively select displayed nested todos	
				}
			} else {
//				unselectAll();	// TODO performs same function as code below...
				selectAllButton.textContent = 'Select all';
				completeSelectedButton.classList.add('inactive');
				deleteSelectedButton.classList.add('inactive');
				addTodoButton.classList.remove('inactive');
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children.namedItem('select');
					var todoLiCompleteButton = todoLi.children.namedItem('complete');
					var todoLiDeleteButton = todoLi.children.namedItem('delete');
					var todoLiAddSiblingButton = todoLi.children.namedItem('addSibling');
					var todoLiAddChildButton = todoLi.children.namedItem('addChild');
//					var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
					todoLiSelectButton.textContent = 'Select';
					todoLiSelectButton.classList.add('inactive');
					todoLiCompleteButton.classList.remove('inactive');
					todoLiDeleteButton.classList.remove('inactive');
					todoLiAddSiblingButton.classList.remove('inactive');
					todoLiAddChildButton.classList.remove('inactive');
//					todoLiUndoEditButton.classList.remove('inactive');
					var todoLiEntry = todoLi.querySelector('p');
					todoLiEntry.classList.remove('highlighted');
					var todo = findTodo(todos, todoLi.id)
					todo.selected = false;
					unselectAllChildren(todoLi);
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
					// Re-create 
					document.getElementById('todolist').innerHTML = '';
					todolist.appendChild(createTodosUl(todos, 'selected'));
				}
			}
			togglePurgeSelectedDeletedTodos();
		}
*/
		if (event.target.name === 'completeSelected') {
			if (completeSelectedButton.textContent === 'Complete selected') {
				setSelectedTodosStage(todos, 'completed');
			} else {
				setSelectedTodosStage(todos, 'active');
		
			}
			renderTodolist();
		}
/*
			var completeSelectedButton = event.target;
			var todosUl = todolist.children[0];
			if (completeSelectedButton.textContent === 'Uncomplete selected') {
				completeSelectedButton.textContent = 'Complete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children.namedItem('select');
					var todoLiCompleteButton = todoLi.children.namedItem('complete');
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiCompleteButton.textContent = 'Complete';
						var todoLiEntry = todoLi.querySelector('p');
						todoLiEntry.classList.remove('struck-completed');
						var todo = findTodo(todos, todoLi.id);
						todo.markCompleted(false);
						if (showActiveButton.textContent === 'Active') {
							todoLi.classList.add('active-removed');
						}
					}
					completeSelectedChildren(todoLi);
				}
			} else {
				completeSelectedButton.textContent = 'Uncomplete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children.namedItem('select');
					var todoLiCompleteButton = todoLi.children.namedItem('complete');
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiCompleteButton.textContent = 'Uncomplete';
						var todoLiEntry = todoLi.querySelector('p');
						todoLiEntry.classList.add('struck-completed');
						var todo = findTodo(todos, todoLi.id);
						todo.completed = true;
						if (showCompletedButton.textContent === 'Completed') {
							todoLi.classList.add('completed-removed');
						}
					}
					completeSelectedChildren(todoLi);
				}
			}
		}
*/
		if (event.target.name === 'deleteSelected') {
			if (deleteSelectedButton.textContent === 'Delete selected') {
				markSelectedTodosDeleted(todos, true);
			} else {
				markSelectedTodosDeleted(todos, false);
		
			}
			renderTodolist();
		}

/*			var deleteSelectedButton = event.target;
			var todosUl = todolist.children[0];
			if (deleteSelectedButton.textContent === 'Undelete selected') {
				deleteSelectedButton.textContent = 'Delete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children.namedItem('select');
					var todoLiDeleteButton = todoLi.children.namedItem('delete');
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiDeleteButton.textContent = 'Delete';
						var todo = findTodo(todos, todoLi.id);
						todo.deleted = false;
						var todoLiEntry = todoLi.querySelector('p');
						todoLiEntry.classList.remove('faded-deleted');
						todoLi.classList.remove('deleted-removed');
						if (showActiveButton.textContent === 'Active') {
							todoLi.classList.add('active-removed');
						}
					}
					deleteSelectedChildren(todoLi);
				}
			} else {
				deleteSelectedButton.textContent = 'Undelete selected';
				for (var i = 0; i < todosUl.children.length; i++) {
					var todoLi = todosUl.children[i];
					var todoLiSelectButton = todoLi.children.namedItem('select');
					var todoLiDeleteButton = todoLi.children.namedItem('delete');
					if (todoLiSelectButton.textContent === 'Unselect') {
						todoLiDeleteButton.textContent = 'Undelete';
						var todo = findTodo(todos, todoLi.id);
						todo.deleted = true;
						var todoLiEntry = todoLi.querySelector('p');
						todoLiEntry.classList.add('faded-deleted');
						if (showDeletedButton.textContent === 'Deleted') {
							todoLi.classList.add('deleted-removed');
						}
	
					}
					deleteSelectedChildren(todoLi);
				}
			}
			togglePurgeSelectedDeletedTodos();
		}
*/
		if (event.target.name === 'purgeSelectedDeleted') {
			purgeSelectedDeletedTodos(todos);
		}
		if (event.target.name === 'addTodo') {
			insertNewTodoLi(todos);
		}
	}
}

function setUpEventListeners() {
	todolist.addEventListener('focusout', editHandler);		// using focusout event instead of change event
	todolist.addEventListener('click', todoClickHandler);
	actionsBar.addEventListener('click', actionsClickHandler);
	todolist.addEventListener('input', inputHandler);
	todolist.addEventListener('keydown', keyDownHandler);
	todolist.addEventListener('keyup', keyUpHandler);
}

function setActionsBarDefaults() {
	selectAllButton.textContent = 'Select all';
	selectAllButton.disabled = false;
	completeSelectedButton.textContent = 'Complete selected';
	completeSelectedButton.disabled = true;
	deleteSelectedButton.textContent = 'Delete selected';
	deleteSelectedButton.disabled = true;
	purgeSelectedDeletedButton.disabled = true;
	showActiveButton.textContent = '√ Active';
	showCompletedButton.textContent = '√ Completed';
	showDeletedButton.textContent = 'Deleted';
	addTodoButton.disabled = false;	
}

function startApp() {
	renderTodolist();
/*	// Start app with a new empty todo if the todolist is empty
//	setActionsBarDefaults();
	if (todos.length === 0) {
		insertNewTodoLi(todos);
	} else {						// 'else' because insertNewTodoLi already calls renderTodolist
		renderTodolist();
	} */
}

setUpEventListeners();
