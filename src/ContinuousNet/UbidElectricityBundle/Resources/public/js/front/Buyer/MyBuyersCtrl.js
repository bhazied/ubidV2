'use strict';

/**
 * Controller for Buyers List
 */

app.controller('MyBuyersCtrl', ['$scope', '$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$buyersDataFactory','$profileDataFactory',
function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $buyersDataFactory, $profileDataFactory) {

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
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'buyer.id', filter: { 'buyer.id': 'number' }, show: false, getValue: $scope.textValue },
            { field: 'buyer_type', title: $filter('translate')('content.list.fields.BUYERTYPE'), sortable: 'buyer_type.name', filter: { 'buyer.buyerType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyerTypes(), show: true, displayField: 'name', state: 'app.lists.buyertypesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'buyer.name', filter: { 'buyer.name': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'buyer.description', filter: { 'buyer.description': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'main_products_services', title: $filter('translate')('content.list.fields.MAINPRODUCTSSERVICES'), sortable: 'buyer.mainProductsServices', filter: { 'buyer.mainProductsServices': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'reference_number', title: $filter('translate')('content.list.fields.REFERENCENUMBER'), sortable: 'buyer.referenceNumber', filter: { 'buyer.referenceNumber': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'buyer.phone', filter: { 'buyer.phone': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'fax', title: $filter('translate')('content.list.fields.FAX'), sortable: 'buyer.fax', filter: { 'buyer.fax': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'website', title: $filter('translate')('content.list.fields.WEBSITE'), sortable: 'buyer.website', filter: { 'buyer.website': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'buyer.email', filter: { 'buyer.email': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'buyer.firstName', filter: { 'buyer.firstName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'buyer.lastName', filter: { 'buyer.lastName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'job', title: $filter('translate')('content.list.fields.JOB'), sortable: 'buyer.job', filter: { 'buyer.job': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'buyer.picture', filter: { 'buyer.picture': 'text' }, show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'buyer.address', filter: { 'buyer.address': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'buyer.zipCode', filter: { 'buyer.zipCode': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'city', title: $filter('translate')('content.list.fields.CITY'), sortable: 'buyer.city', filter: { 'buyer.city': 'text' }, show: false, getValue: $scope.textValue },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'buyer.companyName', filter: { 'buyer.companyName': 'text' }, show: true, getValue: $scope.textValue },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'buyer.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: false, displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'language', title: $filter('translate')('content.list.fields.LANGUAGE'), sortable: 'language.name', filter: { 'buyer.language': 'select' }, getValue: $scope.linkValue, filterData: $scope.getLanguages(), show: false, displayField: 'name', state: 'app.settings.languagesdetails' },
            { field: 'total_revenu', title: $filter('translate')('content.list.fields.TOTALREVENU'), sortable: 'buyer.totalRevenu', filter: { 'buyer.totalRevenu': 'number' }, show: false, getValue: $scope.textValue },
            { field: 'first_market_region', title: $filter('translate')('content.list.fields.FIRSTMARKETREGION'), sortable: 'first_market_region.name', filter: { 'buyer.firstMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: false, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'first_market_rate', title: $filter('translate')('content.list.fields.FIRSTMARKETRATE'), sortable: 'buyer.firstMarketRate', filter: { 'buyer.firstMarketRate': 'number' }, show: false, getValue: $scope.textValue },
            { field: 'second_market_region', title: $filter('translate')('content.list.fields.SECONDMARKETREGION'), sortable: 'second_market_region.name', filter: { 'buyer.secondMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: false, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'second_market_rate', title: $filter('translate')('content.list.fields.SECONDMARKETRATE'), sortable: 'buyer.secondMarketRate', filter: { 'buyer.secondMarketRate': 'number' }, show: false, getValue: $scope.textValue },
            { field: 'third_market_region', title: $filter('translate')('content.list.fields.THIRDMARKETREGION'), sortable: 'third_market_region.name', filter: { 'buyer.thirdMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: false, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'third_market_rate', title: $filter('translate')('content.list.fields.THIRDMARKETRATE'), sortable: 'buyer.thirdMarketRate', filter: { 'buyer.thirdMarketRate': 'number' }, show: false, getValue: $scope.textValue },
            { field: 'is_public', title: $filter('translate')('content.list.fields.ISPUBLIC'), sortable: 'buyer.isPublic', filter: { 'buyer.isPublic': 'select' }, show: false, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_public ]]"></span>') },
            { field: 'enable_comment', title: $filter('translate')('content.list.fields.ENABLECOMMENT'), sortable: 'buyer.enableComment', filter: { 'buyer.enableComment': 'select' }, show: false, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_comment ]]"></span>') },
            { field: 'enable_private_message', title: $filter('translate')('content.list.fields.ENABLEPRIVATEMESSAGE'), sortable: 'buyer.enablePrivateMessage', filter: { 'buyer.enablePrivateMessage': 'select' }, show: false, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_private_message ]]"></span>') },
            { field: 'enable_share', title: $filter('translate')('content.list.fields.ENABLESHARE'), sortable: 'buyer.enableShare', filter: { 'buyer.enableShare': 'select' }, show: false, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_share ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'buyer.createdAt', filter: { 'buyer.createdAt': 'number' }, show: false, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'buyer.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: false, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'buyer.modifiedAt', filter: { 'buyer.modifiedAt': 'number' }, show:  false, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'buyer.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: false, displayField: 'username', state: 'app.access.usersdetails' },
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
                $scope.defaultBuyer =  data ;
                return def.resolve($scope.defaultBuyer);
            });
        });
    }
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
        if(row.id == 0){
            $state.go('front.profile');
        }
        else{
            $state.go('front.mybuyers.new');
        }
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

