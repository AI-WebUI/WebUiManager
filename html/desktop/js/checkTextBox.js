;
(function($) {

	$.fn.checkTextBox = function(func) {
		$(this).blur(function(){
			//func();
			if($(this).attr("msg")!=""){
				$(this).after('<span class="ui-tip-blow" msg="">'+$(this).attr("msg")+'</span>');
			}else{
				$(this).next(".ui-tip-blow").remove();
			}
		});
		
	}

})(jQuery);