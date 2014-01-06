/**
 * Created by Heboy on 13-11-11.
 */

var regBtn = $('#regBtn');
var lgnBtn = $('#lgnBtn');
var login = $('#login');
var register = $('#register');

(function () {
	login.on('click', Login);
	register.on('click', Register);
	regBtn.on('click', {from: 'reg'}, exchangeForm);
})()

function Login(e) {
	var user = {
		user:$('#emailLgn').val(),
		pwd:$('#pwdLgn').val(),
		code:$('#codeLgn').val()
	}
	if (checkUserInfo(user)) {
		$.post('test.php', user, function (data) {
			if (data.result) {
				showErrMsg(data.result);
			}
		}, 'json');
	}
}

function Register(e) {
	var user = {
		user:$('#emailReg').val(),
		pwd:$('#pwdReg').val(),
		code:$('#codeReg').val()
	}
	console.log(user);
	if (checkUserInfo(user)) {
		$.post('test.php', user, function (data) {
			if (data.result) {
				showErrMsg(data.result);
			}
		}, 'json');
	}
}

function exchangeForm(e) {
	var lgnForm = $('#lgn');
	var regForm = $('#reg');
	var obj = {
		timer: null,
		alpha: 1
	};
	if (e.data.from == 'reg') {
		regBtn.off('click', exchangeForm);
		obj.timer = setInterval(function () {
			obj.alpha -= 0.3;
			lgnForm.css({opacity: obj.alpha});
			if (obj.alpha < 0) {
				clearInterval(obj.timer);
				lgnForm.css('display', 'none');
				regForm.css('display', 'block');
				lgnForm.css({opacity: 1});
				lgnBtn.on('click', {from: 'lgn'}, exchangeForm);
			}
		}, 100)
	}
	else if (e.data.from == 'lgn') {
		lgnBtn.off('click', exchangeForm);
		obj.timer = setInterval(function () {
			obj.alpha -= 0.3;
			regForm.css({opacity: obj.alpha});
			if (obj.alpha < 0) {
				clearInterval(obj.timer);
				regForm.css('display', 'none');
				lgnForm.css('display', 'block');
				regForm.css({opacity: 1});
				regBtn.on('click', {from: 'reg'}, exchangeForm);
			}
		}, 100)
	}
}

function showErrMsg(text) {
	if (typeof text !== 'string') {
		return;
	}
	$($('.bs-errMsg')[0]).text(text);
}

function checkUserInfo(user) {
	if (typeof user.user !== 'string' || typeof user.pwd !== 'string') {
		console.error('传入参数不是user对象');
		return false;
	}
	if (user.user.split(' ').length > 1 || user.pwd.split(' ').length > 1) {
		showErrMsg('用户名或密码包含空格');
		return false;
	}
	return true;
}

