'use strict';

angular.module('globersMoodApp').factory('preferenceService', function($rootScope, $http, _, configuration) {
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
        },

        get : function(key) {
            var preference = _.where($rootScope.preferences, { preferenceKey: key });
            if (_.isUndefined(preference) && !_.isEmpty(preference)) {
                return preference[0];
            }
            return null;
        },

        getInNamespace : function(key, namespace) {
            var preference = _.where($rootScope.preferences, { preferenceKey: key, namespace: namespace });
            if (_.isUndefined(preference) && !_.isEmpty(preference)) {
                return preference[0];
            }
            return null;
        },

        getAllFromNamespace : function(namespace) {
            var preference = _.where($rootScope.preferences, { namespace: namespace });
            if (_.isUndefined(preference) && !_.isEmpty(preference)) {
                return preference;
            }
            return null;
        }
    };
});