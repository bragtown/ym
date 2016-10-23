'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:DashCtrl
 * @description
 * # DashCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('DashCtrl', function ($scope, userManager) {
  	userManager.redirect()
  });
