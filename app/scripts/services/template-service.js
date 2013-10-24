'use strict';

angular.module('globersMoodApp').factory('templateService', function($http, configuration) {
    return {
        templates : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("template.list")
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    }
});
