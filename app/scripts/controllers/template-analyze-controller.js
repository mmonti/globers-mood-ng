'use strict';

angular.module('globersMoodApp').controller('templateAnalyzeController',
    ['$scope', 'templateService',
        function ($scope, templateService) {

    var templateId = $scope.id;

    $scope.getTabName = function(tabName) {
        return tabName.humanize().toUpperCase();
    };

    if ($scope.metadata) {
        $scope.templateMetadata = _.groupBy($scope.metadata.elements, "type");
    } else {
        templateService.analyze(templateId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.templateMetadata = _.groupBy(data.elements, "type");
        });
    }

    $scope.setMetadata = function() {
        var elements = $scope.templateMetadata;
        var metadata = {
            elements : _.map(_.flatten(elements), function(element) {
                return _.omit(element, 'id', 'created');
            })
        };
        templateService.setMetadata(templateId, metadata, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.close();
        })
    }
}]);
