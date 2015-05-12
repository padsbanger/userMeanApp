userMean.controller('mainController', ['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {

  var self = this;

  self.loggedIn = Auth.isLogged();

  $rootScope.$on('$routeChangeStart', function() {
    self.loggedIn = Auth.isLogged();

    Auth.getUser()
      .then(function(data) {
        self.user = data.data;
      });

  });

  self.doLogin = function() {
    self.processing = true;
    self.error = '';
    Auth.login(self.loginData.username, self.loginData.password)
      .success(function(data) {
        self.processing = false;

        Auth.getUser()
          .then(function(data) {
            self.user = data.data;
          });

        if (data.success) {
          $location.path('/')
        } else {
          self.error = data.message;
        }

      });
  };

  self.doLogout = function() {
    Auth.logout();
    $location.path('/logout');
  }

}]);
