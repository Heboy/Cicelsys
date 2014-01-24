/**
 * Created by Heboy on 14-1-24.
 */
var database = require('../controller/database'),
	connection = null;

var chapterModel = {
	chapterID:null,
	courseID:null,
	chapterName:null,
	note:null
}

function Chapter(chapterObj){
	chapterModel.chapterID = chapterObj.chapterID;
	chapterModel.courseID = chapterObj.courseID;
	chapterModel.chapterName = chapterObj.chapterName;
	chapterModel.note = chapterObj.note;
}
exports.chapter = Chapter;

Chapter.prototype.databaseInit = function () {
	connection = database.createConnection();
}

Chapter.prototype.databaseEnd = function () {
	connection.end();
}

Chapter.prototype.getChapters = function (callback) {
	var sql = 'select chapterID,chapterName,note from td_chapter where courseID = ?',
		inserts = [chapterModel.courseID];
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
 *
 * @param callback
 */
Chapter.prototype.addChapter = function (callback) {
	this.isChapterNameExist(function (status, msg) {
		if (status == 404) {
			callback(404, msg);
		}
		else if (msg.result == true) {
			callback(404, {result: false, msg: '章节名已存在'});
		}
		else if (status == 200 && msg.result == false) {
			var sql = 'INSERT INTO td_chapter(chapterName,courseID,note) VALUES(?,?,?)',
				inserts = [ chapterModel.chapterName, chapterModel.courseID, chapterModel.note];

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
 *
 * @param callback
 */
Chapter.prototype.isChapterNameExist = function (callback) {
	var sql = 'select chapterName from td_chapter where courseID = ? and chapterName = ?',
		inserts = [chapterModel.courseID, chapterModel.chapterName];
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err})
		}
		else if (results) {
			if (results.length > 0) {
				callback(200, {result: true, msg: '章节存在'});
			}
			else {
				callback(200, {result: false, msg: '章节不存在'});
			}
		}
	});
}

/**
 *更新
 * @param callback
 */
Chapter.prototype.updateChapter = function (callback) {
	var sql = 'update td_chapter set ',
		inserts = [];
	if (chapterModel.chapterName) {
		sql += 'chapterName = ?,';
		inserts.push(chapterModel.chapterName);
	}
	if (chapterModel.note) {
		sql += 'note = ?,';
		inserts.push(chapterModel.note);
	}
	sql = sql.slice(0, sql.length - 1) + ' where chapterID = ?';
	inserts.push(chapterModel.chapterID);
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
		callback(200, {result: false, msg: '更新失败'});
	})
}

/**
 * 删除
 * @param callback
 */
Chapter.prototype.deleteChapter = function (callback) {
	var sql = 'delete from td_chapter where chapterID = ?',
		inserts = [chapterModel.chapterID];

	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err});
		}
		else if (results.affectedRows == 1) {
			callback(200, {result: true, msg: '删除成功'});
		}
		else{
			callback(200, {result: false, msg: '删除失败'});
		}
	})
};