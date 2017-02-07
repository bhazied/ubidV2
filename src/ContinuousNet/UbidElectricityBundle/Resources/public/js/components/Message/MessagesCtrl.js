'use strict';

/**
 * Controller for Messages List
 */

app.controller('MessagesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$buyersDataFactory', '$suppliersDataFactory', '$messagesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $buyersDataFactory, $suppliersDataFactory, $messagesDataFactory) {

    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Sent',
        title: $filter('translate')('content.list.fields.statuses.SENT'),
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

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTFROMUSER')});
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

    $scope.buyers = [];
    $scope.buyersLoaded = false;

    $scope.getBuyers = function() {
        $scope.buyersLoaded = true;
        if ($scope.buyers.length == 0) {
            $scope.buyers.push({id: '', title: $filter('translate')('content.form.messages.SELECTFROMBUYER')});
            var def = $q.defer();
            $buyersDataFactory.query({offset: 0, limit: 10000, 'order_by[buyer.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.buyers.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.buyers);
                    }
                });
            });
            return def;
        } else {
            return $scope.buyers;
        }
    };

    $scope.getBuyers();

    $scope.suppliers = [];
    $scope.suppliersLoaded = false;

    $scope.getSuppliers = function() {
        $scope.suppliersLoaded = true;
        if ($scope.suppliers.length == 0) {
            $scope.suppliers.push({id: '', title: $filter('translate')('content.form.messages.SELECTFROMSUPPLIER')});
            var def = $q.defer();
            $suppliersDataFactory.query({offset: 0, limit: 10000, 'order_by[supplier.id]': 'desc'}).$promise.then(function(data) {
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
        $localStorage.messagesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.messagesParams)) {
           $localStorage.messagesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.messagesParams[param]) && $localStorage.messagesParams[param] != null) {
            return $localStorage.messagesParams[param];
        } else {
            $localStorage.messagesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'message.id', filter: { 'message.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), displayInList: true, getValue: $scope.textValue },
            { field: 'from_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.FROMUSER'), sortable: 'from_user.username', filter: { 'message.fromUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('from_user_id_show_filed', true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'from_buyer', 'class': 'has_one', title: $filter('translate')('content.list.fields.FROMBUYER'), sortable: 'from_buyer.name', filter: { 'message.fromBuyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: $scope.getParamValue('from_buyer_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.marketplace.buyersdetails' },
            { field: 'from_supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.FROMSUPPLIER'), sortable: 'from_supplier.name', filter: { 'message.fromSupplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: $scope.getParamValue('from_supplier_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.marketplace.suppliersdetails' },
            { field: 'to_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.TOUSER'), sortable: 'to_user.username', filter: { 'message.toUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('to_user_id_show_filed', true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'to_buyer', 'class': 'has_one', title: $filter('translate')('content.list.fields.TOBUYER'), sortable: 'to_buyer.name', filter: { 'message.toBuyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: $scope.getParamValue('to_buyer_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.marketplace.buyersdetails' },
            { field: 'to_supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.TOSUPPLIER'), sortable: 'to_supplier.name', filter: { 'message.toSupplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: $scope.getParamValue('to_supplier_id_show_filed', true), displayInList: true, displayField: 'name', state: 'app.marketplace.suppliersdetails' },
            { field: 'subject', title: $filter('translate')('content.list.fields.SUBJECT'), sortable: 'message.subject', filter: { 'message.subject': 'text' }, show: $scope.getParamValue('subject_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'body', title: $filter('translate')('content.list.fields.BODY'), sortable: 'message.body', filter: { 'message.body': 'text' }, show: $scope.getParamValue('body_show_filed', false), displayInList: true, getValue: $scope.textValue },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'message.status', filter: { 'message.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="messageStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'is_read', title: $filter('translate')('content.list.fields.ISREAD'), sortable: 'message.isRead', filter: { 'message.isRead': 'select' }, show: $scope.getParamValue('is_read_show_filed', false), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_read ]]"></span>') },
            { field: 'sending_time', title: $filter('translate')('content.list.fields.SENDINGTIME'), sortable: 'message.sendingTime', filter: { 'message.sendingTime': 'text' }, show: $scope.getParamValue('sending_time_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'reading_time', title: $filter('translate')('content.list.fields.READINGTIME'), sortable: 'message.readingTime', filter: { 'message.readingTime': 'text' }, show: $scope.getParamValue('reading_time_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'message.createdAt', filter: { 'message.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'message.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'message.modifiedAt', filter: { 'message.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'message.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('messagesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('messagesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('messagesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('messagesCount', $scope.count);
    $scope.sorting = {'message.sendingTime': 'desc'};
    $scope.sorting = $scope.getParamValue('messagesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('messagesFilter', $scope.filter);
    $scope.setParamValue('messagesPage', $scope.page);
    $scope.setParamValue('messagesCount', $scope.count);
    $scope.setParamValue('messagesSorting', $scope.sorting);
    $scope.setParamValue('messagesFilter', $scope.filter);
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
            $scope.setParamValue('messagesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('messagesPage', current);
            $scope.setParamValue('messagesCount', limit);
            $scope.setParamValue('messagesSorting', order_by);
            $scope.setParamValue('messagesFilter', filters);
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
            return $messagesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMESSAGE'),
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
                $messagesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MESSAGEDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MESSAGENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MESSAGENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.access.messagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.messagesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.access.messagesdetails', {id: row.id});
    };
}]);

