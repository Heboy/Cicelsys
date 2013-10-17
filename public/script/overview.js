/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-14
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */
var pagBtns = $('.pag-btn');
var loadings = $('.loading');
var contentArr = (function () {
	var overview = $('#overview');
	var seg = $('#seg');
	var knowledge = $('#knowledge');
	var ability = $('#ability');
	return [overview, seg, knowledge, ability];
}());
var domEle = {
	lastPag: pagBtns[0],
	lastContent: contentArr[0],
	init: true
};

Ext.onReady(function(){
	var model = Ext.define('Course',{
		extend: 'Ext.data.Model',
		fields: [
			{name: '课程名称',  type: 'string'},
			{name: '浏览量',   type: 'int'},
			{name: '有效学习人数', type: 'int', defaultValue: 0},
			{name: '今日访问量', type: 'int', defaultValue: 0},
			{name: '今日有效学习人数', type: 'int', defaultValue: 0}
		]
	})
	var store = Ext.create('Ext.data.JsonStore', {
		model:model,
		proxy: {
			type: 'ajax',
			url: '/RemoteData/courses_basic_data.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad:true
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
		legend:{
			position:'right'
		},
		axes: [
			{
				type: 'Numeric',
				position: 'bottom',
				fields: ['浏览量','有效学习人数','今日访问量','今日有效学习人数'],
			},
			{
				type: 'Category',
				position: 'left',
				fields: ['课程名称'],
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
					renderer: function(storeItem, item) {
						this.setTitle(String(item.value[1]) + '人');
					}
				},
				xField: '课程名称',
				yField: ['浏览量','有效学习人数','今日访问量','今日有效学习人数']
			}
		],
		listeners: {
			afterrender: function () {
				$(loadings[1]).css('display', 'none');
			}
		},
		renderTo:'table1'
	});

	$('#pag').on('click', changPag);
})

function changPag(e) {
	for (var i = 0; i < pagBtns.length; i++) {
		if (e.target === pagBtns[i] && e.target !== domEle.lastPag) {
			$(domEle.lastPag).css('background-color', '#3399cc');
			$(domEle.lastPag).css('color', '#ffffff');
			$(e.target).css('background-color', '#ffffff');
			$(e.target).css('color', '#3399cc');
			domEle.lastPag = e.target;
			changeContent(contentArr[i]);
			if (contentArr[i].attr('info') === 'none') {
				contentArr[i].attr('info', 'display');
				switch (i) {
					case 1:
						seg();
						break;
					case 2:
						knowledge();
						break;
					case 3:
						ability();
						break;
					default :
						break;
				}
			}
		}
	}
}

function changeContent(contentEle) {
	if (domEle.init && contentEle === contentArr[0]) {
		return;
	}
	domEle.lastContent.css('display', 'none');
	contentEle.css('display', 'block');
	domEle.lastContent = contentEle;
	domEle.init = false;
}