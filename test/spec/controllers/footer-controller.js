'use strict';

describe('Controller: FooterControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var FooterControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FooterControllerCtrl = $controller('FooterControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
