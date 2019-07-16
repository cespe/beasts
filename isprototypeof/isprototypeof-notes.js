/* Beasts 6. isPrototypeOf
 * Just like re-creating array methods as functions in Testing, the exercise here
 * is to re-create object.prototype.isPrototypeOf as a function.
 * 
 * result = isPrototypeOf(prototypeObject, targetObject);
 *
 * Returns true if prototypeObject is in the prototype chain of targetObject, false if not.
 *
 * It's ok to use Object.prototype.getPrototypeOf in this exercise. No need to mess
 * around with __proto__
 *
 */

// Console log tests for what you can and can't use as prototypeObject. In a nutshell,
// null and undefined throw TypeError and a number throws a SyntaxError.

undefined.isPrototypeOf({})
//VM2138:1 Uncaught TypeError: Cannot read property 'isPrototypeOf' of undefined
//    at <anonymous>:1:11
//(anonymous) @ VM2138:1

null.isPrototypeOf({})
//VM2195:1 Uncaught TypeError: Cannot read property 'isPrototypeOf' of null
//    at <anonymous>:1:6
//(anonymous) @ VM2195:1

8.isPrototypeOf({})
//VM2207:1 Uncaught SyntaxError: Invalid or unexpected token

"eight".isPrototypeOf({})		// false
NaN.isPrototypeOf({})			// false
myFunction = function() {}	// ƒ () {}
myFunction.isPrototypeOf({})	// false
true.isPrototypeOf({})			// false
false.isPrototypeOf({})			// false
[].isPrototypeOf({})			// false

// Console log tests for what you can and can't use as targetObject. Anything goes.
var myObj = {};		// undefined
Object.prototype.isPrototypeOf(myObj)			// true
Object.prototype.isPrototypeOf(undefined)		// false
Object.prototype.isPrototypeOf(null)			// false
Object.prototype.isPrototypeOf(NaN)				// false
Object.prototype.isPrototypeOf(function() {})	// true
Object.prototype.isPrototypeOf(8)				// false
Object.prototype.isPrototypeOf("eight")			// false
Object.prototype.isPrototypeOf([]) 				// true
Object.prototype.isPrototypeOf(true)			// false

// But these below are interesting. Confirms what Gordon said in AccountingJS video 9.
// Using Object.create(dog) makes the prototype 'dog' while new Dog() makes the
// prototype 'Dog.prototype'

Object.prototype.isPrototypeOf({})		// true
Object.isPrototypeOf({})				// false
