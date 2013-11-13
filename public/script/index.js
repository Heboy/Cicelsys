/**
 * Created by Heboy on 13-11-11.
 */

var lgnForm = $('#lgn');
var regForm = $('#reg');
var regBtn =  $('#regBtn');
var lgnBtn =  $('#lgnBtn');
var obj = {
	timer: null,
	alpha: 1
};

regBtn.on('click',{from:'reg'}, exchangeForm);

function exchangeForm(e) {

	if(e.data.from=='reg')
	{
		regBtn.off('click',exchangeForm);
		obj.alpha = 1;
		obj.timer = setInterval(function () {
			obj.alpha -= 0.3;
			lgnForm.css({opacity:obj.alpha});
			if (obj.alpha < 0) {
				clearInterval(obj.timer);
				lgnForm.css('display', 'none');
				regForm.css('display', 'block');
				lgnForm.css({opacity:1});
				lgnBtn.on('click',{from:'lgn'}, exchangeForm);
			}
		}, 100)
	}
	else if(e.data.from=='lgn')
	{
		lgnBtn.off('click',exchangeForm);
		obj.alpha = 1;
		obj.timer = setInterval(function () {
			obj.alpha -= 0.3;
			regForm.css({opacity:obj.alpha});
			if (obj.alpha < 0) {
				clearInterval(obj.timer);
				regForm.css('display', 'none');
				lgnForm.css('display', 'block');
				regForm.css({opacity:1});
				regBtn.on('click',{from:'reg'}, exchangeForm);
			}
		}, 100)
	}
}

