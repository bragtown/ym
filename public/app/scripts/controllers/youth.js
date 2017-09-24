'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:YouthCtrl
 * @description
 * # YouthCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('YouthCtrl', function ($scope, youthmanager) {
    $scope.y = youthmanager.getSelected()
    $scope.submit = function(){
    	youthmanager.updateYouth($scope.y);
    }
    let oldDate = new Date()
    oldDate.setDate(oldDate.getMonth - 4);
    $scope.attFilter = function(date){
        let curDate = new Date(date)
        return curDate.getMonth >= oldDate.getMonth
    }
    $scope.deleteRec = function(){
        //console.log($scope.y)
        youthmanager.deleteRec($scope.y);
    }
    $scope.toDate = function(date){
        return new Date(date);
    }
    $scope.isSunday = function(date){
        let curDate = new Date(date)
        //console.log(curDate.getDay())
        return curDate.getDay() == 0 ? 'list-group-item-success' : ''
	}
    $scope.dispDate = function(date){
        let curDate = new Date(date)
        return curDate.toLocaleDateString();
    }  
  });
    
