Notes for **Beasts** _2. Improving runWithDebugger_

The original runWithDebugger is from Practical Javascript:

**Interlude - Functions inside of functions**
_runWithDebugger_ video

`runWithDebugger` is a function that enhances other functions. It is a shortcut for
```
> debugger;
> functionToDebug();

function runWithDebugger(functionToDebug) {
	debugger;
	functionToDebug();
}
```

The task here is to allow `runWithDebugger` to accept an array that holds arguments for `functionToDebug` and to pass the arguments to `functionToDebug` as parameters.

```
function sayHi() {
	return 'Hi!';
} 

function sayHiName(firstName) {
	return 'Hi ' + firstName + '!';
}

function sayHiFullName(firstName, lastName) {
	return 'Hi ' + firstName + ' ' + lastName + '!';
}
```

A gist with the solution should be posted to https://github.com/gordonmzhu/beasts/issues/2.

