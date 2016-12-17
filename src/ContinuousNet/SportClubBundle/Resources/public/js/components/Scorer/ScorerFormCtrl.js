'use strict';

/**
 * Controller for Scorer Form
 */

app.controller('ScorerFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$teamsDataFactory', '$playersDataFactory', '$sportEventsDataFactory', '$usersDataFactory', '$scorersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $teamsDataFactory, $playersDataFactory, $sportEventsDataFactory, $usersDataFactory, $scorersDataFactory) {

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


    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $timeout(function(){
            $scope.teamsLoaded = true;
            if ($scope.teams.length == 0) {
                $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAM')});
                var def = $q.defer();
                $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.teams = data.results;
                    def.resolve($scope.teams);
                });
                return def;
            } else {
                return $scope.teams;
            }
        });
    };

    $scope.getTeams();

    $scope.players = [];
    $scope.playersLoaded = false;

    $scope.getPlayers = function() {
        $timeout(function(){
            $scope.playersLoaded = true;
            if ($scope.players.length == 0) {
                $scope.players.push({id: '', title: $filter('translate')('content.form.messages.SELECTPLAYER')});
                var def = $q.defer();
                $playersDataFactory.query({offset: 0, limit: 10000, 'order_by[player.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.players = data.results;
                    def.resolve($scope.players);
                });
                return def;
            } else {
                return $scope.players;
            }
        });
    };

    $scope.getPlayers();

    $scope.sportEvents = [];
    $scope.sportEventsLoaded = false;

    $scope.getSportEvents = function() {
        $timeout(function(){
            $scope.sportEventsLoaded = true;
            if ($scope.sportEvents.length == 0) {
                $scope.sportEvents.push({id: '', title: $filter('translate')('content.form.messages.SELECTSPORTEVENT')});
                var def = $q.defer();
                $sportEventsDataFactory.query({offset: 0, limit: 10000, 'order_by[sportEvent.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sportEvents = data.results;
                    def.resolve($scope.sportEvents);
                });
                return def;
            } else {
                return $scope.sportEvents;
            }
        });
    };

    $scope.getSportEvents();

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
            if ($scope.scorer.id > 0) {
                $scope.disableSubmit = true;
                $scorersDataFactory.update($scope.scorer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SCORERUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SCORERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $scorersDataFactory.create($scope.scorer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SCORERCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SCORERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.scorers');
    };
    
    $scope.scorer_team_readonly = false;
    $scope.scorer_player_readonly = false;
    $scope.scorer_sport_event_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $scorersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.scorer = savable(data);
            });
        });
    } else {
        $scope.scorer = {id: 0};

        if (angular.isDefined($stateParams.scorer_team) && JSON.parse($stateParams.scorer_team) != null) {
            $scope.scorer.team = $stateParams.scorer_team;
            $scope.scorer_team_readonly = true;
        }
        if (angular.isDefined($stateParams.scorer_player) && JSON.parse($stateParams.scorer_player) != null) {
            $scope.scorer.player = $stateParams.scorer_player;
            $scope.scorer_player_readonly = true;
        }
        if (angular.isDefined($stateParams.scorer_sport_event) && JSON.parse($stateParams.scorer_sport_event) != null) {
            $scope.scorer.sport_event = $stateParams.scorer_sport_event;
            $scope.scorer_sport_event_readonly = true;
        }
    }

}]);

