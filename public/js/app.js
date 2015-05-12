var userMean = angular.module('userMean', ['ngRoute', 'authService', 'userService', 'storyService']);

userMean.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'mainController',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html'
      })

    $httpProvider.interceptors.push('AuthInteceptor');
  }
]);
