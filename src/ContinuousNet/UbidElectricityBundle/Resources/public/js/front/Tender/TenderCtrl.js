'use strict';
app.controller('tenderCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q','$filter','$tendersFrontDataFactory','toaster','$tendersDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $filter, $tendersFrontDataFactory, toaster, $tendersDataFactory) {

        $scope.currentDate = new Date();

        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');

        $scope.loaded = false;
        $scope.tenderLoaded = false;
        $scope.tender = {};
        $scope.getTender = function () {
            if(angular.isDefined($stateParams.id)){
                var def = $q.defer();
                $timeout(function () {
                   $scope.tenderLoaded = true;
                    if(angular.isDefined($localStorage.user)){
                        $tendersDataFactory.get({id: $stateParams.id, locale: $localStorage.language}).$promise.then(function (data) {
                            $scope.tender = data;
                            $rootScope.seo.meta_description = data.description;
                            $rootScope.seo.meta_keywords = data.reference;
                            $rootScope.seo.meta_title = data.title;
                            $scope.loaded = true;
                        });
                    }
                    else {
                        $tendersFrontDataFactory.getTender({id: $stateParams.id, locale: $localStorage.language}).$promise.then(function (data) {
                            $scope.tender = data;
                            $rootScope.seo.meta_description = data.description;
                            $rootScope.seo.meta_keywords = data.reference;
                            $rootScope.seo.meta_title = data.title;
                            $scope.loaded = true;
                        });
                    }

                    def.resolve($scope.tender);
                    return def;
                });
            }
        }

        $scope.getTender();
        $scope.disableBookmark = false;
        $scope.addBookmark = function () {
            $scope.disableBookmark = true;
            var $params = {
                id: $scope.tender.id,
                locale: $localStorage.language
            }
            $tendersFrontDataFactory.bookmarkTender($params).$promise.then(function (data) {
                if(data.status == true){
                    toaster.pop('success', $filter('translate')('content.list.BOOKMARKNOTIFICATION'), data.message);
                }
                else{
                    toaster.pop('error', $filter('translate')('content.list.BOOKMARKNOTIFICATION'), data.message);
                }
                $scope.disableBookmark = false;
            });
        }
        
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