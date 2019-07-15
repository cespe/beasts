/*
 To allow loading out of order, will need to save a library's dependencies and callback instead of running them
 right away in the create/store step as can still be done for a library with no dependencies.

 The other requirement is that each library callback is run only once -- essentially, if a library is already stored,
 just return it.
*/

tests({
	"It should take a library name of type String as its first parameter.": function() {
		try {
			librarySystem({name: "myLibrary"});
		} catch (error) {
			eq(error.name, "TypeError");
			eq(error.message, "libraryName must be a string");
		}
	},
	//"Its optional second parameter should be a 'getLibrary' callback that returns the library.": function() {
		// Can't see how to test this. Could require it to be a function but the function could return garbage.
		//fail();
	//},
	"If given just the library name and 'getLibrary' callback, it should store library for retrieval by name.": function() {
		function getApp1Library() {
			return 'app library one';
		}
		librarySystem('app1', getApp1Library);
		eq(libraries['app1'], 'app library one' );
		eq('app1' in libraryDependencies, false);
		eq('app1' in libraryCallbacks, false);
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
	"If called with 'dependencyNames' array, it should store the array and 'getLibrary' callback for later use.": function() {
		function getApp2Library(dependency2) {
			return 'app library two'+ ' with ' + dependency2;
		}
		var app2Dependencies = ['dependency2'];
		librarySystem('app2', getApp2Library, app2Dependencies);	// library with one dependency
		eq(libraryDependencies['app2'], app2Dependencies);			// stored to load later
		eq(libraryCallbacks['app2'], getApp2Library);
		eq('app2' in libraries, false);

		function getDependency2Library() {
			return 'loaded dependency two';
		}
		librarySystem('dependency2', getDependency2Library);		// simple library with no dependencies
		eq(libraries['dependency2'], 'loaded dependency two');		// loads immediately
		eq('dependency2' in libraryDependencies, false);
		eq('dependency2' in libraryCallbacks, false);
	},
	"If only given library name, it should return the named library with dependencies loaded, if any.": function() {
		var result = librarySystem('app2');							// library with one dependency
		eq(result, 'app library two with loaded dependency two');

		var result = librarySystem('dependency2');
		eq(result, 'loaded dependency two');

		// test case from the exercise
		librarySystem('workBlurb', function(fullname, company) {	// library with two dependencies of which one
			return fullname + ' works at ' + company;				// also has two dependencies
		}, ['fullname', 'company']);

		librarySystem('fullname', function(firstname, lastname) {
			return firstname + " " + lastname;
		}, ['firstname', 'lastname']);
		
		librarySystem('firstname', function() {
			return 'Gordon';
		});

		librarySystem('lastname', function() {
			return 'Zhu';
		});

		librarySystem('company', function() {
			return 'Watch and Code';
		});

		result = librarySystem('workBlurb');
		eq(result, 'Gordon Zhu works at Watch and Code');

		result = librarySystem('fullname');
		eq( result, 'Gordon Zhu');

		result = librarySystem('lastname');
		eq(result, 'Zhu');

		result = librarySystem('firstname');
		eq(result, 'Gordon');

		result = librarySystem('company');
		eq(result, 'Watch and Code');
	},
	"It should throw a ReferenceError if a library that is called for loading is undefined.": function() {
		function getApp3Library(dependency3, missingDependency) {
			return 'app library three'+ ' with ' + dependency3 + " " + missingDependency;
		}
		var app3Dependencies = ['dependency3', 'missingDependency'];
		librarySystem('app3', getApp3Library, app3Dependencies);	// library with one missing dependency

		function getDependency3Library() {
			return 'loaded dependency three';
		}
		librarySystem('dependency3', getDependency3Library);

		try {
			result = librarySystem('app3');
		} catch (error) {
			eq(error.name, "ReferenceError");
			eq(error.message, "missingDependency library is missing");
		}
	},
	"It should not run 'getLibrary' callback more than once for each library.": function() {
		function newWorkBlurbCallback(fullname, company) {
			return "workBlurb 2.0" + " for " + fullname + " at " + company;
		}
		librarySystem('workBlurb', newWorkBlurbCallback, ['fullname', 'company']);
		result = librarySystem('workBlurb');
		eq(result, "Gordon Zhu works at Watch and Code");	// original library, not the replacement from changed callback
	}
});

