'use strict';

describe('Service: templateService', function () {

  // load the service's module
  beforeEach(module('globersMoodApp'));

  // instantiate service
  var templateService;
  beforeEach(inject(function (_templateService_) {
    templateService = _templateService_;
  }));

  it('should do something', function () {
    expect(!!templateService).toBe(true);
  });

});
