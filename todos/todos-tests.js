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
	"A todo object should be created with a 'collapsed' property of type boolean set to false.": function() {
		// When false, expand children <ul> to show child todos; when true, collapse <ul> to hide them
		newTodo = new Todo();
		eq(newTodo.collapsed, false);
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
	"The app should have a way to mark nested todos expanded or collapsed.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.collapsed, false);
		newTodo.markCollapsed(true);
		eq(newTodo.collapsed, true);
		newTodo.markCollapsed(false);
		eq(newTodo.collapsed, false);
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
		eq(todoLi.children[entryIndex].textContent, 'Item 1');	

	},
	"Each todo li should have an id equal to todo.id.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.id, todo1.id);
	},
	"The app should have a way to generate a ul element from an array of todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var result = createTodosUl(todos);

		eq(result.childElementCount, 2);
		eq(result.children.item(0).children[entryIndex].textContent, 'Item 1');
		eq(result.children.item(1).children[entryIndex].textContent, 'Item 2');

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var result = createTodosUl(todos);
		eq(result.childElementCount, 2);
		eq(result.children.item(0).children[entryIndex].textContent, 'Item 1');
		eq(result.children.item(0).children[todoLiUlIndex].children[0].children[entryIndex].textContent, 'Item 1 child 1');
		eq(result.children.item(1).children[entryIndex].textContent, 'Item 2');
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
		document.getElementById('todolist').appendChild(createTodosUl(todos));
		
		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.children[entryIndex].textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.children[entryIndex].textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.children[entryIndex].textContent;
		eq(todo3LiEntry, 'Item 3');
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
		
		var todolist = createTodosUl(todos);
		document.getElementById('todolist').appendChild(todolist);

		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.children[entryIndex].textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo1LiUl = todo1Li.children[todoLiUlIndex];
		var todo1LiChild1Li = todo1LiUl.children[0];
		var todo1LiChild1LiEntry = todo1LiChild1Li.children[entryIndex].textContent;
		eq(todo1LiChild1LiEntry, 'Item 1 child 1');
		
		var todo1LiChild2Li = todo1LiUl.children[1];
		var todo1LiChild2LiEntry = todo1LiChild2Li.children[entryIndex].textContent;
		eq(todo1LiChild2LiEntry, 'Item 1 child 2');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.children[entryIndex].textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.children[entryIndex].textContent;
		eq(todo3LiEntry, 'Item 3');
	},
	"The app should have a way to insert the first todoLi into an empty todos list.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];

		insertNewTodoLi(todos);
		
		eq(todos.length, 1);
		eq(todos[0].entry, '');

		todosUl = document.getElementById('todolist').children[0];
		eq(todosUl.childElementCount, 1);
		eq(todosUl.children[0].children[entryIndex].textContent, '');
	},
	"The app should have a way to insert a new sibling todo after a given todo.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(createTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todos.length, 1);
		eq(todos[0].entry, 'Item 1');
		eq(todosUl.childElementCount, 1);
		eq(todoLi1.children[entryIndex].textContent, 'Item 1');
		
		insertNewTodoLi(todos, todoLi1.id);				// insert/append a new todo after the existing one

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todosUl.children[1].children[entryIndex].textContent, '');

		var todo2 = todos[1];
		eq(todosUl.children[1].id, todo2.id);

		insertNewTodoLi(todos, todoLi1.id);				// insert a third todo between the two existing todos

		eq(todos.length, 3)
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 3);
		eq(todosUl.children[0].children[entryIndex].textContent, 'Item 1');
		eq(todosUl.children[1].children[entryIndex].textContent, '');
		eq(todosUl.children[2].id, todo2.id);
		eq(todos[2], todo2);
	},
	"The app should have a way to nest a new child todo under a given todo.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(createTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todoLi1.childElementCount, 8);
		eq(todoLi1.children[entryIndex].textContent, 'Item 1');

		appendNewChildTodoLi(todoLi1);			// case of first child added to a new UL

		eq(todoLi1.childElementCount, 9);
		var todoLi1Ul = todoLi1.children[todoLiUlIndex];
		eq(todoLi1Ul.childElementCount, 1);
		eq(todoLi1Ul.nodeName, "UL");

		var child = todo1.children[0];
		var childLi = todoLi1Ul.children[0];
		childLi.children[entryIndex].textContent = 'Item 1 child 1';
		eq(child.id, childLi.id);
		eq(childLi.nodeName, "LI");

		appendNewChildTodoLi(todoLi1);			// case of second child added to existing UL

		eq(todoLi1.childElementCount, 9);
		
		var child1 = todo1.children[0];
		var child1Li = todoLi1Ul.children[0];
		eq(child1.id, child1Li.id);
		eq(child1Li.nodeName, "LI");
		
		var child2 = todo1.children[1];
		var child2Li = todoLi1Ul.children[1];
		child2Li.children[entryIndex].textContent = 'Item 1 child 2';
		eq(child2.id, child2Li.id);
		eq(child2Li.nodeName, "LI");
	},
	"A todoLi should allow for editing its todo entry.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(createTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Entry = todoLi1.children[entryIndex];

		eq(todoLi1Entry.textContent, 'Item 1');
		eq(todoLi1Entry.contentEditable, 'true');

	},
	"An empty todo should be created in editing mode for text entry.": function() {
		// Devtools must be closed for this test to pass.
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		document.getElementById('todolist').appendChild(createTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		insertNewTodoLi(todos, todoLi1.id);				// insert a new todo after the existing one

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);

		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.children[entryIndex];

		eq(todoLi2Entry.textContent, '');
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todoLi1);					// case of first child added to a new UL

		var todoLi1Ul = todoLi1.children[todoLiUlIndex];
		var childLi = todoLi1Ul.children[0];
		var childLiEntry = childLi.children[entryIndex];
		eq(document.activeElement, childLiEntry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todoLi1);					// case of second child added to existing UL

		var child2Li = todoLi1Ul.children[1];
		var child2LiEntry = child2Li.children[entryIndex];
		eq(document.activeElement, child2LiEntry);
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
		var todoLi1Entry = todoLi1.children[entryIndex];
		todoLi1Entry.textContent = "test";			// simulate edit
		insertNewTodoLi(todos, todoLi1.id);		// todoLi1 loses focus, firing focusout event

		eq(todos[0].entry, "test");				// state after edit
	},
	"Section: todoLi buttons": function() {
	},
	"Each todo li should have a 'selected' button to toggle 'Selected/Unselected'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[selectedIndex].nodeName, 'BUTTON');
		eq(todoLi.children[selectedIndex].name, 'selected');
	},
	"When a todoLi is created, todo.selected should be set to false, 'selected' button text should be 'Select' and class 'inactive', and entry <p> class should remove 'highlighted'.": function() {
		// Start with a clean slate
		// Select button inactive/hidden until Select all is clicked
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		var todos = []
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi1Entry = todoLi1.children[entryIndex];
		var todoLi2Entry = todoLi2.children[entryIndex];

		eq(todo1.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi2SelectButton.classList.contains('inactive'), true);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
	},
	"Clicking a 'selected' button should toggle button text, toggle todo.selected, and entry <p> class 'highlighted.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1Entry = todoLi1.children[entryIndex];

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);

		todoLi1SelectButton.click();

		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todo1.selected, true);

		todoLi1SelectButton.click();

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
	},
	"Selecting a todo should not select its children.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1Child1SelectButton = todoLi1.children[todoLiUlIndex].children[0].children[selectedIndex];
		var todoLi1Child2SelectButton = todoLi1.children[todoLiUlIndex].children[1].children[selectedIndex];

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(child1.selected, false);
		eq(todoLi1Child1SelectButton.textContent, 'Select');
		eq(child1.selected, false);
		eq(todoLi1Child2SelectButton.textContent, 'Select');

		todoLi1SelectButton.click();

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(child1.selected, false);
		eq(todoLi1Child1SelectButton.textContent, 'Select');
		eq(child1.selected, false);
		eq(todoLi1Child2SelectButton.textContent, 'Select');
	},
	"Each todoLi should have a 'completed' button to toggle 'Completed/Not Completed'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[1].nodeName, 'BUTTON');
		eq(todoLi.children[1].name, 'completed');
	},
	"When a todoLi is created, if todo.completed is false, button should be 'Complete' and entry <p> class should be ''.": function() {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		var todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todo1.completed, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.children[entryIndex].classList.length, 0);
	},
	"If todo.completed is true, button text should be 'Uncomplete' and entry <p> class should be 'struck'.": function () {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		var todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCompleted(true);
		insertTodo(todos, todo1);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todo1.completed, true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1.children[entryIndex].classList.contains('struck'), true);
	},
	"Clicking a 'completed' button should toggle button text, todo.completed, and entry <p> class.": function() {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todo1.completed, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.children[entryIndex].classList.length, 0);
		todoLi1CompleteButton.click();

		eq(todo1.completed, true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1.children[entryIndex].classList.contains('struck'), true);

		todoLi1CompleteButton.click();

		eq(todo1.completed, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.children[entryIndex].classList.contains('struck'), false);
	},
	"Marking a todo completed should not mark its children completed.": function() {
		// because then marking uncompleted could incorrectly reverse some child values
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi1Ul = todoLi1.children[todoLiUlIndex];
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];
		var todoLi1Child1CompleteButton = todoLi1Child1.children[completedIndex];
		var todoLi1Child2CompleteButton = todoLi1Child2.children[completedIndex];

		eq(todo1.completed, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.children[entryIndex].classList.contains('struck'), false);
		eq(child1.completed, false);
		eq(todoLi1Child1CompleteButton.textContent, 'Complete');
		eq(todoLi1Child1.children[entryIndex].classList.contains('struck'), false);
		eq(child2.completed, false);
		eq(todoLi1Child2CompleteButton.textContent, 'Complete');
		eq(todoLi1Child2.children[entryIndex].classList.contains('struck'), false);

		todoLi1CompleteButton.click();

		eq(todo1.completed, true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1.children[entryIndex].classList.contains('struck'), true);
		eq(child1.completed, false);
		eq(todoLi1Child1CompleteButton.textContent, 'Complete');
		eq(todoLi1Child1.children[entryIndex].classList.contains('struck'), false);
		eq(child2.completed, false);
		eq(todoLi1Child2CompleteButton.textContent, 'Complete');
		eq(todoLi1Child2.children[entryIndex].classList.contains('struck'), false);
	},
	"Each todo li should have a 'deleted' button to toggle 'Delete/Undelete'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[deleteIndex].nodeName, 'BUTTON');
		eq(todoLi.children[deleteIndex].name, 'deleted');
	},
	"When a todoLi is created, if todo.deleted is false, button should be 'Delete' and entry <p> class not 'faded'.": function() {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.children[entryIndex].classList.length, 0);
	},
	"When a todoLi is created, if todo.deleted is true, button should be 'Undelete' and entry <p> class 'faded'.": function() {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(todo1.deleted, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1.children[entryIndex].classList.contains('faded'), true);
	},
	"Clicking a 'deleted' button should toggle button text, todo.deleted, entry <p> class.": function() {
		var todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.children[entryIndex].classList.length, 0);

		todoLi1DeleteButton.click();

		eq(todo1.deleted, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1.children[entryIndex].classList.contains('faded'), true);

		todoLi1DeleteButton.click();

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.children[entryIndex].classList.contains('faded'), false);
	},
	"Clicking 'deleted' button should also toggle its todoLi class 'deleted-removed'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeletedButton = todoLi1.children[deleteIndex];

		eq(todoLi1.classList.contains('deleted-removed'), false);

		todoLi1DeletedButton.click();

		eq(todoLi1.classList.contains('deleted-removed'), true);

		todoLi1DeletedButton.click();

		eq(todoLi1.classList.contains('deleted-removed'), false);
	},
	"Deleting a todo should not delete its children.": function() {
		// The children are just along for the ride
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1DeletedButton = todoLi1.children[deleteIndex];
		var todoLi1Child1DeletedButton = todoLi1.children[todoLiUlIndex].children[0].children[deleteIndex];
		var todoLi1Child2DeletedButton = todoLi1.children[todoLiUlIndex].children[1].children[deleteIndex];

		eq(todoLi1DeletedButton.textContent, 'Delete');
		eq(todo1.deleted, false);
		eq(todoLi1Child1DeletedButton.textContent, 'Delete');
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.textContent, 'Delete');
		eq(child2.deleted, false);

		todoLi1DeletedButton.click();

		eq(todoLi1DeletedButton.textContent, 'Undelete');
		eq(todo1.deleted, true);
		eq(todoLi1Child1DeletedButton.textContent, 'Delete');
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.textContent, 'Delete');
		eq(child2.deleted, false);
	},
	"Each todo li should have an 'addSibling' button to add a sibling todo after it.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddSibling = todoLi1.children[addSiblingIndex];

		eq(todoLi1AddSibling.nodeName, 'BUTTON');
		eq(todoLi1AddSibling.name, 'addSibling');
		eq(todoLi1AddSibling.textContent, 'Add sibling');
	},
	"Clicking an 'addSibling' button should create a new sibling todo in and todoLi nested at the same level.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1SiblingButton = todoLi1.children[addSiblingIndex];
		todoLi1Ul = todoLi1.children[todoLiUlIndex];
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child1AddSiblingButton = todoLi1Child1.children[addSiblingIndex];

		eq(todosUl.childElementCount, 1);
		eq(todoLi1Ul.childElementCount, 1);
		eq(todo1.children[0].id, todoLi1Child1.id);

		todoLi1SiblingButton.click();				// Add a sibling at top level to todos array

		eq(todosUl.childElementCount, 2);
		var todoLi2 = todosUl.children[1]
		eq(todoLi2.nodeName, 'LI');
		eq(todoLi2.id, todos[1].id)

		todoLi1Child1AddSiblingButton.click();		// Add a sibling at nested level to todo.children array

		eq(todoLi1Ul.childElementCount, 2);
		var todoLi1Child2 = todoLi1Ul.children[1];
		eq(todoLi1Child2.nodeName, 'LI');
		eq(todo1.children[1].id, todoLi1Child2.id);
	},
	"Each todo li should have an 'addChild' button to add a child todo underneath it.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddChild = todoLi1.children[addChildIndex];

		eq(todoLi1AddChild.nodeName, 'BUTTON');
		eq(todoLi1AddChild.name, 'addChild');
		eq(todoLi1AddChild.textContent, 'Add child');
	},
	"Clicking an 'addChild' button should create a new nested child todo and todoLi.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children[addChildIndex];

		eq(todosUl.childElementCount, 1);
		eq(todoLi1.childElementCount, 8);

		todoLi1ChildButton.click();

		eq(todosUl.childElementCount, 1);
		eq(todoLi1.childElementCount, 9);
		var todoLi1Ul = todoLi1.children[todoLiUlIndex]
		var todoLi1Child1 = todoLi1Ul.children[0];
		eq(todoLi1Child1.nodeName, 'LI');
		eq(todoLi1Child1.id, todos[0].children[0].id)
		eq(todoLi1Child1.children[entryIndex].textContent, "");
		eq(todos[0].children[0].entry, "");

	},
	"Clicking an addChild button should set todo.collapsed false and expand nested todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children[addChildIndex];
		
		todoLi1ChildButton.click();

		eq(todo1.collapsed, false);
		eq(todoLi1.children[todoLiUlIndex].classList.contains('collapsed'), false);

		todo1.collapsed = true;
		todoLi1.children[todoLiUlIndex].classList.add('collapsed');

		todoLi1ChildButton.click();

		eq(todo1.collapsed, false);
		eq(todoLi1.children[todoLiUlIndex].classList.contains('collapsed'), false);
	}, 
	"Each todoLi should have a showChildren button to expand/collapse nested todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];

		eq(todoLi1ShowChildren.nodeName, 'BUTTON');
		eq(todoLi1ShowChildren.name, 'showChildren');
	},
	"If a todo has no children, todoLi should be created with showChildren button class 'inactive'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];

		eq(todoLi1ShowChildren.classList.contains('inactive'), true);
	},
	"If a todo has children and todo.collapsed is true, todoLi should be created with todoLiUl class 'collapsed' and showChildren button text 'Show children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCollapsed(true);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children[showChildrenIndex];
		todoLi1Ul = todoLi1.children[todoLiUlIndex];

		eq(todoLi1Ul.classList.contains('collapsed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');
},
	"If a todo has children and todo.collapsed is false, todoLi should be created with todoLiUl class '' and showChildren button text 'Hide children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children[showChildrenIndex];
		todoLi1Ul = todoLi1.children[todoLiUlIndex];

		eq(todoLi1Ul.classList.contains('collapsed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
},
	"Clicking a showChildren button should toggle button text and todoLiUl class.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children[addChildIndex];
		todoLi1ShowChildrenButton = todoLi1.children[showChildrenIndex];

		eq(todo1.collapsed, false);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		
		todoLi1ChildButton.click();

		todoLi1Ul = todoLi1.children[todoLiUlIndex];	// <ul> created by Add child
		eq(todo1.collapsed, false);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1Ul.classList.contains('collapsed'), false);

		todoLi1ShowChildrenButton.click();

		eq(todo1.collapsed, true);
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');
		eq(todoLi1Ul.classList.contains('collapsed'), true);

		todoLi1ShowChildrenButton.click();

		eq(todo1.collapsed, false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1Ul.classList.contains('collapsed'), false);
	},
	"Each todo should have a 'selectChildren' button to select all of its children.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1SelectChildrenButton.name, 'selectChildren');
	},
	"If a todo has no child todos, its todoLi should be created with selectChildren button class 'inactive'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);
	},
	"If todo.collapsed is true, its todoLi should be created with selectChildren button class 'inactive'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCollapsed(true);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);
	},
	"If all todo children have todo.selected = true, todoLi should be created with selectChildren button text 'Unselect children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
	},
	"Otherwise, todoLi should be created with selectChildren button text 'Select children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
	},
	"Clicking a selectChildren button should toggle button text and child todos' todo.selected and todoLi selected button text.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];
		var child1Li = todoLi1.children[todoLiUlIndex].children[0];
		var child1LiSelectButton = child1Li.children[selectedIndex];
		var child2Li = todoLi1.children[todoLiUlIndex].children[completedIndex];
		var child2LiSelectButton = child2Li.children[selectedIndex];

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1LiSelectButton.textContent, 'Unselect');
		eq(child2LiSelectButton.textContent, 'Unselect');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
	},
	"Clicking an addChild button should activate showChildren and selectChildren buttons.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children[addChildIndex];
		todoLi1ShowChildrenButton = todoLi1.children[showChildrenIndex];
		todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);
		
		todoLi1ChildButton.click();

		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
	}, 
	"When showChildren button is clicked, selectChildren button class should toggle 'inactive'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children[addChildIndex];
		todoLi1ShowChildrenButton = todoLi1.children[showChildrenIndex];
		todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todo1.collapsed, false);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		
		todoLi1ShowChildrenButton.click();

		eq(todo1.collapsed, true);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');

		todoLi1ShowChildrenButton.click();

		eq(todo1.collapsed, false);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
	},
	"Section: Actions bar -- Selection": function() {
	},
	"The app should have a header section with an actions bar to hold action buttons.": function() {
		var actionsDiv = document.getElementById('actions');
		eq(actionsDiv.nodeName, 'DIV');
		eq(actionsDiv.parentElement.nodeName, 'HEADER');
	},
	"The header actions bar should have a 'selectAll' button to select all displayed top-level todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var selectAllButton = document.getElementsByName('selectAll')[0];
		eq(selectAllButton.nodeName, 'BUTTON');
		eq(selectAllButton.innerText, 'Select all');
		eq(actionsDiv.children[0], selectAllButton); 
	},
	"The header actions bar should have a 'Complete selected' button to mark selected todos completed.": function() {
		var actionsDiv = document.getElementById('actions');
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		eq(completeSelectedButton.nodeName, 'BUTTON');
		eq(completeSelectedButton.innerText, 'Complete selected');
		eq(actionsDiv.children[1], completeSelectedButton); 
	},
	"The header actions bar should have a 'Delete selected' button to delete selected todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		eq(deleteSelectedButton.nodeName, 'BUTTON');
		eq(deleteSelectedButton.innerText, 'Delete selected');
		eq(actionsDiv.children[2], deleteSelectedButton); 
	},
	"When the app starts up, actions bar selection-related button names should be set to default values.": function() {
		startApp();
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];

		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(deleteSelectedButton.classList.contains('inactive'), true);
	},
	"Clicking selectAll button should toggle button text, each todoLi selected button text, each todo.selected, and each entry <p> class." : function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi1Entry = todoLi1.children[entryIndex];
		var todoLi2Entry = todoLi2.children[entryIndex];

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi2SelectButton.classList.contains('inactive'), true);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todo2.selected, false);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(todo1.selected, true);
		eq(todo2.selected, true);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi2SelectButton.classList.contains('inactive'), true);
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todo2.selected, false);
	},
	"Clicking selectAll button should also toggle todoLi completed, deleted, addSibling, and addChild button classes 'inactive'.": function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi2CompleteButton = todoLi2.children[completedIndex];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];
		var todoLi2DeleteButton = todoLi2.children[deleteIndex];
		var todoLi1AddSiblingButton = todoLi1.children[addSiblingIndex];
		var todoLi2AddSiblingButton = todoLi2.children[addSiblingIndex];
		var todoLi1AddChildButton = todoLi1.children[addChildIndex];
		var todoLi2AddChildButton = todoLi2.children[addChildIndex];

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi2CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi2DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);
		
		selectAllButton.click();
		
		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi2CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi2DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);
	},
	"selectAll button with text 'Select all' should only apply to displayed todos.": function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi2DeleteButton = todoLi2.children[deleteIndex];

		eq(todo1.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.children[entryIndex].classList.contains('highlighted'), false);
		eq(todoLi2.children[entryIndex].classList.contains('highlighted'), false);

		todoLi2DeleteButton.click();
		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo2.selected, false);
		eq(todoLi1.children[entryIndex].classList.contains('highlighted'), true);
		eq(todoLi2.children[entryIndex].classList.contains('highlighted'), false);
	},
	"Clicking completeSelected button should toggle button text and toggle todo.completed, todoLi completed button text, and entry <p> class for selected todos.": function() {
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi3 = todolist.children[0].children[2];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi2CompleteButton = todoLi2.children[completedIndex];
		var todoLi3SelectButton = todoLi3.children[selectedIndex];
		var todoLi3CompleteButton = todoLi3.children[completedIndex];
		var todoLi1Entry = todoLi1.children[entryIndex];
		var todoLi2Entry = todoLi2.children[entryIndex];
		var todoLi3Entry = todoLi3.children[entryIndex];

		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck'), false);
		eq(todo3.completed, false);

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		completeSelectedButton.click();

		eq(completeSelectedButton.textContent, 'Uncomplete selected');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1Entry.classList.contains('struck'), true);
		eq(todo1.completed, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.textContent, 'Uncomplete');
		eq(todoLi2Entry.classList.contains('struck'), true);
		eq(todo2.completed, true);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck'), false);
		eq(todo3.completed, false);

		completeSelectedButton.click();
		
		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck'), false);
		eq(todo3.completed, false);
	},
	"Clicking the deleteSelected button should toggle its button text and each selected todoLi's <li> class, button text and todo.selected.": function() {
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi3 = todolist.children[0].children[2];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi2DeleteButton = todoLi2.children[deleteIndex];
		var todoLi3SelectButton = todoLi3.children[selectedIndex];
		var todoLi3DeleteButton = todoLi3.children[deleteIndex];
		var todoLi1Entry = todoLi1.children[entryIndex];
		var todoLi2Entry = todoLi2.children[entryIndex];
		var todoLi3Entry = todoLi3.children[entryIndex];

		eq(deleteSelectedButton.textContent, 'Delete selected');
		
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi1.classList.contains('removed'), false);
		eq(todoLi1Entry.classList.contains('faded'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todoLi2.classList.contains('removed'), false);
		eq(todoLi2Entry.classList.contains('faded'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todoLi3.classList.contains('removed'), false);
		eq(todoLi3Entry.classList.contains('faded'), false);
		eq(todo3.deleted, false);

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		eq(deleteSelectedButton.textContent, 'Undelete selected');

		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1.classList.contains('removed'), true);
		eq(todoLi1Entry.classList.contains('faded'), true);
		eq(todo1.deleted, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.textContent, 'Undelete');
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(todoLi2.classList.contains('removed'), true);
		eq(todoLi2Entry.classList.contains('faded'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todoLi3.classList.contains('removed'), false);
		eq(todoLi3Entry.classList.contains('faded'), false);
		eq(todo3.deleted, false);

		deleteSelectedButton.click();
		
		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('removed'), false);
		eq(todoLi1Entry.classList.contains('faded'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('removed'), false);
		eq(todoLi2Entry.classList.contains('faded'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todoLi3Entry.classList.contains('removed'), false);
		eq(todoLi3Entry.classList.contains('faded'), false);
		eq(todo3.deleted, false);
},
	"Section: Actions bar -- filters": function() {
	},
	"The header actions bar should have a showActive button to toggle showing active todos.": function() {
		// active todos are not completed and not deleted
		var actionsDiv = document.getElementById('actions');
		var showActiveButton = document.getElementsByName('showActive')[0];
		eq(showActiveButton.nodeName, 'BUTTON');
		eq(showActiveButton.innerText, '√ Active');
		eq(actionsDiv.children[3], showActiveButton); 
	},
	"On startup, the showActive button text should be '√ Active' and todoLi class not 'active-removed' on active todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);

		startApp();
		
		showActiveButton = document.getElementsByName('showActive')[0];
		todolist = document.getElementById('todolist');
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];

		eq(showActiveButton.textContent, '√ Active');
		eq(todoLi1.classList.contains('active-removed'), false);
	},
	"Clicking the showActive button should toggle button text and set/unset todoLi class 'active-removed' on active todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);

		startApp();

		showActiveButton = document.getElementsByName('showActive')[0];
		todolist = document.getElementById('todolist');
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];

		eq(showActiveButton.textContent, '√ Active');
		eq(todoLi1.classList.contains('active-removed'), false);

		showActiveButton.click();

		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), true);

		showActiveButton.click();

		eq(showActiveButton.textContent, '√ Active');
		eq(todoLi1.classList.contains('active-removed'), false);
	},
	"The header actions bar should have a showCompleted button to toggle showing completed todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var showCompleteButton = document.getElementsByName('showCompleted')[0];
		eq(showCompleteButton.nodeName, 'BUTTON');
		eq(showCompleteButton.innerText, '√ Completed');
		eq(actionsDiv.children[4], showCompleteButton); 
	},
	"On startup, the showCompleted button text should be '√ Completed' and todoLi class not 'completed-removed' on completed todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item completed');
		todo1.markCompleted(true);
		insertTodo(todos, todo2);

		startApp();
		
		showCompletedButton = document.getElementsByName('showCompleted')[0];
		todolist = document.getElementById('todolist');
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
	},
	"Clicking the showCompleted button should toggle button text and set/unset todoLi class 'completed-removed' on completed todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item completed');
		todo1.markCompleted(true);
		insertTodo(todos, todo1);

		startApp();

		showCompletedButton = document.getElementsByName('showCompleted')[0];
		todolist = document.getElementById('todolist');
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, 'Completed');
		eq(todoLi1.classList.contains('completed-removed'), true);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
	},
	"The header actions bar should have a showDeleted button to toggle showing deleted todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var showDeletedButton = document.getElementsByName('showDeleted')[0];
		eq(showDeletedButton.nodeName, 'BUTTON');
		eq(showDeletedButton.innerText, 'Deleted');
		eq(actionsDiv.children[5], showDeletedButton); 
	},
	"On startup, the showDeleted button text should be 'Deleted' and todoLi class 'deleted-removed' on deleted todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 completed');
		todo2.markCompleted(true);
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3 deleted');
		todo3.markDeleted(true);
		insertTodo(todos, todo3);

		startApp();

		showDeletedButton = document.getElementsByName('showDeleted')[0];

		eq(showDeletedButton.textContent, 'Deleted');

		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi2 = todosUl.children[1];
		var todoLi3 = todosUl.children[2];

		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(todoLi3.id, todo3.id);

		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(todoLi3.classList.contains('deleted-removed'), true);
	},
	"Clicking the showDeleted button should toggle button text and set/unset todoLi class 'deleted-removed' on deleted todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 completed');
		todo2.markCompleted(true);
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3 deleted');
		todo3.markDeleted(true);
		insertTodo(todos, todo3);

		startApp();

		showDeletedButton = document.getElementsByName('showDeleted')[0];

		eq(showDeletedButton.textContent, 'Deleted');

		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi2 = todosUl.children[1];
		var todoLi3 = todosUl.children[2];

		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(todoLi3.id, todo3.id);

		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(todoLi3.classList.contains('deleted-removed'), true);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(todoLi3.classList.contains('deleted-removed'), false);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, 'Deleted');
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(todoLi3.classList.contains('deleted-removed'), true);

	},
	"Section: Actions bar -- other buttons": function() {

	},
	"The header actions bar should have an addTodo button that adds a todo to the end of the list.": function() {
		// In case filtering the list results in no displayed todos
		var actionsDiv = document.getElementById('actions');
		var addTodoButton = document.getElementsByName('addTodo')[0];
		eq(addTodoButton.nodeName, 'BUTTON');
		eq(addTodoButton.innerText, 'Add todo');
		eq(actionsDiv.children[6], addTodoButton); 
		
		document.getElementById('todolist').innerHTML = '';
		todos = [];

		addTodoButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		eq(todosUl.children.length, 1);
		eq(todos.length, 1);
		eq(todoLi1.id, todos[0].id);

		addTodoButton.click();

		todoLi2 = todosUl.children[1];
		eq(todosUl.children.length, 2);
		eq(todos.length, 2);
		eq(todoLi2.id, todos[1].id);
	},
	"The header actions bar should have an 'Undo edit' button to revert todo text changes.": function() {
		var actionsDiv = document.getElementById('actions');
		var undoEditButton = document.getElementsByName('undoEdit')[0];
		eq(undoEditButton.nodeName, 'BUTTON');
		eq(undoEditButton.innerText, 'Undo edit');
		eq(actionsDiv.children[7], undoEditButton);
	},
	"Clicking 'Undo edit' button should revert text of todo being edited to old version.": function() {
		fail();
	},
	"Section: more button interactions": function() {
	},
	"If showCompleted button text is 'Completed', clicking a todoLi Complete button should add todoLi class 'completed-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startApp();
		
		var showCompletedButton = document.getElementsByName('showCompleted')[0];
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(showCompletedButton.textContent, '√ Completed');

		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todo1.completed, false);

		todoLi1CompleteButton.click();
		
		eq(todoLi1.classList.contains('completed-removed'), false);		// completed-removed not added because showCompleted is '√ Completed'
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todo1.completed, true);

		todoLi1CompleteButton.click();
		
		eq(todoLi1.classList.contains('completed-removed'), false);		// re-set 
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todo1.completed, false);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, 'Completed');

		todoLi1CompleteButton.click();
		
		eq(todoLi1.classList.contains('completed-removed'), true);		// completed-removed added because showCompleted is 'Completed'
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todo1.completed, true);
	},
	"If showActive button text is 'Active', clicking a todoLi Uncomplete button should add todoLi class 'active-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startApp();
		
		var showActiveButton = document.getElementsByName('showActive')[0];
		var showCompletedButton = document.getElementsByName('showCompleted')[0];
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(showCompletedButton.textContent, '√ Completed');
		eq(showActiveButton.textContent, '√ Active');
		
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todo1.completed, false);

		todoLi1CompleteButton.click();

		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todo1.completed, true);

		showActiveButton.click();

		eq(showCompletedButton.textContent, '√ Completed');
		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		
		todoLi1CompleteButton.click();

		eq(todoLi1.classList.contains('active-removed'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todo1.completed, false);
	},
	"If showDeleted button text is 'Deleted', clicking a todoLi Delete button should add todoLi class 'deleted-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startApp();
		
		var showDeletedButton = document.getElementsByName('showDeleted')[0];
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(showDeletedButton.textContent, 'Deleted');

		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todo1.deleted, false);

		todoLi1DeleteButton.click();
		
		eq(todoLi1.classList.contains('deleted-removed'), true);		// deleted-removed added because showDeleted is 'Deleted'
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todo1.deleted, true);
	},
	"If showDeleted button text is '√ Deleted', clicking a todoLi Delete button should not add todoLi class 'deleted-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startApp();
		
		var showDeletedButton = document.getElementsByName('showDeleted')[0];
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(showDeletedButton.textContent, 'Deleted');

		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todo1.deleted, false);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');

		todoLi1DeleteButton.click();
		
		eq(todoLi1.classList.contains('deleted-removed'), false);		// deleted-removed not added because showDeleted is '√ Deleted'
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todo1.deleted, true);
	},
	"If showActive button text is 'Active', clicking a todoLi Undelete button should add todoLi class 'active-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startApp();
		
		var showActiveButton = document.getElementsByName('showActive')[0];
		var showDeletedButton = document.getElementsByName('showDeleted')[0];
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(showDeletedButton.textContent, 'Deleted');
		eq(showActiveButton.textContent, '√ Active');

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');
		
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todo1.deleted, false);

		todoLi1DeleteButton.click();

		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todo1.deleted, true);

		showActiveButton.click();

		eq(showActiveButton.textContent, 'Active');
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(todoLi1.classList.contains('active-removed'), false);

		
		todoLi1DeleteButton.click();

		eq(todoLi1.classList.contains('active-removed'), true);		// active-removed added because showActive is 'Active'
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todo1.deleted, false);
	},

	"If clicking 'deleted' button removes the last todoLi in a todoUl, the app should adjust other buttons and todo.collapsed.": function() {
		fail();
	},
	"If clicking a todoLi Unselect button makes all todos in the todoUl unselected, send click event to selectAll button.": function() {
		fail();
	}, 
	"Section: Keyboard shortcuts": function() {
},
	"The app should listen for keyup events when editing a todo.": function() {
		fail();
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		insertNewTodoLi(todos);
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		// test that keyUpHandler fires given Return while todoLi1 is focused...
		var testEvent = new Event('keyup');
		testEvent.key = "x";
		todoLi1.dispatchEvent(testEvent);
	},
	"When editing, Return should be a shortcut for Add Sibling todo.": function() {
		// Limit a todo to one line.
		fail();
	},
	"When editing, Esc should be a shortcut for Undo Edit.": function() {
		fail();
	},
	"When editing, Backspace should delete the todo if the entry is empty.": function() {
		fail();
	},
	"Section: more features": function() {

	},
	"There should be a way to move a todo up in the list, for example to the top of the list.": function() {
		// An 'Add above' button? 'Shift-up/down' button? Drag to new position?
		fail();
	},
	"There should be a 'find' input to filter the display according to keywords or entry text.": function() {
		fail();
	}, 
	"Each todoLi should have a 'zoom in/out' button to filter the display to just that todoLi.": function() {
		// Simplifies the UI: can remove selectChildren, which currently has no buttons to operate on the selection.
		// Simplifies the filtered todo displays, which don't have to take child todos into account.
		fail();
	},
	"When todoLi zoom button is clicked, other buttons should be hidden, class should toggle 'zoomed' and all other todoLis should toggle class 'unzoomed'.": function() {
		fail();
	},
	"When a todoLi is zoomed in, the actions bar buttons should apply only to the todoLi's children.": function() {
		fail();
	},
	"Section: On startup": function() {

	},
	"The app should set todo.selected to false on startup or when filtering todos.": function() {
		// Startup or filtering should produce a clean slate with no selected todos.
		selectAllButton = document.getElementsByName('selectAll')[0];
		todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		startApp();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi2 = todosUl.children[1];

		eq(todo1.selected, false);
		eq(todo2.selected, false)
		eq(todoLi1.children[selectedIndex].textContent, 'Select');
		eq(todoLi2.children[selectedIndex].textContent, 'Select');
		eq(selectAllButton.textContent, 'Select all');
	},
	"If todos array is empty at startup, the app should create a new empty todo.": function() {
		todolist = document.getElementById('todolist');
		todolist.innerHTML = '';
		todos = [];
		startApp();
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todos.length, 1);
		eq(todosUl.children.length, 1);
		eq(todoLi1.children[entryIndex].textContent, '');
	}
});
