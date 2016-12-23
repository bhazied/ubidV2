'use strict';

/**
 * Controller for user login
*/
app.controller('LoginCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory',
function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory) {
    
    if ($localStorage.access_token) {
        delete $localStorage.access_token;
    }
            
    $scope.status = '';
    $scope.user = {};
    
    $scope.submit = function () {
        $scope.user = {email: $scope.email, password: $scope.password};
        $loginDataFactory.check($scope.user).$promise.then(function(data) {
            if (data.user.roles.indexOf('ROLE_SUBSCRIBER') > -1) {
                $scope.status = 'error';
                return;
            }
            $scope.status = 'welcome';
            $localStorage.access_token = data.token;
            $scope.user = $localStorage.user = $rootScope.user = data.user;
            $timeout(function() {
                $state.go('app.dashboard');
            }, 1000);
        }, function(error) {
            $scope.status = 'error';
        });
        return false;
	};

}]);
