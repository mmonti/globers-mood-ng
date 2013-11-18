'use strict';

describe('Controller: CampaignsAllControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('globersMoodApp'));

  var CampaignsAllControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CampaignsAllControllerCtrl = $controller('CampaignsAllControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
