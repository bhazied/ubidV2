'use strict';

/**
 * Controller for Player Stat Form
 */

app.controller('PlayerStatFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$playersDataFactory', '$seasonsDataFactory', '$usersDataFactory', '$playerStatsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $playersDataFactory, $seasonsDataFactory, $usersDataFactory, $playerStatsDataFactory) {

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

    $scope.seasons = [];
    $scope.seasonsLoaded = false;

    $scope.getSeasons = function() {
        $timeout(function(){
            $scope.seasonsLoaded = true;
            if ($scope.seasons.length == 0) {
                $scope.seasons.push({id: '', title: $filter('translate')('content.form.messages.SELECTSEASON')});
                var def = $q.defer();
                $seasonsDataFactory.query({offset: 0, limit: 10000, 'order_by[season.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.seasons = data.results;
                    def.resolve($scope.seasons);
                });
                return def;
            } else {
                return $scope.seasons;
            }
        });
    };

    $scope.getSeasons();

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
            if ($scope.playerStat.id > 0) {
                $scope.disableSubmit = true;
                $playerStatsDataFactory.update($scope.playerStat).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PLAYERSTATUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PLAYERSTATNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $playerStatsDataFactory.create($scope.playerStat).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PLAYERSTATCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PLAYERSTATNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.playerstats');
    };
    
    $scope.player_stat_player_readonly = false;
    $scope.player_stat_season_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $playerStatsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.playerStat = savable(data);
            });
        });
    } else {
        $scope.playerStat = {id: 0};

        if (angular.isDefined($stateParams.player_stat_player) && JSON.parse($stateParams.player_stat_player) != null) {
            $scope.playerStat.player = $stateParams.player_stat_player;
            $scope.player_stat_player_readonly = true;
        }
        if (angular.isDefined($stateParams.player_stat_season) && JSON.parse($stateParams.player_stat_season) != null) {
            $scope.playerStat.season = $stateParams.player_stat_season;
            $scope.player_stat_season_readonly = true;
        }
    }

}]);

