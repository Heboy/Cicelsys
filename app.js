
/**
 * Module dependencies.
 */

var express = require('express'),
	userRoutes = require('./controller/routes/userAction'),
	courseRoutes = require('./controller/routes/courseAction'),
	chapterRoutes = require('./controller/routes/chapterAction'),
	recordRoutes = require('./controller/routes/recordAction')
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

////////////////////////////courseRoutes/////////////////////////////////

/**
 * application/x-www-form-urlencoded
 */
app.get('/course',function(req,res,next){
	courseRoutes.getCourses(req,res);
});

/**
 * application/x-www-form-urlencoded
 */
app.post('/course',function(req,res,next){
	courseRoutes.addCourse(req,res);
});

/**
 * application/x-www-form-urlencoded
 */
app.put('/course',function(req,res,next){
	courseRoutes.updateCourseInfo(req,res);
});

/**
 * application/x-www-form-urlencoded
 */
app.delete('/course/:courseID',function(req,res,next){
	courseRoutes.deleteCourse(req,res);
});
////////////////////////////recordRoutes/////////////////////////////////
/**
 * application/json
 */
app.post('/course_record/general/:courseID',function(req,res,next){
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addCoursebasedGeneralData(req,res);
});

/**
 * application/json
 */
app.post('/course_record/event/:courseID',function(req,res,next){
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addCoursebasedEventData(req,res);
});

/**
 * application/json
 */
app.post('/stu_record/general/:courseID',function(req,res,next){
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addStubasedGeneralData(req,res);
});

/**
 * application/json
 */
app.post('/stu_record/event/:courseID',function(req,res,next){
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addStubasedEventData(req,res);
});
//测试用
app.post('/test',function(req,res){
	var s = require('./controller/certification/DESCoder');
	s.DESEncode();
	//course_general_data edb790bdf30894e32d941e63e8f6abf4d95a9f7c7ad3129fb9d529a8315f1261e50c69e1593ea925dc3294bde08e301fb79396a30eecf2964f18f5cdd416f00c7c1b656badfa5f0592281b88c8263074a43780d24594b7b0
	//course_event_data a1615a57c0bc642dc323821a328f568b78dd05d9f5647652b9e2489c25aaa05212eb883c63d4763f642544abcb8ec6460decdefea4ee6200e6e572a4555bad136d8e9a2d71b108eeddbe27b5d7b8f5c5000f331495bd3ee65565a553a426317e3e0832b70f69f31bac67e9911bdf3770
	//stu_general_data  29b9b94d8caf345c7e900d0d5c0fa04696230fa47080120d49ec6515d1c14c802b414f80f151b08e2a46305e0d1b3fd3317bdf858867c8cb5dac60e76669372775df51259a31bb7ed0a3939225632975a289b34a7f982c3e95c64c8bee16256b563d3617be60416f
	//stu_event_data   29b9b94d8caf345c7e900d0d5c0fa046094ecc8de6fa18f8715c457350b4adc8d8280885aa68fa7d432125f122d403ee7fd4fe4138cb8d716f11f808739bc05a39fd0aa5642499ac812756664ce4799c44b8b69887d9dd6ce208316d07329d5f722176569e763ae86a0fa534b5b1d7244c6facd8216afa83
})

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
