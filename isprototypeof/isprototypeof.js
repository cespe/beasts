// Beasts 6. isPrototypeOf

function isPrototypeOf(prototypeObject, targetObject) {
	if (prototypeObject === undefined) {
		throw new TypeError("prototype object cannot be undefined");
	}
	if (prototypeObject === null) {
		throw new TypeError("prototype object cannot be null");
	}
	if (typeof prototypeObject === "number") {
		throw new SyntaxError("prototype object cannot be a number");
	}
	if (arguments.length > 1) {
		try {
			var candidate = Object.getPrototypeOf(targetObject);
		} catch (error) {
			if (error.name === "TypeError") {
				return false;
			}
		}
		if (candidate === prototypeObject) {
			return true;
		} else {
			return isPrototypeOf(prototypeObject, candidate);
		}
	}
	return false;	// if called with just one argument
}
