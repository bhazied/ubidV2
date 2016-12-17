'use strict';

/**
 * Controller for Match Commentaries List
 */

app.controller('MatchCommentariesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$matchesDataFactory', '$usersDataFactory', '$matchCommentariesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $matchesDataFactory, $usersDataFactory, $matchCommentariesDataFactory) {

    $scope.iconsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Goal',
        title: $filter('translate')('content.list.fields.icons.GOAL'),
        css: 'primary'
    }, {
        id: 'Caution',
        title: $filter('translate')('content.list.fields.icons.CAUTION'),
        css: 'success'
    }, {
        id: 'Expulsion',
        title: $filter('translate')('content.list.fields.icons.EXPULSION'),
        css: 'warning'
    }, {
        id: 'SecondCaution',
        title: $filter('translate')('content.list.fields.icons.SECONDCAUTION'),
        css: 'danger'
    }, {
        id: 'OwnGoal',
        title: $filter('translate')('content.list.fields.icons.OWNGOAL'),
        css: 'default'
    }, {
        id: 'DisallowedGoal',
        title: $filter('translate')('content.list.fields.icons.DISALLOWEDGOAL'),
        css: 'info'
    }, {
        id: 'Penalty',
        title: $filter('translate')('content.list.fields.icons.PENALTY'),
        css: 'primary'
    }, {
        id: 'MissedPenalty',
        title: $filter('translate')('content.list.fields.icons.MISSEDPENALTY'),
        css: 'success'
    }, {
        id: 'Offside',
        title: $filter('translate')('content.list.fields.icons.OFFSIDE'),
        css: 'warning'
    }, {
        id: 'ThrowIn',
        title: $filter('translate')('content.list.fields.icons.THROWIN'),
        css: 'danger'
    }, {
        id: 'Foul',
        title: $filter('translate')('content.list.fields.icons.FOUL'),
        css: 'default'
    }, {
        id: 'FreeKick',
        title: $filter('translate')('content.list.fields.icons.FREEKICK'),
        css: 'info'
    }, {
        id: 'CornerKick',
        title: $filter('translate')('content.list.fields.icons.CORNERKICK'),
        css: 'primary'
    }, {
        id: 'Injury',
        title: $filter('translate')('content.list.fields.icons.INJURY'),
        css: 'success'
    }, {
        id: 'Winner',
        title: $filter('translate')('content.list.fields.icons.WINNER'),
        css: 'warning'
    }, {
        id: 'Assist',
        title: $filter('translate')('content.list.fields.icons.ASSIST'),
        css: 'danger'
    }, {
        id: 'Blocknote',
        title: $filter('translate')('content.list.fields.icons.BLOCKNOTE'),
        css: 'default'
    }, {
        id: 'Whistle',
        title: $filter('translate')('content.list.fields.icons.WHISTLE'),
        css: 'info'
    }, {
        id: 'Substitution',
        title: $filter('translate')('content.list.fields.icons.SUBSTITUTION'),
        css: 'primary'
    }, {
        id: 'Miss',
        title: $filter('translate')('content.list.fields.icons.MISS'),
        css: 'success'
    }, {
        id: 'Save',
        title: $filter('translate')('content.list.fields.icons.SAVE'),
        css: 'warning'
    }, {
        id: 'HandTouch',
        title: $filter('translate')('content.list.fields.icons.HANDTOUCH'),
        css: 'danger'
    }, {
        id: 'PlayerIn',
        title: $filter('translate')('content.list.fields.icons.PLAYERIN'),
        css: 'default'
    }, {
        id: 'PlayerOut',
        title: $filter('translate')('content.list.fields.icons.PLAYEROUT'),
        css: 'info'
    }, {
        id: 'StartFirstHalf',
        title: $filter('translate')('content.list.fields.icons.STARTFIRSTHALF'),
        css: 'primary'
    }, {
        id: 'EndFirstHalf',
        title: $filter('translate')('content.list.fields.icons.ENDFIRSTHALF'),
        css: 'success'
    }, {
        id: 'StartSecondHalf',
        title: $filter('translate')('content.list.fields.icons.STARTSECONDHALF'),
        css: 'warning'
    }, {
        id: 'EndSecondHalf',
        title: $filter('translate')('content.list.fields.icons.ENDSECONDHALF'),
        css: 'danger'
    }, {
        id: 'ExtraTime',
        title: $filter('translate')('content.list.fields.icons.EXTRATIME'),
        css: 'default'
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
            icons: $scope.iconsOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.matchCommentariesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.matchCommentariesParams)) {
           $localStorage.matchCommentariesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.matchCommentariesParams[param]) && $localStorage.matchCommentariesParams[param] != null) {
            return $localStorage.matchCommentariesParams[param];
        } else {
            $localStorage.matchCommentariesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'matchCommentary.id', filter: { 'matchCommentary.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'comment', title: $filter('translate')('content.list.fields.COMMENT'), sortable: 'matchCommentary.comment', filter: { 'matchCommentary.comment': 'text' }, show: $scope.getParamValue('comment_show_filed', true), getValue: $scope.textValue },
            { field: 'comment_ar', title: $filter('translate')('content.list.fields.COMMENTAR'), sortable: 'matchCommentary.commentAr', filter: { 'matchCommentary.commentAr': 'text' }, show: $scope.getParamValue('comment_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'comment_fr', title: $filter('translate')('content.list.fields.COMMENTFR'), sortable: 'matchCommentary.commentFr', filter: { 'matchCommentary.commentFr': 'text' }, show: $scope.getParamValue('comment_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'match', title: $filter('translate')('content.list.fields.MATCH'), sortable: 'match.name', filter: { 'matchCommentary.match': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMatches(), show: $scope.getParamValue('match_id_show_filed', true), displayField: 'name', state: 'app.matchday.matchesdetails' },
            { field: 'minute', title: $filter('translate')('content.list.fields.MINUTE'), sortable: 'matchCommentary.minute', filter: { 'matchCommentary.minute': 'number' }, show: $scope.getParamValue('minute_show_filed', true), getValue: $scope.textValue },
            { field: 'icon', title: $filter('translate')('content.list.fields.ICON'), sortable: 'matchCommentary.icon', filter: { 'matchCommentary.icon': 'select' }, show: $scope.getParamValue('icon_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.iconsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.icon ]]" my-enum-list=\'[[ icons ]]\'></span>') },
            { field: 'is_published', title: $filter('translate')('content.list.fields.ISPUBLISHED'), sortable: 'matchCommentary.isPublished', filter: { 'matchCommentary.isPublished': 'select' }, show: $scope.getParamValue('is_published_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_published ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'matchCommentary.createdAt', filter: { 'matchCommentary.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'matchCommentary.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'matchCommentary.modifiedAt', filter: { 'matchCommentary.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'matchCommentary.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('matchCommentariesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('matchCommentariesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('matchCommentariesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('matchCommentariesCount', $scope.count);
    $scope.sorting = {'matchCommentary.minute': 'desc'};
    $scope.sorting = $scope.getParamValue('matchCommentariesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('matchCommentariesFilter', $scope.filter);
    $scope.setParamValue('matchCommentariesPage', $scope.page);
    $scope.setParamValue('matchCommentariesCount', $scope.count);
    $scope.setParamValue('matchCommentariesSorting', $scope.sorting);
    $scope.setParamValue('matchCommentariesFilter', $scope.filter);
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
            $scope.setParamValue('matchCommentariesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('matchCommentariesPage', current);
            $scope.setParamValue('matchCommentariesCount', limit);
            $scope.setParamValue('matchCommentariesSorting', order_by);
            $scope.setParamValue('matchCommentariesFilter', filters);
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
            return $matchCommentariesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMATCHCOMMENTARY'),
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
                $matchCommentariesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MATCHCOMMENTARYDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MATCHCOMMENTARYNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MATCHCOMMENTARYNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.matchday.matchcommentariesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchcommentariesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.matchday.matchcommentariesdetails', {id: row.id});
    };
}]);

