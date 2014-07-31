'use strict';

angular.module('globersMoodApp').factory('preferenceService', ['$rootScope', '$q', '$http', '_', 'logger', 'configuration', function($rootScope, $q, $http, _, logger, configuration) {
    var services = {
        preference : function(preferenceKey, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("preference.get", { key: preferenceKey })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        namespace : function(namespace, successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("preference.namespace", { ns: namespace })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        preferences : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("preference.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        },
        updatePreference : function(preferenceKey, preferenceValue, successCallback, errorCallback) {
            var request = $http({
                method : 'POST',
                url : configuration.getServiceEndpoint("preference.update", { key: preferenceKey, value: preferenceValue })
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
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
        },
        $ns : function(namespace, errorCallback) {
            var deferred = $q.defer();
            services.namespace(
                namespace,
                function(value){
                    deferred.resolve(
                        _.reduce(value, function(memo, item){

                            var preferenceKey = item.preferenceKey;
                            var preferenceValue = item.preferenceValue;
                            var parsed = preferenceKey.split(".");

                            var prototype = {};
                            var transformer = function(array, object, value) {
                                var key = array.shift();
                                if (array.length<=0) {
                                    object[key] = value;
                                    return prototype;
                                }
                                object[key] = {};
                                return transformer(array, object[key], value);
                            };
                            return Object.merge(memo, transformer(parsed, prototype, preferenceValue), true, true);
                        }, {})
                    );
                },
                function(data, status, headers, config){
                    var handler = (errorCallback || logger.errorServiceCallback);
                    handler(data, status, headers, config);
                    deferred.reject(data);
                }
            );
            return deferred.promise;
        },
        $key : function(settingKey, errorCallback) {
            var deferred = $q.defer();
            services.preference(
                settingKey,
                function(value){ deferred.resolve(value); },
                function(data, status, headers, config){
                    var handler = (errorCallback || logger.errorServiceCallback);
                    handler(data, status, headers, config);
                    deferred.reject(data);
                }
            );
            return deferred.promise;
        }
    };
    return services;
}]);