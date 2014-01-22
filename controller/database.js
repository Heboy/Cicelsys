/**
 * Created by Heboy on 13-11-22.
 */
var mysql = require('mysql'),
	connection = null;

exports.createConnection = function () {
	return  connection = mysql.createConnection({
		user: 'root',
		password: '123456',
		database: 'cicelsys'
	})
}

exports.connect = function () {
	if (connection) {
		connection.connect();
	}
}

exports.end = function () {
	if (connection) {
		connection.end();
	}
	connection = null;
}

/**
 *
 * @param query
 * @param params Array
 */
exports.preparedQuery = function (sql, params) {
	return mysql.format(sql, params);
}