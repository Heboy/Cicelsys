var loadings = $('.loading');
$(function () {
	$.ajax({
		type:'GET',
		url:'/RemoteData/getNavData.js',
		dataType:'json',
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


	var s3bg = $('.s3bg');
	var compareBox = new CompareBox_Component_Cicel();
	compareBox.prependBody(s3bg);
	var compareBox1 = new CompareBox_Component_Cicel();
	compareBox1.prependBody(s3bg);
	var compareBox2 = new CompareBox_Component_Cicel();
	compareBox2.prependBody(s3bg);
	var compareBox3 = new CompareBox_Component_Cicel();
	compareBox3.prependBody(s3bg);
	var boxArr = [compareBox,compareBox1,compareBox2,compareBox3];

	$('.compareBtn').on('click',compareHandle);

	function compareHandle(e){
		var len = $('.CompareBox-hasdata').length;
		var searchParas =[];
		if(len==0){
			return;
		}
		for(var i=0;i<boxArr.length;i++){
			if(boxArr[i].getCourseID()){
				searchParas.push(boxArr[i].getCourseID());
			}
		}

		window.location.href='http://www.baidu.com?para='+JSON.stringify(searchParas);
	}

})


