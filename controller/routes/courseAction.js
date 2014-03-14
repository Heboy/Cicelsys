/**
 * Created by Heboy on 14-1-17.
 */
var courseModel = require('../../model/course');
/**
 *查看user所有课程
 * @param req
 * @param res
 */
exports.getCourses = function (req, res) {
	var courseObj = {
		userID: req.body.userID
	}
	var course = new courseModel.Course(courseObj);
	course.databaseInit();
	course.getCourses(function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}
/**
 * 根据courseID查询课程，可批量
 * @param req
 * @param res
 */
exports.getCoursesByID = function (req, res) {
	var courseObj = {
		userID: req.body.userID
	}
	var course = new courseModel.Course(courseObj);
	course.databaseInit();
	course.getCoursesByID([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function (status, msg) {
		res.json(status, msg);
		course.databaseEnd();
	});
}
/**
 * 添加 可批量
 * @param dataObj
 * @param callback
 */
exports.addCourses = function (dataObj, callback) {
	var course = new courseModel.Course(null);
	course.databaseInit();
	course.addCourses(dataObj, function (status, msg) {
		callback(status, msg);
		course.databaseEnd();
	});
}

exports.updateCoursesInfo = function (dataObj, callback) {
	var course = new courseModel.Course(null);
	course.databaseInit();
	course.updateCourses(dataObj, function (status, msg) {
		callback(status, msg);
		course.databaseEnd();
	});
}

/**
 * 删除 可批量
 * @param dataObj
 * @param callback
 */
exports.deleteCourses = function (dataObj, callback) {
	var course = new courseModel.Course(null);
	course.databaseInit();
	course.deleteCourses(dataObj, function (result, msg) {
		if (msg.affectedRows > 0) {
			msg = '删除成功';
		}
		callback(result, msg);
		course.databaseEnd();
	});
}