/*jshint expr: true*/
describe('<%= config.moduleName %>.service', function() {
  'use strict';

  var service;

  beforeEach(module('<%= config.moduleName %>.service'));
  beforeEach(inject(function(_<%= config.componentName %>Service_) {
    service = _<%= config.componentName %>Service_;
  }));

  describe('Public API', function() {
    it('should expose a method', function() {
      expect(service.method).to.be.defined;
    });
  });

});
