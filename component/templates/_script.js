;(function() {
  'use strict';

  var ngModule = angular.module('<%= componentNamespace %>.<%= componentName %>', []);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

}());
