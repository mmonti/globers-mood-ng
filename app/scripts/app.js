'use strict';

var application = angular.module('globersMoodApp', ['ngSanitize', 'ui.compat', 'ui.mask', 'ui.select2', 'ui.bootstrap', 'highcharts-ng']).

    config(function($stateProvider, $urlRouterProvider, $httpProvider){

        // = HTTP Interceptor.
//        $httpProvider.interceptors.push("httpInterceptor");

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
                url: "/campaign",
                templateUrl: "/views/campaign-view.html",
                controller: "campaignController"
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

//    run(['$rootScope', function($rootScope) {
    run(function($templateCache, $rootScope) {
        // = angular-ui bootstrap - template fix (replace the cached template).
        $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html", "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\" ng-bind-html=\"content\"></div></div>");
        $templateCache.put("template/typeahead/typeahead-match.html", "<a tabindex=\"-1\" ng-bind-html=\"match.label | typeaheadHighlight:query\"></a>");
        $templateCache.put("template/typeahead/typeahead.html", "<ul class=\"typeahead dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\"><li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\"><a tabindex=\"-1\" ng-click=\"selectMatch($index)\" ng-bind-html=\"match.label | typeaheadHighlight:query\"></a></li></ul>");

        $rootScope.app = {
            title : "Glober's Mood",
            author: "mauro monti",
            mail: "mauro.monti@globant.com",
            logo: "http://www.globant.com/sites/all/themes/globantv2/images/logo_globant.png",
            version: "0.0.1"
        }
        $rootScope.entities = [{
            name: "Template",
            count: 2
        },{
            name: "Campaign",
            count: 3
        },{
            name: "User",
            count: 405
        },{
            name: "Project",
            count: 21
        },{
            name: "Customers",
            count: 2
        }];
    }
);