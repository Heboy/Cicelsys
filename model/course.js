/**
 * Created by Heboy on 14-1-23.
 */
var database = require('../controller/database'),
	connection = null;

var courseModel = {
	courseID: null,
	courseName: null,
	department: null,
	userID: null,
	appkey: null,
	note: null
}

function Course(courseObj) {

}
exports.Course = Course;

Course.prototype.databaseInit = function () {
	connection = database.createConnection();
}

Course.prototype.databaseInitWithMultipleStatements = function () {
	connection = database.createConnectionWithMultipleStatements();
}

Course.prototype.databaseEnd = function () {
	connection.end();
}

/**
 *查询userID下所有课程
 * @param callback
 */
Course.prototype.getCourses = function (callback) {
	var sql = 'select courseID,courseName,note from td_course where userID = ?',
		inserts = [courseModel.userID];
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err});
			return;
		}
		callback(200, {result: results});
	});
}

/**
 * 添加课程 可批量
 * @param dataObj
 * @param callback
 */
Course.prototype.addCourses = function (dataObj, callback) {
	var data = dataObj.courses,
		userID = dataObj.userID;
	if (Array.isArray(data) && data.length > 0) {
		var count = data.length;
		for (var i = 0, len = data.length; i < len; i++) {
			var sql = 'INSERT INTO td_course(courseName,userID,note) VALUES(?,?,?)',
				inserts = [data[i].courseName, userID, data[i].note];
			sql = database.preparedQuery(sql, inserts);
			connection.query(sql, function (err, result) {
				if (err) {
					count = -1;
					callback(404, {msg: err});
				}
				if (count == -1) {
					return;
				}
				count--;
				if (count == 0) {
					callback(200, {msg: '添加成功'});
				}
			});
		}
	}
	else {
		callback(404, {msg: '参数错误'});
	}
}

/**
 * 更新 可批量
 * @param dataObj
 * @param callback
 */
Course.prototype.updateCourses = function (dataObj,callback) {
	var data =dataObj.courses;
	if (Array.isArray(data) && data.length > 0) {
		var count = data.length;
		for (var i = 0, len = data.length; i < len; i++) {
			var sql = 'update td_course set courseName = ?,note = ? where courseID=?',
				inserts = [data[i].courseName,data[i].note,data[i].courseID];
			sql = database.preparedQuery(sql, inserts);
			connection.query(sql, function (err, results) {
				if (err) {
					count = -1;
					callback(404, {msg: err});
				}
				if (count == -1) {
					return;
				}
				count--;
				if (count == 0) {
					callback(200, {msg: '更新成功'});
				}
			});
		}
	}
	else {
		callback(404, {msg: '参数错误'});
	}
}

/**
 * 删除与批量删除
 * @param courses
 * @param userID
 * @param callback
 */
Course.prototype.deleteCourses = function (dataObj, callback) {
	var data = dataObj.courses,
		userID = dataObj.userID;
	if (Array.isArray(data) && data.length > 0) {
		var paramSql = '(courseID = ?',
			logicSql1 = 'select courseID from td_course where userID = ? and ',
			logicSql2 = 'delete from td_chapter where ',
			logicSql3 = 'delete from td_course where userID = ? and ',
			inserts = [userID];
		for (var i = 0, len = data.length; i < len; i++) {
			if (i != 0) {
				paramSql += ' or courseID = ?';
			}
			inserts.push(data[i]);
		}
		paramSql += ')';
		logicSql1 = database.preparedQuery(logicSql1 + paramSql, inserts);
		connection.query(logicSql1, function (err, results) {
			if (err) {
				callback(404, {msg: err});
			}
			if (results.affectedRows != 0) {
				inserts.shift();
				logicSql2 = database.preparedQuery(logicSql2 + paramSql, inserts);
				connection.query(logicSql2, function (err, results) {
					if (err) {
						callback(404, {msg: err});
					}
					inserts.unshift(userID);
					logicSql3 = database.preparedQuery(logicSql3 + paramSql, inserts);
					connection.query(logicSql3, function (err, results) {
						if (err) {
							callback(404, {msg: err});
						}
						callback(200, {msg: results});
					});
				});
			}
		});
	}
	else {
		callback(404, {msg: '参数错误'});
	}
}

/**
 * 获取appkey
 * @param courseID
 * @param callback
 */
Course.prototype.getAppKey = function (courseID, callback) {
	var sql = 'select appkey from td_course where courseID=?',
		inserts = [courseModel.courseID];
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err})
		}
		else if (results) {
			if (results.length > 0) {
				callback(200, {result: results[0].appkey, msg: '取得appkey'});
			}
			else {
				callback(200, {result: null, msg: '未取得appkey'});
			}
		}
	});
}
