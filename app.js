
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var course = require('./routes/course');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('thsnxkd'));
app.use(express.cookieSession());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/course',course.courseData);
app.get('/chapter',course.courseData);
app.post('/data/course',course.getCourseData);
app.post('/data/chapter',course.getChapterData);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

