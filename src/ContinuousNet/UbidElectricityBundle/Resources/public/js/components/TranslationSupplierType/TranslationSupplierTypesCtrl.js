'use strict';

/**
 * Controller for Translation Supplier Types List
 */

app.controller('TranslationSupplierTypesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$supplierTypesDataFactory', '$usersDataFactory', '$translationSupplierTypesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $supplierTypesDataFactory, $usersDataFactory, $translationSupplierTypesDataFactory) {


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

    $scope.supplierTypes = [];
    $scope.supplierTypesLoaded = false;

    $scope.getSupplierTypes = function() {
        $scope.supplierTypesLoaded = true;
        if ($scope.supplierTypes.length == 0) {
            $scope.supplierTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTSUPPLIERTYPE')});
            var def = $q.defer();
            $supplierTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[supplierType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.supplierTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.supplierTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.supplierTypes;
        }
    };

    $scope.getSupplierTypes();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
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
        $localStorage.translationSupplierTypesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.translationSupplierTypesParams)) {
           $localStorage.translationSupplierTypesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.translationSupplierTypesParams[param]) && $localStorage.translationSupplierTypesParams[param] != null) {
            return $localStorage.translationSupplierTypesParams[param];
        } else {
            $localStorage.translationSupplierTypesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'translationSupplierType.id', filter: { 'translationSupplierType.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'supplier_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.SUPPLIERTYPE'), sortable: 'supplier_type.name', filter: { 'translationSupplierType.supplierType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSupplierTypes(), show: $scope.getParamValue('supplier_type_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.lists.suppliertypesdetails' },
            { field: 'locale', title: $filter('translate')('content.list.fields.LOCALE'), sortable: 'translationSupplierType.locale', filter: { 'translationSupplierType.locale': 'text' }, show: $scope.getParamValue('locale_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'translationSupplierType.name', filter: { 'translationSupplierType.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'translationSupplierType.slug', filter: { 'translationSupplierType.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'validated', title: $filter('translate')('content.list.fields.VALIDATED'), sortable: 'translationSupplierType.validated', filter: { 'translationSupplierType.validated': 'select' }, show: $scope.getParamValue('validated_show_filed', true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.validated ]]"></span>') },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'translationSupplierType.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'translationSupplierType.createdAt', filter: { 'translationSupplierType.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'translationSupplierType.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'translationSupplierType.modifiedAt', filter: { 'translationSupplierType.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
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

    $scope.isFiltersVisible = $scope.getParamValue('translationSupplierTypesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('translationSupplierTypesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('translationSupplierTypesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('translationSupplierTypesCount', $scope.count);
    $scope.sorting = {'translationSupplierType.locale': 'asc'};
    $scope.sorting = $scope.getParamValue('translationSupplierTypesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('translationSupplierTypesFilter', $scope.filter);
    $scope.setParamValue('translationSupplierTypesPage', $scope.page);
    $scope.setParamValue('translationSupplierTypesCount', $scope.count);
    $scope.setParamValue('translationSupplierTypesSorting', $scope.sorting);
    $scope.setParamValue('translationSupplierTypesFilter', $scope.filter);
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
            $scope.setParamValue('translationSupplierTypesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('translationSupplierTypesPage', current);
            $scope.setParamValue('translationSupplierTypesCount', limit);
            $scope.setParamValue('translationSupplierTypesSorting', order_by);
            $scope.setParamValue('translationSupplierTypesFilter', filters);
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
            return $translationSupplierTypesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTRANSLATIONSUPPLIERTYPE'),
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
                $translationSupplierTypesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPEDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.translation.translationsuppliertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationsuppliertypesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.translation.translationsuppliertypesdetails', {id: row.id});
    };
}]);

