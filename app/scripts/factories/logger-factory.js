'use strict';

angular.module('globersMoodApp').factory('logger',
    [
        function () {

    return {
        errorServiceCallback : function(data, status, headers, config) {
            console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
        }
    };
}]);
