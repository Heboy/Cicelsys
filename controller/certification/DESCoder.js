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
	var text = '{"eventName": "测试事件","visits": 201,"effective": 110,"courseID": 8,"chapterID":1, "date": "2014-2-12"}';
	var text2 = '{"stuID": "唐海波","courseID": 8,"chapterID": 1,"visits": 114,"effective":40, "date": "2014-2-12"}';
	var text3 =  '{"stuID": "唐海波","eventName": "测试事件","eventValue": 1,"courseID": 8,"chapterID":1, "date": "2014-2-12"}';
	var crypted = cipher.update(text3, 'utf8', 'hex')
	crypted += cipher.final('hex')
	console.log(crypted)
}