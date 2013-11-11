/**
 * Created by Heboy on 13-11-11.
 */
Ext.onReady(function () {
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
		proxy: {
			type: 'ajax',
			url: '/Cicelsys/RemoteData/courses_basic_data.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad: true
	});

//		生成概览图表
	store.on('load', function (store, records, successful) {
		var table = $('<table class="table table-striped table-bordered"></table>');
		for (var j in records) {
			if(!title){
				var title = $('<tr></tr>');
				for(var i in records[j].data){
					var td = $('<td></td>');
					td.html(i);
					title.append(td);
				}
				table.append(title);
			}
			var tr = $('<tr></tr>');
			for(var i in records[j].data){
				var td = $('<td></td>');
				td.html(records[j].data[i]);
				tr.append(td);
			}
			table.append(tr);
		}
		$('#overview').append(table);
	})

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
})