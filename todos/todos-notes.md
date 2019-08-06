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
HTMLCollection [ul]0: ulaccessKey: ""assignedSlot: nullattributeStyleMap: StylePropertyMap {size: 0}attributes: NamedNodeMap {length: 0}autocapitalize: ""baseURI: "file:///Users/cespe/watchandcode/beasts/todos/todos-tdd.html"childElementCount: 1childNodes: NodeList [li#gugei5ze86q]children: HTMLCollection [li#gugei5ze86q, gugei5ze86q: li#gugei5ze86q]classList: DOMTokenList [value: ""]className: ""clientHeight: 18clientLeft: 0clientTop: 0clientWidth: 1128compact: falsecontentEditable: "inherit"dataset: DOMStringMap {}dir: ""draggable: falsefirstChild: li#gugei5ze86qfirstElementChild: li#gugei5ze86qhidden: falseid: ""innerHTML: "<li id="gugei5ze86q">Item 1 child 1</li>"innerText: "Item 1 child 1"inputMode: ""isConnected: trueisContentEditable: falselang: ""lastChild: li#gugei5ze86qlastElementChild: li#gugei5ze86qlocalName: "ul"namespaceURI: "http://www.w3.org/1999/xhtml"nextElementSibling: nullnextSibling: nullnodeName: "UL"nodeType: 1nodeValue: nullnonce: ""offsetHeight: 18offsetLeft: 48offsetParent: bodyoffsetTop: 60offsetWidth: 1128onabort: nullonauxclick: nullonbeforecopy: nullonbeforecut: nullonbeforepaste: nullonblur: nulloncancel: nulloncanplay: nulloncanplaythrough: nullonchange: nullonclick: nullonclose: nulloncontextmenu: nulloncopy: nulloncuechange: nulloncut: nullondblclick: nullondrag: nullondragend: nullondragenter: nullondragleave: nullondragover: nullondragstart: nullondrop: nullondurationchange: nullonemptied: nullonended: nullonerror: nullonfocus: nullonfullscreenchange: nullonfullscreenerror: nullongotpointercapture: nulloninput: nulloninvalid: nullonkeydown: nullonkeypress: nullonkeyup: nullonload: nullonloadeddata: nullonloadedmetadata: nullonloadstart: nullonlostpointercapture: nullonmousedown: nullonmouseenter: nullonmouseleave: nullonmousemove: nullonmouseout: nullonmouseover: nullonmouseup: nullonmousewheel: nullonpaste: nullonpause: nullonplay: nullonplaying: nullonpointercancel: nullonpointerdown: nullonpointerenter: nullonpointerleave: nullonpointermove: nullonpointerout: nullonpointerover: nullonpointerup: nullonprogress: nullonratechange: nullonreset: nullonresize: nullonscroll: nullonsearch: nullonseeked: nullonseeking: nullonselect: nullonselectionchange: nullonselectstart: nullonstalled: nullonsubmit: nullonsuspend: nullontimeupdate: nullontoggle: nullonvolumechange: nullonwaiting: nullonwebkitfullscreenchange: nullonwebkitfullscreenerror: nullonwheel: nullouterHTML: "<ul><li id="gugei5ze86q">Item 1 child 1</li></ul>"outerText: "Item 1 child 1"ownerDocument: documentparentElement: li#4mzn8roui0vparentNode: li#4mzn8roui0vpart: DOMTokenList [value: ""]prefix: nullpreviousElementSibling: nullpreviousSibling: textscrollHeight: 18scrollLeft: 0scrollTop: 0scrollWidth: 1128shadowRoot: nullslot: ""spellcheck: truestyle: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}tabIndex: -1tagName: "UL"textContent: "Item 1 child 1"title: ""translate: truetype: ""__proto__: HTMLUListElementlength: 1__proto__: HTMLCollection
HTMLCollection [li#p1ykai64y5, p1ykai64y5: li#p1ykai64y5]0: li#p1ykai64y5accessKey: ""assignedSlot: nullattributeStyleMap: StylePropertyMap {size: 0}attributes: NamedNodeMap {0: id, id: id, length: 1}autocapitalize: ""baseURI: "file:///Users/cespe/watchandcode/beasts/todos/todos-tdd.html"childElementCount: 0childNodes: NodeList [text]children: HTMLCollection []classList: DOMTokenList [value: ""]className: ""clientHeight: 18clientLeft: 0clientTop: 0clientWidth: 1128contentEditable: "inherit"dataset: DOMStringMap {}dir: ""draggable: falsefirstChild: textfirstElementChild: nullhidden: falseid: "p1ykai64y5"innerHTML: "Item 1"innerText: "Item 1"inputMode: ""isConnected: trueisContentEditable: falselang: ""lastChild: textlastElementChild: nulllocalName: "li"namespaceURI: "http://www.w3.org/1999/xhtml"nextElementSibling: nullnextSibling: nullnodeName: "LI"nodeType: 1nodeValue: nullnonce: ""offsetHeight: 18offsetLeft: 48offsetParent: bodyoffsetTop: 42offsetWidth: 1128onabort: nullonauxclick: nullonbeforecopy: nullonbeforecut: nullonbeforepaste: nullonblur: nulloncancel: nulloncanplay: nulloncanplaythrough: nullonchange: nullonclick: nullonclose: nulloncontextmenu: nulloncopy: nulloncuechange: nulloncut: nullondblclick: nullondrag: nullondragend: nullondragenter: nullondragleave: nullondragover: nullondragstart: nullondrop: nullondurationchange: nullonemptied: nullonended: nullonerror: nullonfocus: nullonfullscreenchange: nullonfullscreenerror: nullongotpointercapture: nulloninput: nulloninvalid: nullonkeydown: nullonkeypress: nullonkeyup: nullonload: nullonloadeddata: nullonloadedmetadata: nullonloadstart: nullonlostpointercapture: nullonmousedown: nullonmouseenter: nullonmouseleave: nullonmousemove: nullonmouseout: nullonmouseover: nullonmouseup: nullonmousewheel: nullonpaste: nullonpause: nullonplay: nullonplaying: nullonpointercancel: nullonpointerdown: nullonpointerenter: nullonpointerleave: nullonpointermove: nullonpointerout: nullonpointerover: nullonpointerup: nullonprogress: nullonratechange: nullonreset: nullonresize: nullonscroll: nullonsearch: nullonseeked: nullonseeking: nullonselect: nullonselectionchange: nullonselectstart: nullonstalled: nullonsubmit: nullonsuspend: nullontimeupdate: nullontoggle: nullonvolumechange: nullonwaiting: nullonwebkitfullscreenchange: nullonwebkitfullscreenerror: nullonwheel: nullouterHTML: "<li id="p1ykai64y5">Item 1</li>"outerText: "Item 1"ownerDocument: documentparentElement: ulparentNode: ulpart: DOMTokenList [value: ""]prefix: nullpreviousElementSibling: nullpreviousSibling: nullscrollHeight: 18scrollLeft: 0scrollTop: 0scrollWidth: 1128shadowRoot: nullslot: ""spellcheck: truestyle: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}tabIndex: -1tagName: "LI"textContent: "Item 1"title: ""translate: truetype: ""value: 0__proto__: HTMLLIElementlength: 1p1ykai64y5: li#p1ykai64y5accessKey: ""assignedSlot: nullattributeStyleMap: StylePropertyMap {size: 0}attributes: NamedNodeMap {0: id, id: id, length: 1}autocapitalize: ""baseURI: "file:///Users/cespe/watchandcode/beasts/todos/todos-tdd.html"childElementCount: 0childNodes: NodeList [text]children: HTMLCollection []classList: DOMTokenList [value: ""]className: ""clientHeight: 18clientLeft: 0clientTop: 0clientWidth: 1128contentEditable: "inherit"dataset: DOMStringMap {}dir: ""draggable: falsefirstChild: textfirstElementChild: nullhidden: falseid: "p1ykai64y5"innerHTML: "Item 1"innerText: "Item 1"inputMode: ""isConnected: trueisContentEditable: falselang: ""lastChild: textlastElementChild: nulllocalName: "li"namespaceURI: "http://www.w3.org/1999/xhtml"nextElementSibling: nullnextSibling: nullnodeName: "LI"nodeType: 1nodeValue: nullnonce: ""offsetHeight: 18offsetLeft: 48offsetParent: bodyoffsetTop: 42offsetWidth: 1128onabort: nullonauxclick: nullonbeforecopy: nullonbeforecut: nullonbeforepaste: nullonblur: nulloncancel: nulloncanplay: nulloncanplaythrough: nullonchange: nullonclick: nullonclose: nulloncontextmenu: nulloncopy: nulloncuechange: nulloncut: nullondblclick: nullondrag: nullondragend: nullondragenter: nullondragleave: nullondragover: nullondragstart: nullondrop: nullondurationchange: nullonemptied: nullonended: nullonerror: nullonfocus: nullonfullscreenchange: nullonfullscreenerror: nullongotpointercapture: nulloninput: nulloninvalid: nullonkeydown: nullonkeypress: nullonkeyup: nullonload: nullonloadeddata: nullonloadedmetadata: nullonloadstart: nullonlostpointercapture: nullonmousedown: nullonmouseenter: nullonmouseleave: nullonmousemove: nullonmouseout: nullonmouseover: nullonmouseup: nullonmousewheel: nullonpaste: nullonpause: nullonplay: nullonplaying: nullonpointercancel: nullonpointerdown: nullonpointerenter: nullonpointerleave: nullonpointermove: nullonpointerout: nullonpointerover: nullonpointerup: nullonprogress: nullonratechange: nullonreset: nullonresize: nullonscroll: nullonsearch: nullonseeked: nullonseeking: nullonselect: nullonselectionchange: nullonselectstart: nullonstalled: nullonsubmit: nullonsuspend: nullontimeupdate: nullontoggle: nullonvolumechange: nullonwaiting: nullonwebkitfullscreenchange: nullonwebkitfullscreenerror: nullonwheel: nullouterHTML: "<li id="p1ykai64y5">Item 1</li>"outerText: "Item 1"ownerDocument: documentparentElement: ulparentNode: ulpart: DOMTokenList [value: ""]prefix: nullpreviousElementSibling: nullpreviousSibling: nullscrollHeight: 18scrollLeft: 0scrollTop: 0scrollWidth: 1128shadowRoot: nullslot: ""spellcheck: truestyle: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}tabIndex: -1tagName: "LI"textContent: "Item 1"title: ""translate: truetype: ""value: 0__proto__: HTMLLIElement__proto__: HTMLCollection
ul.children[0]
<li id=​"p1ykai64y5">​Item 1​</li>​
