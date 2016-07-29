/**
 * @file  选择组件
 * @author 刘亮
 * @time 2015-8-11
 * @version 1.0
 */
;
(function($) {
	//绑定到jquery上
	$.fn.AITips = function(options) {
			return new AITips(this, options);
		}
		/** 
		 * @description 提示组件
		 * @param {Object} element - 当前绑定的元素
		 * @todo 定义一些变量，初始化插件。
		 * @constructor 表明这个方法是个构造。
		 */
	var AITips = function(element, options) {
		var _ = this;
		_.el = $(element);
		//		_.insertDOM = false;
		//		_.loading = false;
		options.sel = _.el;
		_.init(options);
	}

	IDs = 1;
	/** 
	 * @description 重写函数的prototype属性
	 * @param {String} params.type - 提示类型：确认提示、警告提示等
	 * @param {String} params.theme - 插件主题
	 * @param {Array} params.buttons - 按钮内容，包括text按钮名称和action点击方法
	 * @param {String} params.message - 提示的内容
	 * @param {String} params.icon - 提示内容前面的图标路径
	 * @param {String} params.timeout - toast提示的展示时间，单位:ms
	 * @param {String} params.dir - 指引提示的箭头方向
	 * @todo 定义、绑定参数，并给但钱元素绑定事件。
	 */
	AITips.prototype = {
		selfID: '',
		init: function(params) {
			if ($('#confirmOverlay').length) {
				// A confirm is already shown on the page:
				return false;
			}

			var buttonHTML = '',
				titleHTML = '';
			var markup;
			if (!params || !params.type || params.type == 'confirm') {
				$.each(params.buttons, function(itemIdx, obj) {

					buttonHTML += '<a href="#" class="ui-tips-confirm-button ui-tips-button-' + (obj.color || params.theme) + '">' + (obj.bold == true ? '<b>' : '') + obj.text + (obj.bold == true ? '</b>' : '') + '<span></span></a>';

					if (!obj.action) {
						obj.action = function() {};
					}
				});
				titleHTML += '<div class="ui-tips-confirm-title">' + (params.title || '') + '</div>';
				if (params.icon) {
					markup = [
						'<div id="confirmOverlay" class="ui-tips-confirm-overlay ui-flex ui-flex-hc ui-flex-vc">',
						'<div id="confirmBox" class="ui-tips-confirm-box">',
						titleHTML,
						'<img src="' + params.icon + '" style="width: 15px;height: 15px; float:left; margin-top: 17px; margin-left: 16px; margin-right:10px"/>',
						'<p>', params.message, '</p>',
						'<section>', params.desc, '</section>',
						'<div id="confirmButtons" class="ui-tips-confirm-buttons">',
						buttonHTML,
						'</div></div></div>'
					].join('');
				} else {
					markup = [
						'<div id="confirmOverlay" class="ui-tips-confirm-overlay ui-flex ui-flex-hc ui-flex-vc">',
						'<div id="confirmBox" class="ui-tips-confirm-box-no-icon">',
						titleHTML,
						'<p>', params.message, '</p>',
						'<section>', params.desc, '</section>',
						'<div id="confirmButtons" class="ui-tips-confirm-buttons">',
						buttonHTML,
						'</div></div></div>'
					].join('');
				}
			} else if (params.type == 'alert') {
				$.each(params.buttons, function(btnIdx, obj) {

					buttonHTML += '<a href="#" class="ui-tips-alert-button ui-tips-button-' + (obj.color || params.theme) + '">' + (obj.bold == true ? '<b>' : '') + obj.text + (obj.bold == true ? '</b>' : '') + '<span></span></a>';

					if (!obj.action) {
						obj.action = function() {};
					}
				});
				titleHTML += '<div class="ui-tips-confirm-title">' + (params.title || '') + '</div>';
				if (params.icon) {
					markup = [
						'<div id="confirmOverlay" class="ui-tips-alert-overlay ui-flex ui-flex-hc ui-flex-vc">',
						'<div id="confirmBox" class="ui-tips-alert-box">',
						titleHTML,
						'<img src="' + params.icon + '" style="width: 15px;height: 15px; float:left; margin-top: 17px; margin-left: 22px;"/>',
						'<p>', params.message, '</p>',
						'<section>', params.desc, '</section>',
						'<div id="confirmButtons" class="ui-tips-alert-buttons">',
						buttonHTML,
						'</div></div></div>'
					].join('');
				} else {
					markup = [
						'<div id="confirmOverlay" class="ui-tips-alert-overlay ui-flex ui-flex-hc ui-flex-vc">',
						'<div id="confirmBox" class="ui-tips-alert-box-no-icon">',
						titleHTML,
						'<p>', params.message, '</p>',
						'<section>', params.desc, '</section>',
						'<div id="confirmButtons" class="ui-tips-alert-buttons">',
						buttonHTML,
						'</div></div></div>'
					].join('');
				}
			} else if (params.type == 'toast') {
				if (params.icon) {
					markup = [
						'<div  class="ui-tips-toast-overlay ui-flex ui-flex-hc ui-flex-vc">',
						'<div id="toastBox" class="ui-tips-toast-box">',
						'<img src="' + params.icon + '" style="width: 15px;height: 15px; float:left; margin-top: 20px; margin-left: 20px;"/>',
						'<p>', params.message, '</p>',
						'</div></div>'
					].join('');
				} else {
					markup = [
						'<div  class="ui-tips-toast-overlay ui-flex ui-flex-hc ui-flex-vc">',
						'<div id="toastBox" class="ui-tips-toast-box-no-icon">',
						'<p>', params.message, '</p>',
						'</div></div>'
					].join('');
				}
			} else if (params.type == 'warning') {
				this.selfID = IDs;
				markup = [
					'<div id="warningBox' + (IDs++) + '" class="' + params.theme + ' ui-tips-warning-box">',
					'<p>', params.message, '</p>',
					'</div>'
				].join('');
			} else if (params.type == 'guide') {
				markup = [
					'<div class="ui-tips-guide-box">',

					'<div class="ui-tips-guide-content">',
					'<img src="img/ui-tips-tip-4.png" class="ui-tips-guide-icon">',
					params.message,
					'<img src="img/ui-tips-guild-x.png" class="ui-tips-guide-close">',
					'<div class="ui-tips-guide-arrow-location">',
					'<div class="ui-tips-guide-arrow-outer-' + params.dir + '">',
					'<div class="ui-tips-guide-arrow-inner-' + params.dir + '"></div>',
					'</div></div>',
					'</div>',
					'</div>'

				].join('');
			} else if (params.type == 'dot') {
				this.selfID = IDs;
				markup = [
					'<img id="dotImg' + (IDs++) + '" class="ui-tips-dot" src="img/ui-tips-dot.png" style="margin-right: 15px;    width: 8px;">',
				].join('');
			} else if (params.type == 'remains') {
				markup = [
					'<div class="ui-tips-remains" >',
					'<div class="ui-tips-remains-box" >',
					'</div>',
					'</div>'
				].join('');
			}
			var buttons, i = 0;

			if (!params || !params.type || params.type == 'confirm') {
				$(markup).prependTo('body');
				$("body").css("overflow","hidden");
				if ($(markup).find("section").text() == '') {
					$(".ui-tips-confirm-box-no-icon").find("p").css("text-align", "center");
					$(".ui-tips-confirm-box").find("p").css("text-align", "center");
					$(".ui-tips-confirm-box-no-icon").find("section").css("padding-top", "0");
					$(".ui-tips-confirm-box").find("section").css("padding-top", "0");
				}
				if ($(".ui-tips-confirm-title").text() == '') {
					$(".ui-tips-confirm-title").hide();
				}
				

				buttons = $('.ui-tips-confirm-button');
				$.each(params.buttons, function(name, obj) {
					buttons.eq(i++).click(function() {
						hideInmidiately('.ui-tips-confirm-overlay');
						$("body").css("overflow","auto");
						obj.action();
						return false;
					});
				});
			} else if (params.type == 'alert') {
				$(markup).prependTo('body');
				$("body").css("overflow","hidden");
				if ($(markup).find("section").text() == '') {
					$(".ui-tips-alert-box-no-icon").find("p").css("text-align", "center");
					$(".ui-tips-alert-box").find("p").css("text-align", "center");
					$(".ui-tips-alert-box-no-icon").find("section").css("padding-top", "0");
					$(".ui-tips-alert-box").find("section").css("padding-top", "0");
				}
				if ($(".ui-tips-confirm-title").text() == '') {
					$(".ui-tips-confirm-title").hide();
				}
				buttons = $('.ui-tips-alert-buttons');
				$.each(params.buttons, function(name, obj) {
					buttons.eq(i++).click(function() {
						hideInmidiately('.ui-tips-alert-overlay');
						$("body").css("overflow","auto");
						obj.action();
						return false;
					});
				});
			} else if (params.type == 'toast') {
				$(markup).prependTo('body');
				setTimeout(function() {
					hide('.ui-tips-toast-overlay');
				}, params.timeout);
			} else if (params.type == 'warning') {
				$(markup).hide().prependTo('body').fadeIn();

			} else if (params.type == 'guide') {
				$(markup).appendTo(params.sel);
				if (params.dir == 'up' || params.dir == 'down') {
					$(".ui-tips-guide-arrow-outer-up").css("left", "-" + ($(".ui-tips-guide-content").width() / 2 + 10) + "px");
					$(".ui-tips-guide-arrow-outer-down").css("left", "-" + ($(".ui-tips-guide-content").width() / 2 + 10) + "px");
				} else {
					$(".ui-tips-guide-arrow-outer-left").css("left", "-" + ($(".ui-tips-guide-content").width() + 26) + "px");
				}
				$(".ui-tips-guide-close").click(function() {
					$(".ui-tips-guide-box").remove();
				})
			} else if (params.type == 'dot') {
				if (params.sel.find($(' .ui-tips-dot ')).length == 0) {
					$(markup).appendTo(params.sel);

					$(params.sel).addClass("ui-flex ui-flex-hc ui-flex-vc");
				}
			} else if (params.type == 'remains') {
				params.sel.find($('.ui-tips-remains ')).remove();
				$(markup).appendTo(params.sel);

			}
		},
		/** 
		 * @description 隐藏顶部提示
		 */
		hideWarning: function() {
			$('#warningBox' + this.selfID).fadeOut(function() {
				$(this).remove();
			});
		},
		/** 
		 * @description 隐藏圆点提示
		 */
		hideDot: function() {
			$('#dotImg' + this.selfID).fadeOut(function() {
				$(this).remove();
			});
		},
		/** 
		 * @description 设置未读数量提示的数值
		 * @param {String} rNum - 未读数量提示的数值
		 */
		remainsNum: function(rNum) {
			if (isPositiveNum(rNum)) {
				if (rNum < 1) {
					this.el.find($('.ui-tips-remains ')).css("background-image", "url(../mobile/img/ui-tips-remain-0.png)");
					rNum = '';
				} else if (rNum < 10) {
					this.el.find($('.ui-tips-remains ')).css("background-image", "url(../mobile/img/ui-tips-remain-9.png)");
				} else if (rNum < 100) {
					this.el.find($('.ui-tips-remains ')).css("background-image", "url(../mobile/img/ui-tips-remain-99.png)");
				} else {
					this.el.find($('.ui-tips-remains ')).css("background-image", "url(../mobile/img/ui-tips-remain-999.png)");
					rNum = '99+';
				}
				$('.ui-tips-remains-box').text(rNum);
			}
		}
	}

	hide = function(hideSelecter) {
		$(hideSelecter).fadeOut(function() {
			$(this).remove();
		});
	};

	hideInmidiately = function(hideSelecter) {
		$(hideSelecter).remove();
	};
	isPositiveNum = function(s) { //是否为正整数 
		var re = /\d{1,}/;
		return re.test(s)
	}
})(jQuery);