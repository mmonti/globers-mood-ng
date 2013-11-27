'use strict';

angular.module('globersMoodApp').controller('mainController', function ($scope) {

    var headerTemplate = "/views/header-view.html";
    var footerTemplate = "/views/footer-view.html";

    $scope.getHeaderTemplate = function() {
        return headerTemplate;
    };
    $scope.getFooterTemplate = function() {
        return footerTemplate;
    };

});
