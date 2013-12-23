/**
 * Created by Heboy on 13-11-11.
 */
Ext.onReady(function () {
	var basicRecords = $.parseJSON($.trim($('#basic-data').val()));
	var model = Ext.define('Course', {
		extend: 'Ext.data.Model',
		fields: [
			{name: '课程名称', type: 'string', defaultValue: '无数据'},
			{name: '浏览量', type: 'int', defaultValue: 0},
			{name: '有效学习人数', type: 'int', defaultValue: 0},
			{name: '今日访问量', type: 'int', defaultValue: 0},
			{name: '今日有效学习人数', type: 'int', defaultValue: 0},
			{name: '课件利用率', type: 'int', defaultValue: 0}
		]
	})
	var store = Ext.create('Ext.data.JsonStore', {
		model: model,
		data: basicRecords
	});

//	概况-柱状图
	Ext.create('Ext.chart.Chart', {
		renderTo: 't1',
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
		]
	});

//	课件利用率
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
		renderTo: 't2'
	});

	/**
	 * 绘制趋势曲线，返回store用作更新操作
	 */
	var store1 = (function (remoteURL) {
		var chartFields = [];

		var fields = [
			{name: "日期", type: "string"}
		];

		var model = Ext.define('Course', {
			extend: 'Ext.data.Model',
			fields: fields
		});

		var store = Ext.create('Ext.data.JsonStore', {
			model: 'Course',
		});

		var chart = Ext.create('Ext.chart.Chart', {
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
			series: [],
			renderTo: 'trend'
		})

		$.get(remoteURL, function (data) {
			data = $.parseJSON(data);
			if (data.length > 0) {
				buildFieldsAndSeries(data);
			}
			model.setFields(fields);
			store.loadData(data);
		});

		function buildFieldsAndSeries(data) {
			for (var i in data[0]) {
				if (i == '日期') {
					continue;
				}
				chartFields.push(i);
				fields.push({name: i, type: "int"});
				chart.series.add({
					type: 'line',
					axis: 'left',
					highlight: true,
					tips: {
						trackMouse: true,
						width: 25,
						height: 25,
						renderer: function (storeItem, item) {
							this.setTitle(String(item.value[1]) + '人');
						}
					},
					smooth: true,
					xField: '日期',
					yField: i,
					markerConfig: {
						type: 'cross',
						size: 4,
						radius: 4,
						'stroke-width': 0
					}
				})
			}
		}

		return store;
	})('/Cicelsys/RemoteData/courses_data_trend.js');

	/**
	 * 绘制访问时段分布，返回store用作更新操作
	 */
	var store2 = (function (remoteURL) {
		Ext.define('访问时段分布', {
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
		});
		var store = Ext.create('Ext.data.JsonStore', {
			model: '访问时段分布',
			proxy: {
				type: 'ajax',
				url: remoteURL,
				reader: {
					type: 'json'
				}
			},
			autoLoad: true,
			listeners: {
				load: function (a, b) {
				}
			}
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
			renderTo: 'time'
		});
		return store;
	})('/Cicelsys/RemoteData/courses_visittime.js');

	/**
	 * 趋势图时间按钮组事件
	 */
	$('#trend_timepicker').on('click', function (e) {
		var time = $(e.target).attr('time');
		var queryTime = getQueryStringRegExp('time');
		var query = '?key=trend&time=';
		if (!time || time == queryTime) {
			return;
		}
		if (time == 'day' && queryTime == '') {
			return;
		}
		else {
			query += time;
			$.get('/Cicelsys/RemoteData/courses_data_trend.js' + query, function (data) {
				data = $.parseJSON(data);
				store1.loadData(data);
			})
		}
	})

})

/**
 * 获取通过href传递的参数
 * @param name
 * @returns {*}
 */
function getQueryStringRegExp(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
};