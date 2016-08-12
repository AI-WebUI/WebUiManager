;
(function($) {
	var selIndex;
	var initAiSelect = function($this, selectObj, selectFunc) {
			var $element = $(".ui-select-item");
			if ($this) {
				$element = $this.find(".ui-select-item");
			}
			var flag = true;
			$element.each(function() {
				if ($(this).hasClass("mustSelect")) {
					flag = false;
					return;
				}
			});
			$element.on("click", function() {
				if (!$(this).hasClass("disabled")) {
					if (!$(this).hasClass("checked")) {
						if (selectObj.type == "radio") {
							if (flag) {
								$(this).addClass("checked").siblings().removeClass("checked");
							}
							selIndex = $(this).attr("index");
						} else {
							$(this).addClass("checked");
							selIndex = $(this).attr("index");
						}
					} else {
						if (selectObj && selectObj.must && selectObj.must == true && $(this).parent().find(".ui-select-item.checked").length == 1) {
							selIndex = $(this).attr("index");
						} else {
							if (!$(this).hasClass("mustSelect")) {
								$(this).removeClass("checked");
							}
							selIndex = $(this).attr("index");
						}
					}
				}
				if (selectObj && selectFunc && !$(this).hasClass("disabled")) {
					selectFunc(selectObj);
				}
			})
		}
		//initAiSelect();

	var aiSelect = function(params) {
		this.must = params.must;
		this.type = params.type;
		this.data = params.data;
		this.bg = params.background || " ";
		var name = params.type + (new Date()).valueOf();
		if (params.name) {
			name = params.name;
		}
		var type = "radio";
		if (params.type && params.type.indexOf("checkbox") > -1) {
			type = "checkbox";
		}
		this.type = type;
		var block = "";
		if (params.type && params.type.indexOf("Block") > -1) {
			block = "block";
		}
		var line = "";
		if (params.type && params.type.indexOf("Line") > -1) {
			line = "ui-select-line";
		}
		this.block = block;
		var displayField = params.displayField;
		var valueField = params.valueField;
		var element = "<div class='ui-select " + type + " " + block + " " +line+ " " + this.bg + "'>";
		for (var i = 0; i < params.data.length; i++) {
			if (block == "block") {
				element += "<div class='ui-select-item";
				if (params.data[i]["defaultSelected"] && params.data[i]["defaultSelected"] == true) {
					element += " checked";
				}
				if (params.data[i]["disabled"] && params.data[i]["disabled"] == true) {
					element += " disabled";
				}
				if (params.data[i]["mustSelect"] && params.data[i]["mustSelect"] == true) {
					element += " mustSelect checked";
				}
				element += "' value='" + params.data[i][valueField] + "' index='" + i + "'>" + params.data[i][displayField] + "</div>";
			} else {
				element += "<div class='ui-select-item";
				if (params.data[i]["defaultSelected"] && params.data[i]["defaultSelected"] == true) {
					element += " checked";
				}
				if (params.data[i]["disabled"] && params.data[i]["disabled"] == true) {
					element += " disabled";
				}
				if (params.data[i]["mustSelect"] && params.data[i]["mustSelect"] == true) {
					element += " mustSelect checked";
				}
				element += "' index='" + i + "'><span class='ui-select-item-pre'></span><span value='" + params.data[i][valueField] + "'>" + params.data[i][displayField] + "</span></div>"
			}
		}
		element += "</div>";

		this.$element = $(element);
		return this;
	}

	aiSelect.prototype.getSelectedText = function() {
		var $element;
		if (this.block == "block") {
			$element = this.$element.find(".ui-select-item.checked");
		} else {
			$element = this.$element.find(".ui-select-item.checked span:eq(1)");
		}
		var ret = [];
		$element.each(function() {
			ret.push($(this).text());
		});
		return ret;
	}

	aiSelect.prototype.getSelectedValue = function() {
		var $element;
		if (this.block == "block") {
			$element = this.$element.find(".ui-select-item.checked");
		} else {
			$element = this.$element.find(".ui-select-item.checked span:eq(1)");
		}
		var ret = [];
		$element.each(function() {
			ret.push($(this).attr("value"));
		});
		return ret;
	}
	aiSelect.prototype.getObject = function() {
		var _ = this;
		return _.data[selIndex];
	}
	aiSelect.prototype.getIndex = function() {
		return selIndex;
	}
	aiSelect.prototype.getSelectedIndex = function() {
		var $element = this.$element.find(".ui-select-item.checked");
		var ret = [];
		$element.each(function() {
			ret.push($(this).index()+1);
		});
		return ret;
	}

	aiSelect.prototype.getSelectedStatus = function() {
		var $element = this.$element.find(".ui-select-item.checked");
		if ($element && $element.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	aiSelect.prototype.getSelectedField = function() {
		var _ = this;
		var $element = this.$element.find(".ui-select-item.checked");
		var ret = [];
		var _arrIndex = this.getSelectedIndex();
		console.log(_arrIndex);
		for(var i = 1;i<=_.data.length;i++){
			for(var j = 0;j<_arrIndex.length;j++){
				if(_arrIndex[j] == i){
					ret.push(_.data[i]);
				}
			}
		}
		return ret;
	}

	aiSelect.prototype.selected = function(values) {
		if (values instanceof Array) {
			for (var i = 0; i < values.length; i++) {
				if (this.block == "block") {
					this.$element.find(".ui-select-item[value='" + values[i] + "']").addClass("checked");
				} else {
					this.$element.find(".ui-select-item span:eq(1)[value='" + values[i] + "']").addClass("checked");
				}
			}
		} else {
			if (this.block == "block") {
				this.$element.find(".ui-select-item[value='" + values + "']").addClass("checked");
			} else {
				this.$element.find(".ui-select-item span:eq(1)[value='" + values + "']").addClass("checked");
			}
		}

	}

	aiSelect.prototype.disabled = function(values) {
		if (values instanceof Array) {
			for (var i = 0; i < values.length; i++) {
				if (this.block == "block") {
					this.$element.find(".ui-select-item[value='" + values[i] + "']").addClass("disabled");
				} else {
					this.$element.find(".ui-select-item span:eq(1)[value='" + values[i] + "']").addClass("disabled");
				}
			}
		} else {
			if (this.block == "block") {
				this.$element.find(".ui-select-item[value='" + values + "']").addClass("disabled");
			} else {
				this.$element.find(".ui-select-item span:eq(1)[value='" + values + "']").addClass("disabled");
			}
		}

	}


	$.fn.AISelect = function(params) {
		var select = new aiSelect(params);
		$(this).append(select.$element);
		initAiSelect($(this), select, params.onSelect);
		return select;
	}


	var aiSelectQuery = function(params) {
		var selElement = '<div class="ui-select-query-box">';
		for (var i = 0; i < params.fields.length; i++) {
			selElement += '<div class="ui-select-query-row" ';
			if (params.fields[i]['multi'] && params.fields[i]['multi'] == true) {
				selElement += 'multi=1>';
			} else {
				selElement += 'multi=0>';
			}
			selElement += '<div class="ui-select-query-row-left">';
			selElement += '<span class="ui-select-query-row-name"><span value=' + params.fields[i]['id'] + '>' + params.fields[i]['name'] + '</span></span>';
			selElement += '</div>';
			selElement += '<div class="ui-select-query-row-center">';
			for (var j = 0; j < params.fields[i].content.length; j++) {
				var content = params.fields[i].content[j];
				selElement += '<span class="ui-select-query-row-content" value=' + content['value'] + '>' + content['text'] + '</span>';
			}
			selElement += '</div>';
			selElement += '<div style="clear: both;"></div>';
			selElement += "</div>";
			if (i != params.fields.length - 1) {
				selElement += '<div class="ui-select-query-row-down"></div>';
			}

		}
		selElement += "</div>";
		this.selElement = $(selElement);
		if (params.width) {
			this.selElement.css("width", params.width + "px");
		}
		this.selElement.find(".ui-select-query-row-content").click(function() {
			if ($(this).hasClass('checked')) {
				$(this).removeClass("checked");
			} else {
				$(this).addClass("checked");
				if ($(this).parents(".ui-select-query-row").attr("multi") == '0') {
					$(this).siblings().removeClass("checked");
				}
			}

		});
		return this;
	}

	aiSelectQuery.prototype.getSelectedValue = function() {
		var $row = this.selElement.find(".ui-select-query-row");
		var ret = [];
		$row.each(function() {
			var content = $(this).find(".ui-select-query-row-content.checked");
			if (content) {
				var obj = {};
				obj['id'] = $(this).find(".ui-select-query-row-name span").attr("value");
				//if(content.length==1){
				//	obj['value']=content.attr("value");
				//}else{
				obj['value'] = [];
				content.each(function() {
					obj['value'].push($(this).attr("value"));
				});
				//}
			}
			ret.push(obj);
		});
		return ret;
	}

	aiSelectQuery.prototype.selected = function(values) {
		for (var i = 0; i < values.length; i++) {
			var row = this.selElement.find(".ui-select-query-row-name span[value='" + values[i]['id'] + "']").parents(".ui-select-query-row");
			if (values[i]['value'] instanceof Array) {
				for (var j = 0; j < values[i]['value'].length; j++) {
					var content = row.find(".ui-select-query-row-content[value='" + values[i]['value'][j] + "']");
					content.addClass("checked");
				}
			} else {
				var content = row.find(".ui-select-query-row-content[value='" + values[i]['value'] + "']");
				content.addClass("checked");
				if (row.attr("multi") == '0') {
					content.siblings().removeClass("checked");
				}

			}


		}
	}

	aiSelectQuery.prototype.getSelectedIndex = function() {
		var $li = this.ul.find("li.checked");
		var ret = [];
		$li.each(function() {
			ret.push($(this).index()+1);
		});
		return ret;
	}

	$.fn.AISelectQuery = function(params) {
		var select = new aiSelectQuery(params);
		$(this).append(select.selElement);
		return select;
	}
})(jQuery);