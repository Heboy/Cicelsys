/**
 * Created by Heboy on 14-2-11.
 */
var crypto = require('crypto'),
	userModel = require('../../model/user');

exports.DESDecode = function (req, res, callback) {
	var user = new userModel.User(null),
		decipher = null,
		iv = '12345678',
		dec = null,
		result = null;
	if (req.session['appkey'] == null) {
		user.databaseInit();
		user.getAppkey(req.body.userID, function (appkey, msg) {
			if (appkey == '404') {
				res.json(400, msg);
			}
			else {
				req.session['appkey'] = appkey;
				decipher = crypto.createDecipheriv('des', req.session['appkey'],iv);
				try {
					dec = decipher.update(req.body.data, 'base64', 'utf8');
					dec += decipher.final('utf8');
					result = JSON.parse(dec);
				} catch (err) {
					res.json(404, {msg: 'appkey不匹配'});
				}
				finally {
					user.databaseEnd();
				}
				callback(result);
			}
		})
	}
	else {
		decipher = crypto.createDecipheriv('des', req.session['appkey'],iv);
		try {
			dec = decipher.update(req.body.data, 'base64', 'utf8');
			dec += decipher.final('utf8');
			result = JSON.parse(dec);
		} catch (err) {
			res.json(404, {msg: 'appkey不匹配'});
		}
		callback(result);
	}
}
///////////////////////////////////////////////////////
exports.DESEncode = function (data, appkey) {
	var
		cryptkey = 'cicelsys',
		iv = '12345678',
		buf = "course_管理学原理",
		enc = encode(cryptkey, iv, buf);
}
//no iv:OXrM99jS8HppUABtH9F6tg==
//iv: UXpDAPuakKTSuUjVLJZbPg==
//+m8/YEXInPRBOOmT/vDIpdvFwpWiVhEPprmWZp5mmOg=

//dex fiwp2A5pijy5X0qtIytljUEqxPPVUH6K
//fiwp2A5pijy5X0qtIytljUEqxPPVUH6K
function encode(cryptkey, iv, cleardata) {
	var
		encipher = crypto.createCipheriv('des', cryptkey,iv),
		encoded = encipher.update(cleardata, 'utf8', 'base64');

	encoded += encipher.final('base64');
	return encoded;
}