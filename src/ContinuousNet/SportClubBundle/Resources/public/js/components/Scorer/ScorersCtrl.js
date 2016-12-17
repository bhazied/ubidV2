'use strict';

/**
 * Controller for Scorers List
 */

app.controller('ScorersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$teamsDataFactory', '$playersDataFactory', '$sportEventsDataFactory', '$usersDataFactory', '$scorersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $teamsDataFactory, $playersDataFactory, $sportEventsDataFactory, $usersDataFactory, $scorersDataFactory) {


    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $scope.teamsLoaded = true;
        if ($scope.teams.length == 0) {
            $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAM')});
            var def = $q.defer();
            $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.teams.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.teams);
                    }
                });
            });
            return def;
        } else {
            return $scope.teams;
        }
    };

    $scope.getTeams();

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

    $scope.sportEvents = [];
    $scope.sportEventsLoaded = false;

    $scope.getSportEvents = function() {
        $scope.sportEventsLoaded = true;
        if ($scope.sportEvents.length == 0) {
            $scope.sportEvents.push({id: '', title: $filter('translate')('content.form.messages.SELECTSPORTEVENT')});
            var def = $q.defer();
            $sportEventsDataFactory.query({offset: 0, limit: 10000, 'order_by[sportEvent.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.sportEvents.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.sportEvents);
                    }
                });
            });
            return def;
        } else {
            return $scope.sportEvents;
        }
    };

    $scope.getSportEvents();

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
        $localStorage.scorersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.scorersParams)) {
           $localStorage.scorersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.scorersParams[param]) && $localStorage.scorersParams[param] != null) {
            return $localStorage.scorersParams[param];
        } else {
            $localStorage.scorersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'scorer.id', filter: { 'scorer.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'team', title: $filter('translate')('content.list.fields.TEAM'), sortable: 'team.name', filter: { 'scorer.team': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_show_filed', true), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'player', title: $filter('translate')('content.list.fields.PLAYER'), sortable: 'player.name', filter: { 'scorer.player': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPlayers(), show: $scope.getParamValue('player_id_show_filed', true), displayField: 'name', state: 'app.events.playersdetails' },
            { field: 'sport_event', title: $filter('translate')('content.list.fields.SPORTEVENT'), sortable: 'sport_event.name', filter: { 'scorer.sportEvent': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSportEvents(), show: $scope.getParamValue('sport_event_id_show_filed', true), displayField: 'name', state: 'app.events.sporteventsdetails' },
            { field: 'goals', title: $filter('translate')('content.list.fields.GOALS'), sortable: 'scorer.goals', filter: { 'scorer.goals': 'number' }, show: $scope.getParamValue('goals_show_filed', true), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'scorer.createdAt', filter: { 'scorer.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'scorer.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', true), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'scorer.modifiedAt', filter: { 'scorer.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'scorer.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('scorersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('scorersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('scorersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('scorersCount', $scope.count);
    $scope.sorting = {'scorer.id': 'asc'};
    $scope.sorting = $scope.getParamValue('scorersSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('scorersFilter', $scope.filter);
    $scope.setParamValue('scorersPage', $scope.page);
    $scope.setParamValue('scorersCount', $scope.count);
    $scope.setParamValue('scorersSorting', $scope.sorting);
    $scope.setParamValue('scorersFilter', $scope.filter);
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
            $scope.setParamValue('scorersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('scorersPage', current);
            $scope.setParamValue('scorersCount', limit);
            $scope.setParamValue('scorersSorting', order_by);
            $scope.setParamValue('scorersFilter', filters);
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
            return $scorersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSCORER'),
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
                $scorersDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.SCORERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.SCORERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.SCORERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.scorersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.scorersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.scorersdetails', {id: row.id});
    };
}]);

