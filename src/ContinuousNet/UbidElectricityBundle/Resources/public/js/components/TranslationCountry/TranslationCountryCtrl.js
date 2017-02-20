'use strict';

/**
 * Controller for Translation Country Details
 */

app.controller('TranslationCountryCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationCountriesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationCountriesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationcountries');
    };

    $scope.add = function() {
        $state.go('app.translation.translationcountriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationcountriesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationCountriesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationCountry = data;
        });
    }

}]);

