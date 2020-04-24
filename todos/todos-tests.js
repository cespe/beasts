// Beasts 8. Nested todos 
//
// Protect properties of todo object in a closure?

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
	"A todo object should be created with an 'id' property of type String to store an identifier.": function() {
		newTodo = new Todo();
		eq(typeof newTodo.id, "string");
	},
	"Todo should take an entry of type String and store it in the todo object 'entry' property.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.entry, 'Item 1');
	},
	"If 'entry' argument is not a string or is missing, Todo should set todo entry property to an empty string.": function() {
		newTodo = new Todo();
		eq(newTodo.entry, '');
	},
	"A todo object should be created with a 'children' property of type Array to store nested todo objects.": function() {
		newTodo = new Todo();
		eq(Array.isArray(newTodo.children), true);
		eq(newTodo.children.length, 0);
	},
	"A todo object should be created with a 'selected' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.selected, false);
	},
	"A todo object should be created with a 'deleted' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.deleted, false);
	},
	"A todo object should be created with a 'stage' property of type String set to 'active'.": function() {
		newTodo = new Todo();
		eq(newTodo.stage, 'active');
	},
	"A todo object should be created with a 'collapsed' property of type Boolean set to false.": function() {
		// When false, expand children <ul> to show child todos; when true, collapse <ul> to hide them
		newTodo = new Todo();
		eq(newTodo.collapsed, false);
	},
	"A todo object should be created with a 'filteredIn' property of type Boolean set to true.": function() {
		// Created true because default stage is 'active' and the app only creates new todos when showActiveButton is '√ Active'.
		// When showActiveButton is 'Active', addTodo, addSibling, addChild buttons and key shortcuts are disabled.
		newTodo = new Todo();
		eq(newTodo.filteredIn, true);
	},
	"A todo object should be created with a 'filteredOutParentOfFiteredIn' property of type Boolean set to false.": function() {
		newTodo = new Todo();
		eq(newTodo.filteredOutParentOfFilteredIn, false);
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
	"The app should have a way to set a todo's 'stage' property to a value from todoStages set.": function() {
		newTodo = new Todo('Item 1');
		eq(newTodo.stage, 'active');
		eq(todoStages instanceof Set, true);
		// TODO test for error if value is not in todoStages
		newTodo.setStage('completed');
		eq(newTodo.stage, 'completed');
		newTodo.setStage('canceled');
		eq(newTodo.stage, 'canceled');
		newTodo.setStage('active');
		eq(newTodo.stage, 'active');
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
	"The app should have a way to mark a todo filtered in for display or not according to a supplied set of tags.": function() {
		// Tests todo.markFilteredIn(set)
		todo1 = new Todo('Item 1 active');
		todo2 = new Todo('Item 2 completed');
		todo3 = new Todo('Item 3 deleted');

		todo2.setStage('completed');
		todo3.markDeleted(true);

		filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#deleted');

		todo1.markFilteredIn(filterSet);
		todo2.markFilteredIn(filterSet);
		todo3.markFilteredIn(filterSet);

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(todo3.filteredIn, true);
	},
	"The app should have a way to mark a todo as a filtered-out parent of filtered-in todos according to a supplied set of display tags.": function() {
		// Tests todo.markFilteredOutParentOfFilteredIn();
		todo1 = new Todo('Item 1 filtered in');						// tagged active on creation
		todo2 = new Todo('Item 2 filtered-out parent');
		todo2.setStage('completed');
		child2 = new Todo('Item 2 child filtered-out parent');
		child2.setStage('completed');
		todo2.addChild(child2);
		grandchild2 = new Todo('Item 2 grandchild filtered in');
		grandchild2.markDeleted(true);
		child2.addChild(grandchild2);
		todo3 = new Todo('Item 3 filtered-out parent');
		todo3.setStage('completed');
		child3 = new Todo('Item 3 child filtered in');				// tagged active on creation		
		todo3.addChild(child3);

		var filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#deleted');

		todo1.markFilteredIn(filterSet);
		todo2.markFilteredIn(filterSet);
		child2.markFilteredIn(filterSet);
		grandchild2.markFilteredIn(filterSet);
		todo3.markFilteredIn(filterSet);
		child3.markFilteredIn(filterSet);

		// These are ordered to simulate recursion, needed for the function to work properly
		todo1.markFilteredOutParentOfFilteredIn();
		grandchild2.markFilteredOutParentOfFilteredIn();
		child2.markFilteredOutParentOfFilteredIn();
		todo2.markFilteredOutParentOfFilteredIn();
		child3.markFilteredOutParentOfFilteredIn();
		todo3.markFilteredOutParentOfFilteredIn();

		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(todo2.filteredOutParentOfFilteredIn, true);
		eq(child2.filteredOutParentOfFilteredIn, true);
		eq(grandchild2.filteredOutParentOfFilteredIn, false);
		eq(todo2.filteredOutParentOfFilteredIn, true);
		eq(child3.filteredOutParentOfFilteredIn, false);

	},
	"The app should have a way to insert a new todo after any todo in the array it is in.": function() {
		// Tests insertTodo(array, todoToInsert, todoBeforeInsertionPoint)
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
		// Tests deleteTodo(array, todo)
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
	"The app should have a way to update filter tags and apply them to all todos.": function() {
		// Tests applyDisplayTags(filterSet)
		todos = [];
		todo1 = new Todo('Item 1 filtered in');						// tagged active on creation
		todo2 = new Todo('Item 2 filtered-out parent');
		todo2.setStage('completed');
		child2 = new Todo('Item 2 child filtered in');				// tagged active on creation		
		todo2.addChild(child2);
		todo3 = new Todo('Item 3 filtered in');						// tagged active on creation
		todo4 = new Todo('Item 4 filtered-out parent');
		todo4.setStage('completed');
		child4 = new Todo('Item 4 child filtered-out parent');
		child4.setStage('completed');
		todo4.addChild(child4);
		grandchild1 = new Todo('Item 4 grandchild 1 filtered in');
		grandchild1.markDeleted(true);
		grandchild2 = new Todo('Item 4 grandchild 2 filtered out');
		grandchild2.setStage('completed');
		child4.addChild(grandchild1);
		child4.addChild(grandchild2);
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		insertTodo(todos, todo3);
		insertTodo(todos, todo4);

		var filterSet = new Set();
		filterSet.add('#active');
		filterSet.add('#deleted');

		applyDisplayTags(filterSet);

		eq(todo1.filteredIn, true);
		eq(todo2.filteredIn, false);
		eq(child2.filteredIn, true);
		eq(todo3.filteredIn, true);
		eq(todo4.filteredIn, false);
		eq(child4.filteredIn, false);
		eq(grandchild1.filteredIn, true);
		eq(grandchild2.filteredIn, false);

		eq(todo1.filteredOutParentOfFilteredIn, false);
		eq(todo2.filteredOutParentOfFilteredIn, true);
		eq(child2.filteredOutParentOfFilteredIn, false);
		eq(todo3.filteredOutParentOfFilteredIn, false);
		eq(todo4.filteredOutParentOfFilteredIn, true);
		eq(child4.filteredOutParentOfFilteredIn, true);
		eq(grandchild1.filteredOutParentOfFilteredIn, false);
		eq(grandchild2.filteredOutParentOfFilteredIn, false);
	},
	"The app should have a way to return a todo when given its id.": function() {
		// Tests findTodo(array, id)
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
	"The app should have a way to return the array holding a todo when given its id.": function() {
		// Tests findArray(array, id)
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

		var result = findArray(todos, todo2.id);
		eq(result, todos);
		var result = findArray(todos, child1.id);
		eq(result, todo1.children);
		var result = findArray(todos, child2.id);
		eq(result, todo1.children);
		var result = findArray(todos, grandchild1.id);
		eq(result, child1.children);
	},
	"The app should have a way to return the parent of a given todo.": function() {
		// Tests findParent(childTodo)
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
		item2Child1 = new Todo('Item 2 child 1');
		grandchild2 = new Todo('Item 2 child 1 grandchild 1');
		todo2.addChild(item2Child1);
		item2Child1.addChild(grandchild2);
		
		var result = findParent(todo1);
		eq(result, undefined);
		var result = findParent(todo2);
		eq(result, undefined);
		var result = findParent(child1);
		eq(result, todo1);
		var result = findParent(child2);
		eq(result, todo1);
		var result = findParent(grandchild1);
		eq(result, child1);
		var result = findParent(item2Child1);
		eq(result, todo2);
		var result = findParent(grandchild2);
		eq(result, item2Child1);
	},
	"The app should have a way to determine if any todos, including nested todos, are selected.": function() {
		// Tests anySelectedTodos(array)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo2Child1 = new Todo('Item 2 child 1');
		todo2Grandchild1 = new Todo('Item 2 child 1 grandchild 1');
		todo2.addChild(todo2Child1);
		todo2Child1.addChild(todo2Grandchild1);
		
		eq(anySelectedTodos(todos), false);
		todo1.selected = true;
		eq(anySelectedTodos(todos), true);
		todo1.selected = false;
		eq(anySelectedTodos(todos), false);

		child1.selected = true;
		eq(anySelectedTodos(todos), true);
		child1.selected = false;
		eq(anySelectedTodos(todos), false);

		child2.selected = true;
		eq(anySelectedTodos(todos), true);
		child2.selected = false;
		eq(anySelectedTodos(todos), false);

		grandchild1.selected = true;
		eq(anySelectedTodos(todos), true);
		grandchild1.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2.selected = true;
		eq(anySelectedTodos(todos), true);
		todo2.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2Child1.selected = true;
		eq(anySelectedTodos(todos), true);
		todo2Child1.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2Grandchild1.selected = true;
		eq(anySelectedTodos(todos), true);
		todo2Grandchild1.selected = false;
		eq(anySelectedTodos(todos), false);

		todo2Grandchild1.selected = true;
		eq(anySelectedTodos(todo2.children), true);
		todo2Grandchild1.selected = false;
		eq(anySelectedTodos(todo2.children), false);
	},
	"The app should have a way to determine if any todos, including nested todos, are unselected.": function() {
		// Tests anyUnselectedTodos(array)
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		grandchild1 = new Todo('Item 1 child 1 grandchild 1');
		child1.addChild(grandchild1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo2Child1 = new Todo('Item 2 child 1');
		todo2Grandchild1 = new Todo('Item 2 child 1 grandchild 1');
		todo2.addChild(todo2Child1);
		todo2Child1.addChild(todo2Grandchild1);
		
		todo1.selected = true;
		child1.selected = true;
		child2.selected = true;
		grandchild1.selected = true;
		todo2.selected = true;
		todo2Child1.selected = true;
		todo2Grandchild1.selected = true;

		eq(anyUnselectedTodos(todos), false);
		
		todo1.selected = false;
		eq(anyUnselectedTodos(todos), true);
		todo1.selected = true;
		eq(anyUnselectedTodos(todos), false);

		child1.selected = false;
		eq(anyUnselectedTodos(todos), true);
		child1.selected = true;
		eq(anyUnselectedTodos(todos), false);

		child2.selected = false;
		eq(anyUnselectedTodos(todos), true);
		child2.selected = true;
		eq(anyUnselectedTodos(todos), false);

		grandchild1.selected = false;
		eq(anyUnselectedTodos(todos), true);
		grandchild1.selected = true;
		eq(anyUnselectedTodos(todos), false);

		todo2.selected = false;
		eq(anyUnselectedTodos(todos), true);
		todo2.selected = true;
		eq(anyUnselectedTodos(todos), false);

		todo2Child1.selected = false;
		eq(anyUnselectedTodos(todos), true);
		todo2Child1.selected = true;
		eq(anyUnselectedTodos(todos), false);

		todo2Grandchild1.selected = false;
		eq(anyUnselectedTodos(todos), true);
		todo2Grandchild1.selected = true;
		eq(anyUnselectedTodos(todos), false);

		todo2Grandchild1.selected = false;
		eq(anyUnselectedTodos(todo2.children), true);
		todo2Grandchild1.selected = true;
		eq(anyUnselectedTodos(todo2.children), false);
	},
	"The app should have a way to build a todoLi element from a todo object.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);

		eq(todoLi.nodeName, 'LI');
		eq(todoLi.querySelector('p').textContent, 'Item 1');	
	},
	"Each todoLi should have an id equal to todo.id.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.id, todo1.id);
	},
	"The app should build a parent-placeholder todoLi when a todo's filteredOutParent property is true.": function() {
		// Tests createParentPlaceholderLi(todo)
		var todo1 = new Todo('Item 1 filtered-out parent');
//		todo1.tagDeleted(true);
//		var filterSet = new Set();
//		filterSet.add('#active');
//		todo1.markFilteredIn(filterSet);
//		child1 = new Todo('Item 1 child 1 filtered in');
//		todo1.addChild(child1);
//		child1.markFilteredIn(filterSet);
//		todo1.markFilteredOutParentOfFilteredIn();

//		eq(todo1.filteredIn, true);
//		eq(todo1.filteredOutParentOfFilteredIn, true);
//		eq(child1.filteredIn, true);

		var todo1ParentPlaceholderLi = createParentPlaceholderLi(todo1);

		eq(todo1ParentPlaceholderLi.nodeName, 'LI');
		eq(todo1ParentPlaceholderLi.id, todo1.id);
		
	},
	"A parent-placeholder todoLi should include a <p> element for its todo entry but it should not be editable.": function() {
		var todo1 = new Todo('Item 1 filtered-out parent');
		var todo1ParentPlaceholderLi = createParentPlaceholderLi(todo1);
		var todo1ParentPlaceholderLiEntry = todo1ParentPlaceholderLi.querySelector('p');

		eq(todo1ParentPlaceholderLiEntry.nodeName, 'P');
		eq(todo1ParentPlaceholderLiEntry.contentEditable, 'false');

	},
	"A parent placeholder li should have class 'parent-placeholder' on its entry.": function() {
		var todo1 = new Todo('Item 1 filtered-out parent');
		var todo1ParentPlaceholderLi = createParentPlaceholderLi(todo1);
		var todo1ParentPlaceholderLiEntry = todo1ParentPlaceholderLi.querySelector('p');

		eq(todo1ParentPlaceholderLiEntry.classList.contains('parent-placeholder'), true);
	}, 
	"The app should have a way to generate a ul element from an array of todos.": function() {
		// Tests createTodosUl
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		var filterSet = generateFilterSet();
		applyDisplayTags(filterSet);

		var topLevelUl = createTodosUl(todos);

		// Case: top-level <ul>

		eq(topLevelUl.nodeName, 'UL');
		eq(topLevelUl.childElementCount, 2);
		eq(topLevelUl.children[0].querySelector('p').textContent, 'Item 1');
		eq(topLevelUl.children[1].querySelector('p').textContent, 'Item 2');

		// Case: nested <ul>
		
		var childLevelUl = topLevelUl.children[0].querySelector('ul');

		eq(childLevelUl.nodeName, 'UL');
		eq(childLevelUl.childElementCount, 2);
		eq(childLevelUl.children[0].querySelector('p').textContent, 'Item 1 child 1');
		eq(childLevelUl.children[1].querySelector('p').textContent, 'Item 1 child 2');
	},
	"When loaded, the app should display todos.": function() {
		// Tests renderTodolist()
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		renderTodolist();
		
		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.querySelector('p').textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.querySelector('p').textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.querySelector('p').textContent;
		eq(todo3LiEntry, 'Item 3');
	},
	"When loaded, the app should also display nested todos.": function() {
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
		
		renderTodolist();

		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.querySelector('p').textContent;
		eq(todo1LiEntry, 'Item 1');
		
		var todo1LiUl = todo1Li.querySelector('ul');
		var todo1LiChild1Li = todo1LiUl.children[0];
		var todo1LiChild1LiEntry = todo1LiChild1Li.querySelector('p').textContent;
		eq(todo1LiChild1LiEntry, 'Item 1 child 1');
		
		var todo1LiChild2Li = todo1LiUl.children[1];
		var todo1LiChild2LiEntry = todo1LiChild2Li.querySelector('p').textContent;
		eq(todo1LiChild2LiEntry, 'Item 1 child 2');
		
		var todo2Li = document.getElementById(todo2.id);
		var todo2LiEntry = todo2Li.querySelector('p').textContent;
		eq(todo2LiEntry, 'Item 2');

		var todo3Li = document.getElementById(todo3.id);
		var todo3LiEntry = todo3Li.querySelector('p').textContent;
		eq(todo3LiEntry, 'Item 3');
	},
	"When loaded, the app should display filtered-out parent todos when necessary to display filtered-in child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1 filtered-out parent');
		todo1.markDeleted(true);
		child1 = new Todo('Item 1 child 1 filtered in');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();
		
		var todo1Li = document.getElementById(todo1.id);
		var todo1LiEntry = todo1Li.children[0];

		eq(todo1.filteredIn, false);
		eq(todo1.filteredOutParentOfFilteredIn, true);
		eq(child1.filteredIn, true);
		eq(todo1LiEntry.classList.contains('parent-placeholder'), true);
	},
	"The app should have a way to insert the first todoLi into an empty todos list.": function() {
		todolist.innerHTML = '';
		todos = [];

		insertNewTodoLi(todos);
		
		eq(todos.length, 1);
		eq(todos[0].entry, '');

		todosUl = todolist.children[0];
		eq(todosUl.childElementCount, 1);
		eq(todosUl.children[0].querySelector('p').textContent, '');
	},
	"The app should have a way to insert a new sibling todo after a given todo.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todos.length, 1);
		eq(todos[0].entry, 'Item 1');
		eq(todosUl.childElementCount, 1);
		eq(todoLi1.querySelector('p').textContent, 'Item 1');
		
		insertNewTodoLi(todos, todo1);				// insert a new todo after the existing one

		todosUl = todolist.children[0];

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todosUl.children[1].querySelector('p').textContent, '');

		var todo2 = todos[1];
		eq(todosUl.children[1].id, todo2.id);

		insertNewTodoLi(todos, todo1);				// insert a third todo between the two existing todos

		todosUl = todolist.children[0];

		eq(todos.length, 3)
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 3);
		eq(todosUl.children[0].querySelector('p').textContent, 'Item 1');
		eq(todosUl.children[1].querySelector('p').textContent, '');
		eq(todosUl.children[2].id, todo2.id);
		eq(todos[2], todo2);
	},
	"The app should have a way to nest a new child todo under a given todo.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		eq(todoLi1.querySelector('ul'), null);
		eq(todoLi1.querySelector('p').textContent, 'Item 1');

		appendNewChildTodoLi(todo1);				// case of first child added to a new UL

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');

		eq(todoLi1Ul.childElementCount, 1);
		eq(todoLi1Ul.nodeName, "UL");

		var child1 = todo1.children[0];
		var child1Li = todoLi1Ul.children[0];

		eq(todoLi1Ul.children[0], child1Li);	
		eq(child1.id, child1Li.id);
		eq(child1Li.nodeName, "LI");

		appendNewChildTodoLi(todo1);				// case of second child added to existing UL

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');

		eq(todoLi1Ul.childElementCount, 2);
		eq(todoLi1Ul.nodeName, "UL");

		var child2 = todo1.children[1];
		var child2Li = todoLi1Ul.children[1];
		
		eq(todoLi1Ul.children[1], child2Li);	
		eq(child2.id, child2Li.id);
		eq(child2Li.nodeName, "LI");
	},
	"A todoLi should allow for editing its todo entry.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todoLi1Entry.textContent, 'Item 1');
		eq(todoLi1Entry.contentEditable, 'true');

	},
	"An empty todo should be created in editing mode for text entry (close devtools to pass test).": function() {
		// Devtools must be closed for the focus() tests below to pass.
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];

		insertNewTodoLi(todos, todo1);				// insert a new todo after the existing one

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todos.length, 2);
		eq(todos[1].entry, '');
		eq(todosUl.childElementCount, 2);
		eq(todoLi2Entry.textContent, '');
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todo1);					// case of first child added to a new UL

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi = todoLi1Ul.children[0];
		var childLiEntry = childLi.querySelector('p');
		eq(document.activeElement, childLiEntry);
		eq(document.hasFocus(), true);

		appendNewChildTodoLi(todo1);					// case of second child added to existing UL

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		var child2Li = todoLi1Ul.children[1];
		var child2LiEntry = child2Li.querySelector('p');
		eq(document.activeElement, child2LiEntry);
		eq(document.hasFocus(), true);
	},
	"When editing, losing focus on the todoLi should save the revised entry (close devtools to pass test).": function() {
		// Devtools must be closed for the tests below to pass.
		todolist.innerHTML = '';
		todos = [];
		insertNewTodoLi(todos);
		eq(todos[0].entry, "");						// state before edit
		var todo1 = todos[0];
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1Entry = todoLi1.querySelector('p');
		todoLi1Entry.textContent = "test";			// simulate edit

		todoLi1AddSiblingButton.click();			// todoLi1 loses focus, firing focusout event

		eq(todos[0].entry, "test");					// state after edit

		todosUl = todolist.children[0];
		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todoLi2Entry.textContent, '');
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);
	},
	"Section: todoLi buttons": function() {
	},
	"Each todo li should have a 'select' button to toggle 'selected/unselected'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children.namedItem('select').nodeName, 'BUTTON');
		eq(todoLi.children.namedItem('select').name, 'select');
	},
	"If a todo is not selected, its todoLi 'select' button should be 'Select' and it should be disabled.": function() {
		todos = []
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.disabled, true);
	},
	"If a todo is selected, its todoLi 'select' button should be 'Unselect' and it should not be disabled.": function() {
		todos = []
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.disabled, false);
	},
	"If a todo is selected, its todoLi entry <p> class should contain 'highlighted'.": function() {
		todos = []
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo1);
		insertTodo(todos, todo2);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todo1.selected, true);
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todo2.selected, false);
		eq(todoLi2Entry.classList.contains('highlighted'), false);
	},
	"Clicking a 'select' button should toggle button text and todo.selected and re-render todoLi": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);		// must start with todo selected, otherwise 'Select' button will be disabled for test
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todo1.selected, true);

		todoLi1SelectButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectButton = todoLi1.children.namedItem('select');
		todoLi1Entry = todoLi1.querySelector('p');
		
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);

