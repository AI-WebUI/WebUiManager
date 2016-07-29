;
(function($) {
	$.fn.AIShade = function(options) {
		return new Shade(this,options);
	}
	var Shade = function(element, options) {
			var _ = this;
			_.el = $(element);
			_.init(options);
		}
		/*
		 * 参数：显示内容div的id
		 * 提供方法：open(),close()
		 */
	Shade.prototype = {
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				content: ''
			}, options);
			var _shade = $("<div></div>").addClass("ui-shade-bg").appendTo(_.el);
			if(typeof _.opts.content=="object"){
				_.content = _.opts.content;
			}else{
				_.content = $("#" + _.opts.content);
			}
			_.content.appendTo(_shade);
			_.shade = _shade;
		},
		open: function() {
			var _ = this;
			//打开遮罩
			_.shade.show();
			//显示隐藏内容
			_.content.show();
		},
		close: function() {
			var _ = this;
			//关闭遮罩
			_.shade.hide();
			//隐藏显示内容
			_.content.hide();
		}
	}
})(jQuery)