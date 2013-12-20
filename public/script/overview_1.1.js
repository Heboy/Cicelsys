/**
 * Created by Heboy on 13-12-20.
 */
Ext.onReady(function(){
	var ref = false;
	CreatePag3('/Cicelsys/RemoteData/courses_visittime.js');
})

/**
 * 创建 访问趋势 折线图
 * @constructor
 */
function CreatePag2(remoteURL,callback) {
	var chartFields = [];
	var series = [];
	var fields = [
		{name: "日期", type: "string"}
	];

	$.get(remoteURL, function (data) {
		data = $.parseJSON(data);
		if (data.length > 0) {
			for (var i in data[0]) {
				if (i == '日期') {
					continue;
				}
				chartFields.push(i);
				fields.push({name: i, type: "int"});
				series.push({
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
			var model = Ext.define('Course', {
				extend: 'Ext.data.Model',
				fields: fields
			});
			var store = Ext.create('Ext.data.JsonStore', {
				model: model,
				data: data
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
				renderTo: 'trend'
			})

		}
	})
}

/**
 * 更新 访问趋势 折线图
 * @constructor
 */
function UpdatePag2(remoteURL, pag2Store) {
	$.get(remoteURL, function (data) {
		pag2Store.loadData(data);
	})
}

/**
 * 创建 访问时间段分布 柱状图
 * @constructor
 */
function CreatePag3(remoteURL,callback) {
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
			url: remoteURL,
			reader: {
				type: 'json'
			}
		},
		autoLoad: true,
		listeners:{
			load:function(a,b){
				console.log(b.length);
				callback(b);
			}
		}
	});

	Ext.create('Ext.chart.Chart',  {
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
		renderTo: 'haha',
	});
}

/**
 * 更新 访问时间段分布 柱状图
 * @constructor
 */
function UpdatePag3() {

}