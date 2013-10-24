'use strict';

describe('Service: pingService', function () {

  // load the service's module
  beforeEach(module('globersMoodApp'));

  // instantiate service
  var pingService;
  beforeEach(inject(function (_pingService_) {
    pingService = _pingService_;
  }));

  it('should do something', function () {
    expect(!!pingService).toBe(true);
  });

});
