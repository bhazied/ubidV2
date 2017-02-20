'use strict';

/**
 * Controller for Tender Products List
 */

app.controller('TenderProductsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$categoriesDataFactory', '$productTypesDataFactory', '$usersDataFactory', '$tenderProductsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $categoriesDataFactory, $productTypesDataFactory, $usersDataFactory, $tenderProductsDataFactory) {

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

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.tenders = [];
    $scope.tendersLoaded = false;

    $scope.getTenders = function() {
        $scope.tendersLoaded = true;
        if ($scope.tenders.length == 0) {
            $scope.tenders.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDER')});
            var def = $q.defer();
            $tendersDataFactory.query({locale: $localeStorage.language, offset: 0, limit: 10000, 'order_by[tender.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.tenders.push({
                                id: data.results[i].id,
                                title: data.results[i].title
                            });
                        }
                        def.resolve($scope.tenders);
                    }
                });
            });
            return def;
        } else {
            return $scope.tenders;
        }
    };

    $scope.getTenders();

    $scope.categories = [];
    $scope.categoriesLoaded = false;

    $scope.getCategories = function() {
        $scope.categoriesLoaded = true;
        if ($scope.categories.length == 0) {
            $scope.categories.push({id: '', title: $filter('translate')('content.form.messages.SELECTCATEGORY')});
            var def = $q.defer();
            $categoriesDataFactory.query({locale: $localeStorage.language, offset: 0, limit: 10000, 'order_by[category.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.categories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.categories);
                    }
                });
            });
            return def;
        } else {
            return $scope.categories;
        }
    };

    $scope.getCategories();

    $scope.productTypes = [];
    $scope.productTypesLoaded = false;

    $scope.getProductTypes = function() {
        $scope.productTypesLoaded = true;
        if ($scope.productTypes.length == 0) {
            $scope.productTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRODUCTTYPE')});
            var def = $q.defer();
            $productTypesDataFactory.query({locale: $localeStorage.language, offset: 0, limit: 10000, 'order_by[productType.id]': 'desc'}).$promise.then(function(data) {
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
            $usersDataFactory.query({locale: $localeStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.tenderProductsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.tenderProductsParams)) {
           $localStorage.tenderProductsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.tenderProductsParams[param]) && $localStorage.tenderProductsParams[param] != null) {
            return $localStorage.tenderProductsParams[param];
        } else {
            $localStorage.tenderProductsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'tenderProduct.id', filter: { 'tenderProduct.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'tender', 'class': 'has_one', title: $filter('translate')('content.list.fields.TENDER'), sortable: 'tender.title', filter: { 'tenderProduct.tender': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenders(), show: $scope.getParamValue('tender_id_show_filed', true), displayInList: true, displayField: 'title', state: 'app.marketplace.tendersdetails' },
            { field: 'category', 'class': 'has_one', title: $filter('translate')('content.list.fields.CATEGORY'), sortable: 'category.name', filter: { 'tenderProduct.category': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCategories(), show: $scope.getParamValue('category_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { field: 'product_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.PRODUCTTYPE'), sortable: 'product_type.name', filter: { 'tenderProduct.productType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getProductTypes(), show: $scope.getParamValue('product_type_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.lists.producttypesdetails' },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'tenderProduct.title', filter: { 'tenderProduct.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'tenderProduct.slug', filter: { 'tenderProduct.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'tenderProduct.description', filter: { 'tenderProduct.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'tenderProduct.status', filter: { 'tenderProduct.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ROLE_ADMIN_PUBLISHER') > -1), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="tenderProductStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'unit_cost', title: $filter('translate')('content.list.fields.UNITCOST'), sortable: 'tenderProduct.unitCost', filter: { 'tenderProduct.unitCost': 'number' }, show: $scope.getParamValue('unit_cost_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'quantity', title: $filter('translate')('content.list.fields.QUANTITY'), sortable: 'tenderProduct.quantity', filter: { 'tenderProduct.quantity': 'number' }, show: $scope.getParamValue('quantity_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'duration', title: $filter('translate')('content.list.fields.DURATION'), sortable: 'tenderProduct.duration', filter: { 'tenderProduct.duration': 'number' }, show: $scope.getParamValue('duration_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'tenderProduct.ordering', filter: { 'tenderProduct.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'tenderProduct.createdAt', filter: { 'tenderProduct.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'tenderProduct.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'tenderProduct.modifiedAt', filter: { 'tenderProduct.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'tenderProduct.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('tenderProductsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('tenderProductsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('tenderProductsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('tenderProductsCount', $scope.count);
    $scope.sorting = {'tenderProduct.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('tenderProductsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('tenderProductsFilter', $scope.filter);
    $scope.setParamValue('tenderProductsPage', $scope.page);
    $scope.setParamValue('tenderProductsCount', $scope.count);
    $scope.setParamValue('tenderProductsSorting', $scope.sorting);
    $scope.setParamValue('tenderProductsFilter', $scope.filter);
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
            $scope.setParamValue('tenderProductsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('tenderProductsPage', current);
            $scope.setParamValue('tenderProductsCount', limit);
            $scope.setParamValue('tenderProductsSorting', order_by);
            $scope.setParamValue('tenderProductsFilter', filters);
            var http_params = {
                locale: $localeStorage.language,
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
            return $tenderProductsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTENDERPRODUCT'),
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
                $tenderProductsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TENDERPRODUCTDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TENDERPRODUCTNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TENDERPRODUCTNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.tenderproductsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.tenderproductsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.tenderproductsdetails', {id: row.id});
    };
}]);

