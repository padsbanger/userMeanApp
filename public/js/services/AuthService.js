angular.module('authService', [])

.factory('Auth', ['$http', 'AuthToken', '$q', function($http, AuthToken, $q) {
  var authFactory = {};

  authFactory.login = function(username, password) {
    return $http.post('/api/login', {
        username: username,
        password: password
      })
      .success(function(data) {
        AuthToken.setToken(data.token);
        return data;
      });
    }


    authFactory.logout = function() {
      AuthToken.setToken();
    };

    authFactory.isLogged = function() {
      if (AuthToken.getToken()) {
        return true;
      } else {
        return false;
      }
    };

    authFactory.getUser = function() {
      if (AuthToken.getToken()) {
        return $http.get('/api/user');
      } else {
        return $q.reject({
          message: "User has no token"
        })
      }
    };

    return authFactory;


}])

.factory('AuthToken', ['$window', function($window) {
  var authTokenFactory = {};

  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  };

  authTokenFactory.setToken = function(token) {
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
       $window.localStorage.removeItem('token');
    }
  };

  return authTokenFactory;

}])

.factory('AuthInteceptor', ['$q', '$location', 'AuthToken', function($q, $location, AuthToken) {

  var inteceptorFactory = {};

  inteceptorFactory.request = function(config) {

    var token = AuthToken.getToken();

    if (token) {
      config.headers['x-access-token'] = token;
    }

    return config;
  };

  inteceptorFactory.responseError = function(response) {
    if (response.status === 403) {
      $location.path('/login');

      return $q.reject(response);
    }
  };

  return inteceptorFactory;

}]);