/*		todoLi1SelectButton.click();		// button is disabled, can't click it so can't test toggling again

		todoLi1 = todolist.children[0].children[0];
		todoLi1SelectButton = todoLi1.children.namedItem('select');
		todoLi1Entry = todoLi1.querySelector('p');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
*/
	},
	"Selecting a todo should not select its children.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi2 = todoLi1Ul.children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2Entry = childLi2.querySelector('p');

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		
		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		
		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2Entry.classList.contains('highlighted'), false);

		todoLi1SelectButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		childLi2 = todoLi1Ul.children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2Entry = childLi2.querySelector('p');

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		
		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		
		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2Entry.classList.contains('highlighted'), false);
	},
	"Each todoLi should have a 'complete' button to toggle 'Complete/Uncomplete'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children.namedItem('complete').nodeName, 'BUTTON');
		eq(todoLi.children.namedItem('complete').name, 'complete');
	},
	"If a todo is not completed, its todoLi 'complete' button text should be 'Complete'": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todo1.stage === 'completed', false);
	},
	"If todo is completed, todoLi 'complete' button text should be 'Uncomplete'.": function () {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.stage = 'completed';
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todo1.stage === 'completed', true);
	},
	"If todo is not completed, todoLi entry <p> class should not contain 'struck-completed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), false);
	},
	"If todo is completed, todoLi entry <p> class should contain 'struck-completed'.": function () {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.stage = 'completed';
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', true);
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), true);
	},
	"Clicking a todoLi 'complete' button should tag the todo complete and re-render the todoLi.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);

		todoLi1CompleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);

		todoLi1CompleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
	},
	"Marking a todo completed should not mark its children completed.": function() {
		// because then marking uncompleted could incorrectly reverse some child values
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];
		var todoLi1Child1CompleteButton = todoLi1Child1.children.namedItem('complete');
		var todoLi1Child2CompleteButton = todoLi1Child2.children.namedItem('complete');

		eq(todo1.stage === 'completed', false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), false);
		eq(child1.stage === 'completed', false);
		eq(todoLi1Child1CompleteButton.textContent, 'Complete');
		eq(todoLi1Child1.querySelector('p').classList.contains('struck-completed'), false);
		eq(child2.stage === 'completed', false);
		eq(todoLi1Child2CompleteButton.textContent, 'Complete');
		eq(todoLi1Child2.querySelector('p').classList.contains('struck-completed'), false);

		todoLi1CompleteButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child2 = todoLi1Ul.children[1];
		todoLi1Child1CompleteButton = todoLi1Child1.children.namedItem('complete');
		todoLi1Child2CompleteButton = todoLi1Child2.children.namedItem('complete');

		eq(todo1.stage === 'completed', true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1.querySelector('p').classList.contains('struck-completed'), true);
		eq(child1.stage === 'completed', false);
		eq(todoLi1Child1CompleteButton.textContent, 'Complete');
		eq(todoLi1Child1.querySelector('p').classList.contains('struck-completed'), false);
		eq(child2.stage === 'completed', false);
		eq(todoLi1Child2CompleteButton.textContent, 'Complete');
		eq(todoLi1Child2.querySelector('p').classList.contains('struck-completed'), false);
	},
	"Each todo li should have a 'delete' button to toggle 'Delete/Undelete'.": function() {
		todos = [];
		var todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todoLi = createTodoLi(todo1);
		eq(todoLi.children.namedItem('delete').nodeName, 'BUTTON');
		eq(todoLi.children.namedItem('delete').name, 'delete');
	},
	"If a todo is not deleted, its todoLi 'deleted' button text should be 'Delete'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
	},
	"If todo is deleted, its todoLi 'deleted' button text should be 'Undelete'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);
		
		showDeletedButton.textContent = '√ Deleted';		// required for renderTodolist to generate the todoLi

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
	},
	"If todo is not deleted, its todoLi entry should not contain class 'faded-deleted'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.deleted, false);
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), false);
	},
	"If todo is deleted, its todoLi entry should contain class 'faded-deleted'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todo1.deleted, true);
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), true);
	},
	"Clicking a 'deleted' button should toggle button text and todo.deleted and re-render the todoLi.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), false);

		todoLi1DeleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), true);

		todoLi1DeleteButton.click();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

		eq(todo1.deleted, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1.querySelector('p').classList.contains('faded-deleted'), false);
	},
	"Deleting a todo should not delete its children.": function() {
		// The children are just along for the ride
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1DeletedButton = todoLi1.children.namedItem('delete');
		var todoLi1Child1DeletedButton = todoLi1.querySelector('ul').children[0].children.namedItem('delete');
		var todoLi1Child2DeletedButton = todoLi1.querySelector('ul').children[1].children.namedItem('delete');

		eq(todoLi1DeletedButton.textContent, 'Delete');
		eq(todo1.deleted, false);
		eq(todoLi1Child1DeletedButton.textContent, 'Delete');
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.textContent, 'Delete');
		eq(child2.deleted, false);

		todoLi1DeletedButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1DeletedButton = todoLi1.children.namedItem('delete');
		var todoLi1Child1DeletedButton = todoLi1.querySelector('ul').children[0].children.namedItem('delete');
		var todoLi1Child2DeletedButton = todoLi1.querySelector('ul').children[1].children.namedItem('delete');

		eq(todoLi1DeletedButton.textContent, 'Undelete');
		eq(todo1.deleted, true);
		eq(todoLi1Child1DeletedButton.textContent, 'Delete');
		eq(child1.deleted, false);
		eq(todoLi1Child2DeletedButton.textContent, 'Delete');
		eq(child2.deleted, false);
	},
	"Each todo li should have an 'addSibling' button to add a sibling todo after it.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddSibling = todoLi1.children.namedItem('addSibling');

		eq(todoLi1AddSibling.nodeName, 'BUTTON');
		eq(todoLi1AddSibling.name, 'addSibling');
		eq(todoLi1AddSibling.textContent, 'Add sibling');
	},
	"Clicking an 'addSibling' button should create a new sibling todo, re-render todolist, and focus new todoLi entry <p>.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1SiblingButton = todoLi1.children.namedItem('addSibling');
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child1AddSiblingButton = todoLi1Child1.children.namedItem('addSibling');

		eq(todosUl.childElementCount, 1);
		eq(todoLi1Ul.childElementCount, 1);
		eq(todo1.children[0].id, todoLi1Child1.id);

		todoLi1SiblingButton.click();				// Add a sibling at top level to todos array

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		todoLi1Child1AddSiblingButton = todoLi1Child1.children.namedItem('addSibling');
		var todoLi2 = todosUl.children[1]			// the added sibling
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todosUl.childElementCount, 2);
		eq(todoLi2.nodeName, 'LI');
		eq(todoLi2.id, todos[1].id)
		eq(document.activeElement, todoLi2Entry);
		eq(document.hasFocus(), true);				// doesn't pass unless console is closed

		todoLi1Child1AddSiblingButton.click();		// Add a sibling at nested level to todo.children array

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];	// the added sibling
		var todoLi1Child2Entry = todoLi1Child2.querySelector('p');

		eq(todoLi1Ul.childElementCount, 2);
		eq(todoLi1Child2.nodeName, 'LI');
		eq(todo1.children[1].id, todoLi1Child2.id);
		eq(document.activeElement, todoLi1Child2Entry);
		eq(document.hasFocus(), true);				// doesn't pass unless console is closed
	},
	"Each todo li should have an 'addChild' button to add a child todo underneath it.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1AddChild = todoLi1.children.namedItem('addChild');

		eq(todoLi1AddChild.nodeName, 'BUTTON');
		eq(todoLi1AddChild.name, 'addChild');
		eq(todoLi1AddChild.textContent, 'Add child');
	},
	"Clicking an 'addChild' button should create a new nested child todo, re-render todolist, and focus new todoLi entry <p>.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		todoLi1Ul = todoLi1.querySelector('ul');

		eq(todosUl.childElementCount, 1);
		eq(todo1.children[0], undefined);
		eq(todoLi1Ul, null);

		todoLi1AddChildButton.click();

		todo1 = todos[0];
		child1 = todo1.children[0];
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		var todoLi1Ul = todoLi1.querySelector('ul')
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child1Entry = todoLi1Child1.querySelector('p');

		eq(todosUl.childElementCount, 1);
		neq(todoLi1Ul, null);
		eq(todoLi1Ul.childElementCount, 1);

		eq(todo1.children[0].entry, "");
		eq(todoLi1Child1.nodeName, 'LI');
		eq(todoLi1Child1.id, child1.id)
		eq(child1.entry === "", true);
		eq(todoLi1Child1Entry.textContent, "");
		eq(document.activeElement, todoLi1Child1Entry);
		eq(document.hasFocus(), true);					// doesn't pass unless console is closed
	},
	"Clicking an addChild button should set todo.collapsed false and display nested todos on re-render.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		
		todoLi1AddChildButton.click();

		todo1 = todos[0]
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		todoLi1Ul = todoLi1.querySelector('ul');
		var child1 = todo1.children[0];
		var childLi1 = todoLi1Ul.children[0];

		eq(todo1.collapsed, false);
		eq(todo1.children.length, 1);
		eq(todo1.children[0], child1);
		eq(todoLi1Ul.children[0], childLi1);

		todo1.collapsed = true;

		todoLi1AddChildButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		child1 = todo1.children[0];
		childLi1 = todoLi1Ul.children[0];
		var child2 = todo1.children[1];
		var childLi2 = todoLi1Ul.children[1];

		eq(todo1.collapsed, false);
		eq(todo1.children.length, 2);
		eq(todo1.children[0], child1);
		eq(todo1.children[1], child2);
		eq(todoLi1Ul.children[0], childLi1);
		eq(todoLi1Ul.children[1], childLi2);
	},
	"Each todoLi should have a disabled-by-default 'undoEdit' button to revert changes to the entry.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1UndoEditButton = todoLi1.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.nodeName, 'BUTTON');
		eq(todoLi1UndoEditButton.name, 'undoEdit');
		eq(todoLi1UndoEditButton.textContent, 'Undo edit');
		eq(todoLi1UndoEditButton.disabled, true);
	},
	"undoEditButton should become enabled when a todoLi entry is edited.": function() {
		manual();
		// app code works, TODO need to figure out synthetic events
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// simulate input
		todoLi1Entry.textContent = 'Item 11';	// doesn't trigger an input event so doesn't signal an edit
		var testEvent = new Event('input');
		todoLi1Entry.dispatchEvent(testEvent);	// doesn't trigger app event handler

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		addTodoButton.click();

		todoLi1 = todolist.children[0].children[0];
		todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');
		var todoLi2 = todolist.children[0].children[1];
		var todoLi2UndoEditButton = todoLi2.children.namedItem('undoEdit');
		var todoLi2Entry = todoLi2.querySelector('p');
		
		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi2Entry.textContent, '');

		// simulate pasted input
		// Code to paste 'Item 2' with a synthetic paste event to trigger the input event
		todoLi2Entry.textContent = 'Item 2';	// doesn't trigger an input event so doesn't signal an edit

		eq(todoLi2UndoEditButton.disabled, false);
		eq(todoLi2Entry.textContent, 'Item 2');
	},
	"undoEditButton should be disabled when an edit is completed.": function() {
		manual();
		// app code works, TODO need to figure out synthetic events
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// Case 1: edit completed with undoEditButton click

		// TODO code to append a '1' with a synthetic key event

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		todoLi1UndoEditButton.click();

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLiEntry.textContent, 'Item 1');

		// Case 2: edit completed when entry loses focus

		// TODO code to append a '1' with a synthetic key event

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		addTodoButton.click();	// edit over as entry loses focus

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');
	},
	"Clicking undoEditButton should revert text of todo being edited to old version and set undoEditButton disabled.": function() {
		manual();
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi1UndoEditButton = todoLi.children.namedItem('undoEdit');

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// TODO need to trigger an input event here
		// Activate undoEditButton programmatically in lieu of firing an input event
		todoLi1Entry.textContent = 'Item 11';

		eq(todoLi1UndoEditButton.disabled, false);
		eq(todoLi1Entry.textContent, 'Item 11');

		todoLi1UndoEditButton.click();

		eq(todoLi1UndoEditButton.disabled, true);
		eq(todoLi1Entry.textContent, 'Item 1');

		// TODO should entry still have focus?
	},
	"Each todoLi with children should have a showChildren button to expand/collapse nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todoLi1ShowChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1ShowChildrenButton.name, 'showChildren');
	},
	"If a todo has no children, todoLi should be created without a showChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];

		eq(todoLi1.children.namedItem('showChildren'), null);
	},
	"If a todo has children and todo.collapsed is true, todoLi should be created with showChildren button text 'Show children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCollapsed(true);
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, true);
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');
},
	"If a todo has children and todo.collapsed is false, todoLi should be created with showChildren button text 'Hide children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
},
	"If showChildren button text is 'Hide children', css should preserve spacing above the following entry.": function() {
		fail();
},
	"Clicking a showChildren button should toggle button text and re-render todoLis.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, false);
		eq(child1.id, childLi1.id);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');

		todoLi1ShowChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		
		eq(todo1.collapsed, true);
		eq(todoLi1Ul, null);			// childLi1 not created on re-render
		eq(todoLi1ShowChildrenButton.textContent, 'Show children');

		todoLi1ShowChildrenButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi1 = todoLi1Ul.children[0];
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todo1.collapsed, false);
		eq(child1.id, childLi1.id);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
	},
	"If a todo has children, its todoLi should have a 'selectChildren' button to select them.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1SelectChildrenButton.name, 'selectChildren');
	},
	"If a todo has no children, its todoLi should not have a 'selectChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton, null);
	},
	"If todo.collapsed is true, its todoLi should be created with selectChildren button disabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCollapsed(true);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.disabled, true);
	},
	"If todo.collapsed is false, its todoLi should be created with selectChildren button enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.disabled, false);
	},
	"If any filtered-in todo children are selected, todoLi 'selectChildren' button text should be 'Unselect children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		child1.markSelected(true);
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
	},
	"Otherwise, todoLi 'selectChildren' button text should be 'Select children'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
	},
	"Clicking a selectChildren button should toggle button text and children's todo.selected, Select button text and class, and entry <p> class.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiSelectButton = child1Li.children.namedItem('select');
		var child1LiEntry = child1Li.querySelector('p');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiSelectButton = child2Li.children.namedItem('select');
		var child2LiEntry = child2Li.querySelector('p');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child1LiEntry.classList.contains('highlighted'), false);
		eq(child2LiEntry.classList.contains('highlighted'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(child1.selected, true);
		eq(child2.selected, true);
		eq(child1LiSelectButton.textContent, 'Unselect');
		eq(child2LiSelectButton.textContent, 'Unselect');
		eq(child1LiEntry.classList.contains('highlighted'), true);
		eq(child2LiEntry.classList.contains('highlighted'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child1LiEntry.classList.contains('highlighted'), false);
		eq(child2LiEntry.classList.contains('highlighted'), false);
	},
	"The selectChildren button should operate on displayed child todos only.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		child2.markDeleted(true);
		todo1.addChild(child2);
		child3 = new Todo('Item 1 child 3');
		todo1.addChild(child3);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiSelectButton = child1Li.children.namedItem('select');
		var child1LiEntry = child1Li.querySelector('p');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiSelectButton = child2Li.children.namedItem('select');
		var child2LiEntry = child2Li.querySelector('p');
		var child3Li = todoLi1.querySelector('ul').children[2];
		var child3LiSelectButton = child3Li.children.namedItem('select');
		var child3LiEntry = child3Li.querySelector('p');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child3LiSelectButton.textContent, 'Select');
		eq(child1LiEntry.classList.contains('highlighted'), false);
		eq(child2LiEntry.classList.contains('highlighted'), false);
		eq(child3LiEntry.classList.contains('highlighted'), false);
		eq(child2Li.classList.contains('deleted-removed'), true);		// not displayed so won't be selected

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(child1.selected, true);
		eq(child2.selected, false);
		eq(child3.selected, true);
		eq(child1LiSelectButton.textContent, 'Unselect');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child3LiSelectButton.textContent, 'Unselect');
		eq(child1LiEntry.classList.contains('highlighted'), true);
		eq(child2LiEntry.classList.contains('highlighted'), false);
		eq(child3LiEntry.classList.contains('highlighted'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child3LiSelectButton.textContent, 'Select');
		eq(child1LiEntry.classList.contains('highlighted'), false);
		eq(child2LiEntry.classList.contains('highlighted'), false);
		eq(child3LiEntry.classList.contains('highlighted'), false);
	}, 
	"The selectChildren button should operate recursively on displayed nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		grandchild1 = new Todo('Item 1 child 1 child 1');
		child1.addChild(grandchild1);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		child2.markDeleted(true);
		todo1.addChild(child2);
		child3 = new Todo('Item 1 child 3');
		todo1.addChild(child3);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiSelectButton = child1Li.children.namedItem('select');
		var child1LiEntry = child1Li.querySelector('p');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiSelectButton = grandchild1Li.children.namedItem('select');
		var grandchild1LiEntry = grandchild1Li.querySelector('p');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiSelectButton = child2Li.children.namedItem('select');
		var child2LiEntry = child2Li.querySelector('p');
		var child3Li = todoLi1.querySelector('ul').children[2];
		var child3LiSelectButton = child3Li.children.namedItem('select');
		var child3LiEntry = child3Li.querySelector('p');

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(grandchild1.selected, false);
		eq(child2.selected, false);
		eq(child3.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(grandchild1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child3LiSelectButton.textContent, 'Select');
		eq(child1LiEntry.classList.contains('highlighted'), false);
		eq(grandchild1LiEntry.classList.contains('highlighted'), false);
		eq(child2LiEntry.classList.contains('highlighted'), false);
		eq(child3LiEntry.classList.contains('highlighted'), false);
		eq(child2Li.classList.contains('deleted-removed'), true);		// not displayed so won't be selected

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(child1.selected, true);
		eq(grandchild1.selected, true);
		eq(child2.selected, false);
		eq(child3.selected, true);
		eq(child1LiSelectButton.textContent, 'Unselect');
		eq(grandchild1LiSelectButton.textContent, 'Unselect');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child3LiSelectButton.textContent, 'Unselect');
		eq(child1LiEntry.classList.contains('highlighted'), true);
		eq(grandchild1LiEntry.classList.contains('highlighted'), true);
		eq(child2LiEntry.classList.contains('highlighted'), false);
		eq(child3LiEntry.classList.contains('highlighted'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(child1.selected, false);
		eq(child2.selected, false);
		eq(grandchild1.selected, false);
		eq(child3.selected, false);
		eq(child1LiSelectButton.textContent, 'Select');
		eq(grandchild1LiSelectButton.textContent, 'Select');
		eq(child2LiSelectButton.textContent, 'Select');
		eq(child3LiSelectButton.textContent, 'Select');
		eq(child1LiEntry.classList.contains('highlighted'), false);
		eq(grandchild1LiEntry.classList.contains('highlighted'), false);
		eq(child2LiEntry.classList.contains('highlighted'), false);
		eq(child3LiEntry.classList.contains('highlighted'), false);
	}, 
	"Clicking a 'root' (i.e. Select button inactive) selectChildren button should toggle 'inactive' on complete, delete, addSibling, addChild and showChildren buttons.": function() {
		// By design, hide regular parent buttons to concentrate attention on the selected children.
		// TODO Editing the parent entry or using addSibling and addChild keyboard shortcuts should also be disabled.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
	},
	"Clicking a 'branch' (i.e. Select button active) selectChildren button should not toggle 'inactive' on complete, delete, addSibling, addChild and showChildren buttons.": function() {
		// By design, hide regular parent buttons to concentrate attention on the selected children.
		// TODO Using addSibling and addChild keyboard shortcuts should also be disabled.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];

		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');

		var childLi1 = todoLi1.querySelector('ul').children[0];

		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');
		var childLi1ShowChildrenButton = childLi1.children.namedItem('showChildren');

		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
	},
	"Clicking a root selectChildren button should toggle 'inactive' on completeSelectedChildren and deleteSelectedChildren buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
	},
	"If root selectChildren button text is 'Select children', clicking it should set completeSelectedChildren button text to 'Complete selected children' if all children are not marked completed.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markCompleted(true);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var childLi1 = todoLi1.querySelector('ul').children[0];
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2 = todoLi1.querySelector('ul').children[1];
		var childLi2Entry = childLi2.querySelector('p');

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(childLi2Entry.classList.contains('struck-completed'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(childLi2Entry.classList.contains('struck-completed'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(childLi2Entry.classList.contains('struck-completed'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
	},
	"If root selectChildren button text is 'Select children', clicking it should set completeSelectedChildren button text to 'Uncomplete selected children' if all children are marked completed.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markCompleted(true);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		child2.markCompleted(true);
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var childLi1 = todoLi1.querySelector('ul').children[0];
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2 = todoLi1.querySelector('ul').children[1];
		var childLi2Entry = childLi2.querySelector('p');

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(childLi2Entry.classList.contains('struck-completed'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(childLi2Entry.classList.contains('struck-completed'), true);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Uncomplete selected children');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(childLi2Entry.classList.contains('struck-completed'), true);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Uncomplete selected children');
	},
	"If root selectChildren button text is 'Select children', clicking it should set deleteSelectedChildren button text to 'Delete selected children' if all children are not marked deleted.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var childLi1 = todoLi1.querySelector('ul').children[0];
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2 = todoLi1.querySelector('ul').children[1];
		var childLi2Entry = childLi2.querySelector('p');

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(childLi2Entry.classList.contains('faded-deleted'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(childLi2Entry.classList.contains('faded-deleted'), false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(childLi2Entry.classList.contains('faded-deleted'), false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
	},
	"If root selectChildren button text is 'Select children', clicking it should set deleteSelectedChildren button text to 'Undelete selected children' if all children are marked deleted.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markDeleted(true);
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		child2.markDeleted(true);
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var childLi1 = todoLi1.querySelector('ul').children[0];
		var childLi1Entry = childLi1.querySelector('p');
		var childLi2 = todoLi1.querySelector('ul').children[1];
		var childLi2Entry = childLi2.querySelector('p');

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(childLi2Entry.classList.contains('faded-deleted'), true);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(childLi2Entry.classList.contains('faded-deleted'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Undelete selected children');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(childLi2Entry.classList.contains('faded-deleted'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Undelete selected children');
	},
	"Clicking a root selectChildren button should toggle 'inactive' on all childLi Select buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiSelectButton = child1Li.children.namedItem('select');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiSelectButton = grandchild1Li.children.namedItem('select');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiSelectButton = child2Li.children.namedItem('select');

		eq(child1LiSelectButton.classList.contains('inactive'), true);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), true);
		eq(child2LiSelectButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiSelectButton.classList.contains('inactive'), false);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), false);
		eq(child2LiSelectButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(child1LiSelectButton.classList.contains('inactive'), true);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), true);
		eq(child2LiSelectButton.classList.contains('inactive'), true);
	},
	"Clicking a branch selectChildren button should not toggle 'inactive' on any childLi Select buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiSelectButton = child1Li.children.namedItem('select');
		var child1LiSelectChildrenButton = child1Li.children.namedItem('selectChildren');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiSelectButton = grandchild1Li.children.namedItem('select');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiSelectButton = child2Li.children.namedItem('select');

		eq(child1LiSelectButton.classList.contains('inactive'), true);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), true);
		eq(child2LiSelectButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiSelectButton.classList.contains('inactive'), false);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), false);
		eq(child2LiSelectButton.classList.contains('inactive'), false);

		child1LiSelectChildrenButton.click();

		eq(child1LiSelectButton.classList.contains('inactive'), false);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), false);
		eq(child2LiSelectButton.classList.contains('inactive'), false);

		child1LiSelectChildrenButton.click();

		eq(child1LiSelectButton.classList.contains('inactive'), false);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), false);
		eq(child2LiSelectButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(child1LiSelectButton.classList.contains('inactive'), true);
		eq(grandchild1LiSelectButton.classList.contains('inactive'), true);
		eq(child2LiSelectButton.classList.contains('inactive'), true);
	},

	"Clicking a root selectChildren button should toggle 'inactive' on all childLi Complete, Delete, addSibling and addChild buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		var child1Li = todoLi1.querySelector('ul').children[0];
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var child2Li = todoLi1.querySelector('ul').children[1];
		
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');
		var child2LiCompleteButton = child2Li.children.namedItem('complete');

		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		var child1LiAddSiblingButton = child1Li.children.namedItem('addSibling');
		var grandchild1LiAddSiblingButton = grandchild1Li.children.namedItem('addSibling');
		var child2LiAddSiblingButton = child2Li.children.namedItem('addSibling');
		
		var child1LiAddChildButton = child1Li.children.namedItem('addChild');
		var grandchild1LiAddChildButton = grandchild1Li.children.namedItem('addChild');
		var child2LiAddChildButton = child2Li.children.namedItem('addChild');

		eq(child1LiCompleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), false);
		eq(child2LiCompleteButton.classList.contains('inactive'), false);

		eq(child1LiDeleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), false);
		eq(child2LiDeleteButton.classList.contains('inactive'), false);
		
		eq(child1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), false);

		eq(child1LiAddChildButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), false);
		eq(child2LiAddChildButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), true);
		eq(child2LiCompleteButton.classList.contains('inactive'), true);

		eq(child1LiDeleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), true);
		eq(child2LiDeleteButton.classList.contains('inactive'), true);

		eq(child1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), true);

		eq(child1LiAddChildButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), true);
		eq(child2LiAddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), false);
		eq(child2LiCompleteButton.classList.contains('inactive'), false);

		eq(child1LiDeleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), false);
		eq(child2LiDeleteButton.classList.contains('inactive'), false);
		
		eq(child1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), false);

		eq(child1LiAddChildButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), false);
		eq(child2LiAddChildButton.classList.contains('inactive'), false);
	},
	"Clicking a root selectChildren button should toggle 'inactive' on all childLi Complete, Delete, addSibling and addChild buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		var child1Li = todoLi1.querySelector('ul').children[0];
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var child2Li = todoLi1.querySelector('ul').children[1];
		
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');
		var child2LiCompleteButton = child2Li.children.namedItem('complete');

		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		var child1LiAddSiblingButton = child1Li.children.namedItem('addSibling');
		var grandchild1LiAddSiblingButton = grandchild1Li.children.namedItem('addSibling');
		var child2LiAddSiblingButton = child2Li.children.namedItem('addSibling');
		
		var child1LiAddChildButton = child1Li.children.namedItem('addChild');
		var grandchild1LiAddChildButton = grandchild1Li.children.namedItem('addChild');
		var child2LiAddChildButton = child2Li.children.namedItem('addChild');

		eq(child1LiCompleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), false);
		eq(child2LiCompleteButton.classList.contains('inactive'), false);

		eq(child1LiDeleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), false);
		eq(child2LiDeleteButton.classList.contains('inactive'), false);
		
		eq(child1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), false);

		eq(child1LiAddChildButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), false);
		eq(child2LiAddChildButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), true);
		eq(child2LiCompleteButton.classList.contains('inactive'), true);

		eq(child1LiDeleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), true);
		eq(child2LiDeleteButton.classList.contains('inactive'), true);

		eq(child1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), true);

		eq(child1LiAddChildButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), true);
		eq(child2LiAddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), false);
		eq(child2LiCompleteButton.classList.contains('inactive'), false);

		eq(child1LiDeleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), false);
		eq(child2LiDeleteButton.classList.contains('inactive'), false);
		
		eq(child1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), false);

		eq(child1LiAddChildButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), false);
		eq(child2LiAddChildButton.classList.contains('inactive'), false);
	},
	"Clicking a branch selectChildren button should not toggle 'inactive' on any childLi Complete, Delete, addSibling or addChild buttons.": function() {
		// TODO Consider simplifying to focus on the only childLi that matters for this test, grandchild1.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		var child1Li = todoLi1.querySelector('ul').children[0];
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var child2Li = todoLi1.querySelector('ul').children[1];
		
		var child1LiSelectChildrenButton = child1Li.children.namedItem('selectChildren');
		
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');
		var child2LiCompleteButton = child2Li.children.namedItem('complete');

		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		var child1LiAddSiblingButton = child1Li.children.namedItem('addSibling');
		var grandchild1LiAddSiblingButton = grandchild1Li.children.namedItem('addSibling');
		var child2LiAddSiblingButton = child2Li.children.namedItem('addSibling');
		
		var child1LiAddChildButton = child1Li.children.namedItem('addChild');
		var grandchild1LiAddChildButton = grandchild1Li.children.namedItem('addChild');
		var child2LiAddChildButton = child2Li.children.namedItem('addChild');

		eq(child1LiCompleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), false);
		eq(child2LiCompleteButton.classList.contains('inactive'), false);

		eq(child1LiDeleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), false);
		eq(child2LiDeleteButton.classList.contains('inactive'), false);
		
		eq(child1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), false);

		eq(child1LiAddChildButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), false);
		eq(child2LiAddChildButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), true);
		eq(child2LiCompleteButton.classList.contains('inactive'), true);

		eq(child1LiDeleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), true);
		eq(child2LiDeleteButton.classList.contains('inactive'), true);

		eq(child1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), true);

		eq(child1LiAddChildButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), true);
		eq(child2LiAddChildButton.classList.contains('inactive'), true);

		child1LiSelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), true);
		eq(child2LiCompleteButton.classList.contains('inactive'), true);

		eq(child1LiDeleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), true);
		eq(child2LiDeleteButton.classList.contains('inactive'), true);

		eq(child1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), true);

		eq(child1LiAddChildButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), true);
		eq(child2LiAddChildButton.classList.contains('inactive'), true);

		child1LiSelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), true);
		eq(child2LiCompleteButton.classList.contains('inactive'), true);

		eq(child1LiDeleteButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), true);
		eq(child2LiDeleteButton.classList.contains('inactive'), true);

		eq(child1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), true);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), true);

		eq(child1LiAddChildButton.classList.contains('inactive'), true);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), true);
		eq(child2LiAddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiCompleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteButton.classList.contains('inactive'), false);
		eq(child2LiCompleteButton.classList.contains('inactive'), false);

		eq(child1LiDeleteButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteButton.classList.contains('inactive'), false);
		eq(child2LiDeleteButton.classList.contains('inactive'), false);
		
		eq(child1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddSiblingButton.classList.contains('inactive'), false);
		eq(child2LiAddSiblingButton.classList.contains('inactive'), false);

		eq(child1LiAddChildButton.classList.contains('inactive'), false);
		eq(grandchild1LiAddChildButton.classList.contains('inactive'), false);
		eq(child2LiAddChildButton.classList.contains('inactive'), false);
	},
	"If all hidden children are filtered out, showChildren button should be inactive.": function() {
		fail();
	},
	"Clicking a root 'Unselect children' button should remove class 'inactive' on nested showChildren buttons even if children are hidden.": function() {
		fail();
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];

		childLi1ShowChildrenButton.click();

		todoLi1SelectChildrenButton.click();

		// grandchildLi1 not selected because it is hidden

		todoLiSelectChildrenButton.click();

		// childLi1ShowChildrenButton not inactive
	},
	"Clicking a root selectChildren button should toggle 'inactive' on all childLi showChildren, completeSelectedChildren and deleteSelectedChildren buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		var child1Li = todoLi1.querySelector('ul').children[0];
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var child2Li = todoLi1.querySelector('ul').children[1];
		
		var child1LiSelectChildrenButton = child1Li.children.namedItem('selectChildren');

		var child1LiShowChildrenButton = child1Li.children.namedItem('showChildren');
		var grandchild1LiShowChildrenButton = grandchild1Li.children.namedItem('showChildren');
		var child2LiShowChildrenButton = child2Li.children.namedItem('showChildren');

		var child1LiCompleteSelectedChildrenButton = child1Li.children.namedItem('completeSelectedChildren');
		var grandchild1LiCompleteSelectedChildrenButton = grandchild1Li.children.namedItem('completeSelectedChildren');
		var child2LiCompleteSelectedChildrenButton = child2Li.children.namedItem('completeSelectedChildren');
		
		var child1LiDeleteSelectedChildrenButton = child1Li.children.namedItem('deleteSelectedChildren');
		var grandchild1LiDeleteSelectedChildrenButton = grandchild1Li.children.namedItem('deleteSelectedChildren');
		var child2LiDeleteSelectedChildrenButton = child2Li.children.namedItem('deleteSelectedChildren');

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		child1LiSelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		// Case: selectChildren must re-activate showChildren button on child nodes if they are inactive

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(child1LiShowChildrenButton.textContent, 'Hide children');

		child1LiShowChildrenButton.click();		// hide grandchild, de-activate showChildren button

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(child1LiShowChildrenButton.textContent, 'Show children');

		todoLi1SelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child1LiShowChildrenButton.textContent, 'Show children');

		todoLi1SelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(child1LiShowChildrenButton.textContent, 'Show children');
	},
	"Clicking a branch selectChildren button should not toggle 'inactive' on any childLi showChildren, completeSelectedChildren or deleteSelectedChildren buttons.": function() {
		// TODO Consider simplifying to focus on the only childLi that matters for this test, grandchild1.
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		var child1Li = todoLi1.querySelector('ul').children[0];
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var child2Li = todoLi1.querySelector('ul').children[1];
		
		var child1LiSelectChildrenButton = child1Li.children.namedItem('selectChildren');

		var child1LiShowChildrenButton = child1Li.children.namedItem('showChildren');
		var grandchild1LiShowChildrenButton = grandchild1Li.children.namedItem('showChildren');
		var child2LiShowChildrenButton = child2Li.children.namedItem('showChildren');

		var child1LiCompleteSelectedChildrenButton = child1Li.children.namedItem('completeSelectedChildren');
		var grandchild1LiCompleteSelectedChildrenButton = grandchild1Li.children.namedItem('completeSelectedChildren');
		var child2LiCompleteSelectedChildrenButton = child2Li.children.namedItem('completeSelectedChildren');
		
		var child1LiDeleteSelectedChildrenButton = child1Li.children.namedItem('deleteSelectedChildren');
		var grandchild1LiDeleteSelectedChildrenButton = grandchild1Li.children.namedItem('deleteSelectedChildren');
		var child2LiDeleteSelectedChildrenButton = child2Li.children.namedItem('deleteSelectedChildren');

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		child1LiSelectChildrenButton.click();	// branch button 'Unselect children'

		eq(child1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		child1LiSelectChildrenButton.click();	// branch button 'Select children'

		eq(child1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(child1LiShowChildrenButton.classList.contains('inactive'), false);
		eq(grandchild1LiShowChildrenButton.classList.contains('inactive'), true);
		eq(child2LiShowChildrenButton.classList.contains('inactive'), true);

		eq(child1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiCompleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(grandchild1LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child2LiDeleteSelectedChildrenButton.classList.contains('inactive'), true);
	},
	"If a todo has children, its todoLi should have a 'completeSelectedChildren' button to complete/uncomplete selected child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1CompleteSelectedChildrenButton.name, 'completeSelectedChildren');
	},
	"If a todo has no children, its todoLi should not have a 'completeSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');

		eq(todoLi1CompleteSelectedChildrenButton, null);
	},
	"A 'completeSelectedChildren' button should be disabled if there are no selected children.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todoLi1.children.namedItem('completeSelectedChildren').disabled, true);
	},
	"Otherwise, a 'completeSelectedChildren' button should be enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todoLi1.children.namedItem('completeSelectedChildren').disabled, false);
	},
	"Clicking a 'completeSelectedChildren' button should toggle button text and toggle todo.completed, todoLi entry class and 'complete' button text on selected child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiCompleteButton = child2Li.children.namedItem('complete');

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(child1.completed, false);
		eq(child2.completed, false);
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);

		todoLi1CompleteSelectedChildrenButton.click();

		eq(child1LiEntry.classList.contains('struck-completed'), true);
		eq(child2LiEntry.classList.contains('struck-completed'), true);
		eq(child1.completed, true);
		eq(child2.completed, true);
		eq(child1LiCompleteButton.textContent, 'Uncomplete');
		eq(child2LiCompleteButton.textContent, 'Uncomplete');

		todoLi1CompleteSelectedChildrenButton.click();
		
		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(child2LiEntry.classList.contains('struck-completed'), false);
		eq(child1.completed, false);
		eq(child2.completed, false);
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(child2LiCompleteButton.textContent, 'Complete');
	},
	"A completeSelectedChildren button should operate on selected nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiCompleteButton = child1Li.children.namedItem('complete');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiEntry = grandchild1Li.querySelector('p');
		var grandchild1LiCompleteButton = grandchild1Li.children.namedItem('complete');

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(grandchild1LiEntry.classList.contains('struck-completed'), false);
		eq(child1.completed, false);
		eq(grandchild1.completed, false);
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(grandchild1LiCompleteButton.textContent, 'Complete');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);

		todoLi1CompleteSelectedChildrenButton.click();

		eq(child1LiEntry.classList.contains('struck-completed'), true);
		eq(grandchild1LiEntry.classList.contains('struck-completed'), true);
		eq(child1.completed, true);
		eq(grandchild1.completed, true);
		eq(child1LiCompleteButton.textContent, 'Uncomplete');
		eq(grandchild1LiCompleteButton.textContent, 'Uncomplete');

		todoLi1CompleteSelectedChildrenButton.click();
		
		eq(child1LiEntry.classList.contains('struck-completed'), false);
		eq(grandchild1LiEntry.classList.contains('struck-completed'), false);
		eq(child1.completed, false);
		eq(grandchild1.completed, false);
		eq(child1LiCompleteButton.textContent, 'Complete');
		eq(grandchild1LiCompleteButton.textContent, 'Complete');
	},
	"If a todo has children, its todoLi should have a 'deleteSelectedChildren' button to delete/undelete selected child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton.nodeName, 'BUTTON');
		eq(todoLi1DeleteSelectedChildrenButton.name, 'deleteSelectedChildren');
	},
	"If a todo has no children, its todoLi should not have a 'deleteSelectedChildren' button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');

		eq(todoLi1DeleteSelectedChildrenButton, null);
	},
	"A 'deleteSelectedChildren' button should be disabled if there are no selected children.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todoLi1.children.namedItem('deleteSelectedChildren').disabled, true);
	},
	"Otherwise, a 'deleteSelectedChildren' button should be enabled.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		child1.markSelected(true);
		todo1.addChild(child1);
		insertTodo(todos, todo1);

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todoLi1.children.namedItem('deleteSelectedChildren').disabled, false);
	},
	"Clicking a 'deleteSelectedChildren' button should toggle button text and toggle todo.deleted, todoLi entry class and 'deleted' button text on selected child todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);

		todoLi1DeleteSelectedChildrenButton.click();

		eq(child1LiEntry.classList.contains('faded-deleted'), true);
		eq(child2LiEntry.classList.contains('faded-deleted'), true);
		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(child1LiDeleteButton.textContent, 'Undelete');
		eq(child2LiDeleteButton.textContent, 'Undelete');

		todoLi1DeleteSelectedChildrenButton.click();
		
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');
	},
	"A deleteSelectedChildren button should operate on selected nested todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Item 1 grandchild 1');
		child1.addChild(grandchild1);
		child2 = new Todo('Item 1 child 2');
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		
		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var child1Li = todoLi1.querySelector('ul').children[0];
		var child1LiEntry = child1Li.querySelector('p');
		var child1LiDeleteButton = child1Li.children.namedItem('delete');
		var grandchild1Li = child1Li.querySelector('ul').children[0];
		var grandchild1LiEntry = grandchild1Li.querySelector('p');
		var grandchild1LiDeleteButton = grandchild1Li.children.namedItem('delete');
		var child2Li = todoLi1.querySelector('ul').children[1];
		var child2LiEntry = child2Li.querySelector('p');
		var child2LiDeleteButton = child2Li.children.namedItem('delete');

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(grandchild1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(grandchild1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');
		eq(grandchild1LiDeleteButton.textContent, 'Delete');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);

		todoLi1DeleteSelectedChildrenButton.click();

		eq(child1LiEntry.classList.contains('faded-deleted'), true);
		eq(grandchild1LiEntry.classList.contains('faded-deleted'), true);
		eq(child2LiEntry.classList.contains('faded-deleted'), true);
		eq(child1.deleted, true);
		eq(grandchild1.deleted, true);
		eq(child2.deleted, true);
		eq(child1LiDeleteButton.textContent, 'Undelete');
		eq(grandchild1LiDeleteButton.textContent, 'Undelete');
		eq(child2LiDeleteButton.textContent, 'Undelete');

		todoLi1DeleteSelectedChildrenButton.click();
		
		eq(child1LiEntry.classList.contains('faded-deleted'), false);
		eq(grandchild1LiEntry.classList.contains('faded-deleted'), false);
		eq(child2LiEntry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(grandchild1.deleted, false);
		eq(child2.deleted, false);
		eq(child1LiDeleteButton.textContent, 'Delete');
		eq(grandchild1LiDeleteButton.textContent, 'Delete');
		eq(child2LiDeleteButton.textContent, 'Delete');
	},
	"Clicking an addChild button should activate showChildren and selectChildren buttons.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children.namedItem('addChild');
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);
		
		todoLi1ChildButton.click();

		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
	}, 
	"When showChildren button is clicked, selectChildren button class should toggle 'inactive'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child 1');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		

		renderTodolist();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi1ChildButton = todoLi1.children.namedItem('addChild');
		todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');

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
	"The header actions bar should have a 'selectAll' button to select all displayed todos.": function() {
		eq(selectAllButton.nodeName, 'BUTTON');
		eq(selectAllButton.innerText, 'Select all');
		eq(selectAllButton.parentElement, actionsBar);
	},
	"And also a disabled-by-default 'Complete selected' button to mark selected todos completed.": function() {
		eq(completeSelectedButton.nodeName, 'BUTTON');
		eq(completeSelectedButton.innerText, 'Complete selected');
		eq(completeSelectedButton.parentElement, actionsBar);
	},
	"And also a disabled-by-default 'Delete selected' button to delete selected todos.": function() {
		eq(deleteSelectedButton.nodeName, 'BUTTON');
		eq(deleteSelectedButton.innerText, 'Delete selected');
		eq(deleteSelectedButton.parentElement, actionsBar);
	},
	"And also a disabled-by-default 'Purge selected deleted todos' button to expunge selected deleted todos.": function() {
		eq(purgeSelectedDeletedButton.nodeName, 'BUTTON');
		eq(purgeSelectedDeletedButton.innerText, 'Purge selected deleted todos');
		eq(purgeSelectedDeletedButton.parentElement, actionsBar);

	},
	"When the app starts up, actions bar selection-related button names should be set to default values.": function() {
		startApp();

		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.disabled, false);
		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(completeSelectedButton.disabled, true);
		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(deleteSelectedButton.disabled, true);
		eq(purgeSelectedDeletedButton.disabled, true);
	},
	"Clicking selectAll button should toggle button text, each todoLi selected button text, each todo.selected, and each entry <p> class." : function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

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
	"Clicking 'Unselect all' button should remove class 'inactive' on nested showChildren buttons even when when children are hidden.": function() {
		fail();
	},
	"Clicking selectAll button should also toggle todoLi completed, deleted, addSibling, and addChild button classes 'inactive'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi2AddSiblingButton = todoLi2.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi2AddChildButton = todoLi2.children.namedItem('addChild');

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
	"If selectAll button text is 'Select all', clicking it should set completeSelected button text to 'Complete selected' if all todos are not marked completed.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCompleted(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(completeSelectedButton.textContent, 'Complete selected');

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(completeSelectedButton.textContent, 'Complete selected');

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(completeSelectedButton.textContent, 'Complete selected');
	},
	"If selectAll button text is 'Select all', clicking it should set completeSelected button text to 'Uncomplete selected' if all todos are marked completed.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCompleted(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		todo2.markCompleted(true);
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), true);
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(completeSelectedButton.textContent, 'Complete selected');

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), true);
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(completeSelectedButton.textContent, 'Uncomplete selected');

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todoLi2Entry.classList.contains('struck-completed'), true);
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(completeSelectedButton.textContent, 'Uncomplete selected');
	},
	"If selectAll button text is 'Select all', clicking it should set deleteSelected button text to 'Delete selected' if all todos are not marked deleted.": function() {
		selectAllButton.textContent = 'Select all';
		deleteSelectedButton.textContent = 'Delete selected';
		deleteSelectedButton.classList.add('inactive');
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(deleteSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		selectAllButton.click();
		
		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(deleteSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(deleteSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, 'Delete selected');
	},
	"If selectAll button text is 'Select all', clicking it should set deleteSelected button text to 'Undelete selected' if all todos are marked deleted.": function() {
		selectAllButton.textContent = 'Select all';
		deleteSelectedButton.textContent = 'Delete selected';
		deleteSelectedButton.classList.add('inactive');
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		todo2.markDeleted(true);
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(deleteSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		selectAllButton.click();
		
		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(deleteSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, 'Undelete selected');

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(deleteSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, 'Undelete selected');
	},
	"Clicking selectAll button should toggle actions bar addTodo button class 'inactive'.": function() {
		eq(selectAllButton.textContent, 'Select all');
		eq(addTodoButton.classList.contains('inactive'), false);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(addTodoButton.classList.contains('inactive'), true);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(addTodoButton.classList.contains('inactive'), false);
	},
	"selectAll button with text 'Select all' should only apply to displayed todos.": function() {
		selectAllButton.textContent = 'Select all';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi2DeleteButton = todoLi2.children.namedItem('delete');

		eq(todo1.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);

		todoLi2DeleteButton.click();
		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), true);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);
	},
	"selectAll button should also select/unselect displayed nested todos.": function() {
		selectAllButton.textContent = 'Select all';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1child1 = new Todo('Item 1 child 1');
		todo1child2 = new Todo('Item 1 child 2');
		todo1.addChild(todo1child1);
		todo1.addChild(todo1child2);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi1HideChildrenButton = todoLi1.children.namedItem('showChildren');
		todoLi1Child1 = todoLi1.querySelector('ul').children[0];
		todoLi1Child2 = todoLi1.querySelector('ul').children[1];
		todoLi1Child2DeleteButton = todoLi1Child2.children.namedItem('delete');
		todoLi2 = todolist.children[0].children[1];
		todoLi2DeleteButton = todoLi2.children.namedItem('delete');

		// Case 1: todos hidden by filter settings

		eq(todo1.selected, false);
		eq(todo1child1.selected, false);
		eq(todo1child2.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child2.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);

		todoLi2DeleteButton.click();
		todoLi1Child2DeleteButton.click();
		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo1child1.selected, true);
		eq(todo1child2.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), true);
		eq(todoLi1Child1.querySelector('p').classList.contains('highlighted'), true);
		eq(todoLi1Child2.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);

		selectAllButton.click();

		eq(todo1.selected, false);
		eq(todo1child1.selected, false);
		eq(todo1child2.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child2.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);

		// Restore defaults
		showDeletedButton.click();
		todoLi2DeleteButton.click();
		todoLi1Child2DeleteButton.click();
		showDeletedButton.click();

		// Case 2: todos hidden by collapsed ul's

		eq(todo1.selected, false);
		eq(todo1child1.selected, false);
		eq(todo1child2.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child2.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);

		todoLi1HideChildrenButton.click();
		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo1child1.selected, false);
		eq(todo1child2.selected, false);
		eq(todo2.selected, true);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), true);
		eq(todoLi1Child1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child2.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), true);

		selectAllButton.click();

		eq(todo1.selected, false);
		eq(todo1child1.selected, false);
		eq(todo1child2.selected, false);
		eq(todo2.selected, false);
		eq(todoLi1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child1.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi1Child2.querySelector('p').classList.contains('highlighted'), false);
		eq(todoLi2.querySelector('p').classList.contains('highlighted'), false);
	},
	"If a todoLi has children displayed, clicking selectAll button should remove todoLi selectChildren button class 'inactive' and add completeSelectedChildren and deleteSelectedChildren button classes 'inactive'.": function() {
		// Test and document the different behavior of selectChildren when selectAll has been clicked.
		selectAllButton.textContent = 'Select all';

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		childLi1 = todoLi1.querySelector('ul').children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		
		selectAllButton.click();
		
		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		selectAllButton.click();
		
		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
	},
	"If selectAll button text is 'Unselect all', then todoLi selectChildren button should only toggle childLi's select button and highlighted text.": function() {
		// Test and document different behavior of selectChildren when selectAll has been clicked.

		selectAllButton.textContent = 'Select all';

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		childLi1 = todoLi1.querySelector('ul').children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');
		var childLi1Entry = childLi1.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1Entry.classList.contains('highlighted'), false);
		
		selectAllButton.click();
		
		eq(selectAllButton.textContent, 'Unselect all');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);

		todoLi1SelectChildrenButton.click();	// Unselect children
		
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1Entry.classList.contains('highlighted'), false);

		todoLi1SelectChildrenButton.click();	// Reselect children
		
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1Entry.classList.contains('highlighted'), true);
	},
	"Clicking completeSelected button should toggle button text and toggle todo.completed, todoLi completed button text, and entry <p> class for selected todos.": function() {
		selectAllButton.textContent = 'Select all';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi3 = todolist.children[0].children[2];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi3SelectButton = todoLi3.children.namedItem('select');
		var todoLi3CompleteButton = todoLi3.children.namedItem('complete');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi3Entry = todoLi3.querySelector('p');

		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck-completed'), false);
		eq(todo3.completed, false);

		selectAllButton.click();
		todoLi3SelectButton.click();	// unselect
		completeSelectedButton.click();

		eq(completeSelectedButton.textContent, 'Uncomplete selected');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.textContent, 'Uncomplete');
		eq(todoLi2Entry.classList.contains('struck-completed'), true);
		eq(todo2.completed, true);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck-completed'), false);
		eq(todo3.completed, false);

		completeSelectedButton.click();
		
		eq(completeSelectedButton.textContent, 'Complete selected');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck-completed'), false);
		eq(todo3.completed, false);
	},
	"The completeSelected button should also complete/uncomplete nested selected todos.": function() {
		selectAllButton.textContent = 'Select all';
		completeSelectedButton.textContent = 'Complete selected';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		child3 = new Todo('Item 3 child');
		grandchild3 = new Todo('Item 3 grandchild');
		child3.addChild(grandchild3);
		todo3.addChild(child3);
		insertTodo(todos, todo3);
		

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi3 = todolist.children[0].children[2];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi2Ul = todoLi2.querySelector('ul');
		var todoLi3Ul = todoLi3.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi3 = todoLi3Ul.children[0];
		var childLi3Ul = childLi3.querySelector('ul');
		var grandchildLi3 = childLi3Ul.children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		var todoLi3SelectButton = todoLi3.children.namedItem('select');
		var todoLi3CompleteButton = todoLi3.children.namedItem('complete');
		var todoLi3DeleteButton = todoLi3.children.namedItem('delete');
		var childLi3SelectButton = childLi3.children.namedItem('select');
		var childLi3CompleteButton = childLi3.children.namedItem('complete');
		var childLi3DeleteButton = childLi3.children.namedItem('delete');
		var grandchildLi3SelectButton = grandchildLi3.children.namedItem('select');
		var grandchildLi3CompleteButton = grandchildLi3.children.namedItem('complete');
		var grandchildLi3DeleteButton = grandchildLi3.children.namedItem('delete');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi3Entry = todoLi3.querySelector('p');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi3Entry = childLi3.querySelector('p');
		var grandchildLi3Entry = grandchildLi3.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.textContent, 'Complete selected');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todo1.completed, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		eq(child1.selected, false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1Entry.classList.contains('struck-completed'), false);
		eq(child1.completed, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck-completed'), false);
		eq(todo3.completed, false);
		eq(childLi3SelectButton.textContent, 'Select');
		eq(childLi3Entry.classList.contains('highlighted'), false);
		eq(child3.selected, false);
		eq(childLi3CompleteButton.textContent, 'Complete');
		eq(childLi3Entry.classList.contains('struck-completed'), false);
		eq(child3.completed, false);
		eq(grandchildLi3SelectButton.textContent, 'Select');
		eq(grandchildLi3Entry.classList.contains('highlighted'), false);
		eq(grandchild3.selected, false);
		eq(grandchildLi3CompleteButton.textContent, 'Complete');
		eq(grandchildLi3Entry.classList.contains('struck-completed'), false);
		eq(grandchild3.completed, false);

		todoLi2DeleteButton.click();
		selectAllButton.click();
		todoLi1SelectButton.click();
		completeSelectedButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(completeSelectedButton.textContent, 'Uncomplete selected');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(child1.selected, true);
		eq(childLi1CompleteButton.textContent, 'Uncomplete');
		eq(childLi1Entry.classList.contains('struck-completed'), true);
		eq(child1.completed, true);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Unselect');
		eq(todoLi3Entry.classList.contains('highlighted'), true);
		eq(todo3.selected, true);
		eq(todoLi3CompleteButton.textContent, 'Uncomplete');
		eq(todoLi3Entry.classList.contains('struck-completed'), true);
		eq(todo3.completed, true);
		eq(childLi3SelectButton.textContent, 'Unselect');
		eq(childLi3Entry.classList.contains('highlighted'), true);
		eq(child3.selected, true);
		eq(childLi3CompleteButton.textContent, 'Uncomplete');
		eq(childLi3Entry.classList.contains('struck-completed'), true);
		eq(child3.completed, true);
		eq(grandchildLi3SelectButton.textContent, 'Unselect');
		eq(grandchildLi3Entry.classList.contains('highlighted'), true);
		eq(grandchild3.selected, true);
		eq(grandchildLi3CompleteButton.textContent, 'Uncomplete');
		eq(grandchildLi3Entry.classList.contains('struck-completed'), true);
		eq(grandchild3.completed, true);


		completeSelectedButton.click();
		
		eq(completeSelectedButton.textContent, 'Complete selected');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todo1.completed, false);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(child1.selected, true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1Entry.classList.contains('struck-completed'), false);
		eq(child1.completed, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2Entry.classList.contains('struck-completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.textContent, 'Unselect');
		eq(todoLi3Entry.classList.contains('highlighted'), true);
		eq(todo3.selected, true);
		eq(todoLi3CompleteButton.textContent, 'Complete');
		eq(todoLi3Entry.classList.contains('struck-completed'), false);
		eq(todo3.completed, false);
		eq(childLi3SelectButton.textContent, 'Unselect');
		eq(childLi3Entry.classList.contains('highlighted'), true);
		eq(child3.selected, true);
		eq(childLi3CompleteButton.textContent, 'Complete');
		eq(childLi3Entry.classList.contains('struck-completed'), false);
		eq(child3.completed, false);
		eq(grandchildLi3SelectButton.textContent, 'Unselect');
		eq(grandchildLi3Entry.classList.contains('highlighted'), true);
		eq(grandchild3.selected, true);
		eq(grandchildLi3CompleteButton.textContent, 'Complete');
		eq(grandchildLi3Entry.classList.contains('struck-completed'), false);
		eq(grandchild3.completed, false);
	},
	"Clicking the deleteSelected button should toggle its button text and toggle todo.deleted, todoLi deleted button text, and entry <p> class for selected todos.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);
		

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi3 = todolist.children[0].children[2];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		var todoLi3SelectButton = todoLi3.children.namedItem('select');
		var todoLi3DeleteButton = todoLi3.children.namedItem('delete');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi3Entry = todoLi3.querySelector('p');

		eq(deleteSelectedButton.textContent, 'Delete selected');
		
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todoLi3Entry.classList.contains('faded-deleted'), false);
		eq(todo3.deleted, false);

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		eq(deleteSelectedButton.textContent, 'Undelete selected');

		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.textContent, 'Undelete');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.textContent, 'Undelete');
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todoLi3Entry.classList.contains('faded-deleted'), false);
		eq(todo3.deleted, false);

		deleteSelectedButton.click();
		
		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('highlighted'), true);
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2Entry.classList.contains('highlighted'), true);
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todoLi3Entry.classList.contains('faded-deleted'), false);
		eq(todo3.deleted, false);
},
	"The deleteSelected button should also delete/undelete nested selected todos.": function() {
		selectAllButton.textContent = 'Select all';
		deleteSelectedButton.textContent = 'Delete selected';
		todos = [];
		todo1 = new Todo('Item 1');
		child1 = new Todo('Item 1 child');
		todo1.addChild(child1);
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		child3 = new Todo('Item 3 child');
		grandchild3 = new Todo('Item 3 grandchild');
		child3.addChild(grandchild3);
		todo3.addChild(child3);
		insertTodo(todos, todo3);
		

		renderTodolist();

		todoLi1 = todolist.children[0].children[0];
		todoLi2 = todolist.children[0].children[1];
		todoLi3 = todolist.children[0].children[2];
		var todoLi1Ul = todoLi1.querySelector('ul');
		var todoLi2Ul = todoLi2.querySelector('ul');
		var todoLi3Ul = todoLi3.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi3 = todoLi3Ul.children[0];
		var childLi3Ul = childLi3.querySelector('ul');
		var grandchildLi3 = childLi3Ul.children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		var todoLi3SelectButton = todoLi3.children.namedItem('select');
		var todoLi3CompleteButton = todoLi3.children.namedItem('complete');
		var todoLi3DeleteButton = todoLi3.children.namedItem('delete');
		var childLi3SelectButton = childLi3.children.namedItem('select');
		var childLi3CompleteButton = childLi3.children.namedItem('complete');
		var childLi3DeleteButton = childLi3.children.namedItem('delete');
		var grandchildLi3SelectButton = grandchildLi3.children.namedItem('select');
		var grandchildLi3CompleteButton = grandchildLi3.children.namedItem('complete');
		var grandchildLi3DeleteButton = grandchildLi3.children.namedItem('delete');
		var todoLi1Entry = todoLi1.querySelector('p');
		var todoLi2Entry = todoLi2.querySelector('p');
		var todoLi3Entry = todoLi3.querySelector('p');
		var childLi1Entry = childLi1.querySelector('p');
		var childLi3Entry = childLi3.querySelector('p');
		var grandchildLi3Entry = grandchildLi3.querySelector('p');

		eq(selectAllButton.textContent, 'Select all');
		eq(deleteSelectedButton.textContent, 'Delete selected');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todo1.deleted, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1Entry.classList.contains('highlighted'), false);
		eq(child1.selected, false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1Entry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2Entry.classList.contains('faded-deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.textContent, 'Select');
		eq(todoLi3Entry.classList.contains('highlighted'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('faded-deleted'), false);
		eq(todo3.deleted, false);
		eq(childLi3SelectButton.textContent, 'Select');
		eq(childLi3Entry.classList.contains('highlighted'), false);
		eq(child3.selected, false);
		eq(childLi3DeleteButton.textContent, 'Delete');
		eq(childLi3Entry.classList.contains('faded-deleted'), false);
		eq(child3.deleted, false);
		eq(grandchildLi3SelectButton.textContent, 'Select');
		eq(grandchildLi3Entry.classList.contains('highlighted'), false);
		eq(grandchild3.selected, false);
		eq(grandchildLi3DeleteButton.textContent, 'Delete');
		eq(grandchildLi3Entry.classList.contains('faded-deleted'), false);
		eq(grandchild3.deleted, false);

		todoLi2DeleteButton.click();
		selectAllButton.click();
		todoLi1SelectButton.click();
		deleteSelectedButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(deleteSelectedButton.textContent, 'Undelete selected');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todo1.deleted, false);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(child1.selected, true);
		eq(childLi1DeleteButton.textContent, 'Undelete');
		eq(childLi1Entry.classList.contains('faded-deleted'), true);
		eq(child1.deleted, true);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.textContent, 'Undelete');
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.textContent, 'Unselect');
		eq(todoLi3Entry.classList.contains('highlighted'), true);
		eq(todo3.selected, true);
		eq(todoLi3DeleteButton.textContent, 'Undelete');
		eq(todoLi3Entry.classList.contains('faded-deleted'), true);
		eq(todo3.deleted, true);
		eq(childLi3SelectButton.textContent, 'Unselect');
		eq(childLi3Entry.classList.contains('highlighted'), true);
		eq(child3.selected, true);
		eq(childLi3DeleteButton.textContent, 'Undelete');
		eq(childLi3Entry.classList.contains('faded-deleted'), true);
		eq(child3.deleted, true);
		eq(grandchildLi3SelectButton.textContent, 'Unselect');
		eq(grandchildLi3Entry.classList.contains('highlighted'), true);
		eq(grandchild3.selected, true);
		eq(grandchildLi3DeleteButton.textContent, 'Undelete');
		eq(grandchildLi3Entry.classList.contains('faded-deleted'), true);
		eq(grandchild3.deleted, true);


		deleteSelectedButton.click();
		
		eq(deleteSelectedButton.textContent, 'Delete selected');

		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1Entry.classList.contains('highlighted'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todo1.deleted, false);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1Entry.classList.contains('highlighted'), true);
		eq(child1.selected, true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1Entry.classList.contains('faded-deleted'), false);
		eq(child1.deleted, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2Entry.classList.contains('highlighted'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.textContent, 'Undelete');
		eq(todoLi2Entry.classList.contains('faded-deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.textContent, 'Unselect');
		eq(todoLi3Entry.classList.contains('highlighted'), true);
		eq(todo3.selected, true);
		eq(todoLi3DeleteButton.textContent, 'Delete');
		eq(todoLi3Entry.classList.contains('faded-deleted'), false);
		eq(todo3.deleted, false);
		eq(childLi3SelectButton.textContent, 'Unselect');
		eq(childLi3Entry.classList.contains('highlighted'), true);
		eq(child3.selected, true);
		eq(childLi3DeleteButton.textContent, 'Delete');
		eq(childLi3Entry.classList.contains('faded-deleted'), false);
		eq(child3.deleted, false);
		eq(grandchildLi3SelectButton.textContent, 'Unselect');
		eq(grandchildLi3Entry.classList.contains('highlighted'), true);
		eq(grandchild3.selected, true);
		eq(grandchildLi3DeleteButton.textContent, 'Delete');
		eq(grandchildLi3Entry.classList.contains('faded-deleted'), false);
		eq(grandchild3.deleted, false);
	},
	"Section: Actions bar -- filters": function() {
		// Choose to display todos based on their stage in life or whether or not they are deleted.
	},
	"The header actions bar should have a showActive button to toggle the display of active todos.": function() {
		// active todos are not completed or canceled
//		renderActionsBar();
//		var actionsBar = document.getElementById('actions');
//		var showActiveButton = actionsBar.children.namedItem('showActive');

		eq(showActiveButton.nodeName, 'BUTTON');
		eq(showActiveButton.innerText, '√ Active');
		eq(showActiveButton.parentElement, actionsBar);
	},
	"The header actions bar should have a showCompleted button to toggle the display of completed todos.": function() {
		eq(showCompletedButton.nodeName, 'BUTTON');
		eq(showCompletedButton.innerText, '√ Completed');
		eq(showCompletedButton.parentElement, actionsBar);
	},
	"The header actions bar should have a showDeleted button to toggle the display of deleted todos.": function() {
		eq(showDeletedButton.nodeName, 'BUTTON');
		eq(showDeletedButton.innerText, 'Deleted');
		eq(showDeletedButton.parentElement, actionsBar);
	},
	"The app should have a way to generate a set of filter tags from showActive, showCompleted, and showDeleted button text.": function() {
		// Tests generateFilterSet()
		
		// Case: default set at startup
		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(showDeletedButton.textContent, 'Deleted');

		var set1 = generateFilterSet();

		eq(set1.size, 2);
		eq(set1.has('#active'), true);
		eq(set1.has('#completed'), true);
		eq(set1.has('#deleted'), false);

		// Case: none set
		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = 'Deleted';

		var set2 = generateFilterSet();

		eq(set2.size, 0);
		eq(set2.has('#active'), false);
		eq(set2.has('#completed'), false);
		eq(set2.has('#deleted'), false);

		// Case: all set
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set3 = generateFilterSet();

		eq(set3.size, 3);
		eq(set3.has('#active'), true);
		eq(set3.has('#completed'), true);
		eq(set3.has('#deleted'), true);

		// Case: active only set
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = 'Deleted';

		var set4 = generateFilterSet();

		eq(set4.size, 1);
		eq(set4.has('#active'), true);
		eq(set4.has('#completed'), false);
		eq(set4.has('#deleted'), false);

		// Case: completed only set
		showActiveButton.textContent = '√Active';
		showCompletedButton.textContent = '√ Completed';
		showDeletedButton.textContent = 'Deleted';

		var set5 = generateFilterSet();

		eq(set5.size, 1);
		eq(set5.has('#active'), false);
		eq(set5.has('#completed'), true);
		eq(set5.has('#deleted'), false);

		// Case: deleted only set
		showActiveButton.textContent = 'Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set6 = generateFilterSet();

		eq(set6.size, 1);
		eq(set6.has('#active'), false);
		eq(set6.has('#completed'), false);
		eq(set6.has('#deleted'), true);

		// Case: two set, active and deleted
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set7 = generateFilterSet();

		eq(set7.size, 2);
		eq(set7.has('#active'), true);
		eq(set7.has('#completed'), false);
		eq(set7.has('#deleted'), true);

		// Case: two set, active and deleted
		showActiveButton.textContent = '√ Active';
		showCompletedButton.textContent = 'Completed';
		showDeletedButton.textContent = '√ Deleted';

		var set7 = generateFilterSet();

		eq(set7.size, 2);
		eq(set7.has('#active'), true);
		eq(set7.has('#completed'), false);
		eq(set7.has('#deleted'), true);

	},
	"On startup, the showActive button text should be '√ Active' and todos with stage 'active' should be displayed.": function() {
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);

		startApp();
		
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];

		eq(showActiveButton.textContent, '√ Active');
		eq(todo1.stage, 'active');
	},
	"On startup, the showCompleted button text should be '√ Completed' and todos with stage 'completed' should be displayed.": function() {
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item completed');
		todo2.setStage('completed');
		insertTodo(todos, todo2);

		startApp();
		
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];

		eq(showActiveButton.textContent, '√ Active');
		eq(todo1.stage, 'active');
		eq(todoLi1, todoUl.children[0]);

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todo2.stage, 'completed');
		eq(todoLi2, todoUl.children[1]);
	},
	"On startup, the showDeleted button text should be 'Deleted' and deleted todos should not be displayed.": function() {
		todos = [];
		todo1 = new Todo('Item active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item completed');
		todo2.setStage('completed');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item deleted');
		todo3.markDeleted(true);
		insertTodo(todos, todo3);

		startApp();
		
		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi3 = todoUl.children[2];

		eq(showActiveButton.textContent, '√ Active');
		eq(todo1.stage, 'active');
		eq(todoLi1, todoUl.children[0]);

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todo2.stage === 'active', false);
		eq(todo2.stage, 'completed');
		eq(todoLi2, todoUl.children[1]);

		eq(showDeletedButton.textContent, 'Deleted');
		eq(todoLi3, undefined);							// todoLi3 not created
	},
	"Clicking the showActive button should toggle button text and re-render todolist.": function() {
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 completed');
		todo2.setStage('completed');
		todo2Child = new Todo('Item 2 child active');
		todo2.addChild(todo2Child);
		todo2Grandchild = new Todo('Item 2 grandchild completed');
		todo2Grandchild.setStage('completed');
		todo2Child.addChild(todo2Grandchild);
		insertTodo(todos, todo2);

		renderTodolist();

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(showActiveButton.textContent, '√ Active');

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);

		showActiveButton.click();

		eq(showActiveButton.textContent, 'Active');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi1Ul = todoLi1.querySelector('ul');
		childLi = todoLi1Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];
		todoLi2 = todoUl.children[1];

		eq(todoUl.children.length, 1);
		eq(todoLi1.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);
		eq(todoLi2, undefined);

		showActiveButton.click();

		eq(showActiveButton.textContent, '√ Active');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);
	},
	"Clicking the showCompleted button should toggle button text and re-render todolist.": function() {
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 completed');
		todo2.setStage('completed');
		todo2Child = new Todo('Item 2 child active');
		todo2.addChild(todo2Child);
		todo2Grandchild = new Todo('Item 2 grandchild completed');
		todo2Grandchild.setStage('completed');
		todo2Child.addChild(todo2Grandchild);
		insertTodo(todos, todo2);

		renderTodolist();

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(showCompletedButton.textContent, '√ Completed');

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, 'Completed');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi, undefined);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, '√ Completed');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);
	},
	"Clicking the showDeleted button should toggle button text and re-render todolist.": function() {
		todos = [];
		todo1 = new Todo('Item 1 active');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2 deleted');
		todo2.markDeleted(true);
		todo2Child = new Todo('Item 2 child active');
		todo2.addChild(todo2Child);
		todo2Grandchild = new Todo('Item 2 grandchild deleted');
		todo2Grandchild.markDeleted(true);
		todo2Child.addChild(todo2Grandchild);
		insertTodo(todos, todo2);

		renderTodolist();

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(showDeletedButton.textContent, 'Deleted');

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi, undefined);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi.id, todo2Grandchild.id);

		showDeletedButton.click();

		eq(showDeletedButton.textContent, 'Deleted');

		todoUl = todolist.children[0];
		todoLi1 = todoUl.children[0];
		todoLi2 = todoUl.children[1];
		todoLi2Ul = todoLi2.querySelector('ul');
		childLi = todoLi2Ul.children[0];
		childLiUl = childLi.querySelector('ul');
		grandchildLi = childLiUl.children[0];

		eq(todoUl.children.length, 2);
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(childLi.id, todo2Child.id);
		eq(grandchildLi, undefined);
	},
	"Section: Actions bar -- other buttons": function() {

	},
	"The header actions bar should have an 'addTodo' button that adds a todo to the end of the list.": function() {
		// In case filtering the list results in no displayed todos so that addSibling is unavailable.
		eq(addTodoButton.nodeName, 'BUTTON');
		eq(addTodoButton.disabled, false);
		eq(addTodoButton.innerText, 'Add todo');
		eq(addTodoButton.parentElement, actionsBar);
		
		todos = [];

		// No todos to render, but need to clear out innerHTML from prior test
		renderTodolist();

		addTodoButton.click();

		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		eq(todosUl.children.length, 1);
		eq(todos.length, 1);
		eq(todoLi1.id, todos[0].id);

		addTodoButton.click();

		todosUl = todolist.children[0];
		todoLi2 = todosUl.children[1];
		eq(todosUl.children.length, 2);
		eq(todos.length, 2);
		eq(todoLi2.id, todos[1].id);
	},
	"And also a disabled-by-default 'purgeSelectedDeleted' button to expunge selected deleted todos permanently.": function() {
		eq(purgeSelectedDeletedButton.nodeName, 'BUTTON');
		eq(purgeSelectedDeletedButton.disabled, true);
		eq(purgeSelectedDeletedButton.textContent, 'Purge selected deleted todos');
		eq(purgeSelectedDeletedButton.parentElement, actionsBar); 
	}, 
	"purgeSelectedDeletedButton should be disabled unless showDeletedButton text is '√ Deleted' and at least one todo is selected.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		grandchild1 = new Todo('Grandchild 1');
		child1.addChild(grandchild1);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1DeleteSelectedChildrenButton = childLi1.children.namedItem('deleteSelectedChildren');
		var childLi1Ul = childLi1.querySelector('ul');
		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi1DeleteButton = grandchildLi1.children.namedItem('delete');

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, 'Deleted');
		eq(purgeSelectedDeletedButton.disabled, true);

		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo1.deleted, false);
		eq(child1.selected, true);
		eq(child1.deleted, false);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, 'Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		deleteSelectedButton.click();

		eq(todo1.selected, true);
		eq(todo1.deleted, true);
		eq(child1.selected, true);
		eq(child1.deleted, true);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, true);
		eq(showDeletedButton.textContent, 'Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		// Case: trigger by showDeleted filter button

		showDeletedButton.click();

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);
		
		// Reset for next case
		deleteSelectedButton.click();
		selectAllButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		// Case: triggered by Delete selected button

		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo1.deleted, false);
		eq(child1.selected, true);
		eq(child1.deleted, false);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		deleteSelectedButton.click();

		eq(todo1.selected, true);
		eq(todo1.deleted, true);
		eq(child1.selected, true);
		eq(child1.deleted, true);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, true);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);

		// Reset for next case
		deleteSelectedButton.click();
		selectAllButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		// Case: triggered by Select children button
		// Case: triggered by nested selected deleted todo

		grandchildLi1DeleteButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, true);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, true);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);

		// Reset for next case
		childLi1SelectChildrenButton.click();
		
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		grandchildLi1DeleteButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		// Case: triggered by Delete selected children button

		childLi1SelectChildrenButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		childLi1DeleteSelectedChildrenButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, true);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);

		// Reset for next case
		childLi1DeleteSelectedChildrenButton.click();

		eq(grandchild1.deleted, false);
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);
		
		// Case: triggered by selectAll button

		childLi1DeleteButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, true);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo1.deleted, false);
		eq(child1.selected, true);
		eq(child1.deleted, true);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);

		// Reset for next case
		selectAllButton.click();

		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(grandchild1.selected, false)
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		childLi1DeleteButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);
		
		// Case: triggered by Select button

		childLi1DeleteButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, true);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		selectAllButton.click();

		eq(todo1.selected, true);
		eq(todo1.deleted, false);
		eq(child1.selected, true);
		eq(child1.deleted, true);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);

		childLi1SelectButton.click();		// unselects the todo
		
		eq(todo1.selected, true);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, true);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		childLi1SelectButton.click();		// reselects the todo
		
		eq(todo1.selected, true);
		eq(todo1.deleted, false);
		eq(child1.selected, true);
		eq(child1.deleted, true);
		eq(grandchild1.selected, true);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), false);

		// Reset for next case
		selectAllButton.click();

		eq(todo1.selected, false);
		eq(child1.selected, false);
		eq(grandchild1.selected, false)
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);

		childLi1DeleteButton.click();

		eq(todo1.selected, false);
		eq(todo1.deleted, false);
		eq(child1.selected, false);
		eq(child1.deleted, false);
		eq(grandchild1.selected, false);
		eq(grandchild1.deleted, false);
		eq(showDeletedButton.textContent, '√ Deleted');
		eq(purgeSelectedDeletedButton.classList.contains('inactive'), true);
	},
	"Clicking the purgeSelectedDeletedButton should remove selected deleted todos from storage and display.": function() {
		// TODO disallow purging selected deleted todos that have undeleted nested todos

		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		todo1.addChild(child1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		todo3 = new Todo('Item 3');
		insertTodo(todos, todo3);

		renderTodolist();

		var todoLi2 = todolist.children[0].children[1];
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		eq(todos.length, 3);
		eq(todolist.children[0].children.length, 3);

		showDeletedButton.click();
		selectAllButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		purgeSelectedDeletedButton.click();

		eq(todos.length, 1);
		eq(todolist.children[0].children.length, 1);
	},
	"Section: more button interactions": function() {
	},
	"If showCompleted button text is 'Completed', clicking a todoLi Complete button should add todoLi class 'completed-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

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
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');

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
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

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
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

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
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');

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
	"If showCompleted button text is 'Completed', clicking 'Complete selected' button should add todoLi class 'completed-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];

		eq(showCompletedButton.textContent, '√ Completed');

		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todo1.completed, false);

		showCompletedButton.click();

		eq(showCompletedButton.textContent, 'Completed');

		selectAllButton.click();
		completeSelectedButton.click();

		eq(todoLi1.classList.contains('completed-removed'), true);
		eq(todo1.completed, true);
	},
	"If showActive button text is 'Active', clicking 'Uncomplete selected' button should add todoLi class 'active-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');

		selectAllButton.click();
		completeSelectedButton.click();

		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi1Entry.classList.contains('struck-completed'), true);
		eq(todo1.completed, true);

		showActiveButton.click();

		eq(showActiveButton.textContent, 'Active');

		completeSelectedButton.click();		// click 'Uncomplete selected'

		eq(todoLi1.classList.contains('active-removed'), true);
		eq(todoLi1Entry.classList.contains('struck-completed'), false);
		eq(todo1.completed, false);
	},
	"If showDeleted button text is 'Deleted', clicking 'Delete selected' button should add todoLi class 'deleted-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];

		eq(showDeletedButton.textContent, 'Deleted');

		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todo1.deleted, false);

		selectAllButton.click();
		deleteSelectedButton.click();

		eq(todoLi1.classList.contains('deleted-removed'), true);
		eq(todo1.deleted, true);
	},
	"If showActive button text is 'Active', clicking 'Undelete selected' button should add todoLi class 'active-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		renderTodolist();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		eq(showActiveButton.textContent, '√ Active');
		eq(showDeletedButton.textContent, 'Deleted');

		selectAllButton.click();
		deleteSelectedButton.click();

		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi1.classList.contains('deleted-removed'), true);
		eq(todoLi1Entry.classList.contains('faded-deleted'), true);
		eq(todo1.deleted, true);

		showActiveButton.click();

		eq(showActiveButton.textContent, 'Active');

		deleteSelectedButton.click();		// click 'Undelete selected'

		eq(todoLi1.classList.contains('active-removed'), true);
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi1Entry.classList.contains('faded-deleted'), false);
		eq(todo1.deleted, false);
	},
	"When selectAllButton text is 'Select all', it should toggle inactive when no todos are displayed.": function() {
		// Display can become empty through 1) click on todoLi delete or complete button
		// depending on state of filters
		// Also through 2) click on filter button
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		renderTodolist();
		var todoLi1 = todolist.children[0].children[0];
		var todoLi2 = todolist.children[0].children[1];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');

		// Case 1: toggling showActive

		eq(showActiveButton.textContent, '√ Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi2.classList.contains('active-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		showActiveButton.click();	// filter out active items, removes both items from display

		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), true);
		eq(todoLi2.classList.contains('active-removed'), true);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), true);

		showActiveButton.click();	// restore both items to display

		eq(showActiveButton.textContent, '√ Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(todoLi2.classList.contains('active-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		// Case 2: toggling showCompleted

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi2.classList.contains('completed-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi1CompleteButton.click();

		eq(todo1.completed, true);
		eq(todo2.completed, false);
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi2.classList.contains('completed-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi2CompleteButton.click();

		eq(todo1.completed, true);
		eq(todo2.completed, true);
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi2.classList.contains('completed-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		showCompletedButton.click();	// filter out completed items, removes both items from display

		eq(showCompletedButton.textContent, 'Completed');
		eq(todoLi1.classList.contains('completed-removed'), true);
		eq(todoLi2.classList.contains('completed-removed'), true);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), true);

		showCompletedButton.click();	// restore display of completed items

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi2.classList.contains('completed-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi1CompleteButton.click();
		todoLi2CompleteButton.click();

		// Case 3: toggling showDeleted

		showDeletedButton.click();		// display deleted items to start test case

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(todo1.deleted, false);
		eq(todo2.deleted, false);
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi1DeleteButton.click();

		eq(todo1.deleted, true);
		eq(todo2.deleted, false);
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi2DeleteButton.click();

		eq(todo1.deleted, true);
		eq(todo2.deleted, true);
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		showDeletedButton.click();	// filter out deleted items, removes both items from display

		eq(showDeletedButton.textContent, 'Deleted');
		eq(todoLi1.classList.contains('deleted-removed'), true);
		eq(todoLi2.classList.contains('deleted-removed'), true);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), true);

		showDeletedButton.click();	// restore display of deleted items

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		// reset to default for next case
		todoLi1DeleteButton.click();
		todoLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 4: deleting last todoLi displayed while deleted todos are filtered out

		eq(showDeletedButton.textContent, 'Deleted');
		eq(todo1.deleted, false);
		eq(todo2.deleted, false);
		eq(todoLi1.classList.contains('deleted-removed'), false);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi1DeleteButton.click();

		eq(todo1.deleted, true);
		eq(todo2.deleted, false);
		eq(todoLi1.classList.contains('deleted-removed'), true);
		eq(todoLi2.classList.contains('deleted-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi2DeleteButton.click();

		eq(todo1.deleted, true);
		eq(todo2.deleted, true);
		eq(todoLi1.classList.contains('deleted-removed'), true);
		eq(todoLi2.classList.contains('deleted-removed'), true);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), true);

		// reset to default for next case
		showDeletedButton.click();
		todoLi1DeleteButton.click();
		todoLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 5: completing last todoLi displayed while completed todos are filtered out

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todo1.completed, false);
		eq(todo2.completed, false);
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi2.classList.contains('completed-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		showCompletedButton.click();
		
		todoLi1CompleteButton.click();

		eq(showCompletedButton.textContent, 'Completed');
		
		eq(todo1.completed, true);
		eq(todo2.completed, false);
		eq(todoLi1.classList.contains('completed-removed'), true);
		eq(todoLi2.classList.contains('completed-removed'), false);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), false);

		todoLi2CompleteButton.click();

		eq(todo1.completed, true);
		eq(todo2.completed, true);
		eq(todoLi1.classList.contains('completed-removed'), true);
		eq(todoLi2.classList.contains('completed-removed'), true);
		eq(selectAllButton.textContent, 'Select all');
		eq(selectAllButton.classList.contains('inactive'), true);
	},
	"A todoLi's selectChildrenButton should toggle inactive when no child todos are displayed.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		grandchild1 = new Todo('Grandchild 1');
		grandchild2 = new Todo('Grandchild 2');
		child1.addChild(grandchild1);
		child1.addChild(grandchild2);
		renderTodolist();
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi2 = todoLi1Ul.children[1];
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi2CompleteButton = childLi2.children.namedItem('complete');
		var childLi2DeleteButton = childLi2.children.namedItem('delete');
		var childLi1Ul = childLi1.querySelector('ul');
		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi2 = childLi1Ul.children[1];
		var grandchildLi1CompleteButton = grandchildLi1.children.namedItem('complete');
		var grandchildLi1DeleteButton = grandchildLi1.children.namedItem('delete');
		var grandchildLi2CompleteButton = grandchildLi2.children.namedItem('complete');
		var grandchildLi2DeleteButton = grandchildLi2.children.namedItem('delete');


		// Case 1: toggling showActive

		todoLi1CompleteButton.click();		// todoLi1 will still be displayed when √ Active toggled off

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		showActiveButton.click();	// filter out active items, removes both children from display

		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(childLi1.classList.contains('active-removed'), true);
		eq(childLi2.classList.contains('active-removed'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);

		showActiveButton.click();	// restore both children to display

		eq(showActiveButton.textContent, '√ Active');
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		
		todoLi1CompleteButton.click();		// restore starting default for next case

		// Case 1A: toggling showActive with nested grandchildren

		todoLi1CompleteButton.click();		// todoLi1 will still be displayed when √ Active toggled off

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi1CompleteButton.click();		// childLi1 will still be displayed when √ Active toggled off

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi1.classList.contains('active-removed'), false);
		eq(grandchildLi2.classList.contains('active-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);


		showActiveButton.click();	// filter out active items, removes both grandchildren from display

		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(grandchildLi1.classList.contains('active-removed'), true);
		eq(grandchildLi2.classList.contains('active-removed'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), true);

		showActiveButton.click();	// restore both grandchildren to display

		eq(showActiveButton.textContent, '√ Active');
		eq(grandchildLi1.classList.contains('active-removed'), false);
		eq(grandchildLi2.classList.contains('active-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		
		todoLi1CompleteButton.click();		// restore starting default for next case
		childLi1CompleteButton.click();

		// Case 2: toggling showCompleted

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi1CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi2CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, true);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		showCompletedButton.click();	// filter out completed items, removes both children from display

		eq(showCompletedButton.textContent, 'Completed');
		eq(childLi1.classList.contains('completed-removed'), true);
		eq(childLi2.classList.contains('completed-removed'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);

		showCompletedButton.click();	// restore display of completed items

		eq(showCompletedButton.textContent, '√ Completed');
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		childLi1CompleteButton.click();
		childLi2CompleteButton.click();

		// Case 2A: toggling showCompleted with nested grandchildren

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		
		grandchildLi1CompleteButton.click();

		eq(grandchild1.completed, true);
		eq(grandchild2.completed, false);
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		grandchildLi2CompleteButton.click();

		eq(grandchild1.completed, true);
		eq(grandchild2.completed, true);
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		showCompletedButton.click();	// filter out completed items, removes both grandchildren from display

		eq(showCompletedButton.textContent, 'Completed');
		eq(grandchildLi1.classList.contains('completed-removed'), true);
		eq(grandchildLi2.classList.contains('completed-removed'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), true);

		showCompletedButton.click();	// restore display of completed items

		eq(showCompletedButton.textContent, '√ Completed');
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		grandchildLi1CompleteButton.click();
		grandchildLi2CompleteButton.click();

		// Case 3: toggling showDeleted

		showDeletedButton.click();		// display deleted items to start test case

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi1DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi2DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		showDeletedButton.click();	// filter out deleted items, removes both children from display

		eq(showDeletedButton.textContent, 'Deleted');
		eq(childLi1.classList.contains('deleted-removed'), true);
		eq(childLi2.classList.contains('deleted-removed'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);

		showDeletedButton.click();	// restore display of deleted items

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		childLi1DeleteButton.click();
		childLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 3A: toggling showDeleted with nested grandchildren

		showDeletedButton.click();		// display deleted items to start test case

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(grandchild1.deleted, false);
		eq(grandchild2.deleted, false);
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		grandchildLi1DeleteButton.click();

		eq(grandchild1.deleted, true);
		eq(grandchild2.deleted, false);
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		grandchildLi2DeleteButton.click();

		eq(grandchild1.deleted, true);
		eq(grandchild2.deleted, true);
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		showDeletedButton.click();	// filter out deleted items, removes both children from display

		eq(showDeletedButton.textContent, 'Deleted');
		eq(grandchildLi1.classList.contains('deleted-removed'), true);
		eq(grandchildLi2.classList.contains('deleted-removed'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), true);

		showDeletedButton.click();	// restore display of deleted items

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		grandchildLi1DeleteButton.click();
		grandchildLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 4: deleting last childLi displayed while deleted todos are filtered out

		eq(showDeletedButton.textContent, 'Deleted');
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi1DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), true);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi2DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(childLi1.classList.contains('deleted-removed'), true);
		eq(childLi2.classList.contains('deleted-removed'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);

		// reset to default for next case
		showDeletedButton.click();
		childLi1DeleteButton.click();
		childLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 5: completing last childLi displayed while completed todos are filtered out

		eq(showCompletedButton.textContent, '√ Completed');
		eq(child1.completed, false);
		eq(child2.completed, false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		showCompletedButton.click();
		
		eq(showCompletedButton.textContent, 'Completed'); // filter out completed items
		
		childLi1CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, false);
		eq(childLi1.classList.contains('completed-removed'), true);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);

		childLi2CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, true);
		eq(childLi1.classList.contains('completed-removed'), true);
		eq(childLi2.classList.contains('completed-removed'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);

		// reset to default
		showCompletedButton.click();
		childLi1CompleteButton.click();
		childLi2CompleteButton.click();
	},
	"A todoLi's showChildrenButton should toggle inactive when no child todos are displayed.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		grandchild1 = new Todo('Grandchild 1');
		grandchild2 = new Todo('Grandchild 2');
		child1.addChild(grandchild1);
		child1.addChild(grandchild2);
		renderTodolist();
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi2 = todoLi1Ul.children[1];
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1ShowChildrenButton = childLi1.children.namedItem('showChildren');
		var childLi2CompleteButton = childLi2.children.namedItem('complete');
		var childLi2DeleteButton = childLi2.children.namedItem('delete');
		var childLi1Ul = childLi1.querySelector('ul');
		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi2 = childLi1Ul.children[1];
		var grandchildLi1CompleteButton = grandchildLi1.children.namedItem('complete');
		var grandchildLi1DeleteButton = grandchildLi1.children.namedItem('delete');
		var grandchildLi2CompleteButton = grandchildLi2.children.namedItem('complete');
		var grandchildLi2DeleteButton = grandchildLi2.children.namedItem('delete');


		// Case 1: toggling showActive

		todoLi1CompleteButton.click();		// todoLi1 will still be displayed when √ Active toggled off

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		showActiveButton.click();	// filter out active items, removes both children from display

		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(childLi1.classList.contains('active-removed'), true);
		eq(childLi2.classList.contains('active-removed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		showActiveButton.click();	// restore both children to display

		eq(showActiveButton.textContent, '√ Active');
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		
		todoLi1CompleteButton.click();		// restore starting default for next case

		// Case 1A: toggling showActive with nested grandchildren

		todoLi1CompleteButton.click();		// todoLi1 will still be displayed when √ Active toggled off

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi1CompleteButton.click();		// childLi1 will still be displayed when √ Active toggled off

		eq(showActiveButton.textContent, '√ Active');
		eq(showCompletedButton.textContent, '√ Completed');
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi1.classList.contains('active-removed'), false);
		eq(grandchildLi2.classList.contains('active-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);


		showActiveButton.click();	// filter out active items, removes both grandchildren from display

		eq(showActiveButton.textContent, 'Active');
		eq(todoLi1.classList.contains('active-removed'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(childLi2.classList.contains('active-removed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1.classList.contains('active-removed'), false);
		eq(grandchildLi1.classList.contains('active-removed'), true);
		eq(grandchildLi2.classList.contains('active-removed'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		showActiveButton.click();	// restore both grandchildren to display

		eq(showActiveButton.textContent, '√ Active');
		eq(grandchildLi1.classList.contains('active-removed'), false);
		eq(grandchildLi2.classList.contains('active-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		
		todoLi1CompleteButton.click();		// restore starting default for next case
		childLi1CompleteButton.click();

		// Case 2: toggling showCompleted

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi1CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi2CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, true);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		showCompletedButton.click();	// filter out completed items, removes both children from display

		eq(showCompletedButton.textContent, 'Completed');
		eq(childLi1.classList.contains('completed-removed'), true);
		eq(childLi2.classList.contains('completed-removed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		showCompletedButton.click();	// restore display of completed items

		eq(showCompletedButton.textContent, '√ Completed');
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		childLi1CompleteButton.click();
		childLi2CompleteButton.click();

		// Case 2A: toggling showCompleted with nested grandchildren

		eq(showCompletedButton.textContent, '√ Completed');
		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		
		grandchildLi1CompleteButton.click();

		eq(grandchild1.completed, true);
		eq(grandchild2.completed, false);
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		grandchildLi2CompleteButton.click();

		eq(grandchild1.completed, true);
		eq(grandchild2.completed, true);
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		showCompletedButton.click();	// filter out completed items, removes both grandchildren from display

		eq(showCompletedButton.textContent, 'Completed');
		eq(grandchildLi1.classList.contains('completed-removed'), true);
		eq(grandchildLi2.classList.contains('completed-removed'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		showCompletedButton.click();	// restore display of completed items

		eq(showCompletedButton.textContent, '√ Completed');
		eq(grandchildLi1.classList.contains('completed-removed'), false);
		eq(grandchildLi2.classList.contains('completed-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		grandchildLi1CompleteButton.click();
		grandchildLi2CompleteButton.click();

		// Case 3: toggling showDeleted

		showDeletedButton.click();		// display deleted items to start test case

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi1DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi2DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		showDeletedButton.click();	// filter out deleted items, removes both children from display

		eq(showDeletedButton.textContent, 'Deleted');
		eq(childLi1.classList.contains('deleted-removed'), true);
		eq(childLi2.classList.contains('deleted-removed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		showDeletedButton.click();	// restore display of deleted items

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		childLi1DeleteButton.click();
		childLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 3A: toggling showDeleted with nested grandchildren

		showDeletedButton.click();		// display deleted items to start test case

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(grandchild1.deleted, false);
		eq(grandchild2.deleted, false);
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		grandchildLi1DeleteButton.click();

		eq(grandchild1.deleted, true);
		eq(grandchild2.deleted, false);
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		grandchildLi2DeleteButton.click();

		eq(grandchild1.deleted, true);
		eq(grandchild2.deleted, true);
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		showDeletedButton.click();	// filter out deleted items, removes both children from display

		eq(showDeletedButton.textContent, 'Deleted');
		eq(grandchildLi1.classList.contains('deleted-removed'), true);
		eq(grandchildLi2.classList.contains('deleted-removed'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		showDeletedButton.click();	// restore display of deleted items

		eq(showDeletedButton.textContent, '√ Deleted');
		eq(grandchildLi1.classList.contains('deleted-removed'), false);
		eq(grandchildLi2.classList.contains('deleted-removed'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);

		// reset to default for next case
		grandchildLi1DeleteButton.click();
		grandchildLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 4: deleting last childLi displayed while deleted todos are filtered out

		eq(showDeletedButton.textContent, 'Deleted');
		eq(child1.deleted, false);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), false);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi1DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, false);
		eq(childLi1.classList.contains('deleted-removed'), true);
		eq(childLi2.classList.contains('deleted-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi2DeleteButton.click();

		eq(child1.deleted, true);
		eq(child2.deleted, true);
		eq(childLi1.classList.contains('deleted-removed'), true);
		eq(childLi2.classList.contains('deleted-removed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		// reset to default for next case
		showDeletedButton.click();
		childLi1DeleteButton.click();
		childLi2DeleteButton.click();
		showDeletedButton.click();

		// Case 5: completing last childLi displayed while completed todos are filtered out

		eq(showCompletedButton.textContent, '√ Completed');
		eq(child1.completed, false);
		eq(child2.completed, false);
		eq(childLi1.classList.contains('completed-removed'), false);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		showCompletedButton.click();
		
		eq(showCompletedButton.textContent, 'Completed'); // filter out completed items
		
		childLi1CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, false);
		eq(childLi1.classList.contains('completed-removed'), true);
		eq(childLi2.classList.contains('completed-removed'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);

		childLi2CompleteButton.click();

		eq(child1.completed, true);
		eq(child2.completed, true);
		eq(childLi1.classList.contains('completed-removed'), true);
		eq(childLi2.classList.contains('completed-removed'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);

		// reset to default
		showCompletedButton.click();
		childLi1CompleteButton.click();
		childLi2CompleteButton.click();
	},
	"If all todos become unselected due to a Select button click, the app should toggle buttons as if receiving a selectAll click event to unselect all.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		

		renderTodolist();


		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');

		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');

		var childLi2 = todoLi1Ul.children[1];
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var childLi2CompleteButton = childLi2.children.namedItem('complete');
		var childLi2DeleteButton = childLi2.children.namedItem('delete');
		var childLi2AddSiblingButton = childLi2.children.namedItem('addSibling');
		var childLi2AddChildButton = childLi2.children.namedItem('addChild');

		var todoLi2 = todolist.children[0].children[1];
		var todoLi2SelectButton = todoLi2.children.namedItem('select');
		var todoLi2SelectChildrenButton = todoLi2.children.namedItem('selectChildren');
		var todoLi2CompleteButton = todoLi2.children.namedItem('complete');
		var todoLi2DeleteButton = todoLi2.children.namedItem('delete');
		var todoLi2AddSiblingButton = todoLi2.children.namedItem('addSibling');
		var todoLi2AddChildButton = todoLi2.children.namedItem('addChild');

		eq(selectAllButton.textContent, "Select all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);

		eq(todo2.selected, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), false);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);

		// Case 1: Item 1 Select button triggers unselect all

		selectAllButton.click();
		
		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		eq(todo2.selected, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();		// Unselect Item 1 children

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		eq(todo2.selected, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);


		todoLi2SelectButton.click();

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		eq(todo2.selected, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectButton.click();

		eq(selectAllButton.textContent, "Select all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);

		eq(todo2.selected, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.classList.contains('inactive'), true);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), false);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);

		// Case 2: Item 2 Select button triggers unselect all

		selectAllButton.click();
		
		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		eq(todo2.selected, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();		// Unselect Item 1 children

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		eq(todo2.selected, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectButton.click();

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		eq(todo2.selected, true);
		eq(todoLi2SelectButton.textContent, 'Unselect');
		eq(todoLi2SelectButton.classList.contains('inactive'), false);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), true);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		todoLi2SelectButton.click();

		eq(selectAllButton.textContent, "Select all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);

		eq(todo2.selected, false);
		eq(todoLi2SelectButton.textContent, 'Select');
		eq(todoLi2SelectButton.classList.contains('inactive'), true);
		eq(todoLi2SelectChildrenButton.textContent, 'Select children');
		eq(todoLi2SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi2CompleteButton.textContent, 'Complete');
		eq(todoLi2CompleteButton.classList.contains('inactive'), false);
		eq(todoLi2DeleteButton.textContent, 'Delete');
		eq(todoLi2DeleteButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.textContent, 'Add child');
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);
	}, 
	"If all todos become unselected due to a selectChildren button click, the app should toggle buttons as if receiving a selectAll click event to unselect all.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		grandchild1 = new Todo('Grandchild 1');
		grandchild2 = new Todo('Grandchild 2');
		child1.addChild(grandchild1);
		child1.addChild(grandchild2);
		

		renderTodolist();


		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');

		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');
		var childLi1ShowChildrenButton = childLi1.children.namedItem('showChildren');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1CompleteSelectedChildrenButton = childLi1.children.namedItem('completeSelectedChildren');
		var childLi1DeleteSelectedChildrenButton = childLi1.children.namedItem('deleteSelectedChildren');
		var childLi1Ul = childLi1.querySelector('ul');

		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi1SelectButton = grandchildLi1.children.namedItem('select');
		var grandchildLi1CompleteButton = grandchildLi1.children.namedItem('complete');
		var grandchildLi1DeleteButton = grandchildLi1.children.namedItem('delete');
		var grandchildLi1AddSiblingButton = grandchildLi1.children.namedItem('addSibling');
		var grandchildLi1AddChildButton = grandchildLi1.children.namedItem('addChild');

		var grandchildLi2 = childLi1Ul.children[1];
		var grandchildLi2SelectButton = grandchildLi2.children.namedItem('select');
		var grandchildLi2CompleteButton = grandchildLi2.children.namedItem('complete');
		var grandchildLi2DeleteButton = grandchildLi2.children.namedItem('delete');
		var grandchildLi2AddSiblingButton = grandchildLi2.children.namedItem('addSibling');
		var grandchildLi2AddChildButton = grandchildLi2.children.namedItem('addChild');

		var childLi2 = todoLi1Ul.children[1];
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var childLi2CompleteButton = childLi2.children.namedItem('complete');
		var childLi2DeleteButton = childLi2.children.namedItem('delete');
		var childLi2AddSiblingButton = childLi2.children.namedItem('addSibling');
		var childLi2AddChildButton = childLi2.children.namedItem('addChild');

		eq(selectAllButton.textContent, "Select all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, false);
		eq(grandchildLi1SelectButton.textContent, 'Select');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);

		eq(grandchild2.selected, false);
		eq(grandchildLi2SelectButton.textContent, 'Select');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);

		// Case 1: top-level branch Item 1 selectChildren button triggers unselect all

		selectAllButton.click();
		
		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(grandchild2.selected, true);
		eq(grandchildLi2SelectButton.textContent, 'Unselect');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectButton.click();

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(grandchild2.selected, true);
		eq(grandchildLi2SelectButton.textContent, 'Unselect');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(selectAllButton.textContent, "Select all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, false);
		eq(grandchildLi1SelectButton.textContent, 'Select');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);

		eq(grandchild2.selected, false);
		eq(grandchildLi2SelectButton.textContent, 'Select');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);

		// Case 2: nested branch Child 1 selectChildren button triggers unselect all

		selectAllButton.click();
		
		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(grandchild2.selected, true);
		eq(grandchildLi2SelectButton.textContent, 'Unselect');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		todoLi1SelectChildrenButton.click();

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, false);
		eq(grandchildLi1SelectButton.textContent, 'Select');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(grandchild2.selected, false);
		eq(grandchildLi2SelectButton.textContent, 'Select');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(grandchild2.selected, true);
		eq(grandchildLi2SelectButton.textContent, 'Unselect');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);
		
		todoLi1SelectButton.click();

		eq(selectAllButton.textContent, "Unselect all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(grandchild2.selected, true);
		eq(grandchildLi2SelectButton.textContent, 'Unselect');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(selectAllButton.textContent, "Select all");
		eq(completeSelectedButton.textContent, "Complete selected");
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.textContent, "Delete selected");
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, false);
		eq(grandchildLi1SelectButton.textContent, 'Select');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);

		eq(grandchild2.selected, false);
		eq(grandchildLi2SelectButton.textContent, 'Select');
		eq(grandchildLi2SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi2CompleteButton.textContent, 'Complete');
		eq(grandchildLi2CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi2DeleteButton.textContent, 'Delete');
		eq(grandchildLi2DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddChildButton.textContent, 'Add child');
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);
	}, 
	"If a parent's nested todos become unselected due to a lower-level Select button click, the app should toggle showChildren buttons as if receiving a click on the parent selectChildren button.": function() {
		fail();
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		todo1.addChild(child1);
		child1.addChild(grandchild1);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');

		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1ShowChildrenButton = childLi1.children.namedItem('showChildren');
		var childLi1Ul = childLi1.querySelector('ul');

		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1Ul.classList.contains('collapsed'), false);
		
		childLi1ShowChildrenButton.click();

		eq(childLi1Ul.classList.contains('collapsed'), true);

		todoLi1SelectChildrenButton.click();

		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);

		childLi1SelectButton.click();

		eq(childLi1ShowChildrenButton.textContent, 'Show children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1Ul.classList.contains('collapsed'), true);
	},
	"If a parent's nested todos become unselected due to a lower-level selectChildren button click, the app should toggle buttons as if receiving a click on the parent selectChildren button.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		grandchild1 = new Todo('Grandchild 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		child1.addChild(grandchild1);
		todo1.addChild(child2);

		renderTodolist();

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children.namedItem('select');
		var todoLi1CompleteButton = todoLi1.children.namedItem('complete');
		var todoLi1DeleteButton = todoLi1.children.namedItem('delete');
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1ShowChildrenButton = todoLi1.children.namedItem('showChildren');
		var todoLi1SelectChildrenButton = todoLi1.children.namedItem('selectChildren');
		var todoLi1CompleteSelectedChildrenButton = todoLi1.children.namedItem('completeSelectedChildren');
		var todoLi1DeleteSelectedChildrenButton = todoLi1.children.namedItem('deleteSelectedChildren');
		var todoLi1Ul = todoLi1.querySelector('ul');

		var childLi1 = todoLi1Ul.children[0];
		var childLi1SelectButton = childLi1.children.namedItem('select');
		var childLi1CompleteButton = childLi1.children.namedItem('complete');
		var childLi1DeleteButton = childLi1.children.namedItem('delete');
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');
		var childLi1ShowChildrenButton = childLi1.children.namedItem('showChildren');
		var childLi1SelectChildrenButton = childLi1.children.namedItem('selectChildren');
		var childLi1CompleteSelectedChildrenButton = childLi1.children.namedItem('completeSelectedChildren');
		var childLi1DeleteSelectedChildrenButton = childLi1.children.namedItem('deleteSelectedChildren');
		var childLi1Ul = childLi1.querySelector('ul');

		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi1SelectButton = grandchildLi1.children.namedItem('select');
		var grandchildLi1CompleteButton = grandchildLi1.children.namedItem('complete');
		var grandchildLi1DeleteButton = grandchildLi1.children.namedItem('delete');
		var grandchildLi1AddSiblingButton = grandchildLi1.children.namedItem('addSibling');
		var grandchildLi1AddChildButton = grandchildLi1.children.namedItem('addChild');
		
		var childLi2 = todoLi1Ul.children[1];
		var childLi2SelectButton = childLi2.children.namedItem('select');
		var childLi2CompleteButton = childLi2.children.namedItem('complete');
		var childLi2DeleteButton = childLi2.children.namedItem('delete');
		var childLi2AddSiblingButton = childLi2.children.namedItem('addSibling');
		var childLi2AddChildButton = childLi2.children.namedItem('addChild');

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, false);
		eq(grandchildLi1SelectButton.textContent, 'Select');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);

		todoLi1SelectChildrenButton.click();

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);

		eq(child1.selected, true);
		eq(childLi1SelectButton.textContent, 'Unselect');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		childLi1SelectButton.click();

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, true);
		eq(childLi2SelectButton.textContent, 'Unselect');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		childLi2SelectButton.click();

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), true);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), false);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), false);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), true);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), true);
		eq(childLi1SelectChildrenButton.textContent, 'Unselect children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, true);
		eq(grandchildLi1SelectButton.textContent, 'Unselect');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), false);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), false);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), true);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), true);

		childLi1SelectChildrenButton.click();

		eq(todo1.selected, false);
		eq(todoLi1SelectButton.textContent, 'Select');
		eq(todoLi1SelectButton.classList.contains('inactive'), true);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1CompleteButton.classList.contains('inactive'), false);
		eq(todoLi1DeleteButton.textContent, 'Delete');
		eq(todoLi1DeleteButton.classList.contains('inactive'), false);
		eq(todoLi1AddSiblingButton.textContent, 'Add sibling');
		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.textContent, 'Add child');
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(todoLi1ShowChildrenButton.textContent, 'Hide children');
		eq(todoLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(todoLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(todoLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(todoLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(child1.selected, false);
		eq(childLi1SelectButton.textContent, 'Select');
		eq(childLi1SelectButton.classList.contains('inactive'), true);
		eq(childLi1CompleteButton.textContent, 'Complete');
		eq(childLi1CompleteButton.classList.contains('inactive'), false);
		eq(childLi1DeleteButton.textContent, 'Delete');
		eq(childLi1DeleteButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.textContent, 'Add sibling');
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.textContent, 'Add child');
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1ShowChildrenButton.textContent, 'Hide children');
		eq(childLi1ShowChildrenButton.classList.contains('inactive'), false);
		eq(childLi1SelectChildrenButton.textContent, 'Select children');
		eq(childLi1SelectChildrenButton.classList.contains('inactive'), false);
		eq(childLi1CompleteSelectedChildrenButton.textContent, 'Complete selected children');
		eq(childLi1CompleteSelectedChildrenButton.classList.contains('inactive'), true);
		eq(childLi1DeleteSelectedChildrenButton.textContent, 'Delete selected children');
		eq(childLi1DeleteSelectedChildrenButton.classList.contains('inactive'), true);

		eq(grandchild1.selected, false);
		eq(grandchildLi1SelectButton.textContent, 'Select');
		eq(grandchildLi1SelectButton.classList.contains('inactive'), true);
		eq(grandchildLi1CompleteButton.textContent, 'Complete');
		eq(grandchildLi1CompleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1DeleteButton.textContent, 'Delete');
		eq(grandchildLi1DeleteButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.textContent, 'Add sibling');
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.textContent, 'Add child');
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);

		eq(child2.selected, false);
		eq(childLi2SelectButton.textContent, 'Select');
		eq(childLi2SelectButton.classList.contains('inactive'), true);
		eq(childLi2CompleteButton.textContent, 'Complete');
		eq(childLi2CompleteButton.classList.contains('inactive'), false);
		eq(childLi2DeleteButton.textContent, 'Delete');
		eq(childLi2DeleteButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.textContent, 'Add sibling');
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.textContent, 'Add child');
		eq(childLi2AddChildButton.classList.contains('inactive'), false);
	},
	"If showActive button is 'Active', addTodo button and todoLi addSibling and addChild buttons should be inactive.": function() {
		// Because by definition a new todo is active
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		child1 = new Todo('Child 1');
		child2 = new Todo('Child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		grandchild1 = new Todo('Grandchild 1');
		grandchild2 = new Todo('Grandchild 2');
		child1.addChild(grandchild1);
		child1.addChild(grandchild2);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		renderTodolist();		// sets up Actions bar buttons
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1AddSiblingButton = todoLi1.children.namedItem('addSibling');
		var todoLi1AddChildButton = todoLi1.children.namedItem('addChild');
		var todoLi1Ul = todoLi1.querySelector('ul');
		var childLi1 = todoLi1Ul.children[0];
		var childLi1AddSiblingButton = childLi1.children.namedItem('addSibling');
		var childLi1AddChildButton = childLi1.children.namedItem('addChild');
		var childLi1Ul = childLi1.querySelector('ul');
		var grandchildLi1 = childLi1Ul.children[0];
		var grandchildLi1AddSiblingButton = grandchildLi1.children.namedItem('addSibling');
		var grandchildLi1AddChildButton = grandchildLi1.children.namedItem('addChild');
		var grandchildLi2 = childLi1Ul.children[1];
		var grandchildLi2AddSiblingButton = grandchildLi2.children.namedItem('addSibling');
		var grandchildLi2AddChildButton = grandchildLi2.children.namedItem('addChild');
		var childLi2 = todoLi1Ul.children[1];
		var childLi2AddSiblingButton = childLi2.children.namedItem('addSibling');
		var childLi2AddChildButton = childLi2.children.namedItem('addChild');
		var todoLi2 = todolist.children[0].children[1];
		var todoLi2AddSiblingButton = todoLi2.children.namedItem('addSibling');
		var todoLi2AddChildButton = todoLi2.children.namedItem('addChild');

		eq(showActiveButton.textContent, '√ Active');

		eq(addTodoButton.classList.contains('inactive'), false);

		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);

		selectAllButton.click();
		completeSelectedButton.click();
		selectAllButton.click();

		showActiveButton.click();

		eq(addTodoButton.classList.contains('inactive'), true);

		eq(todoLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi1AddChildButton.classList.contains('inactive'), true);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi1AddChildButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), true);
		eq(childLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(childLi2AddChildButton.classList.contains('inactive'), true);
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), true);
		eq(todoLi2AddChildButton.classList.contains('inactive'), true);

		showActiveButton.click();

		eq(addTodoButton.classList.contains('inactive'), false);

		eq(todoLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi1AddChildButton.classList.contains('inactive'), false);
		eq(childLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi1AddChildButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi1AddChildButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(grandchildLi2AddChildButton.classList.contains('inactive'), false);
		eq(childLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(childLi2AddChildButton.classList.contains('inactive'), false);
		eq(todoLi2AddSiblingButton.classList.contains('inactive'), false);
		eq(todoLi2AddChildButton.classList.contains('inactive'), false);
	},
	"Section: Keyboard shortcuts": function() {
	},
	"When editing, Return should be a shortcut for Add Sibling.": function() {
		// Limit a todo to one line.
		manual();
		godolist.innerHTML = '';
		todos = [];
		renderTodolist();		// Initiate app with a blank focused todo
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1Entry = todoLi1.querySelector('p');

		var activeElement = document.activeElement;
		var activeElementFocused = document.hasFocus();

		eq(todosUl.children.length, 1);
		eq(todoLi1Entry, activeElement);
		eq(activeElementFocused, true);

		// keyup and keydown event properties are Read Only, so use KeyboardEvent constructor, which instantiates the properties
		// charCode is deprecated and isn't set in a normal Chrome keydown/keyup event
		// keyCode and which are deprecated but they are set in a normal Chrome keydown/keyup event
		var returnKeyProperties = {
			"key"		: "Enter",
			"code"		: "Enter",
			"keyCode"	: 13,
			"which"		: 13
		}
		testKeyDown = new KeyboardEvent('keydown', returnKeyProperties);

		testKeyUp= new KeyboardEvent('keyup', returnKeyProperties);

		todoLi1Entry.dispatchEvent(testKeyDown);
		todoLi1Entry.dispatchEvent(testKeyUp);

		// the right events are dispatched, but it doesn't trigger the app code
		eq(todosUl.children.length, 2);	// fails, still only one todoLi

		var todoLi2 = todosUl.children[1];
		var todoLi2Entry = todoLi2.querySelector('p');

		eq(todoLi2Entry, activeElement);
		eq(todoLi2Entry, focusedElement);
	},
	"When editing, Shift-Return should be a shortcut for Add Child.": function() {
		// Limit a todo to one line.
		manual();
	},
	"When editing, Esc should be a shortcut for Undo Edit.": function() {
		manual();
	},
	"Section: more features": function() {

	},
	"Todos should be read from and written to local storage.": function() {
		future();
	},
	"Todos in local storage should be synchronized with remote storage.": function() {
		future();
	},
	"There should be a way to show nested filtered todos when parents are hidden.": function() {
		// E.g. currently, if only the Completed filter is checked (√ Completed), then completed todos that are children
		// of active or deleted todos will not be shown. There should be a way to find all the completed todos and
		// show them in a special display that indicates nesting but does not show parents that are filtered out.
		future();	
	},
	"There should be a way to move a todo up in the list, for example to the top of the list.": function() {
		// An 'Add above' button? 'Shift-up/down' button? Drag to new position?
		future();
	},
	"There should be a 'find' input to filter the display according to keywords or entry text.": function() {
		future();
	}, 
	"Each todoLi should have a 'zoom in/out' button to filter the display to just that todoLi.": function() {
		// Simplifies the UI: can remove selectChildren, which currently has no buttons to operate on the selection.
		// Simplifies the filtered todo displays, which don't have to take child todos into account.
		future();
	},
	"When todoLi zoom button is clicked, other buttons should be hidden, class should toggle 'zoomed' and all other todoLis should toggle class 'unzoomed'.": function() {
		future();
	},
	"When a todoLi is zoomed in, the actions bar buttons should apply only to the todoLi's children.": function() {
		future();
	},
	"Section: On startup": function() {

	},
	"The app should set todo.selected to false on startup.": function() {
		// Startup should produce a clean slate with no selected todos.
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
		eq(todoLi1.children.namedItem('select').textContent, 'Select');
		eq(todoLi2.children.namedItem('select').textContent, 'Select');
		eq(selectAllButton.textContent, 'Select all');
	},
	"If todos array is empty at startup, the app should create a new empty todo.": function() {
		todos = [];
		startApp();
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];

		eq(todos.length, 1);
		eq(todosUl.children.length, 1);
		eq(todoLi1.querySelector('p').textContent, '');
	}
});
