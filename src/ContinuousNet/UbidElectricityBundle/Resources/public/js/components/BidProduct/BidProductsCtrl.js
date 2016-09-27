'use strict';

/**
 * Controller for Bid Products List
 */

app.controller('BidProductsCtrl', ['$scope', '$rootScope', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tenderProductsDataFactory', '$bidsDataFactory', '$usersDataFactory', '$bidProductsDataFactory',
function($scope, $rootScope, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tenderProductsDataFactory, $bidsDataFactory, $usersDataFactory, $bidProductsDataFactory) {

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

    $scope.tenderProducts = [];
    $scope.tenderProductsLoaded = false;

    $scope.getTenderProducts = function() {
        $scope.tenderProductsLoaded = true;
        if ($scope.tenderProducts.length == 0) {
            $scope.tenderProducts.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDERPRODUCT')});
            var def = $q.defer();
            $tenderProductsDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderProduct.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.tenderProducts.push({
                                id: data.results[i].id,
                                title: data.results[i].title
                            });
                        }
                        def.resolve($scope.tenderProducts);
                    }
                });
            });
            return def;
        } else {
            return $scope.tenderProducts;
        }
    };

    $scope.getTenderProducts();

    $scope.bids = [];
    $scope.bidsLoaded = false;

    $scope.getBids = function() {
        $scope.bidsLoaded = true;
        if ($scope.bids.length == 0) {
            $scope.bids.push({id: '', title: $filter('translate')('content.form.messages.SELECTBID')});
            var def = $q.defer();
            $bidsDataFactory.query({offset: 0, limit: 10000, 'order_by[bid.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.bids.push({
                                id: data.results[i].id,
                                title: data.results[i].title
                            });
                        }
                        def.resolve($scope.bids);
                    }
                });
            });
            return def;
        } else {
            return $scope.bids;
        }
    };

    $scope.getBids();

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
        $localStorage.bidProductsParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.bidProductsParams)) {
           $localStorage.bidProductsParams = {};
        }
        if (angular.isDefined($location.search()[param])) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.bidProductsParams[param])) {
            return $localStorage.bidProductsParams[param];
        } else {
            $localStorage.bidProductsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'bidProduct.id', filter: { 'bidProduct.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'tender_product', title: $filter('translate')('content.list.fields.TENDERPRODUCT'), sortable: 'tender_product.title', filter: { 'bidProduct.tenderProduct': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenderProducts(), show: $scope.getParamValue('tender_product_id_show_filed', true), displayField: 'title', state: 'app.marketplace.tenderproductsdetails' },
            { field: 'bid', title: $filter('translate')('content.list.fields.BID'), sortable: 'bid.title', filter: { 'bidProduct.bid': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBids(), show: $scope.getParamValue('bid_id_show_filed', true), displayField: 'title', state: 'app.marketplace.bidsdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'bidProduct.name', filter: { 'bidProduct.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'bidProduct.slug', filter: { 'bidProduct.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'brand', title: $filter('translate')('content.list.fields.BRAND'), sortable: 'bidProduct.brand', filter: { 'bidProduct.brand': 'text' }, show: $scope.getParamValue('brand_show_filed', true), getValue: $scope.textValue },
            { field: 'model', title: $filter('translate')('content.list.fields.MODEL'), sortable: 'bidProduct.model', filter: { 'bidProduct.model': 'text' }, show: $scope.getParamValue('model_show_filed', true), getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'bidProduct.description', filter: { 'bidProduct.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'bidProduct.status', filter: { 'bidProduct.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'unit_cost', title: $filter('translate')('content.list.fields.UNITCOST'), sortable: 'bidProduct.unitCost', filter: { 'bidProduct.unitCost': 'number' }, show: $scope.getParamValue('unit_cost_show_filed', false), getValue: $scope.textValue },
            { field: 'quantity', title: $filter('translate')('content.list.fields.QUANTITY'), sortable: 'bidProduct.quantity', filter: { 'bidProduct.quantity': 'number' }, show: $scope.getParamValue('quantity_show_filed', false), getValue: $scope.textValue },
            { field: 'duration', title: $filter('translate')('content.list.fields.DURATION'), sortable: 'bidProduct.duration', filter: { 'bidProduct.duration': 'number' }, show: $scope.getParamValue('duration_show_filed', false), getValue: $scope.textValue },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'bidProduct.ordering', filter: { 'bidProduct.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'bidProduct.createdAt', filter: { 'bidProduct.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'bidProduct.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'bidProduct.modifiedAt', filter: { 'bidProduct.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'bidProduct.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('bidProductsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('bidProductsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.count = 50; // count per page
    $scope.sorting = {'bidProduct.createdAt': 'desc'};
    $scope.filter = {
    };
    $scope.tableParams = {
        page: $scope.getParamValue('bidProductsPage', $scope.page),
        count: $scope.getParamValue('bidProductsCount', $scope.count),
        sorting: $scope.getParamValue('bidProductsSorting', $scope.sorting),
        filter: $scope.getParamValue('bidProductsFilter', $scope.filter)
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('bidProductsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('bidProductsPage', current);
            $scope.setParamValue('bidProductsCount', limit);
            $scope.setParamValue('bidProductsSorting', order_by);
            $scope.setParamValue('bidProductsFilter', filters);
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
            return $bidProductsDataFactory.query(http_params).$promise.then(function(data) {
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERBIDPRODUCT'),
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
                $bidProductsDataFactory.remove(row).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.BIDPRODUCTDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.BIDPRODUCTNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.BIDPRODUCTNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.bidproductsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.bidproductsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.bidproductsdetails', {id: row.id});
    };
}]);

