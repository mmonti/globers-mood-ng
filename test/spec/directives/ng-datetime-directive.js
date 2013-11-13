'use strict';

describe('Directive: ngDatetimeDirective', function () {

  // load the directive's module
  beforeEach(module('globersMoodApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-datetime-directive></ng-datetime-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngDatetimeDirective directive');
  }));
});
