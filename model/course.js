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
	appkey:null,
	note: null
}

function Course(courseObj) {
	courseModel.courseID = courseObj.courseID;
	courseModel.courseName = courseObj.courseName;
	courseModel.userID = courseObj.userID;
	courseModel.note = courseObj.note;
}
exports.course = Course;

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
 * 添加课程
 * @param callback
 */
Course.prototype.addCourse = function (callback) {
	this.isCourseNameExist(function (status, msg) {
		if (status == 404) {
			callback(404, msg);
		}
		else if (msg.result == true) {
			callback(404, {result: false, msg: '课程名已存在'});
		}
		else if (status == 200 && msg.result == false) {
			var sql = 'INSERT INTO td_course(courseName,userID,note) VALUES(?,?,?)',
				inserts = [ courseModel.courseName, courseModel.userID, courseModel.note];

			//数据库操作
			sql = database.preparedQuery(sql, inserts);
			connection.query(sql, function (err, result) {
				if (err) {
					callback(404, {result: false, msg: err});
				}
				else if (result.affectedRows == 1) {
					callback(200, {result: result.insertId, msg: '添加成功'});
				}
				else{
					callback(200, {result: false, msg: '添加失败'});
				}
			});
		}
	});
}

/**
 * 检查courseID是否存在
 * @param userID
 */
Course.prototype.isCourseNameExist = function (callback) {
	var sql = 'select courseName from td_course where userID = ? and courseName = ?',
		inserts = [courseModel.userID, courseModel.courseName];
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err})
		}
		else if (results) {
			if (results.length > 0) {
				callback(200, {result: true, msg: '课程存在'});
			}
			else {
				callback(200, {result: false, msg: '课程不存在'});
			}
		}
	});
}

/**
 *更新
 * @param callback
 */
Course.prototype.updateCourse = function (callback) {
	var sql = 'update td_course set ',
		inserts = [];
	if (courseModel.courseName) {
		sql += 'courseName = ?,';
		inserts.push(courseModel.courseName);
	}
	if (courseModel.note) {
		sql += 'note = ?,';
		inserts.push(courseModel.note);
	}
	sql = sql.slice(0, sql.length - 1) + ' where courseID = ?';
	inserts.push(courseModel.courseID);
	sql = database.preparedQuery(sql, inserts);
	console.log(sql);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err});
			return;
		}
		else if (results.affectedRows == 1) {
			callback(200, {result: true, msg: '更新成功'});
			return;
		}
		console.log(results);
		callback(200, {result: false, msg: '更新失败'});
	})
}

/**
 * 删除
 * 删除所有章节
 * 删除所有记录
 * @param callback
 */
Course.prototype.deleteCourse = function (callback) {
	var sql = 'delete from td_chapter where courseID = ?;delete from td_course where courseID = ?',
		inserts = [courseModel.courseID,courseModel.courseID];

	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err});
		}
		if (results[0].affectedRows == 1) {
			callback(200, {result: true, msg: '课程所属章节删除成功'});
		}
		if(results[1].affectedRows == 1){
			callback(200, {result: true, msg: '删除成功'});
		}
		else{
			callback(200, {result: false, msg: '删除失败'});
		}
	})
}

/**
 * 获取appkey
 * @param courseID
 * @param callback
 */
Course.prototype.getAppKey = function(courseID,callback){
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
