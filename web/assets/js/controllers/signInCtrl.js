'use strict';

/**
 * Controller for user login
*/
app.controller('SignInCtrl', ['$scope', '$rootScope', '$http', '$localStorage', '$state', '$timeout',
function ($scope, $rootScope, $http, $localStorage, $state, $timeout) {
    
    if ($localStorage.access_token) {
        delete $localStorage.access_token;
    }
            
    $scope.status = '';
    $scope.user = {};
    
    $scope.submit = function () {
        $scope.user = {email: $scope.email, password: $scope.password};
        $http.post($rootScope.app.apiURL + 'login_check', $scope.user)
        .success(function (data, status, headers, config) {
            $scope.status = 'welcome';
            $localStorage.access_token = data.token;
            $scope.user = $localStorage.user = $rootScope.user = data.user;
            $timeout(function(){
                $state.go('app.dashboard');
            }, 1000);
        })
        .error(function (data, status, headers, config) {
            $scope.status = 'error';
        });
    };

}]);
