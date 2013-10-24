'use strict';

describe('Controller: SetupControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var SetupControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetupControllerCtrl = $controller('SetupControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
