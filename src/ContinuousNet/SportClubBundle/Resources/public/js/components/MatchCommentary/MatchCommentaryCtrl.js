'use strict';

/**
 * Controller for Match Commentary Details
 */

app.controller('MatchCommentaryCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$matchCommentariesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $matchCommentariesDataFactory) {

    $scope.icons = [{
        id: 'Goal',
        title: $filter('translate')('content.list.fields.icons.GOAL'),
        css: 'primary'
    }, {
        id: 'Caution',
        title: $filter('translate')('content.list.fields.icons.CAUTION'),
        css: 'success'
    }, {
        id: 'Expulsion',
        title: $filter('translate')('content.list.fields.icons.EXPULSION'),
        css: 'warning'
    }, {
        id: 'SecondCaution',
        title: $filter('translate')('content.list.fields.icons.SECONDCAUTION'),
        css: 'danger'
    }, {
        id: 'OwnGoal',
        title: $filter('translate')('content.list.fields.icons.OWNGOAL'),
        css: 'default'
    }, {
        id: 'DisallowedGoal',
        title: $filter('translate')('content.list.fields.icons.DISALLOWEDGOAL'),
        css: 'info'
    }, {
        id: 'Penalty',
        title: $filter('translate')('content.list.fields.icons.PENALTY'),
        css: 'primary'
    }, {
        id: 'MissedPenalty',
        title: $filter('translate')('content.list.fields.icons.MISSEDPENALTY'),
        css: 'success'
    }, {
        id: 'Offside',
        title: $filter('translate')('content.list.fields.icons.OFFSIDE'),
        css: 'warning'
    }, {
        id: 'ThrowIn',
        title: $filter('translate')('content.list.fields.icons.THROWIN'),
        css: 'danger'
    }, {
        id: 'Foul',
        title: $filter('translate')('content.list.fields.icons.FOUL'),
        css: 'default'
    }, {
        id: 'FreeKick',
        title: $filter('translate')('content.list.fields.icons.FREEKICK'),
        css: 'info'
    }, {
        id: 'CornerKick',
        title: $filter('translate')('content.list.fields.icons.CORNERKICK'),
        css: 'primary'
    }, {
        id: 'Injury',
        title: $filter('translate')('content.list.fields.icons.INJURY'),
        css: 'success'
    }, {
        id: 'Winner',
        title: $filter('translate')('content.list.fields.icons.WINNER'),
        css: 'warning'
    }, {
        id: 'Assist',
        title: $filter('translate')('content.list.fields.icons.ASSIST'),
        css: 'danger'
    }, {
        id: 'Blocknote',
        title: $filter('translate')('content.list.fields.icons.BLOCKNOTE'),
        css: 'default'
    }, {
        id: 'Whistle',
        title: $filter('translate')('content.list.fields.icons.WHISTLE'),
        css: 'info'
    }, {
        id: 'Substitution',
        title: $filter('translate')('content.list.fields.icons.SUBSTITUTION'),
        css: 'primary'
    }, {
        id: 'Miss',
        title: $filter('translate')('content.list.fields.icons.MISS'),
        css: 'success'
    }, {
        id: 'Save',
        title: $filter('translate')('content.list.fields.icons.SAVE'),
        css: 'warning'
    }, {
        id: 'HandTouch',
        title: $filter('translate')('content.list.fields.icons.HANDTOUCH'),
        css: 'danger'
    }, {
        id: 'PlayerIn',
        title: $filter('translate')('content.list.fields.icons.PLAYERIN'),
        css: 'default'
    }, {
        id: 'PlayerOut',
        title: $filter('translate')('content.list.fields.icons.PLAYEROUT'),
        css: 'info'
    }, {
        id: 'StartFirstHalf',
        title: $filter('translate')('content.list.fields.icons.STARTFIRSTHALF'),
        css: 'primary'
    }, {
        id: 'EndFirstHalf',
        title: $filter('translate')('content.list.fields.icons.ENDFIRSTHALF'),
        css: 'success'
    }, {
        id: 'StartSecondHalf',
        title: $filter('translate')('content.list.fields.icons.STARTSECONDHALF'),
        css: 'warning'
    }, {
        id: 'EndSecondHalf',
        title: $filter('translate')('content.list.fields.icons.ENDSECONDHALF'),
        css: 'danger'
    }, {
        id: 'ExtraTime',
        title: $filter('translate')('content.list.fields.icons.EXTRATIME'),
        css: 'default'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.matchday.matchcommentaries');
    };

    $scope.add = function() {
        $state.go('app.matchday.matchcommentariesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchcommentariesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $matchCommentariesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.matchCommentary = data;
        });
    }

}]);

