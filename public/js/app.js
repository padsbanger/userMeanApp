var userMean = angular.module('userMean', ['ngRoute', 'authService']);

userMean.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider
      .when('/', {
        // controller: 'mainController',
        templateUrl: 'views/home.html'
      })
  }
]);