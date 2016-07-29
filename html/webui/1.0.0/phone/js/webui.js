/** 
 *  按钮组件
 * 
 * @fileOverview 
 * @version 1.0
 * @author 蒋蓝宇 
 * @description 
 * 
 */
$.fn.extend({
	blockBtn: function(param) {
		//按钮手触事件
		/**
		 * @description 改变按钮样式事件
		 */
		$(this).on("touchstart", function() {
			$(this).css({
				background: "#268BC4"
			});
			$(this).css({
				"color": "#bde2f"
			});
			$(this).css({
				"outline": "none"
			});

		}).on("touchend", function() {
			$(this).css({
				background: "#44abe5"
			});
			$(this).css({
				"color": "#ffffff"
			});
			$(this).css({
				"outline": "none"
			});
		});

	}
});
$.fn.extend({
	switchBtn: function(param) {
		//改变开关状态事件
		/**
		 * @description 改变开关状态事件
		 */
		$(this).click(function() {
			if ($(this).prop("checked")) {
				//如果开关为选中状态，则调用selectfunc()
				if (param.selectfunc) {
					param.selectfunc();
				}
			} else {
				//如果开关为未选状态，则调用selectfunc()
				if (param.unselectfunc) {
					param.unselectfunc();
				}
			}
		});


	},
	//获得开关状态事件
	/**
	 * @description 获得开关状态事件开：on、关：off(均为小写字符)
	 */
	curStatus: function() {
		if ($(this).is(':checked')) {
			return 'on';
		} else {
			return 'off';
		}
	}
});
$.fn.extend({

	counterBtn: function(param) {
		//初始化计数器按钮事件
		/**
		 * @description 初始化计数器按钮事件
		 */
		var maxNum = 10;

		/**
		 * @param  maxNum 计数器当前最大数值
		 */
		if (param.maxNum) {
			maxNum = param.maxNum;
		}

		//设置的默认值如果大于最大值会判断然后互换值


		var $spanreduce = $(this).find("span:eq(0)");
		var $spanadd = $(this).find("span:eq(1)");
		var $btninput = $(this).find("input");
		var min = parseInt($(this).find("input").attr("min"));
		var max = maxNum;


		//添加减号事件
		var mulit = function() {

			$spanreduce.on("touchstart", function() {
				$(this).css({
					background: "#f2f2f2"
				});
				$(this).css({
					"outline": "none"
				});
			}).on("touchend", function() {
				$(this).css({
					background: "#ffffff"
				});

				$(this).css({
					"outline": "none"
				});
			});
			//减法逻辑
			var value = parseInt($btninput.val());
			if (value <= max + 1) {

				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add.png");
			}
			if (value > min) {
				$btninput.val(value - 1);
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");

			}
			if (value <= min + 1) {
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce1.png");

			} else if (value > max) {
				$btninput.val("");
				$btninput.val(max);
			}
		};
		//添加加号事件
		var add = function() {
			var v = $btninput.val();
			var in_value = parseInt(v);
			//加法逻辑，如果值大于等于(max-1),这改变加号的状态样式为不可点击
			if (in_value >= max - 1) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add2.png");
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
				$btninput.val("");
				$btninput.val(max);

				return false
			} else if (in_value <= max) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add.png");

			}
			//每操作一次就加1，并且减号状态更改为可点击
			$btninput.val(parseInt($btninput.val()) + 1);
			$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
			$spanadd.on("touchstart", function() {
				$(this).css({
					background: "#f2f2f2"
				});

				$(this).css({
					"outline": "none"
				});
			}).on("touchend", function() {
				$(this).css({
					background: "#ffffff"
				});

				$(this).css({
					"outline": "none"
				});
			});
		};

		//添input检查事件
		var check = function() {
			var value_num = parseInt($btninput.val());
			//如果数值小于最大限值，加号变可操作
			if (value_num <max) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add.png");
				//如果数值大于等于最小限值，减号变可操作
			} else if (value_num >= min) {
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
			}
			if (value_num >=max) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add2.png");
				$btninput.val("");
				$btninput.val(max);
			}
			$btninput.keyup(function() {
				//限制键盘输入只能数字事件
				/**
				 * @description 改变按钮样式事件
				 */
				//keyup事件处理,防止输入框输入数字以外的字符
				$(this).val($(this).val().replace(/\D|^0/g, ''));
			}).bind("paste", function() { //CTR+V事件处理 
				$(this).val($(this).val().replace(/\D|^0/g, ''));
			}).css("ime-mode", "disabled"); //CSS设置输入法不可用

		};

		$(this).find("span:eq(0)").bind("touchstart", mulit);
		$(this).find("span:eq(1)").bind("touchstart", add);
		$(this).find("input").bind("click", check);
//		console.log($(this).html());
		return $(this);
	},
	//设置获得当前数字的方法
	curNum: function() {
		return $(this).find("input").val();
	}

});
;
(function($) {
	'use strict';
	var $win = $(window);
	var $doc = $(document);
	$.fn.AIDrag = function(options) {
		return new MyDropLoad(this, options);
	};
	var MyDropLoad = function(element, options) {
		var me = this;
		me.$element = $(element);
		me.insertDOM = false;
		me.loading = false;
		me.isLock = false;
		me.init(options);
	};

	// 初始化
	MyDropLoad.prototype.init = function(options) {
		var me = this;
		me.opts = $.extend({}, {
			scrollArea: me.$element, // 滑动区域
			domUp: { // 上方DOM
				domClass: 'dropload-up',
				domRefresh: '<div class="dropload-refresh"><span class="loading"></span>下拉刷新</div>',
				domUpdate: '<div class="dropload-update"><span class="loading"></span>释放更新</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
				domSuccess: '<div class="dropload-load"><span class="loading-success"></span>加载成功</div>',
				domError: '<div class="dropload-load"><span class="loading-error"></span>加载失败</div>'
			},
			domDown: { // 下方DOM
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh ui-refresh-up"><span class="loading"></span>上拉加载更多</div>',
				domUpdate: '<div class="dropload-update ui-refresh-down"><span class="loading"></span>释放加载</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
			},
			loadMoreText: '', //底部提示文字,如果没有则没有底部按钮
			distance: 80, // 拉动距离
			loadUpFn: '', // 上方function
			loadDownFn: '' // 下方function
		}, options);
		//添加按钮
		if (me.opts.loadMoreText != '') {
			//添加加载剩下几条按钮
			var _more = $("<div>").addClass("ui-btn-more").appendTo(me.$element);
			_more.html(me.opts.loadMoreText);
			_more.bind('click', function() {
				me.opts.loadDownFn();
			});
		}
		// 判断滚动区域
		if (me.opts.scrollArea == window) {
			me.$scrollArea = $win;
		} else {
			me.$scrollArea = me.opts.scrollArea;
		}

		// 绑定触摸
		me.$element.on('touchstart', function(e) {
			if (!me.loading && !me.isLock) {
				fnTouches(e);
				fnTouchstart(e, me);
			}
		});
		me.$element.on('touchmove', function(e) {
			if (!me.loading && !me.isLock) {
				fnTouches(e, me);
				fnTouchmove(e, me);
			}
		});
		me.$element.on('touchend', function() {
			if (!me.loading && !me.isLock) {
				fnTouchend(me);
			}
		});
	};

	// touches
	function fnTouches(e) {
		if (!e.touches) {
			e.touches = e.originalEvent.touches;
		}
	}

	// touchstart
	function fnTouchstart(e, me) {
		me._startY = e.touches[0].pageY;
		// 判断滚动区域
		if (me.opts.scrollArea == window) {
			me._meHeight = $win.height();
			me._childrenHeight = $doc.height();
		} else {
			me._meHeight = me.$element.height();
			me._childrenHeight = me.$element.children().height();
		}
		me._scrollTop = me.$scrollArea.scrollTop();
	}

	// touchmove
	function fnTouchmove(e, me) {
		me._curY = e.touches[0].pageY;
		me._moveY = me._curY - me._startY;

		if (me._moveY > 0) {
			me.direction = 'down';
		} else if (me._moveY < 0) {
			me.direction = 'up';
		}

		var _absMoveY = Math.abs(me._moveY);

		// 加载上方
		if (me.opts.loadUpFn != '' && me._scrollTop <= 0 && me.direction == 'down') {
			e.preventDefault();
			if (!me.insertDOM) {
				me.$element.prepend('<div class="' + me.opts.domUp.domClass + '"></div>');
				me.insertDOM = true;
			}

			me.$domUp = $('.' + me.opts.domUp.domClass);
			fnTransition(me.$domUp, 0);

			// 下拉
			if (_absMoveY <= me.opts.distance) {
				me._offsetY = _absMoveY;
				// 待解决：move时会不断清空、增加dom，有可能影响性能，下同
				me.$domUp.html('').append(me.opts.domUp.domRefresh);
				// 指定距离 < 下拉距离 < 指定距离*2
			} else if (_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance * 2) {
				me._offsetY = me.opts.distance + (_absMoveY - me.opts.distance) * 0.5;
				me.$domUp.html('').append(me.opts.domUp.domUpdate);
				// 下拉距离 > 指定距离*2
			} else {
				me._offsetY = me.opts.distance + me.opts.distance * 0.5 + (_absMoveY - me.opts.distance * 2) * 0.2;
			}

			me.$domUp.css({
				'height': me._offsetY
			});
		}

		// 加载下方
		if (me.opts.loadDownFn != '' && me._childrenHeight <= (me._meHeight + me._scrollTop) && me.direction == 'up') {
			e.preventDefault();
			if (!me.insertDOM) {
				me.$element.append('<div class="' + me.opts.domDown.domClass + '"></div>');
				me.insertDOM = true;
			}

			me.$domDown = $('.' + me.opts.domDown.domClass);
			fnTransition(me.$domDown, 0);

			// 上拉
			if (_absMoveY <= me.opts.distance) {
				me._offsetY = _absMoveY;
				me.$domDown.html('').append(me.opts.domDown.domRefresh);
				// 指定距离 < 上拉距离 < 指定距离*2
			} else if (_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance * 2) {
				me._offsetY = me.opts.distance + (_absMoveY - me.opts.distance) * 0.5;
				me.$domDown.html('').append(me.opts.domDown.domUpdate);
				// 上拉距离 > 指定距离*2
			} else {
				me._offsetY = me.opts.distance + me.opts.distance * 0.5 + (_absMoveY - me.opts.distance * 2) * 0.2;
			}

			me.$domDown.css({
				'height': me._offsetY
			});
			me.$scrollArea.scrollTop(me._offsetY + me._scrollTop);
		}
	}

	// touchend
	function fnTouchend(me) {
		var _absMoveY = Math.abs(me._moveY);
		if (me.insertDOM) {
			if (me.direction == 'down') {
				me.$domResult = me.$domUp;
				me.domLoad = me.opts.domUp.domLoad;
			} else if (me.direction == 'up') {
				me.$domResult = me.$domDown;
				me.domLoad = me.opts.domDown.domLoad;
			}

			fnTransition(me.$domResult, 300);

			if (_absMoveY > me.opts.distance) {
				me.$domResult.css({
					'height': me.$domResult.children().height()
				});
				me.$domResult.html('').append(me.domLoad);
				fnCallback(me);
			} else {
				me.$domResult.css({
					'height': '0'
				}).on('webkitTransitionEnd', function() {
					me.insertDOM = false;
					$(this).remove();
				});
			}
			me._moveY = 0;
		}
	}

	// 回调
	function fnCallback(me) {
		me.loading = true;
		if (me.opts.loadUpFn != '' && me.direction == 'down') {
			me.opts.loadUpFn(me);
		} else if (me.opts.loadDownFn != '' && me.direction == 'up') {
			me.opts.loadDownFn(me);
		}
	}

	/* // 锁定
    MyDropLoad.prototype.lock = function(){
        var me = this;
        me.isLock = true;
    };

    // 解锁
    MyDropLoad.prototype.unlock = function(){
        var me = this;
        me.isLock = false;
    };
*/
	//加载成功
	MyDropLoad.prototype.loadsuccess = function() {
		var obj = this;
		if (!!obj.$domResult) {
			obj.$domResult = obj.$domUp;
			obj.$domResult.css({
				'height': '50'
			})
		}
		fnTransition(obj.$domResult, 300); //css过渡
		obj.$domResult.html('').append(obj.opts.domUp.domSuccess); //添加元素到界面
	};
	//加载失败
	MyDropLoad.prototype.loaderror = function() {
		var obj = this;
		if (!!obj.$domResult) {
			obj.$domResult = obj.$domUp;
			obj.$domResult.css({
				'height': '50'
			})
		}
		fnTransition(obj.$domResult, 300); //css过渡
		obj.$domResult.html('').append(obj.opts.domUp.domError); //添加元素到界面
	};
	// 重置
	MyDropLoad.prototype.resetload = function() {
		var me = this;
		if (!!me.$domResult) {
			me.$domResult.css({
				'height': '0'
			}).on('webkitTransitionEnd', function() {
				me.loading = false;
				me.insertDOM = false;
				$(this).remove();
			});
		}
	};

	// css过渡
	function fnTransition(dom, num) {
		dom.css({
			'-webkit-transition': 'all ' + num + 'ms',
			'transition': 'all ' + num + 'ms'
		});
	}
})(jQuery);
/**
 * @file  Drag刷新插件（下拉刷新，上拉加载更多）
 * @author 康兵奎
 * @time 2015-8-11
 * @version 1.0
 */
