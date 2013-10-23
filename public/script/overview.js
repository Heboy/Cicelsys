/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-14
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */
var pagBtns = $('.pag-btn');
var loadings = $('.loading');
var pagArr = (function () {
	var overview = $('#overview');
	var seg = $('#seg');
	var knowledge = $('#knowledge');
	var ability = $('#ability');
	return [overview, seg, knowledge, ability];
}());
var coursesObjArr = [];
var secondNav = $('#second');
var domEle = {
	lastPag: pagBtns[0],
	lastContent: pagArr[0],
	init: true
};

$(function () {
	var model = Ext.define('Course', {
		extend: 'Ext.data.Model',
		fields: [
			{name: '课程编号', type: 'string'},
			{name: '课程名称', type: 'string'},
			{name: '章节'}
		]
	});
	var store = Ext.create('Ext.data.JsonStore', {
		model: model,
		proxy: {
			type: 'ajax',
			url: '/RemoteData/courses_basic_data.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad: true
	});
	store.on('load', buildMenu);

	function buildMenu(store, records, successful) {
		var ul = $('<ul></ul>');
		if (successful) {
			for (var i in records) {
				coursesObjArr.push(records[i].data);
				var li = $('<li class="second-nav chapter_btn"><a href="#" class="tips second-tips">' + records[i].data['课程名称'] + '</a></li>');
				ul.append(li);
			}
			secondNav.append(ul);
		}
	}

	pag1();
	$('#pag').on('click', changPag);
})

function pag1() {
	var model = Ext.define('Course', {
		extend: 'Ext.data.Model',
		fields: [
			{name: '课程名称', type: 'string'},
			{name: '浏览量', type: 'int'},
			{name: '有效学习人数', type: 'int', defaultValue: 0},
			{name: '今日访问量', type: 'int', defaultValue: 0},
			{name: '今日有效学习人数', type: 'int', defaultValue: 0},
			{name: '课件利用率', type: 'int', defaultValue: 0}
		]
	})
	var store = Ext.create('Ext.data.JsonStore', {
		model: model,
		proxy: {
			type: 'ajax',
			url: '/RemoteData/courses_basic_data.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad: true
	});

	Ext.create('Ext.grid.Panel', {
		width: '100%',
		store: store,
		disableSelection: true,
		loadMask: true,
		columns: [
			{
				text: "课程名称",
				dataIndex: '课程名称',
				flex: 1
			},
			{
				text: "最近30天总访问量",
				dataIndex: '浏览量',
				flex: 1
			},
			{
				text: "最近30天有效学习人数",
				dataIndex: '有效学习人数',
				flex: 1
			},
			{
				text: "今日新增访问量",
				dataIndex: '今日访问量',
				flex: 1
			},
			{
				text: "今日新有效学习人数",
				dataIndex: '今日有效学习人数',
				flex: 1
			}
		],

		listeners: {
			afterrender: function () {
				$(loadings[0]).css('display', 'none');
			}
		},
		renderTo: 'table0'
	});

	Ext.create('Ext.chart.Chart', {
		width: '100%',
		height: 400,
		store: store,
		legend: {
			position: 'right'
		},
		axes: [
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['浏览量', '有效学习人数', '今日访问量', '今日有效学习人数']
			},
			{
				type: 'Category',
				position: 'left',
				fields: ['课程名称']
			}
		],
		series: [
			{
				type: 'bar',
				axis: 'bottom',
				highlight: true,
				tips: {
					trackMouse: true,
					width: 65,
					height: 28,
					renderer: function (storeItem, item) {
						this.setTitle(String(item.value[1]) + '人');
					}
				},
				xField: '课程名称',
				yField: ['浏览量', '有效学习人数', '今日访问量', '今日有效学习人数']
			}
		],
		listeners: {
			afterrender: function () {
				$(loadings[1]).css('display', 'none');
			}
		},
		renderTo: 'table1'
	});

	Ext.create('Ext.chart.Chart', {
		width: '100%',
		height: 400,
		animate: true,
		shadow: true,
		store: store,
		legend: {
			position: 'right'
		},
		axes: [
			{
				title: '百分比%',
				type: 'Numeric',
				position: 'left',
				fields: ['课件利用率']
			},
			{
				type: 'Category',
				position: 'bottom',
				fields: ['课程名称']
			}
		],
		series: [
			{
				type: 'column',
				axis: 'left',
				highlight: true,
				tips: {
					trackMouse: true,
					width: 70,
					height: 28,
					renderer: function (storeItem, item) {
						this.setTitle(storeItem.get('课件利用率') + '%');
					}
				},
				xField: '课程名称',
				yField: '课件利用率'
			}
		],
		renderTo: 'table1.1'
	});
}

function pag2() {
	var series = [];
	var fields = [
		{name: "日期", type: "string"}
	];
	var chartFields = [];
	for (var i = 0; i < coursesObjArr.length; i++) {
		fields.push({name: coursesObjArr[i]['课程名称'], type: 'int'});
		chartFields.push(coursesObjArr[i]['课程名称']);
		series.push({
			type: 'line',
			axis: 'left',
			highlight: true,
			tips: {
				trackMouse: true,
				width: 25,
				height: 15,
				renderer: function (storeItem, item) {
					this.setTitle(String(item.value[1]) + '人');
				}
			},
			smooth: true,
			xField: '日期',
			yField: coursesObjArr[i]['课程名称'],
			markerConfig: {
				type: 'cross',
				size: 4,
				radius: 4,
				'stroke-width': 0
			}
		})
	}
	var model = Ext.define('Course', {
		extend: 'Ext.data.Model',
		fields: fields
	});

	var store = Ext.create('Ext.data.JsonStore', {
		model: model,
		proxy: {
			type: 'ajax',
			url: '/RemoteData/courses_data_trend.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad: true
	});

	Ext.create('Ext.chart.Chart', {
		width: '100%',
		height: 400,
		store: store,
		legend: {
			position: 'right'
		},
		axes: [
			{
				type: 'Category',
				position: 'bottom',
				fields: ['日期']
			},
			{
				type: 'Numeric',
				position: 'left',
				fields: chartFields
			}
		],
		series: series,
		listeners: {
			afterrender: function () {
				$(loadings[2]).css('display', 'none');
			}
		},
		renderTo: 'table2'
	})
}

function pag3() {
	var model = Ext.define('Course', {
		extend: 'Ext.data.Model',
		fields: [
			{name: '课程名称', type: 'string'},
			{name: '0点-4点', type: 'int', defaultValue: 0},
			{name: '4点-8点', type: 'int', defaultValue: 0},
			{name: '8点-12点', type: 'int', defaultValue: 0},
			{name: '12点-16点', type: 'int', defaultValue: 0},
			{name: '16点-20点', type: 'int', defaultValue: 0},
			{name: '20点-24点', type: 'int', defaultValue: 0}
		]
	})
	var store = Ext.create('Ext.data.JsonStore', {
		model: model,
		proxy: {
			type: 'ajax',
			url: '/RemoteData/courses_visittime.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad: true
	});

	Ext.create('Ext.chart.Chart', {
		width: '100%',
		height: 400,
		store: store,
		legend: {
			position: 'right'
		},
		axes: [
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['0点-4点', '4点-8点', '8点-12点', '12点-16点', '16点-20点', '20点-24点']
			},
			{
				type: 'Category',
				position: 'left',
				fields: ['课程名称']
			}
		],
		series: [
			{
				type: 'bar',
				axis: 'bottom',
				highlight: true,
				tips: {
					trackMouse: true,
					width: 65,
					height: 28,
					renderer: function (storeItem, item) {
						this.setTitle(String(item.value[1]) + '人');
					}
				},
				xField: '课程名称',
				yField: ['0点-4点', '4点-8点', '8点-12点', '12点-16点', '16点-20点', '20点-24点']
			}
		],
		listeners: {
			afterrender: function () {
				$(loadings[3]).css('display', 'none');
			}
		},
		renderTo: 'table3'
	});
}

function changPag(e) {
	for (var i = 0; i < pagBtns.length; i++) {
		if (e.target === pagBtns[i] && e.target !== domEle.lastPag) {
			$(domEle.lastPag).css('background-color', '#3399cc');
			$(domEle.lastPag).css('color', '#ffffff');
			$(e.target).css('background-color', '#ffffff');
			$(e.target).css('color', '#3399cc');
			domEle.lastPag = e.target;
			changeContent(pagArr[i]);
			if (pagArr[i].attr('info') === 'none') {
				pagArr[i].attr('info', 'display');
				switch (i) {
					case 1:
						pag2();
						break;
					case 2:
						pag3();
						break;
					case 3:
						break;
					default :
						break;
				}
			}
		}
	}
}

function changeContent(contentEle) {
	if (domEle.init && contentEle === pagArr[0]) {
		return;
	}
	domEle.lastContent.css('display', 'none');
	contentEle.css('display', 'block');
	domEle.lastContent = contentEle;
	domEle.init = false;
}