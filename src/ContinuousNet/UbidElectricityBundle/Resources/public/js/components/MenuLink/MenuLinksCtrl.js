'use strict';

/**
 * Controller for Menu Links List
 */

app.controller('MenuLinksCtrl', ['$scope', '$rootScope', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$menusDataFactory', '$usersDataFactory', '$menuLinksDataFactory',
function($scope, $rootScope, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $menusDataFactory, $usersDataFactory, $menuLinksDataFactory) {


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

    $scope.menus = [];
    $scope.menusLoaded = false;

    $scope.getMenus = function() {
        $scope.menusLoaded = true;
        if ($scope.menus.length == 0) {
            $scope.menus.push({id: '', title: $filter('translate')('content.form.messages.SELECTMENU')});
            var def = $q.defer();
            $menusDataFactory.query({offset: 0, limit: 10000, 'order_by[menu.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.menus.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.menus);
                    }
                });
            });
            return def;
        } else {
            return $scope.menus;
        }
    };

    $scope.getMenus();

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
        $localStorage.menuLinksParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.menuLinksParams)) {
           $localStorage.menuLinksParams = {};
        }
        if (angular.isDefined($location.search()[param])) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.menuLinksParams[param])) {
            return $localStorage.menuLinksParams[param];
        } else {
            $localStorage.menuLinksParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'menuLink.id', filter: { 'menuLink.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'menu', title: $filter('translate')('content.list.fields.MENU'), sortable: 'menu.name', filter: { 'menuLink.menu': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMenus(), show: $scope.getParamValue('menu_id_show_filed', true), displayField: 'name', state: 'app.settings.menusdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'menuLink.name', filter: { 'menuLink.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'menuLink.nameAr', filter: { 'menuLink.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'menuLink.nameFr', filter: { 'menuLink.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'menuLink.slug', filter: { 'menuLink.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'menuLink.slugAr', filter: { 'menuLink.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'menuLink.slugFr', filter: { 'menuLink.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'is_published', title: $filter('translate')('content.list.fields.ISPUBLISHED'), sortable: 'menuLink.isPublished', filter: { 'menuLink.isPublished': 'select' }, show: $scope.getParamValue('is_published_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_published ]]"></span>') },
            { field: 'controller', title: $filter('translate')('content.list.fields.CONTROLLER'), sortable: 'menuLink.controller', filter: { 'menuLink.controller': 'text' }, show: $scope.getParamValue('controller_show_filed', false), getValue: $scope.textValue },
            { field: 'action', title: $filter('translate')('content.list.fields.ACTION'), sortable: 'menuLink.action', filter: { 'menuLink.action': 'text' }, show: $scope.getParamValue('action_show_filed', false), getValue: $scope.textValue },
            { field: 'foreign_key', title: $filter('translate')('content.list.fields.FOREIGNKEY'), sortable: 'menuLink.foreignKey', filter: { 'menuLink.foreignKey': 'number' }, show: $scope.getParamValue('foreign_key_show_filed', false), getValue: $scope.textValue },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'menuLink.ordering', filter: { 'menuLink.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'menuLink.createdAt', filter: { 'menuLink.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'menuLink.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'menuLink.modifiedAt', filter: { 'menuLink.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'menuLink.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('menuLinksIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('menuLinksIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.count = 50; // count per page
    $scope.sorting = {'menuLink.name': 'asc'};
    $scope.filter = {
    };
    $scope.tableParams = {
        page: $scope.getParamValue('menuLinksPage', $scope.page),
        count: $scope.getParamValue('menuLinksCount', $scope.count),
        sorting: $scope.getParamValue('menuLinksSorting', $scope.sorting),
        filter: $scope.getParamValue('menuLinksFilter', $scope.filter)
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('menuLinksIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('menuLinksPage', current);
            $scope.setParamValue('menuLinksCount', limit);
            $scope.setParamValue('menuLinksSorting', order_by);
            $scope.setParamValue('menuLinksFilter', filters);
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
            return $menuLinksDataFactory.query(http_params).$promise.then(function(data) {
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMENULINK'),
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
                $menuLinksDataFactory.remove(row).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MENULINKDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MENULINKNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MENULINKNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.settings.menulinksnew');
    };

    $scope.edit = function(row) {
        $state.go('app.settings.menulinksedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.settings.menulinksdetails', {id: row.id});
    };
}]);

