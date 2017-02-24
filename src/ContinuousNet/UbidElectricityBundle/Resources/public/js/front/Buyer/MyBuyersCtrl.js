'use strict';

/**
 * Controller for Buyers List
 */

app.controller('MyBuyersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$buyersDataFactory','$profileDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $buyersDataFactory, $profileDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    });

    angular.extend(this, $controller('BuyersCtrl', {$scope:$scope}));

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'supplier.picture', filter: { 'supplier.picture': 'text' }, show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'supplier.name', filter: { 'supplier.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'buyer_type', title: $filter('translate')('content.list.fields.BUYERTYPE'), sortable: 'buyer_type.name', filter: { 'buyer.buyerType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyerTypes(), show: true, displayField: 'name' },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'supplier.companyName', filter: { 'supplier.companyName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'supplier.firstName', filter: { 'supplier.firstName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'supplier.lastName', filter: { 'supplier.lastName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'supplier.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: $scope.getParamValue('categories_show_filed', false), displayInList: true, display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
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
    
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('buyersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('buyersPage', current);
            $scope.setParamValue('buyersCount', limit);
            $scope.setParamValue('buyersSorting', order_by);
            $scope.setParamValue('buyersFilter', filters);
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
            return $buyersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                var buyers = data.results;
                var defaultBuyer = {
                    id : 0,
                    company_name: "Default",
                    country : $scope.defaultBuyer.country,
                    first_name: $scope.defaultBuyer.firstName,
                    last_name: $scope.defaultBuyer.lastName,
                    picture: $scope.defaultBuyer.picture,
                    buyer_type: {name: "default"}
                };
                buyers.unshift(defaultBuyer);
                return buyers;
                //return data.results;
            });
        }
    });

    $scope.add = function() {
            $state.go('front.mybuyers.new');
    };

    $scope.edit = function(row) {
        if(row.id == 0){
            $state.go('front.profile');
        }
        else{
            $state.go('front.mybuyers.edit', {id: row.id});
        }
    };

    $scope.details = function(row) {
        if(row.id == 0){
            $state.go('front.profile');
        }
        else{
            $state.go('front.mybuyers.details', {id: row.id});
        }
    };

}]);

