/**
 * SimpleTest is a fork of TinyTest that adds a few presentation refinements.
 * Functionality remains the same.
 */

var TinyTest = {

    run: function(tests) {	// 'tests' is the object holding our test functions,
							// not the alias created for the run function
		// counters for statistics
        var failures = 0;
		var successes = 0;
		var numberOfTests = 0;
		function pluralize(number, word) {
			if (number === 1) {
				return " " + word + ", ";
			} else {
				return " " + word + "s, ";
			}
		}
        for (var testName in tests) {
			numberOfTests++;
            var testAction = tests[testName];
            try {
                //testAction.apply(this); 
				testAction();  // already bound to TinyTest so apply(this) not needed
				successes++;
				console.log(testName + '%c Test passed.', "color: green;");
            } catch (e) {
                failures++;
				console.groupCollapsed(testName + ' %c' +  e, "color: red;");
                console.error(e.stack);
				console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
				// Render statistics to DOM
				document.body.innerText = "Ran " + numberOfTests + pluralize(numberOfTests, "test") + successes + " passing and " + failures + " failing."
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertStrictEquals.bind(TinyTest), // alias for assertEquals in original, changed here to Strict
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
//	eqstrict		   = TinyTest.assertStrictEquals.bind(TinyTest),  // added alias
    tests              = TinyTest.run.bind(TinyTest);

