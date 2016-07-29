;
(function($) {
	$.fn.operateBtn = function(options) {
		return new OperateBtn(this, options);
	}
	var _operateTip = new AIToastTip({
		timeout: 2000,
		type: "warn-little"
	});
	var OperateBtn = function(element, options) {
		var _ = this;
		_.el = $(element);
		_.init(options);
	}
	OperateBtn.prototype = {
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				max: 1000,
				min: 0,
				callback: function() {},
				type: "big" //big and small
			}, options);
			var _size = 28;
			if (_.opts.type == "small") {
				_size = 22;
			}
			var _operate = $("<div>").addClass("ui-operate ui-operate-" + _size).appendTo(_.el);
			_.minusBtn = $("<div>").addClass("ui-operate-minus disabled").appendTo(_operate);
			_.inputVal = $("<input>").addClass("ui-operate-input").val(_.opts.min).appendTo(_operate);
			_.inputVal.keyup(function() {
				$(this).val($(this).val().replace(/\D|^0/g, ''));
			});
			//绑定输入事件，根据输入内容判断是否超过最大值
			_.inputVal.bind('input propertychange', function() {
				var _num = parseInt(_.inputVal.val());
				if (_num > _.opts.max) {
					_operateTip.setContent("最大可输入数值为" + _.opts.max);
					_operateTip.open();
					_.inputVal.val(_.opts.max);
				}
				_.operateRefresh();
			});


			_.addBtn = $("<div>").addClass("ui-operate-add").appendTo(_operate);
			_.minusBtn.click(function() {
				_.minus();
				_.opts.callback();
			});
			_.addBtn.click(function() {
				_.add();
				_.opts.callback();
			});
			_.inputVal.blur(function() {
				_.inputBlur();
			});
		},
		inputBlur: function() {
			var _ = this;
			var _num = parseInt(_.inputVal.val());
			if (_num > _.opts.max) {
				_operateTip.setContent("最大可输入数值为" + _.opts.max);
				_operateTip.open();
				_.inputVal.val(_.opts.max);
			} else if (_num < _.opts.min) {
				_.inputVal.val(_.opts.min);
			}
			_.operateRefresh();
		},
		getValue: function() {
			return _.inputVal.val();
		},
		operateRefresh: function() {
			var _ = this;
			var _num = parseInt(_.inputVal.val());
			if (_num >= (_.opts.min+1)) {
				_.minusBtn.removeClass("disabled");
			} else {
				_.minusBtn.addClass("disabled");
			}
			if (_num >= _.opts.max) {
				_.addBtn.addClass("disabled");
			} else if (_.addBtn.hasClass("disabled")) {
				_.addBtn.removeClass("disabled");
			}
		},
		add: function() {
			var _ = this;
			var _num = parseInt(_.inputVal.val());
			if (_num < _.opts.max) {
				_.inputVal.val(_num + 1);
			} else {
				_operateTip.setContent("最大可输入数值为" + _.opts.max);
				_operateTip.open();
			}
			_.operateRefresh();
		},
		minus: function() {
			var _ = this;
			var _num = parseInt(_.inputVal.val());
			if (_num >= (_.opts.min+1)) {
				_.inputVal.val(_num - 1);
			}
			_.operateRefresh();
		}
	}
})(jQuery);