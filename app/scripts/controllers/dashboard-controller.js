'use strict';

angular.module('globersMoodApp').controller('dashboardController', function ($scope, $timeout, campaignService) {

    // = Generic callback error logger.
    var errorCallback = function(data, status, headers, config) {
        console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
    }

    // == Campaigns
    var campaignSuccessCallback = function(data, status, headers, config) {
        console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");

        $scope.campaigns = data;
    };
    campaignService.campaigns(campaignSuccessCallback, errorCallback);

    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, function(data, status, headers, config) {
            console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");

            campaignService.campaigns(campaignSuccessCallback, errorCallback);
        }, errorCallback);
    };

    setInterval(function(){
        campaignService.campaigns(campaignSuccessCallback, errorCallback);
    }, 10000);

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
