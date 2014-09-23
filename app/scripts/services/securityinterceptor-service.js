'use strict';

/**
 * @ngdoc service
 * @name bt-admin.requestInterceptor
 * @description
 * # requestInterceptor
 * Factory in the bt-admin.
 * Registers auth token interceptor, auth token is either passed by header or by query parameter as soon as
 * there is an authenticated user
 */
angular.module('globersMoodApp')
    .factory('requestInterceptor', ['$q', '$rootScope', 'configuration', function ($q, $rootScope, configuration) {
        // Service logic
        var authTokenHeaderName = configuration.getAuthTokenHeaderName();
        var authTokenValue = configuration.getAuthTokenValue();
        var useAuthTokenHeader = configuration.useAuthTokenHeader();
        var endpointBase = configuration.getEndpointBase();
        // ...
        // Public API here
        return {
            // On request success
            'request': function(request) {
                var isRestCall = (request.url.indexOf(endpointBase) != 0);
                if (isRestCall) {
                    if (useAuthTokenHeader) {
                        request.headers[authTokenHeaderName] = authTokenValue;
                    } else {
                        request.url = request.url + "?token=" + authTokenValue;
                    }
                }
                return request || $q.when(request);
            },
            // On request failure
            'requestError': function (rejection) {
                $rootScope.$broadcast('requestError', rejection);

                // console.log(rejection); // Contains the data about the error on the request.
                // Return the promise rejection.
                return $q.reject(rejection);
            },
            // On response success
            'response': function (response) {
                $rootScope.$broadcast('response', response);

                // console.log(response); // Contains the data from the response.
                // Return the response or promise.
                return response || $q.when(response);
            },
            // On response failture
            'responseError': function (rejection) {
                $rootScope.$broadcast('responseError', rejection);

                // console.log(rejection); // Contains the data about the error.
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }]);

