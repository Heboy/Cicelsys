/**
 * Created by Heboy on 14-1-17.
 */
var userModel = require('../../model/user');

exports.Register = function (req, res) {
	if (req.originalUrl == '/register') {
		var userID = req.body.userID,
			password = req.body.password,
			department = req.body.department;

		var user = new userModel.user(userID, password, department);
		user.databaseInit()
		user.addUser(function (status, msg) {
			res.json(status, msg);
			user.databaseEnd();
		});
	}
	else {
		res.json(404, {msg: '无权限'});
	}
}

exports.Login = function (req, res) {
	if (req.originalUrl == '/login') {
		var userID = req.body.userID,
			password = req.body.password;

		var user = new userModel.user(userID, password, null);
		user.isUserExist(function(status,msg){
			if(status==200){
				req.session.userID = userID;
				res.json(status,msg);
			}
			else{
				res.json(status,msg);
			}
		})
	}
}