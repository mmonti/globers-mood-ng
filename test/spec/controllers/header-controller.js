'use strict';

describe('Controller: HeaderControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var HeaderControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderControllerCtrl = $controller('HeaderControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
