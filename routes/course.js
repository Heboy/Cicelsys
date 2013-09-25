/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-9-23
 * Time: 下午11:50
 * To change this template use File | Settings | File Templates.
 */

var conf = require('./config.js');
var mysql = require('mysql');
var pool = mysql.createPool(conf.local);
/**
 * need userId
 * @param req
 * @param res
 * @param next
 */
exports.courseData = function (req, res, next) {
	var userId = req.body.userId;
	var courseInfo = null;
	userId = 1;
	pool.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
		}
		conn.query('CALL pro_get_man_parent_info(?)', [userId], function (err, result) {
			var courseInfo = result[0];
			if (courseInfo.length > 0) {
				var count = 0;//计数器，记录子查询的个数
			}
			else {
				conn.release();
			}
		});
	});
}

exports.getCourseData = function (req, res, next) {
	var courseID = req.body.courseID;	//
	var startTime = req.body.startTime; //时间戳/1000
	var delay = req.body.delay;	//天数
	var courseData = null;
	courseID = 1;
	startTime = new Date().getTime() / 1000;
	delay = 30;
	pool.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
		}
		conn.query('CALL pro_getCoursePV4(?,?,?)', [courseID, startTime, delay], function (err, result) {
			if (result[0].length > 0) {
				var result = result[0];
				for (var i in result) {
					result[i].now_day = new Date(result[i].now_day).getFullYear() + ":" +
						(new Date(result[i].now_day).getMonth() + 1) + ":" + new Date(result[i].now_day).getDate();
				}
				res.write(JSON.stringify({data: result}));
			}
			conn.release();
		});
	});
}