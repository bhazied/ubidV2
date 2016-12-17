'use strict';

/**
 * Controller for Match Card Details
 */

app.controller('MatchCardCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$matchCardsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $matchCardsDataFactory) {

    $scope.cards = [{
        id: 'YellowCard',
        title: $filter('translate')('content.list.fields.cards.YELLOWCARD'),
        css: 'primary'
    }, {
        id: 'SecondYellowCard',
        title: $filter('translate')('content.list.fields.cards.SECONDYELLOWCARD'),
        css: 'success'
    }, {
        id: 'RedCard',
        title: $filter('translate')('content.list.fields.cards.REDCARD'),
        css: 'warning'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.matchday.matchcards');
    };

    $scope.add = function() {
        $state.go('app.matchday.matchcardsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchcardsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $matchCardsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.matchCard = data;
        });
    }

}]);

