'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */
angular
  .module('publicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          '':{
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
          },
          'nav@home':{
            templateUrl: 'views/nav.html',
            controller: 'NavCtrl',
            controllerAs: 'nav'
          }
        }
      })
      .state('home.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('home.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('home.dash', {
        url: '/dash',
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        controllerAs: 'dash'
      })
  });