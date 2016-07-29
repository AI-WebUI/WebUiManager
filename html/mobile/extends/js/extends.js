$(function() {
	//var _htm = "";
	$(".lis").bind("click", function() {
		//var self=this;
		$(this).addClass("ext").siblings().removeClass("ext");
		$("#ifr_m").attr("src", $(this).attr("name"));
		//var t=$(this).attr("name").replace(/[../][.html]]/g,"");
		//up( $("#div_code").text($(".grid").html()));
		//var intervalIframe = setInterval(function() {
		//	//var _htm = $("#ifr_m").contents().find("body").html();
		//	if (_htm != "") {
		//		//$("#div_code").text(_htm).addClass("prettyprint linenums");
		//		//获取代码文本的内容添加到代码区
		//		//$("#div_code").text($("#div_code").load($(self).attr("name").replace(".html",""))).addClass("prettyprint linenums");;
		//		//$("#div_code").ready(prettyPrint());
		//		clearInterval(intervalIframe);
		//	}
		//}, 200);
	});
//$(".lis:first-child").click();

});