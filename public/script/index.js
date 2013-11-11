/**
 * Created by Heboy on 13-11-11.
 */

var lgnForm = $('#lgn');
var regForm = $('#reg');
var obj = {
	timer: null,
	alpha: 1
};

$('#regBtn').on('click',{from:'reg'}, exchangeForm);
$('#lgnBtn').on('click',{from:'lgn'}, exchangeForm);

function exchangeForm(e) {
	var hideObj = null;
	var showObj = null;
	if(e.data.from=='reg')
	{
		hideObj =lgnForm;
		showObj =regForm;
	}
	else if(e.data.from=='lgn')
	{
		hideObj =regForm;
		showObj =lgnForm;
	}
	obj.alpha = 1;
	obj.timer = setInterval(function () {
		obj.alpha -= 0.3;
		hideObj.css({opacity:obj.alpha});
		if (obj.alpha < 0) {
			clearInterval(obj.timer);
			hideObj.css('display', 'none');
			showObj.css('display', 'block');
			hideObj.css({opacity:1});
		}
	}, 100)
}

