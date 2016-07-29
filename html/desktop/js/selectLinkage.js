;
(function($) {
	$.fn.AISelectLinkage = function(options) {
		return new selectLinkage(this, options);
	}
	var selectLinkage = function(element, options) {
		var _ = this;
		_.el = $(element);
		_.obj = null;
		_.init(options);
	}
	selectLinkage.prototype = {
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				multiple: false,
				data: [],
				displayField: '',
				valueField: '',
				mustSelect:true,
				onSelect:function(){}
			}, options);
			var _sel = $("<ul></ul>").addClass("ui-select-query-row").appendTo(_.el);
			_.obj = _sel;
			//添加所有可选元素
			var _text = _.opts.displayField;
			var _val= _.opts.valueField;
			for (var i = 0; i < _.opts.data.length; i++) {
				var _item = $("<li></li>").addClass("ui-select-query-row-content").attr("value", _.opts.data[i][_val]).html(_.opts.data[i][_text]).appendTo(_sel);
				if (_.opts.data[i]["defaultSelected"] && _.opts.data[i]["defaultSelected"] == true) {
					_item.addClass("checked");
				}
				_item.click(function(){
					if($(this).hasClass("checked")){
						if(_.opts.mustSelect && $(this).siblings().hasClass("checked")){
							$(this).removeClass("checked");
						}
					}else if(_.opts.multiple){//判断是否可多选
						$(this).addClass("checked");
					}else{//不可多选清楚同级其他元素的选中状态
						$(this).addClass("checked").siblings().removeClass("checked");
					}
					_.opts.onSelect();
				});
			}
		},
		getSelectedValue:function(){
			var _ = this;
			var valArr = [];
			var obj = _.obj.find("li.checked");
			//console.log(obj.length);
			//console.log(obj[2]);
			for(var i = 0;i<obj.length;i++){
				valArr.push($(obj[i]).attr("value"));
			}
			return valArr;
		},
		getSelectedObj:function(){
			var _ = this;
			var valArr = [];
			var obj = _.obj.find("li.checked");
			//console.log(obj.length);
			//console.log(obj[2]);
			for(var i = 0;i<obj.length;i++){
				//valArr.push($(obj[i]).attr("value"));
				valArr.push(_.opts.data[$(obj[i]).index()]);
			}
			return valArr;
		},
		getSelectedIndex: function(){
			var _ = this;
			var valArr = [];
			var obj = _.obj.find("li.checked");
			//console.log(obj.length);
			//console.log(obj[2]);
			for(var i = 0;i<obj.length;i++){
				//valArr.push($(obj[i]).attr("value"));
				valArr.push($(obj[i]).index()+1);
			}
			return valArr;
		}
	}
})(jQuery)