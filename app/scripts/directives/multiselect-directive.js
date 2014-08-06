'use strict';

angular.module('globersMoodApp').directive('multiSelect',
    ['$q',
        function ($q) {

    function appendSelected(entities) {
        var newEntities = [];
        angular.forEach(entities, function(entity) {
            var appended = entity;
            appended.selected = false;
            newEntities.push(appended);
        });
        return newEntities;
    }
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            selectedLabel: "@",
            availableLabel: "@",
            displayAttr: "@",
            available: "=",
            model: "=ngModel"
        },
        templateUrl: '/tpl/multi-select.html',
        link: function(scope, elm, attrs) {
            scope.selected = {
                available: [],
                current: []
            };

            // = Handles cases where scope data hasn't been initialized yet
            var dataLoading = function(scopeAttr) {
                var loading = $q.defer();
                if(scope[scopeAttr]) {
                    loading.resolve(scope[scopeAttr]);

                } else {
                    scope.$watch(scopeAttr, function(newValue, oldValue) {
                        if (newValue !== undefined) {
                            loading.resolve(newValue);
                        }
                    });
                }
                return loading.promise;
            };

            // = Filters out items in original that are also in toFilter. Compares by reference.
            var filterOut = function(original, toFilter) {
                var filtered = [];
                angular.forEach(original, function(entity) {
                    var match = false;
                    for(var i = 0; i < toFilter.length; i++) {
                        if(toFilter[i][attrs.displayAttr] == entity[attrs.displayAttr]) {
                            match = true;
                            break;
                        }
                    }
                    if(!match) {
                        filtered.push(entity);
                    }
                });
                return filtered;
            };

            scope.refreshAvailable = function() {
                scope.available = filterOut(scope.available, scope.model);
                scope.selected.available = appendSelected(scope.available);
                scope.selected.current = appendSelected(scope.model);
            };

            scope.add = function() {
                scope.model = scope.model.concat(scope.selected(scope.selected.available));
            };

            scope.remove = function() {
                var selected = scope.selected(scope.selected.current);
                scope.available = scope.available.concat(selected);
                scope.model = filterOut(scope.model, selected);
            };

            scope.selected = function(list) {
                var found = [];
                angular.forEach(list, function(item) { if(item.selected === true) found.push(item); });
                return found;
            };

            $q.all([dataLoading("model"), dataLoading("available")]).then(function(results) {
                scope.refreshAvailable();
                scope.$watch('model', scope.refreshAvailable);
            });
        }
    };
}]);