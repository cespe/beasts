// Beasts 7. A twist on accounting.toFixed

// What the exercise asks for: move decimal point, Math.round(), move decimal point back
function shiftedToFixed(value, precision) {
	var value = checkNumber(value);
	var precision = checkPrecision(precision);
	var valueString = '' + value;
	// case one: value is an integer
	if (!valueString.includes('.')) {	
		// if precision = 0, return value
		if (precision === 0) {
			return valueString;
		} else {
			// precision > 0, add a decimal point and pad with zeros
			return valueString + "." + zerosForPadding(precision)
		}
	} else {	// case two: value has a decimal number and digits
		var splitNumber = valueString.split('.');
		var basePart = splitNumber[0];
		var decimalPart = splitNumber[1];
		var numberOfDecimalDigits = decimalPart.length
		if (precision > numberOfDecimalDigits) {	// pad with zeros to match precision
			var zerosNeeded = precision - numberOfDecimalDigits;
			zeros = zerosForPadding(zerosNeeded);
			return basePart + "." + decimalPart + zeros;
		} else if (precision === numberOfDecimalDigits) {	// no transformation required
			return valueString;
		} else {	// precision < # of decimal digits, rounding required
			var rounded = undefined;
			if (numberOfDecimalDigits === 1) {	// no shift needed
				rounded = Math.round(Math.abs(value));
				if (value < 0) {
					return '-' + rounded;
				} else {
					return '' + rounded;
				}
			} else { // shift needed
				var trimmedDecimalPart = decimalPart.slice(0, precision + 1);
				var newRightOfDecimal = trimmedDecimalPart.slice(precision);
				var newLeftOfDecimal = trimmedDecimalPart.slice(0, precision);
				var decimalShifted = basePart + newLeftOfDecimal + "." + newRightOfDecimal;
				rounded = Math.round(Math.abs(decimalShifted));
				var roundedString = '' + rounded;
				var finalDecimalPart = roundedString.slice(-precision);
				var rebuiltNumberString = basePart + "." + finalDecimalPart;
				return rebuiltNumberString;

			}
		}
	}
}

// A better approach from a different angle
function bestToFixed(value, precision) {
	var value = checkNumber(value);
	var precision = checkPrecision(precision);
	var valueString = '' + value;
	var precisionString = '' + precision;

	// Test for case where number of decimal digits is precision + 1 and the last digit is 5.
	// This special case is the only time Number.prototype.toFixed can do the wrong thing.
	var specialCase = new RegExp("\\.\\d{" + precisionString + "}5$");
	if (valueString.match(specialCase)) {
		modifiedNumberString = valueString.replace(/5$/, "6");	// ensure proper rounding by bumping 5 to 6
		modifiedNumber = Number(modifiedNumberString);
		fixedNumber = modifiedNumber.toFixed(precision);
	} else {		// built-in toFixed works fine for everything else
	var fixedNumber = value.toFixed(precision);
	}
	return '' + fixedNumber;
}

// Helper functions for toFixed parameters and for padding a string with zeros

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

function zerosForPadding(needed) {
	var zeros = '';
	for (var i = 0; i < needed; i++) {
		var zeros = zeros + 0; 
	}
	return zeros;
}
