'use strict';

/**
 * Controller for Supplier Form
 */

app.controller('MySupplierFormCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$supplierTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$suppliersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $supplierTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $suppliersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    },1500);

    angular.extend(this, $controller('SupplierFormCtrl', {$scope:$scope}));
    $scope.enableFormAlert = false;
    
    $scope.list = function() {
        $state.go('front.mysuppliers.list');
    };

    $scope.steps = [
        {title : $filter('translate')('front.ADDBUYERSTEP1'), description: $filter('translate')('front.SUPPLIERDESCRIPTIONSTEP1'),  id: 1},
        {title : $filter('translate')('front.ADDBUYERSTEP2'), description: $filter('translate')('front.SUPPLIERDESCRIPTIONSTEP2'), id: 2}
    ];

    $scope.currentStep = 1;
    $scope.isNext = false;
    $scope.enableFormAlert = false;
    

    $scope.goNext = function (form) {
        $scope.toTheTop();
        if(form.$valid){
            form.$setPristine();
            $scope.currentStep++;
        }
        else{
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }

                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }

            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            $scope.isNext = true;
        }
    }

    $scope.goPrevious = function () {
        $scope.toTheTop();
        $scope.currentStep--;
    }

    $scope.goto = function (step, form) {
        if(step == 1){
            $scope.goNext(form);
        }else{
            $scope.goPrevious();
        }
    }

    $scope.currentLanguageId = 0;
    $scope.$watch('languages', function () {
        angular.forEach($scope.languages, function (value, key) {
            if(value.code == $localStorage.language){
                $scope.currentLanguageId = value.id;
                $scope.supplier.language = value.id;
            }
        });
        console.log($scope.supplier);
    }, true);


    //market region dynamic filed
    $scope.marketRegionShowed = 1;
    $scope.marketRegions = [
        {order: 1, model: "first_market_region", name:"firstMarketRegion", id:"supplierFirstMarketRegion", title: $filter('translate')('content.list.fields.FIRSTMARKETREGION')},
    ]
    $scope.marketRegionsInformations = [
        {order: 2, model: "second_market_region", name:"secondMarketRegion", id:"supplierSecondMarketRegion", title: $filter('translate')('content.list.fields.SECONDMARKETREGION')},
        {order: 3, model: "third_market_region", name:"thirdMarketRegion", id:"supplierThirdMarketRegion", title: $filter('translate')('content.list.fields.THIRDMARKETREGION')}
    ];

    $scope.addMarketregion = function (order) {
        var index = order-1;
        $scope.marketRegions.push($scope.marketRegionsInformations[index]);
        $scope.marketRegionShowed++;
        return false;
    }

    $scope.removeMarketregion = function (order) {
        var index = order-1;
        $scope.marketRegions.splice(index);
        $scope.marketRegionShowed--;
        return false;
    }

    // market rate dynamic field
    $scope.marketRateShowed = 1;
    $scope.marketRates = [
        {order: 1, model: "first_market_rate", name:"firstMarketRate", id:"supplierFirstMarketRate", title: $filter('translate')('content.list.fields.FIRSTMARKETRATE'), placeholder:$filter('translate')('ENTERFIRSTMARKETRATE')},
    ]
    $scope.marketRateInformations = [
        {order: 2, model: "second_market_rate", name:"secondMarketRate", id:"supplierSecondMarketRate", title: $filter('translate')('content.list.fields.SECONDMARKETRATE'),placeholder:$filter('translate')('ENTERSECONDMARKETRATE')},
        {order: 3, model: "third_market_rate", name:"thirdMarketRate", id:"supplierThirdMarketRate", title: $filter('translate')('content.list.fields.THIRDMARKETRATE'), placeholder:$filter('translate')('ENTERTHIRDMARKETRATE')}
    ];

    $scope.addMarketrate = function (order) {
        var index = order-1;
        $scope.marketRates.push($scope.marketRateInformations[index]);
        $scope.marketRateShowed++;
        return false;
    }

    $scope.removeMarketrate = function (order) {
        var index = order-1;
        $scope.marketRates.splice(index);
        $scope.marketRateShowed--;
        return false;
    }


    $scope.totalRevenuRange = [
        {
            label: $filter('translate')('front.UNDER5M'),
            value: "Under $5 million",
        },
        {
            label: $filter('translate')('front.BETWEEN5AND10M'),
            value: "$5-$10 million"
        },
        {
            label: $filter('translate')('front.BETWEEN10ANDBELION'),
            value: "$10 million- $1 billion"
        },
        {
            label: $filter('translate')('front.OVER1BILLION'),
            value: "Over $1 billion"
        }
    ];
    /*$scope.$watch('countries', function () {
        if($scope.countries.length > 0){
            var defaultCountry = {id: '', name: $filter('translate')('content.form.messages.SELECTCOUNTRY')};
            $scope.countries.unshift(defaultCountry);
            $scope.supplier.country = defaultCountry.id;
        }
        console.log($scope.countries);
        console.log($scope.supplier);
    });*/

}]);

