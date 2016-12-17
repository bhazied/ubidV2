'use strict';

/**
 * Controller for Match Commentary Form
 */

app.controller('MatchCommentaryFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$matchesDataFactory', '$usersDataFactory', '$matchCommentariesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $matchesDataFactory, $usersDataFactory, $matchCommentariesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };

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

    $scope.matches = [];
    $scope.matchesLoaded = false;

    $scope.getMatches = function() {
        $timeout(function(){
            $scope.matchesLoaded = true;
            if ($scope.matches.length == 0) {
                $scope.matches.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCH')});
                var def = $q.defer();
                $matchesDataFactory.query({offset: 0, limit: 10000, 'order_by[match.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.matches = data.results;
                    def.resolve($scope.matches);
                });
                return def;
            } else {
                return $scope.matches;
            }
        });
    };

    $scope.getMatches();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.submitForm = function(form) {
        var firstError = null;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            return false;
        } else {
            if ($scope.matchCommentary.id > 0) {
                $scope.disableSubmit = true;
                $matchCommentariesDataFactory.update($scope.matchCommentary).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MATCHCOMMENTARYUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MATCHCOMMENTARYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $matchCommentariesDataFactory.create($scope.matchCommentary).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MATCHCOMMENTARYCREATED'));
                    $scope.matchCommentary.comment = '';
                    $scope.matchCommentary.comment_ar = '';
                    $scope.matchCommentary.comment_fr = '';
                    $scope.matchCommentary.minute = '';
                    $scope.matchCommentary.icon = '';
                    var http_params = {
                        offset: 0,
                        limit: 10000,
                        'order_by[matchCommentary.id]': 'desc',
                        'filters[matchCommentary.match]': $scope.matchCommentary.match,
                        'filters[matchCommentary.isPublished]': ($scope.matchCommentary.is_published)?1:0,
                        time: new Date().getTime()
                    };
                    $matchCommentariesDataFactory.query(http_params).$promise.then(function(data) {
                        $scope.matchCommentaries = data.results;
                    });
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MATCHCOMMENTARYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.matchday.matchcommentaries');
    };
    
    $scope.match_commentary_match_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $matchCommentariesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.matchCommentary = savable(data);
            });
        });
    } else {
        $scope.matchCommentary = {id: 0, icon: 'Goal'};

        if (angular.isDefined($stateParams.match_commentary_match) && JSON.parse($stateParams.match_commentary_match) != null) {
            $scope.matchCommentary.match = $stateParams.match_commentary_match;
            $scope.match_commentary_match_readonly = true;
        }
    }

}]);