;(function($) {
	var _private = {};
	_private.cache = {};
	$.tpl = function (str, data, env) {
		// 判断str参数，如str为script标签的id，则取该标签的innerHTML，再递归调用自身
		// 如str为HTML文本，则分析文本并构造渲染函数
		var fn = !/[^\w\-\.:]/.test(str)
			? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML)
			: function (data, env) {
			var i, variable = [], value = []; // variable数组存放变量名，对应data结构的成员变量；value数组存放各变量的值
			for (i in data) {
				variable.push(i);
				value.push(data[i]);
			}
			return (new Function(variable, fn.code))
				.apply(env || data, value); // 此处的new Function是由下面fn.code产生的渲染函数；执行后即返回渲染结果HTML
		};

		fn.code = fn.code || "var $parts=[]; $parts.push('"
			+ str
			.replace(/\\/g, '\\\\') // 处理模板中的\转义
			.replace(/[\r\t\n]/g, " ") // 去掉换行符和tab符，将模板合并为一行
			.split("<%").join("\t") // 将模板左标签<%替换为tab，起到分割作用
			.replace(/(^|%>)[^\t]*/g, function(str) { return str.replace(/'/g, "\\'"); }) // 将模板中文本部分的单引号替换为\'
			.replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
			.split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
			.split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
			+ "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

		return data ? fn(data, env) : fn; // 如果传入了数据，则直接返回渲染结果HTML文本，否则返回一个渲染函数
	};
	$.adaptObject =  function (element, defaults, option,template,plugin,pluginName) {
    var $this= element;

    if (typeof option != 'string'){
    
    // 获得配置信息
    var context=$.extend({}, defaults,  typeof option == 'object' && option);

    var isFromTpl=false;
    // 如果传入script标签的选择器
    if($.isArray($this) && $this.length && $($this)[0].nodeName.toLowerCase()=="script"){
      // 根据模板获得对象并插入到body中
      $this=$($.tpl($this[0].innerHTML,context)).appendTo("body");
      isFromTpl=true;
    }
    // 如果传入模板字符串
    else if($.isArray($this) && $this.length && $this.selector== ""){
      // 根据模板获得对象并插入到body中
      $this=$($.tpl($this[0].outerHTML,context)).appendTo("body");
      isFromTpl=true;
    }
    // 如果通过$.dialog()的方式调用
    else if(!$.isArray($this)){
      // 根据模板获得对象并插入到body中
      $this=$($.tpl(template,context)).appendTo("body");
      isFromTpl=true;
    }

    }

    return $this.each(function () {

      var el = $(this);
      // 读取对象缓存
  
      var data  = el.data('fz.'+pluginName);
      


      if (!data) el.data('fz.'+pluginName, 
        (data = new plugin(this,$.extend({}, defaults,  typeof option == 'object' && option),isFromTpl)

      ));

      if (typeof option == 'string') data[option]();
    })
  }
})(jQuery)
;$.fn.extend({
	//初始化块级按钮的组件方法
	blockBtn: function(param) {
		$(this).attr("name", $(this).attr("id") + new Date());
		$(this).addClass("ui-block-btn");
		//手触事件改变按钮的样式状态
		$(this).on("touchstart", function() {
			$(this).css({
				background: "#268BC4"
			});
			$(this).css({
				"color": "#bde2f"
			});
			$(this).css({
				"outline": "none"
			});

		}).on("touchend", function() {
			$(this).css({
				background: "#44abe5"
			});
			$(this).css({
				"color": "#ffffff"
			});
			$(this).css({
				"outline": "none"
			});
		});
	
		$(this).click(function() {
			param.clickBtnfunc();
		});
	}
});
$.fn.extend({
	//初始化移动开关组件方法
	switchBtn: function(param) {
		$(this).attr("name", $(this).attr("id") + new Date());
		$(this).addClass("ui-swicth-checkbox");
		//点击获得开关状态，获取相应的方法
		$(this).click(function() {
			if ($(this).prop("checked")) {
               //如果开关为选中状态，则调用selectfunc()
				if (param.selectfunc) {
					param.selectfunc();
				}
			} else {
               //如果开关为未选状态，则调用selectfunc()
				if (param.unselectfunc) {
					param.unselectfunc();
				}
			}
		});
		$(this).after('<label for="' + $(this).attr("id") + '"></label>');

	},
	//获得开关状态的方法：开：on、关：off(均为小写字符)
	curStatus: function() {
		//alert($(this).prop("checked"))
		if ($(this).is(':checked')) {
			return 'on';
		} else {
			return 'off';
		}
	}
});
$.fn.extend({
	//初始化计数器按钮组件方法
	counterBtn: function(param) {
		var maxNum = 10;
		var minNum = 0;
		//参数maxNum:设置计数器最大值限制
		//参数minNum:设置计数器最默认值
		if (param.maxNum) {
			maxNum = param.maxNum;
		}
		if (param.minNum) {
			minNum = param.minNum;
		}
		//设置的默认值如果大于最大值会判断然后互换值
		if (param.minNum > param.maxNum) {
			var k;
			k = param.minNum;
			param.minNum = param.maxNum;
			param.maxNum = k;
			maxNum = param.maxNum;
			minNum = param.minNum;
			//alert("最小值大于最大值了")
		}
		$(this).attr("name", $(this).attr("id") + new Date());
		$(this).addClass("ui-btn-group");
		$(this).append('<span class="ui-btn-reduce"><img class="ui-btn-imgreduce"src="img/reduce1.png" ></span>')
		$(this).append('<input type="tel" class="ui-btn-group-input" value="' + minNum + '" min="1" onblur="if(this.value < 1){this.value = 1;}"  />')
		$(this).append('<span id="js-add" class="ui-btn-add"><img class="ui-btn-imgadd" src="img/add.png" ></span>')

		var $spanreduce = $(this).find("span:eq(0)");
		var $spanadd = $(this).find("span:eq(1)");
		var $btninput = $(this).find("input");
		var max = maxNum;
		var min = minNum;

		//添加减号事件
		var mulit = function() {

			$spanreduce.on("touchstart", function() {
				$(this).css({
					background: "#f2f2f2"
				});
				$(this).css({
					"outline": "none"
				});
			}).on("touchend", function() {
				$(this).css({
					background: "#ffffff"
				});

				$(this).css({
					"outline": "none"
				});
			});
			//减法逻辑
			var value = parseInt($btninput.val());
			if (value <= max + 1) {
              
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add.png");
			}
			if (value > min) {
				$btninput.val(value - 1);
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
			}
			if (value <= min + 1) {
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce1.png");

			} else if (value > max) {
				$btninput.val("");
				$btninput.val(max);
			}
		};
		//添加加号事件
		var add = function() {
			var v = $btninput.val();
			var in_value = parseInt(v);
            //加法逻辑，如果值大于等于(max-1),这改变加号的状态样式为不可点击
			if (in_value >= max - 1) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add2.png");
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
				$btninput.val("");
				$btninput.val(max);

				return false
			} else if (in_value <= max) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add.png");

			}
             //每操作一次就加1，并且减号状态更改为可点击
			$btninput.val(parseInt($btninput.val()) + 1);
			$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
			$spanadd.on("touchstart", function() {
				$(this).css({
					background: "#f2f2f2"
				});

				$(this).css({
					"outline": "none"
				});
			}).on("touchend", function() {
				$(this).css({
					background: "#ffffff"
				});

				$(this).css({
					"outline": "none"
				});
			});
		};

		//添input检查事件
		var check = function() {
			var value_num = parseInt($btninput.val());
			//如果数值小于最大限值，加号变可操作
			if (value_num < max) {
				$spanadd.find(".ui-btn-imgadd").attr("src", "img/add.png");
             //如果数值大于等于最小限值，减号变可操作
			} else if (value_num >= min) {
				$spanreduce.find(".ui-btn-imgreduce").attr("src", "img/reduce2.png");
			}
			if (value_num > max) {
				$btninput.val("");
				$btninput.val(max);
			}
			$btninput.keyup(function() {
				//keyup事件处理,防止输入框输入数字以外的字符 
				$(this).val($(this).val().replace(/\D|^0/g, ''));
			}).bind("paste", function() { //CTR+V事件处理 
				$(this).val($(this).val().replace(/\D|^0/g, ''));
			}).css("ime-mode", "disabled"); //CSS设置输入法不可用

		};

		$(this).find("span:eq(0)").bind("click", mulit);
		$(this).find("span:eq(1)").bind("click", add);
		$(this).find("input").bind("click", check);
		console.log($(this).html());
		return $(this);
	},
	//设置获得当前数字的方法
	curNum: function() {
		return $(this).find("input").val();
	}

});
/**
 * Grid表单插件
 *
 * @fileOverview
 * @author liuliang
 * @time 2015-8-11
 * @version 1.0
 */
