'use strict';

/**
 * Controller for set new password
 */
app.controller('ResetCtrl', ['$interval', '$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$resetPasswordDataFactory', '$stateParams',
    function ($interval, $scope, $rootScope, $localStorage, $state, $timeout, $resetPasswordDataFactory, $stateParams) {

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

        $scope.seconds = 5;

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
                    if (data.user.roles.indexOf('ROLE_SUBSCRIBER') > -1) {
                        /*$scope.interval =  $interval(function () {
                            console.log($scope.seconds);
                            $scope.seconds--;
                            if($scope.seconds < 0){
                                $scope.seconds = 0;
                                $interval.cancel($scope.interval);
                                $state.go('front.login');
                            }
                        }, 1000);*/
                        $timeout(function () {
                            $state.go('front.login');
                        }, 5000);
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
