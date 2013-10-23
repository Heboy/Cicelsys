/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-4
 * Time: 下午7:51
 * To change this template use File | Settings | File Templates.
 */

var first = $('#first');  //获取网页上的元素
var firstBtns = $('.first-nav');
var firstTips = $('.first-tips');
var second = $('#second');
var firstSwitch = 'fold'; //unfold fold 开关变量，导航栏有两个状态，展开与折叠
first.on('click', clickHandle);

function clickHandle(e) {
	//声明三个动画效果
	var action = new Action(first[0]);
	var action2 = new Action(second[0]);
	var firstTipsEle = [];
	for(var i=0;i<firstTips.length;i++){
		firstTipsEle.push(firstTips[i]);
	}
	var action3 = new Actions(firstTipsEle);

	//当鼠标点击第一个按钮并且导航栏是折叠状态，展开导航栏
	if(e.target===firstBtns[0]&&firstSwitch==='fold'){
		firstSwitch = 'unfold';
		action.sildeLeft(5, 5);
		action3.gradualHidden(0.2);
		action2.gradualShow(0.1);
	}
	//鼠标点击非第一个按钮并且开关为展开状态，折叠导航栏
	else if((e.target===firstBtns[1]|| e.target===firstBtns[2])&&firstSwitch==='unfold'){
		firstSwitch = 'fold';
		action.sildeRight(5,50);
		action3.gradualShow(0.2);
		action2.gradualHidden(0.1);
	}
	//为未被点击的按钮更换背景图表，突出展示当前按钮
	for(var i= 0,max = firstBtns.length;i<max;i++){
		var posX = getStyle(firstBtns[i],'backgroundPositionX');
		if (firstBtns[i] === e.target){
			posX = '-4px';
			e.target.style.backgroundPositionX = posX;
			continue;
		}
		posX = '-125px';
		firstBtns[i].style.backgroundPositionX = posX;
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


