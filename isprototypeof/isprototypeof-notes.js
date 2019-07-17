/* Beasts 6. isPrototypeOf
 * Just like re-creating array methods as functions in Testing, the exercise here
 * is to re-create object.prototype.isPrototypeOf as a function.
 * 
 * result = isPrototypeOf(prototypeObject, targetObject);
 *
 * targetObject is actually optional according to console.log test. Result false if missing.
 *
 * Returns true if prototypeObject is in the prototype chain of targetObject, false if not.
 *
 * It's ok to use Object.prototype.getPrototypeOf in this exercise. No need to mess
 * around with __proto__
 */
// ------------------------------------------------------------------------------------
// Console.log tests for what you can and can't use as prototypeObject. In a nutshell,
// null and undefined throw TypeError and a number throws a SyntaxError. Everything
// else is okay.

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

// ------------------------------------------------------------------------------------
// Console.log tests for what you can and can't use as targetObject. Anything goes BUT things
// that can't be converted to an object all return false even though they throw a TypeError
// if you try to convert them, e.g. with Object.getPrototypeOf.
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
Object.prototype.isPrototypeOf();				// false

Object.getPrototypeOf(null)	// Uncaught TypeError: Cannot convert undefined or null to object

// ------------------------------------------------------------------------------------
// console.log examples using Object.getPrototypeOf()
	var canine = {
			bark: function() {
				console.log('bark');
			}
		};
		var dog = Object.create(canine);
		dog.fetch = function() {
			console.log("fetching");
		};

		var myDog = Object.create(dog);
		var empty = Object.create(null);


ƒ () {
			console.log("fetching");
		}
dog.isPrototypeOf(myDog)	// true
Object.getPrototypeOf(myDog)	// returns the object stored in dog
//{fetch: ƒ}fetch: ƒ ()__proto__: Objectbark: ƒ ()__proto__: constructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()

Object.prototype.isPrototypeOf(myDog)	// true
Object.getPrototypeOf(dog)		// returns the object stored in canine
//{bark: ƒ}bark: ƒ ()arguments: nullcaller: nulllength: 0name: "bark"prototype: {constructor: ƒ}__proto__: ƒ ()[[FunctionLocation]]: VM2697:2[[Scopes]]: Scopes[1]__proto__: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()arguments: (...)caller: (...)length: 0name: "valueOf"__proto__: ƒ ()[[Scopes]]: Scopes[0]__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()

canine.isPrototypeOf(myDog)		// true
var candidate = Object.getPrototypeOf(dog);
candidate === canine	// true

// ------------------------------------------------------------------------------------
// console.log example of a constructor function
function Cat(name) {
	this.name = name;
}

Cat.prototype.sleep = function() {
	console.log("sleeping");
}

var myCat = new Cat("Marshmallow");

myCat				// Cat {name: "Marshmallow"}name: "Marshmallow"__proto__: Object
myCat.sleep()		// sleeping
myCat.name === "Marshmallow"	// true

Cat.isPrototypeOf(myCat)	// false
Cat.prototype.isPrototypeOf(myCat);		// true
Object.prototype.isPrototypeOf(myCat)	// true

var candidate = Object.getPrototypeOf(myCat);
candidate === Cat				// false
candidate === Cat.prototype		// true

// ------------------------------------------------------------------------------------
// Not sure what is going on here but I don't think it changes the solution
candidate = Object.getPrototypeOf(Cat)		// ƒ () { [native code] }
candidate === Object.prototype				// false
