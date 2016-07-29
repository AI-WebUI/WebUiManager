;

function bindInputEvent(clear, look, textarea) {
	/**
	 * @constructor input
	 * @desc 输入框组件绑定js事件
	 * @name input
	 *
	 */
	var _clear = clear || false;
	var _look = look || false;
	var _textarea = textarea || false;
	/**
	 * 清除按钮绑定清除事件
	 */
	$(".ui-input").each(function() {
		var _ = $(this);
		_.bind("touchstart", function() {
			var _val = $(this).val();
			_.val('').val(_val);
			_.next(".js-ui-clear").removeClass("fn-hide");
		});
		_.bind("focus", function() {
			var _val = $(this).val();
			_.val('').val(_val);
			_.next(".js-ui-clear").removeClass("fn-hide");
		});
		_.bind("blur", function() {
			setTimeout(function() {
				_.next(".js-ui-clear").addClass("fn-hide");
			}, 100);
		});
	});
	if (_clear) {
		$(".js-ui-clear").each(function() {
			$(this).bind("touchstart click", function() {
				$(this).prev().val("").focus();
			});
		});
	}
	//查看密码，单击查看文本，再次单击显示密文
	/**
	 * 密码输入框绑定显示，隐藏按钮
	 */
	if (_look) {
		var obj = null;
		$(".js-ui-look").bind("touchstart click", function() {
			obj = $(this).parent().find("input");
			/*if (_.attr("type") == "text") {
				_.attr("type", "password");
				$(this).css("background", "url(img/look.png) no-repeat center");
				$(this).parent().find("ui-input").focus();
			} else {
				_.attr("type", "text");
				$(this).css("background", "url(img/look-on.png) no-repeat center");
				$(this).parent().find("ui-input").focus();
			}*/
		});
		$(".js-ui-look").bind("touchend click", function() {
			/*var _ = $(this).parent().find("input");*/
			if (obj.attr("type") == "text") {
				obj.attr("type", "password");
				$(this).css("background", "url(img/look.png) no-repeat center");
				$(this).css("background-size", "contain");
				obj.focus();
			} else {
				obj.attr("type", "text");
				$(this).css("background", "url(img/look-on.png) no-repeat center");
				$(this).css("background-size", "contain");
				obj.focus();
			}
		});
	}
	//给文本域绑定输入变化事件，并实时更新还可输入字符数量
	/**
	 * 给文本域绑定输入变化事件，并实时更新还可输入字符数量
	 */
	if (_textarea) {
		$(".ui-textarea").bind('input propertychange', function() {
			var len = parseInt($(this).val().length);
			var maxlen = parseInt($(this).attr("maxlength"));
			var mulit = maxlen - len;
			if (len < maxlen || len == maxlen) {
				$(this).next(".ui-textarea-tip").find("span").html(maxlen - len);
			} else {
				$(this).next(".ui-textarea-tip").find("span").html(0);
			}
			if (mulit > 10) {
				$(this).next(".ui-textarea-tip").hide();
			} else {
				$(this).next(".ui-textarea-tip").show();
			}
		});
	}
	/**
	 * 自适应高度增加行数
	 * @param {Object} element 当前元素
	 * @param {Object} minHeight 最低高度
	 */
	$(".js-textarea").each(function(){
		var el = this;
		// 如果文本域有边距，我们需要设置box-sizing: border-box
		el.style.boxSizing = el.style.mozBoxSizing = 'border-box';
		// 我们不需要滚动条，不是么？ :)
		el.style.overflowY = 'hidden';
		// 通过"rows"属性初始化的最小高度
		var minHeight = el.scrollHeight;
		el.addEventListener('input', function() {
			autoHeight(el, minHeight);
		});
		// 当窗口大小改变时，我们需要重新调整高度（例如方向变化）
		window.addEventListener('resize', function() {
			autoHeight(el, minHeight);
		});
		
	});
	function autoHeight(el, minHeight) {
		// 计算因边框和轮廓产生的高度差异
		var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
		var diff = outerHeight - el.clientHeight;
		// 设置高度为0以防需要收缩（高度）
		el.style.height = 0;
		// 设置正确的高度
		el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
	}
}