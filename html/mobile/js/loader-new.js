;
var AILoadControl = function(options) {
	var _ = this;
	_.content = options.content || '加载中...';
	_.time = options.time || 6000;
	_.flag = options.flag || false;
	_.callback = options.callback || function() {};
	_.model = options.model || false;
	_.init();
}
AILoadControl.prototype = {
	init: function() {
		var _ = this;
		var _load = $("<div>").addClass("ui-load-action").appendTo($('body'));
		var _loadMain = $("<div>").addClass('ui-load-animate').appendTo(_load);
		var _con = $("<div>").addClass('ui-spinner').appendTo(_loadMain);
		for (var i = 1; i < 13; i++) {
			$("<div>").addClass('bar' + i).appendTo(_con);
		}
		$("<span>").addClass("ui-load-text").appendTo(_load).html(_.content);
		var _wid = _load.width() + 63;
		var _hid = _load.height();
		//获取浏览器的宽度
		var clientWidth = $(window).width();
		var clientHeight = $(window).height();
		//alert(clientWidth);
		_load.css("margin-left", -_wid / 2 + "px");
		_load.css("margin-top", -_hid / 2 + "px");
		_load.hide();
		if (_.model) {
			var _model = $("<div>").addClass('ui-load-model').appendTo($('body'));
			_model.hide();
		}
		_.ll = _load;
		_.cc = _con;
	},
	start: function() {
		var _ = this;
		var model = $(".ui-load-model");
		var load = $(".ui-load-action");
		if (load.length <= 0) {
			this.init();
		}
		if (_.model && load.length > 0) {
			var wid = load.width() + 63;
			load.css("margin-left", -wid / 2 + "px");
			model.show();
		}
		load.show();
		if (_.flag) {
			setTimeout(function() {
				var _close = $("<div>").addClass("ui-load-close").appendTo($('.ui-load-action'));
				_close.bind("click", function() {
					_.done();
					_.callback();
					$(this).remove();
				});
				var wid = load.width() + 63;
				load.css("margin-left", -(wid / 2) + "px");
			}, _.time);
		}
	},
	done: function() {
		if ($(".ui-load-model").length > 0) {
			$(".ui-load-model").fadeOut();
		}
		$(".ui-load-action").fadeOut();
	}
}