;(function() {
  'use strict';
  /**
   * @ngdoc filter
   * @function
   * @name <%= config.componentName %>
   * @module <%= config.moduleName %>
   */
  var ngModule = angular
                  .module('<%= config.moduleName %>.filter', []);

  ngModule.filter('<%= config.componentName %>', function() {

  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
