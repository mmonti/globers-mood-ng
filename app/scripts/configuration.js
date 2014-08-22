'use strict';

angular.module('globersMoodApp').factory('configuration',
    [
        function () {

    var configuration = {

        // = Current Environment.
        environment: "prod",

        // = Environment configuration.
        dev : {
            base: "http://127.0.0.1:8080/rest/api"
        },
        prod : {
            base: "http://globers-mood-rest-prod.appspot.com/rest/api"
        },

        services : {
            ping : false
        },

        // = Services Path Configuration
        endpoints : {

            "ping" : "/v1/ping",

            "user.get" : "/v1/user/{userId}",
            "user.list" : "/v1/user",
            "user.assigned" : "/v1/user/assigned",
            "user.unassigned" : "/v1/user/unassigned",

            "customer.get" : "/v1/customer/{customerId}",
            "customer.list" : "/v1/customer",
            "customer.store" : "/v1/customer",

            "project.get" : "/v1/project/{projectId}",
            "project.list" : "/v1/project",
            "project.store" : "/v1/project",
            "project.assign.user" : "/v1/project/{projectId}/assign/{userId}",
            "project.release.user" : "/v1/project/{projectId}/release/{userId}",

            "campaign.get" : "/v1/campaign/{campaignId}",
            "campaign.list" : "/v1/campaign",
            "campaign.start" : "/v1/campaign/{campaignId}/start",
            "campaign.close" : "/v1/campaign/{campaignId}/close",
            "campaign.store" : "/v1/campaign",

            "feedback.user" : "/v1/feedback/user/{userId}",
            "feedback.list" : "/v1/feedback/campaign/{campaignId}",
            "feedback.store" : "/v1/feedback/campaign/submit",

            "preference.namespace" : "/v1/preference/namespace/{ns}",
            "preference.get" : "/v1/preference/{key}",
            "preference.list" : "/v1/preference",
            "preference.update" : "/v1/preference/{key}/update/{value}",

            "template.get" : "/v1/template/{templateId}",
            "template.delete" : "/v1/template/{templateId}",
            "template.list" : "/v1/template",
            "template.store" : "/v1/template",
            "template.set.metadata" : "/v1/template/{templateId}/metadata",
            "template.analyze" : "/v1/template/{templateId}/analyze",

            "stats.datastore.entity" : "/v1/stats/datastore/entity",
            "stats.weekly" : "/v1/stats/feedback/weekly",
            "stats.campaign" : "/v1/stats/campaign/{campaignId}",

            "setup.store.body" : "/v1/setup",
            "setup.store.file" : "/v1/setup/file-import"
        }

        // = DashBoard

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
        getEnvironment : function() {
            return configuration.environment;
        },
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
}]);