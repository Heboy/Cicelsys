/**
 * Created with JetBrains WebStorm.
 * User: Heboy
 * Date: 13-9-22
 * Time: 下午11:41
 * To change this template use File | Settings | File Templates.
 */
Ext.onReady(function () {
	Ext.Ajax.request({
		url: '/dataservice/getmenu',
		async: false,
		success: function (response) {
			/**
			 * 初始化流程
			 * 1.请求该用户课程与章节数据
			 * 2.将课程与章节数据绑定到html上
			 * 3.加载成功后构建初始grid
			 * @type {*}
			 */
			var menuData = JSON.parse(response.responseText);
			var courseHtml = '';
			var chapterHtml = '';
			var tmpId;
			for (var i in menuData) {
				if (menuData[i].pId !== tmpId && menuData[i].pId !== undefined) {
					if (!tmpId) {
						EnviromentData.courseID = menuData[i].pId;
					}
					if (courseHtml !== '') {
						courseHtml += '<div class="detailList">' + chapterHtml + '</div>'
						Ext.DomHelper.insertHtml('beforeEnd', Ext.get("nav").dom, courseHtml);
						courseHtml = '';
						chapterHtml = '';
					}
					courseHtml += '<li class="generalList" id="' + menuData[i].pId + '">' + menuData[i].pName + '</li>';
					tmpId = menuData[i].pId;
				}
				chapterHtml += '<li class="item" id="' + menuData[i].sId + '">' + menuData[i].sName + '</li>';
			}
			courseHtml += '<div class="detailList">' + chapterHtml + '</div>'
			Ext.DomHelper.insertHtml('beforeEnd', Ext.get("nav").dom, courseHtml);
			nav.addEventListener('click', navHandle);
			EnviromentData.searchStartTime =new Date().getTime() / 1000;
			EnviromentData.currentPage = 1;
			EnviromentData.totalPage = 1;
			requestCourseData(EnviromentData.courseID, EnviromentData.searchStartTime, 30);
		}
	});

})
var tableGrid = function (renderTo) {
	if (!Ext.get('Cicel_PVGrid')) {
		return Ext.create('Ext.grid.Panel', {
			id: 'Cicel_PVGrid',
			renderTo:renderTo,
			header: {
				items: [
					{
						xtype: 'text',
						text: '起始时间:',
						width: 50
					},
					{
						xtype: 'datefield',
						id:'starttime',
						labelAlign: 'right',
					},
					{
						xtype: 'text',
						text: '截止时间:',
					},
					{
						xtype: 'datefield',
						id:'endtime',
						labelAlign: 'right',
					},
					{
						xtype: 'button',
						text: '查询',
						handler:function(){
							EnviromentData.searchStartTime = new Date(Ext.ComponentManager.get('starttime').getValue()).getTime()/1000;
							EnviromentData.searchEndTime = new Date(Ext.ComponentManager.get('endtime').getValue()).getTime()/1000;
							if(EnviromentData.searchStartTime<EnviromentData.searchEndTime){
								var tmp;
								tmp = EnviromentData.searchStartTime;
								EnviromentData.searchStartTime = EnviromentData.searchEndTime;
								EnviromentData.searchEndTime = tmp;
							}
							console.log('start:'+EnviromentData.searchStartTime);
							console.log('end:'+EnviromentData.searchEndTime);
							var during = Math.ceil((EnviromentData.searchStartTime-EnviromentData.searchEndTime)/86400)+1;
							EnviromentData.currentPage = 1;
							EnviromentData.totalPage = Math.ceil(during/30);
							if(during>30){ //查询大于30天
								requestCourseData(EnviromentData.courseID,EnviromentData.searchStartTime,30);
							}else{
								requestCourseData(EnviromentData.courseID,EnviromentData.searchStartTime,during);
							}

						}
					},
					{
						xtype: 'button',
						text: '趋势图',
						handler: function () {
							win4Grid().add(lineChart());
						}
					},
					{
						xtype: 'button',
						text: '课程比较',
						handler:function(){
							win4Grid().add(barChart());
						}
					},
					{
						xtype: 'button',
						text: '地域分布',
					}
				],
				layout: 'fit'
			},
			height: 500,
			store: PVStore,
			loadMask: true,
			autoScroll: true,
			columns: [
				{ text: "时间", flex: 1, sortable: true, dataIndex: 'now_day', renderer: function (storeItem, item) {
					return new Date(storeItem).getFullYear() + '年' + (new Date(storeItem).getMonth()+1) + '月' + new Date(storeItem).getDate() + '日';
				} },
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
				{xtype:'text',id:'Cicel_table_currentPage'},
				{xtype:'text',id:'Cicel_table_totalPage'},
				{xtype:'button',text:'上一页',handler:function(){
					if(EnviromentData.totalPage==1||EnviromentData.currentPage==1){
						return;
					}else{
						EnviromentData.searchStartTime = EnviromentData.searchStartTime+2592000;
						requestCourseData(EnviromentData.courseID,EnviromentData.searchStartTime,30);
						EnviromentData.currentPage = EnviromentData.currentPage-1;
					}
				}},
				{xtype:'button',text:'下一页',handler:function(){
					if(EnviromentData.totalPage==1||EnviromentData.currentPage==EnviromentData.totalPage){
						return;
					}else{
						EnviromentData.searchStartTime = EnviromentData.searchStartTime-2592000;
						var during = EnviromentData.searchStartTime-2592000;
						if(during>EnviromentData.searchEndTime){
							during =30;
						}
						else{
							during = (EnviromentData.searchStartTime - EnviromentData.searchEndTime)/86400+1;
						}
						requestCourseData(EnviromentData.courseID,EnviromentData.searchStartTime,during);
						EnviromentData.currentPage = EnviromentData.currentPage+1;
					}
				}},
				{xtype:'textfield'},
				{xtype:'button',text:'跳转'}
			]
		});
	}
	else {
		return Ext.ComponentManager.get('Cicel_PVGrid');
	}
}