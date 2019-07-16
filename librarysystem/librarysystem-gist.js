// Beasts 4. librarySystem with dependencies

// I put the optional array of dependencies last since not all libraries have dependencies.

(function() {
	var libraries = {};

	function librarySystem(libraryName, /* optional */ getLibrary, /* optional */ dependencyNames) {
		if (typeof libraryName !== "string") {
			throw new TypeError("libraryName must be a string"); 
		}
		if (arguments.length > 1) {
			if (typeof getLibrary !== "function") {
				throw new TypeError("getLibrary must be a function that returns the library");
			}

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
			if (libraries[libraryName] === undefined) {
				throw new ReferenceError(libraryName + " library is missing");
			} else {
				return libraries[libraryName];
			}
		}
	};

	window.librarySystem = librarySystem;

})();


// example library with two dependencies

librarySystem('name', function() {
	return 'Gordon';
});

librarySystem('company', function() {
 	return 'Watch and Code';
});

librarySystem('workBlurb', function(name, company) {
	return name + ' works at ' + company;
}, ['name', 'company']);

var workBlurbLibrary = librarySystem('workBlurb'); // 'Gordon works at Watch and Code'

console.log(workBlurbLibrary);

// example library with two dependencies, one of which also has dependencies

librarySystem('firstname', function() {
	return 'Gordon';
});

librarySystem('lastname', function() {
	return 'Zhu';
});

librarySystem('fullname', function(firstname, lastname) {
	return firstname + " " + lastname;
}, ['firstname', 'lastname']);

librarySystem('city', function() {
 	return 'San Francisco';
});

librarySystem('workplaceBlurb', function(fullname, city) {
	return fullname + ' works in ' + city;
}, ['fullname', 'city']);

var workplaceLibrary = librarySystem('workplaceBlurb'); // 'Gordon Zhu works in San Francisco'

console.log(workplaceLibrary);

