// Beasts 7. A twist on accounting.toFixed

tests({
	"Value passed in to helper function checkNumber should be a number or a non-empty string that converts to one.": function() {
		// booleans and empty string excluded by design
		try {
			var result = shiftedToFixed(NaN, 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed(true, 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed(false, 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed('', 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed('abc123', 2)
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
	"Value passed in to shiftedToFixed should be a number or a non-empty string that converts to one.": function() {
		try {
			var result = shiftedToFixed(NaN, 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed(true, 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed(false, 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed('', 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
		try {
			var result = shiftedToFixed('abc123', 2)
		} catch (error) {
			eq(error.name, "TypeError")
			eq(error.message, "value must be a number or a non-empty string convertible to a number")
		}
	},
	"Precision passed in to helper function checkPrecision should be an integer >= 0 or a non-empty string that converts to one.": function() {
		// Negative numbers and float excluded by design
		try {
			var result = shiftedToFixed(1.005, 2.3);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
		}
		try {
			var result = shiftedToFixed(1.005, -2.3);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
		}
		try {
			var result = shiftedToFixed(1.005, '2.3');
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
	"Precision passed in to shiftedToFixed should an integer >= 0 or a non-empty string that converts to one.": function() {
		try {
			var result = shiftedToFixed(1.005, 2.3);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
		}
		try {
			var result = shiftedToFixed(1.005, -2.3);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
		}
		try {
			var result = shiftedToFixed(1.005, '2.3');
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "precision must be an integer >= 0 or a non-empty string that converts to one")
		}
	},
	"shiftedToFixed should return a string representation of 'value' with 'precision' decimal places.": function() {
		result = shiftedToFixed(25, 2);
		eq(result, "25.00");
		result = shiftedToFixed('25', 2);
		eq(result, "25.00");
		result = shiftedToFixed('25.00', 2);
		eq(result, "25.00");
		result = shiftedToFixed('-25', 2);
		eq(result, "-25.00");
		result = shiftedToFixed(25.864, 2);
		eq(result, "25.86");
		result = shiftedToFixed(25.864578, 2);
		eq(result, "25.86");
		result = shiftedToFixed('25.864578', 2);
		eq(result, "25.86");
		result = shiftedToFixed('-25.864578', 2);
		eq(result, "-25.86");
		result = shiftedToFixed(25.864578, 4);
		eq(result, "25.8646");
		result = shiftedToFixed('25.864578', 4);
		eq(result, "25.8646");
	},
	"It should round up if the digit at precision + 1 is a 5.": function() {
		result = shiftedToFixed(1.005, 2);
		eq(result, "1.01");
		result = shiftedToFixed(0.615, 2);
		eq(result, "0.62")
		result = shiftedToFixed(10.235, 2);
		eq(result, "10.24")
		result = shiftedToFixed(25.865, 2);
		eq(result, "25.87");
	},
	"It should also round up (to next-higher digit) if value is negative and the digit at precision + 1 is a 5." : function() {
		// Google Sheets, Microsoft Excel and Apple Numbers all round 0.125 to 0.13 and -0.125 to -0.13.
		// But betterToFixed and accounting.toFixed round -0.125 to -0.12 because they use Math.round, which
		// by design rounds a negative number towards positive infinity. This version is coded to produce results
		// like the spreadsheet apps.
		result = shiftedToFixed(-10.235, 2);
		eq(result, "-10.24")
		result = shiftedToFixed(-25.865, 2);
		eq(result, "-25.87");
		result = shiftedToFixed(-0.615, 2);
		eq(result, "-0.62");
	}
});
