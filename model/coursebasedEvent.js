/**
 * Created by Heboy on 14-2-12.
 */
var database = require('../controller/database'),
	connection = null;

var CBEDModel = {
	eventName: null,
	visits: null,
	effective: null,
	courseID: null,
	chapterID: null,
	date: null
}

function CourseBasedEventDate(dayObj) {
	CBEDModel.eventName = dayObj.eventName;
	CBEDModel.visits = dayObj.visits;
	CBEDModel.effective = dayObj.effective;
	CBEDModel.courseID = dayObj.courseID;
	CBEDModel.chapterID = dayObj.chapterID;
	CBEDModel.date = dayObj.date;
}
exports.CourseBasedEventDate = CourseBasedEventDate;

CourseBasedEventDate.prototype.databaseInit = function () {
	connection = database.createConnection();
}

CourseBasedEventDate.prototype.databaseEnd = function () {
	connection.end();
}

/**
 * 写入消息到模型day
 * @param callback
 */
CourseBasedEventDate.prototype.addRecords = function (callback) {
	var sql = 'insert into td_course_event(eventName,visits,effective,courseID,chapterID,date) values(?,?,?,?,?,?)',
		inserts = [CBEDModel.eventName, CBEDModel.visits, CBEDModel.effective, CBEDModel.courseID, CBEDModel.chapterID, CBEDModel.date];
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