;(function($) {
	/**
	 * Grid表单插件插件
	 *
	 * @constructor AIGrid
	 * @desc 能够实现数据展示和按列排序
	 * @memberOf jQuery
	 * @name grid
	 * @param {Object} option 参数对象
	 *
	 * @param {Array} params.heads - 表头内容，包括name名称，text显示名称，stype排序类型（默认为string）
	 * @param {String} params.loadFunc - 加载数据的方法
	 * @param {String} params.theme - 插件主题
	 * @param {String} params.action - 点击行时触发的函数
	 * @return {Object} 返回grid对象的一个实例
	 *
	 * @example
     *	var opts = {
     *            'heads':[
     *	            {
     *	            	'text':'号码',
     *	            	'name':'haoma'
     *	            },
     *	            {
     *	            	'text':'保底',
     *	            	'name':'baodi'
     *	            },
     *	            {
     *	            	'text':'预存',
     *	            	'name':'yucun'
     *	            },
     *	            {
     *	            	'text':'周期',
     *	            	'name':'cycle',
     *	            	"stype":'int'
     *	            }
     *			],
     *		    'loadFunc':loadPage,//方法要有1个页码的入参
     *		    "theme":'normal',
     *		    "action":function(){
     *		    	alert()
     *		    }
     *        };
     *	var myGrid = new $("#demo-grid").grid(opts);
	 *
	 */
	//绑定到jquery上
	$.fn.AIGrid = function(options) {
		return new AIGrid(this, options);
	}
	var IDs = 1;
	/** 
	 * @description 表单组件
	 * @param {Object} element - 当前绑定的元素
	 * @todo 定义一些变量，初始化插件。
	 * @constructor 表明这个方法是个构造。
	 */
	var AIGrid = function(element, options) {
			var _ = this;
			_.el = $(element);
			//		_.insertDOM = false;
			//		_.loading = false;
			options.sel = _.el;
			_.cloneMarkup=''
			_.init(options);
		}
	/**
	 * grid 名字空间
	 * @namespace
	 * @memberOf jQuery
	 * @name grid
	 */
	AIGrid.prototype = {
		/**
		 * @lends jQuery.grid
		 */
		/** 
		 * @description 当前页码
		 * @todo 定义、绑定参数，并给当前元素绑定事件。
		 * @example
	     *	myGrid.curPage;
		 *
		 * 
		 */
		curPage:1,
		tableGridID:'',
		/**
		 * 初始化，拼装数据和模版加载到容器
		 * 
		 * @param {Object} option 参数对象
		 */
		init: function(params) {
			CreateTable(params)
		},
		/** 
		 * @description 获取、修改grid数据
		 * @param {String} params.rowIdx - 表单行号
		 * @param {String} params.colName - 表单列名
		 * @param {String} params.value - 设置值
		 * @todo 获取表单行时，不需传入params.colName 和params.value
		 * @todo 获取表单列时，不需传入params.value
		 * @example
	     *	myGrid.gridData({
	     * 		rowIdx:1,
	     * 		colName:2
	     * 		});
 	     *	myGrid.gridData({
	     * 		rowIdx:1,
	     * 		colName:2,
	     * 		value:"6666"
	     * 		});
		 */
		gridData: function(params) {
			var def = {
				'rowIdx': 1,
				'colName': undefined,
				'value': undefined
			};
			var opts = $.extend(def, params);
			if (opts.colName) {
				if (opts.value) {
					$("#"+this.tableGridID+" .ui-grid-table-tbody   tr > td[name='" + opts.colName + "']").eq(opts.rowIdx).text(opts.value);
				} else {
					return $("#"+this.tableGridID+" .ui-grid-table-tbody   tr > td[name='" + opts.colName + "']").eq(opts.rowIdx);
				}
			} else {
				return $("#"+this.tableGridID+" .ui-grid-table-tbody   tr").eq(opts.rowIdx);
			}

		}
	}

	CreateTable = function(options) {
		//code here
		var tableID = 'gridTable'+IDs++;
		AIGrid.prototype.tableGridID = tableID;
//		var curPage = 1;
		var defaults = {
			'heads': [],
			'loadFunc': (function() {})
		};
		var settings = $.extend(defaults, options);
		var markup, thMarkup = '',
			tdMarkup = '';

		$.each(settings.heads, function(colsIdx, aCol) {
			thMarkup += '<th class="ui-grid-table-thead-tr-th fn-text-nowrap"'+(aCol.stype?' stype="'+aCol.stype+'"':'')+'>' + aCol.text + '</th>';
			tdMarkup += '<td name="' + aCol.name + '" class="ui-grid-table-tbody-tr-td"></td>';
		});
		this.cloneMarkup = '			    <tr id="cloneTr" class="ui-grid-table-tbody-tr">                               ' 
			+ tdMarkup +'			     </tr>                                          ';
		markup = [
			'<table id="' + tableID + '" class="ui-grid-table">  ',
			'			<thead class="ui-grid-table-thead">                                             ',
			'				<tr  class="ui-grid-table-thead-tr">                                            ',
			thMarkup,
			'				</tr>                                           ',
			'			</thead>                                            ',
			'			<tbody class="ui-grid-table-tbody">                                             ',
			this.cloneMarkup,
			'			 </tbody>                                           ',
			'</table>  		                                                '
		].join('');
		$(markup).appendTo(options.sel);
		GenerateTable(settings.loadFunc(AIGrid.prototype.curPage));
		var drag = options.sel.drag({
			loadUpFn: function(e) {
				//				$("#demo-grid").CreateTable();
				// 为了测试，延迟1秒加载
				setTimeout(function() {
					$(".ui-grid-table-tbody-tr").remove();
					AIGrid.prototype.curPage = 1;
					$(this.cloneMarkup).appendTo(options.sel.find('tbody'));
					GenerateTable(settings.loadFunc(AIGrid.prototype.curPage));
					e.resetload();
				}, 1000);
			},
			loadDownFn: function(e) {
				// 为了测试，延迟1秒加载
				setTimeout(function() {
					$(this.cloneMarkup).appendTo(options.sel.find('tbody'));
					GenerateTable(settings.loadFunc(++AIGrid.prototype.curPage));
					e.resetload();
				}, 1000);
			}
		});
		$("#cloneTr").remove();
		if (typeof(settings.action)=="function") {
			$("#"+AIGrid.prototype.tableGridID+" .ui-grid-table-tbody   tr").on("click", settings.action);
		}
		gridSort(tableID + '');
	};
	GenerateTable = function(options) {
		//code here
		var defaults = {
			"field": []
		};
		var settings = $.extend(defaults, options);
		var tdMarkup = '';
		var tr = $("#cloneTr");
		$.each(settings.field, function(rowIdx, rowData) {
			var clonedTr = tr.clone();
			clonedTr.attr('id', "generatedTr");
			clonedTr.children("td").each(function(colIdx) {
				$(this).html(rowData[$(this).attr('name')]);
			});
			clonedTr.insertAfter(tr);
		});
		$("#cloneTr").remove();
	};

	var w = $(window);
	var GridSort = function(GID) {
		this.AIGrid = document.getElementById(GID);
		this.Gbody = this.AIGrid.tBodies[0];
		this.Ghead = this.AIGrid.tHead;
	}

	GridSort._StringByConvert = function(cell, valType) {
		var val = '';
		if (cell.firstChild) {
			val = cell.firstChild.nodeValue;
		}
		if (!valType) return val.toString();
		switch (valType.toLowerCase()) {
			case 'int':
				return parseInt(val);
			case 'float':
				return parseFloat(val);
			case 'date':
				return new Date(Date.parse(val));
			default:
				return val.toString();
		}
	}

	GridSort.prototype._Sequence = function(colIdx, colType) {
		//这里相信JS的高手们一下就可以看出来这是一个匿名方法体
		//这个方法体在这里不会执行，它会return到调用_Sequence()的函数上去执行
		//在这里这个匿名方法体是属于Array的Sort（）函数的参数
		//细心的童鞋可能主要到了arguments
		//我们将这两个参数看做为A跟B，接下来我们来看看这两个参数是如何比较的
		//译：
		//若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
		//若 a 等于 b，则返回 0。
		//若 a 大于 b，则返回一个大于 0 的值。
		return (function() {
			var _rowPrevVal = GridSort._StringByConvert(arguments[0].cells[colIdx], colType), //这个相当于A参数
				_rowAfterVal = GridSort._StringByConvert(arguments[1].cells[colIdx], colType); //这个相当于B参数
			console.log(_rowPrevVal);
			console.log(_rowAfterVal);
			if (_rowPrevVal < _rowAfterVal)
				return -1;
			else if (_rowPrevVal > _rowAfterVal)
				return 1;
			else
				return 0;
		});
	}

	GridSort.prototype.BindClickHeadSort = function() {
		var _rowsHead = this.Ghead.rows[0].cells,
			_gbody = this.Gbody,
			_gridRows = _gbody.rows,
			_girdSort = this._Sequence;

		//为每个Grid列头绑定一个Click的点击事件，这样比直接在dom上添加onclick更简洁
		for (var i = 0, count = _rowsHead.length; i < count; i++) {

			//注意这里，这里为了避免闭包的影响使用了匿名函数
			(function(idx) {
				_rowsHead[idx].onclick = function() {
					var _sortRows = [],
						_sortType = this.getAttribute('stype'),
						_orderby = _gbody.getAttribute('orderby');

					//首先将Grid中的Row Copy到一个空数组中，以便之后排序
					for (var i = 0, count = _gridRows.length; i < count; i++) {
						_sortRows[i] = _gridRows[i];
					}

					//这里的_orderby是我们自己设置的属性，为了区分是降序还是升序
					if (!_orderby) {
						//开始执行Array的Sort()函数，可能很多童鞋都还米有看见过Sort()函数中加参数的用法
						//不了解Sort()函数参数的童鞋，请马上跳到_Sequence()函数那里继续看吧，那里我会解释
						_sortRows.sort(_girdSort(idx, _sortType));
						_gbody.setAttribute('orderby', 'asc');
					} else {
						_sortRows.reverse();
						_gbody.removeAttribute('orderby');
					}

					//这里创建文档碎片，然后通过上面已排好序的Rows从新添加到文档碎片中
					//使用文档碎片的好处是，避免了浏览器的绘制过程，加快了页面响应速度
					var _newRows = document.createDocumentFragment();
					for (var j = 0, count2 = _sortRows.length; j < count2; j++) {
						_newRows.appendChild(_sortRows[j]);
					}

					//最后一次性的加载到了Grid的内部
					_gbody.appendChild(_newRows);
				}
			})(i);
		}
	}

	gridSort = (function(gid) {
		new GridSort(gid).BindClickHeadSort();
	});
})(jQuery);
;

