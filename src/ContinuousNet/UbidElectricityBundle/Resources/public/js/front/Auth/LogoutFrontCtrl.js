'use strict';

/**
 * Controller for user lougout
 */
app.controller('LogoutFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory','toaster','$filter',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory, toaster, $filter) {

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
