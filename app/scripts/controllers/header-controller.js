'use strict';

angular.module('globersMoodApp').controller('headerController', function ($scope, $timeout, $log, configuration, pingService) {

    $scope.synch = false;
    $scope.showNotification = !$scope.synch;
    $scope.closeNotification = function() {
        $scope.showNotification = false;
    }

    var handleResponse = function(property, response, status, headers, config) {
        $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope[property] = response;
        $scope.synch = true;
    }

    var syncServices = function() {
        $log.debug("calling ping service to sync...")

        pingService.pingDelay(function(data, status, headers, config) {
            handleResponse($scope.ping, data, status, headers, config);
        }, function(data, status, headers, config) {
            $log.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
            $scope.synch = false;
        });

        // Check if PING service is active.
        if (!configuration.isServicesInSynchActive()) {
            return;
        }

        // = Check if there is someone on the other side each 10sec.
        $timeout(syncServices, 10000);
    }();
});
