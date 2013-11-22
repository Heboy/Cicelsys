/**
 * Created by Heboy on 13-11-22.
 */
var mysql = require('mysql');
exports.getConnection = function () {
	var connection = mysql.createConnection({
		user: 'root',
		password: '123456',
		database: 'xss'
	});
	connection.connect();
	return connection;
}