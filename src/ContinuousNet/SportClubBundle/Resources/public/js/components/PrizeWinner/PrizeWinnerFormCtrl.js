'use strict';

/**
 * Controller for Prize Winner Form
 */

app.controller('PrizeWinnerFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$sportEventsDataFactory', '$teamsDataFactory', '$countriesDataFactory', '$usersDataFactory', '$prizeWinnersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $sportEventsDataFactory, $teamsDataFactory, $countriesDataFactory, $usersDataFactory, $prizeWinnersDataFactory) {

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

    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $timeout(function(){
            $scope.teamsLoaded = true;
            if ($scope.teams.length == 0) {
                $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAMHOME')});
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

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                var def = $q.defer();
                $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.countries = data.results;
                    def.resolve($scope.countries);
                });
                return def;
            } else {
                return $scope.countries;
            }
        });
    };

    $scope.getCountries();

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
            if ($scope.prizeWinner.id > 0) {
                $scope.disableSubmit = true;
                $prizeWinnersDataFactory.update($scope.prizeWinner).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PRIZEWINNERUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PRIZEWINNERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $prizeWinnersDataFactory.create($scope.prizeWinner).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PRIZEWINNERCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PRIZEWINNERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.prizewinners');
    };
    
    $scope.prize_winner_sport_event_readonly = false;
    $scope.prize_winner_team_home_readonly = false;
    $scope.prize_winner_team_away_readonly = false;
    $scope.prize_winner_country_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $prizeWinnersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.prizeWinner = savable(data);
            });
        });
    } else {
        $scope.prizeWinner = {id: 0};

        if (angular.isDefined($stateParams.prize_winner_sport_event) && JSON.parse($stateParams.prize_winner_sport_event) != null) {
            $scope.prizeWinner.sport_event = $stateParams.prize_winner_sport_event;
            $scope.prize_winner_sport_event_readonly = true;
        }
        if (angular.isDefined($stateParams.prize_winner_team_home) && JSON.parse($stateParams.prize_winner_team_home) != null) {
            $scope.prizeWinner.team_home = $stateParams.prize_winner_team_home;
            $scope.prize_winner_team_home_readonly = true;
        }
        if (angular.isDefined($stateParams.prize_winner_team_away) && JSON.parse($stateParams.prize_winner_team_away) != null) {
            $scope.prizeWinner.team_away = $stateParams.prize_winner_team_away;
            $scope.prize_winner_team_away_readonly = true;
        }
        if (angular.isDefined($stateParams.prize_winner_country) && JSON.parse($stateParams.prize_winner_country) != null) {
            $scope.prizeWinner.country = $stateParams.prize_winner_country;
            $scope.prize_winner_country_readonly = true;
        }
    }

}]);

