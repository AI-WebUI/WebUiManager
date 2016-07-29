/**
 * 单键提示
 */
;var AIKeyTip = function(options){
	this.tip = null;
	this.init(options);
}
AIKeyTip.prototype = {
	init:function(options){
		var _ = this;
		_.opts = $.extend({},{
			message:'',
			idName:"",
			callback:function(){},
			btnText:'我知道了',
			bgColor:'#DBECF9',
			btnColor:"",
			borderColor:"#c2e5f7",
			closeBtn: false,
			timeOut:2000,
			btnWidth:68,
			width:770
		},options);
		var _tip = $("<div></div>").addClass("ui-keytip").css("width",_.opts.width).css("margin-left",-_.opts.width/2);
		if(_.opts.idName == ''){
			_tip.appendTo($('body')).hide();
		}else{
			_tip.appendTo($('#'+_.opts.idName)).hide();
		}
		_tip.css({"background-color":_.opts.bgColor,"border-color":_.opts.borderColor});
		var _text = $("<span></span>").addClass("ui-keytip-content").html(_.opts.message).appendTo(_tip);
		var _btn = $("<button></button>").addClass("ui-keytip-btn").html(_.opts.btnText);
		var _close = $("<span></span>").addClass("ui-keytip-close");
		if(_.opts.closeBtn){
			_close.appendTo(_tip);
			_text.css({"width":_.opts.width-_.opts.btnWidth-60});
			_btn.css("margin-right",10);
		}else{
			_text.css({"width":_.opts.width-_.opts.btnWidth-50});
		}
		_btn.appendTo(_tip).css("width",_.opts.btnWidth);
		_.tip = _tip;
		_btn.bind("click",function(){
			_.tip.fadeOut(_.opts.timeOut);
			_.opts.callback();
		});
		_close.bind("click",function(){
			_.tip.fadeOut(_.opts.timeOut);
		});
	},
	open:function(){
		this.tip.show();
	},
	setContent:function(str){
		this.tip.find(".ui-keytip-content").html(str);
	}
}
