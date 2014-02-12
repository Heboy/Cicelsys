/**
 * Created by Heboy on 14-2-11.
 */
var crypto = require('crypto');

exports.DESDecode = function (data, appkey) {
	var decipher = crypto.createDecipher('des', appkey);
	try {
		var dec = decipher.update(data, 'hex', 'utf8');
		dec += decipher.final('utf8');
	} catch (err) {
		dec = false;
	}
	return dec;
}

exports.DESEncode = function (data, appkey) {
	var cipher = crypto.createCipher('des', 'cicelsys')
	var text = '{"courseID": 8,"chapterID": 1,"visits": 401,"effective": 150,"day": 12}';
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex')
	console.log(crypted)
}