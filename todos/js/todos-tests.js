// Beasts 8. Nested todos
// Will need to protect properties of todo object in a closure
// todo should be created with a Constructor

tests({
	"The app should have a 'todos' array for storing todos.": function() {
		var hasStorage = Array.isArray(todos);
		eq(hasStorage, true);
	},
	"Todo should return a new todo object.": function() {
		var newTodo = new Todo();
		eq(typeof newTodo, "object");
	},
	"The app should have a way to add a todo object to the todos array.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0], newTodo);
	},
	"A todo object should be created with an 'id' property of type string to store an identifier.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0].id, 'id1');
	},
	"A todo id should be a unique value of type string.": function() {
		fail();
	},
	"Todo should take an entry of type string and store it in the todo object 'entry' property.": function() {
		todos = [];
		newTodo = new Todo('Item 1');
		addNewTodo(newTodo);
		eq(todos[0].entry, 'Item 1');
	},
	"If 'entry' argument is not a string or is missing, Todo should set todo entry property to an empty string.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0].entry, '');
		secondTodo = new Todo([]);
		addNewTodo(secondTodo);
		eq(todos[1].entry, '');
	},
	"A todo object should be created with a 'children' property of type array to store nested todo objects.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		childrenArray = todos[0].children;
		eq(Array.isArray(childrenArray), true);
		eq(childrenArray.length, 0);
	},
	"A todo object should be created with a 'selected' property of type boolean set to false.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0].selected, false);
	},
	"A todo object should be created with a 'deleted' property of type boolean set to false.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0].deleted, false);
	},
	"A todo object should be created with a 'completed' property of type boolean set to false.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0].completed, false);
	},
	"The app should have a way to update a todo entry.": function() {
		todos = [];
		newTodo = new Todo('Item 1');
		addNewTodo(newTodo);
		eq(todos[0].entry, 'Item 1');
		newTodo.update('Item 1 updated');
		eq(newTodo.entry, 'Item 1 updated');
		eq(todos[0].entry, 'Item 1 updated');
	},
	"The app should have a way to mark a todo selected.": function() {
		todos = [];
		newTodo = new Todo('Item 1');
		addNewTodo(newTodo);
		eq(todos[0].selected, false);
		newTodo.select();
		eq(newTodo.selected, true);
		eq(todos[0].selected, true);
	},
	"The app should have a way to mark a todo completed.": function() {
		todos = [];
		newTodo = new Todo('Item 1');
		addNewTodo(newTodo);
		eq(todos[0].completed, false);
		newTodo.complete();
		eq(newTodo.completed, true);
		eq(todos[0].completed, true);
	},
	"The app should have a way to mark a todo deleted.": function() {
		todos = [];
		newTodo = new Todo('Item 1');
		addNewTodo(newTodo);
		eq(todos[0].deleted, false);
		newTodo.delete();
		eq(newTodo.deleted, true);
		eq(todos[0].deleted, true);
	},
	"The app should display todos.": function() {
		fail();
	}
});
