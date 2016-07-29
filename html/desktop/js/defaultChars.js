;(function(){
	jQuery.fn.defaultChars = function() {
   		return $(this).each(function() {
	        var $this = $(this);
	        if ($this.val())
	            return;
	        var $defaultchars = $this.attr('defaultchars');
	        var oldColor = $this.css('color');
	        $this.val($defaultchars).css('color', '#999');
	        $this.focusin(function () {
	            if ($this.val() == $defaultchars){
	            	 $this.val('').css('color', oldColor);
	            }
	        }).focusout(function () {
	            if ($this.val() == ''){
	            	$this.val($defaultchars).css('color', '#999');
	            }
        	});
   		 });
	};
	jQuery.fn.pwdSwitch = function(param) {
   		return $(this).each(function() {
   			var $this = $(this);
   			if(param==true){
   				//密码开关打开，需要显示密文
				$this.after('<span class="ui-passord-show"></span>');
   			}else{
   				//密码开关关闭，需要显示明文
				$this.after('<span class="ui-passord-hide"></span>');
				var $input=$this;
				var $img=$input.next();
				var newInput="<input type='text' id='"+$input.attr("id")+"' name='"+$input.attr("name")+"' class='"+$input.attr("class")+"' value='"+$input.attr("value")+"' />";
				$input.remove();
				$input=$(newInput);
				$img.before($input);
				$this=$input;
   			}
   			if($this.hasClass("ui-passord-largest")){
   				$this.next().addClass("ui-passord-largest-IE7");
   			}
   			if($this.hasClass("ui-passord-large")){
   				$this.next().addClass("ui-passord-large-IE7");
   			}
   			if($this.hasClass("ui-passord-medium")){
   				$this.next().addClass("ui-passord-medium-IE7");
   			}
   			if($this.hasClass("ui-passord-small")){
   				$this.next().addClass("ui-passord-small-IE7");
   			}
   			var change=function($input,$img){
				if($input[0].type=="password"){
					//$this[0].setAttribute("type","text");
					var newInput="<input type='text' id='"+$input.attr("id")+"' name='"+$this.attr("name")+"' class='"+$input.attr("class")+"' value='"+$input.attr("value")+"' />";
					$input.remove();
					$input=$(newInput);
					$img.before($input);
					$img.removeClass("ui-passord-show").addClass("ui-passord-hide");
				}else{
					//$this[0].setAttribute("type","password");
					var newInput="<input type='password' id='"+$input.attr("id")+"' name='"+$input.attr("name")+"' class='"+$input.attr("class")+"' value='"+$input.attr("value")+"' />";
					$input.remove();
					$input=$(newInput);
					$img.before($input);
					$img.removeClass("ui-passord-hide").addClass("ui-passord-show");
				}
			
			}
			$this.next().click(function(){
				change($(this).prev(),$(this));
			});
		});
	};
})();