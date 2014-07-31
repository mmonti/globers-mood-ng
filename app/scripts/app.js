'use strict';

var application = angular.module('globersMoodApp', ['ngSanitize', 'ui.compat', 'ui.mask', 'ui.bootstrap', 'highcharts-ng', 'angularFileUpload']).

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
            .state('campaign', {
                url: "/campaign/create",
                templateUrl: "/views/campaign-create-view.html",
                controller: "campaignCreateController"
            })
            .state('campaign-show-all', {
                url: "/campaign/all",
                templateUrl: "/views/campaign-all-view.html",
                controller: "campaignAllController"
            })
            .state('setup', {
                url: "/settings/setup",
                templateUrl: "/views/setup-view.html",
                controller: "setupController"
            })
            .state('preferences', {
                url: "/settings/preferences",
                templateUrl: "/views/preferences-view.html",
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

    run(function($templateCache, $rootScope) {
        // = angular-ui bootstrap - template fix (replace the cached template).
        $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html", "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\" ng-bind-html=\"content\"></div></div>");
        // = type-ahead
        $templateCache.put("template/typeahead/typeahead-match.html", "<a tabindex=\"-1\" ng-bind-html=\"match.label | typeaheadHighlight:query\"></a>");
        $templateCache.put("template/typeahead/typeahead.html", "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\"><li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\"><a tabindex=\"-1\" ng-click=\"selectMatch($index)\" ng-bind-html=\"match.label | typeaheadHighlight:query\"></a></li></ul>");
        // = modal
        $templateCache.put("template/modal/backdrop.html", "<div class=\"modal-backdrop fade {{modal.backdropClass}}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
        $templateCache.put("template/modal/window.html", "<div class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\"><div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude></div></div></div>");
        $templateCache.put("template/pagination/pagination.html", "<ul class=\"pagination\"><li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li></ul>");
    }).

    run(function($rootScope, preferenceService){
        preferenceService.$ns("application").then(function(settings) {
            $rootScope.application = settings.application;
        });
    }
);