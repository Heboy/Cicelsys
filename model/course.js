/**
 * Created by Heboy on 14-1-23.
 */
var events = require('events').EventEmitter,
	util = require("util");

var db = null;

function Course(database) {
	db = database;
	events.EventEmitter.call(this);
}
util.inherits(Course, events.EventEmitter);

/**
 * 更新课程
 */
Course.prototype.update = function (courseObj) {
	var sql = 'update td_course set courseName = ?,note = ? where courseID=?',
		inserts = [courseObj.courseName, courseObj.note, courseObj.courseID];
	sql = db.preparedQuery(sql, inserts);
	db.query(sql, function (err, results) {
		//res.json({affectedRows: results.affectedRows});
		this.emit('updateComplete', results);
	});
}

/**
 * 添加课程
 */
Course.prototype.add = function (courseObj) {
	var sql = 'insert into td_course(courseName,userID,note) VALUES(?,?,?)',
		inserts = [courseObj.courseName, courseObj.userID, courseObj.note];
	sql = db.preparedQuery(sql, inserts);
	db.query(sql, function (err, results) {
		//res.json({affectedRows: results.affectedRows})
		this.emit('addComplete', results);
	});
}

/**
 * 获取课程信息
 */
Course.prototype.get = function (courseObj) {
	var sql = 'select * from td_course where courseID = ?',
		inserts = [courseObj.courseID];
	sql = db.preparedQuery(sql, inserts);
	db.query(sql, function (err, results) {
		//res.json({result: results});
		this.emit('getComplete', results);
	})
}


/**
 * 删除
 */
Course.prototype.delete = function (courseObj) {
	var sql1 = 'delete from td_chapter where courseID = ?',
		sql2 = 'delete from td_course where courseID = ?',
		inserts = [courseObj.courseID];
	sql1 = db.preparedQuery(sql1, inserts);
	db.query(sql1, function (err, results) {
		sql2 = db.preparedQuery(sql2, inserts);
		db.query(sql2, function (err, results) {
			this.emit('deleteComplete', results);
		});
	});
}

/**
 *
 * @param courses
 */
Course.prototype.addCourses = function (courses) {
	var sql = '',
		inserts = [];
	if (Array.isArray(courses)) {
		for (var i = 0, len = courses.length; i < len; i++) {
			sql = 'insert into td_course(courseName,userID,note) VALUES(?,?,?)';
			inserts = [courses.courseName, courses.userID, courses.note];
			sql += db.preparedQuery(sql, inserts) + ';';
		}
		db.query(sql, function (err, results) {
			this.emit('addComplete', results)
		})
	}
	else {
		this.emit('error', '参数类型错误');
	}
}

/**
 *
 * @param courses
 */
Course.prototype.updateCourses = function (courses) {
	var sql = '',
		inserts = [];
	if (Array.isArray(courses)) {
		for (var i = 0, len = courses.length; i < len; i++) {
			sql = 'update td_course set courseName = ?,note = ? where courseID=?';
			inserts = [courses.courseName, courses.note, courses.courseID];
			sql += db.preparedQuery(sql, inserts) + ';';
		}
		db.query(sql, function (err, results) {
			this.emit('updateComplete', results);
		})
	}
	else {
		this.emit('error', '参数类型错误');
	}
}

/**
 *
 * @param ids
 */
Course.prototype.getCourses = function (ids) {
	var sql = 'select * from td_course where courseID = ?',
		param = '';
	if (Array.isArray(ids)) {
		for (var i = 0, len = ids.length; i < len; i++) {
			if (i != 0) {
				param += ' or courseID = ?';
			}
			param.push(ids[i]);
		}
		param += ')';
		sql = db.preparedQuery(sql + param, ids);
		db.query(sql, function (err, results) {
			this.emit('deleteComplete', results);
		})
	}
	else {
		this.emit('error', '参数类型错误');
	}
}

/**
 *
 * @param ids
 */
Course.prototype.deleteCourses = function (ids) {
	var param = '(courseID = ?',
		sql1 = 'delete from td_chapter where ',
		sql2 = 'delete from td_course where ';
	if (Array.isArray(ids)) {
		for (var i = 0, len = ids.length; i < len; i++) {
			if (i != 0) {
				param += ' or courseID = ?';
			}
			param.push(ids[i]);
		}
		param += ')';
		sql1 = db.preparedQuery(sql1 + param, ids);
		db.query(sql1, function (err, results) {
				sql2 = db.preparedQuery(sql2 + param, ids);
				db.query(sql2, function (err, results) {
					this.emit('deleteComplete',results);
				});
			});
	}
	else {
		this.emit('error', '参数类型错误');
	}
}

exports.Course = Course;
