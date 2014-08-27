'use strict';

angular.module('globersMoodApp').controller('templateAnalyzeController',
    ['$scope', 'templateService',
        function ($scope, templateService) {

    var tabs = [];
    $scope.tabs = function(index) {
        if (!tabs[index]) {
            tabs[index] = { active: index == 0 ? true : false };
        }
        return tabs[index];
    }

    var templateId = $scope.id;

    $scope.getTabName = function(tabName) {
        return tabName.humanize().toUpperCase();
    };

    if ($scope.metadata) {
        $scope.templateMetadata = _.groupBy($scope.metadata.elements, "elementType");
    } else {
        templateService.analyze(templateId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.templateMetadata = _.groupBy(data.elements, "elementType");
        });
    }

    $scope.setMetadata = function() {
        var metadata = ($scope.metadata === null) ? {} : $scope.metadata;
        angular.extend(metadata, {
            elements : _.flatten($scope.templateMetadata)
        });
        templateService.setMetadata(templateId, metadata, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.ref.campaign.template.selection.metadata = data;
            $scope.close();
        })
    }
}]);