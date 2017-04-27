'use strict';

/**
 * Controller for Measurement Form
 */

app.controller('MeasurementFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$countriesDataFactory', '$physicalActivitiesDataFactory', '$usersDataFactory', '$measurementsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $countriesDataFactory, $physicalActivitiesDataFactory, $usersDataFactory, $measurementsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/measurements',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'measurements',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.birthDateOpened = false;
    $scope.birthDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.birthDateOpened = !$scope.birthDateOpened;
    };
    $scope.genders = [{
        id: 'Male',
        title: $filter('translate')('content.list.fields.genders.MALE'),
        css: 'primary'
    }, {
        id: 'Female',
        title: $filter('translate')('content.list.fields.genders.FEMALE'),
        css: 'success'
    }];
    $scope.cupSizes = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'N/A',
        title: $filter('translate')('content.list.fields.cupsizes.N/A'),
        css: 'primary'
    }, {
        id: 'A',
        title: $filter('translate')('content.list.fields.cupsizes.A'),
        css: 'success'
    }, {
        id: 'B',
        title: $filter('translate')('content.list.fields.cupsizes.B'),
        css: 'warning'
    }, {
        id: 'C',
        title: $filter('translate')('content.list.fields.cupsizes.C'),
        css: 'danger'
    }, {
        id: 'D',
        title: $filter('translate')('content.list.fields.cupsizes.D'),
        css: 'default'
    }, {
        id: 'E',
        title: $filter('translate')('content.list.fields.cupsizes.E'),
        css: 'info'
    }, {
        id: 'F',
        title: $filter('translate')('content.list.fields.cupsizes.F'),
        css: 'primary'
    }];
    $scope.statuses = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'Analyzed',
        title: $filter('translate')('content.list.fields.statuses.ANALYZED'),
        css: 'primary'
    }, {
        id: 'Unanalyzed',
        title: $filter('translate')('content.list.fields.statuses.UNANALYZED'),
        css: 'success'
    }];

    $scope.deviceDateOpened = false;
    $scope.deviceDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.deviceDateOpened = !$scope.deviceDateOpened;
    };

    $scope.interpretationDateOpened = false;
    $scope.interpretationDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.interpretationDateOpened = !$scope.interpretationDateOpened;
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
    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                var def = $q.defer();
                $countriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.countries = data.results;
                    def.resolve($scope.countries);
                    if (angular.isDefined($scope.measurement)) {
                        $scope.measurement.country = $scope.measurement.country || $scope.countries[0].id;
                    }
                });
                return def;
            } else {
                return $scope.countries;
            }
        });
    };

    $scope.getCountries();

    $scope.physicalActivities = [];
    $scope.physicalActivitiesLoaded = false;

    $scope.getPhysicalActivities = function() {
        $timeout(function(){
            $scope.physicalActivitiesLoaded = true;
            if ($scope.physicalActivities.length == 0) {
                $scope.physicalActivities.push({id: '', title: $filter('translate')('content.form.messages.SELECTPHYSICALACTIVITY')});
                var def = $q.defer();
                $physicalActivitiesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[physicalActivity.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPHYSICALACTIVITY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.physicalActivities = data.results;
                    def.resolve($scope.physicalActivities);
                    if (angular.isDefined($scope.measurement)) {
                        $scope.measurement.physical_activity = $scope.measurement.physical_activity || $scope.physicalActivities[0].id;
                    }
                });
                return def;
            } else {
                return $scope.physicalActivities;
            }
        });
    };

    $scope.getPhysicalActivities();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.measurement)) {
                        $scope.measurement.creator_user = $scope.measurement.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.redirect = true;
    $scope.submitForm = function(form, redirect) {
        $scope.redirect = redirect;
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
            if ($scope.measurement.id > 0) {
                $scope.disableSubmit = true;
                $measurementsDataFactory.update($scope.measurement).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MEASUREMENTUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MEASUREMENTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $measurementsDataFactory.create($scope.measurement).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MEASUREMENTCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MEASUREMENTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.measurementmanager.measurements');
    };
    
    $scope.measurement_country_readonly = false;
    $scope.measurement_physical_activity_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $measurementsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.measurement = savable(data);
                if ($scope.measurement.birth_date != null) {
                    $scope.measurement.birth_date = new Date($scope.measurement.birth_date);
                }
                if ($scope.measurement.device_date != null) {
                    $scope.measurement.device_date = new Date($scope.measurement.device_date);
                }
                if ($scope.measurement.interpretation_date != null) {
                    $scope.measurement.interpretation_date = new Date($scope.measurement.interpretation_date);
                }
            });
        });
    } else {
        $scope.measurement = {id: 0, birth_date: null, gender: 'Male', cup_size: 'N/A', status: 'Analyzed'};

        if (angular.isDefined($stateParams.measurement_country) && JSON.parse($stateParams.measurement_country) != null) {
            $scope.measurement.country = $stateParams.measurement_country;
            $scope.measurement_country_readonly = true;
        }
        if (angular.isDefined($stateParams.measurement_physical_activity) && JSON.parse($stateParams.measurement_physical_activity) != null) {
            $scope.measurement.physical_activity = $stateParams.measurement_physical_activity;
            $scope.measurement_physical_activity_readonly = true;
        }
    }

}]);

