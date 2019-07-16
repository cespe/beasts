// Beasts 5. Creating libraries out of order

// Order of parameters for librarySystem is different from Gordon's version. It makes more
// sense to me to put optional dependency array last, since not all libraries have dependencies.

var libraries = {};
var libraryDependencies = {};
var libraryCallbacks = {};

function librarySystem(libraryName, /* optional */ getLibrary, /* optional */ dependencyNames) {
	if (typeof libraryName !== "string") {
		throw new TypeError("libraryName must be a string"); 
	}
	if (libraries[libraryName]) {
		// don't store a library more than once
		return libraries[libraryName];
	}
	if (arguments.length > 1) {
		if (typeof getLibrary !== "function") {
			throw new TypeError("getLibrary must be a function that returns the library");
		}
		if (arguments.length === 2) {
			// store library that has no dependencies
			libraries[libraryName] = getLibrary();
		} else {
			if (!Array.isArray(dependencyNames)) {
			throw new TypeError("dependencyNames must be an array");
			}
			for (var i = 0; i < dependencyNames.length; i++) {
				if (typeof dependencyNames[i] !== "string") {
					throw new TypeError("each element of dependencyNames array must be a string");
				}
			}
			// wait to store library that has dependencies
			libraryDependencies[libraryName] = dependencyNames;
			libraryCallbacks[libraryName] = getLibrary;
		}
	} else {
		// called with libraryName only
		if (libraryName in libraryDependencies) {
			// retrieve callback and dependencies from storage
			var dependencyNames = libraryDependencies[libraryName];
			var getLibrary = libraryCallbacks[libraryName];
			var dependencies = dependencyNames.map(function(dependencyName) {
				return librarySystem(dependencyName);	// recursive for nested dependencies
			});
			// store library that has dependencies
			libraries[libraryName] = getLibrary.apply(this, dependencies);
			}
		if (libraries[libraryName] === undefined) {
			throw new ReferenceError(libraryName + " library is missing");
		} else {
			return libraries[libraryName];
		}
	}
};

