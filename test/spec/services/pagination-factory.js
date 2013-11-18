'use strict';

describe('Service: PaginationFactory', function () {

  // load the service's module
  beforeEach(module('globersMoodApp'));

  // instantiate service
  var PaginationFactory;
  beforeEach(inject(function (_PaginationFactory_) {
    PaginationFactory = _PaginationFactory_;
  }));

  it('should do something', function () {
    expect(!!PaginationFactory).toBe(true);
  });

});
