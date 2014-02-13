/**
 * Created by Heboy on 14-2-12.
 */
var database = require('../controller/database'),
	connection = null;

var CBGDModel = {
	courseID: null,
	chapterID: null,
	visits: null,
	effective: null,
	date: null
}

function CourseBasedGeneralDate(dayObj) {
	CBGDModel.courseID = dayObj.courseID;
	CBGDModel.chapterID = dayObj.chapterID;
	CBGDModel.visits = dayObj.visits;
	CBGDModel.effective = dayObj.effective;
	CBGDModel.date = dayObj.date;
}
exports.CourseBasedGeneralDate = CourseBasedGeneralDate;

CourseBasedGeneralDate.prototype.databaseInit = function () {
	connection = database.createConnection();
}

CourseBasedGeneralDate.prototype.databaseEnd = function () {
	connection.end();
}

/**
 * 写入消息到模型day
 * @param callback
 */
CourseBasedGeneralDate.prototype.addRecords = function (callback) {
	var sql = 'insert into td_course_general(courseID,chapterID,visits,effective,date) values(?,?,?,?,?)',
		inserts = [CBGDModel.courseID, CBGDModel.chapterID, CBGDModel.visits, CBGDModel.effective, CBGDModel.date];
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
