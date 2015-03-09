;(function() {

  var ngModule = angular.module('<%= config.moduleName %>', [
<% config.dependencies.forEach(function(dependency, index) { %>    '<%= dependency %>'<% if (index < config.dependencies.length - 1) { %>,<%= '\n' %><% } %><% }); %>
  ]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
