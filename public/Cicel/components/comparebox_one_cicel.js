/**
 * jquery1.8 is needed
 * @constructor
 */
function CompareBox_Component_Cicel() {

	function Box() {
		this.title = $('<p class="CompareBox-title">点击添加课程ID</p>');
		this.closeBtn = $('<div class="CompareBox-close"></div>');
		this.input = $('<div class="CompareBox-input"><input id="field" type="text" style="width: 130px"><input id="confirm" type="button" value="确定"></div>');
		this.box = $('<div class="CompareBox-nodata"></div>');
		this.box.append(this.title);
		this.box.append(this.input);
		this.box.append(this.closeBtn);

	};
	Box.prototype.default = function(){
		this.box.attr('class','CompareBox-nodata');
		this.title.text('点击添加课程ID');
		this.closeBtn.css('display','none');
		this.input.css('display','none');
	}
	Box.prototype.getBox = function () {
		return this.box;
	};
	Box.prototype.getInput = function () {
		return this.input;
	};
	Box.prototype.getTitle = function () {
		return this.title;
	};
	Box.prototype.getCloseBtn = function () {
		return this.closeBtn;
	}

	if (!this.box) {
		this.box = new Box();
		this.boxBody = this.box.getBox();
		this.boxBody.on('click', addData);
		this.courseID = null;
	}
	var self = this;

	function addData(e) {
		var target = $(e.target);
		if (target.attr('id') == 'confirm') {
			self.box.getInput().css('display','none');
			$.ajax({
				type: 'GET',
				url: '/RemoteData/getCourse.js',
				success: function (data) {
					if (data) {
						self.courseID = $('#field').val();
						self.boxBody.attr('class', 'CompareBox-hasdata');
						self.box.getTitle().text('管理学');
						self.boxBody.append(self.box.getCloseBtn());
						self.boxBody.on('mouseover',showClose);
						self.boxBody.on('mouseout',hideClose);
					}
				},
				error: function (xhr, error) {
					self.box.getTitle().text('添加失败，点击重试');
					self.boxBody.on('click', addData);
				},
				timeout: 30000
			});
			self.box.getTitle().text('正在查询...');
		}
		else if (target.attr('class') == 'CompareBox-close') {
			self.boxBody.off('mouseover');
			self.boxBody.off('mouseout');
			self.box.default();
		}
		else if (target.attr('class') == 'CompareBox-title' || target.attr('class') == 'CompareBox-nodata') {
			//将输入框渲染到页面上
			self.box.getInput().show('fast');
		}

		function showClose(e){
			self.box.getCloseBtn().css('display', 'block');
		}
		function hideClose(e){
			self.box.getCloseBtn().css('display', 'none');
		}
	}
}
CompareBox_Component_Cicel.prototype.appendBody = function(body){
	body.append(this.boxBody);
}
CompareBox_Component_Cicel.prototype.prependBody = function(body){
	body.prepend(this.boxBody);
}
CompareBox_Component_Cicel.prototype.getCourseID = function(body){
	return this.courseID;
}

