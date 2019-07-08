/* Beasts exercise
 * An improved runWithDebugger that accepts an array of callback parameters
 *
 * The exercise says parameter two should be an array, so I am not allowing an array-like
 * object even though apply() would accept it.
 *
 * Failing silently seems appropriate for the exercise, so I'm not throwing any errors.
*/

function runWithDebugger(functionToDebug, /* optional */ arrayOfCallbackParameters) {
	if (arguments.length === 1) {
		debugger;
		functionToDebug();
	}
	if (Array.isArray(arrayOfCallbackParameters)) {
		debugger;
		functionToDebug.apply(this, arrayOfCallbackParameters);
	}
}
