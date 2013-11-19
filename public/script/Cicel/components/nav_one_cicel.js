/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-24
 * Time: 上午9:37
 * To change this template use File | Settings | File Templates.
 */
/**
 * @param body 承载nav的div
 * @param nav
 * @param index int 默认的当前按钮
 * @constructor
 */
function Nav_One_Cicel(body, nav, index) {
	var status = [];
	status.init = true;
	var div = $('<div class="nav-one-c"></div>');
	for (var i = 0, len = nav.length; i < len; i++) {
		var firstDiv = $('<div class="nav-one-firstnav"></div>');
		var secondDiv = $('<div class="nav-one-secondnav"></div>')
		if (nav[i].subNav) {
			firstDiv.append('<a class="nav-one-title">' + nav[i].name + '</a>');
			for (var j = 0; j < nav[i].subNav.length; j++) {
				var subNav = $('<div class="subnav"></div>');
				var wrap = $('<a href="' + nav[i].subNav[j].link + '"></a>');
				subNav.css({backgroundPosition: '-66px -5px'});
				subNav.append('<a class="nav-one-subtitle" href="' + nav[i].subNav[j].link + '">' + nav[i].subNav[j].name + '</a>');
				wrap.append(subNav);
				secondDiv.append(wrap);
			}
			firstDiv.append(secondDiv);
			firstDiv.attr('cicel-fold', 'true');
			div.append(firstDiv);
		}
		else {
			firstDiv.append('<a class="nav-one-title" href="' + nav[i].link + '">' + nav[i].name + '</a> ');
			var wrap = $('<a href="' + nav[i].link + '"></a>');
			wrap.append(firstDiv);
			div.append(wrap);
		}
		switch (i) {
			case 0:
				if (index == 0) {
					firstDiv.css({backgroundPosition: '-3px -5px'});
					break;
				}
				firstDiv.css({backgroundPosition: '-125px -5px'});
				break;
			case 1:
				if (index == 1) {
					firstDiv.css({backgroundPosition: '-3px -66px'});
					break;
				}
				firstDiv.css({backgroundPosition: '-125px -66px'});
				break;
			case 2:
				if (index == 2) {
					firstDiv.css({backgroundPosition: '-3px -127px'});
					break;
				}
				firstDiv.css({backgroundPosition: '-125px -127px'});
				break;
			default :
				firstDiv.css({backgroundPosition: '-3px -5px'});
				break;
		}
	}
	$(body).append(div);
	status.push($('.nav-one-firstnav')[index]);
	div.on('click', clickHandle);

	function clickHandle(e) {
		if ($(e.target).attr('cicel-fold') && status.init) {
			sildeLeft();
		}
		else if ($(e.target).attr('cicel-fold')) {
			sildeRight();
			sildeLeft();
		}
		var last = status.shift();
		var bgx = $(last).css('backgroundPosition').split(' ')[0];
		var bgy = $(last).css('backgroundPosition').split(' ')[1];
		$(last).css({backgroundPosition:'-125px '+bgy});
		$(e.target).css({backgroundPosition:bgx+' -5px'});
		$(last.childNodes[1]).css({display: 'none'});
		$(e.target.childNodes[1]).css({display: 'block'});
		status.push(e.target);
	}

	function sildeLeft() {
		var pos = 0;
		div.css({marginLeft: pos + 'px'});
		var self = this;
		self.timer1 = setInterval(function () {
			pos = pos - 20;
			div.css({marginLeft: pos + 'px'});
			if (pos <= -60) {
				clearInterval(self.timer1);
			}
		}, 25);
	}

	function sildeRight() {
		var pos = -60;
		div.css({marginLeft: pos + 'px'});
		var self = this;
		self.timer = setInterval(function () {
			pos = pos + 20;
			div.css({marginLeft: pos + 'px'});
			if (pos >= 0) {
				clearInterval(self.timer);
			}
		}, 25);
	}
}
