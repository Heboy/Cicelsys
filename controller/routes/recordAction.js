/**
 * Created by Heboy on 14-2-13.
 */
var desCoder = require('../DESCoder');
var courseModel = require('../../model/course');

exports.addCoursebasedGeneralData = function (req, res) {
	var dataModel = require('../../model/coursebasedGeneral'),
		data = req.body.data,
		courseObj = {
			courseID: req.params.courseID
		};

	if (courseObj.courseID && data) {
		var course = new courseModel.course(courseObj);
		course.databaseInit();
		course.getAppKey(courseObj.courseID, function (status, msg) {
			if (msg.result) {
				//数据解密，写入数据库
				var dataObj = desCoder.DESDecode(data, msg.result);
				if (dataObj) {
					//写入数据库
					dataObj = JSON.parse(dataObj);
					course.databaseEnd();
					var dataAction = new dataModel.CourseBasedGeneralDate(dataObj);
					dataAction.databaseInit();
					dataAction.addRecords(function (status, msg) {
						res.json(status, msg);
					})
				}
				else {
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

exports.addCoursebasedEventData = function (req, res) {
	var dataModel = require('../../model/coursebasedEvent'),
		data = req.body.data,
		courseObj = {
			courseID: req.params.courseID
		};

	if (courseObj.courseID && data) {
		var course = new courseModel.course(courseObj);
		course.databaseInit();
		course.getAppKey(courseObj.courseID, function (status, msg) {
			if (msg.result) {
				//数据解密，写入数据库
				var dataObj = desCoder.DESDecode(data, msg.result);
				if (dataObj) {
					//写入数据库
					dataObj = JSON.parse(dataObj);
					course.databaseEnd();
					var dataAction = new dataModel.CourseBasedEventDate(dataObj);
					dataAction.databaseInit();
					dataAction.addRecords(function (status, msg) {
						res.json(status, msg);
					})
				}
				else {
					course.databaseEnd();
					res.json(404, {result: false, msg: '写入失败'});
				}
			}
			else {
				course.databaseEnd();
				res.json(status, msg);
			}
		})
	}
}

exports.addStubasedGeneralData = function (req, res) {
	var dataModel = require('../../model/stubasedGeneral'),
		data = req.body.data,
		courseObj = {
			courseID: req.params.courseID
		};

	if (courseObj.courseID && data) {
		var course = new courseModel.course(courseObj);
		course.databaseInit();
		course.getAppKey(courseObj.courseID, function (status, msg) {
			if (msg.result) {
				//数据解密，写入数据库
				var dataObj = desCoder.DESDecode(data, msg.result);
				if (dataObj) {
					//写入数据库
					dataObj = JSON.parse(dataObj);
					course.databaseEnd();
					var dataAction = new dataModel.StuBasedGeneralDate(dataObj);
					dataAction.databaseInit();
					dataAction.addRecords(function (status, msg) {
						res.json(status, msg);
					})
				}
				else {
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

exports.addStubasedEventData = function (req, res) {
	var dataModel = require('../../model/stubasedEvent'),
		data = req.body.data,
		courseObj = {
			courseID: req.params.courseID
		};

	if (courseObj.courseID && data) {
		var course = new courseModel.course(courseObj);
		course.databaseInit();
		course.getAppKey(courseObj.courseID, function (status, msg) {
			if (msg.result) {
				//数据解密，写入数据库
				var dataObj = desCoder.DESDecode(data, msg.result);
				if (dataObj) {
					//写入数据库
					dataObj = JSON.parse(dataObj);
					course.databaseEnd();
					var dataAction = new dataModel.StuBasedEventDate(dataObj);
					dataAction.databaseInit();
					dataAction.addRecords(function (status, msg) {
						res.json(status, msg);
					})
				}
				else {
					course.databaseEnd();
					res.json(404, {result: false, msg: '写入失败'});
				}
			}
			else {
				course.databaseEnd();
				res.json(status, msg);
			}
		})
	}
}