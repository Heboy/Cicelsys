/**
 * Created by Heboy on 14-2-11.
 */
var crypto = require('crypto'),
	userModel = require('../../model/user');

exports.DESDecode = function (req, res, callback) {
	var user = new userModel.user(null),
		decipher = null,
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
				decipher = crypto.createDecipher('des', req.session['appkey']);
				try {
					dec = decipher.update(req.body.data, 'hex', 'utf8');
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
		decipher = crypto.createDecipher('des', req.session['appkey']);
		try {
			dec = decipher.update(req.body.data, 'hex', 'utf8');
			dec += decipher.final('utf8');
			result = JSON.parse(dec);
		} catch (err) {
			res.json(404, {msg: 'appkey不匹配'});
		}
		callback(result);
	}
}

exports.DESEncode = function (data, appkey) {
	var cipher = crypto.createCipher('des', appkey);
	var crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}