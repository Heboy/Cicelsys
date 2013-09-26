/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-9-24
 * Time: 下午10:04
 * To change this template use File | Settings | File Templates.
 */

/**
 * 请求课程数据
 * @param url
 * @param params
 * @param isAsync是否同步
 */

Ext.onReady(function () {
	var chapterID = Ext.query("[class=chapter]")[0].getAttribute("chapterId");
	requestChapterData('/data/chapter',{chapterID: chapterID,startTime: Math.floor(new Date().getTime()/1000),delay: 30},true);
	tableGrid("content");
	EnviromentData = chapterID;
})

var EnviromentData = {
	courseID: null,
	chapterID: null,
	searchStartTime: null,//记录查询起始时间
	searchEndTime: null,//记录查询截止时间
	totalPage: null, //总页，用于table分页
	currentPage: null//当前页，用于table分页
}

var requestChapterData = function(url,params,isAsync){
	Ext.Ajax.request({
		url: url,
		params: params,
		async: isAsync,
		success: function (response) {
			var result = JSON.parse(response.responseText).data;
			if(result==null){
				result = [{now_day:'无数据'}];
			}
			PVStore.loadData(result, false);
		}
	});
}

var tableGrid = function (renderTo) {
	if (!Ext.get('Cicel_PVGrid')) {
		return Ext.create('Ext.grid.Panel', {
			id: 'Cicel_PVGrid',
			renderTo: renderTo,
			header: {
				items: [
					{
						xtype: 'text',
						text: '起始时间:',
						width: 50
					},
					{
						xtype: 'datefield',
						id: 'starttime',
						labelAlign: 'right',
					},
					{
						xtype: 'text',
						text: '截止时间:',
					},
					{
						xtype: 'datefield',
						id: 'endtime',
						labelAlign: 'right',
					},
					{
						xtype: 'button',
						text: '查询',
						handler: function () {
							EnviromentData.searchStartTime = new Date(Ext.ComponentManager.get('starttime').getValue()).getTime() / 1000;
							EnviromentData.searchEndTime = new Date(Ext.ComponentManager.get('endtime').getValue()).getTime() / 1000;
							if (EnviromentData.searchStartTime < EnviromentData.searchEndTime) {
								var tmp;
								tmp = EnviromentData.searchStartTime;
								EnviromentData.searchStartTime = EnviromentData.searchEndTime;
								EnviromentData.searchEndTime = tmp;
							}
							var during = Math.ceil((EnviromentData.searchStartTime - EnviromentData.searchEndTime) / 86400) + 1;
							EnviromentData.currentPage = 1;
							EnviromentData.totalPage = Math.ceil(during / 30);
							if (during > 30) { //查询大于30天
								requestChapterData('/data/chapter',{
									chapterID: EnviromentData.chapterID,startTime: EnviromentData.searchStartTime,delay: 30
								},false);
								Ext.Ajax.on('requestcomplete',dataCompleteHandle);
							} else {
								requestChapterData('/data/chapter',{
									chapterID: EnviromentData.chapterID,startTime: EnviromentData.searchStartTime,delay: during
								},false);
								Ext.Ajax.on('requestcomplete',dataCompleteHandle);
							}
						}
					},
					{
						xtype: 'button',
						text: '趋势图',
						handler: function () {
							win4Grid().add(lineChart());
						}
					}
				],
				layout: 'fit'
			},
			height: 500,
			store: PVStore,
			loadMask: true,
			autoScroll: true,
			columns: [
				{ text: "时间", flex: 1, sortable: true, dataIndex: 'now_day'},
				{ text: "访问量", flex: 1, sortable: true, dataIndex: 'PV' },
				{ text: "平均访问时长", flex: 1, sortable: true, dataIndex: 'avgTime', renderer: function (storeItem, item) {
					if (storeItem == null) {
						return 0;
					} else {
						return storeItem;
					}
				} },
				{ text: "再次访问率", flex: 1, sortable: true, dataIndex: 'newVisitCount' }
			],
			// paging bar on the bottom
			bbar: [
				{xtype: 'text', id: 'Cicel_table_currentPage'},
				{xtype: 'text', id: 'Cicel_table_totalPage'},
				{xtype: 'button', text: '上一页', handler: function () {
					if (EnviromentData.totalPage == 1 || EnviromentData.currentPage == 1) {
						return;
					} else {
						EnviromentData.searchStartTime = EnviromentData.searchStartTime + 2592000;
						requestChapterData(EnviromentData.chapterID, EnviromentData.searchStartTime, 30);
						EnviromentData.currentPage = EnviromentData.currentPage - 1;
					}
				}},
				{xtype: 'button', text: '下一页', handler: function () {
					if (EnviromentData.totalPage == 1 || EnviromentData.currentPage == EnviromentData.totalPage) {
						return;
					} else {
						EnviromentData.searchStartTime = EnviromentData.searchStartTime - 2592000;
						var during = EnviromentData.searchStartTime - 2592000;
						if (during > EnviromentData.searchEndTime) {
							during = 30;
						}
						else {
							during = (EnviromentData.searchStartTime - EnviromentData.searchEndTime) / 86400 + 1;
						}
						requestChapterData(EnviromentData.chapterID, EnviromentData.searchStartTime, during);
						EnviromentData.currentPage = EnviromentData.currentPage + 1;
					}
				}},
				{xtype: 'textfield'},
				{xtype: 'button', text: '跳转'}
			]
		});
	}
	else {
		return Ext.ComponentManager.get('Cicel_PVGrid');
	}
}

