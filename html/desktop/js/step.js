;
(function($) {
	$.fn.AIStep = function(options) {
		return new AIStep(this, options);
	}
	var AIStep = function(element, options) {
		var _ = this;
		_.el = $(element);
		_.opts = null;
		_.init(options);
	}
	AIStep.prototype = {
		stepNum: 1, //默认是在第一步
		stepTotal: 0,
		visited: false,
		afterStep: (function() {}),
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				width: 750,//宽度
				height: 28,//高度
				item: '',//步骤集合
				visited: false,
				afterStep: (function() {})
			}, options);
			this.stepNum = _.opts.step;
			this.stepTotal = _.opts.item.length;
			this.visited = _.opts.visited;
			this.afterStep = _.opts.afterStep;
			//创建元素
			_.creatElement(_.opts.item,_.opts.width,_.opts.height);
			//刷新显示效果
			_.refushStep(_.stepNum);
			//绑定点击事件
			var me = this;
			if (this.visited) {
				this.el.find(".step-ul").delegate("div.step-ul-li.pass", "click", function() {
					me.stepNum = $(this).index()/2 + 1;
					me.goStep(me.stepNum);
//					me.refushStep(me.stepNum);
//					me.afterStep(me);
				});
			}

		},
		creatElement: function(obj, wid, height) {
			var _ = this;
			var len = obj.length;
			var el_wid = (wid - (len - 1) * height) / len;
			//定义外部div,存放步骤元素
			var _step = $("<div></div>").attr("id","step-ul").addClass("step-ul").appendTo(_.el);
			_step.css("height", height);
			for (var i = 1; i < len+1; i++) {
				//根据步骤长度生成相应的步骤数，并填充相应步骤的显示值
				$("<div></div>").addClass("step-ul-li").addClass("step-"+i).html(obj[i-1].text).appendTo(_step);
				if (i < len) {
					$("<div></div>").addClass("ui-active").appendTo(_step);
				}
			}
			$(".step-ul-li").css({
				"width": el_wid
			});
			$(".ui-active").css({
				"border-width": height/2
			});
		},
		refushStep: function(num) {
			//获取所有的显示步骤的div，得到一个集合
			var o = $("#step-ul").find(".step-ul-li");
			//遍历集合，已经过的添加pass，正在的添加active，没有过的不做操作
			for (var i = 1; i <= o.length; i++) {
				if (i < num) {
					//添加已经过了属性
					$(".step-"+i).removeClass("active");
					$(".step-"+i).addClass("pass");
					if (num > 1) {
						$(".step-"+i).prev().attr("class","ui-active ui-active-after-out");
						$(".step-"+i).next().removeClass("ui-active-befor");
					} else {
						$(".step-"+i).next().removeClass("ui-active-befor");
					}
				}
				if (i == num) {
					//添加正在操作属性
					$(".step-"+num).addClass("active");
					//判断添加前后的箭头
					if (num > 1) {
						$(".step-"+num).prev().attr("class","ui-active ui-active-after");
						$(".step-"+num).next().addClass("ui-active-befor");
					} else {
						$(".step-"+num).next().attr("class","ui-active ui-active-befor");
					}
				}
				if(i > num){
					//添加未操作属性
					$(".step-"+i).removeClass("active").removeClass("pass");
					$(".step-"+i).prev().removeClass("ui-active-after-out");
					//判断添加前后的箭头
					$(".step-"+i).prev().removeClass("ui-active-after");
					$(".step-"+i).next().removeClass("ui-active-befor");
				}
			}
		},
		nextStep: function() {
			var len = $("#step-ul").find(".step-ul-li").length;
			if(this.stepNum < len){
				this.stepNum++;
			}
			this.refushStep(this.stepNum);
			this.afterStep(this);
		},
		prevStep: function() {
			if(this.stepNum>1){
				this.stepNum--;
			}
			this.refushStep(this.stepNum);
			this.afterStep(this);
		},
		goStep: function(newStep) {
			if (newStep < 1 || newStep > this.stepTotal) {
				return false;
			} else {
				this.stepNum = newStep;
				this.refushStep(this.stepNum);
			}
			this.afterStep(this);
		},
		getStep:function(){
			return this.stepNum;
		},
		disableVisited:function(){
			this.el.find(".step-ul").undelegate();
			this.el.find(".step-ul .pass").css("cursor", "Default");
		}
	}
})(jQuery)