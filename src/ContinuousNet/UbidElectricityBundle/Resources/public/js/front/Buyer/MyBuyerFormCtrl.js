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

    

}]);