var lineChart = function () {
	if (!Ext.get('Cicel_PVChart')) {
		return Ext.create('Ext.chart.Chart', {
			id: 'Cicel_PVChart',
			animate: true,
			store: PVStore,
			insetPadding: 30,
			axes: [
				{
					type: 'Numeric',
					minimum: 0,
					position: 'left',
					fields: ['PV'],
					title: false,
					grid: true,
				},
				{
					type: 'Category',
					position: 'bottom',
					fields: ['now_day'],
					title: false,
					label: {
						font: '11px Arial',
					}
				}
			],
			series: [
				{
					type: 'line',
					axis: 'left',
					xField: 'now_day',
					yField: 'PV',
					tips: {
						trackMouse: true,
						width: 80,
						height: 40,
						renderer: function (storeItem, item) {
							this.setTitle('浏览量');
							this.update(storeItem.get('PV'));
						}
					},
					style: {
						fill: '#38B8BF',
						stroke: '#38B8BF',
						'stroke-width': 3
					},
					markerConfig: {
						type: 'circle',
						size: 4,
						radius: 4,
						'stroke-width': 0,
						fill: '#38B8BF',
						stroke: '#38B8BF'
					}
				}
			]
		});
	}
	else {
		return Ext.ComponentManager.get('Cicel_PVChart');
	}
}

var win4Grid = function () {
	if (Ext.get('Cicel_win4Grid')) {
		return Ext.ComponentManager.get('Cicel_win4Grid');
	}
	else {
		return Ext.create('Ext.window.Window', {
			id: 'Cicel_win4Grid',
			width: 800,
			height: 600,
			hidden: false,
			maximizable: true,
			title: 'Bar Chart',
			autoShow: true,
			layout: 'fit',
			tbar: [
				{
					xtype: 'datefield',
					fieldLabel: '起止日期',
					labelAlign: 'right'
				},
				{
					xtype: 'datefield',
					fieldLabel: '截止日期',
					labelAlign: 'right'
				},
				{
					xtype: 'button',
					text: '查询',
				}
			],
			renderTo: Ext.getBody()
		});
	}
}

function dataCompleteHandle(){
	tableGrid('content');
	Ext.ComponentManager.get('Cicel_table_currentPage').setText('第'+EnviromentData.currentPage+'页');
	Ext.ComponentManager.get('Cicel_table_totalPage').setText('共'+EnviromentData.totalPage+'页');
}

