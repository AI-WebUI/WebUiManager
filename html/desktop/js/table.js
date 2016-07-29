$(document).ready(function() {});
$(document).ready(function() {
	//模拟的json对象
	var data = {
		"person": [{
			"serialNum": "1",
			"address": "湖南省益阳市安化县",
			"tabHead1": "表头名称1",
			"tabHead2": "表头名称2",
			"tabHead3": "44452.0",
			"tabHead4": "1425.0"
		}, {
			"serialNum": "2",
			"address": "湖南省益阳市安化县东坪镇",
			"tabHead1": "表头名称1",
			"tabHead2": "表头名称2",
			"tabHead3": "453.1",
			"tabHead4": "20.1"
		}, {
			"serialNum": "3",
			"address": "浙江省杭州市西湖区三墩镇慧仁家园6栋1233号",
			"tabHead1": "表头名称1",
			"tabHead2": "表头名称2",
			"tabHead3": "156.0",
			"tabHead4": "1.2",
			"page": "page"
		}, {
			"serialNum": "4",
			"address": "浙江省杭州市西湖区三墩镇慧仁家园6栋1233号",
			"tabHead1": "表头名称1",
			"tabHead2": "表头名称2",
			"tabHead3": "20.1",
			"tabHead4": "20.1",

		}]
	};
	//注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
	//$("#table-template").html()是jquery的语法，不懂的童鞋请恶补。。。
	var myTemplate1 = Handlebars.compile($("#table-template-normal").html());
	$('#tableList-normal').html(myTemplate1(data));
	var myTemplate2 = Handlebars.compile($("#table-template-editable").html());
	//将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
	$('#tableList-editable').html(myTemplate2(data));
	var myTemplate3 = Handlebars.compile($("#table-template-editable2").html());
	$('#tableList-editable2').html(myTemplate3(data));


});