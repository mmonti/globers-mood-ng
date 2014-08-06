'use strict';

angular.module('globersMoodApp').directive('ngSpinner', [ function() {

    return {
        template: '<span class=\"ng-spinner\"><i class=\"fa fa-refresh fa-spin\"></i><span ng-transclude>&nbsp;&nbsp;loading...</span></span>',
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function postLink(scope, element, attrs) {
            var context = {
                    displayType: 'visibility',              // == Valid values: 'visibility' or 'display'.
                    hide: false,
                    onErrorClass: null,                     // == Any string.
                    onSuccessClass: null,                   // == Any string.
                    onWaitingClass: null,
                    animate: true
            };

            if (!angular.isUndefined(attrs.options)) {
                context = angular.extend(context, scope.$eval(attrs.options));
            }

            var displayCallback = function(context, event) {
                var icon = element.find('i');
                switch (event.name) {
                    case "loading-success":
                        if (context.onSuccessClass != null) { icon.addClass(context.onSuccessClass); };
                        if (context.onWaitingClass != null) { icon.removeClass(context.onWaitingClass); };
                        if (context.onErrorClass != null) { icon.removeClass(context.onErrorClass); };
                        icon.removeClass('fa-spin')
                        break;

                    case "loading-error":
                        if (context.onSuccessClass != null) { icon.removeClass(context.onSuccessClass); };
                        if (context.onWaitingClass != null) { icon.removeClass(context.onWaitingClass); };
                        if (context.onErrorClass != null) { icon.addClass(context.onErrorClass); };
                        if (context.hide) {
                            if (context.displayType === 'display') { element.hide() } else { element.css('visibility', 'hidden'); };
                        }
                        icon.removeClass('fa-spin')
                        break;

                    case "loading-waiting":
                        if (context.onSuccessClass != null) { icon.removeClass(context.onSuccessClass); };
                        if (context.onWaitingClass != null) { icon.addClass(context.onWaitingClass); };
                        if (context.onErrorClass != null) { icon.removeClass(context.onErrorClass); };

                        if (context.animate) { icon.addClass('fa-spin'); };
                        if (context.hide) {
                            if (context.displayType === 'display') { element.show() } else { element.css('visibility', 'visible'); };
                        }

                        break;
                    default:
                        console.debug("unrecognized event=["+event.name+"]");
                };
            };

            scope.$on("loading-success", function(event, args) {
                console.info("loading: success");
                setTimeout(function() {
                    displayCallback(context, event);
                }, 1000);
            });

            scope.$on("loading-error", function(event, args) {
                console.error("loading: error");
                setTimeout(function() {
                    displayCallback(context, event);
                }, 1000);
            });

            scope.$on("loading-waiting", function(event, args) {
                console.info("loading: waiting");
                displayCallback(context, event);
            });
        }
    };
}]);
