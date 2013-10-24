'use strict';

describe('Service: campaignService', function () {

  // load the service's module
  beforeEach(module('globersMoodApp'));

  // instantiate service
  var campaignService;
  beforeEach(inject(function (_campaignService_) {
    campaignService = _campaignService_;
  }));

  it('should do something', function () {
    expect(!!campaignService).toBe(true);
  });

});
