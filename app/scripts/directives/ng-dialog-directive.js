'use strict';

angular.module('globersMoodApp').directive('dialog',
    ['$modal', '$templateCache',
        function($modal, $templateCache) {

    var defaultTemplate =
        "<div class=\"modal-header\">\n" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" ng-click=\"close()\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n" +
            "<h4 class=\"modal-title\">{{dialog.header}}</h4>\n" +
        "</div>\n" +
        "<div class=\"modal-body\">\n" +
            "<p>{{dialog.body}}</p>\n" +
        "</div>\n" +
        "<div class=\"modal-footer\">\n" +
            "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"close()\">CLOSE</button>\n" +
            "<button type=\"button\" class=\"btn btn-primary\" ng-show=\"dialog.type === 'proceed'\" ng-click=\"proceed()\">PROCEED</button>\n" +
        "</div>";

    $templateCache.put('/tpl/dialog-modal.html', defaultTemplate);

    return {
        restrict: 'E',
        scope: {
            class: "@",
            size: "@",
            header: "&",
            body: "&",
            template: "@",
            type: "@",
            ngModel: "=",
            params: "&"
        },
        link: function(scope, element, attrs, controller, transclude) {
            var defaultFn = {
                close: function(modal) {
                    modal.close();
                }
            };

            var properties = {
                type: scope.type || "default",
                size: scope.size || "sm",
                header: scope.header(scope) || "Are you sure?",
                body: scope.body(scope) || "Are you sure you want to proceed with this action?",
                templateUrl: scope.template || "",
                template: $templateCache.get("/tpl/dialog-modal.html"),
                fn: defaultFn
            };

            var template = {};
            if (properties.templateUrl) {
                template.templateUrl = properties.templateUrl;
            } else {
                template.template = properties.template;
            }

            var config = {
                controller: function($scope, $modalInstance, dialog, model, params, ref) {
                    var fnArgs = params() || [];
                    fnArgs.unshift($modalInstance);
                    angular.extend($scope, { params : fnArgs });
                    angular.extend($scope, { ref : ref});
                    
                    var getFn = function(scope, fn, args) {
                        return function() { fn.apply(scope, args) };
                    };

                    // = bind functions.
                    for (var attribute in model) {
                        if (angular.isFunction(model[attribute])) {
                            $scope[attribute] = getFn($scope, model[attribute], fnArgs);
                        } else {
                            $scope[attribute] = model[attribute];
                        }
                    }

                    angular.extend($scope, dialog);
                },
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                windowClass: scope.class,
                size: properties.size,
                resolve: {
                    dialog: function() {
                        return {
                            dialog : {
                                type: properties.type,
                                size: properties.size,
                                header: properties.header,
                                body: properties.body
                            }
                        };
                    },
                    model: function () {
                        return angular.extend(properties.fn, scope.ngModel);
                    },
                    params: function() {
                        return scope.params;
                    },
                    ref: function() {
                        return scope.$parent;
                    }
                }
            };

            scope.open = function () {
                $modal.open(angular.extend(config, template));
            };

            element.parent().bind("click", function(event) {
                scope.open()
            });
        }
    };
}]);
