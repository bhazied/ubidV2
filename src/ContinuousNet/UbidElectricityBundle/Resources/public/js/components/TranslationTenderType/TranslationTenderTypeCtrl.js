'use strict';

/**
 * Controller for Translation Tender Type Details
 */

app.controller('TranslationTenderTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationTenderTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationTenderTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationtendertypes');
    };

    $scope.add = function() {
        $state.go('app.translation.translationtendertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationtendertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationTenderTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationTenderType = data;
        });
    }

}]);

