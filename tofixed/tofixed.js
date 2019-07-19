// Beasts 7. A twist on accounting.toFixed

function shiftedToFixed(value, precision) {
	var validNumber = checkNumber(value);
	var decimalPlaces = checkPrecision(precision);
	var validNumberString = '' + validNumber;
	if (validNumberString.includes('.') && 
		) {
		
	}
	var fixedNumber = validNumber.toFixed(decimalPlaces);
	return '' + fixedNumber;
}

// Helper functions

// value must be a number or a non-empty string convertible to a number
function checkNumber(value) {
	var validNumber = value;
	if (typeof value !== "number") {
		if (typeof value !== "string") {
			validNumber = NaN;
		} else if (value === '') {
			validNumber = NaN
		} else {
			validNumber = Number(value);
		}
	}
	if (Number.isNaN(validNumber)) {
		throw new TypeError("value must be a number or a non-empty string convertible to a number");
	}
	return validNumber;
}

// precision must be an integer >= 0 or a string that converts to one
function checkPrecision(precision) {
	var validPrecision = checkNumber(precision);
	if (Number.isInteger(validPrecision) && validPrecision >= 0) {
		return validPrecision;
	} else {
		throw new TypeError("precision must be an integer >= 0 or a non-empty string that converts to one");
	}
}
