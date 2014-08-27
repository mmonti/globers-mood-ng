'use strict';

angular.module('globersMoodApp').controller('campaignViewController', [ '$scope', '$stateParams', '$interval', 'pagination', 'preferenceService', 'campaignService', 'feedbackService', function ($scope, $stateParams, $interval, pagination, preferenceService, campaignService, feedbackService) {

    var campaignId = $stateParams.id;
    campaignService.campaign($stateParams.id, function(data, status, headers, config) {
        data.targets = _.map(data.targets, function(target) {
            _.each(data.feedbacks, function(feedback) {
                if (feedback.user.email === target.email) {
                    angular.extend(target, { feedback: true });
                }
            });
            return target;
        });

        if (data.feedbacks.length > 0) {
            var attributes = [];
            _.each(data.feedbacks[0].attributes, function(attribute) {
                attributes.push(attribute.key);
            });
            angular.extend(data, {
                feedback : {
                    labels : attributes
                }
            });
        }
        $scope.campaign = data;
    });

    $scope.heatMapData = {};
    feedbackService.feedbackOfCampaign(campaignId, function(data, status, headers, config) {
        var timeStamps = {};
        for (var key in _.groupBy(data, 'created')) {
            timeStamps[key] = 1;
        }
//        $scope.heatMapData = timeStamps;
    });

    // = Charts
    $scope.heatMapConfig = {
        domain: "day",
//        subDomain: "",
//        domain: "day",
//        subDomain: "hour",
//        dataType: "json",
        start: (6).daysBefore('today'),
//        highlight: new Date(),
        tooltip: true,
        range: 7,
        cellSize: 20,
        cellRadius: 10,
        data: $scope.heatMapData,
        legend: [1, 5, 10, 15, 20],
        legendVerticalPosition: "center",
        legendHorizontalPosition: "right",
        legendOrientation: "vertical"
    };

}]);
