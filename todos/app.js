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
	this.stage = 'active';							// stages are active, completed, canceled
	
	this.selected = false;
	this.selectMode = false;

//	this.mode = "entry";							// modes are entry and selection

	this.filteredIn = true;							// new todo is filtered in for display on creation 
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

Todo.prototype.markDeleted = function(bool) {
	this.deleted = bool;
}
Todo.prototype.setStage = function(stage) {
	if (todoStages.has(stage)) {					// TODO throw error if not an allowed value?
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

function applyDisplayTags(filterSet) {				// TODO Combine these into one function to avoid two recursions

	function markFilteredInTodos(todosArray) {
		for (var i = 0; i < todosArray.length; i++) {
			var todo = todosArray[i];
			if (todo.children.length > 0) {
				markFilteredInTodos(todo.children);
			}
			todo.markFilteredIn(filterSet);
			if (todo.selected) {
				todo.filteredIn = true;
			}
		}
	}

	function markFilteredOutParentsOfFilteredInTodos(todosArray) {
		for (var i = 0; i < todosArray.length; i++) {
			var todo = todosArray[i];
			if (todo.children.length > 0) {
				markFilteredOutParentsOfFilteredInTodos(todo.children);
			}
			todo.markFilteredOutParentOfFilteredIn();
			if (todo.filteredOutParentOfFilteredIn) {
				todo.collapsed = false;			// ensure that filtered-in children are visible
			}
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
			todo.selected = false;				// excludes filtered-out todos
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
		if (todo.selected) {
		todo.deleted = bool;
		}
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
}

// Remove selectMode from todos under select-mode-root if all are unselected
function leaveSelectModeIfNoneSelected(todo) {
	var startingLevel = todos;
	var selectModeRoot = findSelectModeRoot(todo)
	if (!selectModeRoot) {
		// selectAll is the controlling root
		var startingLevel = todos;
	} else {
		startingLevel = selectModeRoot.children;
	}
	if (!anySelectedTodos(startingLevel)) {
		markTodosSelectMode(startingLevel, false);
	}
}

/************************************ Data storage ***************************************/

// localStorage has a quirk: undefined can be a key.

function writeFiltersToStorage() {

}

var storageKey = undefined;		// Key will be passed in by startApp(key)

// Write serialized todos to the specified key in localStorage
function writeTodosToStorage(key) {
	localStorage.setItem(key, JSON.stringify(todos));
}

// Restore todos or sets todos = [] if none were stored at key.
function restoreTodosFromLocalStorage(key) {

	function restoreInPlace(dataArray) {
		for (var i = 0; i < dataArray.length; i++) {
			var todo = dataArray[i];
			restoredTodo = new RestoredTodo(todo);
			dataArray[i] = restoredTodo;
		
			if (todo.children.length > 0) {
				restoreInPlace(todo.children);
			}
		}
	}
	
	var savedData = JSON.parse(localStorage.getItem(key));
	if (savedData) {
		restoreInPlace(savedData);
		todos = savedData;
	} else {
		todos = [];
	}
}

// Constructor to put saved todo data back into a 'real' todo object i.e. one with methods.
function RestoredTodo(savedTodo) {
	this.entry = savedTodo.entry;
	this.children = savedTodo.children;
	this.collapsed = savedTodo.collapsed;
	this.deleted = savedTodo.deleted;
	this.stage = savedTodo.stage;
	
	this.selected = savedTodo.selected;
	this.selectMode = savedTodo.selectMode;

	this.filteredIn = savedTodo.filteredIn;
	this.filteredOutParentOfFilteredIn = savedTodo.filteredOutParentOfFilteredIn;
    this.id = savedTodo.id;
}

RestoredTodo.prototype.changeId = function() {
	this.id = Math.random().toString(36).slice(2);
}

// TODO These setters are not used consistently in the code -- do I need them? What's the point?

RestoredTodo.prototype.update = function(changedEntry) {
	this.entry = changedEntry;
}

RestoredTodo.prototype.markSelected = function(bool) {
	this.selected = bool;
}

RestoredTodo.prototype.markSelectMode = function(bool) {
	this.selectMode = bool;
}

RestoredTodo.prototype.markDeleted = function(bool) {
	this.deleted = bool;
}
RestoredTodo.prototype.setStage = function(stage) {
	if (todoStages.has(stage)) {		// TODO throw error if not an allowed value?
		this.stage = stage;
	}
}
RestoredTodo.prototype.addChild = function(child) {
	this.children.push(child);
}
RestoredTodo.prototype.markCollapsed = function(bool) {
	this.collapsed = bool;
}
RestoredTodo.prototype.markFilteredIn = function(filterSet) {
	this.filteredIn = false;
	var stageTag = '#' + this.stage;
	if (filterSet.has(stageTag)) {
		this.filteredIn = true;	
		if (this.deleted && !filterSet.has('#deleted')) {
			this.filteredIn = false;
		}
	}
}
RestoredTodo.prototype.markFilteredOutParentOfFilteredIn = function() {
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

// Return the ancestor of todo that is its select-mode root or return undefined
function findSelectModeRoot(todo) {
	var candidate = findParent(todo);

	if (candidate === undefined || candidate.selectMode === false) {
		return candidate;
	} else /* selectMode === true */ {
		candidate = findSelectModeRoot(candidate);	
		if (candidate) {
			return candidate;
		}
	}
	return undefined;
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

// Return true if any filtered-in todos at root level of array are in select mode
function anyFilteredInRootTodosInSelectMode(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selectMode && todo.filteredIn) {
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
			if (anyFilteredInTodos(todo.children)) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any filtered-in todos, including nested todos, are in select mode
function anyFilteredInTodosInSelectMode(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.filteredIn && todo.selectMode) {
			return true;
		}
		if (todo.children.length > 0) {
			if (anyFilteredInTodosInSelectMode(todo.children)) {
				return true;
			}
		}
	}
	return false;
}

// Return true if all filtered-in todos, including nested todos, are in select mode
function allFilteredInTodosInSelectMode(array) {
	var selectModeCount = 0;
	var filteredInCount = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selectMode) {
				selectModeCount++;
			}
			if (todo.filteredIn) {
				filteredInCount++;
			} 

			if (todo.children.length > 0) {
				runTest(todo.children);
			}
		}
	}

	runTest(array);

	if (filteredInCount > 0 && filteredInCount === selectModeCount) {
		return true;
	} else {
		return false;
	}
}

// Return true if any todos, including nested todos, are both selected and filtered in for display
function anySelectedFilteredInTodos(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.selected && todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			if (anySelectedFilteredInTodos(todo.children)) {
				return true;
			}
		}
	}
	return false;
}

