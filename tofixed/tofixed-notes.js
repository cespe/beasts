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
 * Helper functions get parameter error-handling code out of the main function
 * checkNumber(value) and checkPrecision(precision)
 *
 * if precision >= # of decimal places in value, just use Number.toFixed
 * else precision < # of decimal places in value
 * 	if precision is (# of decimal places in value - 1), then you have a potential problem; if not, just Number.toFixed
 *  if the last digit of the decimals is a 5, then round up by special measures; if not, just Number.toFixed
 *
 *  In other words, the only time you need to round up by special measures is when
 *  	precision === (# of decimal places in value) - 1
 *  	AND
 *  	the last digit of decimals is a 5
 */
 
// Can't use parseInt to get the number of decimal digits:
 var intPart = parseInt(10.235, 10)	// intPart === 10
 10.235 - intPart === 0.23499999999999943	// ouch!

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
