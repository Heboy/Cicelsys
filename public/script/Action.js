/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-5
 * Time: 下午7:20
 * To change this template use File | Settings | File Templates.
 */
/**
 * 动画对象
 * @param element需要动画效果的元素
 * @constructor
 */
function Action(element) {
	if (!element) {
		throw new Error('Action无参数');
	}
	this.timer = null;
	this.element = element;
	this.getStyle = function (obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		}
		else {
			return document.defaultView.getComputedStyle(obj, null)[attr];
		}
	}
}

/**
 * 向左滑动
 * @param speed
 * @param endPos
 */
Action.prototype.sildeLeft = function (speed, endPos) {
	var self = this;
	self.element.nowPos = parseInt(self.getStyle(self.element, 'marginLeft'));
	function _silde() {
		if (self.element.nowPos < endPos) {
			clearInterval(self.timer);
			return;
		}
		self.element.nowPos -= speed;
		self.element.style.marginLeft = self.element.nowPos + 'px';
	}

	self.timer = setInterval(_silde, 10);
}

/**
 * 向右滑动
 * @param speed
 * @param endPos
 */
Action.prototype.sildeRight = function (speed, endPos) {
	var self = this;
	self.element.nowPos = parseInt(self.getStyle(self.element, 'marginLeft'));
	function _silde() {
		if (self.element.nowPos > endPos) {
			clearInterval(self.timer);
			return;
		}
		self.element.nowPos += speed;
		self.element.style.marginLeft = self.element.nowPos + 'px';
	}

	self.timer = setInterval(_silde, 10);
}

/**
 * 渐进显示
 * @param speed
 */
Action.prototype.gradualShow = function (speed) {
	var self = this;
	self.element.display = self.getStyle(self.element, 'display');
	self.element.opacity = parseInt(self.getStyle(self.element, 'opacity'));
	if (self.element.opacity >= 1) {
		self.element.opacity = 0;
		self.element.style.opacity = 0;
	}
	if (self.element.display !== 'block') {
		self.element.style.display = 'block';
	}
	function _gradualShow() {
		if (self.element.opacity > 1) {
			self.element.style.opacity = 1;
			clearInterval(self.timer);
			return;
		}
		self.element.opacity += speed;
		self.element.style.opacity = self.element.opacity;
	}

	self.timer = setInterval(_gradualShow, 30);
}

/**
 * 渐进隐藏
 * @param speed
 */
Action.prototype.gradualHidden = function (speed) {
	var self = this;
	self.element.display = self.getStyle(self.element, 'display');
	self.element.opacity = parseInt(self.getStyle(self.element, 'opacity'));
	if (self.element.opacity <= 0) {
		self.element.opacity = 1;
		self.element.style.opacity = 1;
	}
	if (self.element.display !== 'block') {
		self.element.style.display = 'block';
	}
	function _gradualShow() {
		if (self.element.opacity < 0) {
			self.element.style.opacity = 0;
			self.element.style.display = 'none';
			clearInterval(self.timer);
			return;
		}
		self.element.opacity -= speed;
		self.element.style.opacity = self.element.opacity;
	}

	self.timer = setInterval(_gradualShow, 30);
}

/**
 * 数组动画对象
 * @param elements
 * @constructor
 */
function Actions(elements) {
	if (!elements || !elements.length) {
		throw new Error('Actions参数错误');
	}
	this.elements = elements;
	this.actions = [];
	for (var i = 0, max = this.elements.length; i < max; i++) {
		this.actions.push(new Action(this.elements[i]));
	}
}

/**
 *
 * @param speed
 * @param endPos
 */
Actions.prototype.sildeLeft = function (speed, endPos) {
	for (var i = 0; i < this.actions.length; i++) {
		this.actions[i].sildeLeft(speed, endPos);
	}
}

/**
 *
 * @param speed
 * @param endPos
 */
Actions.prototype.sildeRight = function(speed,endPos){
	for (var i = 0; i < this.actions.length; i++) {
		this.actions[i].sildeLeft(speed, endPos);
	}
}

/**
 *
 * @param speed
 */
Actions.prototype.gradualShow = function(speed){
	for (var i = 0; i < this.actions.length; i++) {
		this.actions[i].gradualShow(speed);
	}
}

/**
 *
 * @param speed
 */
Actions.prototype.gradualHidden = function(speed){
	for (var i = 0; i < this.actions.length; i++) {
		this.actions[i].gradualHidden(speed);
	}
}