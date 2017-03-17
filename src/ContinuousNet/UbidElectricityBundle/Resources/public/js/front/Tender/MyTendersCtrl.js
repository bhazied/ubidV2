'use strict';

/**
 * Controller for Tenders List
 */

app.controller('MyTendersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyersDataFactory', '$regionsDataFactory', '$countriesDataFactory', '$sectorsDataFactory', '$tenderTypesDataFactory', '$biddingTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$tendersDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyersDataFactory, $regionsDataFactory, $countriesDataFactory, $sectorsDataFactory, $tenderTypesDataFactory, $biddingTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $tendersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    }, 1500);

    angular.extend(this, $controller('TendersCtrl', {$scope:$scope}));

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'buyer', title: $filter('translate')('content.list.fields.BUYER'), sortable: 'buyer.name', filter: { 'tender.buyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: true, displayField: 'name', state: 'app.marketplace.buyersdetails' },
            { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'tender.reference', filter: { 'tender.reference': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'tender_type', title: $filter('translate')('content.list.fields.TENDERTYPE'), sortable: 'tender_type.name', filter: { 'tender.tenderType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenderTypes(), show: true, displayField: 'name', state: 'app.lists.tendertypesdetails' },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'tender.title', filter: { 'tender.title': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'bidding_type', title: $filter('translate')('content.list.fields.BIDDINGTYPE'), sortable: 'bidding_type.name', filter: { 'tender.biddingType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBiddingTypes(), show: true, displayField: 'name', state: 'app.lists.biddingtypesdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                +'<div class="btn-group pull-right">'
                +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
                +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                +'</div>') }
        ];
    };

    $scope.setCols();


    $scope.add = function() {
        $state.go('front.mytenders.new');
    };

    $scope.edit = function(row) {
        $state.go('front.mytenders.edit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('front.mytenders.details', {id: row.id});
    };

}]);

