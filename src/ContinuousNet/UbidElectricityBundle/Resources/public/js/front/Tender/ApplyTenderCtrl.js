'use strict';

/**
 * Controller for Bid Form
 */

app.controller('ApplyTenderCtrl', ['$scope', '$rootScope','$controller', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
    function($scope, $rootScope, $controller, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {


        angular.extend(this, $controller('BidFormCtrl', {$scope:$scope}));
        $scope.tender = 0;
        if(angular.isDefined($stateParams.idTender)){
            //$scope.bid = {};
            $scope.tender = $stateParams.idTender;
            $scope.bid.tender = $stateParams.idTender;
        };
        $scope.bid.status = 'Online'

        $scope.list = function() {
            $state.go('front.tenders.list' ,{section:'Tender'});
        };

    }]);