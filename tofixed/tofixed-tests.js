/* Beasts 7. A twist on accounting.toFixed
 * The function needs to fix these unwanted results produced by Number.prototype.toFixed:
 * 1.005.toFixed(2)		// "1.00" produced, but "1.01" wanted
 * 0.615.toFixed(2)		// "0.61" produced, but "0.62" wanted
 * 10.235.toFixed(2)	// "10.23" produced, but "10.24" wanted
 *
 * Original accounting.toFixed still doesn't do the right thing for 1.005.
 * Gordon's scientific notation version betterToFixed gets them all right.
 *
 * shiftedToFixed(value, precision)
 */

tests({
	"Its' first parameter 'value' must be a number or a non-empty string that converts to one.": function() {
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
	"Its' 'precision' parameter must an integer >= 0 or a non-empty string that converts to one.": function() {
		// Fix a design mistake in accountingJS.
		// A negative number or a float is just a mistake as far as precision goes.
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
	"It should return a string representation of 'value' with 'precision' decimal places.": function() {
		fail();
	},
	"When rounding to final precision, it should round up if the digit at precision + 1 is a 5": function() {
		fail();
		result = fixedNumberToString(1.005, 2);
		eq(result, "1.01");
		result = fixedNumberToString(0.615, 2);
		eq(result, "0.62")
		result = fixedNumberToString(10.235, 2);
		eq(result, "10.24")
	},
	// Test helper functions used by shiftedToFixed
	"checkValue's first parameter 'value' must be a number or a non-empty string that converts to one.": function() {
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
	"checkPrecision's 'precision' parameter must an integer >= 0 or a non-empty string that converts to one.": function() {
		// Fix a design mistake in accountingJS.
		// A negative number or a float is just a mistake as far as precision goes.
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
	}

});
