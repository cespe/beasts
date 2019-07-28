// Beasts 8. Nested todos
// Will need to protect properties of todo object in a closure
// todo should be created with a Constructor

tests({
	"The app should have a 'todos' array for storing todos.": function() {
		var hasStorage = Array.isArray(todos);
		eq(hasStorage, true);
	},
	"Todo should return a new todo object.": function() {
		var newTodo = undefined;
		newTodo = new Todo();
		eq(typeof newTodo, "object");
	},
	"The app should have a way to add a todo object to the todos array.": function() {
		todos = [];
		newTodo = new Todo();
		addNewTodo(newTodo);
		eq(todos[0], newTodo);
	},
	"A todo object should be created with an 'id' property of type string to store an identifier.": function() {
		//todos = [];
		newTodo = new Todo();
		//addNewTodo(newTodo);
		eq(typeof newTodo.id, "string");
	},
	"The todos array and children arrays should enforce unique ids when todos are added.": function() {
		fail();

	},
	"Todo should take an entry of type string and store it in the todo object 'entry' property.": function() {
//		todos = [];
		newTodo = new Todo('Item 1');
		eq(newTodo.entry, 'Item 1');
//		addNewTodo(newTodo);
//		eq(todos[0].entry, 'Item 1');
	},
	"If 'entry' argument is not a string or is missing, Todo should set todo entry property to an empty string.": function() {
//		todos = [];
		newTodo = new Todo();
		eq(newTodo.entry, '');
//		addNewTodo(newTodo);
//		eq(todos[0].entry, '');
//		secondTodo = new Todo([]);
//		addNewTodo(secondTodo);
//		eq(todos[1].entry, '');
	},
	"A todo object should be created with a 'children' property of type array to store nested todo objects.": function() {
//		todos = [];
		newTodo = new Todo();
//		addNewTodo(newTodo);
//		childrenArray = newTodo.children;
		eq(Array.isArray(newTodo.children), true);
		eq(newTodo.children.length, 0);
	},
	"A todo object should be created with a 'selected' property of type boolean set to false.": function() {
//		todos = [];
		newTodo = new Todo();
//		addNewTodo(newTodo);
		eq(newTodo.selected, false);
	},
	"A todo object should be created with a 'deleted' property of type boolean set to false.": function() {
//		todos = [];
		newTodo = new Todo();
//		addNewTodo(newTodo);
		eq(newTodo.deleted, false);
	},
	"A todo object should be created with a 'completed' property of type boolean set to false.": function() {
//		todos = [];
		newTodo = new Todo();
//		addNewTodo(newTodo);
		eq(newTodo.completed, false);
	},
	"The app should have a way to update a todo entry.": function() {
//		todos = [];
		newTodo = new Todo('Item 1');
//		addNewTodo(newTodo);
		eq(newTodo.entry, 'Item 1');
		newTodo.update('Item 1 updated');
		eq(newTodo.entry, 'Item 1 updated');
//		eq(todos[0].entry, 'Item 1 updated');
	},
	"The app should have a way to mark a todo selected or not selected.": function() {
//		todos = [];
		newTodo = new Todo('Item 1');
//		addNewTodo(newTodo);
		eq(newTodo.selected, false);
		newTodo.markSelected(true);
		eq(newTodo.selected, true);
//		eq(todos[0].selected, true);
		newTodo.markSelected(false);
		eq(newTodo.selected, false);
//		eq(todos[0].selected, false);
	},
	"The app should have a way to mark a todo completed or not completed.": function() {
//		todos = [];
		newTodo = new Todo('Item 1');
//		addNewTodo(newTodo);
		eq(newTodo.completed, false);
		newTodo.markCompleted(true);
		eq(newTodo.completed, true);
//		eq(todos[0].completed, true);
		newTodo.markCompleted(false);
		eq(newTodo.completed, false);
//		eq(todos[0].completed, false);
	},
	"The app should have a way to mark a todo deleted or not deleted.": function() {
//		todos = [];
		newTodo = new Todo('Item 1');
//		addNewTodo(newTodo);
		eq(newTodo.deleted, false);
		newTodo.markDeleted(true);
		eq(newTodo.deleted, true);
//		eq(todos[0].deleted, true);
		newTodo.markDeleted(false);
		eq(newTodo.deleted, false);
//		eq(todos[0].deleted, false);
	},
	"The app should have a way to add a child todo to a parent todo.": function() {
//		todos = []
		newTodo = new Todo('Item 1');
//		addNewTodo(newTodo);
		eq(newTodo.children.length, 0);
		childTodo = new Todo('Item 1 child 1');
		newTodo.addChild(childTodo);
		eq(newTodo.children.length, 1);
		eq(newTodo.children[0], childTodo);
	},
	"The app should have a way to insert a new todo after any todo in the array it is in.": function() {
		todos = []
		var todo1 = new Todo('Item 1');
		addNewTodo(todo1);
		eq(todos[0], todo1);
		var todo2 = new Todo('Item 2');
		addNewTodo(todo2);
		eq(todos[1], todo2);
		var todo3 = new Todo('Item 3');
		addNewTodo(todo3);
		eq(todos[2], todo3);
		var todo4 = new Todo('Item 4 inserted after Item 1');
		insertTodo(todos, todo1, todo4);
		eq(todos[0], todo1);
		eq(todos[1], todo4);
		eq(todos[2], todo2);
		eq(todos[3], todo3);

		var child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		eq(todo1.children[0], child1);
		var child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		eq(todo1.children[1], child2);
		var child3 = new Todo('Item 1 child 3 inserted after child 1');
		insertTodo(todo1.children, child1, child3);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child3);
		eq(todo1.children[2], child2);

	},
	"The app should have a way to delete a todo from the array it is in.": function() {
		todos = []
		var todo1 = new Todo('Item 1');
		addNewTodo(todo1);
		eq(todos[0], todo1);
		var todo2 = new Todo('Item 2');
		addNewTodo(todo2);
		eq(todos[1], todo2);
		var todo3 = new Todo('Item 3');
		addNewTodo(todo3);
		eq(todos[2], todo3);
		deleteTodo(todos, todo2);
		eq(todos[0], todo1);
		eq(todos[1], todo3);

		var child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		eq(todo1.children[0], child1);
		var child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		eq(todo1.children[1], child2);
		var child3 = new Todo('Item 1 child 3');
		todo1.addChild(child3);
		eq(todo1.children[2], child3);
		deleteTodo(todo1.children, child2);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child3);

	},
	"The app should display todos.": function() {
		fail();
	}
});
