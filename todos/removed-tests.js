	"If 'selected' button class is '', button text should be 'Select'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todoLi1SelectButton.textContent, 'Select');
	},
	"If 'selected' button class is 'selected', button text should be 'Unselect'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markSelected(true);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todoLi1SelectButton.textContent, 'Unselect');
	},
	"Clicking 'selected' button should toggle its text between 'Select' and 'Unselect'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todoLi1SelectButton.textContent, 'Select');

		todoLi1SelectButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todoLi1SelectButton.textContent, 'Unselect');

		todoLi1SelectButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todoLi1SelectButton.textContent, 'Select');
	},

	"Clicking a 'completed' button should toggle class='completed' on it and toggle todo.completed.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);

		todoLi1CompleteButton.click();

		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
	},
	"If 'completed' button class is '', button text should be 'Complete' and entry line decoration ''.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
		eq(todoLi1.children[entryIndex].style.textDecorationLine, '');
	},
	"If 'completed' button class is 'completed', button text should be 'Uncomplete' and entry line decoration 'line-through'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markCompleted(true);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');
		eq(todoLi1.children[entryIndex].classList.contains('struck'), true);
	},
	"Clicking a 'completed' button should toggle its text between 'Complete' and 'Uncomplete'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');

		todoLi1CompleteButton.click();

		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');

		todoLi1CompleteButton.click();

		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');
	},
	"Clicking a 'completed' button should toggle entry line decoration style between none and line-through.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		todoLi1CompleteButton.click();

		eq(todoLi1.children[entryIndex].classList.contains('struck'), true);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);

		todoLi1CompleteButton.click();

		eq(todoLi1.children[entryIndex].classList.contains('struck'), false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
	},
	"Clicking a 'delete' button should toggle class='deleted' on it and toggle todo.deleted.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeleteButton = todoLi1.children[deleteIndex];

		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);

		todoLi1DeleteButton.click();

		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
	},
	"If 'deleted' button class is '', button text should be 'Delete'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeletedButton = todoLi1.children[deleteIndex];

		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todoLi1DeletedButton.textContent, 'Delete');
	},
	"If 'deleted' button class is 'deleted', button text should be 'Undelete'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1.markDeleted(true);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeletedButton = todoLi1.children[deleteIndex];

		eq(todoLi1DeletedButton.classList.contains('deleted'), true);
		eq(todoLi1DeletedButton.textContent, 'Undelete');
	},
	"Clicking 'delete' button should toggle its text between 'Delete' and 'Undelete'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1DeletedButton = todoLi1.children[deleteIndex];

		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todoLi1DeletedButton.textContent, 'Delete');

		todoLi1DeletedButton.click();

		eq(todoLi1DeletedButton.classList.contains('deleted'), true);
		eq(todoLi1DeletedButton.textContent, 'Undelete');

		todoLi1DeletedButton.click();

		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todoLi1DeletedButton.textContent, 'Delete');
	},

	"If showChildren button class is '', clicking button should set class to 'hide'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1Child1 = new Todo('Item 1 child 1');
		todo1.addChild(todo1Child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];

		eq(todoLi1ShowChildren.classList.contains('hide'), false);

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), true);
	},
	"If showChildren button class is '', clicking button should set text to 'Show children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1Child1 = new Todo('Item 1 child 1');
		todo1.addChild(todo1Child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];
		todoLi1ShowChildren.textContent = 'Hide children';

		eq(todoLi1ShowChildren.classList.contains('hide'), false);
		eq(todoLi1ShowChildren.textContent, 'Hide children');

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), true);
		eq(todoLi1ShowChildren.textContent, 'Show children');
	},
	"If showChildren button class is 'hide', clicking button should remove class 'hide'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1Child1 = new Todo('Item 1 child 1');
		todo1.addChild(todo1Child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];
		todoLi1ShowChildren.classList.add('hide');

		eq(todoLi1ShowChildren.classList.contains('hide'), true);

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), false);
	},
	"If showChildren button class is 'hide', clicking button should set text to 'Hide children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1Child1 = new Todo('Item 1 child 1');
		todo1.addChild(todo1Child1);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];
		todoLi1ShowChildren.classList.add('hide');
		todoLi1ShowChildren.textContent = 'Show children';

		eq(todoLi1ShowChildren.classList.contains('hide'), true);
		eq(todoLi1ShowChildren.textContent, 'Show children');

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), false);
		eq(todoLi1ShowChildren.textContent, 'Hide children');
	},
	"If showChildren button class is '', clicking button should add 'hide' to child todoLis.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1Child1 = new Todo('Item 1 child 1');
		todo1.addChild(todo1Child1);
		todo1Child2 = new Todo('Item 1 child 2');
		todo1.addChild(todo1Child2);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];
		var todoLi1Ul = todoLi1.children[todoLiUlIndex];
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];

		eq(todoLi1ShowChildren.classList.contains('hide'), false);
		eq(todoLi1Child1.classList.contains('hide'), false);
		eq(todoLi1Child2.classList.contains('hide'), false);

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), true);
		eq(todoLi1Child1.classList.contains('hide'), true);
		eq(todoLi1Child2.classList.contains('hide'), true);
	},
	"If showChildren button class is 'hide', clicking button should set remove 'hide' from child todoLis.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		todo1Child1 = new Todo('Item 1 child 1');
		todo1.addChild(todo1Child1);
		todo1Child2 = new Todo('Item 1 child 2');
		todo1.addChild(todo1Child2);
		insertTodo(todos, todo1);
		todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		var todoLi1 = todolist.children[0].children[0];
		var todoLi1ShowChildren = todoLi1.children[showChildrenIndex];
		var todoLi1Ul = todoLi1.children[todoLiUlIndex];
		var todoLi1Child1 = todoLi1Ul.children[0];
		var todoLi1Child2 = todoLi1Ul.children[1];

		eq(todoLi1ShowChildren.classList.contains('hide'), false);
		eq(todoLi1Child1.classList.contains('hide'), false);
		eq(todoLi1Child2.classList.contains('hide'), false);

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), true);
		eq(todoLi1Child1.classList.contains('hide'), true);
		eq(todoLi1Child2.classList.contains('hide'), true);

		todoLi1ShowChildren.click();

		eq(todoLi1ShowChildren.classList.contains('hide'), false);
		eq(todoLi1Child1.classList.contains('hide'), false);
		eq(todoLi1Child2.classList.contains('hide'), false);
	},

	"If selectChildren button class doesn't contain 'selected', button text should be 'Select children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(todoLi1SelectChildrenButton.classList.contains('inactive'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
	},
