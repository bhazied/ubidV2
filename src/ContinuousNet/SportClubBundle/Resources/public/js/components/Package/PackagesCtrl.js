'use strict';

/**
 * Controller for Packages List
 */

app.controller('PackagesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$packageTypesDataFactory', '$pricesDataFactory', '$usersDataFactory', '$packagesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $packageTypesDataFactory, $pricesDataFactory, $usersDataFactory, $packagesDataFactory) {

    $scope.modesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Product',
        title: $filter('translate')('content.list.fields.modes.PRODUCT'),
        css: 'primary'
    }, {
        id: 'Subscription',
        title: $filter('translate')('content.list.fields.modes.SUBSCRIPTION'),
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

    $scope.packageTypes = [];
    $scope.packageTypesLoaded = false;

    $scope.getPackageTypes = function() {
        $scope.packageTypesLoaded = true;
        if ($scope.packageTypes.length == 0) {
            $scope.packageTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPACKAGETYPE')});
            var def = $q.defer();
            $packageTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[packageType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.packageTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.packageTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.packageTypes;
        }
    };

    $scope.getPackageTypes();

    $scope.prices = [];
    $scope.pricesLoaded = false;

    $scope.getPrices = function() {
        $scope.pricesLoaded = true;
        if ($scope.prices.length == 0) {
            $scope.prices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRICE')});
            var def = $q.defer();
            $pricesDataFactory.query({offset: 0, limit: 10000, 'order_by[price.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.prices.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.prices);
                    }
                });
            });
            return def;
        } else {
            return $scope.prices;
        }
    };

    $scope.getPrices();

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
            modes: $scope.modesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.packagesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.packagesParams)) {
           $localStorage.packagesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.packagesParams[param]) && $localStorage.packagesParams[param] != null) {
            return $localStorage.packagesParams[param];
        } else {
            $localStorage.packagesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'package.id', filter: { 'package.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'package_type', title: $filter('translate')('content.list.fields.PACKAGETYPE'), sortable: 'package_type.name', filter: { 'package.packageType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPackageTypes(), show: $scope.getParamValue('package_type_id_show_filed', true), displayField: 'name', state: 'app.offer.packagetypesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'package.name', filter: { 'package.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'package.nameAr', filter: { 'package.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'package.nameFr', filter: { 'package.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'package.picture', filter: { 'package.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', true), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'package.description', filter: { 'package.description': 'text' }, show: $scope.getParamValue('description_show_filed', true), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'package.descriptionAr', filter: { 'package.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'package.descriptionFr', filter: { 'package.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'price', title: $filter('translate')('content.list.fields.PRICE'), sortable: 'price.name', filter: { 'package.price': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPrices(), show: $scope.getParamValue('price_id_show_filed', false), displayField: 'name', state: 'app.offer.pricesdetails' },
            { field: 'operator_key', title: $filter('translate')('content.list.fields.OPERATORKEY'), sortable: 'package.operatorKey', filter: { 'package.operatorKey': 'text' }, show: $scope.getParamValue('operator_key_show_filed', false), getValue: $scope.textValue },
            { field: 'mode', title: $filter('translate')('content.list.fields.MODE'), sortable: 'package.mode', filter: { 'package.mode': 'select' }, show: $scope.getParamValue('mode_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.modesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.mode ]]" my-enum-list=\'[[ modes ]]\'></span>') },
            { field: 'is_published', title: $filter('translate')('content.list.fields.ISPUBLISHED'), sortable: 'package.isPublished', filter: { 'package.isPublished': 'select' }, show: $scope.getParamValue('is_published_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_published ]]"></span>') },
            { field: 'duration', title: $filter('translate')('content.list.fields.DURATION'), sortable: 'package.duration', filter: { 'package.duration': 'number' }, show: $scope.getParamValue('duration_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'package.createdAt', filter: { 'package.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'package.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'package.modifiedAt', filter: { 'package.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'package.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('packagesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('packagesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('packagesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('packagesCount', $scope.count);
    $scope.sorting = {'package.name': 'asc'};
    $scope.sorting = $scope.getParamValue('packagesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('packagesFilter', $scope.filter);
    $scope.setParamValue('packagesPage', $scope.page);
    $scope.setParamValue('packagesCount', $scope.count);
    $scope.setParamValue('packagesSorting', $scope.sorting);
    $scope.setParamValue('packagesFilter', $scope.filter);
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
            $scope.setParamValue('packagesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('packagesPage', current);
            $scope.setParamValue('packagesCount', limit);
            $scope.setParamValue('packagesSorting', order_by);
            $scope.setParamValue('packagesFilter', filters);
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
            return $packagesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPACKAGE'),
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
                $packagesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.PACKAGEDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.PACKAGENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.PACKAGENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.offer.packagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.packagesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.offer.packagesdetails', {id: row.id});
    };
}]);

