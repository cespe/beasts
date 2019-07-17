/**
 * Check and normalise the value of precision (must be positive integer)
 */
function checkPrecision(val, base) {
	val = Math.round(Math.abs(val));	// can round up or down, why not use toInteger?
	return isNaN(val)? base : val;
}
/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
var toFixed = lib.toFixed = function(value, precision) {
	precision = checkPrecision(precision, lib.settings.number.precision);
	var power = Math.pow(10, precision);

	// Multiply up by precision, round accurately, then divide and use native toFixed():
	return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
};

// Gordon's scientific notation method
function betterToFixed(value, precision) {
	var exponentialForm = Number(value + 'e' + precision);
	var rounded = Math.round(exponentialForm);
	var result = Number(rounded + 'e-' + precision);
	return '' + result;		// return as a string, alternative to result.toFixed(precision)
};


