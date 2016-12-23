'use strict';

app.directive('licenceValidator', function($registerDataFactory, $timeout, $localStorage) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.licence = function(modelValue, viewValue) {
                if (!angular.isDefined(viewValue) ||  viewValue == null ||  viewValue == '') {
                    ngModel.$setValidity('licenceValidator', false);
                }
                return $registerDataFactory.checkLicenceKey({locale: $localStorage.language, key: viewValue}).$promise.then(function(data) {
                    $timeout(function() {
                        ngModel.$setValidity('licenceValidator', data.status);
                    }, 2000);
                });
            };
        }
    };
});

app.directive('emailValidator', function($registerDataFactory, $timeout, $localStorage) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.email = function(modelValue, viewValue) {
                if (!angular.isDefined(viewValue) ||  viewValue == null ||  viewValue == '') {
                    ngModel.$setValidity('emailValidator', false);
                }
                return $registerDataFactory.checkEmail({locale: $localStorage.language, email: viewValue}).$promise.then(function(data) {
                    $timeout(function() {
                        ngModel.$setValidity('emailValidator', data.status);
                    }, 2000);
                });
            };
        }
    };
});


/**
 * Controller for user registration
 */
app.controller('RegisterCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$parse', '$q', 'toaster', '$registerDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $parse, $q, toaster, $registerDataFactory) {

        $scope.user = {
            email: "",
            plainPassword: {
                first: "",
                second: ""
            }
        };

        $scope.authenticated = false;

        $scope.currentStep = 1;

        $scope.countries = [];
        $scope.countriesLoaded = false;

        $scope.getCountries = function() {
            $timeout(function(){
                $scope.countriesLoaded = true;
                if ($scope.countries.length == 0) {
                    $scope.countries.push({});
                    var def = $q.defer();
                    $registerDataFactory.countries({locale: $localStorage.language}).$promise.then(function(data) {
                        $scope.countries = data;
                        def.resolve($scope.countries);
                    });
                    return def;
                } else {
                    return $scope.countries;
                }
            });
        };

        $scope.getCountries();

        // Initial Value
        $scope.form = {

            next: function (form) {

                console.warn(form);

                $scope.toTheTop();

                if (form.$valid) {
                    if ($scope.currentStep == 3) {
                        this.submit();
                    } else {
                        form.$setPristine();
                        nextStep();
                    }
                } else {
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
                    errorMessage();
                }
            },
            prev: function (form) {
                $scope.toTheTop();
                prevStep();
            },
            goTo: function (form, i) {
                if (parseInt($scope.currentStep) > parseInt(i)) {
                    $scope.toTheTop();
                    goToStep(i);

                } else {
                    if (form.$valid) {
                        $scope.toTheTop();
                        goToStep(i);

                    } else
                        errorMessage();
                }
            },
            submit: function () {
                //$scope.user.locale = $localStorage.language;
                $registerDataFactory.register($scope.user).$promise.then(function(data){
                    if (angular.isDefined(data.token)) {
                        $localStorage.access_token = data.token;
                        $scope.user = $localStorage.user = $rootScope.user = data.user;
                        $scope.authenticated = true;
                    } else {
                        nextStep();
                    }
                }, function(error){
                    console.warn(error);
                });
            },
            reset: function () {
                $scope.currentStep = 1;
                $scope.user = {};
            }
        };


        var nextStep = function () {
            $scope.currentStep++;
        };

        var prevStep = function () {
            $scope.currentStep--;
        };

        var goToStep = function (i) {
            $scope.currentStep = i;
        };

        var errorMessage = function (i) {
            toaster.pop('error', 'Error', 'please complete the form in this step before proceeding');
        };

    }
]);
