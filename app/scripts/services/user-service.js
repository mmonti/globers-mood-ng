'use strict';

angular.module('globersMoodApp').factory('userService', function($http, configuration) {
    return {
        users : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("user.list")
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    }
});
