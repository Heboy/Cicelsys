/**
 * Created by Heboy on 13-12-12.
 */
function Cicel(courseID, chapterID) {
	var url = 'http://cicelsys.tbyto.com/request/recievendata.php';//服务器地址
	var min = 1000;//时间间隔，毫秒
	var timestamp = {
		//时间节点，单位为min
		data: [0, 1, 2, 3, 4, 5],
		//弹出被使用过的时间节点
		next: function () {
			this.data.shift();
			return this;
		},
		//把分钟转换为毫秒
		interval: function () {
			return (this.data[1] - this.data[0]) * min;
		},
		staytime: function () {
			return this.data[0];
		}
	}
	var courseID = courseID;
	var chapterID = chapterID;
	var xhr = createXHR();



	function createXHR() {
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		}
		else if (typeof ActiveXObject != "undefined") {
			if (typeof  arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0", "MXXML2.XMLHttp.3.0", "MXXML2.XMLHttp"],
					i,
					len;
				for (i = 0, len = versions.length; i < len; i++) {
					try {
						new ActiveXObject((versions[i]));
						arguments.callee.activeXString = versions[i];
					}
					catch (ex) {
						console.log('createXHR has error');
					}
				}
			}
			else {
				throw new Error("No xhr object available");
			}
		}
	}

	function createGUID() {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}

		function NewGuid() {
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		}

		return NewGuid();
	}

	function stringify(obj){
		var str = "";
		for(var i in obj){
			str+='"'+i+'":"'+obj[i]+'",';
		}
		str = '{'+str.slice(0,-1)+'}';
		return str;
	}

	var getBasicInfo = (function(){
		if (!courseID) {
			throw new Error('课程ID未定义');
		}
		var guid = createGUID();
		var starttime = new Date().getTime();
		return function(){
			return {
				courseID: courseID,
				chapterID: chapterID,
				guid: guid,
				starttime: starttime
			}
		}
	})();

	(function send(){
		timestamp.next();
		var basic = getBasicInfo();
		basic.staytime = timestamp.staytime();
		basic = stringify(basic);
		if (!timestamp.data.length) {
			return false;
		};
		var script = document.createElement('script');//jsonp
		document.getElementsByTagName("HEAD")[0].appendChild(script);
		script.setAttribute('src',url+'?data='+basic);
		console.log(basic);
		setTimeout(function () {
			send();
		}, timestamp.interval());
	})();
}

Cicel(12,0);//courseID chapterID

