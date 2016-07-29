;(function(){
	/** 
	* @constructor picker
	 * @desc 联动选择基础组件
	 * @description 联动选择基础组件的构造方法
	 * @name picker
	 * @property {Array} fields - 联动列数组，数组内为一个列对象，包含列的id及列的content,其中列的content可以是一个静态数组，也可以是一个返回动态数组的function
	 * @property {Object} current - 联动列没列的当前选中值，是一个对象，对象内部属性key为每列的id，value为每列选中的值
	 * @property {Array} buttons - 头部区域放置的按钮，是一个数组，数组内为一个对象，包含按钮的text及点击按钮触发的action
	 * @property {Object} options.rowNum - 联动的行数
	 * @property {Object} options.headHeight - 头部区域的高度
	 * @property {Object} options.rowHeight - 内容区域里每行的高度
	 * @property {Object} options.fontSize - 字体的大小
	 */ 
	var aiPicker=function(param){
		if(!param.fields) return;
		var agent = navigator.userAgent, version = navigator.appVersion;
		
		var setting={
			rowNum:5,
			headHeight:45,
			rowHeight:45,
			fontSize:18
		};
		setting=$.extend(setting, param.options);
		if(setting.rowNum%2==0){
			setting.rowNum=setting.rowNum-1;
		}
		setting.contentHeight=setting.rowHeight*setting.rowNum;
		setting.pickerHeight=setting.headHeight+setting.contentHeight;
		this.setting=setting;
		
		param['firstLoad']='1';
		
		//生成时间选择器页面内容
		this.genPickerCell=function(item,cellList){
			item.find(".ui-picker-cell").remove();
			var blankRowNum=Math.floor(this.setting.rowNum/2);
			for(var i=1;i<=blankRowNum;i++){
				item.append('<div class="ui-picker-cell" style="height:'+this.setting.rowHeight+'px;line-height:'+this.setting.rowHeight+'px;"></div>');
			}
			for(var j=0;j<cellList.length;j++){
				item.append('<div class="ui-picker-cell" style="height:'+this.setting.rowHeight+'px;line-height:'+this.setting.rowHeight+'px;" data-value="'+cellList[j]['value']+'" data-index="'+(j+1)+'">'+cellList[j]['text']+'</div>');
			}
			for(var i=1;i<=blankRowNum;i++){
				item.append('<div class="ui-picker-cell" style="height:'+this.setting.rowHeight+'px;line-height:'+this.setting.rowHeight+'px;"></div>');
			}
		};
		
		this.topValue=[];
		this.interval=[];
			
		/** 
		 * 滚动
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.scrollFunc=function(boxInner,scrollTop){
			var pickerObj=this;
			if(scrollTop&&scrollTop==boxInner.scrollTop){
				return;
			}
			//var boxInner=this;
			var index=$(boxInner).index();
			var itemHeight=pickerObj.setting.rowHeight;

			if(pickerObj.interval[index]==null){
				pickerObj.interval[index]=setInterval(function(){
					if(boxInner.scrollTop==pickerObj.topValue[index]){
						clearInterval(pickerObj.interval[index]);
						pickerObj.interval[index]=null;

						var remainder = boxInner.scrollTop % itemHeight;
						var tmpScrollTop=boxInner.scrollTop;
						if(remainder>itemHeight/2){
							//boxInner.scrollTop+=(itemHeight-remainder);
							
							tmpScrollTop+=(itemHeight-remainder);
						}else{
							//boxInner.scrollTop-=remainder;
							
							tmpScrollTop-=remainder;
						}
						var cellIndex=parseInt(tmpScrollTop / itemHeight + 1);
						pickerObj.setSelectedIndex($(boxInner),cellIndex);
					
					}
				},30);
			}
			pickerObj.topValue[index]=boxInner.scrollTop;
		}
		
		
		/** 
		 * 滚动事件
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.scroll = function(boxInner,y1, y2, stepIndex, stepNum, stepSize, callback) {
			var pickerObj=this;
			var itemHeight=pickerObj.setting.rowHeight;
			var val = stepIndex * stepSize;
			boxInner.scrollTop = y1 + val;
		
			if (stepIndex < stepNum) {
				stepIndex++;
				setTimeout(function() {
					pickerObj.scroll(boxInner,y1, y2, stepIndex, stepNum, stepSize);
				}, 10);
			} else {
				boxInner.scrollTop = y2;
				if (callback) callback();
				//重新绑定滚动事件
				$(boxInner).bind("scroll",function(){
					pickerObj.scrollFunc(this,y2);
				});
			}
		};	
		
		/** 
		 * 滚动事件
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.scrollTop=function(boxInner,y1, y2, dur, callback){
			var pickerObj=this;
			var stepNum = dur / 10;
			var stepSize = (y2 - y1) / stepNum;
			setTimeout(function() {
				pickerObj.scroll(boxInner,y1, y2, 0, stepNum, stepSize, callback);
			}, 10);
		};
			
		/** 
		 * 设置选择项
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.setSelectedIndex=function($obj,cellIndex){
			
			var pickerObj=this;
			//解绑滚动事件，防止滚动事件的重复发生，等滚动完成后，继续绑定滚动事件
			$obj.unbind("scroll");
			cellIndex = parseInt(cellIndex);
			var boxInner = $obj[0];
			var itemHeight=pickerObj.setting.rowHeight;
			pickerObj.scrollTop(boxInner,boxInner.scrollTop, itemHeight * (cellIndex-1), 100);
			$obj.find(".ui-picker-cell[data-index='"+cellIndex+"']").addClass("ui-picker-cell-current").siblings().removeClass("ui-picker-cell-current");
			$obj.find(".ui-picker-cell[data-index='"+cellIndex+"']").siblings().css("font-size",this.setting.fontSize+"px");
			$obj.find(".ui-picker-cell[data-index='"+cellIndex+"']").css("font-size",(this.setting.fontSize+4)+"px");
			//重新生成后面所有需要动态计算的列
			if($obj.index()<$obj.siblings().length){
				//不是最后一个
				var endIndex=$obj.index()+1;
				if(param['firstLoad']=='0'){
					//不是第一次加载，是加载完成后上一列的变化触发的加载
					endIndex=$obj.siblings().length;
				}
				for(var i=$obj.index()+1;i<=endIndex;i++){
					if(typeof(param.fields[i].content)=='function'){
						var item=$("#"+componentId).find(".ui-picker-item:eq("+i+")");
						var datas={};
						$("#"+componentId).find(".ui-picker-item").each(function(){
							var itemId=$(this).attr("pickerid");
							var itemValue=$(this).find(".ui-picker-cell-current").data("value");
							datas[itemId]=itemValue;
						});
						var datas=param.fields[i].content(datas);
						var originCellIndex=1;
						if(param['firstLoad']=='0'&&!param.fields[i]['reload']){
							var currentCell=item.find(".ui-picker-cell-current");
							if(currentCell.length!=0){
								originCellIndex=currentCell.data("index");
							}
							if(datas.length<originCellIndex){
								originCellIndex=datas.length;
							}
						}
						pickerObj.genPickerCell(item,datas);
						var index=1;
						if(param['firstLoad']=='0'){
							if(param.fields[i]['reload']){
								pickerObj.setSelectedIndex(item,index);
							}else{
								pickerObj.setSelectedIndex(item,originCellIndex);
							}
						}else{
							if(param.current&&param.current[item.attr("pickerid")]){
								index=item.find(".ui-picker-cell[data-value='"+param.current[item.attr("pickerid")]+"']").data("index");
							}
							pickerObj.setSelectedIndex(item,index);	
						}
					}
				}
			}
			
		}
		
		/** 
		 * 获取选择项的索引
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.getSelectedIndex = function($obj) {
			return $obj.find(".ui-picker-cell-current").data("index");
		};
		
		/** 
		 * 初始化事件
		 * @param {document} boxInner 
		 * @param {int} scrollTop 
		 */
		this.initEvent=function(){
			var pickerObj=this;
			
			$("#"+this.id).find(".ui-picker-item").each(function(){
				pickerObj.topValue.push(0);
				pickerObj.interval.push(null);
			});
			
			
			$("#"+this.id).find(".ui-picker-item .ui-picker-cell").on('click',function(event) {
				var index=$(this).data("index");
				pickerObj.setSelectedIndex($(this).parent(),index);
			});
		};
		
		var componentId="picker"+new Date().valueOf();
		this.id=componentId;
		$('<div class="ui-picker" id="'+componentId+'"><div class="ui-picker-header" style="height:'+this.setting.headHeight+'px"></div><div class="ui-picker-content" style="height:'+this.setting.contentHeight+'px"></div></div>').appendTo("body");
		if(param.buttons){
			for(var i=0;i<param.buttons.length;i++){
				$("#"+componentId).find(".ui-picker-header").append("<div class='ui-picker-button' style='line-height:"+this.setting.headHeight+"px'>"+param.buttons[i]['text']+"</div>");
				var pickerObj=this;
				$("#"+componentId).find(".ui-picker-button").click(function(){
					if(param.buttons[$(this).index()]['action']){
						var datas={};
						$("#"+componentId).find(".ui-picker-item").each(function(){
							var itemId=$(this).attr("pickerid");
							var itemValue=$(this).find(".ui-picker-cell-current").data("value");
							var itemText=$(this).find(".ui-picker-cell-current").text();
							datas[itemId]={'text':itemText,'value':itemValue};
						});
						param.buttons[$(this).index()]['action'](datas);
					}
					$("#"+componentId).css("-webkit-transform","translateY("+pickerObj.setting.pickerHeight+"px)");
					$(".ui-picker-shadow").remove();
				});
			}
		}
		
		for(var i=0;i<param.fields.length;i++){
			$('<div pickerid="'+param.fields[i]["id"]+'" class="ui-picker-item" style="height:'+this.setting.contentHeight+'px"></div>').appendTo($("#"+componentId).find(".ui-picker-content"));
			//生成第一列及其他静态列的内容，动态列根据前一列的setSelectedIndex事件中的内部方法来重新生成
			if(param.fields[i].content instanceof Array &&i!=0){
				var item=$("#"+componentId).find(".ui-picker-item:last");
				this.genPickerCell(item,param.fields[i].content);
			}
		}
		var item=$("#"+componentId).find(".ui-picker-item:first");
		if(param.fields[0].content instanceof Array){
			this.genPickerCell(item,param.fields[0].content);
		}else{
			this.genPickerCell(item,param.fields[0].content());
		}
		
		for(var i=0;i<param.fields.length;i++){
			if(param.fields[i].content instanceof Function&&i!=0){
				continue;
			}
			var item=$("#"+componentId).find(".ui-picker-item:eq("+i+")");
			var index=1;
			if(param.current&&param.current[item.attr("pickerid")]){
				index=item.find(".ui-picker-cell[data-value='"+param.current[item.attr("pickerid")]+"']").data("index");
			}
			this.setSelectedIndex(item,index);
		}
		param['firstLoad']='0';
		
		//对ios和android做不同的细节处理
		var isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		var totalWidth=$("#"+componentId).width();
		var itemWidth=Math.floor((totalWidth)/param.fields.length);
		$("#"+componentId).find(".ui-picker-item").width(itemWidth);
		if(!isIOS){
			$("#"+componentId).find(".ui-picker-item").each(function(index){
				$(this).css("position","relative");
				$(this).css("left",-(index)*5+"px");
			})
		}
		if(isIOS){
			$("#"+componentId).find(".ui-picker-item").append($('<div class="ui-picker-rule" style="height:'+this.setting.rowHeight+'px"></div>'));
			$("#"+componentId).find(".ui-picker-item .ui-picker-rule").css("width",Math.floor(100/param.fields.length)+"%");
		}else{
			$("#"+componentId).append($('<div class="ui-picker-rule android" style="height:'+this.setting.rowHeight+'px"></div>'));
		}
		

		$("#"+componentId).find(".ui-picker-button,.ui-picker-cell").css("font-size",this.setting.fontSize+"px");
		$("#"+componentId).find(".ui-picker-rule").css("font-size",(this.setting.fontSize+4)+"px");
		
		//初始化事件
		this.initEvent();
		
		return this;
	};
	
	/** 
	 *  返回联动组件各列的选中值
	 * @param {none}
	 */ 
	aiPicker.prototype.get=function(){
		var datas={};
		$("#"+this.id).find(".ui-picker-item").each(function(){
			var itemId=$(this).attr("pickerid");
			var itemValue=$(this).find(".ui-picker-cell-current").data("value");
			var itemText=$(this).find(".ui-picker-cell-current").text();
			datas[itemId]={'text':itemText,'value':itemValue};
		});
		return datas;
	};
	
	/** 
	 *  设置联动组件各列的选中值，并弹出联动组件
	 * @param {Object} 联动列每列的选中值，是一个对象，对象内部属性key为每列的id，value为每列选中的值
	 */ 
	aiPicker.prototype.set=function(datas){
		for(var itemId in datas){
			var item=$("#"+this.id).find(".ui-picker-item[pickerid='"+itemId+"']");
			var index=item.find(".ui-picker-cell[data-value='"+datas[itemId]+"']").data("index");
			this.setSelectedIndex(item,index);
		}
		
		$("#"+this.id).css("-webkit-transform","translateY(0px)");
		//创建遮蔽层
		$("<div class='ui-picker-shadow' style='opacity:1'></div>").appendTo("body");
		
	};
	
	
	$.fn.extend({
		AIPicker:function(param){
			var obj=new aiPicker(param);
			return obj;
		}
	});
	
	$.extend({
		genYearfield:function(beginYear,endYear){
			var year={'id':'year','content':[],'reload':false};
			for(var i=beginYear;i<=endYear;i++){
				year.content.push({'value':i,'text':i});
			}
			return year;
		},
		genMonthfield:function(){
			var month={'id':'month','content':[],'reload':false};
			for(var i=1;i<=12;i++){
				month.content.push({'value':i,'text':i});
			}
			return month;
		},
		genDayfield:function(){
			var day={'id':'day','reload':false};
			day.content=function(datas){
				//是否是闰年
				var isLeapYear= (datas['year'] % 4 == 0) && (datas['year'] % 100 != 0 || datas['year'] % 400 == 0);
				var maxDay=31;
				if(datas['month']==4||datas['month']==6||datas['month']==9||datas['month']==11){
					maxDay=30;
				}
				if(datas['month']==2&&isLeapYear){
					maxDay=29;
				}
				if(datas['month']==2&&!isLeapYear){
					maxDay=28;
				}
				var content=[];
				for(var i=1;i<=maxDay;i++){
					content.push({'value':i,'text':i});
				}
				return content;
			}
			return day;
		},
		genHourfield:function(){
			var hour={'id':'hour','content':[],'reload':false};
			for(var i=1;i<60;i++){
				hour.content.push({'value':i,'text':i});
			}
			return hour;
		},
		genMinutefield:function(){
			var minute={'id':'minute','content':[],'reload':false};
			for(var i=1;i<60;i++){
				minute.content.push({'value':i,'text':i});
			}
			return minute;
		}
	});
	
	
	$.fn.extend({
		/**
		 * 
		 * @param {String} type,时间组件的类型，包含：date日期，time时间，month年月，datetime日期时间
		 * @param {Number} beginYear,开始年份
		 * @param {Number} endYear,结束年份
		 */
		AIDtPicker:function(param){
			var newParam={};
			var fields=[];
			if(param.type.toLowerCase()=='date'){
				fields.push($.genYearfield(param.beginYear,param.endYear));
				fields.push($.genMonthfield());
				fields.push($.genDayfield());
			}
			if(param.type.toLowerCase()=='time'){
				fields.push($.genHourfield());
				fields.push($.genMinutefield());
			}
			if(param.type.toLowerCase()=='month'){
				fields.push($.genYearfield(param.beginYear,param.endYear));
				fields.push($.genMonthfield());
			}
			if(param.type.toLowerCase()=='datetime'){
				fields.push($.genYearfield(param.beginYear,param.endYear));
				fields.push($.genMonthfield());
				fields.push($.genDayfield());
				fields.push($.genHourfield());
				fields.push($.genMinutefield());
			}
			newParam.fields=fields;
			newParam=$.extend(newParam,param);
			var obj=$(this).AIPicker(newParam);
			return obj;
		}
	});
	
	
})();





