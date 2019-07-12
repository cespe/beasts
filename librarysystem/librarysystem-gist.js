// Beasts 4. librarySystem with dependencies

// I put the optional array of dependencies last since not all libraries have dependencies.

(function() {
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

