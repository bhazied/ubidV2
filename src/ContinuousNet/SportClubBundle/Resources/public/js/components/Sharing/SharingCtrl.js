'use strict';

/**
 * Controller for Sharing Details
 */

app.controller('SharingCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$sharingsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $sharingsDataFactory) {

    $scope.modes = [{
        id: 'Percentage',
        title: $filter('translate')('content.list.fields.modes.PERCENTAGE'),
        css: 'primary'
    }, {
        id: 'Amount',
        title: $filter('translate')('content.list.fields.modes.AMOUNT'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.offer.sharings');
    };

    $scope.add = function() {
        $state.go('app.offer.sharingsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.sharingsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $sharingsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.sharing = data;
        });
    }

}]);

