'use strict';

angular.module('globersMoodApp').controller('setupController', ['$scope', '$http', '$location', 'configuration', '$upload', 'statsService', 'preferenceService', function ($scope, $http, $location, configuration, $upload, statsService, preferenceService) {

    $scope.preferences = preferenceService.getApplicationPreferences();

    $scope.file = null;
    $scope.onFileSelect = function($files) {
        $scope.file = $files[0];
    };

    $scope.submit = function() {
        $scope.upload = $upload.upload({
            url: configuration.getServiceEndpoint('setup.store.file'),
            method: 'POST',
            // = headers: {'header-key': 'header-value'},
            // = withCredentials: true,
            data: { myObj: { name: "1"} },
            file: $scope.file // or list of files ($files) for html5 only
            // = fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
            // = customize file formData name ('Content-Desposition'), server side file variable name.
            // = fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
            // = customize how data is added to formData. See #40#issuecomment-28612000 for sample code
            // = formDataAppender: function(formData, key, val){}

        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

        }).success(function(data, status, headers, config) {
            $scope.clear();
            preferenceService.$ns("application").then(function(settings) {
                preferenceService.initializeApplicationPreferences(settings.application);
                $location.path("/");
            });
        });

        //.error(...)
        //.then(success, error, progress);
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    };

    // = Clears the selected file.
    $scope.clear = function() {
        $scope.file = null;
    };

    $scope.entities = [];
    statsService.metadata(function(data, status, headers, config) {
        $scope.entities = data;
    });

    // = Wipe Data
    $scope.inputCode = null;
    $scope.generateSecurityCode = function() {
        $scope.securityCode = Math.random().toString(36).substr(2, 5).toUpperCase()
    }();
    $scope.checkCode = function() {
        if (_.isNull($scope.inputCode)) {
            return false;
        }
        return $scope.inputCode.toUpperCase() === $scope.securityCode;
    }

    $scope.handleProceed = function($scope, value) {
        console.log("handler!")
        $scope.close();
    };
}]);
