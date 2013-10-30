/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-14
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */
Ext.onReady(function () {
	$.ajax({
		type:'GET',
		url:'/RemoteData/getNavData.js',
		dataType:'json',
		success:function(data){
			var nav = new Nav_One_Cicel($('#nav'),data,0);
		},
		error:function(){

		}
	})

	pag1();
})

function pag1() {
	var model = Ext.define('Course', {
		extend: 'Ext.data.Model',
		fields: [
			{name: '课程名称', type: 'string'},
			{name: '课程编号', type: 'int'},
			{name: '院校名称', type: 'string'},
			{name: '浏览量', type: 'int', defaultValue: 0},
			{name: '课件利用率', type: 'int', defaultValue: 0}
		]
	})
	var store = Ext.create('Ext.data.JsonStore', {
		model: model,
		proxy: {
			type: 'ajax',
			url: '/RemoteData/getCoursesData.js',
			reader: {
				type: 'json'
			}
		},
		autoLoad: true
	});

	Ext.create('Ext.chart.Chart', {
		renderTo:'section1',
		width: '100%',
		height: 400,
		store: store,
		legend: {
			position: 'right'
		},
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['浏览量']
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
					width: 120,
					height: 33,
					renderer: function (storeItem, item) {
						console.log(storeItem);
						this.setTitle(String(storeItem.data['院校名称']));
					}
				},
				xField: '课程名称',
				yField: '浏览量'
			}
		],
	});

	Ext.create('Ext.chart.Chart', {
		renderTo:'section2',
		width: '100%',
		height: 400,
		store: store,
		legend: {
			position: 'right'
		},
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['课件利用率'],
				minimum: 0,
				maximum:100
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
					width: 120,
					height: 33,
					renderer: function (storeItem, item) {
						console.log(storeItem);
						this.setTitle(String(storeItem.data['院校名称']));
					}
				},
				xField: '课程名称',
				yField: '课件利用率'
			}
		],
	});
}
