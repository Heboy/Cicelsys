/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	userRoutes = require('./controller/routes/userAction'),
	courseRoutes = require('./controller/routes/courseAction'),
	chapterRoutes = require('./controller/routes/chapterAction'),
	recordRoutes = require('./controller/routes/recordAction'),
	desCoder = require('./controller/DESCoder'),
	tools = require('./controller/tools');
app = express();

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.cookieParser('CookieM'));
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

////////////////////////////userRoutes/////////////////////////////////
//app.post('/user/register', function (req, res) {
//	userRoutes.Register(req, res);
//});
//app.post('/user/login', function (req, res) {
//	userRoutes.Login(req, res);
//});
//app.put('/user/update', function (req, res) {
//	userRoutes.updateUserInfo(req, res);
//});

app.post('/private/user/login',function(req,res){
	req.session['userID'] = 'tang';
	res.json({result:'ok'});
})

////////////////////////////courseRoutes/////////////////////////////////
app.get('/private/course', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.getCourse(req, res);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.get('/private/courses', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.getCourses(req, res);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.post('/private/course/add', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.addCourse(res, req);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.post('/private/courses/add', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.addCourses(res, req);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.post('/private/course/delete', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.deleteCourse(res, req);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.post('/private/courses/delete', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.deleteCourses(res, req);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.post('/private/course/update', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.updateCourse(res, req);
	}
	else {
		res.json({error: '无权限'});
	}
});

app.post('/private/courses/update', function (req, res) {
	if (req.session['userID']) {
		courseRoutes.updateCourses(res, req);
	}
	else {
		res.json({error: '无权限'});
	}
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
app.post('/chapter/:chapterID', function (req, res) {
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
function checkContentType(req, res) {
	var contentType = req.header("content-type").split(';')[0];
	if (req.method.toLowerCase() == 'post') {
		if (contentType != 'application/x-www-form-urlencoded') {
			res.json(404, {msg: 'ContentType必须是application/x-www-form-urlencoded'});
		}
	}
}

function DESEncode(req) {
	var value = desCoder.DESEncode(req.body.data, 'cicelsys');
	return value;
}


