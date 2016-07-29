;$.fn.extend({
	AITab:function(param){
		$this=$(this);
		if(!param.type){
			param.type="top";
		}
		if(!param.item){
			param.item=1;
		}
		if(!param.field) return;
		this.outerDivClass="aim_"+param.type+"_tab_group_outer";
		this.groupDivClass="aim_"+param.type+"_tab_group";
		var iconFlag=false;
		$(this).addClass(this.outerDivClass);
		$('<div class='+this.groupDivClass+'></div>').appendTo($(this));
		for(var i=0;i<param.field.length;i++){
			$('<div class="tab_inner" data-rel_element='+param.field[i].rel+'><div class="tab_content">'+param.field[i].name+'</div></div>').appendTo($(this).find("."+this.groupDivClass));
			if(param.type=="bottom"&&param.field[i].icon&&param.field[i].icon.length==2){
				iconFlag=true;
				$(this).find(".tab_inner").css("width",100/param.field.length+"%");
				$(this).find(".tab_inner .tab_content").eq(i).addClass("icon");
				$(this).find(".tab_inner .tab_content").eq(i).css("background","url("+param.field[i].icon[0]+") 50% 10px / 30px 30px no-repeat");
			}
		}
		if(param.type=="top"&&param.field.length<=4){
			$(this).find(".tab_inner").addClass("fixed");
			$(this).css("width","100%");
			$(this).find(".aim_top_tab_group").css("width","100%");
			$(this).find(".tab_inner").css("width",100/param.field.length+"%");
		}
		$(this).find(".tab_inner:nth-child("+param.item+")").addClass("current");
		if(iconFlag){
			$(this).find(".tab_content:first").css("background","url("+param.field[0].icon[1]+") 50% 10px / 30px 30px no-repeat");
		}

		$(this).find(".tab_inner").click(function(){
			$(this).addClass("current").siblings().removeClass("current");
			if(iconFlag){
				for(var i=0;i<param.field.length;i++){
					$this.find(".tab_inner .tab_content").eq(i).css("background","url("+param.field[i].icon[0]+") 50% 10px / 30px 30px no-repeat");
				}
				var index=$(this).index();
				$(this).find(".tab_content").css("background","url("+param.field[index].icon[1]+") 50% 10px / 30px 30px no-repeat");
			}
			if(param.after){
				param.after($(this).data("rel_element"));
			}
		});
		
	}
});