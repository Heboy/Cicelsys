/**
 * Created by Heboy on 14-1-17.
 */
var courseModel = require('../../model/course'),
	database = require('../database'),
	desCoder = require('../DESCoder');

/**
 * 查询
 * @param req
 * @param res
 */
exports.getCourse = function (req, res) {
	var courseObj = {
		courseID: req.query.courseID
	}
	var course = new courseModel.Course(courseObj);
	course.get(res);
}
exports.getCourses = function (req, res) {
	var courses = req.query.coursesID;
	try {
		courses = JSON.parse(courses);
		database.createConnection();
		courseModel.Course.Get(courses, res, function () {
			database.end();
		});
	} catch (e) {
		res.json({error: '参数错误'})
	}
}
/**
 * 添加
 * @param req
 * @param res
 */
exports.addCourse = function (req, res) {
	var courseObj = {
		courseName: req.body.courseName,
		userID: req.body.userID,
		Note: req.body.Note
	}
	if (courseObj.courseName && courseObj.userID) {
		var course = new courseModel.Course(courseObj);
		course.createConnection();
		course.add(res, function () {
			course.databaseEnd();
		});
	}
	else {
		res.json({error: '参数错误'});
	}
}
exports.addCourses = function (req, res) {
	var courses = req.body.courses;
	try {
		courses = JSON.parse(courses);
		database.createConnection();
		courseModel.Course.Add(courses, res, function () {
			database.end();
		});
	} catch (e) {
		res.json({error: '参数错误'})
	}
}

/**
 * 更新
 * @param req
 * @param res
 */
exports.updateCourse = function (req, res) {
	var courseObj = {
		courseName: req.body.courseName,
		Note: req.body.Note
	}
	if(courseObj.courseName){
		var course = new courseModel.Course(courseObj);
		database.createConnection();
		course.update(res, function () {
			database.end();
		});
	}
	else{
		res.json({error:'参数错误'});
	}
}
exports.updateCourses = function(req,res){
	var courses = req.body.courses;
	try {
		courses = JSON.parse(courses);
		database.createConnection();
		courseModel.Course.Update(courses, res, function () {
			database.end();
		});
	} catch (e) {
		res.json({error: '参数错误'})
	}
}

/**
 * 删除
 * @param req
 * @param res
 */
exports.deleteCourse = function (req,res) {
	var courseObj = {
		courseID: req.query.courseID
	}
	var course = new courseModel.Course(courseObj);
	database.createConnection();
	course.delete(res, function () {
		database.end();
	});
}
exports.deleteCourses = function(req,res){
	var courses = req.body.coursesID;
	try {
		courses = JSON.parse(courses);
		database.createConnection();
		courseModel.Course.Delete(courses, res, function () {
			database.end();
		});
	} catch (e) {
		res.json({error: '参数错误'});
	}
}