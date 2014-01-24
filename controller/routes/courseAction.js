/**
 * Created by Heboy on 14-1-17.
 */
var courseModel = require('../../model/course');

exports.getCourses = function(req,res){
	var courseObj = {
		userID:req.body.userID
	}
	var course = new courseModel.course(courseObj);
	course.databaseInit();
	course.getCourses(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}

exports.addCourse = function(req,res){
	var courseObj = {
		courseName:req.body.courseName,
		userID:req.body.userID,
		note:req.body.note
	}

	var course = new courseModel.course(courseObj);
	course.databaseInit();
	course.addCourse(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}

exports.updateCourseInfo = function(req,res){
	var courseObj = {
		courseID:req.body.courseID,
		courseName:req.body.courseName,
		userID:req.body.userID,
		note:req.body.note
	}

	if(courseObj.courseName||courseObj.department||courseObj.note){
		if(courseObj.userID){
			var course = new courseModel.course(courseObj);
			course.databaseInit();
			course.updateCourse(function(status,msg){
				res.json(status,msg);
				course.databaseEnd();
			})
		}
		else{
			res.json(404,{result:false,msg:'超时，重新登录'});
		}
	}
	else{
		res.json(404,{result:false,msg:'无更新值'});
	}
}

exports.deleteCourse = function(req,res){
	var courseObj = {
		courseID:req.params.courseID,
	}

	var course = new courseModel.course(courseObj);
	course.databaseInitWithMultipleStatements();
	course.deleteCourse(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}