
/**
 * Module dependencies.
 */

var express = require('express'),
	userRoutes = require('./controller/routes/userAction'),
	courseRoutes = require('./controller/routes/courseAction'),
	chapterRoutes = require('./controller/routes/chapterAction'),
	app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.cookieParser('thsnxkd'));
	app.use(express.cookieSession());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.send('hello world');
});

/**
 * user路由
 */
app.post('/user/register',function(req,res,next){
	userRoutes.Register(req,res);
});
app.post('/user/login',function(req,res,next){
	userRoutes.Login(req,res);
});
app.put('/user/update',function(req,res,next){
	userRoutes.updateUserInfo(req,res);
});

/**
 * course路由
 */
app.get('/course',function(req,res,next){
	courseRoutes.getCourses(req,res);
});
app.post('/course',function(req,res,next){
	courseRoutes.addCourse(req,res);
});
app.put('/course',function(req,res,next){
	courseRoutes.updateCourseInfo(req,res);
});
app.delete('/course/:courseID',function(req,res,next){
	courseRoutes.deleteCourse(req,res);
});

/**
 * chapter路由
 */
app.get('/chapter',function(req,res,next){
	chapterRoutes.getChapters(req,res);
});
app.post('/chapter',function(req,res,next){
	chapterRoutes.addChapter(req,res);
});
app.put('/chapter',function(req,res,next){
	chapterRoutes.updateChapterInfo(req,res);
});
app.delete('/chapter/:chapterID',function(req,res,next){
	chapterRoutes.deleteChapter(req,res);
});

app.listen(3000,function(){
	console.log('Server Started');
});
