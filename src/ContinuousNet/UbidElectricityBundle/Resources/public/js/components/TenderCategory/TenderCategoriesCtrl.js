'use strict';

/**
 * Controller for Tender Categories List
 */

app.controller('TenderCategoriesCtrl', ['$scope', '$rootScope', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$productTypesDataFactory', '$usersDataFactory', '$tenderCategoriesDataFactory',
function($scope, $rootScope, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $productTypesDataFactory, $usersDataFactory, $tenderCategoriesDataFactory) {

    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
    }];

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.tenderCategories = [];
    $scope.tenderCategoriesLoaded = false;

    $scope.getParents = function() {
        $scope.tenderCategoriesLoaded = true;
        if ($scope.tenderCategories.length == 0) {
            $scope.tenderCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPARENT')});
            var def = $q.defer();
            $tenderCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.tenderCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.tenderCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.tenderCategories;
        }
    };

    $scope.getParents();

    $scope.productTypes = [];
    $scope.productTypesLoaded = false;

    $scope.getProductTypes = function() {
        $scope.productTypesLoaded = true;
        if ($scope.productTypes.length == 0) {
            $scope.productTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRODUCTTYPE')});
            var def = $q.defer();
            $productTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[productType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.productTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.productTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.productTypes;
        }
    };

    $scope.getProductTypes();

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
        var html = '<a ui-sref="'+this.state+'({id: ' + row.id + '})">' + value[this.displayField] + '</a>';
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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.tenderCategoriesParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.tenderCategoriesParams)) {
           $localStorage.tenderCategoriesParams = {};
        }
        if (angular.isDefined($location.search()[param])) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.tenderCategoriesParams[param])) {
            return $localStorage.tenderCategoriesParams[param];
        } else {
            $localStorage.tenderCategoriesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'tenderCategory.id', filter: { 'tenderCategory.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'tenderCategory.name', filter: { 'tenderCategory.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'tenderCategory.nameAr', filter: { 'tenderCategory.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'tenderCategory.nameFr', filter: { 'tenderCategory.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'tenderCategory.slug', filter: { 'tenderCategory.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'tenderCategory.slugAr', filter: { 'tenderCategory.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'tenderCategory.slugFr', filter: { 'tenderCategory.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'tenderCategory.picture', filter: { 'tenderCategory.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'tenderCategory.description', filter: { 'tenderCategory.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'tenderCategory.descriptionAr', filter: { 'tenderCategory.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'tenderCategory.descriptionFr', filter: { 'tenderCategory.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'parent', title: $filter('translate')('content.list.fields.PARENT'), sortable: 'parent.name', filter: { 'tenderCategory.parent': 'select' }, getValue: $scope.linkValue, filterData: $scope.getParents(), show: $scope.getParamValue('parent_id_show_filed', false), displayField: 'name', state: 'app.tenders.tendercategoriesdetails' },
            { field: 'product_type', title: $filter('translate')('content.list.fields.PRODUCTTYPE'), sortable: 'product_type.name', filter: { 'tenderCategory.productType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getProductTypes(), show: $scope.getParamValue('product_type_id_show_filed', false), displayField: 'name', state: 'app.tenders.producttypesdetails' },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'tenderCategory.ordering', filter: { 'tenderCategory.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'tenderCategory.status', filter: { 'tenderCategory.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'tenderCategory.createdAt', filter: { 'tenderCategory.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'tenderCategory.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'tenderCategory.modifiedAt', filter: { 'tenderCategory.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'tenderCategory.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'tenders', title: $filter('translate')('content.list.fields.TENDERS'), filter: { 'tenderCategory.tenders': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getParents(), show: $scope.getParamValue('tenders_show_filed', false), display: false, displayField: 'title', state: 'app.marketplace.tendersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('tenderCategoriesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('tenderCategoriesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.count = 50; // count per page
    $scope.sorting = {'tenderCategory.name': 'asc'};
    $scope.filter = {
        tenders: []
    };
    $scope.tableParams = {
        page: $scope.getParamValue('tenderCategoriesPage', $scope.page),
        count: $scope.getParamValue('tenderCategoriesCount', $scope.count),
        sorting: $scope.getParamValue('tenderCategoriesSorting', $scope.sorting),
        filter: $scope.getParamValue('tenderCategoriesFilter', $scope.filter)
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('tenderCategoriesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('tenderCategoriesPage', current);
            $scope.setParamValue('tenderCategoriesCount', limit);
            $scope.setParamValue('tenderCategoriesSorting', order_by);
            $scope.setParamValue('tenderCategoriesFilter', filters);
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
            return $tenderCategoriesDataFactory.query(http_params).$promise.then(function(data) {
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTENDERCATEGORY'),
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
                $tenderCategoriesDataFactory.remove(row).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TENDERCATEGORYDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TENDERCATEGORYNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TENDERCATEGORYNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.tenders.tendercategoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.tenders.tendercategoriesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.tenders.tendercategoriesdetails', {id: row.id});
    };
}]);

