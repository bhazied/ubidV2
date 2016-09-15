'use strict';

/**
 * Controller for lock screen
 */
app.controller('LockScreenCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory) {

        if ($localStorage.access_token) {
            delete $localStorage.access_token;
        }

        $scope.status = '';
        $scope.user = $localStorage.user;

        $scope.submit = function () {
            $scope.user = {email: $localStorage.user.email, password: $scope.password};
            $loginDataFactory.check($scope.user).$promise.then(function(data) {
                $scope.status = 'welcome';
                $localStorage.access_token = data.token;
                $scope.user = $localStorage.user = $rootScope.user = data.user;
                $timeout(function() {
                    $state.go('app.dashboard');
                }, 1000);
            }, function(error) {
                $scope.status = 'error';
            });
        };

    }
]);
