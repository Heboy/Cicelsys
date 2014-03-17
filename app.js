/**
 * Module dependencies.
 */

var express = require('express'),
	userRoutes = require('./controller/routes/userAction'),
	courseRoutes = require('./controller/routes/courseAction'),
	chapterRoutes = require('./controller/routes/chapterAction'),
	recordRoutes = require('./controller/routes/recordAction'),
	desCoder = require('./controller/certification/DESCoder'),
	app = express();

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.cookieParser('thsnxkd'));
	app.use(express.cookieSession());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
	res.redirect(express.static(__dirname + '/public/script/Cicel/example.html'));
});
app.post('/', function (req, res) {
	console.log(req.body);
	res.json({status: true});
});

/**
 * user路由
 */
app.post('/user/register', function (req, res) {
	userRoutes.Register(req, res);
});
app.post('/user/login', function (req, res) {
	userRoutes.Login(req, res);
});
app.put('/user/update', function (req, res) {
	userRoutes.updateUserInfo(req, res);
});

////////////////////////////courseRoutes/////////////////////////////////
app.get('/course', function (req, res) {
	courseRoutes.getCourses(req, res);
});

app.get('/courses', function (req, res) {
	courseRoutes.getCoursesByID(req, res);
});

/**
 * 新增课程，可批量
 */
app.post('/courses', function (req, res) {
	DESEncode(req);
	checkContentType(req,res);
	desCoder.DESDecode(req,res,function(result){
		var dataObj = {
			userID:req.body.userID,
			courses:result
		};
		courseRoutes.addCourses(dataObj,function(result,msg){
			res.json(result,msg);
		});
	})
});

/**
 * 删除，可批量
 */
app.post('/courses/delete', function (req, res) {
	checkContentType(req,res);
	desCoder.DESDecode(req,res,function(result){
		var dataObj = {
			userID:req.body.userID,
			courses:result
		};
		courseRoutes.deleteCourses(dataObj,function(result,msg){
			res.json(result,msg);
		});
	})
});

/**
 * 更新，可批量
 */
app.put('/courses', function (req, res) {
	checkContentType(req,res);
	desCoder.DESDecode(req,res,function(result){
		var dataObj = {
			userID:req.body.userID,
			courses:result
		};
		courseRoutes.updateCoursesInfo(dataObj,function(result,msg){
			res.json(result,msg);
		});
	})
});


////////////////////////////recordRoutes/////////////////////////////////
/**
 * application/json
 */
app.post('/course_record/general/:courseID', function (req, res) {
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addCoursebasedGeneralData(req, res);
});

/**
 * application/json
 */
app.post('/course_record/event/:courseID', function (req, res) {
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addCoursebasedEventData(req, res);
});

/**
 * application/json
 */
app.post('/stu_record/general/:courseID', function (req, res) {
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addStubasedGeneralData(req, res);
});

/**
 * application/json
 */
app.post('/stu_record/event/:courseID', function (req, res) {
	var contentType = req.header("content-type").split(';')[0];
	if (contentType !== 'application/json') {
		res.json((404, {result: false, msg: 'content-type必须是application/json'}))
		return;
	}
	recordRoutes.addStubasedEventData(req, res);
});

/**
 * chapter路由
 */
app.get('/chapter', function (req, res) {
	chapterRoutes.getChapters(req, res);
});
app.post('/chapter', function (req, res) {
	chapterRoutes.addChapter(req, res);
});
app.put('/chapter', function (req, res) {
	chapterRoutes.updateChapterInfo(req, res);
});
app.delete('/chapter/:chapterID', function (req, res) {
	chapterRoutes.deleteChapter(req, res);
});




app.listen(3000, function () {
	console.log('Server Started');
});

/**
 * 检查ContentType
 * @param req
 * @param res
 */
function checkContentType(req,res){
	var contentType = req.header("content-type").split(';')[0];
	if(req.method.toLowerCase()=='post'){
		if(contentType!='application/x-www-form-urlencoded'){
			res.json(404,{msg:'ContentType必须是application/x-www-form-urlencoded'});
		}
	}
}

function DESEncode(req) {
	var value = desCoder.DESEncode(req.body.data,'cicelsys');
	return value;
}


