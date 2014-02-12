/**
 * Created by Heboy on 14-1-17.
 */
var courseModel = require('../../model/course');

exports.getCourses = function (req, res) {
	var courseObj = {
		userID: req.body.userID
	}
	var course = new courseModel.course(courseObj);
	course.databaseInit();
	course.getCourses(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}

exports.addCourse = function (req, res) {
	var courseObj = {
		courseName: req.body.courseName,
		userID: req.body.userID,
		note: req.body.note
	}

	var course = new courseModel.course(courseObj);
	course.databaseInit();
	course.addCourse(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}

exports.updateCourseInfo = function (req, res) {
	var courseObj = {
		courseID: req.body.courseID,
		courseName: req.body.courseName,
		userID: req.body.userID,
		note: req.body.note
	}

	if (courseObj.courseName || courseObj.department || courseObj.note) {
		if (courseObj.userID) {
			var course = new courseModel.course(courseObj);
			course.databaseInit();
			course.updateCourse(function (status, msg) {
				res.json(status, msg);
				course.databaseEnd();
			})
		}
		else {
			res.json(404, {result: false, msg: '超时，重新登录'});
		}
	}
	else {
		res.json(404, {result: false, msg: '无更新值'});
	}
}

exports.deleteCourse = function (req, res) {
	var courseObj = {
		courseID: req.params.courseID,
	}

	var course = new courseModel.course(courseObj);
	course.databaseInitWithMultipleStatements();
	course.deleteCourse(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}

exports.addCourseRecord = function (req, res) {
	var desCoder = require('../certification/DESCoder'),
		dayModel = require('../../model/day'),
		data = req.body.data,
		courseObj = {
			courseID: req.params.courseID
		};

	if (courseObj.courseID&&data) {
		var course = new courseModel.course(courseObj);
		course.databaseInit();
		course.getAppKey(courseObj.courseID, function (status, msg) {
			if (msg.result) {
				//数据解密，写入数据库
				var dayObj = desCoder.DESDecode(data,msg.result);
				if(dayObj)
				{
					//写入数据库
					dayObj = JSON.parse(dayObj);
					course.databaseEnd();
					var day = new dayModel.day(dayObj);
					day.databaseInit();
					day.addRecords(function(status, msg){
						res.json(status, msg);
					})
				}
				else{
					course.databaseEnd();
					res.json(status, msg);
				}
			}
			else {
				course.databaseEnd();
				res.json(status, msg);
			}
		})
	}
}