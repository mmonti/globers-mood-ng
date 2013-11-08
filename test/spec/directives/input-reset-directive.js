'use strict';

describe('Directive: inputResetDirective', function () {

  // load the directive's module
  beforeEach(module('globersMoodApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input-reset-directive></input-reset-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the inputResetDirective directive');
  }));
});
