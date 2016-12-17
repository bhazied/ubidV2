'use strict';

/**
 * Controller for Match Goal Form
 */

app.controller('MatchGoalFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$matchesDataFactory', '$teamsDataFactory', '$playersDataFactory', '$usersDataFactory', '$matchGoalsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $matchesDataFactory, $teamsDataFactory, $playersDataFactory, $usersDataFactory, $matchGoalsDataFactory) {

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

    $scope.scoredWiths = [{
        id: 'LeftFoot',
        title: $filter('translate')('content.list.fields.scoredwiths.LEFTFOOT'),
        css: 'primary'
    }, {
        id: 'RightFoot',
        title: $filter('translate')('content.list.fields.scoredwiths.RIGHTFOOT'),
        css: 'success'
    }, {
        id: 'Head',
        title: $filter('translate')('content.list.fields.scoredwiths.HEAD'),
        css: 'warning'
    }];
    $scope.zones = [{
        id: 'TopLeft',
        title: $filter('translate')('content.list.fields.zones.TOPLEFT'),
        css: 'primary'
    }, {
        id: 'TopCenter',
        title: $filter('translate')('content.list.fields.zones.TOPCENTER'),
        css: 'success'
    }, {
        id: 'TopRight',
        title: $filter('translate')('content.list.fields.zones.TOPRIGHT'),
        css: 'warning'
    }, {
        id: 'BottomLeft',
        title: $filter('translate')('content.list.fields.zones.BOTTOMLEFT'),
        css: 'danger'
    }, {
        id: 'BottomCenter',
        title: $filter('translate')('content.list.fields.zones.BOTTOMCENTER'),
        css: 'default'
    }, {
        id: 'BottomRight',
        title: $filter('translate')('content.list.fields.zones.BOTTOMRIGHT'),
        css: 'info'
    }];
    $scope.stadiumZones = [{
        id: 'OutsideBox',
        title: $filter('translate')('content.list.fields.stadiumzones.OUTSIDEBOX'),
        css: 'primary'
    }, {
        id: 'InsideBox',
        title: $filter('translate')('content.list.fields.stadiumzones.INSIDEBOX'),
        css: 'success'
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

    $scope.changeMatch = function() {
        for (var i=0;i<$scope.teams.length;i++) {
            for (var j=0;j<$scope.matches.length;j++) {
                if ($scope.matches[j].id == $scope.matchGoal.match) {
                    if (($scope.matches[j].team_home != null && $scope.teams[i].id == $scope.matches[j].team_home.id) || ($scope.matches[j].team_away != null && $scope.teams[i].id == $scope.matches[j].team_away.id)) {
                        $scope.teams[i].hidden = false;
                    } else {
                        $scope.teams[i].hidden = true;
                    }
                }
            }
        }
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

    $scope.changeTeam = function() {
        for (var i=0;i<$scope.players.length;i++) {
            for (var j=0;j<$scope.teams.length;j++) {
                if ($scope.teams[j].id == $scope.matchGoal.team) {
                    if (($scope.players[i].team_club != null && $scope.players[i].team_club.id == $scope.teams[j].id) || ($scope.players[i].team_national != null && $scope.players[i].team_national.id == $scope.teams[j].id)) {
                        $scope.players[i].hidden = false;
                    } else {
                        $scope.players[i].hidden = true;
                    }
                }
            }
        }
    };
    
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
            if ($scope.matchGoal.id > 0) {
                $scope.disableSubmit = true;
                $matchGoalsDataFactory.update($scope.matchGoal).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MATCHGOALUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MATCHGOALNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $matchGoalsDataFactory.create($scope.matchGoal).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MATCHGOALCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MATCHGOALNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.matchday.matchgoals');
    };
    
    $scope.match_goal_match_readonly = false;
    $scope.match_goal_team_readonly = false;
    $scope.match_goal_player_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $matchGoalsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.matchGoal = savable(data);
            });
        });
    } else {
        $scope.matchGoal = {id: 0, scored_with: 'LeftFoot', zone: 'TopLeft', stadium_zone: 'OutsideBox'};

        if (angular.isDefined($stateParams.match_goal_match) && JSON.parse($stateParams.match_goal_match) != null) {
            $scope.matchGoal.match = $stateParams.match_goal_match;
            $scope.match_goal_match_readonly = true;
        }
        if (angular.isDefined($stateParams.match_goal_team) && JSON.parse($stateParams.match_goal_team) != null) {
            $scope.matchGoal.team = $stateParams.match_goal_team;
            $scope.match_goal_team_readonly = true;
        }
        if (angular.isDefined($stateParams.match_goal_player) && JSON.parse($stateParams.match_goal_player) != null) {
            $scope.matchGoal.player = $stateParams.match_goal_player;
            $scope.match_goal_player_readonly = true;
        }
    }

}]);

