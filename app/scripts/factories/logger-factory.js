'use strict';

angular.module('globersMoodApp').factory('logger', function ($log) {
    return {
        errorServiceCallback : function(data, status, headers, config) {
            $log.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
        }
    };
});
