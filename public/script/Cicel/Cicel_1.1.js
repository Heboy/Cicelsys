/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-8-25
 * Time: 下午10:30
 * To change this template use File | Settings | File Templates.
 */
/***
 * 开始统计
 * var cicel = new Cicel(appkey)//每一个课程都会分配一个appkey
 * 安全性：appkey映射课程，当该域名在白名单中并且该域名下的appkey集合中包含当前appkey时写入数据
 * 测试时body不得为空
 *
 * 添加自定义事件
 * cicel.addCustomEvent(eventName,eventValue);
 * 例：统计页面上哪一个视频文件被播放的次数最多
 * 1.为所有视频添加点击事件countPlayTimes
 * var customEvent = {eventname:'播放数量统计',eventValue:{vedio1:0,vedio2:0,vedio3:0}}
 * function countPlayTimes(e){
 *	if(e.target.id = 'vedio1'){
 *	 customEvent.eventValue.vedio1+=1;
 *	}else if(e.target.id=='vedio2'){...}
 * }
 * 在下次发送的时候会发送该事件
 * 2.统计在线测试题目的平均得分
 * var customEvent = {eventname:'平均得分统计',eventValue:0}
 * function finish(e){
 *   customEvent.eventValue = 78//完成后把得分赋值给eventValue
 * }
 * 在下次发送时会传送这个event，每次自动发送时都会发送这个事件，并且更新数据库中的数据
 * customEvent.commitWay = 'auto';
 * 手动发送,只发送一次
 * customEvent.commitWay = 'handwork'
 *
 * appkey针对课程的映射
 * GRUD针对每一个用户的记录
 *
 * 自定义事件与普通统计的远程地址不一样
 */
var Cicel = {
	appKey:null,
	isArray:function(obj){
		return Object.prototype.toString.call(obj) === '[object Array]';
	},
	sendMsg : function(obj,url){
		var xhr = new XMLHttpRequest();
		xhr.open('post', url, true);
		xhr.send(JSON.stringify(obj));
		console.log(JSON.stringify(obj));
	}
};

Cicel.Start = function (appkey, chapterID) {
	if(typeof appkey!=='number'||typeof chapterID!=='number'){
		throw new Error('初始化失败，appkey或者chapterID必须为数字类型');
	}
	this.customEvent = [];
	Cicel.appKey = appkey;
	var body = document.getElementsByTagName('body')[0];
	var self = this;

	var createGUID = function () {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}

		function NewGuid() {
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		}

		return NewGuid();
	}

	var basicInfo = {
		appkey: appkey,
		chapterID: chapterID,
		guid: createGUID(),
		starttime: new Date().getTime(),
		staytime: 0
	}

	var outofwindow = function (evt, target) {
		function contains(parentNode, childNode) {
			if (parentNode.contains) {
				return parentNode != childNode && parentNode.contains(childNode);
			}
			else {
				return !!(parentNode.compareDocumentPosition(childNode) & 16);
			}
		}

		function getEvent(e) {
			return e || window.event;
		}

		function OutOfArea(evt, target) {
			var rel = getEvent(evt).relatedTarget ,
				from = getEvent(evt).fromElement ,
				to = getEvent(evt).toElement;
			if (getEvent(evt).type == "mouseover") {
				return !contains(target, rel || from) && !( (rel || from) === target );
			} else {
				return !contains(target, rel || to) && !( (rel || to) === target );
			}
		}

		return OutOfArea;
	}

	body.addEventListener("mouseout", outOfArea);

	function outOfArea(e) {
		if (outofwindow(e, body)) {
			basicInfo.staytime = new Date().getTime() - basicInfo.starttime;
			Cicel.sendMsg(basicInfo,'http://basicInfo.com');
			if(self.customEvent.length>0){
				Cicel.sendMsg(self.customEvent,'http://customEvent.com');
			}
			body.removeEventListener("mouseout", outOfArea);
			setTimeout(function () {
				body.addEventListener("mouseout", outOfArea);
			}, 10000);
		}
	}

}

/**
 *
 * @param events 需要自动提交的自定义事件数组
 */
Cicel.Start.prototype.addEvents = function(events){
	if(Cicel.isArray(events)&&events.length>0){
		this.customEvent = events;
	}else{
		throw new Error('addEvents参数错误,不为数组或数组长度为0');
	}
}

/**
 *
 * @param eventName 字符串 不得为空
 * @param eventValue 数字类型 其他类型会被转换为-1
 * @returns {*}
 * @constructor
 */
Cicel.CustomEvent = function (eventName,eventValue) {
	if(!(typeof eventName==='string')){
		return null;
	}
	if(!eventValue||!(typeof eventValue==='number')){
		eventValue = -1;
	}
	return {
		appkey:Cicel.appKey,
		eventName:eventName,
		eventValue:eventValue
	}
}


