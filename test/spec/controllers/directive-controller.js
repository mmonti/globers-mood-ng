'use strict';

describe('Controller: DirectiveControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var DirectiveControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectiveControllerCtrl = $controller('DirectiveControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
