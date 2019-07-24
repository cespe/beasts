**Beasts** _8. Nested todos_

Like todos-mvc but any todo can have nested todos. See Workflowy for inspiration.

Workflowy notes
No undelete! I deleted the inbox and now it is gone.
Add a note by clicking the end of the one above where you want it and hitting Return
When you click a bullet, that entry becomes the headline and everything above it goes to breadcrumbs.
	You need to click on a breadcrumb or the browser back button to get out of it.
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
		Expand all		why not a toggle with collapse all? and why replicate the triangle?
		Collapse all
		Delete			no undelete! be careful!
Up/down arrow keys go up/down the entries without regard to indentation
Left/right arrow keys go left/right in the text of an entry or up/down if you are at the start/end of the entry
Notes feature allows you to add paragraphs of text.
hashtags and @users for organization. Also search. Also favorites(?)

Getting started
	1. Start from todomvc jquery version with jquery removed.
	2. hash routes in this app are stupid: all they do is mirror the All, Active, and Completed buttons.
		A. Ditch director.js and its code in the app.
	3. Remove todomvc-common and director from node modules.
	4. Consider cypress for testing if simpletest doesn't work out.
		https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

Features
	1. Add a child todo
	2. Add a sibling todo (+ on hover over an item?)
	3. Triangle icon to show/hide children (enable even for empty parent so first child can be added)
	4. Replace Set All Completed with Select All that selects children of entry
		Implement Delete Selected/undo, Mark Selected Completed/undo, Out-dent/undo Selected
