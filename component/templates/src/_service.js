;(function() {
  'use strict';
  /**
   * @ngdoc service
   * @function
   * @name <%= config.componentName %>Service
   * @module <%= config.moduleName %>
   */
  var ngModule = angular
                  .module('<%= config.moduleName %>.service', []);

  ngModule.service('<%= config.componentName %>Service', function() {

  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
