'use strict';

/**
 * @ngdoc service
 * @name publicApp.userManager
 * @description
 * # userManager
 * Factory in the publicApp.
 */
angular.module('publicApp')
  .factory('userManager', function ($http, $state, $cookies) {
    // Service logic
    // ...
    var loc = 'http://' + window.location.hostname + ":" + window.location.port

    var server = loc;
    var userObj = {
      fName:undefined,
      lName:undefined,
      email:undefined,
      isLoggedIn:false,
      orgs:[],
      curOrgName:undefined,
      events:[]
    };
    var getSched = function(){
        $http.get(server + '/events').then(function(res){
          userObj.events = res.data
          console.log(res.data)
        })
    }
    // Public API here
    return {
      signup: function(user){
        console.log(user);
        $http.post(server + '/signup', user).then(function(res){
          console.log(res)
          if(res.data.user.fName != undefined){
            userObj.fName = res.data.user.fName;
            userObj.lName = res.data.user.lName;
            userObj.email = res.data.user.email;
            userObj.curOrgName = res.data.user.curOrgName
            userObj.isLoggedIn = true;
            console.log(user)
          }
          if(res.data.redirect){
            $state.go(res.data.redirect)
          }
        })
      },
      updateAccount:function(){
        if(userObj.password === userObj.confPass){
          $http.put(server + '/account', userObj).then(function(res){
            console.log(res);
            
          })
        }
      },
      submitOrg:function(newOrgName){
        console.log(newOrgName)
        $http.post(server + '/newOrg', {org:newOrgName}).then(function(res){
          console.log(res)
        })
      },
      signin: function(user){
        $http.post(server + '/login', user).then(function(res){
          console.log(res);
          if(res.data.user.fName != undefined){
            userObj.fName = res.data.user.fName;
            userObj.lName = res.data.user.lName;
            userObj.email = res.data.user.local.email;
            userObj.isLoggedIn = true;
            userObj.curOrgName = res.data.user.curOrgName;
            userObj.curOrg = res.data.user.curOrg;
            console.log(res.data.user)
            console.log($cookies.getAll())
          }
          if(res.data.redirect){
            $state.go(res.data.redirect);
          }
        })
      },
      logout: function(){
        $http.get(server + '/logout').then(function(res){
            $state.go(res.data.redirect);
            userObj.fName = undefined;
            userObj.lName = undefined;
            userObj.email = undefined;
            userObj.isLoggedIn = false
        })
      },
      getUser: function(){
        return userObj;
      },
      isLoggedIn: function(){
        if(userObj == undefined)
          return false
        else
          return true
      },
      redirect: function(){
        if(userObj.isLoggedIn == false)
          $state.go('home.login')
      },
      getOrgs:function(){
        $http.get(server + '/getMyOrgs').then(function(res){
          userObj.orgs = res.data
          console.log(userObj.orgs)
        })
      },
      shareOrg:function(){
        $http.post(server + '/shareOrg').then(function(res){
          console.log(res.data)
        })
      },
      changeOrg:function(org){
        $http.post(server + '/updateOrg', {id:org._id, name:org.name}).then(function(res){
          $state.go('home.dash');
          userObj.curOrgName = org.name
          userObj.curOrg = org.id
        })
      },
      getSchedule:function(){
        getSched();
      },
      addEvent:function(event){
        $http.post(server + '/events', event).then(function(res){
          console.log(res.data)
          getSched();
        })
      },
      deleteEvent:function(event){
        console.log(event)
        $http.delete(server + '/events/?id=' + event._id).then(function(res){
          console.log(res.data)
          getSched()
        })
      }
    };
  });
