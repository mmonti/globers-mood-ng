'use strict';

describe('Filter: dateRelative', function () {

  // load the filter's module
  beforeEach(module('globersMoodApp'));

  // initialize a new instance of the filter before each test
  var dateRelative;
  beforeEach(inject(function ($filter) {
    dateRelative = $filter('dateRelative');
  }));

  it('should return the input prefixed with "dateRelative filter:"', function () {
    var text = 'angularjs';
    expect(dateRelative(text)).toBe('dateRelative filter: ' + text);
  });

});
