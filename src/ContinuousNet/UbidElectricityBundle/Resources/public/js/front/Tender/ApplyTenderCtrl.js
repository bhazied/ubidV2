'use strict';

/**
 * Controller for Bid Form
 */

app.controller('ApplyTenderCtrl', ['$scope', '$rootScope','$controller', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
    function($scope, $rootScope, $controller, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        }, 2000);

        angular.extend(this, $controller('BidFormCtrl', {$scope:$scope}));
        $scope.enableFormAlert = false;
        $scope.tender = 0;
        $scope.bid = {};
        if(angular.isDefined($stateParams.idTender)){
            $scope.tender = $stateParams.idTender;
            $scope.bid.tender = $stateParams.idTender;
        };
        $scope.bid.status = 'Online';

        $scope.list = function() {
            if (angular.isDefined($localStorage.selectedTender)) {
                $state.go('front.tenders', {section: $localStorage.selectedTender.section, locale: $rootScope.locale});
            } else {
                $state.go('front.tenders', {section: 'Tender', locale: $rootScope.locale});
            }
        };


    }]);