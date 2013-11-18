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
		data:basicRecords
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

	(function(){
		var coursesObjArr = [];
		//		计算趋势图的y轴名称
		for (var j in basicRecords) {
			coursesObjArr.push(basicRecords[j]["课程名称"]);
		}
		pag2(coursesObjArr);
		pag3();

//注册timepicker
		$('.form_date').datetimepicker({
			format: 'yyyy-mm-dd',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		var search = $('#searchByTime');
		search.on('click',function(){
			var start = new Date($('#startTime').val()).getTime();
			var end = new Date($('#endTime').val()).getTime();
			if(!start||!end||start>=end||end>new Date().getTime()){
				$('.tips-box').css('display','block');
			}
			else{
//				跳转，服务器需验证输入
				$('.tips-box').css('display','none');
				window.location.href = window.location.href+'?start='+start+'&end='+end;
			}
		})
	})();


	function pag2(coursesObjArr) {
		var series = [];
		var fields = [
			{name: "日期", type: "string"}
		];
		var chartFields = [];
		for (var i = 0; i < coursesObjArr.length; i++) {
			fields.push({name: coursesObjArr[i], type: 'int'});
			chartFields.push(coursesObjArr[i]);
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
				yField: coursesObjArr[i],
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
				url: '/Cicelsys/RemoteData/courses_data_trend.js',
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
			renderTo: 'trend'
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
				url: '/Cicelsys/RemoteData/courses_visittime.js',
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
			renderTo: 'time'
		});
	}
})