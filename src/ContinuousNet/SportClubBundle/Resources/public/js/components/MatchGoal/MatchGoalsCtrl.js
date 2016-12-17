'use strict';

/**
 * Controller for Match Goals List
 */

app.controller('MatchGoalsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$matchesDataFactory', '$teamsDataFactory', '$playersDataFactory', '$usersDataFactory', '$matchGoalsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $matchesDataFactory, $teamsDataFactory, $playersDataFactory, $usersDataFactory, $matchGoalsDataFactory) {

    $scope.scoredWithsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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
    $scope.zonesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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
    $scope.stadiumZonesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'OutsideBox',
        title: $filter('translate')('content.list.fields.stadiumzones.OUTSIDEBOX'),
        css: 'primary'
    }, {
        id: 'InsideBox',
        title: $filter('translate')('content.list.fields.stadiumzones.INSIDEBOX'),
        css: 'success'
    }];

    $scope.booleanOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
     }, {
        id: '1',
        title: $filter('translate')('content.common.YES'),
        css: 'success'
     }, {
        id: '0',
        title: $filter('translate')('content.common.NO'),
        css: 'danger'
    }];

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.matches = [];
    $scope.matchesLoaded = false;

    $scope.getMatches = function() {
        $scope.matchesLoaded = true;
        if ($scope.matches.length == 0) {
            $scope.matches.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCH')});
            var def = $q.defer();
            $matchesDataFactory.query({offset: 0, limit: 10000, 'order_by[match.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.matches.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.matches);
                    }
                });
            });
            return def;
        } else {
            return $scope.matches;
        }
    };

    $scope.getMatches();

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
            scoredWiths: $scope.scoredWithsOptions,
            zones: $scope.zonesOptions,
            stadiumZones: $scope.stadiumZonesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.matchGoalsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.matchGoalsParams)) {
           $localStorage.matchGoalsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.matchGoalsParams[param]) && $localStorage.matchGoalsParams[param] != null) {
            return $localStorage.matchGoalsParams[param];
        } else {
            $localStorage.matchGoalsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'matchGoal.id', filter: { 'matchGoal.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'match', title: $filter('translate')('content.list.fields.MATCH'), sortable: 'match.name', filter: { 'matchGoal.match': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMatches(), show: $scope.getParamValue('match_id_show_filed', true), displayField: 'name', state: 'app.matchday.matchesdetails' },
            { field: 'team', title: $filter('translate')('content.list.fields.TEAM'), sortable: 'team.name', filter: { 'matchGoal.team': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_show_filed', true), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'player', title: $filter('translate')('content.list.fields.PLAYER'), sortable: 'player.name', filter: { 'matchGoal.player': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPlayers(), show: $scope.getParamValue('player_id_show_filed', true), displayField: 'name', state: 'app.events.playersdetails' },
            { field: 'minute', title: $filter('translate')('content.list.fields.MINUTE'), sortable: 'matchGoal.minute', filter: { 'matchGoal.minute': 'number' }, show: $scope.getParamValue('minute_show_filed', true), getValue: $scope.textValue },
            { field: 'scored_with', title: $filter('translate')('content.list.fields.SCOREDWITH'), sortable: 'matchGoal.scoredWith', filter: { 'matchGoal.scoredWith': 'select' }, show: $scope.getParamValue('scored_with_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.scoredWithsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.scored_with ]]" my-enum-list=\'[[ scoredWiths ]]\'></span>') },
            { field: 'zone', title: $filter('translate')('content.list.fields.ZONE'), sortable: 'matchGoal.zone', filter: { 'matchGoal.zone': 'select' }, show: $scope.getParamValue('zone_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.zonesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.zone ]]" my-enum-list=\'[[ zones ]]\'></span>') },
            { field: 'stadium_zone', title: $filter('translate')('content.list.fields.STADIUMZONE'), sortable: 'matchGoal.stadiumZone', filter: { 'matchGoal.stadiumZone': 'select' }, show: $scope.getParamValue('stadium_zone_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.stadiumZonesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.stadium_zone ]]" my-enum-list=\'[[ stadiumZones ]]\'></span>') },
            { field: 'penalty', title: $filter('translate')('content.list.fields.PENALTY'), sortable: 'matchGoal.penalty', filter: { 'matchGoal.penalty': 'select' }, show: $scope.getParamValue('penalty_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.penalty ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'matchGoal.createdAt', filter: { 'matchGoal.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'matchGoal.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'matchGoal.modifiedAt', filter: { 'matchGoal.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'matchGoal.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('matchGoalsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('matchGoalsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('matchGoalsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('matchGoalsCount', $scope.count);
    $scope.sorting = {'matchGoal.minute': 'desc'};
    $scope.sorting = $scope.getParamValue('matchGoalsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('matchGoalsFilter', $scope.filter);
    $scope.setParamValue('matchGoalsPage', $scope.page);
    $scope.setParamValue('matchGoalsCount', $scope.count);
    $scope.setParamValue('matchGoalsSorting', $scope.sorting);
    $scope.setParamValue('matchGoalsFilter', $scope.filter);
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
            $scope.setParamValue('matchGoalsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('matchGoalsPage', current);
            $scope.setParamValue('matchGoalsCount', limit);
            $scope.setParamValue('matchGoalsSorting', order_by);
            $scope.setParamValue('matchGoalsFilter', filters);
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
            return $matchGoalsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMATCHGOAL'),
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
                $matchGoalsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MATCHGOALDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MATCHGOALNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MATCHGOALNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.matchday.matchgoalsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchgoalsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.matchday.matchgoalsdetails', {id: row.id});
    };
}]);

