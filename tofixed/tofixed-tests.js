// Beasts 7. A twist on accounting.toFixed

tests({
	// helper function used by shiftedToFixed
	"Helper checkNumber's first parameter 'value' must be a number or a non-empty string that converts to one.": function() {
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
	"shiftedToFixed's first parameter 'value' should be a number or a non-empty string that converts to one.": function() {
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
	"Helper checkPrecision's 'precision' parameter must an integer >= 0 or a non-empty string that converts to one.": function() {
		// A negative number or a float excluded by design
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
	"shiftedToFixed's 'precision' parameter should an integer >= 0 or a non-empty string that converts to one.": function() {
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
		result = shiftedToFixed(25, 2);
		eq(result, "25.00");
		result = shiftedToFixed('25', 2);
		eq(result, "25.00");
		result = shiftedToFixed('25.00', 2);
		eq(result, "25.00");
		result = shiftedToFixed('-25', 2);
		eq(result, "-25.00");
		result = shiftedToFixed(25.864578, 2);
		eq(result, "25.86");
		result = shiftedToFixed('25.864578', 2);
		eq(result, "25.86");
		result = shiftedToFixed(25.864578, 4);
		eq(result, "25.8646");
		result = shiftedToFixed('25.864578', 4);
		eq(result, "25.8646");
	},
	"When rounding to final precision, it should round up if the digit at precision + 1 is a 5": function() {
		result = shiftedToFixed(1.005, 2);
		eq(result, "1.01");
		result = shiftedToFixed(0.615, 2);
		eq(result, "0.62")
		result = shiftedToFixed(10.235, 2);
		eq(result, "10.24")
	},
});