function bindInputEvent(clear, look, textarea) {
	/**
	 * @constructor input
	 * @desc 输入框组件绑定js事件
	 * @name input
	 *
	 */
	var _clear = clear || false;
	var _look = look || false;
	var _textarea = textarea || false;
	/**
	 * 清除按钮绑定清除事件
	 */
	$(".ui-input").each(function() {
		var _ = $(this);
		_.bind("touchstart", function() {
			var _val = $(this).val();
			_.val('').val(_val);
			_.next(".js-ui-clear").removeClass("fn-hide");
		});
		_.bind("focus", function() {
			var _val = $(this).val();
			_.val('').val(_val);
			_.next(".js-ui-clear").removeClass("fn-hide");
		});
		_.bind("blur", function() {
			setTimeout(function() {
				_.next(".js-ui-clear").addClass("fn-hide");
			}, 100);
		});
	});
	if (_clear) {
		$(".js-ui-clear").each(function() {
			$(this).bind("touchstart", function() {
				$(this).prev().val("").focus();
			});
		});
	}
	//查看密码，单击查看文本，再次单击显示密文
	/**
	 * 密码输入框绑定显示，隐藏按钮
	 */
	if (_look) {
		var obj = null;
		$(".js-ui-look").bind("touchstart", function() {
			obj = $(this).parent().find("input");
			/*if (_.attr("type") == "text") {
				_.attr("type", "password");
				$(this).css("background", "url(img/look.png) no-repeat center");
				$(this).parent().find("ui-input").focus();
			} else {
				_.attr("type", "text");
				$(this).css("background", "url(img/look-on.png) no-repeat center");
				$(this).parent().find("ui-input").focus();
			}*/
		});
		$(".js-ui-look").bind("touchend", function() {
			/*var _ = $(this).parent().find("input");*/
			if (obj.attr("type") == "text") {
				obj.attr("type", "password");
				$(this).css("background", "url(img/look.png) no-repeat center");
				$(this).css("background-size", "contain");
				obj.focus();
			} else {
				obj.attr("type", "text");
				$(this).css("background", "url(img/look-on.png) no-repeat center");
				$(this).css("background-size", "contain");
				obj.focus();
			}
		});
	}
	//给文本域绑定输入变化事件，并实时更新还可输入字符数量
	/**
	 * 给文本域绑定输入变化事件，并实时更新还可输入字符数量
	 */
	if (_textarea) {
		$(".ui-textarea").bind('input propertychange', function() {
			var len = parseInt($(this).val().length);
			var maxlen = parseInt($(this).attr("maxlength"));
			var mulit = maxlen - len;
			if (len < maxlen || len == maxlen) {
				$(this).next(".ui-textarea-tip").find("span").html(maxlen - len);
			} else {
				$(this).next(".ui-textarea-tip").find("span").html(0);
			}
			if (mulit > 10) {
				$(this).next(".ui-textarea-tip").hide();
			} else {
				$(this).next(".ui-textarea-tip").show();
			}
		});
	}
	/**
	 * 自适应高度增加行数
	 * @param {Object} element 当前元素
	 * @param {Object} minHeight 最低高度
	 */
	$(".js-textarea").each(function(){
		var el = this;
		// 如果文本域有边距，我们需要设置box-sizing: border-box
		el.style.boxSizing = el.style.mozBoxSizing = 'border-box';
		// 我们不需要滚动条，不是么？ :)
		el.style.overflowY = 'hidden';
		// 通过"rows"属性初始化的最小高度
		var minHeight = el.scrollHeight;
		el.addEventListener('input', function() {
			autoHeight(el, minHeight);
		});
		// 当窗口大小改变时，我们需要重新调整高度（例如方向变化）
		window.addEventListener('resize', function() {
			autoHeight(el, minHeight);
		});
		
	});
	function autoHeight(el, minHeight) {
		// 计算因边框和轮廓产生的高度差异
		var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
		var diff = outerHeight - el.clientHeight;
		// 设置高度为0以防需要收缩（高度）
		el.style.height = 0;
		// 设置正确的高度
		el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
	}
}
/** 
 * 一款列表导航插件，提供默认列表，图标列表，图片列表的三种形式
 * 
 * @fileOverview 
 * @version 1.0
 * @author  qijc
 * @description 
 * 
 */
