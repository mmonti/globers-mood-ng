'use strict';

angular.module('globersMoodApp').factory('configuration', function () {
    var configuration = {

        // = Current Environment.
        environment: "dev",

        // = Environment configuration.
        dev : {
            base: "http://127.0.0.1:8080/rest/api"
        },
        prod : {
            base: "http://globers-mood-rest.appspot.com/rest/api"
        },

        services : {
            ping : true
        },

        // = Services Path Configuration
        endpoints : {

            "ping" : "/v1/ping",

            "user.get" : "/v1/user/{id}",
            "user.list" : "/v1/user",
            "user.assigned" : "/v1/user/assigned",
            "user.unassigned" : "/v1/user/unassigned",

            "customer.get" : "/v1/customer/{id}",
            "customer.list" : "/v1/customer",
            "customer.store" : "/v1/customer",

            "project.get" : "/v1/project/{id}",
            "project.list" : "/v1/project",
            "project.store" : "/v1/project",
            "project.assign.user" : "/v1/project/{projectId}/assign/{userId}",
            "project.release.user" : "/v1/project/{projectId}/release/{userId}",

            "campaign.get" : "/v1/campaign/{id}",
            "campaign.list" : "/v1/campaign",
            "campaign.start" : "/v1/campaign/{id}/start",
            "campaign.store" : "/v1/campaign",

            "feedback.user" : "/v1/feedback/user/{id}",
            "feedback.list" : "/v1/feedback/campaign/{id}",
            "feedback.store" : "/v1/feedback/campaign/submit",

            "preference.get" : "/v1/preference/{key}",
            "preference.list" : "/v1/preference",
            "preference.update" : "/v1/preference/{key}/update/{value}",

            "template.get" : "/v1/template/{id}",
            "template.list" : "/v1/template",
            "template.store" : "/v1/template",

            "stats.list" : "/v1/stats",
            "stats.generate" : "/v1/stats",
            "stats.entry" : "/v1/stats/{entity}/{entry}",

            "setup.store.body" : "/v1/setup",
            "setup.store.file" : "/v1/setup/file-import"
        }
    };

    // = Internal API
    var expander = (function() {
        var replacer = function(context) {
            return function(s, name) {
                return context[name];
            };
        };
        return function(input, context) {
            return input.replace(/\{(\w+)\}/g, replacer(context));
        };
    })();

    // = Public API
    return {
        isServicesInSynchActive : function() {
            return configuration.services.ping;
        },
        getServiceEndpoint : function(serviceName, context) {
            for (var currentEndpoint in configuration.endpoints) {
                if (configuration.endpoints.hasOwnProperty(serviceName)) {
                    if (currentEndpoint === serviceName) {
                        var solvedEndpoint = configuration[configuration.environment].base + configuration.endpoints[serviceName];
                        if (context) {
                            return expander(solvedEndpoint, context);
                        }
                        return solvedEndpoint;
                    }
                }
            }
        }
    };
});