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