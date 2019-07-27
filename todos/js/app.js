// Beasts 8. Nested todos

var todos = [];

function addNewTodo(todo) {
	todos.push(todo);
};

function Todo(entry) {
	this.id = 'id1';
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

Todo.prototype.update = function(changedEntry) {
	this.entry = changedEntry;
}

Todo.prototype.select = function() {
	this.selected = true;
}

Todo.prototype.complete = function() {
	this.completed = true;
}

Todo.prototype.delete = function() {
	this.deleted = true;
}
