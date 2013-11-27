'use strict';

describe('Service: ServiceLoggerFactory', function () {

  // load the service's module
  beforeEach(module('globersMoodApp'));

  // instantiate service
  var ServiceLoggerFactory;
  beforeEach(inject(function (_ServiceLoggerFactory_) {
    ServiceLoggerFactory = _ServiceLoggerFactory_;
  }));

  it('should do something', function () {
    expect(!!ServiceLoggerFactory).toBe(true);
  });

});
