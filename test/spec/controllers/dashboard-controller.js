'use strict';

describe('Controller: DashboardControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var DashboardControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardControllerCtrl = $controller('DashboardControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
