// See runWithDebugger.md for notes on the exercise

tests({
	'It should run supplied callback': function() {
		function sayHi() {
			return "Hi!";
		}
		var result = runWithDebugger(sayHi);
		eq(result, "Hi!");
	},
	'It should accept optional array parameter and pass values to callback': function() {
		fail();
	},
	'It should run debugger on callback': function() {
		fail();
	}
});

