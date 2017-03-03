'use strict';

/**
 * Controller for user login
 */
app.controller('LoginFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory', 'toaster', '$filter', '$stateParams','$notificationsDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory, toaster, $filter, $stateParams, $notificationsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 6;
            $rootScope.contentOffset = 3;
        }, 1000);

        $scope.type = angular.isDefined($stateParams.type) ? $stateParams.type : 'Both';

        $scope.resetAccess = function(){
            if ($localStorage.access_token) {
                delete $localStorage.access_token;
            }
            delete  $localStorage.user;
            $scope.status = '';
            $scope.user = $rootScope.user = {};
            $rootScope.loggedIn = false;

        };

        $scope.submit = function () {
            $scope.user = {email: $scope.email, password: $scope.password};
            $loginDataFactory.check($scope.user).$promise.then(function(data) {
                if (data.user.roles.indexOf('ROLE_SUBSCRIBER') == -1) {
                    $scope.status = 'error';
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('login.ERROR'));
                    return;
                }
                toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('login.WELCOME'));
                $scope.status = 'welcome';
                $localStorage.access_token = data.token;
                $scope.user = $localStorage.user = $rootScope.user = data.user;
                $timeout(function() {
                    $rootScope.loggedIn = true;
                    $state.go('front.usermenu');
                }, 1000);
            }, function(error) {
                $scope.status = 'error';
                toaster.pop('error', $filter('translate')('content.common.WARNING'), $filter('translate')('login.ERROR'));
                $rootScope.loggedIn = false;
            });
            return false;
        };

        $scope.logout = function(){
            $scope.resetAccess();
            $timeout(function() {

                $rootScope.loggedIn = false;

                $state.go('front.home');
            }, 1000);
        };

        $scope.myProfile = function () {
            $state.go('front.profile');
        };
        
        $scope.register = function (type) {
            $state.go('front.register', {type: type});
        }
        
        $scope.goLogin = function () {
            $state.go('front.login');
        }


    }]);
