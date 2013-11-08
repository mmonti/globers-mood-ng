'use strict';

angular.module('globersMoodApp').directive('resetAddon', function ($interpolate) {
    var addOnTemplate = "<span class=\"input-group-addon hand {{classes}}\"><i class=\"{{icon}}\"></i></span>";
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var context = {
                side: 'left',
                icon: 'fa fa-times',
                classes: ""
            };

            if (!angular.isUndefined(attrs.resetAddon)) {
                context = angular.extend(context, scope.$eval(attrs.resetAddon));
            }

            var template = $interpolate(addOnTemplate);
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
                    inputScope[attrs.ngModel] = "";
                });
            });

        }
    };
});
