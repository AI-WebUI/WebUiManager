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
