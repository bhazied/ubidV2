'use strict';

/**
 * Controller for reset password
 */
app.controller('ResetPasswordCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$resetPasswordDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $resetPasswordDataFactory) {

        if ($localStorage.access_token) {
            delete $localStorage.access_token;
        }

        $scope.status = '';
        $scope.user = {};

        $scope.submit = function () {
            $scope.status = 'progress';
            $scope.user = {locale: $localStorage.language, email: $scope.email};
            $resetPasswordDataFactory.request($scope.user).$promise.then(function(data) {
                if (data.status) {
                    $scope.status = 'success';
                } else {
                    $scope.status = 'error';
                }
            }, function(error) {
                $scope.status = 'error';
            });
        };

    }
]);