;(function($) {

	/**
	 * 列表导航插件
	 *
	 * @constructor AIList
	 * @desc 提供默认列表，图标列表，图片列表的三种形式
	 * @memberOf jQuery
	 * @name AIList
	 * @param {Object} option 参数对象
	 * 
	 * @property {Number} type [1:文字|2:图标|3:图片] 列表类型
	 * @property {Object} data 数据源
	 * @property {Boolean} isInit 是否初始化
	 * @return {Object} 返回AIList对象的一个实例
	 * 
	 * @example
	 * var list = $('#demo').AIList({
	 *     type:0,
	 *     data:jsonList,
	 *     isInit:true
	 * });
	 *
	 * //删除
	 * list.removeRow(0);
	 * 
	 */
	$.fn.AIList = function(option) {
		return new AIList(this, option);
	}

	//默认模版
	var _listTpl='<ul class="ui-list">'+
		'<% for (var i = 0; i < lists.length; i++) { %>' +
		'<% var post = lists[i]; %>' +
		'<% if (post.type == "list" || post.type == "1") { %>' +
		'<li class="ui-list-item">'+
		'	<a class="icon-navigate-right" href="<%=post.link%>" data-id="<%=post.id%>"><%=post.title%></a>'+
		'</li>'+
		'<% } else if(post.type == "iconList" || post.type == "2"){ %>' +
		'<li class="ui-list-item ui-media">'+
		'    <a class="icon-navigate-right" href="<%=post.link%>" data-id="<%=post.id%>">'+
		'        <span class="ui-media-object fn-left ui-icon <%=post.icon%>"></span>'+
		'        <div class="ui-media-body"><%=post.title%></div>'+
		'    </a>'+
		'</li>' +
		'<% } else if(post.type == "mediaList" || post.type == "3"){ %>' +
		'<li class="ui-list-item ui-media">'+
		'    <a class="icon-navigate-right" href="<%=post.link%>" data-id="<%=post.id%>">'+
		'        <img class="ui-media-object fn-left" src="<%=post.pic%>">                '+
		'        <div class="ui-media-body">'+
		'            <h4><%=post.title%></h4>'+
		'            <p><%=post.desc%></p>'+
		'        </div>'+
		'    </a>'+
		'</li>' +
		'<% } %>' +
		'<% } %>' +
		'</ul>';


	//默认
	var defaults={
		data:'',
		isFromTpl:'',
		isInit:false
	}

	//构造方法
	var AIList = function (el,option) {
		var self=this;
		this.element=$(el);
		this.option=$.extend(defaults,option);
		if(this.option.isInit){
			this.init();
		}
		
	}
	/**
     * AIList 名字空间
     * @namespace 
     * @memberOf jQuery
	 * @name AIList
     */
	AIList.prototype=
	/**
     * @lends jQuery.AIList
     */ 
	{

		/**
         * 初始化，拼装数据和模版加载到容器
         */
		init:function(){
			var opt = this.option;
			var tpl = opt.isFromTpl != "" ? opt.isFromTpl : _listTpl;
			//this.element.html($.tpl(tpl,opt.data));
			
			Rose.ajax.loadTemp(this.element, tpl, opt.data);
		},
		/**
         * 添加一条数据
         * 
         * @param {Object} data 数据
         */
		addRow:function(data){
			this.option.data.lists.push(data);
			this.init();	
		},
		/**
         * 删除某条数据
         * 
         * @param {Number} index 删除行的索引值
         */
		removeRow:function(index){
			this.option.data.lists.splice(index,1);
			this.init();	
		},
		/**
         * 获取某行数据
         * 
         * @param {Number} index 获取行的索引值
         * @return {Object} JSON数据
         */
		getDataRow:function(index){
			alert(JSON.stringify(this.option.data.lists[index]));		
			return this.option.data.lists[index];		
		}
	}
	
})(jQuery);

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
;(function(){
	/** 
	* @constructor picker
	 * @desc 联动选择基础组件
	 * @description 联动选择基础组件的构造方法
	 * @name picker
	 * @property {Array} fields - 联动列数组，数组内为一个列对象，包含列的id及列的content,其中列的content可以是一个静态数组，也可以是一个返回动态数组的function
	 * @property {Object} current - 联动列没列的当前选中值，是一个对象，对象内部属性key为每列的id，value为每列选中的值
	 * @property {Array} buttons - 头部区域放置的按钮，是一个数组，数组内为一个对象，包含按钮的text及点击按钮触发的action
	 * @property {Object} options.rowNum - 联动的行数
	 * @property {Object} options.headHeight - 头部区域的高度
	 * @property {Object} options.rowHeight - 内容区域里每行的高度
	 * @property {Object} options.fontSize - 字体的大小
	 */ 
	var aiPicker=function(param){
		if(!param.fields) return;
		var agent = navigator.userAgent, version = navigator.appVersion;
		
		var setting={
			rowNum:5,
			headHeight:45,
			rowHeight:45,
			fontSize:18
		};
		setting=$.extend(setting, param.options);
		if(setting.rowNum%2==0){
			setting.rowNum=setting.rowNum-1;
		}
		setting.contentHeight=setting.rowHeight*setting.rowNum;
		setting.pickerHeight=setting.headHeight+setting.contentHeight;
		this.setting=setting;
		
		param['firstLoad']='1';
		
		//生成时间选择器页面内容
		this.genPickerCell=function(item,cellList){
			item.find(".ui-picker-cell").remove();
			var blankRowNum=Math.floor(this.setting.rowNum/2);
			for(var i=1;i<=blankRowNum;i++){
				item.append('<div class="ui-picker-cell" style="height:'+this.setting.rowHeight+'px;line-height:'+this.setting.rowHeight+'px;"></div>');
			}
			for(var j=0;j<cellList.length;j++){
				item.append('<div class="ui-picker-cell" style="height:'+this.setting.rowHeight+'px;line-height:'+this.setting.rowHeight+'px;" data-value="'+cellList[j]['value']+'" data-index="'+(j+1)+'">'+cellList[j]['text']+'</div>');
			}
			for(var i=1;i<=blankRowNum;i++){
				item.append('<div class="ui-picker-cell" style="height:'+this.setting.rowHeight+'px;line-height:'+this.setting.rowHeight+'px;"></div>');
			}
		};
		
		this.topValue=[];
		this.interval=[];
			
		/** 
		 * 滚动
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.scrollFunc=function(boxInner,scrollTop){
			var pickerObj=this;
			if(scrollTop&&scrollTop==boxInner.scrollTop){
				return;
			}
			//var boxInner=this;
			var index=$(boxInner).index();
			var itemHeight=pickerObj.setting.rowHeight;

			if(pickerObj.interval[index]==null){
				pickerObj.interval[index]=setInterval(function(){
					if(boxInner.scrollTop==pickerObj.topValue[index]){
						clearInterval(pickerObj.interval[index]);
						pickerObj.interval[index]=null;

						var remainder = boxInner.scrollTop % itemHeight;
						var tmpScrollTop=boxInner.scrollTop;
						if(remainder>itemHeight/2){
							//boxInner.scrollTop+=(itemHeight-remainder);
							
							tmpScrollTop+=(itemHeight-remainder);
						}else{
							//boxInner.scrollTop-=remainder;
							
							tmpScrollTop-=remainder;
						}
						var cellIndex=parseInt(tmpScrollTop / itemHeight + 1);
						pickerObj.setSelectedIndex($(boxInner),cellIndex);
					
					}
				},30);
			}
			pickerObj.topValue[index]=boxInner.scrollTop;
		}
		
		
		/** 
		 * 滚动事件
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.scroll = function(boxInner,y1, y2, stepIndex, stepNum, stepSize, callback) {
			var pickerObj=this;
			var itemHeight=pickerObj.setting.rowHeight;
			var val = stepIndex * stepSize;
			boxInner.scrollTop = y1 + val;
		
			if (stepIndex < stepNum) {
				stepIndex++;
				setTimeout(function() {
					pickerObj.scroll(boxInner,y1, y2, stepIndex, stepNum, stepSize);
				}, 10);
			} else {
				boxInner.scrollTop = y2;
				if (callback) callback();
				//重新绑定滚动事件
				$(boxInner).bind("scroll",function(){
					pickerObj.scrollFunc(this,y2);
				});
			}
		};	
		
		/** 
		 * 滚动事件
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.scrollTop=function(boxInner,y1, y2, dur, callback){
			var pickerObj=this;
			var stepNum = dur / 10;
			var stepSize = (y2 - y1) / stepNum;
			setTimeout(function() {
				pickerObj.scroll(boxInner,y1, y2, 0, stepNum, stepSize, callback);
			}, 10);
		};
			
		/** 
		 * 设置选择项
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.setSelectedIndex=function($obj,cellIndex){
			
			var pickerObj=this;
			//解绑滚动事件，防止滚动事件的重复发生，等滚动完成后，继续绑定滚动事件
			$obj.unbind("scroll");
			cellIndex = parseInt(cellIndex);
			var boxInner = $obj[0];
			var itemHeight=pickerObj.setting.rowHeight;
			pickerObj.scrollTop(boxInner,boxInner.scrollTop, itemHeight * (cellIndex-1), 100);
			$obj.find(".ui-picker-cell[data-index='"+cellIndex+"']").addClass("ui-picker-cell-current").siblings().removeClass("ui-picker-cell-current");
			$obj.find(".ui-picker-cell[data-index='"+cellIndex+"']").siblings().css("font-size",this.setting.fontSize+"px");
			$obj.find(".ui-picker-cell[data-index='"+cellIndex+"']").css("font-size",(this.setting.fontSize+4)+"px");
			//重新生成后面所有需要动态计算的列
			if($obj.index()<$obj.siblings().length){
				//不是最后一个
				var endIndex=$obj.index()+1;
				if(param['firstLoad']=='0'){
					//不是第一次加载，是加载完成后上一列的变化触发的加载
					endIndex=$obj.siblings().length;
				}
				for(var i=$obj.index()+1;i<=endIndex;i++){
					if(typeof(param.fields[i].content)=='function'){
						var item=$("#"+componentId).find(".ui-picker-item:eq("+i+")");
						var datas={};
						$("#"+componentId).find(".ui-picker-item").each(function(){
							var itemId=$(this).attr("pickerid");
							var itemValue=$(this).find(".ui-picker-cell-current").data("value");
							datas[itemId]=itemValue;
						});
						var datas=param.fields[i].content(datas);
						var originCellIndex=1;
						if(param['firstLoad']=='0'&&!param.fields[i]['reload']){
							var currentCell=item.find(".ui-picker-cell-current");
							if(currentCell.length!=0){
								originCellIndex=currentCell.data("index");
							}
							if(datas.length<originCellIndex){
								originCellIndex=datas.length;
							}
						}
						pickerObj.genPickerCell(item,datas);
						var index=1;
						if(param['firstLoad']=='0'){
							if(param.fields[i]['reload']){
								pickerObj.setSelectedIndex(item,index);
							}else{
								pickerObj.setSelectedIndex(item,originCellIndex);
							}
						}else{
							if(param.current&&param.current[item.attr("pickerid")]){
								index=item.find(".ui-picker-cell[data-value='"+param.current[item.attr("pickerid")]+"']").data("index");
							}
							pickerObj.setSelectedIndex(item,index);	
						}
					}
				}
			}
			
		}
		
		/** 
		 * 获取选择项的索引
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.getSelectedIndex = function($obj) {
			return $obj.find(".ui-picker-cell-current").data("index");
		};
		
		/** 
		 * 初始化事件
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.initEvent=function(){
			var pickerObj=this;
			
			$("#"+this.id).find(".ui-picker-item").each(function(){
				pickerObj.topValue.push(0);
				pickerObj.interval.push(null);
			});
			
			
			$("#"+this.id).find(".ui-picker-item .ui-picker-cell").on('click',function(event) {
				var index=$(this).data("index");
				pickerObj.setSelectedIndex($(this).parent(),index);
			});
		};
		
		var componentId="picker"+new Date().valueOf();
		this.id=componentId;
		$('<div class="ui-picker" id="'+componentId+'"><div class="ui-picker-header" style="height:'+this.setting.headHeight+'px"></div><div class="ui-picker-content" style="height:'+this.setting.contentHeight+'px"></div></div>').appendTo("body");
		if(param.buttons){
			for(var i=0;i<param.buttons.length;i++){
				$("#"+componentId).find(".ui-picker-header").append("<div class='ui-picker-button' style='line-height:"+this.setting.headHeight+"px'>"+param.buttons[i]['text']+"</div>");
				var pickerObj=this;
				$("#"+componentId).find(".ui-picker-button").click(function(){
					if(param.buttons[$(this).index()]['action']){
						var datas={};
						$("#"+componentId).find(".ui-picker-item").each(function(){
							var itemId=$(this).attr("pickerid");
							var itemValue=$(this).find(".ui-picker-cell-current").data("value");
							var itemText=$(this).find(".ui-picker-cell-current").text();
							datas[itemId]={'text':itemText,'value':itemValue};
						});
						param.buttons[$(this).index()]['action'](datas);
					}
					$("#"+componentId).css("-webkit-transform","translateY("+pickerObj.setting.pickerHeight+"px)");
					$(".ui-picker-shadow").remove();
				});
			}
		}
		
		for(var i=0;i<param.fields.length;i++){
			$('<div pickerid="'+param.fields[i]["id"]+'" class="ui-picker-item" style="height:'+this.setting.contentHeight+'px"></div>').appendTo($("#"+componentId).find(".ui-picker-content"));
			//生成第一列及其他静态列的内容，动态列根据前一列的setSelectedIndex事件中的内部方法来重新生成
			if(param.fields[i].content instanceof Array &&i!=0){
				var item=$("#"+componentId).find(".ui-picker-item:last");
				this.genPickerCell(item,param.fields[i].content);
			}
		}
		var item=$("#"+componentId).find(".ui-picker-item:first");
		if(param.fields[0].content instanceof Array){
			this.genPickerCell(item,param.fields[0].content);
		}else{
			this.genPickerCell(item,param.fields[0].content());
		}
		
		for(var i=0;i<param.fields.length;i++){
			if(param.fields[i].content instanceof Function&&i!=0){
				continue;
			}
			var item=$("#"+componentId).find(".ui-picker-item:eq("+i+")");
			var index=1;
			if(param.current&&param.current[item.attr("pickerid")]){
				index=item.find(".ui-picker-cell[data-value='"+param.current[item.attr("pickerid")]+"']").data("index");
			}
			this.setSelectedIndex(item,index);
		}
		param['firstLoad']='0';
		
		//对ios和android做不同的细节处理
		var isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		var totalWidth=$("#"+componentId).width();
		var itemWidth=Math.floor((totalWidth)/param.fields.length);
		$("#"+componentId).find(".ui-picker-item").width(itemWidth);
		if(!isIOS){
			$("#"+componentId).find(".ui-picker-item").each(function(index){
				$(this).css("position","relative");
				$(this).css("left",-(index)*5+"px");
			})
		}
		if(isIOS){
			$("#"+componentId).find(".ui-picker-item").append($('<div class="ui-picker-rule" style="height:'+this.setting.rowHeight+'px"></div>'));
			$("#"+componentId).find(".ui-picker-item .ui-picker-rule").css("width",Math.floor(100/param.fields.length)+"%");
		}else{
			$("#"+componentId).append($('<div class="ui-picker-rule android" style="height:'+this.setting.rowHeight+'px"></div>'));
		}
		

		$("#"+componentId).find(".ui-picker-button,.ui-picker-cell").css("font-size",this.setting.fontSize+"px");
		$("#"+componentId).find(".ui-picker-rule").css("font-size",(this.setting.fontSize+4)+"px");
		
		//初始化事件
		this.initEvent();
		
		return this;
	};
	
	/** 
	 *  返回联动组件各列的选中值
	 * @param {none}
	 */ 
	aiPicker.prototype.get=function(){
		var datas={};
		$("#"+this.id).find(".ui-picker-item").each(function(){
			var itemId=$(this).attr("pickerid");
			var itemValue=$(this).find(".ui-picker-cell-current").data("value");
			var itemText=$(this).find(".ui-picker-cell-current").text();
			datas[itemId]={'text':itemText,'value':itemValue};
		});
		return datas;
	};
	
	/** 
	 *  设置联动组件各列的选中值，并弹出联动组件
	 * @param {Object} 联动列每列的选中值，是一个对象，对象内部属性key为每列的id，value为每列选中的值
	 */ 
	aiPicker.prototype.set=function(datas){
		for(var itemId in datas){
			var item=$("#"+this.id).find(".ui-picker-item[pickerid='"+itemId+"']");
			var index=item.find(".ui-picker-cell[data-value='"+datas[itemId]+"']").data("index");
			this.setSelectedIndex(item,index);
		}
		
		$("#"+this.id).css("-webkit-transform","translateY(0px)");
		//创建遮蔽层
		$("<div class='ui-picker-shadow' style='opacity:1'></div>").appendTo("body");
		
	};
	
	
	$.fn.extend({
		AIPicker:function(param){
			var obj=new aiPicker(param);
			return obj;
		}
	});
	
	$.extend({
		genYearfield:function(beginYear,endYear){
			var year={'id':'year','content':[],'reload':false};
			for(var i=beginYear;i<=endYear;i++){
				year.content.push({'value':i,'text':i});
			}
			return year;
		},
		genMonthfield:function(){
			var month={'id':'month','content':[],'reload':false};
			for(var i=1;i<=12;i++){
				month.content.push({'value':i,'text':i});
			}
			return month;
		},
		genDayfield:function(){
			var day={'id':'day','reload':false};
			day.content=function(datas){
				//是否是闰年
				var isLeapYear= (datas['year'] % 4 == 0) && (datas['year'] % 100 != 0 || datas['year'] % 400 == 0);
				var maxDay=31;
				if(datas['month']==4||datas['month']==6||datas['month']==9||datas['month']==11){
					maxDay=30;
				}
				if(datas['month']==2&&isLeapYear){
					maxDay=29;
				}
				if(datas['month']==2&&!isLeapYear){
					maxDay=28;
				}
				var content=[];
				for(var i=1;i<=maxDay;i++){
					content.push({'value':i,'text':i});
				}
				return content;
			}
			return day;
		},
		genHourfield:function(){
			var hour={'id':'hour','content':[],'reload':false};
			for(var i=1;i<60;i++){
				hour.content.push({'value':i,'text':i});
			}
			return hour;
		},
		genMinutefield:function(){
			var minute={'id':'minute','content':[],'reload':false};
			for(var i=1;i<60;i++){
				minute.content.push({'value':i,'text':i});
			}
			return minute;
		}
	});
	
	
	$.fn.extend({
		/**
		 * 
		 * @param {String} type,时间组件的类型，包含：date日期，time时间，month年月，datetime日期时间
		 * @param {Number} beginYear,开始年份
		 * @param {Number} endYear,结束年份
		 */
		AIDtPicker:function(param){
			var newParam={};
			var fields=[];
			if(param.type.toLowerCase()=='date'){
				fields.push($.genYearfield(param.beginYear,param.endYear));
				fields.push($.genMonthfield());
				fields.push($.genDayfield());
			}
			if(param.type.toLowerCase()=='time'){
				fields.push($.genHourfield());
				fields.push($.genMinutefield());
			}
			if(param.type.toLowerCase()=='month'){
				fields.push($.genYearfield(param.beginYear,param.endYear));
				fields.push($.genMonthfield());
			}
			if(param.type.toLowerCase()=='datetime'){
				fields.push($.genYearfield(param.beginYear,param.endYear));
				fields.push($.genMonthfield());
				fields.push($.genDayfield());
				fields.push($.genHourfield());
				fields.push($.genMinutefield());
			}
			newParam.fields=fields;
			newParam=$.extend(newParam,param);
			var obj=$(this).AIPicker(newParam);
			return obj;
		}
	});
	
	
})();






/**
 * 顶部加载组件--实现顶部加载的效果，可手动控制加载的开始和结束
 *
 * @fileOverview
 * @author kangbk
 * @version 1.0
 */
;(function($) {
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
//step01 定义JQuery的作用域
/**
 * @file  选择组件
 * @author 刘亮
 * @time 2015-8-11
 * @version 1.0
 */
;(function($) {
	var ids = 0;
	//step02 插件的扩展方法名称
	$.fn.AISelect = function(options) {
			return new AISelect(this, options);
		}
		/** 
		 * @description 单选、复选插件
		 * @param {Object} element - 当前绑定的元素
		 * @todo 定义一些变量，初始化插件。
		 * @constructor 表明这个方法是个构造。
		 */
	var AISelect = function(element, options) {
			var _ = this;
			_.el = $(element);
			//		_.insertDOM = false;
			//		_.loading = false;
			options.sel = _.el;
			_.selectType;
			_.canDisabled=false;
			_.flex=options.flex;
			_.init(options);
		}
		/** 
		 * @description 重写函数的prototype属性
		 * @param {String} params.type - 选择类型：单选或复选
		 * @param {String} params.theme - 插件主题
		 * @param {Array} params.content - 选项的内容，包含每个选项的实际值value和展示值test
		 * @param {String} params.name - 这组选择框的名称
		 * @param {String} params.flex - 是否弹性布局，此项为false时：
		 * @param {String} params.flex -- 传统tradition和throughout的radio的宽度为100%；
		 * @param {String} params.flex -- 其他radio和checkbox的宽度为params.width；
		 * @param {String} params.width - 选项的宽度，固定宽度的主题需要输入，默认200px
		 * @todo 定义、绑定参数，并给但钱元素绑定事件。
		 */
	AISelect.prototype = {
		selfID: '',
		onChange: (function() {}),
		textField:'text',
		valueField:'value',
		init: function(params) {
			var markup = "";
			var label_class = '';
			var _ = this;
			_.opts = $.extend({}, {
				textField:'text',
				valueField:'value',
				onChange: (function() {})
			}, params);
			this.textField = _.opts.textField;
			this.valueField = _.opts.valueField;
			this.onChange = _.opts.onChange;
			if (!params || !params.type || params.type == 'radio') {
				//传统靶心radio
				this.selectType = 'radio';
				this.canDisabled = true;
				if (params.theme == 'ui-select-radio-blue-tradition' || params.theme == 'ui-select-radio-blue-throughout') {
					label_class = 'class="'+params.theme+'-label"';
					markup = '<ul class="'+params.theme+'-ul">';
					$.each(params.content, function(n, obj) {
						markup += [
							'<li class="'+params.theme+'-li' + (params.flex ? ' ui-select-radio-tradition-throughout-flex' : '') + '">',
							'<input id="radio_' + ++ids + '" type="radio" class="' + params.theme + '" name="' + params.name + '" value="' + obj[_.valueField] + '" text="' + obj[_.textField] + '">',
							'<label for="radio_' + ids + '" ' + label_class + '" data-attr="' + obj[_.textField] + '" >' + obj[_.textField] + '</label>',
							'</li>'
						].join('');
					})
					markup += "</ul>";
				} else {
					//非传统的radio	
					$.each(params.content, function(n, obj) {
						markup += [
							'<input id="radio_' + ++ids + '" type="radio" class="' + params.theme + (params.flex ? '-flex' : '') + '" name="' + params.name + '" value="' + obj[_.valueField] + '" text="' + obj[_.textField] + '">',
							'<label for="radio_' + ids + '" ' + label_class + '" data-attr="' + obj[_.textField] + '">' + (params.flex ? obj[_.textField] : '') + '</label>'
						].join('');
					})
				}
				$(markup).appendTo(params.sel);
			} else if (params.type == 'checkbox') {
				this.selectType = 'checkbox';
				if (params.theme == 'ui-select-checkbox-blue-tradition') {
					this.canDisabled = true;
					label_class = 'class="'+params.theme+'-label"';
					markup = '<ul class="'+params.theme+'-ul">';
					$.each(params.content, function(n, obj) {
						markup += [
							'<li class="'+params.theme+'-li' + (params.flex ? ' ui-select-checkbox-tradition-throughout-flex' : '') + '">',
							'<input id="checkbox_' + ++ids + '" type="checkbox" class="' + params.theme + '" name="' + params.name + '" value="' + obj[_.valueField] + '" text="' + obj[_.textField] + '">',
							'<label for="checkbox_' + ids + '" ' + label_class + '" data-attr="' + obj[_.textField] + '" >' + obj[_.textField] + '</label>',
							'</li>'
						].join('');
					})
					markup += "</ul>";
				}else{
					$.each(params.content, function(n, obj) {
						markup += [
							'<input id="checkbox_' + ++ids + '" type="checkbox" class="' + params.theme + (params.flex ? '-flex' : '') + '" name="' + params.name + '" value="' + obj[_.valueField] + '" text="' + obj[_.textField] + '">',
							'<label for="checkbox_' + ids + '" data-attr="' + obj[_.textField] + (!params.flex && params.width ? '" style="width: ' + params.width + ';"' : '') + '">' + (params.flex ? obj[_.textField] : '') + '</label>'
						].join('');
					})
				}

				$(markup).appendTo(params.sel);
			}
			var me = this;
			$(params.sel).find(":"+params.type).change(function() { 
				me.onChange(me);
			}); 
		},
		/** 
		 * @description 获取选择的实际值
		 */
		getValue: function(params) {
			if(params){
				return this.el.find('input').eq(params.idx).val();
			}else{
				if (this.selectType == 'radio') {
					return this.el.find('input:checked').val();
				} else if (this.selectType == 'checkbox') {
					var checkboxValue = [];
					this.el.find('input:checked').each(function() {
						checkboxValue.push($(this).val());
					});
					return checkboxValue;
				}
			}
		},
		/** 
		 * @description 获取选择的显示值
		 */
		getText: function(params) {
			if(params){
				return this.el.find('input').eq(params.idx).attr('text');
			}else{
				if (this.selectType == 'radio') {
					return this.el.find('input:checked').attr('text');
				} else if (this.selectType == 'checkbox') {
					var checkboxValue = [];
					this.el.find('input:checked').each(function() {
						checkboxValue.push($(this).attr('text'));
					});
					return checkboxValue;
				}
			}
		},
		/** 
		 * @description 设置某选项的实际值
		 * @param {string} params.idx - 选项的索引值
		 * @param {string} params.value - 选项的实际值
		 */
		setValue: function(params) {
			this.el.find('input').eq(params.idx).val(params.value);
		},
		/** 
		 * @description 设置某选项的显示值
		 * @param {string} params.idx - 选项的索引值
		 * @param {string} params.text - 选项的显示值
		 */
		setText: function(params) {
			this.el.find('input').eq(params.idx).attr('text', params.text);
			this.el.find('label').eq(params.idx).attr('data-attr', params.text);
			if(this.el.find('label').eq(params.idx).html().length > 0){
				this.el.find('label').eq(params.idx).html(params.text);
			}
		},
		/** 
		 * @description 设置某选项为禁用
		 * @param {string} params.idx - 选项的索引值
		 */
		setDisabled: function(params) {
			if (this.canDisabled) {
				this.el.find('input').eq(params.idx).attr('disabled', 'disabled');
			}
		},
		/** 
		 * @description 设置某选项为可用
		 * @param {string} params.idx - 选项的索引值
		 */
		setEnable: function(params) {
			if (this.canDisabled) {
				this.el.find('input').eq(params.idx).removeAttr("disabled");
			}
		},
		setChoosen: function(params) {
			this.el.find('input').get(params.idx).checked=true;
		}
	};

	//  $.fn.getRadioValue =  function(inputname){
	//  	if (inputname) {
	//  		return $(' input[name="'+inputname+'"]:checked ').val();
	//  	}
	//  },
	//  $.fn.getCheckboxValue = function(inputname){
	//  	if (inputname) {
	//  		var checkboxValue = [];
	//  		$(' input[name = "'+inputname+'"]:checked').each(function(){
	//  				checkboxValue.push($(this).val());
	//  			}
	//  		);
	//  		return checkboxValue;
	//  	}
	//  }
})(jQuery);
;$.fn.extend({
	AITab:function(param){
		$this=$(this);
		if(!param.type){
			param.type="top";
		}
		if(!param.item){
			param.item=1;
		}
		if(!param.field) return;
		this.outerDivClass="aim_"+param.type+"_tab_group_outer";
		this.groupDivClass="aim_"+param.type+"_tab_group";
		var iconFlag=false;
		$(this).addClass(this.outerDivClass);
		$('<div class='+this.groupDivClass+'></div>').appendTo($(this));
		for(var i=0;i<param.field.length;i++){
			$('<div class="tab_inner" data-rel_element='+param.field[i].rel+'><div class="tab_content">'+param.field[i].name+'</div></div>').appendTo($(this).find("."+this.groupDivClass));
			if(param.type=="bottom"&&param.field[i].icon&&param.field[i].icon.length==2){
				iconFlag=true;
				$(this).find(".tab_inner").css("width",100/param.field.length+"%");
				$(this).find(".tab_inner .tab_content").eq(i).addClass("icon");
				$(this).find(".tab_inner .tab_content").eq(i).css("background","url("+param.field[i].icon[0]+") 50% 10px / 30px 30px no-repeat");
			}
		}
		if(param.type=="top"&&param.field.length<=4){
			$(this).find(".tab_inner").addClass("fixed");
			$(this).css("width","100%");
			$(this).find(".aim_top_tab_group").css("width","100%");
			$(this).find(".tab_inner").css("width",100/param.field.length+"%");
		}
		$(this).find(".tab_inner:nth-child("+param.item+")").addClass("current");
		if(iconFlag){
			$(this).find(".tab_content:first").css("background","url("+param.field[0].icon[1]+") 50% 10px / 30px 30px no-repeat");
		}

		$(this).find(".tab_inner").click(function(){
			$(this).addClass("current").siblings().removeClass("current");
			if(iconFlag){
				for(var i=0;i<param.field.length;i++){
					$this.find(".tab_inner .tab_content").eq(i).css("background","url("+param.field[i].icon[0]+") 50% 10px / 30px 30px no-repeat");
				}
				var index=$(this).index();
				$(this).find(".tab_content").css("background","url("+param.field[index].icon[1]+") 50% 10px / 30px 30px no-repeat");
			}
			if(param.after){
				param.after($(this).data("rel_element"));
			}
		});
		
	}
});
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
;$(function() {
	//隐藏所有消息主体内容
	$('.ui-collapse-content').hide();
	//插入span标签用来制作三角标志
	$('<span class="ui-collapse-icon">').appendTo('.ui-collapse-name');
	//点击标题相对应的内容展开，再次点击后折叠
	$('.ui-collapse-name').bind("touchend", function() {
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
		_con.slideToggle(400);
	});
});
;
(function($) {
	$.fn.AIShade = function(options) {
		return new Shade(this,options);
	}
	var Shade = function(element, options) {
			var _ = this;
			_.el = $(element);
			_.init(options);
		}
		/*
		 * 参数：显示内容div的id
		 * 提供方法：open(),close()
		 */
	Shade.prototype = {
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				content: ''
			}, options);
			var _shade = $("<div></div>").addClass("ui-shade-bg").appendTo(_.el);
			if(typeof _.opts.content=="object"){
				_.content = _.opts.content;
			}else{
				_.content = $("#" + _.opts.content);
			}
			_.content.appendTo(_shade);
			_.shade = _shade;
		},
		open: function() {
			var _ = this;
			//打开遮罩
			_.shade.show();
			//显示隐藏内容
			_.content.show();
		},
		close: function() {
			var _ = this;
			//关闭遮罩
			_.shade.hide();
			//隐藏显示内容
			_.content.hide();
		}
	}
})(jQuery)
;
(function($) {
	$.fn.AISelList = function(options) {
		return new SelList(options);
	}
	var SelList = function(options) {
			this.init(options);
		}
		/*
		 * 思路：
		 * 1.根据数据生成列表（不超过5项）填充数据
		 * 2.绑定选中事件
		 * 3.清除其他样式，绑定选中样式
		 * 4.开放获取选中值方法
		 * 5.确定按钮的事件开放
		 * 6.取消按钮事件（不做任何操作），清除选项至初始状态
		 * 参数：
		 * content：数组，填充的数据，包括显示值和实际值
		 * onChange：选中事件，开放开发接口，默认为空
		 * callback：确定按钮事件
		 * 注意事项：
		 * 默认选中第一项，再次打开选中已选中项
		 */
	var sel_index = 0;
	SelList.prototype = {
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				content: [{
					"text": "立即生效",
					"value": "now"
				}, {
					"text": "下月生效",
					"value": "next"
				}, {
					"text": "一年后生效",
					"value": "oneyear"
				}],
				callback: function() {},
				leftBtn: '取消',
				rightBtn: '确定'
			}, options);
			/*生成组件整体框架*/
			var _shade = $("<div></div>").addClass("ui-sel-bg").appendTo($('body'));
			var _sel = $("<div></div>").addClass("ui-sel-list").appendTo($('body'));
			var _header = $("<div></div>").addClass("ui-sel-header").prependTo(_sel);
			$("<span></span>").addClass("ui-sel-btn-left").html(_.opts.leftBtn).appendTo(_header).bind("touchend",function(){
				_.close();
			});
			/*
			 * 生成确定按钮，并绑定事件
			 */
			$("<span></span>").addClass("ui-sel-btn-right").html(_.opts.rightBtn).appendTo(_header).bind("touchend",function(){
				var id_str = $('input[name="demo_selList"]:checked').attr("id");
				sel_index = id_str.charAt(6);
				_.close();
				_.opts.callback();
			});
			/*
			 * 生成列表
			 */
			var _list = $("<ul></ul>").addClass("ui-sel-item").appendTo(_sel);
			var str = '';
			for (var i = 0; i < _.opts.content.length; i++) {
				if(i == sel_index){
					str += '<li>'+
					'<input class="ui-sel-input" id="radio_'+i+'" type="radio" name="demo_selList" checked="checked" value="'+_.opts.content[i].text+'" />'+
					'<label for="radio_'+i+'" class="mc-check-radio">'+_.opts.content[i].text+'</label>'+
				'</li>';
				}else{
					str += '<li>'+
						'<input class="ui-sel-input" id="radio_'+i+'" type="radio" name="demo_selList" value="'+_.opts.content[i].text+'" />'+
						'<label for="radio_'+i+'" class="mc-check-radio">'+_.opts.content[i].text+'</label>'+
					'</li>';
				}
			}
			_list.html(str);
			_.sel_el = _sel;
			_.sel_bg = _shade;
			//console.log(_sel.height());
		},
		open: function() {
			//动态显示
			var _ = this;
			_.sel_bg.show();
			_.sel_el.show();
			clearTimeout(_.timeFun);
			_.sel_el.animate({"margin-top":-_.sel_el.height()})
		},
		close: function() {
			var _ = this;
			_.sel_bg.hide();
			_.sel_el.animate({"margin-top":0})
			_.timeFun = setTimeout(function(){
				_.sel_el.hide();
			},1500);
		},
		getSelectVal: function() {
			return $('input[name="demo_selList"]:checked').val();
		}
	}
})(jQuery)