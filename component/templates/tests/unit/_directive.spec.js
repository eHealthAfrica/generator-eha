/*jshint expr: true*/
describe('<%= config.moduleName %>.directive', function() {
  'use strict';
  <% if (hasFeature('template')) { %>beforeEach(module('<%= config.moduleName %>.template'));<% } %>
  beforeEach(module('<%= config.moduleName %>.directive'));
});
