 // It's awkward to insert the dependency array in parameter two. It should be optional at parameter three because not
 // all libraries have dependencies. That follows naturally from the TDD already done.
 

tests({
	'If given a library name and a getLibrary callback, it should store library for retrieval by name': function() {
		function getAppLibrary() {
			return 'app library';
		}
		librarySystem('app', getAppLibrary);
		eq(libraries['app'], 'app library' );
	},
	"If called with optional array of dependencies, it should load the dependencies into library": function() {
		function getDependencyLibrary() {
			return 'loaded dependency';
		}
		librarySystem('dependency', getDependencyLibrary);
		
		function getAppLibrary(dependency) {
			return 'app library'+ ' with ' + dependency;
		}
		librarySystem('app', getAppLibrary, ['dependency']);
		eq(libraries['app'], 'app library with loaded dependency');
	},
	"If only given library name, it should return the named library with dependencies loaded, if any": function() {
		var getAppLibrary = function() { return 'library' };
		librarySystem('app');
		var result = librarySystem('app');
		eq(result, 'library');
	},
});
