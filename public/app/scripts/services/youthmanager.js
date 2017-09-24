'use strict';

/**
 * @ngdoc service
 * @name publicApp.youthmanager
 * @description
 * # youthmanager
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('youthmanager', function ($http, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var loc = 'http://' + window.location.hostname + ":" + window.location.port

    var server = loc;
    var youthData = {
    	youth: [],
    	selectedYouth:{}
    };
    var review = -1;
    var doRev = function(){
        if(review < youthData.youth.length - 1){
            review++;
            console.log(review, youthData.youth[review])
            youthData.selectedYouth = youthData.youth[review];
            $state.go("home.youth")
        }
        else{
            review = -1;
            $state.go("home.dash")
        }
    }
    var reqYouth = function(){
    	$http.get(server + '/youth').then(function(res){
    		console.log(res.data);
    		youthData.youth = res.data;
    	})
    }
    return{
    	addYouth: function(youth){
    		if(youth != undefined){
        		$http.post(server + '/youth', youth).then(function(res){
    				console.log(res.data);
        			if(res.data.message == "Success!"){
        				reqYouth();
        			}
        		});
        	}
    	},
    	getYouth:function(){
    		reqYouth();
    		return youthData;
    	},
    	selectYouth:function(y){
    		youthData.selectedYouth = y;
    		$state.go("home.youth")
    	},
        submitAttendance:function(y){
            $http.put(server+'/attendance', y).then(function(res){
                console.log(res.data)        
                if(res.data.message == "Success!"){
                    reqYouth();
                }
            })
        },
        updateYouth:function(y){
            $http.put(server + '/youth', y).then(function(res){
                console.log(res.data)
                reqYouth();
                if(review >= 0){
                    doRev();
                }
                youthData.selectedYouth = res.data.y
            });
        },
        getSelected:function(){
            youthData.selectedYouth.birthday = new Date(youthData.selectedYouth.birthday)
            return youthData.selectedYouth;
        },
        deleteRec:function(rec){
            $http.delete(server+'/youth/?id='+ rec._id).then(function(res){
                $state.go('home.dash');

            })
        },
        rev:function(){
            doRev()
        }
    }
  });
