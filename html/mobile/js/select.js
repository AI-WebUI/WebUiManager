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