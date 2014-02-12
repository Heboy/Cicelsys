/**
 * Created by Heboy on 14-2-12.
 */
var database = require('../controller/database'),
	connection = null;

var dayModel = {
	courseID: null,
	chapterID: null,
	visits: null,
	effective: null,
	day: null
}

function Day(dayObj) {
	dayModel.courseID = dayObj.courseID;
	dayModel.chapterID = dayObj.chapterID;
	dayModel.visits = dayObj.visits;
	dayModel.effective = dayObj.effective;
	dayModel.day = dayObj.day;
}
exports.day = Day;

Day.prototype.databaseInit = function () {
	connection = database.createConnection();
}

Day.prototype.databaseEnd = function () {
	connection.end();
}

/**
 * 写入消息到模型day
 * @param callback
 */
Day.prototype.addRecords = function (callback) {
	var sql = 'insert into td_day(courseID,chapterID,visits,effective,day) values(?,?,?,?,?)',
		inserts = [dayModel.courseID, dayModel.chapterID, dayModel.visits, dayModel.effective, dayModel.day];
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err});
		}
		if (results.affectedRows == 1) {
			callback(200, {result: true, msg: '添加成功'});
		}
		else {
			callback(200, {result: false, msg: '添加失败'});
		}
	});
}
