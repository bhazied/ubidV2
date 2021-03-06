'use strict';

/**
 * Controller for Bids List
 */

app.controller('MessageFrontFormCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert','$usersDataFactory', '$buyersDataFactory', '$suppliersDataFactory','$messagesDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $buyersDataFactory, $suppliersDataFactory,$messagesDataFactory) {



        $scope.list = function() {
            $state.go('front.messages.list', {locale: $rootScope.locale});
        };


       $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

        $scope.disableSubmit = false;
        $scope.enableFormAlert = false;

        // Editor options.
        $scope.editorOptions = {
            language: $scope.locale,
            allowedContent: true,
            entities: false,
            extraPlugins: 'colorbutton,colordialog,justify'
        };

        // Called when the editor is completely ready.
        $scope.onReadyEditor = function () {

        };

        $scope.statuses = [{
            id: 'Draft',
            title: $filter('translate')('content.list.fields.statuses.DRAFT'),
            css: 'primary'
        }, {
            id: 'Sent',
            title: $filter('translate')('content.list.fields.statuses.SENT'),
            css: 'success'
        }];

        $scope.sendingTimeOpened = false;
        $scope.sendingTimeToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.sendingTimeOpened = !$scope.sendingTimeOpened;
        };

        $scope.readingTimeOpened = false;
        $scope.readingTimeToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.readingTimeOpened = !$scope.readingTimeOpened;
        };

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
        $scope.users = [];
        $scope.usersLoaded = false;

        $scope.getUsers = function() {
            $timeout(function(){
                $scope.usersLoaded = true;
                if ($scope.users.length == 0) {
                    $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTFROMUSER')});
                    var def = $q.defer();
                    $usersDataFactory.query({offset: 0, limit: 10000,'order_by[user.username]': 'asc'}).$promise.then(function(data) {
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

        $scope.buyers = [];
        $scope.buyersLoaded = false;

        $scope.getBuyers = function() {
            $timeout(function(){
                $scope.buyersLoaded = true;
                if ($scope.buyers.length == 0) {
                    $scope.buyers.push({id: '', title: $filter('translate')('content.form.messages.SELECTFROMBUYER')});
                    var def = $q.defer();
                    $buyersDataFactory.query({offset: 0, limit: 10000, 'order_by[buyer.name]': 'asc'}).$promise.then(function(data) {
                        for (var i in data.results) {
                            data.results[i].hidden = false;
                        }
                        $scope.buyers = data.results;
                        def.resolve($scope.buyers);
                    });
                    return def;
                } else {
                    return $scope.buyers;
                }
            });
        };

        $scope.getBuyers();

        $scope.suppliers = [];
        $scope.suppliersLoaded = false;

        $scope.getSuppliers = function() {
            $timeout(function(){
                $scope.suppliersLoaded = true;
                if ($scope.suppliers.length == 0) {
                    $scope.suppliers.push({id: '', title: $filter('translate')('content.form.messages.SELECTFROMSUPPLIER')});
                    var def = $q.defer();
                    $suppliersDataFactory.query({offset: 0, limit: 10000, 'order_by[supplier.name]': 'asc'}).$promise.then(function(data) {
                        for (var i in data.results) {
                            data.results[i].hidden = false;
                        }
                        $scope.suppliers = data.results;
                        def.resolve($scope.suppliers);
                    });
                    return def;
                } else {
                    return $scope.suppliers;
                }
            });
        };

        $scope.getSuppliers();

        $scope.submitForm = function(form, redirect) {
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
                if ($scope.enableFormAlert) {
                    SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
                }
                return false;

            } else {
                if ($scope.message.id > 0) {

                } else {
                    $scope.disableSubmit = true;
                    $messagesDataFactory.create($scope.message).$promise.then(function(data) {
                        $scope.disableSubmit = false;
                        toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MESSAGECREATED'));
                        if (redirect) {
                            if($stateParams.to == "buyer") $scope.listBuyers();
                            if($stateParams.to == "supplier") $scope.listSuppliers();
                        }
                    }, function(error) {
                        $scope.disableSubmit = false;
                        toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MESSAGENOTCREATED'));
                        console.warn(error);
                    });
                }
                return false;
            }
        };

        $scope.listBuyers = function() {
            $state.go('front.buyers', {locale: $rootScope.locale});
        };
        $scope.listSuppliers = function() {
            $state.go('front.suppliers', {locale: $rootScope.locale});
        };

        $scope.message_from_buyer_readonly = false;
        $scope.message_from_supplier_readonly = false;
        $scope.message_to_user_readonly = false;

        /*if (angular.isDefined($stateParams.id)) {
            $messagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
                $timeout(function(){
                    $scope.message = savable(data);
                    if ($scope.message.sending_time != null) {
                        $scope.message.sending_time = new Date($scope.message.sending_time);
                    }
                    if ($scope.message.reading_time != null) {
                        $scope.message.reading_time = new Date($scope.message.reading_time);
                    }
                });
            });
        } else {*/


         /*   if (angular.isDefined($stateParams.message_from_user) && JSON.parse($stateParams.message_from_user) != null) {
                $scope.message.from_user = $stateParams.message_from_user;
                $scope.message_from_user_readonly = true;
            }
            if (angular.isDefined($stateParams.message_from_buyer) && JSON.parse($stateParams.message_from_buyer) != null) {
                $scope.message.from_buyer = $stateParams.message_from_buyer;
                $scope.message_from_buyer_readonly = true;
            }
            if (angular.isDefined($stateParams.message_from_supplier) && JSON.parse($stateParams.message_from_supplier) != null) {
                $scope.message.from_supplier = $stateParams.message_from_supplier;
                $scope.message_from_supplier_readonly = true;
            }
            if (angular.isDefined($stateParams.message_to_user) && JSON.parse($stateParams.message_to_user) != null) {
                $scope.message.to_user = $stateParams.message_to_user;
                $scope.message_to_user_readonly = true;
            }
            if (angular.isDefined($stateParams.message_to_buyer) && JSON.parse($stateParams.message_to_buyer) != null) {
                $scope.message.to_buyer = $stateParams.message_to_buyer;
                $scope.message_to_buyer_readonly = true;
            }
            if (angular.isDefined($stateParams.message_to_supplier) && JSON.parse($stateParams.message_to_supplier) != null) {
                $scope.message.to_supplier = $stateParams.message_to_supplier;
                $scope.message_to_supplier_readonly = true;
            }*/
        //}


       
       $scope.currentUser = $localStorage.user ;

        //get toUser
        if($stateParams.to == "buyer"){
            $timeout(function(){
                $scope.message = {
                    status: 'Draft',
                    sending_time: new Date(),
                    reading_time: new Date(),
                    from_user :  $scope.sender,
                    to_buyer : $stateParams.id
                };
            },2000);
        }
        if($stateParams.to == "supplier"){
            $timeout(function(){
                $scope.message = {
                    status: 'Draft',
                    sending_time: new Date(),
                    reading_time: new Date(),
                    from_user :  $scope.sender,
                    to_supplier : $stateParams.id
                };
            },2000);
        }



    }]);

