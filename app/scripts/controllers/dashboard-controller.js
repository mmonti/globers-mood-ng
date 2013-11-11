'use strict';

angular.module('globersMoodApp').controller('dashboardController', function ($scope, campaignService) {

    // = Generic callback error logger.
    var errorCallback = function(data, status, headers, config) {
        console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
    }

    // = Dashboard
    var campaignSuccessCallback = function(data) {
        $scope.campaigns = data;
    };
    campaignService.campaigns(campaignSuccessCallback, errorCallback);

    // == Campaigns
    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, function(data) {
            campaignService.campaigns(campaignSuccessCallback, errorCallback);
        }, errorCallback);
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
