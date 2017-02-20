'use strict';

/**
 * Controller for Bids List
 */

app.controller('BidsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {

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
    }, {
        id: 'Selected',
        title: $filter('translate')('content.list.fields.statuses.SELECTED'),
        css: 'primary'
    }, {
        id: 'Rejected',
        title: $filter('translate')('content.list.fields.statuses.REJECTED'),
        css: 'success'
    }, {
        id: 'Shortlisted',
        title: $filter('translate')('content.list.fields.statuses.SHORTLISTED'),
        css: 'warning'
    }, {
        id: 'Qualified',
        title: $filter('translate')('content.list.fields.statuses.QUALIFIED'),
        css: 'danger'
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
            $tendersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[tender.id]': 'desc'}).$promise.then(function(data) {
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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.bidsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.bidsParams)) {
           $localStorage.bidsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.bidsParams[param]) && $localStorage.bidsParams[param] != null) {
            return $localStorage.bidsParams[param];
        } else {
            $localStorage.bidsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'bid.id', filter: { 'bid.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'attachment_files', title: $filter('translate')('content.list.fields.ATTACHMENTFILES'), sortable: 'bid.attachmentFiles', filter: { 'bid.attachmentFiles': 'text' }, show: $scope.getParamValue('attachment_files_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'tender', 'class': 'has_one', title: $filter('translate')('content.list.fields.TENDER'), sortable: 'tender.title', filter: { 'bid.tender': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenders(), show: $scope.getParamValue('tender_id_show_filed', true), displayInList: true, displayField: 'title', state: 'app.marketplace.tendersdetails' },
            { field: 'supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.SUPPLIER'), sortable: 'supplier.name', filter: { 'bid.supplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: $scope.getParamValue('supplier_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.marketplace.suppliersdetails' },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'bid.title', filter: { 'bid.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'bid.slug', filter: { 'bid.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'bid.reference', filter: { 'bid.reference': 'text' }, show: $scope.getParamValue('reference_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'bid.description', filter: { 'bid.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'bid.status', filter: { 'bid.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="bidStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'note', title: $filter('translate')('content.list.fields.NOTE'), sortable: 'bid.note', filter: { 'bid.note': 'text' }, show: $scope.getParamValue('note_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'total_cost', title: $filter('translate')('content.list.fields.TOTALCOST'), sortable: 'bid.totalCost', filter: { 'bid.totalCost': 'number' }, show: $scope.getParamValue('total_cost_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'bid.address', filter: { 'bid.address': 'text' }, show: $scope.getParamValue('address_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'bid.email', filter: { 'bid.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'bid.phone', filter: { 'bid.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'bid.createdAt', filter: { 'bid.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'bid.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'bid.modifiedAt', filter: { 'bid.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'bid.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('bidsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('bidsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('bidsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('bidsCount', $scope.count);
    $scope.sorting = {'bid.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('bidsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('bidsFilter', $scope.filter);
    $scope.setParamValue('bidsPage', $scope.page);
    $scope.setParamValue('bidsCount', $scope.count);
    $scope.setParamValue('bidsSorting', $scope.sorting);
    $scope.setParamValue('bidsFilter', $scope.filter);
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
            $scope.setParamValue('bidsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('bidsPage', current);
            $scope.setParamValue('bidsCount', limit);
            $scope.setParamValue('bidsSorting', order_by);
            $scope.setParamValue('bidsFilter', filters);
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
            return $bidsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERBID'),
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
                $bidsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.BIDDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.BIDNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.BIDNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.bidsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.bidsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.bidsdetails', {id: row.id});
    };
}]);

