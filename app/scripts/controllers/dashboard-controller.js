'use strict';

angular.module('globersMoodApp').controller('dashboardController', function ($scope, $q, $log, _, preferenceService, campaignService) {
    var pageRequest = {
        page: 0,
        size: 5,
        direction: "asc",
        property: "created"
    };

    var fetchCampaigns = function() {
        campaignService.campaigns(pageRequest, campaignSuccessCallback);
    }

    preferenceService.$ns('dashboard.campaign').then(function(settings){
        angular.extend(pageRequest, {size: settings.dashboard.campaign.items.size });
        // = Fetch the first page of results.
        fetchCampaigns();
    });

    // = Campaigns
    var campaignSuccessCallback = function(data, status, headers, config) {
        $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.campaigns = data.content;
    };

    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, function(data, status, headers, config) {
            $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        });
    };

    $scope.onCampaignStopClose = function(campaignId) {
        campaignService.close(campaignId, function(data, status, headers, config) {
            $log.debug("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        });
    };

    // = Charts
    $scope.options = {
        type: 'line'
    }

    var data = function() {
        return _.map(Date.range(Date.create().addDays(-5), Date.create()).every("day"), function(currentDay){
            return { y: _.random(0, 20), x: currentDay };
        });
    }
    $scope.refresh = function() {
        $scope.weeklyChart.series[0] = { data: data() };
    }
    $scope.weeklyChart = {
        options: {
            chart: {
                type: 'line'
            }
        },
        xAxis: {
            type: 'datetime'
        },
        legend: {
            enabled: false
        },
        series: [{
            data: data()
        }],
        title: {
            text: null
        },
        loading: false
    };

});
