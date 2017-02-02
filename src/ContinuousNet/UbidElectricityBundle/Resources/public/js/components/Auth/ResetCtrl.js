'use strict';

/**
 * Controller for set new password
 */
app.controller('ResetCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$resetPasswordDataFactory', '$stateParams',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $resetPasswordDataFactory, $stateParams) {

        if ($localStorage.access_token) {
            delete $localStorage.access_token;
        }

        $scope.confrimation = '';
        $scope.status = '';

        $scope.password = {
            new: {
                first: '',
                second: ''
            }
        };

        $scope.showForm = false;

        $scope.submit = function () {
            var data = {
                locale: $localStorage.language,
                token: $stateParams.token,
                'new': $scope.password.new
            };
            $resetPasswordDataFactory.reset(data).$promise.then(function(data) {
                if (data.status) {
                    $scope.status = 'success';
                    $scope.showForm = false;
                    if (data.user.roles.indexOf('ROLE_SUBSCRIBER') == -1) {
                        $localStorage.access_token = data.token;
                        $scope.user = $localStorage.user = $rootScope.user = data.user;
                        $scope.authenticated = true;
                    }
                } else {
                    $scope.status = 'error';
                }
            }, function(error) {
                $scope.status = 'error';
            });
        };

        if (angular.isDefined($stateParams.token)) {
            $resetPasswordDataFactory.checkConfirmationToken({locale: $localStorage.language, token: $stateParams.token}).$promise.then(function(data) {
                $timeout(function(){
                    $scope.message = data.message;
                    if (data.status) {
                        $scope.showForm = true;
                    } else {
                        $scope.showForm = false;
                        $scope.status = 'error';
                    }
                }, 2000);
            });
        } else {
            $scope.status = 'warning';
        }

    }
]);
