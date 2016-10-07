'use strict';

/**
 * Controller for Banner Positions List
 */

app.controller('BannerPositionsCtrl', ['$scope', '$rootScope', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$bannerPositionsDataFactory',
function($scope, $rootScope, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $bannerPositionsDataFactory) {


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

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

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
        var html = '<a ui-sref="'+this.state+'({id: ' + value.id + '})">' + value[this.displayField] + '</a>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.evaluatedValue = function($scope, row) {
        var value = $scope.$eval('row.' + this.field, {row: row});
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        return $scope.$eval('\'' + value + '\' | ' + this.valueFormatter);
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
        $localStorage.bannerPositionsParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.bannerPositionsParams)) {
           $localStorage.bannerPositionsParams = {};
        }
        if (angular.isDefined($location.search()[param])) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.bannerPositionsParams[param])) {
            return $localStorage.bannerPositionsParams[param];
        } else {
            $localStorage.bannerPositionsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'bannerPosition.id', filter: { 'bannerPosition.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'bannerPosition.name', filter: { 'bannerPosition.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'bannerPosition.slug', filter: { 'bannerPosition.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'items_number', title: $filter('translate')('content.list.fields.ITEMSNUMBER'), sortable: 'bannerPosition.itemsNumber', filter: { 'bannerPosition.itemsNumber': 'number' }, show: $scope.getParamValue('items_number_show_filed', true), getValue: $scope.textValue },
            { field: 'display_time', title: $filter('translate')('content.list.fields.DISPLAYTIME'), sortable: 'bannerPosition.displayTime', filter: { 'bannerPosition.displayTime': 'number' }, show: $scope.getParamValue('display_time_show_filed', true), getValue: $scope.textValue },
            { field: 'is_full_screen', title: $filter('translate')('content.list.fields.ISFULLSCREEN'), sortable: 'bannerPosition.isFullScreen', filter: { 'bannerPosition.isFullScreen': 'select' }, show: $scope.getParamValue('is_full_screen_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_full_screen ]]"></span>') },
            { field: 'display_one_time', title: $filter('translate')('content.list.fields.DISPLAYONETIME'), sortable: 'bannerPosition.displayOneTime', filter: { 'bannerPosition.displayOneTime': 'select' }, show: $scope.getParamValue('display_one_time_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.display_one_time ]]"></span>') },
            { field: 'is_published', title: $filter('translate')('content.list.fields.ISPUBLISHED'), sortable: 'bannerPosition.isPublished', filter: { 'bannerPosition.isPublished': 'select' }, show: $scope.getParamValue('is_published_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_published ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'bannerPosition.createdAt', filter: { 'bannerPosition.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'bannerPosition.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'bannerPosition.modifiedAt', filter: { 'bannerPosition.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'bannerPosition.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('bannerPositionsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('bannerPositionsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.count = 50; // count per page
    $scope.sorting = {'bannerPosition.id': 'asc'};
    $scope.filter = {
        banners: []
    };
    $scope.tableParams = {
        page: $scope.getParamValue('bannerPositionsPage', $scope.page),
        count: $scope.getParamValue('bannerPositionsCount', $scope.count),
        sorting: $scope.getParamValue('bannerPositionsSorting', $scope.sorting),
        filter: $scope.getParamValue('bannerPositionsFilter', $scope.filter)
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('bannerPositionsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('bannerPositionsPage', current);
            $scope.setParamValue('bannerPositionsCount', limit);
            $scope.setParamValue('bannerPositionsSorting', order_by);
            $scope.setParamValue('bannerPositionsFilter', filters);
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
            return $bannerPositionsDataFactory.query(http_params).$promise.then(function(data) {
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERBANNERPOSITION'),
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
                $bannerPositionsDataFactory.remove(row).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.BANNERPOSITIONDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.BANNERPOSITIONNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.BANNERPOSITIONNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.adserving.bannerpositionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.adserving.bannerpositionsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.adserving.bannerpositionsdetails', {id: row.id});
    };
}]);

