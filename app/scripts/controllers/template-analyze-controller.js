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

    $scope.templateMetadata = {};
    if ($scope.metadata) {
        if ($scope.metadata.valid) {
            angular.extend($scope.templateMetadata, { elements: _.groupBy($scope.metadata.elements, "elementType") })
        }
        angular.extend($scope.templateMetadata, {
            valid: $scope.metadata.valid,
            static: $scope.metadata.static,
            survey: $scope.metadata.survey
        });

    } else {
        templateService.getMetadata(templateId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            if (data.valid) {
                angular.extend($scope.templateMetadata, { elements: _.groupBy(data.elements, "elementType") });
            }
            angular.extend($scope.templateMetadata, {
                valid: data.valid,
                static: data.static,
                survey: data.survey
            });
        });
    }

    $scope.setMetadata = function() {
        var metadata = ($scope.metadata === null) ? {} : $scope.metadata;
        angular.extend(metadata, {
            elements : _.flatten($scope.templateMetadata.elements)
        });
        templateService.setMetadata(templateId, metadata, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            $scope.ref.campaign.template.selection.metadata = data;
            $scope.close();
        })
    }
}]);