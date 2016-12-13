'use strict';

/**
 * Controller for Translation Sector Details
 */

app.controller('TranslationSectorCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationSectorsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationSectorsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationsectors');
    };

    $scope.add = function() {
        $state.go('app.translation.translationsectorsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationsectorsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationSectorsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationSector = data;
        });
    }

}]);

