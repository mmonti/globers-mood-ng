'use strict';

angular.module('globersMoodApp').controller('dashboardController', function ($scope, $timeout, $q, campaignService, preferenceService) {
    // = Generic callback error logger.
    var errorCallback = function(data, status, headers, config) {
        console.error("Error calling Service=["+config.url+"] | Method=["+config.method+"] | Status=["+status+"]");
    }

    var pageRequest = {
        page: 0,
        size: 5,
        direction: "asc",
        property: "created"
    };

    var key = function(settingKey) {
        var deferred = $q.defer();
        preferenceService.preference(settingKey, function(value){
            deferred.resolve(value);
        }, function(data, status, headers, config){
            errorCallback(data, status, headers, config);
            deferred.reject(data);
        });
        return deferred.promise;
    };

    var fetchCampaigns = function() {
        campaignService.campaigns(pageRequest, campaignSuccessCallback, errorCallback);
    }

    key('dashboard.campaign.items.size').then(function(settingValue){
        angular.extend(pageRequest, {size: settingValue});
        // = Fetch the first page of results.
        fetchCampaigns();
    });

    // = Campaigns
    var campaignSuccessCallback = function(data, status, headers, config) {
        console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
        $scope.campaigns = data.content;
    };

    $scope.onCampaignStart = function(campaignId) {
        campaignService.start(campaignId, function(data, status, headers, config) {
            console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
        }, errorCallback);
    };

    $scope.onCampaignStopClose = function(campaignId) {
        campaignService.close(campaignId, function(data, status, headers, config) {
            console.log("Response from=["+config.url+"] - Method=["+config.method+"] - Status=["+status+"]");
            fetchCampaigns();
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
