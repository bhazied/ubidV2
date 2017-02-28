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
        }, 1000);

       
        $scope.oneAtATime = true;
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false,
        };
        
        
    }

]);