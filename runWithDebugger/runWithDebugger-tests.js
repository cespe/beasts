// See runWithDebugger.md for notes on the exercise

tests({
	'It should run debugger on supplied callback': function() {
		function sayHi() {
			return "Hi!";
		}
		var result = runWithDebugger(sayHi);
		eq(result, "Hi!");
	},
	'It should run callback': function() {
		fail();
	},
	'It should accept optional array parameter and pass values to callback': function() {
		fail();
	}
});

