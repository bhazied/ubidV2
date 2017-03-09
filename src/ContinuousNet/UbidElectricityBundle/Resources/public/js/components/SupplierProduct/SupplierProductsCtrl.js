'use strict';

/**
 * Controller for Supplier Products List
 */

app.controller('SupplierProductsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$suppliersDataFactory', '$categoriesDataFactory', '$usersDataFactory', '$supplierProductsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $suppliersDataFactory, $categoriesDataFactory, $usersDataFactory, $supplierProductsDataFactory) {

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

    $scope.suppliers = [];
    $scope.suppliersLoaded = false;

    $scope.getSuppliers = function() {
        $scope.suppliersLoaded = true;
        if ($scope.suppliers.length == 0) {
            $scope.suppliers.push({id: '', title: $filter('translate')('content.form.messages.SELECTSUPPLIER')});
            var def = $q.defer();
            $suppliersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[supplier.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.suppliers.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.suppliers);
                    }
                });
            });
            return def;
        } else {
            return $scope.suppliers;
        }
    };

    $scope.getSuppliers();

    $scope.categories = [];
    $scope.categoriesLoaded = false;

    $scope.getCategories = function() {
        $scope.categoriesLoaded = true;
        if ($scope.categories.length == 0) {
            $scope.categories.push({id: '', title: $filter('translate')('content.form.messages.SELECTCATEGORY')});
            var def = $q.defer();
            $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[category.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        data.results = $rootScope.createTree(data.results, 'parent_category_id', 'name', null, 0);
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

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTUSER')});
            var def = $q.defer();
            $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
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
        var displayFields = this.displayField.split(' ');
        var displayText = ''
        for (var i in displayFields) {
            displayText += value[displayFields[i]] + ' ';
        }
        var html = '';
        if ($rootScope.checkStatePermission(this.state)) {
            html += '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
            html += displayText.trim();
            html += '</a>';
        } else {
            html += displayText.trim();
        }
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
        $localStorage.supplierProductsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.supplierProductsParams)) {
           $localStorage.supplierProductsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.supplierProductsParams[param]) && $localStorage.supplierProductsParams[param] != null) {
            return $localStorage.supplierProductsParams[param];
        } else {
            $localStorage.supplierProductsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'supplierProduct.id', filter: { 'supplierProduct.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.SUPPLIER'), sortable: 'supplier.name', filter: { 'supplierProduct.supplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: ($scope.getParamValue('supplier_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.marketplace.suppliersdetails' },
            { field: 'category', 'class': 'has_one', title: $filter('translate')('content.list.fields.CATEGORY'), sortable: 'category.name', filter: { 'supplierProduct.category': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCategories(), show: ($scope.getParamValue('category_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'supplierProduct.name', filter: { 'supplierProduct.name': 'text' }, show: ($scope.getParamValue('name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'supplierProduct.slug', filter: { 'supplierProduct.slug': 'text' }, show: ($scope.getParamValue('slug_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'brand', title: $filter('translate')('content.list.fields.BRAND'), sortable: 'supplierProduct.brand', filter: { 'supplierProduct.brand': 'text' }, show: ($scope.getParamValue('brand_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'model', title: $filter('translate')('content.list.fields.MODEL'), sortable: 'supplierProduct.model', filter: { 'supplierProduct.model': 'text' }, show: ($scope.getParamValue('model_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'supplierProduct.description', filter: { 'supplierProduct.description': 'text' }, show: ($scope.getParamValue('description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'supplierProduct.picture', filter: { 'supplierProduct.picture': 'text' }, show: ($scope.getParamValue('picture_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'supplierProduct.status', filter: { 'supplierProduct.status': 'select' }, show: ($scope.getParamValue('status_show_filed', false) && ($rootScope.currentUser.roles.join('').indexOf('ROLE_ADMIN_PUBLISHER') > -1)), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ROLE_ADMIN_PUBLISHER') > -1), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="supplierProductStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'unit_cost', title: $filter('translate')('content.list.fields.UNITCOST'), sortable: 'supplierProduct.unitCost', filter: { 'supplierProduct.unitCost': 'number' }, show: ($scope.getParamValue('unit_cost_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'is_public', title: $filter('translate')('content.list.fields.ISPUBLIC'), sortable: 'supplierProduct.isPublic', filter: { 'supplierProduct.isPublic': 'select' }, show: ($scope.getParamValue('is_public_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_public ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'supplierProduct.createdAt', filter: { 'supplierProduct.createdAt': 'number' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'supplierProduct.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'supplierProduct.modifiedAt', filter: { 'supplierProduct.modifiedAt': 'number' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'supplierProduct.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
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

    $scope.isFiltersVisible = $scope.getParamValue('supplierProductsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('supplierProductsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('supplierProductsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('supplierProductsCount', $scope.count);
    $scope.sorting = {'supplierProduct.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('supplierProductsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('supplierProductsFilter', $scope.filter);
    $scope.setParamValue('supplierProductsPage', $scope.page);
    $scope.setParamValue('supplierProductsCount', $scope.count);
    $scope.setParamValue('supplierProductsSorting', $scope.sorting);
    $scope.setParamValue('supplierProductsFilter', $scope.filter);
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
            $scope.setParamValue('supplierProductsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('supplierProductsPage', current);
            $scope.setParamValue('supplierProductsCount', limit);
            $scope.setParamValue('supplierProductsSorting', order_by);
            $scope.setParamValue('supplierProductsFilter', filters);
            var http_params = {
                locale: $localStorage.language,
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
            return $supplierProductsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSUPPLIERPRODUCT'),
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
                $supplierProductsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.SUPPLIERPRODUCTDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.SUPPLIERPRODUCTNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.SUPPLIERPRODUCTNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.supplierproductsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.supplierproductsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.supplierproductsdetails', {id: row.id});
    };
}]);