//	"If selectChildren button class is 'selected', button text should be 'Unselect children'.": function() {
//		document.getElementById('todolist').innerHTML = '';
//		todos = [];
//		todo1 = new Todo('Item 1');
//		insertTodo(todos, todo1);
//		var todolist = document.getElementById('todolist');
//		todolist.appendChild(createTodosUl(todos));
//		todoLi1 = todolist.children[0].children[0];
//		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];
//		todoLi1SelectChildrenButton.classList.add('selected');
//
//		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
//		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');
//	},
	"If a todo has children, clicking its selectChildren button should toggle class='selected' or '' on it.": function() {
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
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

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
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
	},
	"If a todo has children, clicking its selectChildren button should toggle its text between 'Select/Unselect children'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		var child1 = new Todo('child 1');
		var child2 = new Todo('child 2');
		todo1.addChild(child1);
		todo1.addChild(child2);
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(todoLi1SelectChildrenButton.textContent, 'Unselect children');

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(todoLi1SelectChildrenButton.textContent, 'Select children');
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
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		var child1Li = todoLi1.children[todoLiUlIndex].children[0];
		var child1LiSelectButton = child1Li.children[selectedIndex];
		var child2Li = todoLi1.children[todoLiUlIndex].children[1];
		var child2LiSelectButton = child2Li.children[selectedIndex];
		
		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);
		eq(child1.selected, false);
		eq(child2.selected, false);

		todoLi1SelectChildrenButton.click();

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(child1LiSelectButton.classList.contains('selected'), true);
		eq(child2LiSelectButton.classList.contains('selected'), true);
		eq(child1.selected, true);
		eq(child2.selected, true);
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
		var todoLi1SelectChildrenButton = todoLi1.children[selectChildrenIndex];

		var child1Li = todoLi1.children[todoLiUlIndex].children[0];
		var child1LiSelectButton = child1Li.children[selectedIndex];
		var child2Li = todoLi1.children[todoLiUlIndex].children[completedIndex];
		var child2LiSelectButton = child2Li.children[selectedIndex];
		
		// Case one: child todos are all unselected

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);
		eq(child1.selected, false);
		eq(child2.selected, false);

		todoLi1SelectChildrenButton.click();	// first click sets class='selected'

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(child1LiSelectButton.classList.contains('selected'), true);
		eq(child2LiSelectButton.classList.contains('selected'), true);
		eq(child1.selected, true);
		eq(child2.selected, true);

		todoLi1SelectChildrenButton.click();	// second click sets class=''

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);
		eq(child1.selected, false);
		eq(child2.selected, false);

		// Case two: child todos are not all selected or unselected, so they can't just be toggled

		child2LiSelectButton.classList.add('selected');
		child2.markSelected(true);

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), true);
		eq(child1.selected, false);
		eq(child2.selected, true);

		todoLi1SelectChildrenButton.click();	// first click sets class='selected'

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), true);
		eq(child1LiSelectButton.classList.contains('selected'), true);
		eq(child2LiSelectButton.classList.contains('selected'), true);
		eq(child1.selected, true);
		eq(child2.selected, true);

		child1LiSelectButton.classList.remove('selected');
		child1.markSelected(false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child1.selected, false);

		todoLi1SelectChildrenButton.click();	// second click sets class=''

		eq(todoLi1SelectChildrenButton.classList.contains('selected'), false);
		eq(child1LiSelectButton.classList.contains('selected'), false);
		eq(child2LiSelectButton.classList.contains('selected'), false);
		eq(child1.selected, false);
		eq(child2.selected, false);
	},

