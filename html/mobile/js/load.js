;
var AILoad = function(options) {
	var _ = this;
	_.content = options.content || '加载中...';
	_.callback = options.callback || function(){};
	_.model = options.model || false;
	_.init();
}
AILoad.prototype = {
	init: function() {
		var _ = this;
		var _load = $("<div>").addClass("ui-load").appendTo($('body'));
		var _loadMain = $("<div>").addClass('ui-load-main').appendTo(_load);
		var _con = $("<div>").addClass('ui-spinner-block').appendTo(_loadMain);
		for(var i = 1;i<13;i++){
			$("<div>").addClass('bar'+i).appendTo(_con);
		}
		$("<p>").addClass("ui-load-info").appendTo(_load).html(_.content);
		var _wid = _load.width();
		var _hid = _load.height();
		//获取浏览器的宽度
		var clientWidth = $(window).width();
		var clientHeight = $(window).height();
		//alert(clientWidth);
		_load.css("margin-left", -_wid / 2 + "px");
		_load.css("margin-top", -_hid / 2 + "px");
		_load.hide();
		if(_.model){
			var _model = $("<div>").addClass('ui-load-model').appendTo($('body'));
			_model.hide();
		}
		_.loadTip = _load;
	},
	setContent:function(str){
		var _ = this;
		$(".ui-load-info").html(str);
		var _wid = _.loadTip.width();
		_.loadTip.css("margin-left", -_wid / 2 + "px");
	},
	start: function() {
		var _ = this;
		var model = $(".ui-load-model");
		var load = $(".ui-load");
		if (load.length <= 0) {
			this.init();
		}
		if(_.model && load.length>0){
			model.show();
		}
		load.show();
	},
	done: function() {
		if($(".ui-load-model").length>0){
			$(".ui-load-model").fadeOut();
		}
		$(".ui-load").fadeOut();
		this.callback();
	}
}