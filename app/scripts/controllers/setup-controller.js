'use strict';

angular.module('globersMoodApp').controller('setupController', ['$scope', '$http', '$location', 'configuration', '$upload', 'statsService', 'preferenceService', function ($scope, $http, $location, configuration, $upload, statsService, preferenceService) {

    $scope.preferences = preferenceService.getApplicationPreferences();

    $scope.entities = [];
    statsService.datastore(function(data, status, headers, config) {
        $scope.entities = data;
    });

    // = Wipe Data
    $scope.inputCode = null;
    $scope.generateSecurityCode = function() {
        $scope.securityCode = Math.random().toString(36).substr(2, 5).toUpperCase()
    }();
    $scope.checkCode = function() {
        if (_.isNull($scope.inputCode)) {
            return false;
        }
        return $scope.inputCode.toUpperCase() === $scope.securityCode;
    }

    $scope.handleProceed = function($scope, value) {
        console.log("handler!")
        $scope.close();
    };
}]);
