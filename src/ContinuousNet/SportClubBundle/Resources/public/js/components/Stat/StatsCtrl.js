'use strict';

/**
 * Controller for Stats List
 */

app.controller('StatsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tablesDataFactory', '$teamsDataFactory', '$usersDataFactory', '$statsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tablesDataFactory, $teamsDataFactory, $usersDataFactory, $statsDataFactory) {

    $scope.mouvementsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.tables = [];
    $scope.tablesLoaded = false;

    $scope.getTables = function() {
        $scope.tablesLoaded = true;
        if ($scope.tables.length == 0) {
            $scope.tables.push({id: '', title: $filter('translate')('content.form.messages.SELECTTABLE')});
            var def = $q.defer();
            $tablesDataFactory.query({offset: 0, limit: 10000, 'order_by[table.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.tables.push({
                                id: data.results[i].id,
                                title: data.results[i].id
                            });
                        }
                        def.resolve($scope.tables);
                    }
                });
            });
            return def;
        } else {
            return $scope.tables;
        }
    };

    $scope.getTables();

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
            mouvements: $scope.mouvementsOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.statsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.statsParams)) {
           $localStorage.statsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.statsParams[param]) && $localStorage.statsParams[param] != null) {
            return $localStorage.statsParams[param];
        } else {
            $localStorage.statsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'stat.id', filter: { 'stat.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'table', title: $filter('translate')('content.list.fields.TABLE'), sortable: 'table.id', filter: { 'stat.table': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTables(), show: $scope.getParamValue('table_id_show_filed', true), displayField: 'id', state: 'app.events.tablesdetails' },
            { field: 'team', title: $filter('translate')('content.list.fields.TEAM'), sortable: 'team.name', filter: { 'stat.team': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_show_filed', true), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'position', title: $filter('translate')('content.list.fields.POSITION'), sortable: 'stat.position', filter: { 'stat.position': 'number' }, show: $scope.getParamValue('position_show_filed', true), getValue: $scope.textValue },
            { field: 'last_position', title: $filter('translate')('content.list.fields.LASTPOSITION'), sortable: 'stat.lastPosition', filter: { 'stat.lastPosition': 'number' }, show: $scope.getParamValue('last_position_show_filed', true), getValue: $scope.textValue },
            { field: 'played', title: $filter('translate')('content.list.fields.PLAYED'), sortable: 'stat.played', filter: { 'stat.played': 'number' }, show: $scope.getParamValue('played_show_filed', true), getValue: $scope.textValue },
            { field: 'won', title: $filter('translate')('content.list.fields.WON'), sortable: 'stat.won', filter: { 'stat.won': 'number' }, show: $scope.getParamValue('won_show_filed', true), getValue: $scope.textValue },
            { field: 'drawn', title: $filter('translate')('content.list.fields.DRAWN'), sortable: 'stat.drawn', filter: { 'stat.drawn': 'number' }, show: $scope.getParamValue('drawn_show_filed', false), getValue: $scope.textValue },
            { field: 'lost', title: $filter('translate')('content.list.fields.LOST'), sortable: 'stat.lost', filter: { 'stat.lost': 'number' }, show: $scope.getParamValue('lost_show_filed', false), getValue: $scope.textValue },
            { field: 'goals_for', title: $filter('translate')('content.list.fields.GOALSFOR'), sortable: 'stat.goalsFor', filter: { 'stat.goalsFor': 'number' }, show: $scope.getParamValue('goals_for_show_filed', false), getValue: $scope.textValue },
            { field: 'goals_against', title: $filter('translate')('content.list.fields.GOALSAGAINST'), sortable: 'stat.goalsAgainst', filter: { 'stat.goalsAgainst': 'number' }, show: $scope.getParamValue('goals_against_show_filed', false), getValue: $scope.textValue },
            { field: 'goal_difference', title: $filter('translate')('content.list.fields.GOALDIFFERENCE'), sortable: 'stat.goalDifference', filter: { 'stat.goalDifference': 'number' }, show: $scope.getParamValue('goal_difference_show_filed', false), getValue: $scope.textValue },
            { field: 'points', title: $filter('translate')('content.list.fields.POINTS'), sortable: 'stat.points', filter: { 'stat.points': 'number' }, show: $scope.getParamValue('points_show_filed', false), getValue: $scope.textValue },
            { field: 'mouvement', title: $filter('translate')('content.list.fields.MOUVEMENT'), sortable: 'stat.mouvement', filter: { 'stat.mouvement': 'select' }, show: $scope.getParamValue('mouvement_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.mouvementsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.mouvement ]]" my-enum-list=\'[[ mouvements ]]\'></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'stat.createdAt', filter: { 'stat.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'stat.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'stat.modifiedAt', filter: { 'stat.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'stat.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('statsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('statsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('statsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('statsCount', $scope.count);
    $scope.sorting = {'stat.id': 'asc'};
    $scope.sorting = $scope.getParamValue('statsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('statsFilter', $scope.filter);
    $scope.setParamValue('statsPage', $scope.page);
    $scope.setParamValue('statsCount', $scope.count);
    $scope.setParamValue('statsSorting', $scope.sorting);
    $scope.setParamValue('statsFilter', $scope.filter);
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
            $scope.setParamValue('statsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('statsPage', current);
            $scope.setParamValue('statsCount', limit);
            $scope.setParamValue('statsSorting', order_by);
            $scope.setParamValue('statsFilter', filters);
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
            return $statsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSTAT'),
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
                $statsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.STATDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.STATNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.STATNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.statsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.statsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.statsdetails', {id: row.id});
    };

    $scope.import = function() {
        $state.go('app.events.statsimport');
    };

    $scope.export = function() {
        $state.go('app.events.statsexport');
    };
}]);

