'use strict';

angular.module('globersMoodApp').controller('footerController', ['$scope', 'configuration', 'preferenceService', function($scope, configuration, preferenceService) {

    // Application preferences.
//    $scope.preferences = preferenceService.getApplicationPreferences();

    // = Environment
    $scope.configuration = {
        environment : configuration.getEnvironment()
    };

}]);
