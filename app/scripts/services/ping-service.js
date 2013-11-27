'use strict';

angular.module('globersMoodApp').factory('pingService', function($http, logger, configuration) {
    return {
        ping : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("ping")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        pingDelay : function(successCallback, errorCallback) {
            var start = new Date().getMilliseconds();
            var handlePingResponse = function(data, status, headers, config) {
                var end = new Date().getMilliseconds();
                successCallback({
                    ping: data,
                    delay: (end-start)
                }, status, headers, config);
            }
            this.ping(handlePingResponse, errorCallback);
        }
    };
});