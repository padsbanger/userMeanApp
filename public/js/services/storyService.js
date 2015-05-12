angular.module('storyService', [])

.factory('Story', ['$http', function($http) {
  var storyFactory = {};

    storyFactory.createStory = function(storyData) {
      return $http.post('/api', storyData)
    };

    storyFactory.getStory = function() {
      return $http.get('/api');
    };

    return storyFactory;


}])



