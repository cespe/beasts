// Beasts 7. A twist on accounting.toFixed

// What the exercise asks for: move decimal point, Math.round(), move decimal point back

function shiftedToFixed(value, precision) {
	var value = checkNumber(value);
	var precision = checkPrecision(precision);
	var valueString = '' + value;

	// Case 1: Value is an integer

	if (!valueString.includes('.')) {

		// Case 1A. Value is an integer and precision is zero
		//			Just return value

		if (precision === 0) {						
			return valueString;

	// Case 1B. Value is an integer and precision > 0
	//			Add a decimal point and pad with zeros

		} else {
			return valueString + "." + zerosForPadding(precision)
		}

	// Case 2: Value is a float (it has a decimal point and decimal digits)

	} else {
		var splitNumber = valueString.split('.');
		var basePart = splitNumber[0];
		var decimalPart = splitNumber[1];
		var numberOfDecimalDigits = decimalPart.length

		// Case 2A. Value is a float with precision > # of decimal digits
		//			Pad with zeros to match precision

		if (precision > numberOfDecimalDigits) {			
			var zerosNeeded = precision - numberOfDecimalDigits;
			zeros = zerosForPadding(zerosNeeded);

			return basePart + "." + decimalPart + zeros;

		// Case 2B. Value is a float with precision = # of decimal digits
		//			No transformation required


		} else if (precision === numberOfDecimalDigits) {

			return valueString;										

		// Case 2C. Value is a float with precision < # of decimal digits
		//			Rounding is required

		} else {									
			var rounded = undefined;
			if (numberOfDecimalDigits === 1) {				// no shift needed for rounding
				rounded = Math.round(Math.abs(value));
				if (value < 0) {
					return '-' + rounded;
				} else {
					return '' + rounded;
				}
			} else {										// shift needed for rounding

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

function simplerToFixed(value, precision) {
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

	} else {													// built-in toFixed works fine for everything else
	var fixedNumber = value.toFixed(precision);
	}

	return '' + fixedNumber;
}

// ******************************* Helper functions ****************************************


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

// Return a string of zeroes of the needed length (did not know about String.prototype.padEnd, a built-in alternative)

function zerosForPadding(needed) {
	var zeros = '';
	for (var i = 0; i < needed; i++) {
		var zeros = zeros + 0; 
	}
	return zeros;
}
