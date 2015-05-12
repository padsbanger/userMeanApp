var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');


mongoose.connect(config.database, function(err) {
  if(!err) {
    console.log('connected');
  } else {
    console.log(err);
  }

})

var app = express();

var api = require('./routes/api')(app, express);

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/api', api);



app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(config.port, function() {
  console.log('Running on port ' + config.port);
});