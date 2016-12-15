'use strict';

/**
 * Controller for user lougout
 */
app.controller('LogoutFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory','toaster','$filter',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory, toaster, $filter) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 6;
            $rootScope.contentOffset = 3;
        });

        $scope.resetAccess = function(){
            if ($localStorage.access_token) {
                delete $localStorage.access_token;
            }
            delete  $localStorage.user;
            $scope.status = '';
            $scope.user = $rootScope.user = {};

        };

        $scope.resetAccess();
        $timeout(function() {
            $rootScope.loggedIn = false;
            $state.go('front.home');
        }, 5000);

    }]);
