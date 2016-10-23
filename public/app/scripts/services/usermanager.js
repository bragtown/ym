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
    var server = 'http://localhost:9000';
    var userObj = {
      fName:undefined,
      lName:undefined,
      email:undefined,
      isLoggedIn:false
    };
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
            userObj.isLoggedIn = true;
            console.log(user)
          }
          if(res.data.redirect){
            $state.go(res.data.redirect)
          }
        })
      },
      signin: function(user){
        $http.post(server + '/login', user).then(function(res){
          console.log(res);
          if(res.data.user.fName != undefined){
            userObj.fName = res.data.user.fName;
            userObj.lName = res.data.user.lName;
            userObj.email = res.data.user.email;
            userObj.isLoggedIn = true;
            console.log(user)
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
        if(user == undefined)
          return false
        else
          return true
      },
      redirect: function(){
        if(user.isLoggedIn == false)
          $state.go(home.login)
      }
    };
  });
