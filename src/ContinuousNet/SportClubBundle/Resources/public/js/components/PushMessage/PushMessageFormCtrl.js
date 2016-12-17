'use strict';

/**
 * Controller for Push Message Form
 */

app.controller('PushMessageFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$pushDevicesDataFactory', '$pushNotificationsDataFactory', '$usersDataFactory', '$pushMessagesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $pushDevicesDataFactory, $pushNotificationsDataFactory, $usersDataFactory, $pushMessagesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.deliveryOpened = false;
    $scope.deliveryToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.deliveryOpened = !$scope.deliveryOpened;
    };
    $scope.sendingStatuses = [{
        id: 'Initialized',
        title: $filter('translate')('content.list.fields.sendingstatuses.INITIALIZED'),
        css: 'primary'
    }, {
        id: 'Queued',
        title: $filter('translate')('content.list.fields.sendingstatuses.QUEUED'),
        css: 'success'
    }, {
        id: 'Delivered',
        title: $filter('translate')('content.list.fields.sendingstatuses.DELIVERED'),
        css: 'warning'
    }, {
        id: 'Failed',
        title: $filter('translate')('content.list.fields.sendingstatuses.FAILED'),
        css: 'danger'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');
    $scope.minDate = new Date(1900, 0, 1);
    $scope.maxDate = new Date(2050, 11, 31);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1));
    };
    $scope.pushDevices = [];
    $scope.pushDevicesLoaded = false;

    $scope.getPushDevices = function() {
        $timeout(function(){
            $scope.pushDevicesLoaded = true;
            if ($scope.pushDevices.length == 0) {
                $scope.pushDevices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPUSHDEVICE')});
                var def = $q.defer();
                $pushDevicesDataFactory.query({offset: 0, limit: 10000, 'order_by[pushDevice.appName]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.pushDevices = data.results;
                    def.resolve($scope.pushDevices);
                });
                return def;
            } else {
                return $scope.pushDevices;
            }
        });
    };

    $scope.getPushDevices();

    $scope.pushNotifications = [];
    $scope.pushNotificationsLoaded = false;

    $scope.getPushNotifications = function() {
        $timeout(function(){
            $scope.pushNotificationsLoaded = true;
            if ($scope.pushNotifications.length == 0) {
                $scope.pushNotifications.push({id: '', title: $filter('translate')('content.form.messages.SELECTPUSHNOTIFICATION')});
                var def = $q.defer();
                $pushNotificationsDataFactory.query({offset: 0, limit: 10000, 'order_by[pushNotification.title]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.pushNotifications = data.results;
                    def.resolve($scope.pushNotifications);
                });
                return def;
            } else {
                return $scope.pushNotifications;
            }
        });
    };

    $scope.getPushNotifications();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.submitForm = function(form) {
        var firstError = null;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            return false;
        } else {
            if ($scope.pushMessage.id > 0) {
                $scope.disableSubmit = true;
                $pushMessagesDataFactory.update($scope.pushMessage).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PUSHMESSAGEUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PUSHMESSAGENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $pushMessagesDataFactory.create($scope.pushMessage).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PUSHMESSAGECREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PUSHMESSAGENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.mobile.pushmessages');
    };
    
    $scope.push_message_push_device_readonly = false;
    $scope.push_message_push_notification_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $pushMessagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.pushMessage = savable(data);
                if ($scope.pushMessage.delivery != null) {
                    $scope.pushMessage.delivery = new Date($scope.pushMessage.delivery);
                }
            });
        });
    } else {
        $scope.pushMessage = {id: 0, sending_status: 'Initialized'};

        if (angular.isDefined($stateParams.push_message_push_device) && JSON.parse($stateParams.push_message_push_device) != null) {
            $scope.pushMessage.push_device = $stateParams.push_message_push_device;
            $scope.push_message_push_device_readonly = true;
        }
        if (angular.isDefined($stateParams.push_message_push_notification) && JSON.parse($stateParams.push_message_push_notification) != null) {
            $scope.pushMessage.push_notification = $stateParams.push_message_push_notification;
            $scope.push_message_push_notification_readonly = true;
        }
    }

}]);

