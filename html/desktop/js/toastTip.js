;
var AIToastTip = function(options) {
	this.init(options);
}
AIToastTip.prototype = {
	init: function(options) {
		var _ = this;
		_.opts = $.extend({}, {
			message: '',
			timeout: 2000,
			id:"",
			type: 'success' //success,error,info,question,warn,warn-little
		}, options);
		var _toast = $("<div>").addClass("ui-tip-toast");
		var _con = $("<div>").addClass("ui-toast-centent").appendTo(_toast);
		$("<span>").addClass("span-icon").addClass("span-" + _.opts.type).appendTo(_con);
		$("<span>").addClass("tip-content").html(_.opts.message).appendTo(_con);
		var _clientHeight;
		if(_.opts.id == ''){
			_toast.appendTo($("body"));
			_clientHeight = document.documentElement.clientHeight;
		}else{
			_toast.appendTo($("#"+_.opts.id));
			_clientHeight = $("#"+_.opts.id).height();
			_toast.css("position", "absolute");
		}
		var _wid = _toast.width() + 42;
		var _hid = _toast.height() + 42;
		_toast.css("margin-left", -_wid / 2 + "px");
		_toast.css("margin-top", (_clientHeight - _hid) / 2 + "px");
		_toast.hide();
		_.opts.tip = _toast;
	},
	setPosition: function(x) {
		this.opts.tip.css({
			"margin-top": x
		});
	},
	setContent: function(str) {
		this.opts.tip.find(".tip-content").html(str);
		var _wid = this.opts.tip.width() + 42;
		this.opts.tip.css("margin-left", -_wid / 2 + "px");
	},
	open: function() {
		var _ = this;
		_.opts.tip.fadeIn();
		setTimeout(function() {
			_.opts.tip.fadeOut();
		}, _.opts.timeout);
	}
}