// Return true if any filtered-in todos, including nested todos, are both completed and selected
function anySelectedFilteredInTodosCompleted(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.stage === 'completed' && todo.selected && todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelectedCompleted = anySelectedFilteredInCompletedTodos(todo.children);
			if (todoSelectedCompleted) {
				return true;
			} 
		}
	}
}

// Return true if any filtered-in todos, including nested todos, are both deleted and selected
function anySelectedFilteredInTodosDeleted(array) {
	for (var i = 0; i < array.length; i++) {
		var todo = array[i];
		if (todo.deleted && todo.selected && todo.filteredIn) {
			return true;
		}
		if (todo.children.length > 0) {
			var todoSelectedDeleted = anySelectedFilteredInTodosDeleted(todo.children);
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

// Return true if all selected filtered-in todos, including nested todos, are completed
function allSelectedFilteredInTodosCompleted(array) {
	var selected = 0;
	var andCompleted = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selected && todo.filteredIn) {
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

// Return true if all selected filtered-in todos, including nested todos, are deleted
function allSelectedFilteredInTodosDeleted(array) {
	var selected = 0;
	var andDeleted = 0;

	function runTest(array) {
		for (var i = 0; i < array.length; i++) {
			var todo = array[i];
			if (todo.selected && todo.filteredIn) {
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
	
	// TODO check for filtered-in todos or rely on selection handlers to only operate on filtered-in todos?
	
	// Get conditionals for updating buttons
	var filteredInTodos = anyFilteredInTodos(todos);
	var filteredInRootTodosInSelectMode = anyFilteredInRootTodosInSelectMode(todos);
	var allSelectedFilteredInCompleted = allSelectedFilteredInTodosCompleted(todos);
	var allSelectedFilteredInDeleted = allSelectedFilteredInTodosDeleted(todos);
	var selectedFilteredInTodosDeleted = anySelectedFilteredInTodosDeleted(todos);

	if (filteredInTodos) {
		selectAllButton.disabled = false;
	} else {
		selectAllButton.disabled = true;
//		selectAllButton.textContent = 'Select all';
		completeSelectedButton.disabled = true;
//		completeSelectedButton.textContent = 'Complete selected';
		deleteSelectedButton.disabled = true;
//		deleteSelectedButton.textContent = 'Delete selected';
		purgeSelectedDeletedButton.disabled = true;
	}

	if (filteredInRootTodosInSelectMode) {
		selectAllButton.textContent = 'Unselect all';
		completeSelectedButton.disabled = false;
		deleteSelectedButton.disabled = false;
	} else {
		selectAllButton.textContent = 'Select all';
		completeSelectedButton.disabled = true;
		deleteSelectedButton.disabled = true;
	}

	if (filteredInRootTodosInSelectMode && allSelectedFilteredInCompleted) {
		completeSelectedButton.textContent = 'Uncomplete selected';	
	} else {
		completeSelectedButton.textContent = 'Complete selected';	
	}

	if (filteredInRootTodosInSelectMode && allSelectedFilteredInDeleted) {
		deleteSelectedButton.textContent = 'Undelete selected';	
	} else {
		deleteSelectedButton.textContent = 'Delete selected';	
	}

	if (selectedFilteredInTodosDeleted) {
		purgeSelectedDeletedButton.disabled = false;	
	} else {
		purgeSelectedDeletedButton.disabled = true;	
	}

	if (showActiveButton.textContent === 'Active' || filteredInRootTodosInSelectMode) {
		addTodoButton.disabled = true;	
	} else {
		addTodoButton.disabled = false;	
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

/*	if (todo.children.length > 0) {		

		var selectModeRoot = !todo.selectMode && allFilteredInTodosInSelectMode(todo.children);
		var rootAncestor = !todo.selectMode && !allFilteredInTodosInSelectMode(todo.children) && anyFilteredInTodosInSelectMode(todo.children);
		var rootDescendant = todo.selectMode && allFilteredInTodosInSelectMode(todo.children);
		// potentialRoot = !todo.selectMode && !anyFilteredInTodosInSelectMode(todo.children);

		var anyInSelectMode = anyFilteredInTodosInSelectMode(todo.children);

		var showChildrenButton = document.createElement('button');
		showChildrenButton.name = 'showChildren';
		showChildrenButton.type = 'button';

		if (todo.collapsed) {
			showChildrenButton.textContent = 'Show children';
		} else {
			showChildrenButton.textContent = 'Hide children';
		}
		if (selectModeRoot || rootAncestor) {
			showChildrenButton.disabled = true;
		}
		todoLi.appendChild(showChildrenButton);
		
	} */
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

	if (showActiveButton.textContent === 'Active') {
		addSiblingButton.disabled = true;
		addChildButton.disabled = true;
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
	
	// Some terminology to guide decisions on how to create selection-related buttons
	//
	//    A select-mode-root todo is the one on which a controlling 'Select children' button was clicked.
	//       todo.selectMode === false && allFilteredInTodosInSelectMode(todo.children) === true
	//
	//    A select-mode-root-ancestor is higher in the tree.
	//       todo.selectMode === false && allFilteredInTodosInSelectMode(todo.children) === false &&
	//       anyFilteredInTodosInSelectMode(todo.children === true
	//
	//    A select-mode-root-descendant is lower in the tree.
	//       todo.selectMode === true && allFilteredInTodosInSelectMode(todo.children) === true
	//
	//    A potential-select-mode-root todo is a candidate to receive a controlling 'Select children' click.
	//       todo.selectMode === false && anyFilteredInTodosInSelectMode(todo.children) === false
	
	// Only create last four buttons if there are children
	
	if (todo.children.length > 0 && anyFilteredInTodos(todo.children)) {		

		var selectModeRoot = !todo.selectMode && allFilteredInTodosInSelectMode(todo.children);
		var rootAncestor = !todo.selectMode && !allFilteredInTodosInSelectMode(todo.children) && anyFilteredInTodosInSelectMode(todo.children);
		var rootDescendant = todo.selectMode && allFilteredInTodosInSelectMode(todo.children);
		// potentialRoot = !todo.selectMode && !anyFilteredInTodosInSelectMode(todo.children);

		var anyInSelectMode = anyFilteredInTodosInSelectMode(todo.children);

		var showChildrenButton = document.createElement('button');
		showChildrenButton.name = 'showChildren';
		showChildrenButton.type = 'button';

		if (todo.collapsed) {
			showChildrenButton.textContent = 'Show children';
		} else {
			showChildrenButton.textContent = 'Hide children';
		}
		if (selectModeRoot || rootAncestor) {
			showChildrenButton.disabled = true;
		}
		todoLi.appendChild(showChildrenButton);
		
		// Only create last three buttons if there are children showing

		if (!todo.collapsed) {

			var anySelected = anySelectedFilteredInTodos(todo.children);

			var selectChildrenButton = document.createElement('button');
			selectChildrenButton.name = 'selectChildren';
			selectChildrenButton.type = 'button';
			selectChildrenButton.disabled = false;

			if (anySelected) {
				if (selectModeRoot || rootDescendant) {
					selectChildrenButton.textContent = 'Unselect children';
				} else /* rootAncestor */ {
					selectChildrenButton.textContent = 'Select children';
				}
			}
			else /* none selected */ {
				selectChildrenButton.textContent = 'Select children';
			}
			todoLi.appendChild(selectChildrenButton);

			// Only create last two buttons for a select-mode-root todoLi with todos selected
			if (selectModeRoot && anySelected) {
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
	writeTodosToStorage(storageKey);
	renderTodolist();
	newTodoLi = document.getElementById(newTodo.id);
	newTodoLi.querySelector('p').focus();
}

// Append a new todoLi in a child todosUl under a given todoLi, ready for text entry.
function appendNewChildTodoLi(todo) {
	todo.markCollapsed(false);
	var newChild = new Todo();
	insertTodo(todo.children, newChild);
	writeTodosToStorage(storageKey);
	renderTodolist();
	newChildLi= document.getElementById(newChild.id);
	newChildLi.querySelector('p').focus();
}

// Handle undoEdit button click or 'esc' key shortcut
function undoEntryEdit(todo, todoLi) {
	var todoLiEntry = todoLi.querySelector('p');
	var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
	
	todo.entry = originalEntry;
	todoLiEntry.textContent = originalEntry;
	todoLiUndoEditButton.disabled = true;
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
				if (todo.selectMode === false && showActiveButton.textContent === '√ Active') {
					appendNewChildTodoLi(todo)			// Shift-return appends a new child todo
				}
			} else {
				if (todo.selectMode === false && showActiveButton.textContent === '√ Active') {
					insertNewTodoLi(todoArray, todo);	// Return inserts a new sibling todo
				}
			}
		} else if (event.key === "Escape") {
			var todoLiUndoEditButton = todoLi.children.namedItem('undoEdit');
			if (todoLiUndoEditButton.disabled === false) /* prevent restoring the wrong entry */ {
				undoEntryEdit(todo, todoLi);
				todoLiEntry.blur();		// Blur to match result of clicking undoEdit button
			}
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
	var todoLi = event.target.parentElement;
	var todo = findTodo(todos, todoLi.id)
	var todoArray = findArray(todos, todoLi.id);	// todos or a todo.children array

	if (event.target.name === "select") {
		todo.selected = !todo.selected;
		if (!todo.selected) {						// 'Unselect' clicked
			leaveSelectModeIfNoneSelected(todo);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "complete") {
		if (todo.stage === 'completed') {
			todo.stage = 'active';
		} else {
			todo.stage = 'completed';
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "delete") {
		todo.deleted = !todo.deleted;
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "addSibling") {
		insertNewTodoLi(todoArray, todo)		// todoArray and todo are set above by clickHandler

	} else if (event.target.name === "addChild") {
		appendNewChildTodoLi(todo)

	} else if (event.target.name === "undoEdit") {
		undoEntryEdit(todo, todoLi);

	} else if (event.target.name === "showChildren") {
		todo.collapsed = !todo.collapsed;
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "selectChildren") {
		if (anySelectedTodos(todo.children)) {
			// 'Unselect children' clicked
			markFilteredInTodosSelected(todo.children, false);	// TODO figure out marking filteredIn vs all
			if (!todo.selectMode) {
				// Root button clicked, remove selectMode flag so normal buttons are restored
				markFilteredInTodosSelectMode(todo.children, false);
			} else /* root-descendant button clicked */ {
				leaveSelectModeIfNoneSelected(todo);
			}
		} else {
			// 'Select children' clicked
			markFilteredInTodosSelected(todo.children, true);
			if (!todo.selectMode) {
				// Root button clicked, set selectMode flag so normal buttons are disabled 
				markFilteredInTodosSelectMode(todo.children, true);
			}
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "completeSelectedChildren") {
		if (allSelectedTodosCompleted(todo.children)) {
			// 'Uncomplete selected children' clicked
			setSelectedTodosStage(todo.children, 'active');
		} else {
			// 'Complete selected children' clicked
			setSelectedTodosStage(todo.children, 'completed');
		}
		writeTodosToStorage(storageKey);
		renderTodolist();

	} else if (event.target.name === "deleteSelectedChildren") {
		if (allSelectedTodosDeleted(todo.children)) {
			// 'Undelete selected children' clicked
			markSelectedTodosDeleted(todo.children, false);
		} else {
			// 'Delete selected children' clicked
			markSelectedTodosDeleted(todo.children, true);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	}
}

function actionsClickHandler(event) {

	if (event.target.name === "showActive") {
		if (showActiveButton.textContent === '√ Active') {
			showActiveButton.textContent = 'Active';
		} else {
			showActiveButton.textContent = '√ Active';
		}
		writeFiltersToStorage();
		renderTodolist();
	} else if (event.target.name === "showCompleted") {
		if (showCompletedButton.textContent === '√ Completed') {
			showCompletedButton.textContent = 'Completed';
		} else {
			showCompletedButton.textContent = '√ Completed';
		}
		writeFiltersToStorage();
		renderTodolist();
	} else if (event.target.name === "showDeleted") {
		if (showDeletedButton.textContent === '√ Deleted') {
			showDeletedButton.textContent = 'Deleted';
		} else {
			showDeletedButton.textContent = '√ Deleted';
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === "selectAll") {
		if (selectAllButton.textContent === 'Select all') {
			markSelectedAndSelectModeForFilteredInTodos(todos, true);	
		} else {
			markSelectedAndSelectModeForFilteredInTodos(todos, false);	
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'completeSelected') {
		if (completeSelectedButton.textContent === 'Complete selected') {
			setSelectedTodosStage(todos, 'completed');
		} else {
			setSelectedTodosStage(todos, 'active');
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'deleteSelected') {
		if (deleteSelectedButton.textContent === 'Delete selected') {
			markSelectedTodosDeleted(todos, true);
		} else {
			markSelectedTodosDeleted(todos, false);
		}
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'purgeSelectedDeleted') {
		purgeSelectedDeletedTodos(todos);
		writeTodosToStorage(storageKey);
		renderTodolist();
	} else if (event.target.name === 'addTodo') {
		insertNewTodoLi(todos);
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

function startApp(key) {
	storageKey = key;										// Tell the app where to store data
	showActiveButton.textContent = '√ Active';
	showCompletedButton.textContent = '√ Completed';
	showDeletedButton.textContent = 'Deleted';

	restoreTodosFromLocalStorage(key);
	renderTodolist();
}

// Start app without loading todos from storage
function startTestApp() {
	showActiveButton.textContent = '√ Active';
	showCompletedButton.textContent = '√ Completed';
	showDeletedButton.textContent = 'Deleted';

	renderTodolist();
}

setUpEventListeners();
