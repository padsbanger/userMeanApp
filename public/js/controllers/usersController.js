userMean.controller('userController', ['User', function(User) {

  var self = this;


  User.all()
    .success(function(data) {
      self.users = data;
    })


}]);


userMean.controller('userCreateController', ['User', '$location', '$window', function(User, $location, $window) {

  var self = this;


  self.signupUser = function() {
    self.message = '';
    User.create(self.userData)
      .then(function(data) {
        self.userData = {};
        self.message = data.data.message;

        $window.localStorage.setItem('token', data.data.token);
        $location.path('/');
      })
  };


}]);
