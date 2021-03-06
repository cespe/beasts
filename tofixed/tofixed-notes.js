/* Beasts 7. A twist on accounting.toFixed
 * The function needs to fix these unwanted results produced by Number.prototype.toFixed:
 * 1.005.toFixed(2)		// "1.00" produced, but "1.01" wanted
 * 0.615.toFixed(2)		// "0.61" produced, but "0.62" wanted
 * 10.235.toFixed(2)	// "10.23" produced, but "10.24" wanted
 *
 * Original accounting.toFixed still doesn't do the right thing for 1.005.
 * Gordon's scientific notation version betterToFixed gets them all right.
 *
 * BUT both accounting.toFixed and Gordon's betterToFixed get negative decimals wrong
 * because they rely on Math.round and Math.round rounds towards postive infinity by design.
 * accounting.toFixed and betterToFixed give 0.615 --> 0.62 but -0.615 --> -0.61
 * Google Sheets, Apple Numbers and Microsoft Excel all give 0.615 --> 0.62 and -0.615 --> -0.62.
 * That's a bug that should be fixed.
 */

// console log tests for positive/negative decimals
accounting.toFixed(-.615, 2)	// "-0.61"
accounting.toFixed(.615, 2)		// "0.62"
accounting.toFixed(10.235, 2)	// "10.24"
accounting.toFixed(-10.235, 2)	// "-10.23"
betterToFixed(0.615, 2)		// "0.62"
betterToFixed(-0.615, 2)	// "-0.61"
betterToFixed(10.235, 2)	// "10.24"
betterToFixed(-10.235, 2)	// "-10.23"
betterToFixed(1.005, 2)		// "1.01"
betterToFixed(-1.005, 2)	// "-1"

/*
 * shiftedToFixed(value, precision)
 * Helper functions get parameter error-handling code out of the main function
 * checkNumber(value)
 * checkPrecision(precision)
 *
 * if precision >= # of decimal places in value, just use Number.toFixed.
 * else precision < # of decimal places in value
 *  if # of decimal digits is > precision + 1, then just use Number.toFixed. Any multi-digit number that
 *  starts with a 5 is going to round up.
 * 	if # of decimal digits is equal to precision + 1, then you have a potential problem.
 *
 *  In other words, the only time you need to round up by special measures is when 1) the number of decimal digits
 *   is precision + 1 and 2) the decimal digit at precision + 1 is a 5
 */
 
// Can't use parseInt to get the number of decimal digits:
 var intPart = parseInt(10.235, 10)	// intPart === 10
 10.235 - intPart === 0.23499999999999943	// ouch!

// ------- string manipulation for handling special case --------------------------------- 

// get the decimal part with a regex
'10.2353'.match(/\.\d+/);	// [".2353", index: 2, input: "10.2353", groups: undefined]
'10.235'.match(/\.\d+/);	// [".235", index: 2, input: "10.235", groups: undefined]
'0.615'.match(/\.\d+/);		// [".615", index: 1, input: "0.615", groups: undefined]
'25'.match(/\.\d+/);		// null

// get number of digits in the decimal part
var decimalPartMatch = '10.235'.match(/\.\d+/);
var numberOfDecimalDigits = decimalPartMatch[0].length - 1;		// 3

// better way with a single regex that just gets the special case else null
//  /\.\d{2}5$/ translates to "decimal point followed by 'precision' number of digits followed by 5 as
//  the final digit"
var precision = 2
var precisionString = '' + precision
var specialCase = new RegExp("\\.\\d{" + precisionString + "}5$")
'10.235'.match(specialCase);	// [".235", index: 2, input: "10.235", groups: undefined]
'10.2358'.match(specialCase);	// null because 5 is not the last digit

// split and assemble shifted number, round, re-assemble the answer
var splitNumber = '10.235'.split('.')	// (2) ["10", "235"]
var insertPoint = splitNumber[1].slice(2)	// "5"
var insertPoint2 = splitNumber[1].slice(0, 2)	// "23"
var decimalShifted = splitNumber[0] + insertPoint2 + "." + insertPoint	// "1023.5"
rounded = Math.round(decimalShifted);	// 1024
roundedString = '' + rounded			// "1024"
answerString = roundedString.slice(-2)	// "24"
answerStringStart = roundedString.slice(0, roundedString.length - 2);	// "10"
rebuiltNumber = answerStringStart + "." + answerString	// "10.24"

// -------- string manipulation for handling all cases (no more Number.toFixed) -------------

// case one value is an integer
	// if precision = 0, return value
	// if precision > 0, add a decimal point and pad with zeroes
// case two value has decimal point and digits
	// if precision < # of decimal digits, pad with zeroes
	// else trim to precision + 1 and shift

// get the decimal part with a regex
'10.2353'.match(/\.\d+/);	// [".2353", index: 2, input: "10.2353", groups: undefined]
'10.235'.match(/\.\d+/);	// [".235", index: 2, input: "10.235", groups: undefined]
'0.615'.match(/\.\d+/);		// [".615", index: 1, input: "0.615", groups: undefined]
'25'.match(/\.\d+/);		// null

// get number of digits in the decimal part
var decimalPartMatch = '10.235'.match(/\.\d+/);
var numberOfDecimalDigits = decimalPartMatch[0].length - 1;		// 3

// split and assemble shifted number, round, re-assemble the answer
var splitNumber = '10.235'.split('.')	// (2) ["10", "235"]
var insertPoint = splitNumber[1].slice(2)	// "5"
var insertPoint2 = splitNumber[1].slice(0, 2)	// "23"
var decimalShifted = splitNumber[0] + insertPoint2 + "." + insertPoint	// "1023.5"
rounded = Math.round(decimalShifted);	// 1024
roundedString = '' + rounded			// "1024"
answerString = roundedString.slice(-2)	// "24"
answerStringStart = roundedString.slice(0, roundedString.length - 2);	// "10"
rebuiltNumber = answerStringStart + "." + answerString	// "10.24"
