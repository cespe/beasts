 // It's awkward to insert the dependency array in parameter two. It should be optional at parameter three because not
 // all libraries have dependencies. That follows naturally from the TDD already done.
 

tests({
	"It should take a library name of type String as its first parameter.": function() {
		try {
			librarySystem({name: "myLibrary"});
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "libraryName must be a string");
		}
	},
	'If given a library name and a getLibrary callback, it should store library for retrieval by name': function() {
		function getAppLibrary() {
			return 'app library';
		}
		librarySystem('app', getAppLibrary);
		eq(libraries['app'], 'app library' );
	},
	"Its optional third parameter 'dependencyNames' should be an array.": function() {
		try {
			librarySystem('testApp', function() {}, {});
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "dependencyNames must be an array");
		}
	},
	"Each element of 'dependencyNames' array should be a library name of type String.": function() {
		try {
			librarySystem('testApp', function() {}, ['depOne', 'depTwo', {lib: 'depThree'}]);
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "each element of dependencyNames array must be a string");
		}
	},
	"If called with optional array of dependencies, it should load the dependencies into library": function() {
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
	"If only given library name, it should return the named library with dependencies loaded, if any": function() {
		var result = librarySystem('dependency');
		eq(result, 'loaded dependency');

		var result = librarySystem('app');
		eq(result, 'app library with loaded dependency');

		// set up
		librarySystem('firstname', function() {
			return 'Gordon';
		});

		librarySystem('company', function() {
			return 'Watch and Code';
		});

		librarySystem('workBlurb', function(firstname, company) {		// library with two dependencies
			return firstname + ' works at ' + company;
		}, ['firstname', 'company']);

		librarySystem('lastname', function() {
			return 'Zhu';
		});

		librarySystem('fullname', function(firstname, lastname) {
			return firstname + " " + lastname;
		}, ['firstname', 'lastname']);

		librarySystem('workBlurbFull', function(fullname, company) {	// library with two dependencies of which one
			return fullname + ' works at ' + company;					// also has two dependencies
		}, ['fullname', 'company']);

		
		// tests
		result = librarySystem('firstname');
		eq(result, 'Gordon');

		result = librarySystem('company');
		eq(result, 'Watch and Code');

		result = librarySystem('workBlurb');
		eq(result, 'Gordon works at Watch and Code');

		result = librarySystem('lastname');
		eq(result, 'Zhu');

		result = librarySystem('fullname');
		eq( result, 'Gordon Zhu');

		result = librarySystem('workBlurbFull');
		eq(result, 'Gordon Zhu works at Watch and Code');	// tests recursion for nested dependencies
	},
	"It should throw a ReferenceError if a library that is called for loading is undefined.": function() {
		function getDependency3Library() {
			return 'loaded dependency three';
		}
		librarySystem('dependency3', getDependency3Library);

		function getApp3Library(dependency3, missingDependency) {
			return 'app library three'+ ' with ' + dependency3 + " " + missingDependency;
		}
		var app3Dependencies = ['dependency3', 'missingDependency'];

		try {
			librarySystem('app3', getApp3Library, app3Dependencies);	// library with one missing dependency
		} catch (error) {
			eq(error.name, "ReferenceError");
			eq(error.message, "missingDependency library is missing");
		}
	}

});
