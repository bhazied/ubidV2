'use strict';

/**
 * Controller for Bid Form
 */

app.controller('ApplyTenderCtrl', ['$scope', '$rootScope','$controller', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
    function($scope, $rootScope, $controller, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {


        angular.extend(this, $controller('BidFormCtrl', {$scope:$scope}));
        $scope.enableFormAlert = false;
        $scope.tender = 0;
        if(angular.isDefined($stateParams.id)){
            //$scope.bid = {};
            $scope.tender = $stateParams.id;
            $scope.bid.tender = $stateParams.id;
        };
        $scope.bid.status = 'Online'

        $scope.list = function() {
            $state.go('front.tenders' ,{section:'Tender'});
        };

    }]);