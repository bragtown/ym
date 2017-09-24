'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('DashCtrl', function ($scope, userManager, youthmanager) {
  	userManager.redirect()
    $scope.takeAtt = false;
  	$scope.newYouth = {}
  	$scope.data = youthmanager.getYouth();
  	$scope.addYouth = function(){
  		youthmanager.addYouth($scope.newYouth);
  	}
    userManager.getOrgs();
  	$scope.openYouthForm = false;
  	$scope.toDate = function(date){
  		return new Date(date).toLocaleDateString();
  	}
  	$scope.selectYouth = function(youth){
  		youthmanager.selectYouth(youth);
  	}
    $scope.isBirthMonth = function(birthday){
      var curDate = new Date()
      var bday = new Date(birthday)
      // console.log(curDate.getMonth(), bday.getMonth())
      if(curDate.getMonth() == bday.getMonth()){
        return "success"
      }
      else{
        return ""
      }
    }
    $scope.takeAttendance = function(){
      for(var i = 0; i < $scope.data.youth.length; i++){
        var curYouth = $scope.data.youth[i];
        curYouth.newAttendance = {
          date:new Date()
        };
      } 
      $scope.takeAtt = !$scope.takeAtt
    },
    $scope.submitAttendance = function(){
      for(var i = 0; i < $scope.data.youth.length; i++){
        var curYouth = $scope.data.youth[i];
        if(curYouth.newAttendance.present == true){
          //submit attendance
          youthmanager.submitAttendance({_id:curYouth._id, update:curYouth.newAttendance});
        }

      }

    }
    $scope.doRev = function(){
      youthmanager.rev();
    }
    let qStart = 0
    let qEnd = 0
    let curMonth = new Date().getMonth()
    if(curMonth >= 0 && curMonth < 3){
      qStart = 9
      qEnd = 12
    }
    if(curMonth >= 3 && curMonth < 6){
      qStart = 0
      qEnd = 3
    }
    if(curMonth >= 6 && curMonth < 9){
      qStart = 3
      qEnd = 6
    }
    if(curMonth >= 9 && curMonth < 12){
      qStart = 6
      qEnd = 9
    }

    console.log(curMonth, qStart, qEnd)
    $scope.prevQuarter = function(y){
      let count = 0;
      for(let i = 0; i < y.attendance.length; i++){
        let ev = y.attendance[i]
        let evDate = new Date(ev.date)
        let evMonth = evDate.getMonth()
        if(evMonth >= qStart && evMonth < qEnd && evDate.getDay() == 0){
          count++
        }
      }
      y.prevQuarter = count;
      return count
    }
    $scope.prevQuarterTot = function(){
      let total = 0;
      for(let i = 0; i < $scope.data.youth.length; i++){
        let youth = $scope.data.youth[i]
        tot += youth.prevQuarter

      }
      return total;
    }
  });
