app.controller('BuyersFrontCtrl', ['$scope', '$controller', '$state', 'SweetAlert','toaster', '$filter', '$timeout', '$q','$buyersDataFactory', function ($scope, $controller, $state, SweetAlert, toaster, $filter, $timeout, $q, $buyersDataFactory) {
    angular.extend(this, $controller('BuyersCtrl', {$scope:$scope}));

    $scope.buyers = [];
    $scope.pageSize = 10;
    $scope.getAllBuyers = function (page) {
        var limit = page *  $scope.pageSize;
        page = page - 1;
        var offset = page *  $scope.pageSize;
        var params = {
            limit : limit,
            offset: offset
        };
        var def = $q.defer();
            $buyersDataFactory.query(params).$promise.then(function (data) {
                $timeout(function () {
                        $scope.buyers = data.results;
                        $scope.total = data.inlineCount;
                        $scope.currentPage = page + 1;
                        def.resolve($scope.buyers);
                });
            });
            return def;
    }
    $scope.getAllBuyers(1);
}]);