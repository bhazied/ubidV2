'use strict';
app.controller('tenderCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q','$filter','$tendersFrontDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $tendersFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 8;
            $rootScope.contentOffset = 2;
        }, 1000);

        $scope.currentDate = new Date();

        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');

        $scope.tenderLoaded = false;
        $scope.tender = {};
        $scope.getTender = function () {
            if(angular.isDefined($stateParams.id)){
                var def = $q.defer();
                $timeout(function () {
                   $scope.tenderLoaded = true;
                    $tendersFrontDataFactory.getTender({id: $stateParams.id, locale: $localStorage.language}).$promise.then(function (data) {
                        $scope.tender = data;
                    });
                    def.resolve($scope.tender);
                    return def;
                });
            }
        }

        $scope.getTender();
        console.log($rootScope.user);
    }]);

app.directive("myTenderShow",['$rootScope','$localStorage', function($rootScope, $localStorage){
    return {
        restrict: 'E',
        scope:{
            tender : '=tenderinfo'
        },
        templateUrl: "/bundles/ubidelectricity/js/front/Tender/show-tender.html"
    }
}]);