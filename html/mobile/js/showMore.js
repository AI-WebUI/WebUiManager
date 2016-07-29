;(function($) {
$.fn.showMore = function(options) {
    var settings = $.extend({
        maxHeight: 300,
        content: "#"+this.attr("id").split("-")[1],
        status:"hide"
    }, options );

    var _DomH = $(content).height();
    var _s = settings.status;
    var _maxH = settings.maxHeight;
    
    //如果容器最大高度大于容器本身高度，不做操作
    if(_maxH > _DomH)
    return;

    //设置高度
    $(content).css({
        "height":_maxH,
        "overflow": 'hidden'
    });

    //绑定事件
    return this.click(function() {
        if(_s == "hide"){
            $(content).animate({height:_DomH}, "fast");
            _s = "show";
            $(this).text("收起");
        }else{
            $(content).animate({height:_maxH}, "fast");
            _s = "hide";
            $(this).text("展开");
        }
    });
};
}(jQuery));