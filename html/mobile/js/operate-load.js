/**
 * 操作加载组件
 *
 * @fileOverview
 * @author kangbk
 * @version 1.0
 */
;
(function($) {
	/*
	 * 绑定为jQuery插件
	 */
	/**
	 * 操作加载
	 *
	 * @constructor Operatingload
	 * @desc 操作加载
	 * @memberOf jQuery
	 * @name operatingload
	 * @param {Object} option 参数对象
	 *
	 * @property {String} tipText - 提示的文字
	 * @property {String} URL - 操作访问的地址
	 * @property {String} param - 前台需要传到后台的参数
	 * @property {String} time - 需要多长时间显示关闭按钮
	 * @property {Function} callback - 提供的回调函数，一共两个参数state(状态)、json(返回的json数据)
	 * @return {Object} 返回 operatingload 对象的一个实例
	 * @example
	 * var operatingload = $('#btn').operatingload({
	 * 	URL:'json/update.json',//访问的地址
		tipText:'这个是测试的问文本！',//提示文本
		callback:function(state,json){
			console.log(JSON.stringify(json));
		}
	 * });
	 *
	 */
	$.fn.AIOperatingload = function(options) {
		return new Operatingload(this, options);
	};

	var Operatingload = function(element, options) {
		var _ = this;
		_.el = $(element);
		_.init(options);
	};
	/**
	 * operatingload 名字空间
	 * @namespace
	 * @memberOf jQuery
	 * @name operatingload
	 */
	Operatingload.prototype =
		/**
		 * @lends jQuery.operatingload
		 */
		{
			/**
			 * 初始化，拼装数据和模版加载到容器
			 *
			 * @param {Object} option 参数对象
			 */
			init: function(options) {
				var _ = this;
				_.opts = $.extend({
					tipText: '字测试测试文字测', //提示文本
					URL: '', //操作地址
					param: '', //向后台传的参数
					time: 5000, //时间,多长时间X号出现
					callback: function(state, json) {} //回调函数
				}, options);
				var load = _.creatDiv();
				load.hide();
				var _wid = load.width() + 127;
				var _hid = load.height();
				//获取浏览器的宽度
				var clientWidth = $(window).width();
				var clientHeight = $(window).height();
				//alert(clientWidth);
				load.css("margin-left", -_wid / 2 + "px");
				load.css("margin-top", -_hid / 2 + "px");
				//给当前元素绑定事件
				_.el.bind('click', function() {
					_.getJson(_.opts.URL, _.opts.param, _.opts.callback);
				});
			},
			/** 
			 * 构造页面显示div
			 */
			creatDiv: function() {
				var _load = $("<div>").addClass("ui-load-action").appendTo($("body"));
				var _loadMain = $("<div>").addClass('ui-load-animate').appendTo(_load);
				var _con = $("<div>").addClass('ui-spinner').appendTo(_loadMain);
				for (var i = 1; i < 13; i++) {
					$("<div>").addClass('bar' + i).appendTo(_con);
				}
				var _txt = $("<p>").addClass("ui-load-text").appendTo(_load).html(this.opts.tipText);
				return _load; //返回一个对象
			},
			/** 
			 * 显示加载
			 */
			start: function() {
				var load = $(".ui-load-action");
				if (load.length <= 0) {
					this.init();
				}
				load.show();
				setTimeout(function() {
					var _close = $("<div>").addClass("ui-load-close").appendTo(load);
					_close.bind("click", function() {
						load.fadeOut();
						$(this).remove();
					});
				}, this.opts.time);
			},
			/** 
			 * 关闭加载窗口
			 */
			done: function() {
				var load = $(".ui-load-action");
				load.fadeOut();
				$('.ui-load-close').remove();
			},
			/** 
			 * 从服务器获取数据，并提供给回调函数执行
			 *
			 * @param {String} url - 操作访问的地址
			 * @param {String} param - 前台需要给后台的参数
			 * @param {Function} callback - 回调函数
			 * @return {Object} json对象
			 */
			getJson: function(url, param, callback) {
				var _ = this;
				_.start();
				$.ajax({
					url: url,
					type: "GET",
					data: "_=" + (new Date()).getTime() + (param == null || param == "" ? "" : ("&" + param)),
					cache: false,
					dataType: "json",
					beforeSend: function(xhr) {
						xhr.overrideMimeType("text/plain; charset=utf-8");
					},
					success: function(json) {
						_.done();
						callback('success', json);
					},
					error: function(e) {
						_.done();
						callback("error", {
							"flag": false,
							"errmsg": "调用服务失败！"
						});
					}
				});
			}
		}
})(jQuery)