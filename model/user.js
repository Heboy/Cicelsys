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

function User(userObj) {
	userModel.userID = userObj.userID;
	userModel.password = userObj.password;
	userModel.department = userObj.department;
}
exports.user = User;

User.prototype.databaseInit = function () {
	connection = database.createConnection();
}

User.prototype.databaseEnd = function () {
	connection.end();
}

/**
 * 判断用户是否已经存在
 * @param callback
 */
User.prototype.isUserExist = function (callback) {
	var sql = 'select * from td_user where userID = ? and password = ?',
		inserts = [userModel.userID, userModel.password];
	sql = database.preparedQuery(sql, inserts);
	console.log(sql);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err})
		}
		else if (results) {
			console.log(results);
			if (results.length > 0) {
				callback(200, {result: true, msg: '用户名与密码匹配'});
			}
			else {
				callback(200, {result: false, msg: '用户名与密码不匹配'});
			}
		}
	});
}

/**
 * 添加用户
 * @param callback
 */
User.prototype.addUser = function (callback) {
	this.isUserIDExist(function (status, msg) {
		if (status == 404) {
			callback(404, msg);
		}
		else if (msg.result == true) {
			callback(404, {result: false, msg: '用户名已存在'});
		}
		else if (status == 200 && msg.result == false) {
			var sql = 'INSERT INTO td_user(userID,password,department) VALUES(?,?,?)',
				inserts = [userModel.userID, userModel.password, userModel.department];

			//数据库操作
			sql = database.preparedQuery(sql, inserts);
			connection.query(sql, function (err, results) {
				if (err) {
					callback(404, {result: false, msg: err});
				}
				else if (results.affectedRows == 1) {
					callback(200, {result: true, msg: '添加成功'});
				}
				else{
					callback(200, {result: false, msg: '添加失败'});
				}
			});
		}
	});
}

/**
 * 检查userID是否存在
 * @param userID
 */
User.prototype.isUserIDExist = function (callback) {
	var sql = 'select userID from td_user where userID = ?',
		inserts = [userModel.userID];
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
 * @param callback
 */
User.prototype.updateUser = function (callback) {
	var sql = 'update td_user set ',
		inserts = [];
	if (userModel.password) {
		sql += 'password = ?,';
		inserts.push(userModel.password);
	}
	if (userModel.department) {
		sql += 'department = ?,';
		inserts.push(userModel.department);
	}
	sql = sql.slice(0, sql.length - 1) + ' where userID = ?';
	inserts.push(userModel.userID);
	sql = database.preparedQuery(sql, inserts);
	connection.query(sql, function (err, results) {
		if (err) {
			callback(404, {result: false, msg: err});
		}
		else if (results.affectedRows == 1) {
			callback(200, {result: true, msg: '更新成功'});
		}
		else {
			callback(200, {result: false, msg: '更新失败'});
		}
	})
}

