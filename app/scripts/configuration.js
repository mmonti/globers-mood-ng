'use strict';

angular.module('globersMoodApp').factory('configuration', function () {
    var configuration = {

        // = Current Environment.
        environment: "dev",

        // = Environment configuration.
        dev : {
            base: "http://localhost:8080/rest/api"
        },
        prod : {
            base: "http://globers-mood-rest.appspot.com/rest/api"
        },

        // = Services Path Configuration
        services : {
            "ping" : "/v1/ping",

            "user.get" : "/v1/user/{id}",
            "user.list" : "/v1/user",

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
        getServiceEndpoint : function(serviceName, context) {
            for (var service in configuration.services) {
                if (configuration.services.hasOwnProperty(serviceName)) {
                    if (service === serviceName) {
                        var endpoint = configuration[configuration.environment].base + configuration.services[serviceName];
                        if (context) {
                            return expander(endpoint, context);
                        }
                        return endpoint;
                    }
                }
            }
        }
    };
});