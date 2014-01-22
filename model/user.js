/**
 * Created by Heboy on 14-1-20.
 */
var database = require('../controller/database'),
	connection = null;

var userModel = {
	userID: null,
	password: null,
	department: null
}

function user(userID, password, department) {
	userModel.userID = userID;
	userModel.password = password;
	userModel.department = department;
}
exports.user = user;

user.prototype.databaseInit = function(){
	connection = database.createConnection();
}

user.prototype.databaseEnd = function(){
	connection.end();
}
/**
 *
 */
user.prototype.isUserExist = function (callback) {
	var sql = 'select * from td_user where userID = ? and password = ?',
		inserts = [this.userID, this.password];
	var connection = database.createConnection();
	sql = database.preparedQuery(sql, inserts);
	var query = connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: err})
		}
		else if (results) {
			if (results.length > 0) {
				callback(200, {result: true});
			}
			else {
				callback(200, {result: false});
			}
		}
	});
}

/**
 * 添加用户
 * @param callback
 */
user.prototype.addUser = function (callback) {
//	var connection = database.createConnection();
	this.isUserIDExist(function (status, msg) {
		if (status == 404) {
			callback(404, msg);
		}
		else if (msg.result == true) {
			callback(404, {result: false, msg: '用户名已存在'});
		}
		else if (status == 200 && msg.result == false) {
//			connection.connect();
			var sql = 'INSERT INTO td_user(userID,password,department) VALUES(?,?,?)',
				inserts = [userModel.userID, userModel.password, userModel.department];

			//数据库操作
			sql = database.preparedQuery(sql, inserts);
			connection.query(sql, function (err, results) {
				if (err) {
					callback(404, {msg: err});
				}
				else if (results.affectedRows == 1) {
					callback(200, {result: true, msg: '添加成功'});
				}
			});
		}
	});
}

/**
 * 检查userID是否存在
 * @param userID
 */
user.prototype.isUserIDExist = function (callback) {
//	var connection = database.createConnection();
	var sql = 'select userID from td_user where userID = ?',
		inserts = [userModel.userID];
//	connection.connect();
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err})
		}
		else if (results) {
			if (results.length > 0) {
				callback(200, {result: true, msg: '用户存在'});
			}
			else {
				callback(200, {result: false, msg: '用户不存在'});
			}
		}
	});
}

/**
 *更新
 * @param res
 */
user.prototype.updateUser = function (res) {

}

