;(function() {
  'use strict';
  /**
   * @ngdoc service
   * @function
   * @name <%= config.componentName %>Factory
   * @module <%= config.moduleName %>
   */
  var ngModule = angular
                  .module('<%= config.moduleName %>.factory', []);

  ngModule.factory('<%= config.componentName %>Factory', function() {

    // Public API
    return {

    };

  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
