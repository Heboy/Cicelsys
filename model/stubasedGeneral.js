/**
 * Created by Heboy on 14-2-12.
 */
var database = require('../controller/database'),
	connection = null;

var SBGDModel = {
	stuID: null,
	courseID: null,
	chapterID: null,
	visits: null,
	effective: null,
	date: null
}

function StuBasedGeneralDate(dayObj) {
	SBGDModel.stuID = dayObj.stuID;
	SBGDModel.courseID = dayObj.courseID;
	SBGDModel.chapterID = dayObj.chapterID;
	SBGDModel.visits = dayObj.visits;
	SBGDModel.effective = dayObj.effective;
	SBGDModel.date = dayObj.date;
}
exports.StuBasedGeneralDate = StuBasedGeneralDate;

StuBasedGeneralDate.prototype.databaseInit = function () {
	connection = database.createConnection();
}

StuBasedGeneralDate.prototype.databaseEnd = function () {
	connection.end();
}

/**
 * 写入消息到模型day
 * @param callback
 */
StuBasedGeneralDate.prototype.addRecords = function (callback) {
	var sql = 'insert into td_stu_general(stuID,courseID,chapterID,visits,effective,date) values(?,?,?,?,?,?)',
		inserts = [SBGDModel.stuID, SBGDModel.courseID, SBGDModel.chapterID, SBGDModel.visits, SBGDModel.effective, SBGDModel.date];
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
