'use strict';

angular.module('globersMoodApp').controller('dashboardController', ['$scope', '$q', '$interval', '$timeout', '_', 'preferenceService', 'campaignService', 'statsService', function($scope, $q, $interval, $timeout, _, preferenceService, campaignService, statsService) {

    var pageRequest = {
        page: 0,
        size: 5,
        direction: "desc",
        property: "created"
    };

    var fetchCampaigns = function() {
        campaignService.campaigns(pageRequest, campaignSuccessCallback);
    };

    preferenceService.$ns('dashboard.campaign').then(function(settings){
        angular.extend(pageRequest, { size: settings.dashboard.campaign.items.size });
        // = Fetch the first page of results.
        fetchCampaigns();

        if (settings.dashboard.campaign.refresh.enabled === "true") {
            $interval(fetchCampaigns, settings.dashboard.campaign.refresh.time);
        }
    });

    // = Campaigns
    var campaignSuccessCallback = function(data, status, headers, config) {
        console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.campaigns = data.content;
    };

    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        });
    };

    $scope.onCampaignStopClose = function(campaignId) {
        campaignService.close(campaignId, function(data, status, headers, config) {
            console.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        });
    };

    // = Charts
    $scope.weeklyChart = {
        options: {
            chart: { type: 'spline' },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            },
            title: { text: null },
            legend: { enabled: false },
            loading: false,
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e of %b'
                },
                title: {
                    text: 'Day(s)'
                }
            },
            yAxis: {
                title: {
                    text: 'Feedback(n)'
                },
                min: 0
            }
        }
    };

    var getDate = function(date, format) {
        var currentDate = Date.create(date);
        return currentDate.format(format);
    };

    var weeklyFeedbackSuccessCallback = function(data, status, headers, config) {
        var series = [];
        _.each(data, function(serie) {

            var current = {
                name: "Campaign: " + serie.campaignId,
                pointInterval: 24 * 3600 * 1000,
                pointStart: Date.UTC(getDate(serie.fromDate, "{yyyy}"), getDate(serie.fromDate, "{MM}") - 1, getDate(serie.fromDate, "{dd}")),
                data: []
            };

            var keys = Object.keys(serie.entries);
            for (var idx in keys) {
                current.data.push([
                    Date.UTC(getDate(keys[idx], "{yyyy}"), getDate(keys[idx], "{MM}") - 1, getDate(keys[idx], "{dd}")),
                    serie.entries[keys[idx]]
                ]);
            }
            series.push(current);
        });
        $scope.weeklyChart.series = series;
    };

    var fetchWeeklyFeedback = function() {
        statsService.weeklyFeedback(weeklyFeedbackSuccessCallback);
    }();

    $scope.refreshLatestCampaigns = function() {
        fetchCampaigns();
    };

    $scope.refreshWeeklyFeedback = function() {
        statsService.weeklyFeedback(weeklyFeedbackSuccessCallback);
    };

}]);
