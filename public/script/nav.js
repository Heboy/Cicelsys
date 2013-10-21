/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-4
 * Time: 下午7:51
 * To change this template use File | Settings | File Templates.
 */

// var first = document.getElementById('first');  //获取网页上的元素
// var firstBtns = document.getElementsByClassName('first-nav');
// var firstTips = document.getElementsByClassName('first-tips');
// var second = document.getElementById('second');
var first = $('#first');  //获取网页上的元素
var firstTips = $('.first-tips');
var second = $('#second');

var firstBtns = $('.first-nav');
var firstBtns_dom0 = firstBtns[0];
var firstBtns_dom1 = firstBtns[1];
var firstBtns_dom2 = firstBtns[2];

var firstSwitch = 'fold'; //unfold fold 开关变量，导航栏有两个状态，展开与折叠
$(document).ready(function() {
	$("#first").click(clickHandle);
});

function clickHandle(e) {
	//声明三个动画效果
	var action = new Action(first);
	var action2 = new Action(second);
	var action3 = new Actions(firstTips);

	//当鼠标点击第一个按钮并且导航栏是折叠状态，展开导航栏
	if(e.target===firstBtns_dom0 && firstSwitch==='fold'){
		firstSwitch = 'unfold';
		action.sildeLeft(5, 5);
		action3.gradualHidden(0.2);
		action2.gradualShow(0.1);
	}
	//鼠标点击非第一个按钮并且开关为展开状态，折叠导航栏
	else if((e.target===firstBtns_dom1|| e.target===firstBtns_dom2)&&firstSwitch==='unfold'){
		firstSwitch = 'fold';
		action.sildeRight(5,50);
		action3.gradualShow(0.2);
		action2.gradualHidden(0.1);
	}
	//为未被点击的按钮更换背景图表，突出展示当前按钮
	for(var i= 0,max = firstBtns.length;i<max;i++){
		// var dom_firstBtns = firstBtns.get[i];
		var pos = getStyle(firstBtns[i],'backgroundPosition').split(' ');
		if (firstBtns[i] === e.target){
			pos = '-4px '+pos[1];
			e.target.style.backgroundPosition = pos;
			continue;
		}
		pos = '-125px '+pos[1];
		firstBtns[i].style.backgroundPosition = pos;
	}

}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else {
		return document.defaultView.getComputedStyle(obj, null)[attr];
	}
}
