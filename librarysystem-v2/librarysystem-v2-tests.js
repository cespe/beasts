// To allow loading out of order, will need to save dependency callbacks instead of running them right away in
// the create step.
// Run the callbacks to load dependencies in the use step.
// The other requirement is that each library callback is run only once. Why?

tests({
	"It should take a library name of type String as its first parameter.": function() {
		fail();
	},
	"Its optional second parameter should be a 'getLibrary' callback that returns the library.": function() {
		fail();
	},
	"If given just the library name and callback, it should store library for retrieval by name.": function() {
		fail();
		function getAppLibrary() {
			return 'app library';
		}
		librarySystem('app', getAppLibrary);
		eq(libraries['app'], 'app library' );
	},
	"Its optional third parameter should be an array of library names of type String to load as dependencies.": function() {
		fail();
	},
	"If called with optional array of dependencies, it should store the array and callback for later use.": function() {
		fail();
		function getDependencyLibrary() {
			return 'loaded dependency';
		}
		librarySystem('dependency', getDependencyLibrary);			// simple library with no dependencies
		
		function getAppLibrary(dependency) {
			return 'app library'+ ' with ' + dependency;
		}
		librarySystem('app', getAppLibrary, ['dependency']);		// library with one dependency
		eq(libraries['app'], 'app library with loaded dependency');
	},
	"If only given library name, it should return the named library with dependencies loaded, if any.": function() {
		fail();
		var result = librarySystem('dependency');
		eq(result, 'loaded dependency');

		var result = librarySystem('app');
		eq(result, 'app library with loaded dependency');

		// set up
		librarySystem('name', function() {
			return 'Gordon';
		});

		librarySystem('company', function() {
			return 'Watch and Code';
		});

		librarySystem('workBlurb', function(name, company) {		// library with two dependencies
			return name + ' works at ' + company;
		}, ['name', 'company']);
		
		// tests
		result = librarySystem('name');
		eq(result, 'Gordon');

		result = librarySystem('company');
		eq(result, 'Watch and Code');

		result = librarySystem('workBlurb');
		eq(result, 'Gordon works at Watch and Code');
	},
	"It should not run 'getLibrary' callback more than once for each library.": function() {
		fail();
	}
});
