userMean.controller('storyController', ['Story', 'socketio', function(Story, socketio) {

  var self = this;

  Story.all()
    .success(function(data) {
      self.stories = data;
    });

  self.createStory = function() {
    Story.create(self.storyData)
      .success(function(data) {
        self.storyData = '';
      });
  }

  socketio.on('story', function(data) {
    self.stories.push(self.storyData);
  });

}]);
