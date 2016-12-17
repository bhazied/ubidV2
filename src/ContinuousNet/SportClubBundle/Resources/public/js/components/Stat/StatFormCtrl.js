'use strict';

/**
 * Controller for Stat Form
 */

app.controller('StatFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tablesDataFactory', '$teamsDataFactory', '$usersDataFactory', '$statsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tablesDataFactory, $teamsDataFactory, $usersDataFactory, $statsDataFactory) {

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

    $scope.mouvements = [{
        id: 'None',
        title: $filter('translate')('content.list.fields.mouvements.NONE'),
        css: 'primary'
    }, {
        id: 'Up',
        title: $filter('translate')('content.list.fields.mouvements.UP'),
        css: 'success'
    }, {
        id: 'Down',
        title: $filter('translate')('content.list.fields.mouvements.DOWN'),
        css: 'warning'
    }];

    $scope.tables = [];
    $scope.tablesLoaded = false;

    $scope.getTables = function() {
        $timeout(function(){
            $scope.tablesLoaded = true;
            if ($scope.tables.length == 0) {
                $scope.tables.push({id: '', title: $filter('translate')('content.form.messages.SELECTTABLE')});
                var def = $q.defer();
                $tablesDataFactory.query({offset: 0, limit: 10000, 'order_by[table.id]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tables = data.results;
                    def.resolve($scope.tables);
                });
                return def;
            } else {
                return $scope.tables;
            }
        });
    };

    $scope.getTables();

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
            if ($scope.stat.id > 0) {
                $scope.disableSubmit = true;
                $statsDataFactory.update($scope.stat).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.STATUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.STATNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $statsDataFactory.create($scope.stat).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.STATCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.STATNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.stats');
    };
    
    $scope.stat_table_readonly = false;
    $scope.stat_team_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $statsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.stat = savable(data);
            });
        });
    } else {
        $scope.stat = {id: 0, mouvement: 'None'};

        if (angular.isDefined($stateParams.stat_table) && JSON.parse($stateParams.stat_table) != null) {
            $scope.stat.table = $stateParams.stat_table;
            $scope.stat_table_readonly = true;
        }
        if (angular.isDefined($stateParams.stat_team) && JSON.parse($stateParams.stat_team) != null) {
            $scope.stat.team = $stateParams.stat_team;
            $scope.stat_team_readonly = true;
        }
    }

}]);

