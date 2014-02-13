/**
 * Created by Heboy on 14-2-12.
 */
var database = require('../controller/database'),
	connection = null;

var SBEDModel = {
	stuID:null,
	eventName: null,
	eventValue: null,
	courseID: null,
	chapterID: null,
	date: null
}

function StuBasedEventDate(dayObj) {
	SBEDModel.stuID = dayObj.stuID;
	SBEDModel.eventName = dayObj.eventName;
	SBEDModel.eventValue = dayObj.eventValue;
	SBEDModel.courseID = dayObj.courseID;
	SBEDModel.chapterID = dayObj.chapterID;
	SBEDModel.date = dayObj.date;
}
exports.StuBasedEventDate = StuBasedEventDate;

StuBasedEventDate.prototype.databaseInit = function () {
	connection = database.createConnection();
}

StuBasedEventDate.prototype.databaseEnd = function () {
	connection.end();
}

/**
 * 写入消息到模型day
 * @param callback
 */
StuBasedEventDate.prototype.addRecords = function (callback) {
	var sql = 'insert into td_stu_event(stuID,eventName,eventValue,courseID,chapterID,date) values(?,?,?,?,?,?)',
		inserts = [SBEDModel.stuID, SBEDModel.eventName, SBEDModel.eventValue, SBEDModel.courseID, SBEDModel.chapterID, SBEDModel.date];
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
