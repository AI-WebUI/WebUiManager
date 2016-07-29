;$(function() {
	//隐藏所有消息主体内容
	$('.ui-collapse-content').hide();
	//插入span标签用来制作三角标志
	$('<span class="ui-collapse-icon">').appendTo('.ui-collapse-name');
	//点击标题相对应的内容展开，再次点击后折叠
	$('.ui-collapse-name').bind("touchend click",t
	)

});
var t=function() {

	var _con = $(this).next('.ui-collapse-content');
	if (!_con.hasClass("ui-collapse-show")) {
		//获取所有的元素
		var _allCon = $(".ui-collapse div.ui-collapse-content");
		for (var i = 0; i < _allCon.length; i++) {
			if ($(_allCon[i]).hasClass("ui-collapse-show")) {
				$(_allCon[i]).removeClass("ui-collapse-show");
				$(_allCon[i]).prev("p").children("span").removeClass("ui-icon-up");
				$(_allCon[i]).slideToggle(400);

			}
		}
		_con.addClass("ui-collapse-show");
		_con.prev("p").children("span").addClass("ui-icon-up");
	}else{
		_con.removeClass("ui-collapse-show");
		_con.prev("p").children("span").removeClass("ui-icon-up");
	}

	_con.slideToggle(400)}
//$(".ui-collapse-name").unbind("click");
//$(".ui-collapse-name").unbind("click touchend",toggle);
