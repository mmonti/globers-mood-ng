'use strict';

angular.module('globersMoodApp').factory('templateService',
    ['$http', 'logger', 'configuration',
        function($http, logger, configuration) {

    return {
        templates : function(successCallback, errorCallback) {
            var request = $http({
                method : 'GET',
                url : configuration.getServiceEndpoint("template.list")
            });
            request.success(successCallback);
            request.error(errorCallback || logger.errorServiceCallback);
        }
    }
}]);
