'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('AccountCtrl', function ($scope, userManager) {
    $scope.user = userManager.getUser()
    console.log($scope.user)
    $scope.submit = function(){
    	console.log($scope.user)
    	userManager.updateAccount();
    }
    $scope.submitOrg = function(){
    	console.log($scope.newOrgName)
    	userManager.submitOrg($scope.newOrgName)
    }
    $scope.share = function(){
        userManager.shareOrg($scope.shareEmail)
    }
  });
