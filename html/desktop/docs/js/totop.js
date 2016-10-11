/**
 * Created by Administrator on 2016/10/11.
 */
var oTop = document.getElementById("to_top");
var screenw =document.documentElement.clientWidth || document.body.clientWidth;
var screenh =document.documentElement.clientHeight || document.body.clientHeight;
oTop.style.position='absolute';
oTop.style.left = screenw - oTop.offsetWidth-30 + "px";
oTop.style.top = screenh/2 - oTop.offsetHeight + "px";
window.onscroll = function () {
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
	oTop.style.top = screenh/2 - oTop.offsetHeight + scrolltop + "px";
	if(oTop.style.top > screenh/2 - oTop.offsetHeight + "px"){
		$("#to_top").removeClass("to_top").addClass("can_top");
	}else if(scrolltop==0){
		$("#to_top").removeClass("can_top").addClass("to_top");
	}
}