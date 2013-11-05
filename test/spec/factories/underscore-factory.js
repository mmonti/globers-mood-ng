'use strict';

describe('Service: UnderscoreFactory', function () {

  // load the service's module
  beforeEach(module('GlobersmoodApp'));

  // instantiate service
  var UnderscoreFactory;
  beforeEach(inject(function (_UnderscoreFactory_) {
    UnderscoreFactory = _UnderscoreFactory_;
  }));

  it('should do something', function () {
    expect(!!UnderscoreFactory).toBe(true);
  });

});
