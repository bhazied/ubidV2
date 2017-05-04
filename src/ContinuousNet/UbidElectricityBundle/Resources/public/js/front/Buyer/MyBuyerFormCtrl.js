'use strict';

/**
 * Controller for Buyer Form
 */

app.controller('MyBuyerFormCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$buyersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $buyersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    },2000);

    angular.extend(this, $controller('BuyerFormCtrl', {$scope:$scope}));

    $scope.enableFormAlert = false;
    $scope.redirect = true;

    $scope.list = function() {
        $state.go('front.mybuyers.list');
    };

    $scope.steps = [
        {title : $filter('translate')('front.BUYERFORMTITLESTEP1'), description: $filter('translate')('front.BUYERFORMDESCRIPTIONSTEP1'), id: 1},
        {title : $filter('translate')('front.BUYERFORMTITLESTEP2'), description: $filter('translate')('front.BUYERFORMDESCRIPTIONSTEP2'), id: 2}
    ];

    $scope.currentStep = 1;
    $scope.isNext = false;
    $scope.enableFormAlert = false;
    
    $scope.goNext = function (form) {
        $scope.toTheTop();
        if (form.name.$valid) {
            form.$setPristine();
            $scope.currentStep++;
        } else {
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
    };
    
    $scope.goPrevious = function () {
        $scope.toTheTop();
        $scope.currentStep--;
    };
    
    $scope.goto = function (step, form) {
        if(step == 1) {
            $scope.goNext(form);
        } else {
            $scope.goPrevious();
        }
    };

    $scope.currentLanguageId = 0;
    $scope.$watch('languages', function () {
        angular.forEach($scope.languages, function (value, key) {
            if(value.code == $localStorage.language){
                $scope.currentLanguageId = value.id;
                $scope.buyer.language = value.id;
            }
        });
        console.log($scope.supplier);
    }, true);

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
        return false;
    };

    $scope.removeMarketregion = function (order) {
        var index = order-1;
        $scope.marketRegions.splice(index);
        $scope.marketRegionShowed--;
        return false;
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
        return false;
    }

    $scope.removeMarketrate = function (order) {
        var index = order-1;
        $scope.marketRates.splice(index);
        $scope.marketRateShowed--;
        return false;
    }

    // totale Revenu range
    $scope.totalRevenuRange = [
        {
            label: $filter('translate')('front.UNDER5M'),
            value: "Under 5 million USD",
        },
        {
            label: $filter('translate')('front.BETWEEN5AND10M'),
            value: "5-10 million USD"
        },
        {
            label: $filter('translate')('front.BETWEEN10ANDBELION'),
            value: "10 million USD - 1 billion USD"
        },
        {
            label: $filter('translate')('front.OVER1BILLION'),
            value: "Over 1 billion USD"
        }
    ];

}]);

