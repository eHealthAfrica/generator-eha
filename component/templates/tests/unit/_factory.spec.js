/*jshint expr: true*/
describe('<%= config.moduleName %>.factory', function() {
  'use strict';

  var factory;

  beforeEach(module('<%= config.moduleName %>.factory'));
  beforeEach(inject(function(_<%= config.componentName %>Factory_) {
    factory = _<%= config.componentName %>Factory_;
  }));

  describe('Public API', function() {
    it('should expose a method', function() {
      expect(factory.method).to.be.defined;
    });
  });
});
