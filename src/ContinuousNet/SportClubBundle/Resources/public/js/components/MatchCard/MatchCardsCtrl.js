'use strict';

/**
 * Controller for Match Cards List
 */

app.controller('MatchCardsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$matchesDataFactory', '$teamsDataFactory', '$playersDataFactory', '$usersDataFactory', '$matchCardsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $matchesDataFactory, $teamsDataFactory, $playersDataFactory, $usersDataFactory, $matchCardsDataFactory) {

    $scope.cardsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'YellowCard',
        title: $filter('translate')('content.list.fields.cards.YELLOWCARD'),
        css: 'primary'
    }, {
        id: 'SecondYellowCard',
        title: $filter('translate')('content.list.fields.cards.SECONDYELLOWCARD'),
        css: 'success'
    }, {
        id: 'RedCard',
        title: $filter('translate')('content.list.fields.cards.REDCARD'),
        css: 'warning'
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
            cards: $scope.cardsOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.matchCardsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.matchCardsParams)) {
           $localStorage.matchCardsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.matchCardsParams[param]) && $localStorage.matchCardsParams[param] != null) {
            return $localStorage.matchCardsParams[param];
        } else {
            $localStorage.matchCardsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'matchCard.id', filter: { 'matchCard.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'match', title: $filter('translate')('content.list.fields.MATCH'), sortable: 'match.name', filter: { 'matchCard.match': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMatches(), show: $scope.getParamValue('match_id_show_filed', true), displayField: 'name', state: 'app.matchday.matchesdetails' },
            { field: 'team', title: $filter('translate')('content.list.fields.TEAM'), sortable: 'team.name', filter: { 'matchCard.team': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_show_filed', true), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'player', title: $filter('translate')('content.list.fields.PLAYER'), sortable: 'player.name', filter: { 'matchCard.player': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPlayers(), show: $scope.getParamValue('player_id_show_filed', true), displayField: 'name', state: 'app.events.playersdetails' },
            { field: 'minute', title: $filter('translate')('content.list.fields.MINUTE'), sortable: 'matchCard.minute', filter: { 'matchCard.minute': 'number' }, show: $scope.getParamValue('minute_show_filed', true), getValue: $scope.textValue },
            { field: 'card', title: $filter('translate')('content.list.fields.CARD'), sortable: 'matchCard.card', filter: { 'matchCard.card': 'select' }, show: $scope.getParamValue('card_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.cardsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.card ]]" my-enum-list=\'[[ cards ]]\'></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'matchCard.createdAt', filter: { 'matchCard.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'matchCard.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'matchCard.modifiedAt', filter: { 'matchCard.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'matchCard.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('matchCardsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('matchCardsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('matchCardsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('matchCardsCount', $scope.count);
    $scope.sorting = {'matchCard.minute': 'desc'};
    $scope.sorting = $scope.getParamValue('matchCardsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('matchCardsFilter', $scope.filter);
    $scope.setParamValue('matchCardsPage', $scope.page);
    $scope.setParamValue('matchCardsCount', $scope.count);
    $scope.setParamValue('matchCardsSorting', $scope.sorting);
    $scope.setParamValue('matchCardsFilter', $scope.filter);
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
            $scope.setParamValue('matchCardsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('matchCardsPage', current);
            $scope.setParamValue('matchCardsCount', limit);
            $scope.setParamValue('matchCardsSorting', order_by);
            $scope.setParamValue('matchCardsFilter', filters);
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
            return $matchCardsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMATCHCARD'),
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
                $matchCardsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MATCHCARDDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MATCHCARDNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MATCHCARDNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.matchday.matchcardsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchcardsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.matchday.matchcardsdetails', {id: row.id});
    };
}]);

