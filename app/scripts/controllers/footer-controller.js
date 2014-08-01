'use strict';

angular.module('globersMoodApp').controller('footerController', ['$scope', 'configuration', function($scope, configuration) {

    $scope.configuration = {
        environment : configuration.getEnvironment()
    };

}]);
