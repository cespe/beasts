// Beasts 7. A twist on accounting.toFixed

// original attempt: just handle special case but do it by shifting decimal point
function fiveShiftedToFixed(value, precision) {
	var validNumber = checkNumber(value);
	var validPrecision = checkPrecision(precision);
	var validNumberString = '' + validNumber;
	var validPrecisionString = '' + validPrecision;
	// test for case where number of decimal digits is precision + 1 and the last digit is 5
	// this special case is the only time Number.prototype.toFixed can do the wrong thing
	var specialCase = new RegExp("\\.\\d{" + validPrecisionString + "}5$");
	if (validNumberString.match(specialCase)) {
		var splitNumber = validNumberString.split('.');
		var newRightOfDecimal = splitNumber[1].slice(validPrecision);
		var newLeftOfDecimal = splitNumber[1].slice(0, validPrecision);
		var decimalShifted = splitNumber[0] + newLeftOfDecimal + "." + newRightOfDecimal;
		var rounded = Math.round(Math.abs(decimalShifted));		// abs ensures rounding up to next digit
		var roundedString = '' + rounded;
		var finalDecimalPart = roundedString.slice(-2);
		var rebuiltNumberString = splitNumber[0] + "." + finalDecimalPart;
		return rebuiltNumberString;	
	} else {
	// built-in toFixed works fine for everything else
	var fixedNumber = validNumber.toFixed(validPrecision);
	return '' + fixedNumber;
	}
}

// what the exercise asks for: move decimal point, Math.round(), move decimal point back
function shiftedToFixed(value, precision) {
	var validNumber = checkNumber(value);
	var validPrecision = checkPrecision(precision);
	var validNumberString = '' + validNumber;
	if (validNumberString.includes('.')) {
		var decimalPart = validNumberString.match(/\.\d+/);		// extracts decimal point and digits
		var numberOfDecimalDigits = decimalPart[0].length - 1;
		if (numberOfDecimalDigits === validPrecision + 1) {
			var lastDigit = decimalPart[0].slice(-1);
			if (lastDigit === "5") {	// special handling is required to round up from 5
				var splitNumber = validNumberString.split('.');
				var newRightOfDecimal = splitNumber[1].slice(validPrecision);
				var newLeftOfDecimal = splitNumber[1].slice(0, validPrecision);
				var decimalShifted = splitNumber[0] + newLeftOfDecimal + "." + newRightOfDecimal;
				var rounded = Math.round(Math.abs(decimalShifted));		// abs ensures rounding up to next digit
				var roundedString = '' + rounded;
				var finalDecimalPart = roundedString.slice(-2);
				var rebuiltNumberString = splitNumber[0] + "." + finalDecimalPart;
				return rebuiltNumberString;	
			}
		}
	}
	// built-in toFixed works fine for everything else
	var fixedNumber = validNumber.toFixed(validPrecision);
	return '' + fixedNumber;
}

// a better approach from a different angle
function simpleToFixed(value, precision) {
	var validNumber = checkNumber(value);
	var validPrecision = checkPrecision(precision);
	var validNumberString = '' + validNumber;
	var validPrecisionString = '' + validPrecision;
	// test for case where number of decimal digits is precision + 1 and the last digit is 5
	// this special case is the only time Number.prototype.toFixed can do the wrong thing
	var specialCase = new RegExp("\\.\\d{" + validPrecisionString + "}5$");
	if (validNumberString.match(specialCase)) {
		var splitNumber = validNumberString.split('.');
		var newRightOfDecimal = splitNumber[1].slice(validPrecision);
		var newLeftOfDecimal = splitNumber[1].slice(0, validPrecision);
		var decimalShifted = splitNumber[0] + newLeftOfDecimal + "." + newRightOfDecimal;
		var rounded = Math.round(Math.abs(decimalShifted));		// abs ensures rounding up to next digit
		var roundedString = '' + rounded;
		var finalDecimalPart = roundedString.slice(-2);
		var rebuiltNumberString = splitNumber[0] + "." + finalDecimalPart;
		return rebuiltNumberString;	
	} else {
	// built-in toFixed works fine for everything else
	var fixedNumber = validNumber.toFixed(validPrecision);
	return '' + fixedNumber;
	}
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
