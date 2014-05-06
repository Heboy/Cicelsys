/**
 * Created by Heboy on 14-4-8.
 */

/**
 * 检查ContentType
 * @param req
 *
 */
exports.checkContentType = function (req) {
	var contentType = req.header("content-type").split(';')[0];
	if (req.method.toLowerCase() == 'post') {
		if(contentType == 'application/x-www-form-urlencoded'){
			return true;
		}
		return false;
	}
}

exports.getAppkey = function(req,res){

}