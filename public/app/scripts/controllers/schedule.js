'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('ScheduleCtrl', function ($scope, userManager, youthmanager) {
  	$scope.user = userManager.getUser()
  	userManager.getSchedule()
  	$scope.addEvent = function(){
  		userManager.addEvent($scope.newEvent)
  	}

  	$scope.toDate = function(date){
  		return new Date(date).toLocaleDateString();
  	}
  	$scope.deleteEvent = function(event){
  		userManager.deleteEvent(event);
  	}
  });
