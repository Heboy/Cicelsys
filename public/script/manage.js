/**
 * Created by Heboy on 13-12-2.
 */
/**
 * 实现修改 删除的逻辑
 */
var manageCourse = (function () {

	var currentTarget = null;
	var lastTarget = null;
	$('#t0').on('click', function (e) {
		currentTarget = $(e.target);
		if (currentTarget.hasClass('modify')) {
			$('#modify').modal();
			modify('update', currentTarget);
		}
		///////////////////////start删除逻辑////////////////////////////////
		else if (currentTarget.hasClass('delete')) {
			if (currentTarget.hasClass('isAlert')) {
				removeAlert(lastTarget);
			}
			else if (!currentTarget.hasClass('isAlert')) {
				if (lastTarget) {
					removeAlert(lastTarget);
				}
				currentTarget.popover({html: true, title: '确认删除', content: '<a>该课程所有记录将会消失，继续？</a>' +
					'<button type="button" class="btn btn-danger btn-sm confirm">确认</button>' +
					'<button type="button" class="btn btn-default btn-sm cancel">取消</button>'});
				currentTarget.popover('show');
				currentTarget.addClass('isAlert');
				lastTarget = currentTarget;
			}
		}
		else if (currentTarget.hasClass('confirm')) {
			removeAlert(lastTarget);
			var tr = $(lastTarget.parents('tr')[0]);
			var id = tr.find($('.id')).text();
			if (id) {
				$.post('http://localhost:63342/Cicelsys/public/manage.html', {op: 'delete', id: id}, function (data) {
					//删除操作
					if (data.result == 'true') {
//					返回'true'作为成功标志
						tr.remove();
					}
					else {
						alert('删除失败');
						console.log(data);
					}
				});//这里的url替换成处理删除操作的url
			}
			else {
				alert('没有id');
			}
		}
		else if (currentTarget.hasClass('cancel')) {
			removeAlert(lastTarget);
		}
		///////////////////////end删除逻辑////////////////////////////////
	});

	/////////////////////////添加逻辑////////////////////////////////
	$('#add').on('click', function (e) {
		$('#modify').modal();
		console.log('tang');
		modify('add');
	})

	function removeAlert(target) {
		target.popover('destroy');
		target.removeClass('isAlert');
	}

	function modify(op, currentTarget) {
		$('.confirm').on('click', function (e) {
			$('#modify').modal('hide');
			var courseName = $('#courseName').val();
			var url = $('#url').val();
			var department = $('#department').val();
			if (courseName.split(' ').length > 0 && url.split(' ').length && department.split(' ').length) {
				//修改操作
				if (op === 'update') {
					var tr = $(currentTarget.parents('tr')[0]);
					var id = tr.find($('.id')).text();
					$.post('http://localhost:63342/Cicelsys/public/manage.html',
						{op: 'update', id: id, coursename: courseName, url: url, department: department},
						function (data) {
							if (data.result === 'true') {
								//返回'true'作为成功标志
								tr.empty();
								//构造新的tr
								tr.append("<td>" + id + "</td>" +
									"<td>" + courseName + "</td>" +
									"<td>" + url + "</td>" +
									"<td>" + department + "</td>" +
									"<td><button type='button' class='modify btn btn-primary btn-sm'>修改</button>" +
									"<button type='button' class='delete btn btn-danger btn-sm'>删除</button></td>");
							}
							else{
								alert('修改失败');
							}
						});
				}
				else if (op === 'add') {
					var tbody = $('#t0').find('tbody');
					$.post('http://localhost:63342/Cicelsys/public/manage.html',
						{op: 'add', coursename: courseName, url: url, department: department},
						function (data) {
							if (data.id&&data.result==='true') {
								//返回'true'作为成功标志
								var id = data.id;
								tbody.append("<tr class='main-data'><td>" + id + "</td>" +
									"<td>" + courseName + "</td>" +
									"<td>" + url + "</td>" +
									"<td>" + department + "</td>" +
									"<td><button type='button' class='modify btn btn-primary btn-sm'>修改</button>" +
									"<button type='button' class='delete btn btn-danger btn-sm'>删除</button></td></tr>");
							}
						});
				}
			}
			else {
				//存在未填写的字段
			}
			$('.confirm').off();
		})
	}
})();

