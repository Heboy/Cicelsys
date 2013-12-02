/**
 * Created by Heboy on 13-12-2.
 */
/**
 * 实现修改 删除的逻辑
 */
var logic1 = (function () {
	var currentTarget = null;
	var lastTarget = null;
	$('#t0').on('click', function (e) {
		currentTarget = $(e.target);
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
				currentTarget.popover({html: true, title: '确认删除', content:
					'<button type="button" class="btn btn-danger btn-sm confirm">确认</button><button type="button" class="btn btn-default btn-sm cancel">取消</button>'});
				currentTarget.popover('show');
				currentTarget.addClass('isAlert');
				lastTarget = currentTarget;
			}
		}
		else if(currentTarget.hasClass('confirm')){
			removeAlert(lastTarget);
			$.post('http://localhost:63342/Cicelsys/public/manage.html',{id:'0101'},function(data){
				//data是返回值
				if(data.result){
//					返回'true'作为成功标志
					window.location.reload();
				}
			});//这里的url替换成处理删除操作的url
		}
		else if(currentTarget.hasClass('cancel')){
			removeAlert(lastTarget);
		}
	})
	function removeAlert(target) {
		target.popover('destroy');
		target.removeClass('isAlert');
	}

	$('#modify').on('shown.bs.modal',function(e){
		console.log($('.confirm'));
		$('.confirm').on('click',function(e){
			$('#modify').modal('hide');
			if($('#courseName').val().split(' ').length>0){
				$.post('http://localhost:63342/Cicelsys/public/manage.html',{id:'0101'},function(data){
					//data是返回值
					if(data.result){
//					返回'true'作为成功标志
						window.location.reload();
					}
				});//这里的url替换成处理删除操作的url
			}
		})
	})
})();

