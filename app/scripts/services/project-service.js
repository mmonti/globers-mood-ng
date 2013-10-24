'use strict';

angular.module('globersMoodApp').factory('projectService', function($http, configuration) {
    return {
        projects : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("project.list")
            });
            request.success(successCallback);
            request.error(errorCallback);
        }
    }
});
