// Beasts 4. librarySystem with dependencies

// Order of parameters for librarySystem is different from Gordon's version. It makes more
// sense to me to put optional dependency array last, since not all libraries have dependencies.

var libraries = {};

function librarySystem(libraryName, /* optional */ getLibrary, /* optional */ dependencyNames) {
	if (typeof libraryName !== "string") {
		throw new TypeError("libraryName must be a string"); 
	}
	if (arguments.length > 1) {
		if (arguments.length === 2) {
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
			var dependencies = dependencyNames.map(function(dependencyName) {
				return librarySystem(dependencyName);	// recurse for nested dependencies
			});
			libraries[libraryName] = getLibrary.apply(this, dependencies);
		}
	} else {
		return libraries[libraryName];
	}
};

