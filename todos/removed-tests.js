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
		var todoLi1SelectedButton = todoLi1.children[selectedIndex];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi1DeletedButton = todoLi1.children[deleteIndex];
		var todoLi2 = todosUl.children[1];
		var todoLi2SelectedButton = todoLi2.children[selectedIndex];
		var todoLi2CompleteButton = todoLi2.children[completedIndex];
		var todoLi2DeletedButton = todoLi2.children[deleteIndex];
		var todoLi3 = todosUl.children[2];
		var todoLi3SelectedButton = todoLi3.children[selectedIndex];
		var todoLi3CompleteButton = todoLi3.children[completedIndex];
		var todoLi3DeletedButton = todoLi3.children[deleteIndex];
		var todoLi4 = todosUl.children[3];
		var todoLi4SelectedButton = todoLi4.children[selectedIndex];
		var todoLi4CompleteButton = todoLi4.children[completedIndex];
		var todoLi4DeletedButton = todoLi4.children[deleteIndex];

		eq(todosUl.childElementCount, 4);
		eq(todoLi1.id, todo1.id);
		eq(todoLi1SelectedButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi1DeletedButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2.id, todo2.id);
		eq(todoLi2SelectedButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		//eq(todoLi2CompleteButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi2DeletedButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3.id, todo3.id);
		eq(todoLi3SelectedButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		//eq(todoLi3CompleteButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
		eq(todoLi3DeletedButton.classList.contains('deleted'), true);
		eq(todo3.deleted, true);
		eq(todoLi4.id, todo4.id);
		eq(todoLi4SelectedButton.classList.contains('selected'), false);
		eq(todo4.selected, false);
		//eq(todoLi4CompleteButton.classList.contains('completed'), false);
		eq(todo4.completed, false);
		eq(todoLi4DeletedButton.classList.contains('deleted'), false);
		eq(todo4.deleted, false);
	},

	"Clicking the 'selectAll' button should toggle its class 'selected'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');		// selectAllButton.click() would fail without a todo in the todos array
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];

		var actionsDiv = document.getElementById('actions');
		var selectAllButton = document.getElementsByName('selectAll')[0];
		selectAllButton.classList.remove('selected');	// re-set to default

		eq(selectAllButton.classList.contains('selected'), false);

		selectAllButton.click();

		eq(selectAllButton.classList.contains('selected'), true);	
		
		selectAllButton.click();

		eq(selectAllButton.classList.contains('selected'), false);	
	},
	"When class is '', clicking the 'selectAll' button should select all displayed top-level todos.": function() {
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
	"When class is 'selected', clicking the 'selectAll' button should unselect all displayed top-level todos.": function() {
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
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];

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

	"Clicking the 'Complete' button should toggle its class 'completed'.": function() {
		var actionsDiv = document.getElementById('actions');
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		completeSelectedButton.classList.remove('completed');	// re-set to default

		eq(completeSelectedButton.classList.contains('completed'), false);

		completeSelectedButton.click();
		
		eq(completeSelectedButton.classList.contains('completed'), true);

		completeSelectedButton.click();

		eq(completeSelectedButton.classList.contains('completed'), false);
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
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi2CompleteButton = todoLi2.children[completedIndex];
		var todoLi3SelectButton = todoLi3.children[selectedIndex];
		var todoLi3CompleteButton = todoLi3.children[completedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.classList.contains('completed'), false);
		eq(todo3.completed, false);

		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		completeSelectedButton.classList.remove('completed');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		completeSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.classList.contains('completed'), false);
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
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi2CompleteButton = todoLi2.children[completedIndex];
		var todoLi3SelectButton = todoLi3.children[selectedIndex];
		var todoLi3CompleteButton = todoLi3.children[completedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.classList.contains('completed'), false);
		eq(todo3.completed, false);

		completeSelectedButton = document.getElementsByName('completeSelected')[0];
		completeSelectedButton.classList.remove('completed');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		completeSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.classList.contains('completed'), true);
		eq(todo2.completed, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.classList.contains('completed'), false);
		eq(todo3.completed, false);

		completeSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3CompleteButton.classList.contains('completed'), false);
		eq(todo3.completed, false);
	},
	"When a selected todo is marked completed, the 'Complete' button class should be set to 'completed'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));
		todoLi1 = todolist.children[0].children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);

		completeSelectedButton = document.getElementsByName('completeSelected')[0];
		completeSelectedButton.classList.remove('completed');	// re-set to default

		eq(completeSelectedButton.classList.contains('completed'), false);

		todoLi1SelectButton.click();
		todoLi1CompleteButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(completeSelectedButton.classList.contains('completed'), true);
	},
	"If no selected todos are marked completed, the 'Complete' button class should be set to ''.": function() {
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
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		selectAllButton.classList.remove('selected');
		completeSelectedButton.classList.remove('completed');

		// defaults
		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);

		eq(selectAllButton.classList.contains('selected'), false);
		eq(completeSelectedButton.classList.contains('completed'), false);

		// todos selected, Mark Completed class should remain ''
		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(selectAllButton.classList.contains('selected'), true);
		eq(completeSelectedButton.classList.contains('completed'), false);

		// a todo marked completed and selected, Mark Completed class should toggle on
		// (covered by previous test)
		todoLi1CompleteButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(selectAllButton.classList.contains('selected'), true);
		eq(completeSelectedButton.classList.contains('completed'), true);

		// selected todo toggled to incompleted, Mark Completed class should toggle off
		todoLi1CompleteButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);
		eq(selectAllButton.classList.contains('selected'), true);
		eq(completeSelectedButton.classList.contains('completed'), false);
		},
	"Clicking the 'Delete selected' button should toggle its class between 'deleted' and ''.": function() {
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		eq(deleteSelectedButton.classList.contains('deleted'), false);

		deleteSelectedButton.click();

		eq(deleteSelectedButton.classList.contains('deleted'), true);
		
		deleteSelectedButton.click();

		eq(deleteSelectedButton.classList.contains('deleted'), false);
	},
	"When class is '', clicking the 'Delete selected' button should mark each selected todo deleted.": function() {
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

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		deleteSelectedButton.classList.remove('deleted');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);
	},
	"When class is '', clicking the 'Delete selected' button should hide deleted todos.": function() {
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

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		deleteSelectedButton.classList.remove('deleted');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi1.classList.contains('hide'), true);
		eq(todoLi1.style.display, 'none');
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi2.classList.contains('hide'), true);
		eq(todoLi2.style.display, 'none');
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);
		eq(todoLi3.classList.contains('hide'), false);
	},
	"When class is '', clicking the 'Delete selected' button should set button text to 'Undelete'.": function() {
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		deleteSelectedButton.classList.remove('deleted');
		deleteSelectedButton.textContent = 'Delete selected';	// restore default

		eq(deleteSelectedButton.textContent, 'Delete selected');

		deleteSelectedButton.click();

		eq(deleteSelectedButton.textContent, 'Undelete');
	},
	"When class is 'deleted', clicking the 'Undelete' button should set button name to 'Delete selected'.": function() {
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		deleteSelectedButton.classList.remove('deleted');
		deleteSelectedButton.textContent = 'Delete selected';	// restore default

		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(deleteSelectedButton.classList.contains('deleted'), false);

		deleteSelectedButton.click();

		eq(deleteSelectedButton.textContent, 'Undelete');
		eq(deleteSelectedButton.classList.contains('deleted'), true);

		deleteSelectedButton.click();

		eq(deleteSelectedButton.textContent, 'Delete selected');
		eq(deleteSelectedButton.classList.contains('deleted'), false);
	},
	"When class is 'deleted', clicking the 'Undelete' button should mark each selected todo undeleted.": function() {
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

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		deleteSelectedButton.classList.remove('deleted');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		deleteSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);
	},
	"When class is 'deleted', clicking the 'Undelete' button should un-hide each deleted todo.": function() {
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

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		deleteSelectedButton.classList.remove('deleted');	// re-set to default

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();
		deleteSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi1.classList.contains('hide'), true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi2.classList.contains('hide'), true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);
		eq(todoLi3.classList.contains('hide'), false);

		deleteSelectedButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi1.classList.contains('hide'), false);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi2.classList.contains('hide'), false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);
		eq(todoLi3.classList.contains('hide'), false);
	},
	"When class is '', clicking the 'Delete selected' button should set 'Select all' button class to ''.": function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		// restore defaults
		selectAllButton.classList.remove('selected');
		deleteSelectedButton.classList.remove('deleted');
		deleteSelectedButton.textContent = 'Delete selected';

		eq(selectAllButton.classList.contains('selected'), false);
		eq(deleteSelectedButton.classList.contains('deleted'), false);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		selectAllButton.click();

		eq(selectAllButton.classList.contains('selected'), true);
		eq(deleteSelectedButton.classList.contains('deleted'), false);
		eq(deleteSelectedButton.textContent, 'Delete selected');
		
		deleteSelectedButton.click();

		eq(selectAllButton.classList.contains('selected'), false);
		eq(deleteSelectedButton.classList.contains('deleted'), true);
		eq(deleteSelectedButton.textContent, 'Undelete');
	},
	"When class is 'deleted', clicking the 'Select all' button should set 'Delete selected' class to ''.": function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		selectAllButton.classList.remove('selected');
		deleteSelectedButton.classList.add('deleted');

		eq(selectAllButton.classList.contains('selected'), false);

		selectAllButton.click();

		eq(deleteSelectedButton.classList.contains('deleted'), false);
	},
	"When class is 'deleted', clicking 'Select all' button should set 'Undelete' button text to 'Delete selected'.": function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		selectAllButton.classList.remove('selected');
		deleteSelectedButton.classList.add('deleted');

		eq(selectAllButton.classList.contains('selected'), false);

		selectAllButton.click();

		eq(deleteSelectedButton.textContent, 'Delete selected');
	},
	"When class is 'deleted', clicking the 'Select all' button should unselect deleted todos.": function() {
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

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		var selectAllButton = document.getElementsByName('selectAll')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		// restore defaults
		selectAllButton.classList.remove('selected');
		deleteSelectedButton.classList.remove('deleted');
		deleteSelectedButton.textContent = 'Delete selected';

		eq(selectAllButton.classList.contains('selected'), false);
		eq(deleteSelectedButton.classList.contains('deleted'), false);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		todoLi1SelectButton.click();
		todoLi2SelectButton.click();

		eq(selectAllButton.classList.contains('selected'), true);
		eq(deleteSelectedButton.classList.contains('deleted'), false);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), false);
		eq(todo1.deleted, false);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), false);
		eq(todo2.deleted, false);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		deleteSelectedButton.click();

		eq(selectAllButton.classList.contains('selected'), false);
		eq(deleteSelectedButton.classList.contains('deleted'), true);
		eq(deleteSelectedButton.textContent, 'Undelete');
		
		eq(todo1.selected, true);
		eq(todoLi1DeleteButton.classList.contains('deleted'), true);
		eq(todo1.deleted, true);
		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2DeleteButton.classList.contains('deleted'), true);
		eq(todo2.deleted, true);
		eq(todoLi3SelectButton.classList.contains('selected'), false);
		eq(todo3.selected, false);
		eq(todoLi3DeleteButton.classList.contains('deleted'), false);
		eq(todo3.deleted, false);

		selectAllButton.click();

		eq(selectAllButton.classList.contains('selected'), true);
		eq(deleteSelectedButton.classList.contains('deleted'), false);
		eq(deleteSelectedButton.textContent, 'Delete selected');

		// old list is gone, new list just contains todo3
		var todosUl = todolist.children[0];
		var todoLi1 = todosUl.children[0];
		var todoLi1SelectButton = todoLi1.children[selectedIndex];
		eq(todosUl.children.length, 1);
		eq(todoLi1.id, todo3.id);
		eq(todoLi1SelectButton.classList.contains('selected'), true);
		eq(todo1.deleted, true);
		eq(todo2.selected, false);
		eq(todo2.deleted, true);
		eq(todo3.selected, true);
		eq(todo3.deleted, false);
	},

	"If todo.selected is true for any todos on startup, 'completeSelected' and 'deleteSelected' class should be ''.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');	
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');	
		todo2.markSelected(true);
		insertTodo(todos, todo2);
		startApp();
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];

		eq(selectAllButton.textContent, 'Unselect all');
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.classList.contains('inactive'), false);

	},
	"If todo.selected is not true for any todos on startup, 'completeSelected' and 'deleteSelected' class should be 'inactive'.": function() {
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');	
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');	
		insertTodo(todos, todo2);
		startApp();
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];

		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.classList.contains('inactive'), true);

	},
	"Clicking selectAll button should toggle class 'inactive' on and off for  'completeSelected' and 'deleteSelected' buttons.": function() {
		var selectAllButton = document.getElementsByName('selectAll')[0];
		var completeSelectedButton = document.getElementsByName('completeSelected')[0];
		var deleteSelectedButton = document.getElementsByName('deleteSelected')[0];
		document.getElementById('todolist').innerHTML = '';
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		todo2 = new Todo('Item 2');
		insertTodo(todos, todo2);
		var todolist = document.getElementById('todolist');
		todolist.appendChild(createTodosUl(todos));

		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.classList.contains('inactive'), true);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Unselect all');
		eq(completeSelectedButton.classList.contains('inactive'), false);
		eq(deleteSelectedButton.classList.contains('inactive'), false);

		selectAllButton.click();

		eq(selectAllButton.textContent, 'Select all');
		eq(completeSelectedButton.classList.contains('inactive'), true);
		eq(deleteSelectedButton.classList.contains('inactive'), true);
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
		var todoLi2 = todosUl.children[1];
		var todoLi3 = todosUl.children[2];

		eq(todosUl.childElementCount, 3);						// base case, no filter
		eq(todoLi1.id, todo1.id);
		eq(todoLi2.id, todo2.id);
		eq(todoLi3.id, todo3.id);

		var showAllButton = document.getElementsByName('showAll')[0];

		showAllButton.click();									// test 'all' filter

		// Re-set dom element variables because showAll click handler erases old todolist content.
		todosUl = todolist.children[0];
		todoLi1 = todosUl.children[0];
		todoLi2 = todosUl.children[1];
		todoLi3 = todosUl.children[2];

		eq(todosUl.childElementCount, 2);

		eq(todosUl.children[0], todoLi1);
		eq(todoLi1.id, todo1.id);
		eq(todosUl.children[1], todoLi2);
		eq(todoLi2.id, todo2.id);
		eq(todoLi3, undefined);
	},

	"Unselecting the last selected top-level todo should set 'selectAll' button class to ''.": function() {
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
	"When a top-level todo is selected, the 'selectAll' button class should be set to 'selected'.": function() {
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
	"When an unselected todo is marked completed, the completeSelected button text should not change.": function() {
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
		var todoLi1CompleteButton = todoLi1.children[completedIndex];
		var todoLi2SelectButton = todoLi2.children[selectedIndex];
		var todoLi2CompleteButton = todoLi2.children[completedIndex];

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);
		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);

		completeSelectedButton = document.getElementsByName('completeSelected')[0];
		completeSelectedButton.classList.remove('completed');	// re-set to default

		eq(completeSelectedButton.classList.contains('completed'), false);

		todoLi1CompleteButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);
		eq(completeSelectedButton.classList.contains('completed'), false);

		eq(todoLi2SelectButton.classList.contains('selected'), false);
		eq(todo2.selected, false);
		eq(todoLi2CompleteButton.classList.contains('completed'), false);
		eq(todo2.completed, false);

		todoLi2SelectButton.click();
		completeSelectedButton.click();
		
		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), true);
		eq(todo1.completed, true);

		eq(todoLi2SelectButton.classList.contains('selected'), true);
		eq(todo2.selected, true);
		eq(todoLi2CompleteButton.classList.contains('completed'), true);
		eq(todo2.completed, true);

		eq(completeSelectedButton.classList.contains('completed'), true);

		todoLi1CompleteButton.click();

		eq(todoLi1SelectButton.classList.contains('selected'), false);
		eq(todo1.selected, false);
		eq(todoLi1CompleteButton.classList.contains('completed'), false);
		eq(todo1.completed, false);

		eq(completeSelectedButton.classList.contains('completed'), true);
	},
	"If showCompleted button text is '√ Completed', clicking a todoLi complete button should remove todoLi class 'completed-removed'.": function() {
		todos = [];
		todo1 = new Todo('Item 1');
		insertTodo(todos, todo1);
		
		startApp();
		
		var todoLi1 = todolist.children[0].children[0];
		var todoLi1CompleteButton = todoLi1.children[completedIndex];

		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');

		var showCompletedButton = document.getElementsByName('showCompleted')[0];

		eq(showCompletedButton.textContent, '√ Completed');

		todoLi1CompleteButton.click();

		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi1CompleteButton.textContent, 'Uncomplete');

		todoLi1CompleteButton.click();

		eq(todoLi1.classList.contains('completed-removed'), false);
		eq(todoLi1CompleteButton.textContent, 'Complete');

	},
	"The header actions bar should have an Undelete button to undo a deletion caused by clicking a todoLi Delete button.": function() {
		var actionsDiv = document.getElementById('actions');
		var undeleteButton = document.getElementsByName('undelete')[0];
		eq(undeleteButton.nodeName, 'BUTTON');
		eq(undeleteButton.innerText, 'Undelete');
		eq(actionsDiv.children[7], undeleteButton);
	},
