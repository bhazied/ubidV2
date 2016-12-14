'use strict';

/**
 * Controller for user login
 */
app.controller('LoginFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory','toaster','$filter',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory, toaster, $filter) {

        $scope.resetAccess = function(){
            if ($localStorage.access_token) {
                delete $localStorage.access_token;
            }
            delete  $localStorage.user;
            $scope.status = '';
            $scope.user = {};

        }
        $scope.submit = function () {
            $scope.user = {email: $scope.email, password: $scope.password};
            $loginDataFactory.check($scope.user).$promise.then(function(data) {
                if (data.user.roles.indexOf('ROLE_SUBSCRIBER') == -1) {
                    $scope.status = 'error';
                    toaster.pop('error', $filter('translate')('title.error.LOGIN'), $filter('translate')('message.error.LOGIN'));
                    return;
                }
                toaster.pop('success', $filter('translate')('title.success.LOGIN'), $filter('translate')('message.success.LOGIN'));
                $scope.status = 'welcome';
                $localStorage.access_token = data.token;
                $scope.user = $localStorage.user = $rootScope.user = data.user;
                $timeout(function() {
                    $rootScope.loggedIn = true;
                    $state.go('front.usermenu');
                }, 1000);
            }, function(error) {
                $scope.status = 'error';
                toaster.pop('error', $filter('translate')('title.error.LOGIN'), $filter('translate')('message.error.LOGIN'));
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

    }]);
