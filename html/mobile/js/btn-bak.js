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