'use strict';

/**
 * Controller for Buyers List
 */

app.controller('MyBuyersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$buyersDataFactory', '$profileDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $buyersDataFactory, $profileDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1500);

        angular.extend(this, $controller('BuyersCtrl', {$scope:$scope}));

        $scope.setCols = function() {
            $scope.cols = [
                { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'buyer.picture', filter: { 'buyer.picture': 'text' }, show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
                { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'buyer.name', filter: { 'buyer.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
                { field: 'buyer_type', title: $filter('translate')('content.list.fields.BUYERTYPE'), sortable: 'buyer_type.name', filter: { 'buyer.buyerType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyerTypes(), show: true, displayField: 'name', state: 'app.lists.buyertypesdetails' },
                { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'buyer.companyName', filter: { 'buyer.companyName': 'text' }, show: true, getValue: $scope.textValue },
                { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'buyer.firstName', filter: { 'buyer.firstName': 'text' }, show: true, getValue: $scope.textValue },
                { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'buyer.lastName', filter: { 'buyer.lastName': 'text' }, show: true, getValue: $scope.textValue },
                { field: 'categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'buyer.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: $scope.getParamValue('categories_show_filed', false), displayInList: true, display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
                { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                    +'<div class="btn-group pull-right">'
                    +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
                    +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
                    +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
                    +'</div>') }
            ];
        };

        $scope.setCols();

        $scope.defaultBuyer = {};

        $scope.getDefaultBuyer = function () {
            var def = $q.defer();
            $profileDataFactory.getProfile({locale: $localStorage.language}).$promise.then(function (data) {
                $timeout(function () {
                    $scope.defaultBuyer = data ;
                    return def.resolve($scope.defaultBuyer);
                });
            });
        };

        $scope.getDefaultBuyer();

        $scope.add = function() {
            $state.go('front.mybuyers.new', {locale: $rootScope.locale});
        };

        $scope.edit = function(row) {
            $state.go('front.mybuyers.edit', {id: row.id, locale: $rootScope.locale});
        };

        $scope.details = function(row) {
            $state.go('front.mybuyers.details', {id: row.id, locale: $rootScope.locale});
        };

    }]);

