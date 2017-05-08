'use strict';

/**
 * Controller for Messages List
 */

app.controller('MyNotification', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$interval', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$notificationsDataFactory','$NotificationFrontDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $interval, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $notificationsDataFactory, $NotificationFrontDataFactory) {

        $scope.notificationsInterval = $interval(function() {
            if ($localStorage.access_token) {
                $scope.getNotifications();
            } else {
                $interval.cancel($scope.notificationsInterval);
            }
        }, 5000);

        $scope.dateFormat = $filter('translate')('formats.DATETIME');

        $scope.getNotifications = function() {
            $notificationsDataFactory.query({offset: 0, limit: 10000,'order_by[notification.createdAt]': 'desc'}).$promise.then(function(data) {
                $scope.notifications = data.results;
                var countAlert = 0;
                angular.forEach(data.results,function (notification) {
                    if (notification.read == false) {
                        countAlert ++;
                    }
                });
                $scope.countAlert = countAlert;
            });
        };

        $scope.viewNotification = function(jsonLink, id) {
            $scope.countAlert--;
            var link = angular.fromJson(jsonLink);
            link[1].locale = $rootScope.locale;
            $state.go(link[0], link[1]);
            $notificationsDataFactory.update({id:id,read : true});
            $scope.removeNotif(id);
        };

        $scope.closeNotification = function(id) {
            $scope.countAlert--;
            $notificationsDataFactory.update({id:id,read : true});
            $scope.removeNotif(id);
        };

        $scope.removeNotif = function (id) {
            var index;
            angular.forEach($scope.notifications, function (value, key) {
               if (value.id == id) {
                   index = key;
               }
            });
            $scope.notifications.splice(index,1);
        };

        $scope.markAsRead = function() {
            $NotificationFrontDataFactory.readAll({locale: $localStorage.language}).$promise.then(function (data) {
                if (data.status == true) {
                    $scope.countAlert =0;
                    return false;
                } else {
                    toaster.pop('error', $filter('translate')('common.ERROR'), data.message);
                    return false;
                }
            }, function (error) {
                toaster.pop('error', $filter('translate')('common.ERROR'), $filter('translate')('front.NOTIFCATIONREADALLERROR'));
                return false;
            });
        };

        $scope.openListNotifications = function($event) {
            if ($scope.notifications.length == 0) {
                $state.go('front.myAlerts.list', {locale: $rootScope.locale});
            } else {
                $event.stopPropagation();
            }
        };

    }]);

