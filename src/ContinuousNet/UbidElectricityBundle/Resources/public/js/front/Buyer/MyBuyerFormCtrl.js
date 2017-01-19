'use strict';

/**
 * Controller for Buyer Form
 */

app.controller('MyBuyerFormCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$buyersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $buyersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    },1500);

    angular.extend(this, $controller('BuyerFormCtrl', {$scope:$scope}));

    $scope.steps = [
        {title : $filter('translate')('front.ADDBUYERSTEP1'), description: $filter('translate')('front.DESCRIPTIONSTEP1'),  id: 1},
        {title : $filter('translate')('front.ADDBUYERSTEP2'), description: $filter('translate')('front.DESCRIPTIONSTEP2'), id: 2}
    ];

    $scope.currentStep = 1;
    $scope.isNext = false;
    $scope.enableFormAlert = false;

    $scope.list = function() {
        $state.go('front.mybuyers.list');
    };
    
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
    //market region dynamic filed
    $scope.marketRegionShowed = 1;
    $scope.marketRegions = [
        {order: 1, model: "first_market_region", name:"firstMarketRegion", id:"buyerFirstMarketRegion", title: $filter('translate')('content.list.fields.FIRSTMARKETREGION')},
    ]
    $scope.marketRegionsInformations = [
        {order: 2, model: "second_market_region", name:"secondMarketRegion", id:"buyerSecondMarketRegion", title: $filter('translate')('content.list.fields.SECONDMARKETREGION')},
        {order: 3, model: "third_market_region", name:"thirdMarketRegion", id:"buyerThirdMarketRegion", title: $filter('translate')('content.list.fields.THIRDMARKETREGION')}
    ];

    $scope.addMarketregion = function (order) {
        var index = order-1;
        $scope.marketRegions.push($scope.marketRegionsInformations[index]);
        $scope.marketRegionShowed++;
    }

    $scope.removeMarketregion = function (order) {
        var index = order-1;
        $scope.marketRegions.splice(index);
        $scope.marketRegionShowed--;
    }

    // market rate dynamic field
    $scope.marketRateShowed = 1;
    $scope.marketRates = [
        {order: 1, model: "first_market_rate", name:"firstMarketRate", id:"buyerFirstMarketRate", title: $filter('translate')('content.list.fields.FIRSTMARKETRATE'), placeholder:$filter('translate')('ENTERFIRSTMARKETRATE')},
    ]
    $scope.marketRateInformations = [
        {order: 2, model: "second_market_rate", name:"secondMarketRate", id:"buyerSecondMarketRate", title: $filter('translate')('content.list.fields.SECONDMARKETRATE'),placeholder:$filter('translate')('ENTERSECONDMARKETRATE')},
        {order: 3, model: "third_market_rate", name:"thirdMarketRate", id:"buyerThirdMarketRate", title: $filter('translate')('content.list.fields.THIRDMARKETRATE'), placeholder:$filter('translate')('ENTERTHIRDMARKETRATE')}
    ];

    $scope.addMarketrate = function (order) {
        var index = order-1;
        $scope.marketRates.push($scope.marketRateInformations[index]);
        $scope.marketRateShowed++;
    }

    $scope.removeMarketrate = function (order) {
        var index = order-1;
        $scope.marketRates.splice(index);
        $scope.marketRateShowed--;
    }

    // totale Revenu range
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

}]);

