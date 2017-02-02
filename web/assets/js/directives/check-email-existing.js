'use strict';
/**
 * Check if field is unique or not
 */
app.directive('checkEmailExisting', ['$resource', '$rootScope', '$localStorage',
    function($resource, $rootScope, $localStorage) {
        var timeoutId;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                //when the scope changes, check the email.
                scope.$watch(attrs.ngModel, function(value) {
                    // if there was a previous attempt, stop it.
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    // start a new attempt with a delay to keep it from
                    // getting too "chatty".
                    timeoutId = setTimeout(function() {
                        var fieldName = attrs.myField;
                        var resourceURL = attrs.myResourceUrl;
                        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion + resourceURL;
                        var resource = $resource('/' + $localStorage.language + url , {}, {
                            checkEmail: { method: 'Post' }
                        });
                        var http_params = {
                            email: value
                        };
                        //http_params['filters['+fieldName+']'] = value;
                        resource.checkEmail(http_params).$promise.then(function(data) {
                            ctrl.$setValidity('checkEmailExisting', data.status);
                        });
                    }, 500);
                });
            }
        }
    }]);
