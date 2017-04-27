'use strict';

/**
 * Controller for Translation Pathology Details
 */

app.controller('TranslationPathologyCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationPathologiesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationPathologiesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationpathologies');
    };

    $scope.add = function() {
        $state.go('app.translation.translationpathologiesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationpathologiesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationPathologiesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationPathology = data;
        });
    }

}]);

