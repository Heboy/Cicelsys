var loadings = $('.loading');
$(function () {
	$.ajax({
		type:'GET',
		url:'/RemoteData/getNavData.js',
		success:function(data){
			data = $.parseJSON(data);
			var nav = new Nav_One_Cicel($('#nav'),data,1);
		},
		error:function(){

		}
	})
	$.get('/RemoteData/top_list.js', function (data) {
		var dataObj = $.parseJSON(data);
		Ext.define('Course', {
			extend: 'Ext.data.Model',
			fields: [
				{name: '课程编号', type: 'string'},
				{name: '课程名称', type: 'string'},
				{name: '院校名称', type: 'string'},
				{name: '浏览量', type: 'string'},
				{name: '课件利用率', type: 'string'}
			]
		});

		var pvStore = Ext.create('Ext.data.Store', {
			model: 'Course',
			data: dataObj.pv,
		});

		var rateStore = Ext.create('Ext.data.Store', {
			model: 'Course',
			data: dataObj.rate,
		});

		Ext.create('Ext.grid.Panel', {
			width: '100%',
			store: pvStore,
			loadMask: true,
			columns: [
				{
					text: "课程编号",
					dataIndex: '课程编号',
					flex: 1,
					sortable: false
				},
				{
					text: "课程名称",
					dataIndex: '课程名称',
					flex: 1,
					sortable: false
				},
				{
					text: "院校名称",
					dataIndex: '院校名称',
					flex: 1,
					sortable: false
				},
				{
					text: "浏览量",
					dataIndex: '浏览量',
					flex: 1,
					sortable: false
				},
				{
					text: "课件利用率",
					dataIndex: '课件利用率',
					flex: 1,
					sortable: false
				}
			],
			renderTo: 'table1'
		});

		Ext.create('Ext.grid.Panel', {
			width: '100%',
			store: rateStore,
			disableSelection: true,
			loadMask: true,
			columns: [
				{
					text: "课程编号",
					dataIndex: '课程编号',
					flex: 1,
					sortable: false
				},
				{
					text: "课程名称",
					dataIndex: '课程名称',
					flex: 1,
					sortable: false
				},
				{
					text: "院校名称",
					dataIndex: '院校名称',
					flex: 1,
					sortable: false
				},
				{
					text: "浏览量",
					dataIndex: '浏览量',
					flex: 1,
					sortable: false
				},
				{
					text: "课件利用率",
					dataIndex: '课件利用率',
					flex: 1,
					sortable: false
				}
			],
			renderTo: 'table2'
		});
	}, 'text');


	var section3 = $('#section3');
	var compareBox = new CompareBox_Component_Cicel(section3);

})

/**
 * 需要jquery
 * @param div
 * @constructor
 */
function CompareBox_Component_Cicel(div){
	var box = $('<div class="box_nodata"></div>');
	var input = $('<div class="input_area">课程编号:<input type="text" style="width: 100px"><input id="confirm" type="button" value="确定"></div>');
	var title = $('<p class="title_area"></p>');
	var msg = $('<p class="msg_area"></p>');
	var btns = $('<div class="close_btn"></div><div class="compare_btn"></div>');
	//将box渲染到页面
	title.append('在这里添加课程');
	box.append(title);
	div.append(box);
	box.on('click',addData);

	function addData(e){

		//将输入框渲染到页面上
		box.empty().append(input);
		input.show('fast');
		box.off('click',addData);
		//侦听“确认”按钮
		$('#confirm').on('click',confirmHandle);
		function confirmHandle(e){
			input.css('display','none');
			$.ajax({
				type: 'GET',
				url: '/RemoteData/getCourse.js',
				success:function(data){
					if(data){
						box.attr('class','box_hasdata deleteable');
						title.empty().append('管理学');
						msg.append('点击红色按钮取消当前课程，点击绿色按钮开始对比');
						box.append(title);
						box.append(btns);
						box.append(msg);
						box.mouseover(function(){
							btns.css('display','block');
							msg.css('display','block');
						});
						box.mouseout(function(){
							btns.css('display','none');
							msg.css('display','none');
						});
						btns.on('click',btnHandle);
						input.empty();//避免confire冲突
						if($('.deleteable').length<4){
							new CompareBox_Component_Cicel($('#section3'));
						}
					}
				},
				error: function (xhr, error) {
					msg.empty().append('载入错误,点击重试');
					box.append(msg);
					msg.css('display','block');
					box.on('click', addData);
				},
				timeout: 30000
			});
			function btnHandle(e){
				if($(e.target).attr('class')=='compare_btn'){
					console.log('Let`s compared');
				}
				else if($(e.target).attr('class')=='close_btn'){
					box.remove('.deleteable');
				}
			}
		}
	}
}


