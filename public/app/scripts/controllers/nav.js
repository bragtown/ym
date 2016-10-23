'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('NavCtrl', function ($scope, $state, userManager) {
    $scope.user = userManager.getUser();
    console.log($scope.user)

    $scope.activeClass = function(loc){
    	if($state.includes(loc)){
    		return 'active'
    	}
    }
    $scope.logout = function(){
    	userManager.logout()
    }
  });
