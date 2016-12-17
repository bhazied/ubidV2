'use strict';

/**
 * Controller for Player Stats List
 */

app.controller('PlayerStatsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$playersDataFactory', '$seasonsDataFactory', '$usersDataFactory', '$playerStatsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $playersDataFactory, $seasonsDataFactory, $usersDataFactory, $playerStatsDataFactory) {


    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.players = [];
    $scope.playersLoaded = false;

    $scope.getPlayers = function() {
        $scope.playersLoaded = true;
        if ($scope.players.length == 0) {
            $scope.players.push({id: '', title: $filter('translate')('content.form.messages.SELECTPLAYER')});
            var def = $q.defer();
            $playersDataFactory.query({offset: 0, limit: 10000, 'order_by[player.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.players.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.players);
                    }
                });
            });
            return def;
        } else {
            return $scope.players;
        }
    };

    $scope.getPlayers();

    $scope.seasons = [];
    $scope.seasonsLoaded = false;

    $scope.getSeasons = function() {
        $scope.seasonsLoaded = true;
        if ($scope.seasons.length == 0) {
            $scope.seasons.push({id: '', title: $filter('translate')('content.form.messages.SELECTSEASON')});
            var def = $q.defer();
            $seasonsDataFactory.query({offset: 0, limit: 10000, 'order_by[season.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.seasons.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.seasons);
                    }
                });
            });
            return def;
        } else {
            return $scope.seasons;
        }
    };

    $scope.getSeasons();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
            var def = $q.defer();
            $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.users.push({
                                id: data.results[i].id,
                                title: data.results[i].username
                            });
                        }
                        def.resolve($scope.users);
                    }
                });
            });
            return def;
        } else {
            return $scope.users;
        }
    };

    $scope.getUsers();


    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.trusted = {};

    $scope.linkValue = function($scope, row) {
        var value = row[this.field];
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var html = '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
        var displayFields = this.displayField.split(' ');
        for (var i in displayFields) {
            html += value[displayFields[i]] + ' ';
        }
        html += '</a>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.evaluatedValue = function($scope, row) {
        var value = $scope.$eval('row.' + this.field, {row: row});
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var evaluatedValue = $scope.$eval('\'' + value + '\' | ' + this.valueFormatter);
        if (this.field == 'birth_date') {
            evaluatedValue += ' ('+$scope.$eval('\'' + value + '\' | age')+')';
        }
        return evaluatedValue;
    };

    $scope.interpolatedValue = function($scope, row) {
        return this.interpolateExpr({
            row: row,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.playerStatsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.playerStatsParams)) {
           $localStorage.playerStatsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.playerStatsParams[param]) && $localStorage.playerStatsParams[param] != null) {
            return $localStorage.playerStatsParams[param];
        } else {
            $localStorage.playerStatsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'playerStat.id', filter: { 'playerStat.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'player', title: $filter('translate')('content.list.fields.PLAYER'), sortable: 'player.name', filter: { 'playerStat.player': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPlayers(), show: $scope.getParamValue('player_id_show_filed', true), displayField: 'name', state: 'app.events.playersdetails' },
            { field: 'season', title: $filter('translate')('content.list.fields.SEASON'), sortable: 'season.name', filter: { 'playerStat.season': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSeasons(), show: $scope.getParamValue('season_id_show_filed', true), displayField: 'name', state: 'app.events.seasonsdetails' },
            { field: 'goals', title: $filter('translate')('content.list.fields.GOALS'), sortable: 'playerStat.goals', filter: { 'playerStat.goals': 'number' }, show: $scope.getParamValue('goals_show_filed', true), getValue: $scope.textValue },
            { field: 'assists', title: $filter('translate')('content.list.fields.ASSISTS'), sortable: 'playerStat.assists', filter: { 'playerStat.assists': 'number' }, show: $scope.getParamValue('assists_show_filed', true), getValue: $scope.textValue },
            { field: 'matches', title: $filter('translate')('content.list.fields.MATCHES'), sortable: 'playerStat.matches', filter: { 'playerStat.matches': 'number' }, show: $scope.getParamValue('matches_show_filed', true), getValue: $scope.textValue },
            { field: 'wins', title: $filter('translate')('content.list.fields.WINS'), sortable: 'playerStat.wins', filter: { 'playerStat.wins': 'number' }, show: $scope.getParamValue('wins_show_filed', true), getValue: $scope.textValue },
            { field: 'losts', title: $filter('translate')('content.list.fields.LOSTS'), sortable: 'playerStat.losts', filter: { 'playerStat.losts': 'number' }, show: $scope.getParamValue('losts_show_filed', false), getValue: $scope.textValue },
            { field: 'minutes', title: $filter('translate')('content.list.fields.MINUTES'), sortable: 'playerStat.minutes', filter: { 'playerStat.minutes': 'number' }, show: $scope.getParamValue('minutes_show_filed', false), getValue: $scope.textValue },
            { field: 'starter', title: $filter('translate')('content.list.fields.STARTER'), sortable: 'playerStat.starter', filter: { 'playerStat.starter': 'number' }, show: $scope.getParamValue('starter_show_filed', false), getValue: $scope.textValue },
            { field: 'substitue', title: $filter('translate')('content.list.fields.SUBSTITUE'), sortable: 'playerStat.substitue', filter: { 'playerStat.substitue': 'number' }, show: $scope.getParamValue('substitue_show_filed', false), getValue: $scope.textValue },
            { field: 'faults_made', title: $filter('translate')('content.list.fields.FAULTSMADE'), sortable: 'playerStat.faultsMade', filter: { 'playerStat.faultsMade': 'number' }, show: $scope.getParamValue('faults_made_show_filed', false), getValue: $scope.textValue },
            { field: 'faults_received', title: $filter('translate')('content.list.fields.FAULTSRECEIVED'), sortable: 'playerStat.faultsReceived', filter: { 'playerStat.faultsReceived': 'number' }, show: $scope.getParamValue('faults_received_show_filed', false), getValue: $scope.textValue },
            { field: 'yellow_cards', title: $filter('translate')('content.list.fields.YELLOWCARDS'), sortable: 'playerStat.yellowCards', filter: { 'playerStat.yellowCards': 'number' }, show: $scope.getParamValue('yellow_cards_show_filed', false), getValue: $scope.textValue },
            { field: 'red_cards', title: $filter('translate')('content.list.fields.REDCARDS'), sortable: 'playerStat.redCards', filter: { 'playerStat.redCards': 'number' }, show: $scope.getParamValue('red_cards_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'playerStat.createdAt', filter: { 'playerStat.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'playerStat.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'playerStat.modifiedAt', filter: { 'playerStat.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'playerStat.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('playerStatsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('playerStatsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('playerStatsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('playerStatsCount', $scope.count);
    $scope.sorting = {'playerStat.id': 'asc'};
    $scope.sorting = $scope.getParamValue('playerStatsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('playerStatsFilter', $scope.filter);
    $scope.setParamValue('playerStatsPage', $scope.page);
    $scope.setParamValue('playerStatsCount', $scope.count);
    $scope.setParamValue('playerStatsSorting', $scope.sorting);
    $scope.setParamValue('playerStatsFilter', $scope.filter);
    $scope.tableParams = {
        page: $scope.page,
        count: $scope.count,
        sorting: $scope.sorting,
        filter: $scope.filter
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('playerStatsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('playerStatsPage', current);
            $scope.setParamValue('playerStatsCount', limit);
            $scope.setParamValue('playerStatsSorting', order_by);
            $scope.setParamValue('playerStatsFilter', filters);
            var http_params = {
                offset: offset,
                limit: limit
            };
            for (var field in order_by) {
                http_params['order_by['+field+']'] = order_by[field];
            }
            if (filters.length > 0) {
                http_params.offset = 0;
            }
            for (var field in filters) {
                if (filters[field] != null || filters[field] != '') {
                    http_params['filters['+field+']'] = filters[field];
                }
            }
            $scope.isLoading = true;
            return $playerStatsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPLAYERSTAT'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $filter('translate')('content.common.YESDELETE'),
            cancelButtonText: $filter('translate')('content.common.NOCANCEL'),
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                $playerStatsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.PLAYERSTATDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.PLAYERSTATNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.PLAYERSTATNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.playerstatsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.playerstatsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.playerstatsdetails', {id: row.id});
    };
}]);

