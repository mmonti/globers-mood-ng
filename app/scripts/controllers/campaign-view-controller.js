'use strict';

angular.module('globersMoodApp').controller('campaignViewController', [ '$scope', '$stateParams', '$interval', 'pagination', 'preferenceService', 'campaignService', 'feedbackService', 'dispatchService', 'statsService', function ($scope, $stateParams, $interval, pagination, preferenceService, campaignService, feedbackService, dispatchService, statsService) {

    var campaignId = $stateParams.id;

    $scope.campaign = {};
    $scope.statistics = {};

    // = Load campaign Data
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

    // = Stats
    statsService.campaign(campaignId, function(data, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.statistics = data;
    });


    // = Charts
    $scope.heatMapConfig = {
        start: (3).daysBefore('now'),
        domain: "day",
        subDomain: "hour",
        subDomainTextFormat: "%H",
        range: 7,
        scale: [1, 5, 10, 15],
        cellSize: 20,
        cellPadding: 3,
        cellRadius: 0,
        domainGutter: 10,
        highlight: new Date(),
        cellLabel : {
            empty: "No data on {date}",
            filled: "{count} {name} {connector} {date}"
        },
        colLimit: 4,
        legend: [5, 10, 15, 20, 25],
        legendCellSize: 12,
        legendVerticalPosition: "center",
        legendHorizontalPosition: "right",
        legendOrientation: "vertical",
        onClick: function(d, n) {
            $scope.$apply(function(){

            })
        }
    };

    feedbackService.feedbackOfCampaign(campaignId, function(data, status, headers, config) {
        var timeStamps = {};
        for (var key in _.groupBy(data, 'created')) {
            timeStamps[Math.round(+new Date(Number(key))/1000)] = 1;
        }
        $scope.heatMapConfig.data = timeStamps;
    });

    // == Targets
    $scope.onResend = {
        proceed: function(dialog, index, campaignId, target) {
            dispatchService.remind(campaignId, target.id, function(data, status, headers, config) {
                console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
                dialog.close();
            })
        }
    };
}]);
