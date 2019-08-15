###Beasts _8. Nested todos_

Like todos-mvc but any todo can have nested todos. See Workflowy for inspiration.

##Workflowy notes
No undelete! I deleted the inbox and now it is gone.
Add a note by clicking the end of the one above where you want it and hitting Return
	If you hit Return while in the middle of an entry, it will make a new entry below with what was to the right of the cursor. Backspace to undo.
When you click a bullet, that entry becomes the headline and everything above it goes to breadcrumbs.
	You need to click on a breadcrumb or the browser back button to get out of it.
Indent/outdent with tab/shift-tab
It indicates the presence of children with a triangle that becomes visible when hovering on the entry.
To add the first child, you have to click the entry's bullet to make it the header. Then there is a +
symbol to add a child entry.
The + symbol stays visible below the last entry in the current branch.
No set all completed button.
Icon ... appears to left of an entry when you hover over it.
	When clicked, it shows a menu
		Complete/uncomplete
		Add note (add a note to the todo entry)
		Duplicate
		Share
		Export
		Copy link
		Expand all		expands grandchildren too 
		Collapse all	 
		Delete			no undelete! be careful!
Up/down arrow keys go up/down the entries without regard to indentation
Left/right arrow keys go left/right in the text of an entry or up/down if you are at the start/end of the entry
Notes feature allows you to add paragraphs of text.
hashtags and @users for organization. Also search. Also favorites(?)
drag a bullet to move an entry
hash routes enable browser back/forward for 

##Getting started
-Start from todomvc jquery version with jquery removed and a render that doesn't lie.
-\# routes in this app are stupid: all they do is mirror the All, Active, and Completed buttons.
-Ditch director.js and its code in the app.
-Remove todomvc-common and director from node modules.
-Consider [cypress] (https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) for testing if simpletest doesn't work out.


##Features
-Add a child todo
-Add a sibling todo (+ on hover over an item?)
-Triangle icon to show/hide children (enable even for empty parent so first child can be added)
-Replace Set All Completed with Select All that selects children of entry
-Implement Delete Selected/undo, Mark Selected Completed/undo, Out-dent/undo Selected

##Dom manipulation
todolist = document.getElementById('todolist');
<main id=​"todolist">​…​</main>​<ul>​<li id=​"p1ykai64y5">​Item 1​</li>​</ul>​</main>​
todolist.childElementCount
1
todolist.children[0]
<ul>​…​</ul>​
ul = todolist.children[0];
<ul>​…​</ul>​
ul.childElementCount
1
ul.children

Element.insertAdjacentElement()

To insert a new li after a given li after use the 'afterend' position.
ExistingLi.insertAdjacentElement('afterend', newLi)

Insert a new nested todoLi in a todosUl under a given todoLi
	Is there already a <ul> for the nested todos?
		If yes, append to end of list (or disallow entirely and make user select a child to insert after)
		If no, create a todosUl and append a todoLi

var todolist = document.getElementById('todolist');
undefined
var todosUl = todolist.children[0];
undefined
todosUl
<ul>​…​</ul>​<li id=​"4mzn8roui0v">​…​</li>​<li id=​"k1drmuvxit">​Item 2​</li>​</ul>​
todo1Li = todosUl.children[0]
<li id=​"4mzn8roui0v">​…​</li>​
todo1Li.childElementCount
1
todo1Li.children

##Edit an entry

TodoMVC jquery uses an input element with a label. I think the label
is to block the text input from being immediately accessible.

createTextNode to escape and contain entered content?

Owasp says setting textContent is safe, so use that. This is also what Gordon
used in Practical Javascript.

contentEditable (which workflowy uses) applies to the children of an element unless the children
are wrapped in a <div>.
	Modify appendNewChildTodoLi to include a <div> wrapper for the <ul>.
	Modify createTodosUl as well to cover initial loading from storage.

function appendNewChildTodoLi(todoLi) {

	var newTodo = new Todo();
	var parentTodo = findTodo(todos, todoLi.id);
	insertTodo(parentTodo.children, newTodo);
	
	var newLi = createTodoLi(newTodo);

	if (todoLi.children.length === 0) {
		var newUl = document.createElement('ul');
		newUl.appendChild(newLi);
		todoLi.appendChild(newUl);
	} else {
		existingUl = todoLi.children[0];
		existingUl.appendChild(newLi);	
	}
}
