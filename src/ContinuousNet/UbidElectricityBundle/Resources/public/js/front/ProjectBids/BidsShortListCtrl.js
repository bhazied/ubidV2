'use strict';

/**
 * Controller for Bids List
 */

app.controller('BidsShortListCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory', '$bidsFrontDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory, $bidsFrontDataFactory) {


        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        },1000);

        angular.extend(this, $controller('BidsCtrl', {$scope:$scope}));

        $scope.setCols = function() {
            $scope.cols = [
                { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'bid.id', filter: { 'bid.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
                { field: 'tender', title: $filter('translate')('content.list.fields.TENDER'), sortable: 'tender.title', filter: { 'bid.tender': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenders(), show: $scope.getParamValue('tender_id_show_filed', true), displayField: 'title', state: 'app.marketplace.tendersdetails' },
                { field: 'supplier', title: $filter('translate')('content.list.fields.SUPPLIER'), sortable: 'supplier.name', filter: { 'bid.supplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: $scope.getParamValue('supplier_id_show_filed', true), displayField: 'name', state: 'app.marketplace.suppliersdetails' },
                { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'bid.title', filter: { 'bid.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), getValue: $scope.textValue },
                { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'bid.slug', filter: { 'bid.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
                { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'bid.reference', filter: { 'bid.reference': 'text' }, show: $scope.getParamValue('reference_show_filed', true), getValue: $scope.textValue },
                { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'bid.description', filter: { 'bid.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
                { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'bid.status', filter: { 'bid.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
                { field: 'note', title: $filter('translate')('content.list.fields.NOTE'), sortable: 'bid.note', filter: { 'bid.note': 'text' }, show: $scope.getParamValue('note_show_filed', false), getValue: $scope.textValue },
                { field: 'total_cost', title: $filter('translate')('content.list.fields.TOTALCOST'), sortable: 'bid.totalCost', filter: { 'bid.totalCost': 'number' }, show: $scope.getParamValue('total_cost_show_filed', false), getValue: $scope.textValue },
                { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'bid.address', filter: { 'bid.address': 'text' }, show: $scope.getParamValue('address_show_filed', false), getValue: $scope.textValue },
                { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'bid.email', filter: { 'bid.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), getValue: $scope.textValue },
                { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'bid.phone', filter: { 'bid.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), getValue: $scope.textValue },
                { field: 'attachment_files', title: $filter('translate')('content.list.fields.ATTACHMENTFILES'), sortable: 'bid.attachmentFiles', filter: { 'bid.attachmentFiles': 'text' }, show: $scope.getParamValue('attachment_files_show_filed', false), getValue: $scope.textValue },
                { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'bid.createdAt', filter: { 'bid.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'bid.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'bid.modifiedAt', filter: { 'bid.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'bid.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                    +'<div class="btn-group pull-right">'
                    +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                    +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                    +'</div>') }
            ];
        };

        $scope.setCols();


        $scope.filter = {status: 'shortlisted'};

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
                http_params.locale = $localStorage.language;
                $scope.isLoading = true;
                return $bidsFrontDataFactory.bidsShorListed(http_params).$promise.then(function(data) {
                    console.log(data);
                    $scope.isLoading = false;
                    params.total(data.inlineCount);
                    return data.results;
                });
            }
        });

        $scope.list = function () {
            $state.go('front.projectbids.shortlist');
        }
        
        $scope.details = function(row) {
            $state.go('front.projectbids.bid', {slug: row.tender.slug,id: row.id});
        };
    }]);

