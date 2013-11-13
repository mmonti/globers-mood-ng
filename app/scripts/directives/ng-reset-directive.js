'use strict';

angular.module('globersMoodApp').directive('resetAddon', function ($interpolate) {
    var addOnSpanTemplate = "<span class=\"input-group-addon hand ng-reset {{classes}}\"><i class=\"{{icon}}\"></i></span>";
    var addOnButtonTemplate = "<span class=\"input-group-btn\"><button class=\"btn btn-default add-on ng-reset {{classes}}\" type=\"button\"><i class=\"{{icon}}\"></i></button></span>";
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var context = {
                side: 'left',
                icon: 'fa fa-times',
                classes: "",
                model: null,
                type: 'span'
            };

            if (!angular.isUndefined(attrs.resetAddon)) {
                context = angular.extend(context, scope.$eval(attrs.resetAddon));
            }

            var template = $interpolate((context.type === 'span') ? addOnSpanTemplate : addOnButtonTemplate);
            var addon = angular.element(template(context));

            // == Options.
            if (context.side === 'left' ) {
                addon.insertBefore(element);
            } else {
                addon.insertAfter(element);
            }

            // == Bindings.
            addon.on('click', function() {
                scope.$apply(function () {
                    var inputScope = element.scope();
                    if (context.model != null) {
                        inputScope[context.model] = null;
                    }
                    inputScope[attrs.ngModel] = null;
                });
            });

        }
    };
});
