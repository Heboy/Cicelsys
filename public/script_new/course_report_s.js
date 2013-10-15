/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-10-14
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */

//init
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

/**
 * 初始化 标签1
 */
(function () {
	/**
	 *基本信息
	 * @type {*}
	 */
	var store1 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', 'studentNum', 'signNum', 'realNum'],
		data: classCourseReport.basicInfo().data
	});

	var tips = classCourseReport.basicInfo().tips;

	/**
	 * 基本数据 表格
	 */
	var table0 = Ext.create('Ext.grid.Panel', {
		width: '100%',
		height: 100,
		store: store1,
		disableSelection: true,
		loadMask: true,
		columns: [
			{
				text: "学校名称",
				dataIndex: 'name',
				flex: 1
			},
			{
				text: "理科人数",
				dataIndex: 'studentNum',
				flex: 1
			},
			{
				text: "报考人数",
				dataIndex: 'signNum',
				flex: 1
			},
			{
				text: "有效人数",
				dataIndex: 'realNum',
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

	$('#table0').append('<p>' + tips + '</p>');

	//////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 校内 校间比较
	 * @type {*}
	 */
	var store2 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', 'maxScore', 'avgScore', 'stdScore', 'adventage', 'contribute']
	});


	/**
	 * 校间比较
	 */
	store2.loadData(classCourseReport.compareWithSchool());
	Ext.create('Ext.grid.Panel', {
		width: '100%',
		store: store2,
		disableSelection: true,
		loadMask: true,
		columns: [
			{
				text: "学校名称",
				dataIndex: 'name',
				flex: 1
			},
			{
				text: "最高分",
				dataIndex: 'maxScore',
				flex: 1
			},
			{
				text: "平均分",
				dataIndex: 'avgScore',
				flex: 1
			},
			{
				text: "标准差",
				dataIndex: 'stdScore',
				flex: 1
			},
			{
				text: "学科优势率",
				dataIndex: 'adventage',
				flex: 1
			}
		],
		listeners: {
			afterrender: function () {
				$(loadings[1]).css('display', 'none');
			}
		},
		renderTo: 'table1'
	});

	////////////////////////////////////////////////////////////////////////
	/**
	 * 校内比较 表格
	 */
	store2.loadData(classCourseReport.compareWithClass());
	Ext.create('Ext.grid.Panel', {
		width: '100%',
		store: store2,
		disableSelection: true,
		loadMask: true,
		columns: [
			{
				text: "班级名称",
				dataIndex: 'name',
				flex: 1
			},
			{
				text: "最高分",
				dataIndex: 'maxScore',
				flex: 1
			},
			{
				text: "平均分",
				dataIndex: 'avgScore',
				flex: 1
			},
			{
				text: "标准差",
				dataIndex: 'stdScore',
				flex: 1
			},
			{
				text: "学科优势率",
				dataIndex: 'contribute',
				flex: 1
			}
		],
		listeners: {
			afterrender: function () {
				$(loadings[2]).css('display', 'none');
			}
		},
		renderTo: 'table2'
	});

})();

/**
 * 标签2
 * @type {*}
 */
function seg(){
	var store1 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', '0-19', '20-39', '40-59','60-79','80-99','100-119','120-150'],
		data:classCourseReport.seg()
	});

	var store2 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', 'rateA', 'rateB', 'rate','rateC','rateD'],
		data:classCourseReport.seg2()
	});

	Ext.create('Ext.grid.Panel', {
		width: '100%',
		store: store1,
		disableSelection: true,
		loadMask: true,
		columns: [
			{
				text: "学校名称",
				dataIndex: 'name',
				flex: 1
			},
			{
				text: "0-19",
				dataIndex: '0-19',
				flex: 1
			},
			{
				text: "20-39",
				dataIndex: '20-39',
				flex: 1
			},
			{
				text: "40-59",
				dataIndex: '40-59',
				flex: 1
			},
			{
				text: "60-79",
				dataIndex: '60-79',
				flex: 1
			},
			{
				text: "80-99",
				dataIndex: '80-99',
				flex: 1
			},
			{
				text: "100-119",
				dataIndex: '100-119',
				flex: 1
			},
			{
				text: "120-150",
				dataIndex: '120-150',
				flex: 1
			}
		],
		listeners: {
			afterrender: function () {
				$(loadings[3]).css('display', 'none');
			}
		},
		renderTo: 'table3'
	});

	Ext.create('Ext.chart.Chart',{
		animate: false,
		store: store2,
		width:'100%',
		height:400,
		insetPadding: 30,
		legend: {
			position: 'right'
		},
		axes: [{
			type: 'Numeric',
			minimum: 0,
			position: 'left',
			fields: ['rateA','rateB','rate','rateC','rateD'],
			title: false,
			grid: true,
			title:'比率',
			label: {
				font: '10px Arial',
				renderer:function(name){
					return name+' %';
				}
			}
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['name'],
			title: '分数段'
		}],
		series: [{
			type: 'line',
			axis: 'left',
			xField: 'name',
			yField: 'rateA',
			style: {
				fill: '#38B8BF',
				stroke: '#fa2f0e',
				'stroke-width': 3
			},
			markerConfig: {
				type: 'circle',
				size: 4,
				radius: 4,
				'stroke-width': 0,
				fill: '#38B8BF',
				stroke: '#0efa72'
			}
		},
			{
				type: 'line',
				axis: 'left',
				xField: 'name',
				yField: 'rateB',
				style: {
					fill: '#38B8BF',
					stroke: '#faf70e',
					'stroke-width': 3
				},
				markerConfig: {
					type: 'cross',
					size: 4,
					radius: 4,
					'stroke-width': 0
				}
			},
			{
				type: 'line',
				axis: 'left',
				xField: 'name',
				yField: 'rate',
				style: {
					fill: '#38B8BF',
					stroke: '#cc669d',
					'stroke-width': 3
				},
				markerConfig: {
					type: 'cross',
					size: 4,
					radius: 4,
					'stroke-width': 0
				}
			},
			{
				type: 'line',
				axis: 'left',
				xField: 'name',
				yField: 'rateC',
				style: {
					fill: '#38B8BF',
					stroke: '#6696cc',
					'stroke-width': 3
				},
				markerConfig: {
					type: 'cross',
					size: 4,
					radius: 4,
					'stroke-width': 0
				}
			},
			{
				type: 'line',
				axis: 'left',
				xField: 'name',
				yField: 'rateD',
				style: {
					fill: '#38B8BF',
					stroke: '#66cc77',
					'stroke-width': 3
				},
				markerConfig: {
					type: 'cross',
					size: 4,
					radius: 4,
					'stroke-width': 0
				}
			}],
		renderTo:'table3'
	});
}

