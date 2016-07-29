;var tmp_fun = null;
function AIUiload(funcObj, msg) {
	//如果funObj为function对象,则直接赋值
	if (typeof(funcObj) == 'function') {
		tmp_fun = funcObj;
	}
	//如果funcObj为string对象,则构建一个function对象
	else if (typeof(funcObj) == 'string') {
		tmp_fun = function() {
			eval(funcObj);
		}
	} else {
		//参数错误！请传递一个Function对象或者一个字符串
		console.log('error parameter!Please pass a function or string!');
		return;
	}
	if($(".ui-uiload") == null || $(".ui-uiload").length<=0){
		var _load = $("<div>").addClass("ui-uiload").appendTo($("body"));
		$("<img>").attr("width", 32).attr("height", 32).attr("src", "img/ui-loading.gif").addClass("ui-uiload-img").appendTo(_load);
		var _wid = _load.width() + 127;
		var _hid = _load.height();
		//获取浏览器的宽度
		var clientWidth = $(window).width();
		var clientHeight = $(window).height();
		//alert(clientWidth);
		_load.css("margin-left", -_wid / 2 + "px");
		_load.css("margin-top", -_hid / 2 + "px");
		_load.fadeIn();
	}else{
		$(".ui-uiload").fadeIn();
	}
	if (msg != null && msg != "") {
		$("<p>").addClass("ui-uiload-text").appendTo($(".ui-uiload")).html(msg);
		$(".ui-uiload").fadeIn();
	}
	window.setTimeout("tmp_fun();enduiload();", 10);
}
function enduiload() {
	var load = $(".ui-uiload");
	if (load != null) {
		load.fadeOut();
	}
}