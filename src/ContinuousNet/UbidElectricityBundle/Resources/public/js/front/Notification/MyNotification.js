'use strict';

/**
 * Controller for Messages List
 */

app.controller('MyNotification', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$interval', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$notificationsDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $interval, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $notificationsDataFactory) {

        $scope.notificationsInterval = $interval(function () {
            if ($localStorage.access_token) {
                $scope.getNotifications();
            } else {
                $interval.cancel($scope.notificationsInterval);
            }
        }, 5000);

        $scope.getNotifications = function(){
            $notificationsDataFactory.query({offset: 0, limit: 10000,'order_by[notification.createdAt]': 'desc'}).$promise.then(function(data) {
                $scope.notifications = data.results;
                var countAlert = 0;
                angular.forEach(data.results,function (notification) {
                    if(notification.read == false){
                        countAlert ++;
                    }
                });
                $scope.countAlert = countAlert;
            });
        };


        $scope.viewNotification = function(notification){
            //$('.notification .submenu').css('display',  'none');
            $scope.countAlert --;
            var link = angular.fromJson(notification.link);
            $state.go(link[0], link[1]);
            $notificationsDataFactory.update({id:notification.id,read : true});
            $scope.notifications.splice(notification,1);

        };

        $scope.closeNotification = function(notification){
            $scope.countAlert --;
            $notificationsDataFactory.update({id:notification.id,read : true});
            $scope.notifications.splice(notification,1);

        };



        $scope.markAsRead = function (){
                angular.forEach($scope.notifications,function (notification) {
                    $notificationsDataFactory.update({id:notification.id,read : true});
                });
            $scope.countAlert =0;
        }

    }]);

