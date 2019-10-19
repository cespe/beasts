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
Opt Tab to open the menu via the keyboard
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

On second thought, just write the app from scratch with TDD.





##Features
-Add the first todo to an empty list
-Add a sibling todo (+ on hover over an item?)
-Add a child todo
-Triangle icon to show/hide children (enable even for empty parent so first child can be added)
-Replace Set All Completed with Select All that selects children of entry
-Implement Delete Selected/undo, Mark Selected Completed/undo, Out-dent/undo Selected
-Indent Shift Right Arrow, Outdent Shift Left Arrow
-Delete empty entry with Backspace key
-New sibling entry with Return key
-Abort edit with Esc key? Not sure about this one.
-A use for child todos would be followups. When you create a followup todo, the todo you are following up on is moved to nest under the followup. Multiple followups are flattened so the audit trail is on one level. A followup-style todo is signaled by having a time frame or scenario to wait for a response.
-'Regarding' or 'Re' field to ground the todo or provide context. Maybe also a 'Subject' or 'Topic' or 'Issue' field.

##HTML and CSS
display: inline-block to put child elements on the same line as parent, e.g. completed under a todo li

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

##Test event handling
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent (deprecated in favor of
	https://developer.mozilla.org/en-US/docs/Web/API/Event)
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent

etest = new Event('keyup')
Event {isTrusted: false, type: "keyup", target: null, currentTarget: null, eventPhase: 0, …}bubbles: falsecancelBubble: falsecancelable: falsecomposed: falsecurrentTarget: nulldefaultPrevented: falseeventPhase: 0isTrusted: falsepath: []returnValue: truesrcElement: nulltarget: nulltimeStamp: 8057749.199999991type: "keyup"__proto__: Event
etest.key = "A";
"A"
etest
Event {isTrusted: false, key: "A", type: "keyup", target: null, currentTarget: null, …}
target = document.getElementById('todolist');
<main id=​"todolist">​…​</main>​
target.dispatchEvent(etest)
app.js:181 Event {isTrusted: false, key: "A", type: "keyup", target: main#todolist, currentTarget: main#todolist, …}bubbles: falsecancelBubble: falsecancelable: falsecomposed: falsecurrentTarget: nulldefaultPrevented: falseeventPhase: 0isTrusted: falsekey: "A"path: (5) [main#todolist, body, html, document, Window]returnValue: truesrcElement: main#todolisttarget: main#todolisttimeStamp: 8057749.199999991type: "keyup"__proto__: Event
true

##Buttons not Inputs
Going with buttons setting class attributes rather than inputs. MDN says buttons are easier to style. 
<button type="button" name="completed">Completed</button>

##Styling buttons
Selected add a checkmark when selected (like an input field)
Completed hide button show on hover like todomvc delete; strikethrough to signal completed

##Behavior of Select in gmail
Select checbox has three display states
	Empty checkbox means no emails are selected. Action buttons hidden.
	Gray with dash means at least one but not all emails are selected. Action buttons displayed.
	Gray with checkmark means all emails are selected. Action buttons displayed.

When checkbox is gray, clicking it unselects any selected emails and hides action buttons.

##Undo strategy for Mark completed
Display and Data states
Ten todos showing
Click Select all
Ten todos selected
Deselect one todo manually
Nine todos selected

Click Mark completed
Nine todos marked completed
One todo not marked completed
Nine todos still selected (in case you want to delete them, or undo completed)
Mark completed button becomes Undo mark completed (condition class='selected' and class='completed')

Click Undo mark completed
Ten todos marked not completed
Nine todos selected
One todo not selected
Undo mark completed button becomes Mark completed (condition class='selected' and not class='completed')

##Undo strategy for Delete selected

Try in a separate branch:
Clean up UI by removing delete button from individual todos and just having delete selected.

Ten todos showing
Click Select all
Ten todos selected
Deselect one todo manually
Nine todos selected

Click Delete selected
Nine selected todos disappear
One [unselected] todo remains
class='selected' removed from Select all
Delete button becomes Undelete (condition class='deleted' until next click to select or Undelete)

Click Undelete
Nine deleted todos reappear (need a way to mark them as just deleted)
Ten todos showing
Undelete button becomes Delete selected (condition not class='deleted' and not class='selected')
No todos are selected

##selectAll button states and actions
On startup, class='' and button text is 'Select all'

If class=''
	button text is 'Select all'

If class='selected'
	button text is 'Unselect all'

When selectAll button is clicked
	If class=''
		select all todos
			set class='selected'
			set button text to 'Unselect'
		set class='selected' (which displays action buttons)
		remove class='inactive' from markCompleted button
		remove class='inactive' from deleteSelected button
		set button text to 'Unselect all'
	Else
		unselect all todos
			set class=''
			set button text to 'Select'
		set class='' (which hides action buttons)
		add class='inactive' to markCompleted button
		add class='inactive' to deleteSelected button
		set button text to 'Select all'

##todoLi selected button states and actions
On startup, class and button text is set according to todo.selected

When a todoLi selected button is clicked
	If class=''
		set todo.selected = true
		set button class='selected'
		set button text to 'Unselect'
		set action bar selectAll button class='selected' (which displays action buttons)
		set action bar selectAll button text to 'Unselect all'
		remove class='inactive' from action bar markCompleted button
		if all selected todos are marked completed
			set action bar markCompleted button class='completed'
			set action bar markCompleted button text to 'Mark uncompleted'
		else
			set action bar markCompleted button class=''
			set action bar markCompleted button text to 'Mark completed'
		remove class='inactive' from action bar deleteSelected button
	Else
		set todo.selected = false
		set button class=''
		set button text to 'Select'
		if all selected todos are marked completed
			set action bar markCompleted button class='completed'
			set action bar markCompleted button text to 'Mark uncompleted'
		else
			set action bar markCompleted button class=''
			set action bar markCompleted button text to 'Mark completed'

		If no todos are selected
			set action bar selectAll button class='' (which hides action buttons)
			set action bar selectAll button text to 'Select all'
			set action bar markCompleted button class='inactive'
			set action bar deleteSelected button class='inactive'

When some emails are selected in gmail, and a new one comes in, the display still shows the selections.
Therefore, adding a new todo should not disturb the selected todos.

##Hide todo completed and deleted buttons when any todos are selected
This simplifies the UI and avoids awkward header button switches when a todo button is clicked.

##Show filtered todos
Four filters for displaying todos: active, completed, all (active and completed), deleted.

Set selected off, start with a clean slate

If filter is 'all'
	display completed and active
If filter is 'active'
	display active only
If filter is 'completed'
	display completed only
	replace 'Mark completed' with 'Mark uncompleted'
If filter is 'completed' and a new todo is added
	set filter to 'none'
If filter is 'deleted'
	display deleted only
	disable adding new sibling todos
	allow adding children
	disable 'Mark completed'? Why not allow it?
	replace 'Delete selected' with 'Undelete selected'

##Remaining tasks
Show/hide buttons when appropriate.
	Don't allow Select in a child todo unless parent is zoomed. [or make action bar actions recursive...].
Add icons or text to identify buttons.
Add a button to todoLi to zoom in on a todo, giving access to actions bar buttons for child elements.
	And/or add a todoLi button to Select all children [requires recursive actions bar actions].
Store todos in local storage.
Retrieve todos from local storage.
Decide whether to store state of showChildren so that re-rendering preserves the display.
Add a global Expand all children button. [or not]

##Bugs
Clicking Select all in actions bar should toggle button text.
Clicking Select all in actions bar sets todoLi select button class to 'selected' but does not change text to 'Unselect'

##Variable display
Hide/display deleted todos -- removed/restored
Hide/display child todos -- collapsed/expanded
Hide/display buttons -- active/inactive
Strike-through/don't strike-through entry text -- normal/struck-through
Toggle button text and class

