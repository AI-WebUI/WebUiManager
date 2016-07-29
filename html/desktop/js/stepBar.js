;(function($){
	$.fn.AIStepBar = function(options){
		return new StepBar(this,options);
	}
	var StepBar = function(element,options){
		var _ = this;
		_.el = $(element);
		_.init(options);
	}
	StepBar.prototype = {
		init:function(options){
			var _ = this;
			_.opts = $.extend({},{
				width:750,
				height:100,
				data:[]
			}, options);
			var _len = (_.opts.width-130)/(_.opts.data.length-1);
			var stepBar = _.creatDiv("ui-stepbar").appendTo(_.el);
			for(var i = 0;i<_.opts.data.length;i++){
				var thisItem = _.creatDiv("ui-stepbar-item").html(_.creatContent(_.opts.data[i].name,_.opts.data[i].desc)).appendTo(stepBar);
				if(i < _.opts.data.length-1){
					thisItem.css("width",_len+'px');
				}
				if(_.opts.data[i].state == 'finish'){
					thisItem.addClass("ui-finish");
				}else if(_.opts.data[i].state == 'process'){
					thisItem.addClass("ui-process");
				}
			}
		},
		creatDiv:function(classsName){
			return $("<div></div>").addClass(classsName);
		},
		creatContent:function(name,desc){
			var str = '<div class="ui-stepbar-line"><i></i></div>'+
				'<div class="ui-stepbar-icon">'+
					'<div class="ui-stepbar-icon-bg"></div>'+
				'</div>'+
				'<div class="ui-stepbar-content">'+
					'<div class="ui-stepbar-name">'+name+'</div>'+
					'<div class="ui-stepbar-desc">'+desc+'</div>'+
				'</div>';
				return str;
		}
	}
})(jQuery)
