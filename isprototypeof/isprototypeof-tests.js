// Beasts 6. isPrototypeOf
// See file isprototypeof-notes.js for spec notes and console.log tests.

tests({
	"It should throw a TypeError if prototypeObject is undefined or null.": function() {
		try {
			isPrototypeOf(undefined);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "prototype object cannot be undefined");
		}
		try {
			isPrototypeOf(null);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "prototype object cannot be null");
		}
	},
	"It should throw a SyntaxError if prototypeObject is a number.": function() {
		try {
			isPrototypeOf(8);
		} catch (error) {
			eq(error.name, "SyntaxError");
			eq(error.message, "prototype object cannot be a number");
		}
	},
	"If only prototypeObject is given, the function should return false.": function() {
		var prototypeTestObject = {};
		var result = isPrototypeOf(prototypeTestObject);
		eq(result, false);
	},
	"It should return false if targetObject cannot be converted to an object.": function() {
		// Without a try catch these would throw a TypeError instead of returning false
		result = isPrototypeOf(Object.prototype, undefined);
		eq(result, false);
		result = isPrototypeOf(Object.prototype, null);
		eq(result, false);
		
	},
	"It should return true if prototypeObject is a prototype of targetObject, otherwise false.": function() {
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

		result = isPrototypeOf(dog, myDog);
		eq(result, true);
		result = isPrototypeOf(dog, empty);
		eq(result, false);
		result = isPrototypeOf(canine, dog);
		eq(result, true);
		result = isPrototypeOf(Object.prototype, canine);
		eq(result, true);
	},
	"It should work even if the prototype chain for targetObject is more than one link deep.": function() {
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

		result = isPrototypeOf(canine, myDog);
		eq(result, true);
		result = isPrototypeOf(Object.prototype, myDog);
		eq(result, true);
		result = isPrototypeOf(Object.prototype, dog);
		eq(result, true);
	}
});
