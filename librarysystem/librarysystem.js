// Beasts 4. librarySystem with dependencies

// Order of parameters for librarySystem is different from Gordon's version. It makes more
// sense to me to put optional dependency array last, since not all libraries have dependencies.

var libraries = {};

function librarySystem(libraryName, getLibraryCallback, /* optional */ dependencyNamesArray) {
	if (arguments.length > 1) {
		if (arguments.length === 2) {
			libraries[libraryName] = getLibraryCallback();
		} else {
			var dependencies = dependencyNamesArray.map(function(dependencyName) {
				return librarySystem(dependencyName);
			});
			libraries[libraryName] = getLibraryCallback.apply(this, dependencies);
		}
	} else {
		return libraries[libraryName];
	}
};

