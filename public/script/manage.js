/**
 * Created by Heboy on 13-12-2.
 */
/**
 * 实现修改 删除的逻辑
 */
var uplete = (function () {
	var currentTarget = null;
	var lastTarget = null;
	$('#t0').on('click', function (e) {
		currentTarget = $(e.target);
		///////////////////////start删除逻辑////////////////////////////////
		if (currentTarget.hasClass('modify')) {
			$('#modify').modal();
		}
		else if (currentTarget.hasClass('delete')) {
			if (currentTarget.hasClass('isAlert')) {
				removeAlert(lastTarget);
			}
			else if (!currentTarget.hasClass('isAlert')) {
				if (lastTarget) {
					removeAlert(lastTarget);
				}
				currentTarget.popover({html: true, title: '确认删除', content: '<button type="button" class="btn btn-danger btn-sm confirm">确认</button><button type="button" class="btn btn-default btn-sm cancel">取消</button>'});
				currentTarget.popover('show');
				currentTarget.addClass('isAlert');
				lastTarget = currentTarget;
			}
		}
		else if (currentTarget.hasClass('confirm')) {
			removeAlert(lastTarget);
			var tr = $(lastTarget.parents('tr')[0]);
			var id = tr.find($('.id')).text();
			console.log(id);
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
	})
	function removeAlert(target) {
		target.popover('destroy');
		target.removeClass('isAlert');
	}

	$('#modify').on('shown.bs.modal', function (e) {
		var tr = $(currentTarget.parents('tr')[0]);

		$('.confirm').on('click', function (e) {
			$('#modify').modal('hide');
			var id = tr.find($('.id')).text();
			var courseName = $('#courseName').val();
			var url = $('#url').val();
			var department = $('#department').val();

			if (courseName.split(' ').length > 0 && url.split(' ').length && department.split(' ').length) {
				//修改操作
				$.post('http://localhost:63342/Cicelsys/public/manage.html',
					{op: 'update', id: id, coursename: courseName, url: url, department: department},
					function (data) {
						if (!data.result) {
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
					});//这里的url替换成处理删除操作的url
			}
			else {
				//存在未填写的字段
			}
		})
	})
})();

