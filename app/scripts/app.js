'use strict';

var application = angular.module('globersMoodApp', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'timer', 'smart-table', 'highcharts-ng', 'angularFileUpload']).

    config(function($stateProvider, $urlRouterProvider){
        // = For any unmatched url, send to /main
        $urlRouterProvider.otherwise("/")

        // = Now set up the states
        $stateProvider
            .state('main', {
                url: "/",
                templateUrl: "/views/main-view.html",
                controller: 'mainController'
            })
            .state('campaigns-create', {
                url: "/campaigns/create",
                templateUrl: "/views/campaign-create/campaign-create-view.html",
                controller: "campaignCreateController"
            })
            .state('campaigns-all', {
                url: "/campaigns",
                templateUrl: "/views/campaign-all-view.html",
                controller: "campaignAllController"
            })
            .state('campaign-view', {
                url: "/campaigns/:id",
                templateUrl: "/views/campaign-view/campaign-view.html",
                controller: "campaignViewController"
            })
            .state('setup-view', {
                url: "/settings/setup",
                templateUrl: "/views/settings/setup-view.html",
                controller: "setupController"
            })
            .state('initial-setup-view', {
                url: "/settings/initial-setup",
                templateUrl: "/views/settings/initial-setup-view.html",
                controller: "initialSetupController"
            })
            .state('preferences-view', {
                url: "/settings/preferences",
                templateUrl: "/views/settings/preferences-view.html",
                controller: "preferenceController"
            });
    }).

    config(function($httpProvider) {
        var $http, interceptor = ['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
            var error;
            function success(response) {
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    $rootScope.$broadcast("loading-success");
                }
                return response;
            }
            function error(response) {
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    $rootScope.$broadcast("loading-error");
                }
                return $q.reject(response);
            }
            return function (promise) {
                $rootScope.$broadcast("loading-waiting");
                return promise.then(success, error);
            }
        }];
        $httpProvider.responseInterceptors.push(interceptor);
    }).

    run(function($templateCache) {
    }).

    run(function($rootScope, $location, preferenceService){
        preferenceService.$ns("application").then(function(settings) {
            if (!settings.application) {
                return $location.path("/settings/initial-setup");
            }
            preferenceService.initializeApplicationPreferences(settings.application);
            $rootScope.application = settings.application;
        });
    }
);