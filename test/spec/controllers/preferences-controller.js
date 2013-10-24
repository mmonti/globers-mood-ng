'use strict';

describe('Controller: PreferencesControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var PreferencesControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreferencesControllerCtrl = $controller('PreferencesControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
