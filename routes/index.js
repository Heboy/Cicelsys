/*
 * GET home page.
 */
var connection = require('../controllers/conn');
exports.index = function (req, res, next) {
//	判断COOKIE是否存在
//	存在的话直接跳转到登陆后首页
//	不存在的话显示未登录首页
	res.render('index', { title: '首页' });
	console.log(req.get('User-Agent'));
//	if(req.cookies.user){
//
//	}
//	else{
//
//	}
};

exports.loginHandle = function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	var sql = req.body.sql;
	if(sql){
		var a = connection.getConnection();
		a.query(sql,function(err,rows,field){
			if(err){
				throw new Error(err);
			}
			console.log(rows[0]);
			res.locals.value = rows[0];
			exports.index(req,res,next);
		});
		a.end();
	}
	else{
		res.locals.value = 'no value';
		exports.index(req,res,next);
	}
}