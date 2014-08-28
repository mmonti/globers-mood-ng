'use strict';

angular.module('globersMoodApp').controller('campaignViewStatisticsController', [
    '$scope', '$stateParams', '$interval', 'pagination', 'preferenceService', 'campaignService', 'feedbackService', 'dispatchService', 'statsService',
    function ($scope, $stateParams, $interval, pagination, preferenceService, campaignService, feedbackService, dispatchService, statsService) {

        var campaignId = $stateParams.id;

        $scope.statistics = {};

        $scope.fromChoice = function(key, property) {
            var choices = $scope.groupByType($scope.statistics.metadata.elements, "elementType")["CHOICE"];
            var choice = _.find(choices, function(choice){
                return choice.key === key;
            });
            if (choice) {
                return choice[property];
            }
            return null;
        };

        $scope.valueMapping = function(key, valueMappingKey) {
            var valueMappings = $scope.fromChoice(key, "valueMappings")
            var mapping = _.find(valueMappings, function(mapping){
                return (mapping.key === valueMappingKey);
            });
            if (mapping) {
                return mapping.value;
            }
            return null;
        };

        $scope.getElement = function(key, elements) {
            var element = _.find(elements, function(element){
                return element.key === key;
            });
            return element;
        };

        $scope.groupByType = function(elements, property) {
            return _.groupBy(elements, property);
        };

        $scope.getValueMappingValue = function(key, elements) {
            var element = _.find(elements, function(element){
                return element.key === key;
            });
            return _.property('value')(element);
        };

        // = Stats
        statsService.campaign(campaignId, function (data, status, headers, config) {
            console.debug("Response from=[" + config.url + "] - Method=[" + config.method + "] - Status=[" + status + "]");
            $scope.statistics = data;
        });

    }
]);
