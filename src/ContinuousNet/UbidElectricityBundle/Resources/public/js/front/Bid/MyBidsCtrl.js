'use strict';

/**
 * Controller for Bids List
 */

app.controller('MyBidsCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {


    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('BidsCtrl', {$scope:$scope}));

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'bid.id', filter: { 'bid.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'attachment_files', title: $filter('translate')('content.list.fields.ATTACHMENTFILES'), sortable: 'bid.attachmentFiles', filter: { 'bid.attachmentFiles': 'text' }, show: ($scope.getParamValue('attachment_files_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tender', 'class': 'has_one', title: $filter('translate')('content.list.fields.TENDER'), sortable: 'tender.title', filter: { 'bid.tender': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenders(), show: ($scope.getParamValue('tender_id_show_filed', true) && true), displayInList: true, displayField: 'title', state: 'front.mytenders.details' },
            { field: 'supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.SUPPLIER'), sortable: 'supplier.name', filter: { 'bid.supplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: ($scope.getParamValue('supplier_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'front.mysuppliers.details' },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'bid.title', filter: { 'bid.title': 'text' }, show: ($scope.getParamValue('title_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'bid.slug', filter: { 'bid.slug': 'text' }, show: ($scope.getParamValue('slug_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'bid.reference', filter: { 'bid.reference': 'text' }, show: false, displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'bid.description', filter: { 'bid.description': 'text' }, show: ($scope.getParamValue('description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'bid.status', filter: { 'bid.status': 'select' }, show:true, displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="bidStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'>[[row.status]]</span>') },
            { field: 'note', title: $filter('translate')('content.list.fields.NOTE'), sortable: 'bid.note', filter: { 'bid.note': 'text' }, show: ($scope.getParamValue('note_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'total_cost', title: $filter('translate')('content.list.fields.TOTALCOST'), sortable: 'bid.totalCost', filter: { 'bid.totalCost': 'number' }, show: ($scope.getParamValue('total_cost_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'bid.address', filter: { 'bid.address': 'text' }, show: ($scope.getParamValue('address_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'bid.email', filter: { 'bid.email': 'text' }, show: ($scope.getParamValue('email_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'bid.phone', filter: { 'bid.phone': 'text' }, show: ($scope.getParamValue('phone_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'bid.createdAt', filter: { 'bid.createdAt': 'text' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'bid.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'bid.modifiedAt', filter: { 'bid.modifiedAt': 'text' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'bid.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                +'<div class="btn-group pull-right">'
                +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
                +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                +'</div>') }
        ];
    };

    $scope.setCols();



    $scope.list = function() {
        $state.go('front.mybids.list');
    };

    $scope.add = function() {
        $state.go('front.mybids.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mybids.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mybids.details', {id: row.id});
    };
}]);

