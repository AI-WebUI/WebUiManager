/**
 * 进入页面加载插件
 * @fileOverview
 * @author kangbk
 * @version 1.0
 */
/*
 * 获取浏览器页面可见高度和宽度
 */
var _PageHeight = document.documentElement.clientHeight,//浏览器的高度
	_PageWidth = document.documentElement.clientWidth;//浏览器的宽度
/*
 * 计算loading框距离顶部和左部的距离
 */
var _LoadingTop = (_PageHeight - 164) / 2,
	_LoadingLeft = (_PageWidth - 192) / 2;
/*
 * 在页面未加载完毕之前显示的loading Html自定义内容
 */
var _LoadingHtml = '<div id="JS_loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#fff;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px;width: 192px;height: 164px;opacity: 0.8;background-color: rgba(0, 0, 0, 0.7);"><div style="height: 50px;width: 192px;padding-top: 40px; text-align: center;"><img width="50" height="50" src="img/ui-loading.gif"/></div><div style="font-size: 24px;height: 54px;padding-top: 20px;text-align: center;color: #fff;">正在加载...</div></div></div>';
/*
 * 呈现loading效果
 */
document.write(_LoadingHtml);
/*
 * 监听加载状态改变
 */
document.onreadystatechange = completeLoading;
/*
 * 加载状态为complete，即页面加载完成时移除loading效果
 */
/**
 * @constructor load-in-html
 * @desc 进入页面加载
 * @name load-in-html
 * @example
 * 使用方法：在页面头部引入当前js文件
 * &lt;script src="js/load-in-html.js" type="text/javascript" charset="utf-8"></script>
 */
function completeLoading() {
	if (document.readyState == "complete") {
		var loadingMask = document.getElementById('JS_loadingDiv');
		loadingMask.parentNode.removeChild(loadingMask);
	}
}