'use strict';

/**
 * Controller for Match Substitution Details
 */

app.controller('MatchSubstitutionCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$matchSubstitutionsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $matchSubstitutionsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.matchday.matchsubstitutions');
    };

    $scope.add = function() {
        $state.go('app.matchday.matchsubstitutionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchsubstitutionsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $matchSubstitutionsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.matchSubstitution = data;
        });
    }

}]);

