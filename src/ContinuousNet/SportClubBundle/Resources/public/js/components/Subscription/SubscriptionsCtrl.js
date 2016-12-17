'use strict';

/**
 * Controller for Subscriptions List
 */

app.controller('SubscriptionsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$visitsDataFactory', '$packagesDataFactory', '$pricesDataFactory', '$usersDataFactory', '$subscriptionsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $visitsDataFactory, $packagesDataFactory, $pricesDataFactory, $usersDataFactory, $subscriptionsDataFactory) {

    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Initialized',
        title: $filter('translate')('content.list.fields.statuses.INITIALIZED'),
        css: 'primary'
    }, {
        id: 'PaymentSuccess',
        title: $filter('translate')('content.list.fields.statuses.PAYMENTSUCCESS'),
        css: 'success'
    }, {
        id: 'PaymentFailed',
        title: $filter('translate')('content.list.fields.statuses.PAYMENTFAILED'),
        css: 'warning'
    }, {
        id: 'DeliveredSuccess',
        title: $filter('translate')('content.list.fields.statuses.DELIVEREDSUCCESS'),
        css: 'danger'
    }, {
        id: 'DeliveredFailed',
        title: $filter('translate')('content.list.fields.statuses.DELIVEREDFAILED'),
        css: 'default'
    }];

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.visits = [];
    $scope.visitsLoaded = false;

    $scope.getVisits = function() {
        $scope.visitsLoaded = true;
        if ($scope.visits.length == 0) {
            $scope.visits.push({id: '', title: $filter('translate')('content.form.messages.SELECTVISIT')});
            var def = $q.defer();
            $visitsDataFactory.query({offset: 0, limit: 10000, 'order_by[visit.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.visits.push({
                                id: data.results[i].id,
                                title: data.results[i].ip
                            });
                        }
                        def.resolve($scope.visits);
                    }
                });
            });
            return def;
        } else {
            return $scope.visits;
        }
    };

    $scope.getVisits();

    $scope.packages = [];
    $scope.packagesLoaded = false;

    $scope.getPackages = function() {
        $scope.packagesLoaded = true;
        if ($scope.packages.length == 0) {
            $scope.packages.push({id: '', title: $filter('translate')('content.form.messages.SELECTPACKAGE')});
            var def = $q.defer();
            $packagesDataFactory.query({offset: 0, limit: 10000, 'order_by[package.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.packages.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.packages);
                    }
                });
            });
            return def;
        } else {
            return $scope.packages;
        }
    };

    $scope.getPackages();

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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.subscriptionsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.subscriptionsParams)) {
           $localStorage.subscriptionsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.subscriptionsParams[param]) && $localStorage.subscriptionsParams[param] != null) {
            return $localStorage.subscriptionsParams[param];
        } else {
            $localStorage.subscriptionsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'subscription.id', filter: { 'subscription.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'visit', title: $filter('translate')('content.list.fields.VISIT'), sortable: 'visit.ip', filter: { 'subscription.visit': 'select' }, getValue: $scope.linkValue, filterData: $scope.getVisits(), show: $scope.getParamValue('visit_id_show_filed', true), displayField: 'ip', state: 'app.statistics.visitsdetails' },
            { field: 'package', title: $filter('translate')('content.list.fields.PACKAGE'), sortable: 'package.name', filter: { 'subscription.package': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPackages(), show: $scope.getParamValue('package_id_show_filed', true), displayField: 'name', state: 'app.offer.packagesdetails' },
            { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'subscription.status', filter: { 'subscription.status': 'select' }, show: $scope.getParamValue('status_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'subscription.reference', filter: { 'subscription.reference': 'text' }, show: $scope.getParamValue('reference_show_filed', true), getValue: $scope.textValue },
            { field: 'token', title: $filter('translate')('content.list.fields.TOKEN'), sortable: 'subscription.token', filter: { 'subscription.token': 'text' }, show: $scope.getParamValue('token_show_filed', true), getValue: $scope.textValue },
            { field: 'msisdn', title: $filter('translate')('content.list.fields.MSISDN'), sortable: 'subscription.msisdn', filter: { 'subscription.msisdn': 'text' }, show: $scope.getParamValue('msisdn_show_filed', true), getValue: $scope.textValue },
            { field: 'voucher', title: $filter('translate')('content.list.fields.VOUCHER'), sortable: 'subscription.voucher', filter: { 'subscription.voucher': 'text' }, show: $scope.getParamValue('voucher_show_filed', false), getValue: $scope.textValue },
            { field: 'serial_number', title: $filter('translate')('content.list.fields.SERIALNUMBER'), sortable: 'subscription.serialNumber', filter: { 'subscription.serialNumber': 'text' }, show: $scope.getParamValue('serial_number_show_filed', false), getValue: $scope.textValue },
            { field: 'amount', title: $filter('translate')('content.list.fields.AMOUNT'), sortable: 'subscription.amount', filter: { 'subscription.amount': 'number' }, show: $scope.getParamValue('amount_show_filed', false), getValue: $scope.textValue },
            { field: 'currency', title: $filter('translate')('content.list.fields.CURRENCY'), sortable: 'subscription.currency', filter: { 'subscription.currency': 'text' }, show: $scope.getParamValue('currency_show_filed', false), getValue: $scope.textValue },
            { field: 'duration', title: $filter('translate')('content.list.fields.DURATION'), sortable: 'subscription.duration', filter: { 'subscription.duration': 'number' }, show: $scope.getParamValue('duration_show_filed', false), getValue: $scope.textValue },
            { field: 'start_date', title: $filter('translate')('content.list.fields.STARTDATE'), sortable: 'subscription.startDate', filter: { 'subscription.startDate': 'number' }, show: $scope.getParamValue('start_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_date', title: $filter('translate')('content.list.fields.ENDDATE'), sortable: 'subscription.endDate', filter: { 'subscription.endDate': 'number' }, show: $scope.getParamValue('end_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'price', title: $filter('translate')('content.list.fields.PRICE'), sortable: 'price.name', filter: { 'subscription.price': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPrices(), show: $scope.getParamValue('price_id_show_filed', false), displayField: 'name', state: 'app.offer.pricesdetails' },
            { field: 'price_value', title: $filter('translate')('content.list.fields.PRICEVALUE'), sortable: 'subscription.priceValue', filter: { 'subscription.priceValue': 'number' }, show: $scope.getParamValue('price_value_show_filed', false), getValue: $scope.textValue },
            { field: 'user_agent', title: $filter('translate')('content.list.fields.USERAGENT'), sortable: 'subscription.userAgent', filter: { 'subscription.userAgent': 'text' }, show: $scope.getParamValue('user_agent_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'subscription.createdAt', filter: { 'subscription.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'subscription.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'subscription.modifiedAt', filter: { 'subscription.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'subscription.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('subscriptionsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('subscriptionsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('subscriptionsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('subscriptionsCount', $scope.count);
    $scope.sorting = {'subscription.id': 'asc'};
    $scope.sorting = $scope.getParamValue('subscriptionsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('subscriptionsFilter', $scope.filter);
    $scope.setParamValue('subscriptionsPage', $scope.page);
    $scope.setParamValue('subscriptionsCount', $scope.count);
    $scope.setParamValue('subscriptionsSorting', $scope.sorting);
    $scope.setParamValue('subscriptionsFilter', $scope.filter);
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
            $scope.setParamValue('subscriptionsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('subscriptionsPage', current);
            $scope.setParamValue('subscriptionsCount', limit);
            $scope.setParamValue('subscriptionsSorting', order_by);
            $scope.setParamValue('subscriptionsFilter', filters);
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
            return $subscriptionsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSUBSCRIPTION'),
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
                $subscriptionsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.SUBSCRIPTIONDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.SUBSCRIPTIONNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.SUBSCRIPTIONNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.offer.subscriptionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.offer.subscriptionsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.offer.subscriptionsdetails', {id: row.id});
    };
}]);

