'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('LoginCtrl', function ($scope, userManager) {
	$scope.tabs = {
		'login': true,
		'signup': false
	};

  	// this should send login information to a service from the login screen
	$scope.isActive = function (tab){
		return $scope.tabs[tab] ? 'active' : '';
	};

	$scope.activate = function (tab) {
		if (!$scope.tabs[tab]) {
			for (var tabId in $scope.tabs) {
				$scope.tabs[tabId] = tab === tabId;
			}
		}
	};

	$scope.active = true;
  	$scope.signin = function(){
		userManager.signin($scope.user);
  	}

	$scope.signup = function(){
		userManager.signup($scope.sign);
	}
  });
