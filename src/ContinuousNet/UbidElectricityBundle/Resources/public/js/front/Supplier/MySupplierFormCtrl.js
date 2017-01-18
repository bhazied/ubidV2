'use strict';

/**
 * Controller for Supplier Form
 */

app.controller('MySupplierFormCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$supplierTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$suppliersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $supplierTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $suppliersDataFactory) {

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

