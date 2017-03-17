'use strict';

/**
 * Controller for Tender Form
 */

app.controller('MyTenderFormCtrl', ['$scope', '$controller', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$buyersDataFactory', '$regionsDataFactory', '$countriesDataFactory', '$sectorsDataFactory', '$tenderTypesDataFactory', '$biddingTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$tendersDataFactory','$suppliersDataFactory',
function($scope, $controller, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $buyersDataFactory, $regionsDataFactory, $countriesDataFactory, $sectorsDataFactory, $tenderTypesDataFactory, $biddingTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $tendersDataFactory, $suppliersDataFactory) {

    $timeout(function() {
        $rootScope.showSlogan = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.showUserMenu = true;
        $rootScope.contentSize = 10;
        $rootScope.contentOffset = 0;
    }, 1000);

    angular.extend(this, $controller('TenderFormCtrl', {$scope:$scope}));
    $scope.enableFormAlert = false;
    $scope.disableTenderType = false;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    $scope.list = function() {
        $state.go('front.mytenders.list');
    };

    $scope.showSupplier = false;
    $scope.showBuyer = false;
    $scope.tenderTypeMinified = [];

    $scope.getTenderTypeMinified = function () {
        if($scope.tenderTypesLoaded == true){
            angular.forEach($scope.tenderTypes, function(value, key){
                $scope.tenderTypeMinified[key] = {id : value.id, name: value.name};
            });
        }
    }

    $scope.getDefaultProfile = function () {
        var name = "";
        if($localStorage.user.type == "Buyer"){
            name = "Buy";
        }
        else if($localStorage.user.type == "Supplier"){
            name = "Sell";
        }
        angular.forEach($scope.tenderTypeMinified, function(value, key){
            if($filter('uppercase')(value.name) == $filter('uppercase')(name)){
                $scope.tender.tender_type = $scope.tenderTypes[key].id;
                $scope.disableTenderType = true;
            }
        });
    }

    $scope.$watch('tenderTypes', function () {
        $scope.getTenderTypeMinified();
        //$scope.tenderTypeMinified.splice(0,1);
        $scope.getDefaultProfile();
    }, true);

    $scope.showList = function () {
        if($localStorage.user.type == "Supplier"){
            $scope.showSupplier = true;
        }
        else if($localStorage.user.type == "Buyer"){
            $scope.showBuyer = true;
        }else{
            $scope.showBuyer = true;
        }
    }

    $scope.showList();


    $scope.loadProfile = function () {
        angular.forEach($scope.tenderTypeMinified, function(value, key){
            if($scope.tender.tender_type == value.id){
                if($filter('uppercase')(value.name) == "BUYE"){
                    $scope.showBuyer = true;
                    $scope.showSupplier = false;
                }
                else if($filter('uppercase')(value.name) == "SELL"){
                    $scope.showBuyer = false;
                    $scope.showSupplier = true;
                }
            }
        });
    }

}]);