/**
 * 标签3
 */
function knowledge(){
	var store1 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', 'schoolA', 'schoolB', 'school','schoolC','schoolD','rate'],
		data:classCourseReport.knowledge()
	});

	Ext.create('Ext.chart.Chart', {
		store: store1,
		width:'100%',
		height:400,
		legend: {
			position: 'right'
		},
		axes: [{
			type: 'Numeric',
			position: 'bottom',
			fields: ['schoolA','schoolB','school','schoolC','schoolD'],
			grid: true
		}, {
			type: 'Category',
			position: 'left',
			fields: ['name']
		}],
		background: {
			gradient: {
				id: 'backgroundGradient',
				angle: 45,
				stops: {
					0: {
						color: '#ffffff'
					},
					100: {
						color: '#eaf1f8'
					}
				}
			}
		},
		series: [{
			type: 'bar',
			axis: 'bottom',
			highlight: true,
			xField: 'name',
			yField: ['schoolA','schoolB','school','schoolC','schoolD']
		}],
		listeners: {
			afterrender: function () {
				$(loadings[4]).css('display', 'none');
			}
		},
		renderTo:'table4'
	});

	Ext.create('Ext.chart.Chart', {
		xtype: 'chart',
		store: store1,
		legend: {
			position: 'right'
		},
		width:'100%',
		height:400,
		insetPadding: 60,
		series: [{
			type: 'pie',
			field: 'rate',
			showInLegend: true,
			highlight: {
				segment: {
					margin: 20
				}
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '18px Arial'
			}
		}],
		renderTo:'table4'
	});
}

/**
 * 标签4
 */
function ability(){
	var store1 = Ext.create('Ext.data.JsonStore', {
		fields: ['name', 'schoolA', 'schoolB', 'school','schoolC','schoolD','rate'],
		data:classCourseReport.ability()
	});

	Ext.create('Ext.chart.Chart', {
		store: store1,
		width:'100%',
		height:400,
		legend: {
			position: 'right'
		},
		axes: [{
			type: 'Numeric',
			position: 'bottom',
			fields: ['schoolA','schoolB','school','schoolC','schoolD'],
			grid: true
		}, {
			type: 'Category',
			position: 'left',
			fields: ['name']
		}],
		background: {
			gradient: {
				id: 'backgroundGradient',
				angle: 45,
				stops: {
					0: {
						color: '#ffffff'
					},
					100: {
						color: '#eaf1f8'
					}
				}
			}
		},
		series: [{
			type: 'bar',
			axis: 'bottom',
			highlight: true,
			xField: 'name',
			yField: ['schoolA','schoolB','school','schoolC','schoolD']
		}],
		listeners: {
			afterrender: function () {
				$(loadings[5]).css('display', 'none');
			}
		},
		renderTo:'table5'
	});

	Ext.create('Ext.chart.Chart', {
		xtype: 'chart',
		store: store1,
		legend: {
			position: 'right'
		},
		width:'100%',
		height:400,
		insetPadding: 60,
		series: [{
			type: 'pie',
			field: 'rate',
			showInLegend: true,
			highlight: {
				segment: {
					margin: 20
				}
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '18px Arial'
			}
		}],
		renderTo:'table5'
	});
}


$('#pag').on('click', changPag);

function changPag(e) {
	for (var i = 0; i < pagBtns.length; i++) {
		if (e.target === pagBtns[i] && e.target !== domEle.lastPag) {
			$(domEle.lastPag).css('background-color', '#3399cc');
			$(domEle.lastPag).css('color', '#ffffff');
			$(e.target).css('background-color', '#ffffff');
			$(e.target).css('color', '#3399cc');
			domEle.lastPag = e.target;
			changeContent(contentArr[i]);
			if(contentArr[i].attr('info')==='none'){
				contentArr[i].attr('info','display');
				switch (i){
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

function changeContent(contentEle){
	if(domEle.init&&contentEle===contentArr[0]){
		return;
	}
	domEle.lastContent.css('display','none');
	contentEle.css('display','block');
	domEle.lastContent = contentEle;
	domEle.init = false;
}



