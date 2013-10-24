'use strict';

angular.module('globersMoodApp').factory('preferenceService', function($http, configuration) {
    return {
        preference : function(preferenceKey, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("preference.get", { key: preferenceKey })
            });
            request.success(successCallback);
            request.error(errorCallback);
        },

        preferences : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("preference.list")
            });
            request.success(successCallback);
            request.error(errorCallback);
        },

        updatePreference : function(preferenceKey, preferenceValue, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("preference.update", { key: preferenceKey, value: preferenceValue })
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    };
});