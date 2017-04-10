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

    $scope.redirect = true;


    $scope.categories = [];
    $scope.getCategories = function() {
        $timeout(function(){
            //if ($scope.categories.length == 0) {
                $scope.categories.push({});
                var def = $q.defer();
                $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
                    //$scope.categories = data.results;
                    data.results = $rootScope.createTree(data.results, 'parent_category', 'name', null, 0);
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTCATEGORY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.categories = data.results;
                    def.resolve($scope.categories);
                    if (angular.isDefined($scope.supplier)) {
                        $scope.buyer.category = $scope.buyer.category || $scope.categories[0].id;
                    }
                });
                return def;
           /* } else {
                return $scope.categories;
            }*/
        });
    };

    $scope.getCategories();

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

    $scope.$watch('buyerCategories', function() {
        if (angular.isDefined($scope.supplier)) {
            var categories = $filter('filter')($scope.categories, $scope.categoriesSearchText);
            if ($scope.supplierCategories) {
                for (var i in categories) {
                    var id = categories[i].id;
                    var index = $scope.buyer.categories.indexOf(id);
                    if (index == -1) {
                        $scope.buyer.categories.push(id);
                    }
                }
            } else {
                for (var i in categories) {
                    var id = categories[i].id;
                    var index = $scope.buyer.categories.indexOf(id);
                    if (index > -1) {
                        $scope.buyer.categories.splice(index, 1);
                    }
                }
            }
        }
        console.log($scope.buyer.categories);
    });


}]);

