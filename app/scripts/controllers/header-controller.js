'use strict';

angular.module('globersMoodApp').controller('headerController', ['$scope', '$interval', 'configuration', 'pingService', 'preferenceService', function ($scope, $interval, configuration, pingService, preferenceService) {

//    $scope.preferences = preferenceService.getApplicationPreferences();

    $scope.synch = false;
    $scope.showNotification = !$scope.synch;
    $scope.closeNotification = function() {
        $scope.showNotification = false;
    }

    var handleResponse = function(property, response, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope[property] = response;
        $scope.synch = true;
    }

    var syncServices = function() {
        console.debug("calling ping service to sync...")

        pingService.pingDelay(function(data, status, headers, config) {
            handleResponse($scope.ping, data, status, headers, config);
        }, function(data, status, headers, config) {
            console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
            $scope.synch = false;
        });
    };

    // = trigger the first synch.
    syncServices();

    var synchronizeTime = 0;
    preferenceService.preference('services.synchronize.time', function(data, status, headers, config) {
        console.info('preference=[services.synchronize.time]='+data);
        synchronizeTime = Number(data);
    });

    preferenceService.preference('services.synchronize', function(data, status, headers, config) {
        console.info('preference=[services.synchronize]='+data);
        // Check if PING service is active.
        if (data === "false") {
            return;
        }
        // = Check if there is someone on the other side each 10sec.
        if (synchronizeTime > 0) {
            $interval(syncServices, synchronizeTime);
        }
    });
}]);