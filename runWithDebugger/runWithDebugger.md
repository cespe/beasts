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

Questions
1. How do you pass in the parameters from an array?

My first thought was to set the callback's arguments object fields to the array values, but that doesn't work. Arguments is just null until the function call happens, so you can't insert values from outside. Another example of "you can't reach inside a function and change something" now that I think of it.

Luckily, Function.prototype.apply() does exactly what is needed (see MDN doc page for details). Note that with apply() you can pass in an array or an array-like object.

2. Should I throw an error if parametersArray is not an array or an array-like object? Or if a function is not passed as the first parameter?

I tested for malformed parameters and the function just fails silently. That seems okay, so I'm not adding error handling for now.

A gist with the solution was be posted to https://github.com/gordonmzhu/beasts/issues/2.

