// Beasts 8. Nested todos
// Protect properties of todo object in a closure?
// todo should be created with a Constructor?
// resolve addTodo vs insertTodo
// resolve todo.addChild vs insertTodo or todo.insertChild

tests({
	"The app should have a 'todos' array for storing todos.": function() {
		var hasStorage = Array.isArray(todos);
		eq(hasStorage, true);
	},
	"Todo constructor should return a new todo object.": function() {
		var newTodo = undefined;
		newTodo = new Todo();
		eq(typeof newTodo, "object");
	},
	"The app should have a way to add a todo object to the todos array.": function() {
		todos = [];
		newTodo = new Todo();
		insertTodo(todos, newTodo);
		eq(todos[0], newTodo);
	},
	"A todo object should be created with an 'id' property of type string to store an identifier.": function() {
		newTodo = new Todo();
		eq(typeof newTodo.id, "string");
	},
	"Todo should take an entry of type string and store it in the todo object 'entry' property.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.entry, 'Item 1');
	},
	"If 'entry' argument is not a string or is missing, Todo should set todo entry property to an empty string.": function() {
		newTodo = new Todo();
		eq(newTodo.entry, '');
	},
	"A todo object should be created with a 'children' property of type array to store nested todo objects.": function() {
		newTodo = new Todo();
		eq(Array.isArray(newTodo.children), true);
		eq(newTodo.children.length, 0);
	},
	"A todo object should be created with a 'selected' property of type boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.selected, false);
	},
	"A todo object should be created with a 'deleted' property of type boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.deleted, false);
	},
	"A todo object should be created with a 'completed' property of type boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.completed, false);
	},
	"The app should have a way to update a todo entry.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.entry, 'Item 1');
		newTodo.update('Item 1 updated');
		eq(newTodo.entry, 'Item 1 updated');
	},
	"The app should have a way to mark a todo selected or not selected.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.selected, false);
		newTodo.markSelected(true);
		eq(newTodo.selected, true);
		newTodo.markSelected(false);
		eq(newTodo.selected, false);
	},
	"The app should have a way to mark a todo completed or not completed.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.completed, false);
		newTodo.markCompleted(true);
		eq(newTodo.completed, true);
		newTodo.markCompleted(false);
		eq(newTodo.completed, false);
	},
	"The app should have a way to mark a todo deleted or not deleted.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.deleted, false);
		newTodo.markDeleted(true);
		eq(newTodo.deleted, true);
		newTodo.markDeleted(false);
		eq(newTodo.deleted, false);
	},
	"The app should have a way to add a child todo to a parent todo.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.children.length, 0);
		childTodo = new Todo('Item 1 child 1');
		newTodo.addChild(childTodo);
		eq(newTodo.children.length, 1);
		eq(newTodo.children[0], childTodo);
	},
	"The app should have a way to return a todo when given its id.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);

		var result = findTodo(todos, todo2.id);
		eq(result, todo2);
		var result = findTodo(todos, child1.id);
		eq(result, child1);
		var result = findTodo(todos, child2.id);
		eq(result, child2);
		var result = findTodo(todos, grandchild1.id);
		eq(result, grandchild1);
	},
	"The app should have a way to insert a new todo after any todo in the array it is in.": function() {
		todos = []
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		eq(todos[0], todo1);
		var todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		eq(todos[1], todo2);
		var todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		eq(todos[2], todo3);
		var todo4 = new Todo('Item 4 inserted after Item 1');
		insertTodo(todos, todo4, todo1);
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
		insertTodo(todo1.children, child3, child1);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child3);
		eq(todo1.children[2], child2);

	},
	"If insertTodo is called without insertion point, it should push the new todo to end of array.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		eq(todos[0].entry, 'Item 1');
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		eq(todos[1].entry, 'Item 2');
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		eq(todos[2].entry, 'Item 3');
	},
	"The todos array and children arrays should enforce unique ids when todos are added.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		todo1.id = 'duplicate';
		insertTodo(todos, todo1);
		eq(todos[0].entry, 'Item 1');
		eq(todos[0].id, 'duplicate');
		var todo2 = new Todo('Item 2');
		todo2.id = 'duplicate';
		insertTodo(todos, todo2);
		eq(todos[0].id, 'duplicate');
		eq(todos[1].entry, 'Item 2');
		eq(todos[1].id !== 'duplicate', true);

		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('Item 1 child 1');
		child1.id = 'duplicate';
		todos[0].addChild(child1);
		eq(todos[0].children[0].entry, 'Item 1 child 1');
		eq(todos[0].children[0].id, 'duplicate');
		var child2 = new Todo('Item 1 child 2');
		child2.id = 'duplicate';
		insertTodo(todos[0].children, child2);
		eq(todos[0].children[0].id, 'duplicate');
		eq(todos[0].children[1].entry, 'Item 1 child 2');
		eq(todos[0].children[1].id !== 'duplicate', true);

	},
	"The app should have a way to delete a todo from the array it is in.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		eq(todos[0], todo1);
		var todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		eq(todos[1], todo2);
		var todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
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
	"The app should have a way to build an li element from a todo entry.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.textContent, 'Item 1');	

	},
	"Every todo li should have an id equal to todo.id.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.id, todo1.id);
	},
	"Every todo li should have a button to toggle 'Completed/Not Completed'": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[0].nodeName, 'BUTTON');
		eq(todoLi.children[0].name, 'completed');
	},
	"Every todo li should have a contentEditable paragraph element for its entry.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[1].nodeName, 'P');
		eq(todoLi.children[1].textContent, 'Item 1');
		eq(todoLi.children[1].contentEditable, 'true');
	},
	"The app should have a way to generate a ul element from an array of todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var result = initializeTodosUl(todos);

		eq(result.childElementCount, 2);
		eq(result.children.item(0).textContent, 'Item 1');
		eq(result.children.item(1).textContent, 'Item 2');

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var result = initializeTodosUl(todos);

		eq(result.childElementCount, 3);					// two items plus 'div' nest under Item 1
		eq(result.children.item(0).textContent, 'Item 1');
		eq(result.children.item(1).textContent, 'Item 1 child 1');
		eq(result.children.item(2).textContent, 'Item 2');
	},
	"When loaded, the app should display todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		document.getElementById('todolist').appendChild(initializeTodosUl(todos));
		
		var displayedTodo1 = document.getElementById(todo1.id).textContent
		eq(displayedTodo1, 'Item 1');
		
		var displayedTodo2 = document.getElementById(todo2.id).textContent;
		eq(displayedTodo2, 'Item 2');

		var displayedTodo3 = document.getElementById(todo3.id).textContent;
		eq(displayedTodo3, 'Item 3');
	},
	"When loaded, the app should also display nested todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		
		var todolist = initializeTodosUl(todos);
		document.getElementById('todolist').appendChild(todolist);

		var displayedTodo1 = document.getElementById(todo1.id).textContent
		eq(displayedTodo1, 'Item 1');
		
		var displayedChild1 = document.getElementById(child1.id).textContent;
		eq(displayedChild1, 'Item 1 child 1');
		
		var displayedChild2 = document.getElementById(child2.id).textContent;
		eq(displayedChild2, 'Item 1 child 2');

		var displayedTodo2 = document.getElementById(todo2.id).textContent;
		eq(displayedTodo2, 'Item 2');

		var displayedTodo3 = document.getElementById(todo3.id).textContent;
		eq(displayedTodo3, 'Item 3');
	},
	"The app should have a way to insert the first todoLi into an empty todos list.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];

		insertNewTodoLi(todos);
		
		eq(todos.length, 1);
		eq(todos[0].entry, '');

		todosUl = document.getElementById('todolist').children[0];
		eq(todosUl.childElementCount, 1);
		eq(todosUl.children[0].textContent, '');
	},
	"The app should have a way to insert a new sibling todo after a given todo.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(initializeTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todos.length, 1);
		eq(todos[0].entry, 'Item 1');
		eq(todosUl.childElementCount, 1);
		eq(todoLi1.textContent, 'Item 1');
		
		insertNewTodoLi(todos, todoLi1.id);				// insert/append a new todo after the existing one

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todosUl.children[1].textContent, '');

		var todo2 = todos[1];
		eq(todosUl.children[1].id, todo2.id);

		insertNewTodoLi(todos, todoLi1.id);				// insert a third todo between the two existing todos

		eq(todos.length, 3)
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 3);
		eq(todosUl.children[0].textContent, 'Item 1');
		eq(todosUl.children[1].textContent, '');
		eq(todosUl.children[2].id, todo2.id);
		eq(todos[2], todo2);
	},
	"The app should have a way to nest a new child todo under a given todo.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(initializeTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todoLi1.childElementCount, 0);
		eq(todoLi1.textContent, 'Item 1');

		appendNewChildTodoLi(todoLi1);			// case of first child added to a new UL

		var todoLi1Div = todosUl.children[1];
		eq(todoLi1Div.childElementCount, 1);
		eq(todoLi1Div.nodeName, "DIV");
		
		var todoLi1Ul = todoLi1Div.children[0];
		eq(todoLi1Ul.childElementCount, 1);
		eq(todoLi1Ul.nodeName, "UL");

		var child = todo1.children[0];
		var childLi = todoLi1Ul.children[0];
		eq(child.id, childLi.id);
		eq(childLi.nodeName, "LI");

		appendNewChildTodoLi(todoLi1);			// case of second child added to existing UL

		eq(todoLi1.childElementCount, 0);
		
		var todoLi1Div = todosUl.children[1];
		eq(todoLi1Div.childElementCount, 1);
		eq(todoLi1Div.nodeName, "DIV");

		var child1 = todo1.children[0];
		var child1Li = todoLi1Ul.children[0];
		eq(child1.id, child1Li.id);
		eq(child1Li.nodeName, "LI");
		
		var child2 = todo1.children[1];
		var child2Li = todoLi1Ul.children[1];
		eq(child2.id, child2Li.id);
		eq(child2Li.nodeName, "LI");
	},
	"A todoLi should allow for creating or editing its todo entry.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(initializeTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todoLi1.textContent, 'Item 1');
		eq(todoLi1.contentEditable, 'true');

	},
	"An empty todo should be created in editing mode for text entry.": function() {
		// Devtools must be closed for this test to pass.
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(initializeTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		insertNewTodoLi(todos, todoLi1.id);				// insert a new todo after the existing one

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todosUl.children[1].textContent, '');
		eq(document.activeElement, todosUl.children[1]);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todoLi1);					// case of first child added to a new UL

		var todoLi1Div = todosUl.children[1];
		var todoLi1Ul = todoLi1Div.children[0];
		var childLi = todoLi1Ul.children[0];
		eq(document.activeElement, childLi);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todoLi1);					// case of second child added to existing UL

		var child2Li = todoLi1Ul.children[1];
		eq(document.activeElement, child2Li);
		eq(document.hasFocus(), true);

	},
	"When editing, losing focus on the todoLi should save the revised entry.": function() {
		// Devtools must be closed for this test to pass.
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		insertNewTodoLi(todos);
		eq(todos[0].entry, "");					// state before edit
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		todoLi1.textContent = "test";			// simulate edit
		insertNewTodoLi(todos, todoLi1.id);		// todoLi1 loses focus, firing focusout event

		eq(todos[0].entry, "test");				// state after edit

	},
	"Clicking a todoLi 'completed' button should toggle class='completed' on the entry <p>": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1')
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(initializeTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];

		var testEvent = new Event('click');
		todoLi1.children[0].dispatchEvent(testEvent);

		eq(todoLi1.children[1].classList[0], 'completed');
	},
	"The app should have a button to add a todo to the end of the list.": function() {
		fail();
	},
	"Each todo should have a button to add a sibling todo after it.": function() {
		fail();
	},
	"Each todo should have a button to add a child todo underneath it.": function() {
		fail();
	},
	"Each todo should have a 'selected' checkbox.": function() {
		fail();
	},
	"Each todo should have a 'deleted' checkbox.": function() {
		fail();
	},
	"The app should have a button to delete selected todos.": function() {
		fail();
	},
	"The app should have a button to undelete selected todos.": function() {
		fail();
	},
	"The app should have a button to mark selected todos completed.": function() {
		fail();
	},
	"The app should have a button to mark selected todos uncompleted.": function() {
		fail();
	},
	"Each todo should have a button to select all children.": function() {
		fail();
	},
	"The app should listen for keyup events when editing a todo.": function() {
		fail();
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		insertNewTodoLi(todos);
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		// test that keyUpHandler fires given Shift Return while todoLi1 is focused...
		var testEvent = new Event('keyup');
		testEvent.key = "x";
		todoLi1.dispatchEvent(testEvent);
	},
	"When editing, Shift Return should save the revised entry by unfocusing the todoLi.": function() {
		fail();
	},
	"When editing, Escape should abort changes and unfocus the todoLi.": function() {
		fail();
	},
	"When editing, Backspace should delete the todo if the entry is empty.": function() {
		fail();
	}
});
