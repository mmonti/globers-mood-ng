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

    $scope.noOfPages = 7;
    $scope.currentPage = 4;
    $scope.maxSize = 5;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.bigNoOfPages = 18;
    $scope.bigCurrentPage = 1;

    // = Charts
    $scope.addPoints = function () {
        var seriesArray = $scope.chart.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chart.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chart.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.options = {
        type: 'line'
    }

    $scope.swapChartType = function () {
        if (this.chart.options.chart.type === 'line') {
            this.chart.options.chart.type = 'bar'
        } else {
            this.chart.options.chart.type = 'line'
        }
    }

    $scope.getData = function() {
        var x = (new Date()).getTime();
        var y = Math.random();

        return [x, y];
    }

    $scope.chart = {
        options: {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // = Don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // = Set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () { series.addPoint($scope.getData(), true, true); }, 10000);
                    }
                },
                renderTo : 'chartContainer'
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                })()
            }]
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: null
        },
        loading: false
    }
  });
