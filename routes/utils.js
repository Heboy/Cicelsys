/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-9-25
 * Time: 下午5:29
 * To change this template use File | Settings | File Templates.
 */
exports.ReturnResult = function(res,result,type){
	if(!type){
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.write(JSON.stringify(result));
		res.end();
	}else{
		switch (type) {
			case 200:
				break;
			case 404:
				break;
			default :
		}
	}

}