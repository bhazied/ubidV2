'use strict';

/**
 * Controller for Measurement Details
 */

app.controller('MeasurementCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$measurementsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $measurementsDataFactory) {

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
        id: 'Analyzed',
        title: $filter('translate')('content.list.fields.statuses.ANALYZED'),
        css: 'primary'
    }, {
        id: 'Unanalyzed',
        title: $filter('translate')('content.list.fields.statuses.UNANALYZED'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.measurementmanager.measurements');
    };

    $scope.add = function() {
        $state.go('app.measurementmanager.measurementsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.measurementmanager.measurementsedit', {id: row.id});
    };


    $scope.interpretation = function() {
        $measurementsDataFactory.interpret({id: $stateParams.id}).$promise.then(function(data) {
            if (data.status) {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.INTERPRETATION'), 
                    text: $filter('translate')('content.list.MEASUREMENTINTERPRETED'), 
                    type: 'success',
                    confirmButtonColor: '#007AFF'
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.ERROR'), 
                    text: $filter('translate')('content.list.MEASUREMENTNOTINTERPRETED') + ' ' + data.message, 
                    type: 'warning',
                    confirmButtonColor: '#007AFF'
                 });
             }
            $scope.tableParams.reload();
        }, function(error) {
            SweetAlert.swal({
                title: $filter('translate')('content.common.ERROR'), 
                text: $filter('translate')('content.list.MEASUREMENTNOTINTERPRETED'), 
                type: 'warning',
                confirmButtonColor: '#007AFF'
             });
        });
    };

    $scope.previous = function() {
        $measurementsDataFactory.previous({id: $stateParams.id}).$promise.then(function(data) {
            $scope.previous = data;
        });
    };
    
    $scope.previous();

    if (angular.isDefined($stateParams.id)) {
        $measurementsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.measurement = data;
        });
    }

}]);

