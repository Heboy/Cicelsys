/*
 * GET home page.
 */

exports.index = function (req, res, next) {
//	判断COOKIE是否存在
//	存在的话直接跳转到登陆后首页
//	不存在的话显示未登录首页
	if(req.cookies.user){
		exports.index2(req, res, next);
	}
	else{
		res.render('index', { title: '没有COOKIE' });
	}
};

exports.index2 = function(req,res,next){
	console.log(req.cookies.user);
	res.render('index',{title:'COOKIE!'});
}