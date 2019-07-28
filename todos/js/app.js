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

function insertTodo(array, todoInPlace, todoToInsert) {
	var position = array.indexOf(todoInPlace) + 1;
	array.splice(position, 0, todoToInsert);
}

function deleteTodo(array, todo) {
	var position = array.indexOf(todo);
	array.splice(position, 1);
}
