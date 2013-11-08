'use strict';

angular.module('globersMoodApp').controller('dashboardController', function ($scope, campaignService) {

    // = Generic callback error logger.
    var errorCallback = function(data, status, headers, config) {
        console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
    }

    // = Sets the campaigns data.
    var campaignSuccessCallback = function(data) {
        $scope.campaigns = data;
    }

    // = Dashboard
    campaignService.campaigns(campaignSuccessCallback, errorCallback);

    // == Campaigns
    var campaignStartSuccessCallback = function(data) {
        console.log("campaign started");
    }
    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, campaignStartSuccessCallback, errorCallback);
    };

    $scope.noOfPages = 7;
    $scope.currentPage = 4;
    $scope.maxSize = 5;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.bigNoOfPages = 18;
    $scope.bigCurrentPage = 1;

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
