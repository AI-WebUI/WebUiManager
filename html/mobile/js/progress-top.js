/**
 * 顶部加载组件--实现顶部加载的效果，可手动控制加载的开始和结束
 *
 * @fileOverview
 * @author kangbk
 * @version 1.0
 */
(function($) {
	/**
	 * 顶部加载
	 *
	 * @constructor Progress
	 * @desc 顶部加载
	 * @memberOf jQuery
	 * @name progress
	 *
	 * @return {Object} 返回 progress 对象的一个实例
	 * @example
	 * var progress = $('#btn').progress();
	 *
	 */
	$.fn.AIProgress = function() {
		return new Progress(this);
	};
	var Progress = function(element) {
		this.el = $(element);
		this.init();
	}
	/**
	 * progress 名字空间
	 * @namespace
	 * @memberOf jQuery
	 * @name progress
	 */
	Progress.prototype =
	/**
	 * @lends jQuery.progress
	 */
	{
		/**
		 * 初始化
		 */
		init: function() {
			this.creatDiv();
		},
		/**
		 * 构造页面显示div
		 */
		creatDiv: function() {
			var _load = $("<div>").addClass("ui-load-top").appendTo(this.el);
			var _line = $("<div>").addClass("ui-load-line").appendTo(_load);
			_load.hide();
		},
		/**
		 * 实现开始的效果
		 */
		start: function() { //打开进度条
			var load = $(".ui-load-top");
			var _lineWidth = 0;
			var _loadWidth = parseInt($(".ui-load-top").width());
			var line = $(".ui-load-line");
			var item = (_lineWidth / _loadWidth) * 100;
			load.show();
			/*
			 * 进度条根据时间变化
			 */
			setInterval(function() {
				if (item < 30) {
					item += 1.3;
					line.css("width", item + "%");
				} else {
					return;
				}
			}, 20);
			setInterval(function() {
				var load = $(".ui-load-top");
				var _lineWidth = parseInt($(".ui-load-line").width());
				var _loadWidth = parseInt($(".ui-load-top").width());
				var line = $(".ui-load-line");
				var item = (_lineWidth / _loadWidth) * 100;
				if (item < 85) {
					item += 0.3;
					line.css("width", item + "%");
				} else {
					return;
				}
			}, 50);
		},
		/**
		 * 实现结束的效果
		 */
		done: function() {
			var load = $(".ui-load-top");
			var _lineWidth = parseInt($(".ui-load-line").width());
			var _loadWidth = parseInt($(".ui-load-top").width());
			var line = $(".ui-load-line");
			var item = (_lineWidth / _loadWidth) * 100;
			item = Math.floor(item);
			for (; item < 101; item++) {
				line.css("width", item + "%");
				if (item >= 100) {
					setTimeout(function() {
						load.hide();
					}, 700);
					return;
				}
			}
		}
	};
})(jQuery)