'use strict';

/**
 * Controller for user menu
 */
app.controller('UserMenuFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$userMenuDataFactory','toaster','$filter','$uibModal','$q','SweetAlert',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $userMenuDataFactory, toaster, $filter, $uibModal, $q, SweetAlert) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showUserMenu = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.contentSize = 12;
            $rootScope.contentOffset = 0;
        }, 1500);

        $scope.oneAtATime = true;
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false,
        };

        $scope.goPublication = function () {
            $state.go('front.mytenders.new', {locale: $rootScope.locale});
        };

        $scope.goTender = function () {
            $state.go('front.tenders', {section: 'Tender', locale: $rootScope.locale});
        };

        $scope.goProposal = function () {
            $state.go('front.tenders', {section: 'Consultation', locale: $rootScope.locale});
        };

        $scope.goSuppliers = function () {
            $state.go('front.suppliers', {locale: $rootScope.locale});
        };

        $scope.goBuyers = function () {
            $state.go('front.buyers', {locale: $rootScope.locale});
        };
    }


]);