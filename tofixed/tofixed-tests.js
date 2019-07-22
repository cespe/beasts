// Beasts 7. A twist on accounting.toFixed

// Run tests on all versions you are working on
var versions = [fiveShiftedToFixed, shiftedToFixed, simpleToFixed];

for (var i = 0; i < versions.length; i++) {
	console.log('%c Version tested: ' + versions[i].name, " color: blue;");
	var toFixed = versions[i];

	tests({
		"Value passed in to helper function checkNumber should be a number or a non-empty string that converts to one.": function() {
			// booleans and empty string excluded by design
			try {
				var result = checkNumber(NaN)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = checkNumber(true)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = checkNumber(false)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = checkNumber('')
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = checkNumber('abc123')
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
		},
		"checkNumber should return value as a number if no TypeError is thrown.": function() {
			result = checkNumber(10.0);
			eq(result, 10.0);
			result = checkNumber("10.235");
			eq(result, 10.235);
			result = checkNumber("10.0");
			eq(result, 10);
		},
		"Value passed in to toFixed should be a number or a non-empty string that converts to one.": function() {
			try {
				var result = toFixed(NaN, 2)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = toFixed(true, 2)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = toFixed(false, 2)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = toFixed('', 2)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
			try {
				var result = toFixed('abc123', 2)
			} catch (error) {
				eq(error.name, "TypeError")
				eq(error.message, "value must be a number or a non-empty string convertible to a number")
			}
		},
		"Precision passed in to helper function checkPrecision should be an integer >= 0 or a non-empty string that converts to one.": function() {
			// Negative numbers and float excluded by design
			try {
				var result = checkPrecision(2.3);
			} catch (error) {
				eq(error.name, "TypeError");
				eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
			}
			try {
				var result = checkPrecision(-2.3);
			} catch (error) {
				eq(error.name, "TypeError");
				eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
			}
			try {
				var result = checkPrecision('2.3');
			} catch (error) {
				eq(error.name, "TypeError");
				eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
			}
		},
		"checkPrecision should return precision if no TypeError is thrown.": function() {
			result = checkPrecision(0)
			eq(result, 0);
			result = checkPrecision(2)
			eq(result, 2);
			result = checkPrecision('2')
			eq(result, 2);
		},
		"Precision passed in to toFixed should an integer >= 0 or a non-empty string that converts to one.": function() {
			try {
				var result = toFixed(1.005, 2.3);
			} catch (error) {
				eq(error.name, "TypeError");
				eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
			}
			try {
				var result = toFixed(1.005, -2.3);
			} catch (error) {
				eq(error.name, "TypeError");
				eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
			}
			try {
				var result = toFixed(1.005, '2.3');
			} catch (error) {
				eq(error.name, "TypeError");
				eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
			}
		},
		"toFixed should return a string representation of 'value' with 'precision' decimal places.": function() {
			result = toFixed(25, 2);
			eq(result, "25.00");
			result = toFixed('25', 2);
			eq(result, "25.00");
			result = toFixed('25.00', 2);
			eq(result, "25.00");
			result = toFixed('-25', 2);
			eq(result, "-25.00");
			result = toFixed(25.864, 2);
			eq(result, "25.86");
			result = toFixed(25.864578, 2);
			eq(result, "25.86");
			result = toFixed('25.864578', 2);
			eq(result, "25.86");
			result = toFixed('-25.864578', 2);
			eq(result, "-25.86");
			result = toFixed(25.864578, 4);
			eq(result, "25.8646");
			result = toFixed('25.864578', 4);
			eq(result, "25.8646");
		},
		"It should round up if the digit at precision + 1 is a 5.": function() {
			result = toFixed(1.005, 2);
			eq(result, "1.01");
			result = toFixed(0.615, 2);
			eq(result, "0.62")
			result = toFixed(10.235, 2);
			eq(result, "10.24")
			result = toFixed(25.865, 2);
			eq(result, "25.87");
		},
		"It should also round up (to next-higher digit) if value is negative and the digit at precision + 1 is a 5." : function() {
			// Google Sheets, Microsoft Excel and Apple Numbers all round 0.125 to 0.13 and -0.125 to -0.13.
			// But betterToFixed and accounting.toFixed round -0.125 to -0.12 because they use Math.round, which
			// by design rounds a negative number towards positive infinity. This version is coded to produce results
			// like the spreadsheet apps.
			result = toFixed(-10.235, 2);
			eq(result, "-10.24")
			result = toFixed(-25.865, 2);
			eq(result, "-25.87");
			result = toFixed(-0.615, 2);
			eq(result, "-0.62");
		}
	});
};
