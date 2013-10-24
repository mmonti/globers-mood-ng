'use strict';

angular.module('globersMoodApp').controller('headerController', function ($scope, $rootScope, pingService) {

    $rootScope.synch = false;

    $scope.showNotification = !$rootScope.synch;
    $scope.closeNotification = function() {
        $scope.showNotification = false;
    }

    var handleResponse = function(property, response, status, headers, config) {
        console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope[property] = response;
        $rootScope.synch = true;
    }

    var syncServices = function() {
        pingService.pingDelay(function(data, status, headers, config) {
            handleResponse($scope.ping, data, status, headers, config);
        }, function(data, status, headers, config) {
            console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
            $rootScope.synch = false;
        });
    }

    // = Synch
    syncServices();

    // = Check if there is someone on the other side each 10sec.
    setInterval(function() {
        syncServices();
        console.debug("calling ping service to sync...")
    }, 10000);

});
