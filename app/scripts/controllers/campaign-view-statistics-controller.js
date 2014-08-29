'use strict';

angular.module('globersMoodApp').controller('campaignViewStatisticsController', [
    '$scope', '$stateParams', 'campaignService', 'statsService', 'templateService',
    function ($scope, $stateParams, campaignService, statsService, templateService) {

        $scope.statistics = {};

        // = Stats of the campaign
        statsService.campaign($scope.campaignId, function (data, status, headers, config) {
            console.debug("Response from=[" + config.url + "] - Method=[" + config.method + "] - Status=[" + status + "]");
            $scope.statistics = data;
        });

        // = Frequency Key
        $scope.getChoiceElementKeys = function() {
            return getKeys(groupByType($scope.metadata.elements, "elementType")["CHOICE"]);
        };

        $scope.getMultilineElementKeys = function() {
            return getKeys(groupByType($scope.metadata.elements, "elementType")["MULTILINE_TEXT"]);
        };

        var getKeys = function(elements) {
            var keys = [];
            _.each(elements, function(element){
                keys.push(element.key);
            });
            return keys;
        };

        var findWithKey = function(elements, key) {
            return _.find(elements, function(element){
                return element.key === key;
            });
        };

        var filterWithKey = function(elements, key) {
            return _.filter(elements, function(element){
                return element.key === key;
            });
        };

        $scope.showPill = function(elementType) {
            return _.contains($scope.metadata.elementTypes, elementType);
        }

        var selectedPill = null;
        $scope.selectPill = function(elementType) {
            selectedPill = elementType;
        };
        $scope.selectedPill = function(elementType) {
            return (selectedPill == elementType);
        };

        var selectedKeyElement = null;
        $scope.selectKeyElement = function(keyElement) {
            selectedKeyElement = keyElement;
        };
        $scope.selectedKeyElement = function(keyElement) {
            return (selectedKeyElement === keyElement);
        };

        // = Choice
        $scope.fromChoice = function(key, property) {
            var choices = groupByType($scope.metadata.elements, "elementType")["CHOICE"];
            var choice = findWithKey(choices, key);
            if (choice) {
                return choice[property];
            }
            return null;
        };

        $scope.fromMultiline = function(key, property) {
            var multilines = groupByType($scope.metadata.elements, "elementType")["MULTILINE_TEXT"];
            var multiline = findWithKey(multilines, key);
            if (multiline) {
                return multiline[property];
            }
            return null;
        };

        $scope.fromFeedback = function(key) {
            var filtered = [];
            _.each($scope.feedbacks, function(feedback) {
                filtered.push({
                    user: feedback.user,
                    feedback: findWithKey(feedback.attributes, key)
                });
            });
            return filtered;
        }

        // = Value Mapping
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

        // = Group By Type
        var  groupByType = function(elements, property) {
            return _.groupBy(elements, property);
        };
    }
]);
