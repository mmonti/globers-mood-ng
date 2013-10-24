'use strict';

describe('Service: projectFactory', function () {

  // load the service's module
  beforeEach(module('globersMoodApp'));

  // instantiate service
  var projectFactory;
  beforeEach(inject(function (_projectFactory_) {
    projectFactory = _projectFactory_;
  }));

  it('should do something', function () {
    expect(!!projectFactory).toBe(true);
  });

});
