// See runWithDebugger.md for notes on the exercise

tests({
	'It should run supplied callback.': function() {
		var greeting = undefined;
		function sayHi() {
			greeting = 'Hi!';
		}
		runWithDebugger(sayHi);
		eq(greeting, "Hi!");
	},
	'It should accept optional array parameter and pass values to callback.': function() {
		var greeting = undefined;
		function sayHiName(firstName) {
			greeting = "Hi " + firstName + "!";	
		}
		runWithDebugger(sayHiName, ["Gordon"]);
		eq(greeting, "Hi Gordon!");

		var greeting = undefined;
		function sayHiFullName(firstName, lastName) {
			greeting = "Hi " + firstName + " " + lastName + "!";
		}
		runWithDebugger(sayHiFullName, ['Gordon', 'Zhu']);
		eq(greeting, "Hi Gordon Zhu!");

		var greeting = undefined;
		function sayHiFullName(firstName, lastName) {
			greeting = "Hi " + firstName + " " + lastName + "!";
		}
		runWithDebugger(sayHiFullName, "Gordon", "Zhu");
		eq(greeting, undefined);
	},
	'It should run debugger on callback.': function() {
		// can't figure out a way to automate this test; debugger should run once for each test
	}
});

