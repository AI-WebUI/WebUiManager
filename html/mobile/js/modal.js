;(function($){
	$.fn.AIModal = function(options){
		return new Modal(options);
	}
	var Modal = function(options){
		var _ = this;
		_.init(options);
	}
	Modal.prototype = {
		init:function(options){
			var _ = this;
			_.opts = $.extend({},{
				title:"标题",//标题
				content:'',//传入的id或者一个对象
				btnText:"确定",
				callback:function(){}
			},options);
			var _shade = _.createDiv("ui-modal-shade-bg").appendTo($('body'));
			var _modal = _.createDiv("ui-modal").appendTo(_shade);
			var _title = _.createDiv("ui-modal-title").html(_.opts.title).appendTo(_modal);
			var _closeBtn = $("<span></span>").appendTo(_title).bind('click',function(){
				_.close();
			});
			$("<i></i>").appendTo(_closeBtn);
			var _con = _.createDiv("ui-modal-content").appendTo(_modal);
			if(typeof _.opts.content=="object"){
				_.content = _.opts.content;
			}else{
				_.content = $("#" + _.opts.content);
			}
			_.content.appendTo(_con);
			var _btns = _.createDiv("ui-modal-btndiv").appendTo(_modal);
			var _btn = $("<button></button>").addClass("ui-modal-btn").html(_.opts.btnText).appendTo(_btns);
			_btn.bind('click',function(){
				_.close();
				_.opts.callback();
			});
			_.modal = _shade;
			_.modal_con = _modal;
		},
		createDiv:function(className){
			return $("<div></div>").addClass(className);
		},
		open:function(){
			var _ = this;
			_.modal.show();
			_.content.show();
			/*设置css居中*/
			_.modal_con.css({
				"margin-left":-(_.modal_con.width()/2)+"px",
				"margin-top":-(_.modal_con.height()/2)+"px"
			});
		},
		close:function(){
			this.modal.hide();
			this.content.hide();
		}
	}
})(jQuery)
