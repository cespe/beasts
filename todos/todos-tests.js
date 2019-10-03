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
		eq(result.children.item(0).children[6].textContent, 'Item 1');
		eq(result.children.item(1).children[6].textContent, 'Item 2');

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var result = createTodosUl(todos);
		// write variables to get rid of these opaque children[x]'s 
		eq(result.childElementCount, 2);
		eq(result.children.item(0).children[6].textContent, 'Item 1');
		eq(result.children.item(0).children[7].children[0].children[6].textContent, 'Item 1 child 1');
		eq(result.children.item(1).children[6].textContent, 'Item 2');
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
		var todo1LiEntry = todo1Li.children[6].textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.children[6].textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.children[6].textContent;
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
		var todo1LiEntry = todo1Li.children[6].textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo1LiUl = todo1Li.children[7];
		var todo1LiChild1Li = todo1LiUl.children[0];
		var todo1LiChild1LiEntry = todo1LiChild1Li.children[6].textContent;
		eq(todo1LiChild1LiEntry, 'Item 1 child 1');
		
		var todo1LiChild2Li = todo1LiUl.children[1];
		var todo1LiChild2LiEntry = todo1LiChild2Li.children[6].textContent;
		eq(todo1LiChild2LiEntry, 'Item 1 child 2');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.children[6].textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.children[6].textContent;
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
		eq(todosUl.children[0].textContent, '');
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
		document.getElementById('todolist').appendChild(createTodosUl(todos));
		var todolist = document.getElementById('todolist');
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todoLi1.childElementCount, 7);
		eq(todoLi1.textContent, 'Item 1');

		appendNewChildTodoLi(todoLi1);			// case of first child added to a new UL

		
		eq(todoLi1.childElementCount, 8);
		var todoLi1Ul = todoLi1.children[7];
		eq(todoLi1Ul.childElementCount, 1);
		eq(todoLi1Ul.nodeName, "UL");

		var child = todo1.children[0];
		var childLi = todoLi1Ul.children[0];
		eq(child.id, childLi.id);
		eq(childLi.nodeName, "LI");

		appendNewChildTodoLi(todoLi1);			// case of second child added to existing UL

		eq(todoLi1.childElementCount, 8);
		
		var child1 = todo1.children[0];
		var child1Li = todoLi1Ul.children[0];
		eq(child1.id, child1Li.id);
		eq(child1Li.nodeName, "LI");
		
		var child2 = todo1.children[1];
		var child2Li = todoLi1Ul.children[1];
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
		var todoLi1Entry = todoLi1.children[6];

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
		var todoLi2Entry = todoLi2.children[6];

		eq(todoLi2Entry.textContent, '');
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todoLi1);					// case of first child added to a new UL

		var todoLi1Ul = todoLi1.children[7];
		var childLi = todoLi1Ul.children[0];
		var childLiEntry = childLi.children[6];
		eq(document.activeElement, childLiEntry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todoLi1);					// case of second child added to existing UL

		var child2Li = todoLi1Ul.children[1];
		var child2LiEntry = child2Li.children[6];
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
		var todoLi1Entry = todoLi1.children[6];
		todoLi1Entry.textContent = "test";			// simulate edit
		insertNewTodoLi(todos, todoLi1.id);		// todoLi1 loses focus, firing focusout event

		eq(todos[0].entry, "test");				// state after edit

	},
	"Each todo li should have a button to toggle 'Selected/Unselected'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[0].nodeName, 'BUTTON');
		eq(todoLi.children[0].name, 'selected');
	},
	"Each todo li should have a button to toggle 'Completed/Not Completed'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[1].nodeName, 'BUTTON');
		eq(todoLi.children[1].name, 'completed');
	},
	"Each todo li should have a 'Delete' button.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children[2].nodeName, 'BUTTON');
		eq(todoLi.children[2].name, 'deleted');
	},
	"Each todo li should have an 'Add todo' button to add a sibling todo after it.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddSibling = todoLi1.children[3];

		eq(todoLi1AddSibling.nodeName, 'BUTTON');
		eq(todoLi1AddSibling.name, 'addSibling');
	},
	"Each todo li should have an 'Add child' button to add a child todo underneath it.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddChild = todoLi1.children[4];

		eq(todoLi1AddChild.nodeName, 'BUTTON');
		eq(todoLi1AddChild.name, 'addChild');

	},
	"Each todo should have a button to select all children.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildren = todoLi1.children[5];

		eq(todoLi1SelectChildren.nodeName, 'BUTTON');
		eq(todoLi1SelectChildren.name, 'selectChildren');
	},
	"Clicking a 'select' button should toggle class='selected' on it and toggle todo.selected.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[0];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);

		todoLi1SelectButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi1Child1SelectButton = todoLi1.children[7].children[0].children[0];
		var todoLi1Child2SelectButton = todoLi1.children[7].children[1].children[0];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todoLi1Child1SelectButton.classList.contains('selected'), false);
		eq(todoLi1Child2SelectButton.classList.contains('selected'), false);

		todoLi1SelectButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todoLi1Child1SelectButton.classList.contains('selected'), false);
		eq(todoLi1Child2SelectButton.classList.contains('selected'), false);
	},
	"Clicking a 'completed' button should toggle class='completed' on it and toggle todo.completed.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompletedButton = todoLi1.children[1];

		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);

		todoLi1CompletedButton.click();

		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
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
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi1Child1CompletedButton = todoLi1.children[7].children[0].children[1];
		var todoLi1Child2CompletedButton = todoLi1.children[7].children[1].children[1];

		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1Child1CompletedButton.classList.contains('completed'), false);
		eq(child1.completed, false);
		eq(todoLi1Child2CompletedButton.classList.contains('completed'), false);
		eq(child2.completed, false);

		todoLi1CompletedButton.click();

		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi1Child1CompletedButton.classList.contains('completed'), false);
		eq(child1.completed, false);
		eq(todoLi1Child2CompletedButton.classList.contains('completed'), false);
		eq(child2.completed, false);
	},
	"Clicking a 'delete' button should toggle class='deleted' on it and toggle todo.deleted.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[2];

		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);

		todoLi1DeleteButton.click();

		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
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
		var todoLi1DeletedButton = todoLi1.children[2];
		var todoLi1Child1DeletedButton = todoLi1.children[7].children[0].children[2];
		var todoLi1Child2DeletedButton = todoLi1.children[7].children[1].children[2];

		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi1Child1DeletedButton.classList.contains('deleted'), false);
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.classList.contains('deleted'), false);
		eq(child2.deleted, false);

		todoLi1DeletedButton.click();

		eq(todoLi1DeletedButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi1Child1DeletedButton.classList.contains('deleted'), false);
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.classList.contains('deleted'), false);
		eq(child2.deleted, false);
	},
	"createTodoLi should set button classes corresponding to todo data fields.": function() {
		document.getElementById('todolist').innerHTML = '';
		var todos = [];
		var todo1 = new Todo('Item 1 selected');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		var todo2 = new Todo('Item 2 completed');
		todo2.markCompleted(true);
		insertTodo(todos, todo2);
		var todo3 = new Todo('Item 3 deleted');
		todo3.markDeleted(true);
		insertTodo(todos, todo3);
		var todo4 = new Todo('Item 4 base');
		insertTodo(todos, todo4);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1SelectedButton = todoLi1.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi1DeletedButton = todoLi1.children[2];
		var todoLi2 = todosUl.children[1];
		var todoLi2SelectedButton = todoLi2.children[0];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi2DeletedButton = todoLi2.children[2];
		var todoLi3 = todosUl.children[2];
		var todoLi3SelectedButton = todoLi3.children[0];
		var todoLi3CompletedButton = todoLi3.children[1];
		var todoLi3DeletedButton = todoLi3.children[2];
		var todoLi4 = todosUl.children[3];
		var todoLi4SelectedButton = todoLi4.children[0];
		var todoLi4CompletedButton = todoLi4.children[1];
		var todoLi4DeletedButton = todoLi4.children[2];

		eq(todosUl.childElementCount, 4);
		eq(todoLi1.id, todo1.id);
		eq(todoLi1SelectedButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2SelectedButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3.id, todo3.id);
		eq(todoLi3SelectedButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi3DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);
		eq(todoLi4.id, todo4.id);
		eq(todoLi4SelectedButton.classList.contains('selected'), false);
		eq(todo4.selected, false);
		eq(todoLi4CompletedButton.classList.contains('completed'), false);
		eq(todo4.completed, false);
		eq(todoLi4DeletedButton.classList.contains('deleted'), false);
		eq(todo4.deleted, false);
	},
	"Clicking an 'Add todo' button should create a new sibling todo and todoLi.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1SiblingButton = todoLi1.children[3];

		eq(todosUl.childElementCount, 1);

		todoLi1SiblingButton.click();

		eq(todosUl.childElementCount, 2);
		var todoLi2 = todosUl.children[1]
		eq(todoLi2.nodeName, 'LI');
		eq(todoLi2.id, todos[1].id)
	},
	"Clicking an 'Add child' button should create a new nested child todo and todoLi.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children[4];

		eq(todosUl.childElementCount, 1);
		eq(todoLi1.childElementCount, 7);

		todoLi1ChildButton.click();

		eq(todosUl.childElementCount, 1);
		eq(todoLi1.childElementCount, 8);
		var todoLi1Ul = todoLi1.children[7]
		var todoLi1Child1 = todoLi1Ul.children[0];
		eq(todoLi1Child1.nodeName, 'LI');
		eq(todoLi1Child1.id, todos[0].children[0].id)
		eq(todoLi1Child1.children[6].textContent, "");
		eq(todos[0].children[0].entry, "");

	},
	"If a todo has children, clicking its 'Select children' button should toggle class='selected' on it.": function() {
		// Case one: the todo has children
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
		var todoLi1SelectChildrenButton = todoLi1.children[5];

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);

		// Case two: the todo has no children
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[5];

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
	},
	"If a clicked 'Select Children' button toggles class='selected', each child todo should be set to 'selected'.": function() {
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
		var todoLi1SelectChildrenButton = todoLi1.children[5];

		var child1Li = todoLi1.children[7].children[0];
		var child1LiSelectButton = child1Li.children[0];
		var child2Li = todoLi1.children[7].children[1];
		var child2LiSelectButton = child2Li.children[0];
		
		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(child1LiSelectButton.classList.contains('selected'), true);
		eq(child2LiSelectButton.classList.contains('selected'), true);
	},
	"If a clicked 'Select Children' button toggles class='', each child todo should unset 'selected'.": function() {
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
		var todoLi1SelectChildrenButton = todoLi1.children[5];

		var child1Li = todoLi1.children[7].children[0];
		var child1LiSelectButton = child1Li.children[0];
		var child2Li = todoLi1.children[7].children[1];
		var child2LiSelectButton = child2Li.children[0];
		
		// Case one: child todos are all unselected
		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);

		todoLi1SelectChildrenButton.click();	// first click sets class='selected'

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(child1LiSelectButton.classList.contains('selected'), true);
		eq(child2LiSelectButton.classList.contains('selected'), true);

		todoLi1SelectChildrenButton.click();	// second click sets class=''

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);

		// Case two: child todos are not all selected or unselected, so they can't just be toggled

		child2LiSelectButton.classList.add('selected');

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), true);

		todoLi1SelectChildrenButton.click();	// first click sets class='selected'

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(child1LiSelectButton.classList.contains('selected'), true);
		eq(child2LiSelectButton.classList.contains('selected'), true);

		child1LiSelectButton.classList.remove('selected');
		eq(child1LiSelectButton.classList.contains('selected'), false);

		todoLi1SelectChildrenButton.click();	// second click sets class=''

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);
	},
	"The app should have a header section with an actions bar to hold action buttons.": function() {
		var actionsDiv = document.getElementById('actions');
		eq(actionsDiv.nodeName, 'DIV');
		eq(actionsDiv.parentElement.nodeName, 'HEADER');
	},
	"The header actions bar should have a 'Select all' button to select all displayed top-level todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var selectAllButton = document.getElementsByName('selectAll')[0];
		eq(selectAllButton.nodeName, 'BUTTON');
		eq(selectAllButton.innerText, 'Select all');
		eq(actionsDiv.children[0], selectAllButton); 
	},
	"Clicking the 'Select all' button should toggle its class 'selected'.": function() {
		var actionsDiv = document.getElementById('actions');
		var selectAllButton = document.getElementsByName('selectAll')[0];
		selectAllButton.classList.remove('selected');	// re-set to default

		eq(selectAllButton.classList.contains('selected'), false);

		selectAllButton.click();

		eq(selectAllButton.classList.contains('selected'), true);	
		
		selectAllButton.click();

		eq(selectAllButton.classList.contains('selected'), false);	
	},
	"When class is '', clicking the button should select all displayed top-level todos.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi2SelectButton = todoLi2.children[0];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);

		var selectAllButton = document.getElementsByName('selectAll')[0];
		selectAllButton.classList.remove('selected');	// re-set to default

		selectAllButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
	},
	"When class is 'selected', clicking the button should de-select all displayed top-level todos.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		todo2.markSelected(true);
		insertTodo(todos, todo2);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi2SelectButton = todoLi2.children[0];

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);

		var selectAllButton = document.getElementsByName('selectAll')[0];

		selectAllButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
	},
	"When a top-level todo is selected, the 'Select all' button class should be set to 'selected'.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi2SelectButton = todoLi2.children[0];
		var selectAllButton = document.getElementsByName('selectAll')[0];
		selectAllButton.classList.remove('selected');

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(selectAllButton.classList.contains('selected'), false);

		todoLi1SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(selectAllButton.classList.contains('selected'), true);

		todoLi2SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(selectAllButton.classList.contains('selected'), true);
	},
	"De-selecting the last selected top-level todo should set 'Select all' button class to ''.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi2SelectButton = todoLi2.children[0];
		var selectAllButton = document.getElementsByName('selectAll')[0];
		selectAllButton.classList.remove('selected');

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(selectAllButton.classList.contains('selected'), false);

		todoLi1SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(selectAllButton.classList.contains('selected'), true);

		todoLi2SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(selectAllButton.classList.contains('selected'), true);

		todoLi2SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(selectAllButton.classList.contains('selected'), true);

		todoLi1SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(selectAllButton.classList.contains('selected'), false);
	},
	"The header actions bar should have a 'Mark completed' button to mark selected todos completed.": function() {
		var actionsDiv = document.getElementById('actions');
		var markCompletedButton = document.getElementsByName('markCompleted')[0];
		eq(markCompletedButton.nodeName, 'BUTTON');
		eq(markCompletedButton.innerText, 'Mark completed');
		eq(actionsDiv.children[1], markCompletedButton); 
	},
	"Clicking the 'Mark completed' button should toggle its class 'completed'.": function() {
		var actionsDiv = document.getElementById('actions');
		var markCompletedButton = document.getElementsByName('markCompleted')[0];
		markCompletedButton.classList.remove('completed');	// re-set to default

		eq(markCompletedButton.classList.contains('completed'), false);

		markCompletedButton.click();
		
		eq(markCompletedButton.classList.contains('completed'), true);

		markCompletedButton.click();

		eq(markCompletedButton.classList.contains('completed'), false);
	},
	"When class is '', clicking the button should mark each selected todo completed.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi2SelectButton = todoLi2.children[0];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi3SelectButton = todoLi3.children[0];
		var todoLi3CompletedButton = todoLi3.children[1];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);

		var markCompletedButton = document.getElementsByName('markCompleted')[0];
		markCompletedButton.classList.remove('completed');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		markCompletedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
	},
	"When class is 'completed', clicking the button should mark each selected todo incomplete.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi2SelectButton = todoLi2.children[0];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi3SelectButton = todoLi3.children[0];
		var todoLi3CompletedButton = todoLi3.children[1];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);

		markCompletedButton = document.getElementsByName('markCompleted')[0];
		markCompletedButton.classList.remove('completed');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		markCompletedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);

		markCompletedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
	},
	"When a selected todo is marked completed, the 'Mark completed' button class should be set to 'completed'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);

		markCompletedButton = document.getElementsByName('markCompleted')[0];
		markCompletedButton.classList.remove('completed');	// re-set to default

		eq(markCompletedButton.classList.contains('completed'), false);

		todoLi1SelectButton.click();
		todoLi1CompletedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(markCompletedButton.classList.contains('completed'), true);
	},
	"When an unselected todo is marked completed, the 'Mark completed' button class should not change.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi2SelectButton = todoLi2.children[0];
		var todoLi2CompletedButton = todoLi2.children[1];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);

		markCompletedButton = document.getElementsByName('markCompleted')[0];
		markCompletedButton.classList.remove('completed');	// re-set to default

		eq(markCompletedButton.classList.contains('completed'), false);

		todoLi1CompletedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(markCompletedButton.classList.contains('completed'), false);

		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);

		todoLi2SelectButton.click();
		markCompletedButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);

		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);

		eq(markCompletedButton.classList.contains('completed'), true);

		todoLi1CompletedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);

		eq(markCompletedButton.classList.contains('completed'), true);
	},
	"If no selected todos are marked completed, the 'Mark completed' button class should be set to ''.": function() {
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
		var todoLi1SelectButton = todoLi1.children[0];
		var todoLi2SelectButton = todoLi2.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi2CompletedButton = todoLi2.children[1];
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var markCompletedButton = document.getElementsByName('markCompleted')[0];
		selectAllButton.classList.remove('selected');
		markCompletedButton.classList.remove('completed');

		// defaults
		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);

		eq(selectAllButton.classList.contains('selected'), false);
		eq(markCompletedButton.classList.contains('completed'), false);

		// todos selected, Mark Completed class should remain ''
		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(selectAllButton.classList.contains('selected'), true);
		eq(markCompletedButton.classList.contains('completed'), false);

		// a todo marked completed and selected, Mark Completed class should toggle on
		// (covered by previous test)
		todoLi1CompletedButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(selectAllButton.classList.contains('selected'), true);
		eq(markCompletedButton.classList.contains('completed'), true);

		// selected todo toggled to incompleted, Mark Completed class should toggle off
		todoLi1CompletedButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2CompletedButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(selectAllButton.classList.contains('selected'), true);
		eq(markCompletedButton.classList.contains('completed'), false);
		},
	"The header actions bar should have a 'Delete selected' button to delete selected todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		eq(deleteSelectedButton.nodeName, 'BUTTON');
		eq(deleteSelectedButton.innerText, 'Delete selected');
		eq(actionsDiv.children[2], deleteSelectedButton); 
	},
	"Clicking the 'Delete' button should toggle its class between 'deleted' and ''.": function() {
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		eq(deleteSelectedButton.classList.contains('deleted'), false);

		deleteSelectedButton.click();

		eq(deleteSelectedButton.classList.contains('deleted'), true);
		
		deleteSelectedButton.click();

		eq(deleteSelectedButton.classList.contains('deleted'), false);
	},
	"When class is '', clicking the button should de-select each selected todo and mark it deleted and undoable.": function() {
		fail();
	},
	"When class is 'deleted', clicking the button should mark each undoable todo undeleted and clear undoable.": function() {
		fail();
	},
	"Each time a todo is selected, the 'Delete' button class should be set to '' and all undoables should be cleared.": function() {
		fail();
	},
	"The header actions bar should have an 'All' button to show active and completed todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var showAllButton = document.getElementsByName('showAll')[0];
		eq(showAllButton.nodeName, 'BUTTON');
		eq(showAllButton.innerText, 'All');
		eq(actionsDiv.children[3], showAllButton); 
	},
	"Clicking the 'All' button should display active and completed todos.": function() {
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
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));			
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi1DeletedButton = todoLi1.children[2];
		var todoLi2 = todosUl.children[1];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi2DeletedButton = todoLi2.children[2];
		var todoLi3 = todosUl.children[2];
		var todoLi3CompletedButton = todoLi3.children[1];
		var todoLi3DeletedButton = todoLi3.children[2];

		eq(todosUl.childElementCount, 3);						// base case, no filter
		eq(todoLi1.id, todo1.id);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3.id, todo3.id);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi3DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);

		var showAllButton = document.getElementsByName('showAll')[0];

		showAllButton.click();									// test 'all' filter

		// Re-set dom element variables because showAll click handler erases old todolist content.
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompletedButton = todoLi1.children[1];
		todoLi1DeletedButton = todoLi1.children[2];
		todoLi2 = todosUl.children[1];
		todoLi2CompletedButton = todoLi2.children[1];
		todoLi2DeletedButton = todoLi2.children[2];
		todoLi3 = todosUl.children[2];

		eq(todosUl.childElementCount, 2);

		eq(todosUl.children[0], todoLi1);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);

		eq(todosUl.children[1], todoLi2);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		
		eq(todoLi3, undefined);
	},
	"The header actions bar should have an 'Active' button to show active (uncompleted) todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var showActiveButton = document.getElementsByName('showActive')[0];
		eq(showActiveButton.nodeName, 'BUTTON');
		eq(showActiveButton.innerText, 'Active');
		eq(actionsDiv.children[4], showActiveButton); 
	},
	"Clicking the 'Active' button should display active todos only.": function() {
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
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));			
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi1DeletedButton = todoLi1.children[2];
		var todoLi2 = todosUl.children[1];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi2DeletedButton = todoLi2.children[2];
		var todoLi3 = todosUl.children[2];
		var todoLi3CompletedButton = todoLi3.children[1];
		var todoLi3DeletedButton = todoLi3.children[2];

		eq(todosUl.childElementCount, 3);						// base case, no filter
		eq(todoLi1.id, todo1.id);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3.id, todo3.id);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi3DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);

		var showActiveButton = document.getElementsByName('showActive')[0];

		showActiveButton.click();								// test 'active' filter

		// Re-set dom element variables because showActive click handler erases old todolist content.
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompletedButton = todoLi1.children[1];
		todoLi1DeletedButton = todoLi1.children[2];
		todoLi2 = todosUl.children[1];
		todoLi3 = todosUl.children[2];

		eq(todosUl.childElementCount, 1);

		eq(todosUl.children[0], todoLi1);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);

		eq(todoLi2, undefined);
		eq(todoLi3, undefined);
	},
	"The header actions bar should have a 'Completed' button to show completed todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var showCompletedButton = document.getElementsByName('showCompleted')[0];
		eq(showCompletedButton.nodeName, 'BUTTON');
		eq(showCompletedButton.innerText, 'Completed');
		eq(actionsDiv.children[5], showCompletedButton); 
	},
	"Clicking the 'Completed' button should display completed todos only.": function() {
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
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));			
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi1DeletedButton = todoLi1.children[2];
		var todoLi2 = todosUl.children[1];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi2DeletedButton = todoLi2.children[2];
		var todoLi3 = todosUl.children[2];
		var todoLi3CompletedButton = todoLi3.children[1];
		var todoLi3DeletedButton = todoLi3.children[2];

		eq(todosUl.childElementCount, 3);						// base case, no filter
		eq(todoLi1.id, todo1.id);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3.id, todo3.id);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi3DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);

		var showCompletedButton = document.getElementsByName('showCompleted')[0];

		showCompletedButton.click();							// test 'completed' filter

		// Re-set dom element variables because showCompleted click handler erases old todolist content.
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompletedButton = todoLi1.children[1];
		todoLi1DeletedButton = todoLi1.children[2];

		eq(todosUl.childElementCount, 1);

		eq(todosUl.children[0], todoLi1);
		eq(todoLi1CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
	},
	"The header actions bar should have a 'Deleted' button to show deleted todos.": function() {
		var actionsDiv = document.getElementById('actions');
		var showDeletedButton = document.getElementsByName('showDeleted')[0];
		eq(showDeletedButton.nodeName, 'BUTTON');
		eq(showDeletedButton.innerText, 'Deleted');
		eq(actionsDiv.children[6], showDeletedButton); 
	},
	"Clicking the 'Deleted' button should display deleted todos only.": function() {
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
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));			
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1CompletedButton = todoLi1.children[1];
		var todoLi1DeletedButton = todoLi1.children[2];
		var todoLi2 = todosUl.children[1];
		var todoLi2CompletedButton = todoLi2.children[1];
		var todoLi2DeletedButton = todoLi2.children[2];
		var todoLi3 = todosUl.children[2];
		var todoLi3CompletedButton = todoLi3.children[1];
		var todoLi3DeletedButton = todoLi3.children[2];

		eq(todosUl.childElementCount, 3);						// base case, no filter
		eq(todoLi1.id, todo1.id);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2CompletedButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3.id, todo3.id);
		eq(todoLi3CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi3DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);

		var showDeletedButton = document.getElementsByName('showDeleted')[0];

		showDeletedButton.click();							// test 'deleted' filter

		// Re-set dom element variables because showDeleted click handler erases old todolist content.
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompletedButton = todoLi1.children[1];
		todoLi1DeletedButton = todoLi1.children[2];

		eq(todosUl.childElementCount, 1);

		eq(todosUl.children[0], todoLi1);
		eq(todoLi1CompletedButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);
	},
	"The app should have a button to undo last delete action.": function() {
		fail();
	},
	"createTodosUl should set todo.selected to false for every todo.": function() {
		// Startup or filtering should produce a clean slate with no selected todos.
		fail();
	},
	"If todos array is empty at startup, the app should create a new empty todo.": function() {
		fail();
	},
	"The app should have a button to add a todo to the end of the list.": function() {
		// In case filtering the list results in no displayed todos.
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
