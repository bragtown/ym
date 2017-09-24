'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('MessageCtrl', function ($scope,youthmanager) {
  	$scope.data = youthmanager.getYouth();
    $scope.message = ''
    $scope.to = {}
    $scope.subject = '' 
  });
