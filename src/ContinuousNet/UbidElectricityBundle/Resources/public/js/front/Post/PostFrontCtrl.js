app.controller('PostFrontCtrl', ['$rootScope', '$scope', '$controller', '$state', 'SweetAlert','toaster', '$filter', 'FileUploader', function ($rootScope, $scope, $controller, $state, SweetAlert, toaster, $filter, FileUploader) {
    angular.extend(this, $controller('PostCtrl', {$scope:$scope}));

    $scope.post = {};
    if (angular.isDefined($stateParams.slug)) {
        var $params = {
            filters : {slug: $stateParams.slug}
        };
        $postsDataFactory.query($params).$promise.then(function(data) {
            $scope.post = data;
        });
    }

    console.log($scope.post);
}]);