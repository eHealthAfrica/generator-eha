;(function() {
  'use strict';
  /**
   * @ngdoc directive
   * @name <%= config.componentName %>
   * @module <%= config.moduleName %>
   */
  var ngModule = angular
                  .module('<%= config.moduleName %>.directive', []);

  ngModule.directive('<%= config.componentName %>', function() {
    return {
      // Write your DDO here
    }
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
