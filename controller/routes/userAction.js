/**
 * Created by Heboy on 14-1-17.
 */
var userModel = require('../../model/user');
var cc = require('../DESCoder');

exports.getUserById = function(userID,callback){
	var user = new userModel.user(null);
	user.getUserById(userID,callback);
}

exports.Register = function (req, res) {
	var userObj = {
		userID:req.body.userID,
		password:req.body.password,
		department:req.body.department
	}
	var user = new userModel.user(userObj);
	user.databaseInit()
	user.addUser(function (status, msg) {
		res.json(status, msg);
		user.databaseEnd();
	});
}

exports.Login = function (req, res) {
	var userObj = {
		userID:req.body.userID,
		password:req.body.password
	}

	var user = new userModel.user(userObj);
	user.databaseInit();
	user.isUserExist(function (status, msg) {
		if (status == 200) {
			req.body.userID = userObj.userID;
		}
		res.json(status, msg);
		user.databaseEnd();
	})
}

exports.updateUserInfo = function(req,res){
	var userObj = {
		userID:req.body.userID,
		password:req.body.password,
		department:req.body.department
	}
	if(userObj.password||userObj.department){
		if(userObj.userID){
			var user = new userModel.user(userObj);
			user.databaseInit();
			user.updateUser(function(status,msg){
				res.json(status,msg);
				user.databaseEnd();
			})
		}
		else{
			res.json(404,{result:false,msg:'超时，重新登录'});
		}
	}
	else{
		res.json(404,{result:false,msg:'无更新值'});
	}
}