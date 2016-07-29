/**
 * Grid表单插件
 *
 * @fileOverview
 * @author liuliang
 * @time 2015-8-11
 * @version 1.0
 */
;(function($) {
	/**
	 * Grid表单插件插件
	 *
	 * @constructor AIGrid
	 * @desc 能够实现数据展示和按列排序
	 * @memberOf jQuery
	 * @name grid
	 * @param {Object} option 参数对象
	 *
	 * @param {Array} params.heads - 表头内容，包括name名称，text显示名称，stype排序类型（默认为string）
	 * @param {String} params.loadFunc - 加载数据的方法
	 * @param {String} params.theme - 插件主题
	 * @param {String} params.action - 点击行时触发的函数
	 * @return {Object} 返回grid对象的一个实例
	 *
	 * @example
     *	var opts = {
     *            'heads':[
     *	            {
     *	            	'text':'号码',
     *	            	'name':'haoma'
     *	            },
     *	            {
     *	            	'text':'保底',
     *	            	'name':'baodi'
     *	            },
     *	            {
     *	            	'text':'预存',
     *	            	'name':'yucun'
     *	            },
     *	            {
     *	            	'text':'周期',
     *	            	'name':'cycle',
     *	            	"stype":'int'
     *	            }
     *			],
     *		    'loadFunc':loadPage,//方法要有1个页码的入参
     *		    "theme":'normal',
     *		    "action":function(){
     *		    	alert()
     *		    }
     *        };
     *	var myGrid = new $("#demo-grid").grid(opts);
	 *
	 */
	//绑定到jquery上
	$.fn.AIGrid = function(options) {
		return new AIGrid(this, options);
	}
	var IDs = 1;
	/** 
	 * @description 表单组件
	 * @param {Object} element - 当前绑定的元素
	 * @todo 定义一些变量，初始化插件。
	 * @constructor 表明这个方法是个构造。
	 */
	var AIGrid = function(element, options) {
			var _ = this;
			_.el = $(element);
			//		_.insertDOM = false;
			//		_.loading = false;
			options.sel = _.el;
			_.cloneMarkup=''
			_.init(options);
		}
	/**
	 * grid 名字空间
	 * @namespace
	 * @memberOf jQuery
	 * @name grid
	 */
	AIGrid.prototype = {
		/**
		 * @lends jQuery.grid
		 */
		/** 
		 * @description 当前页码
		 * @todo 定义、绑定参数，并给当前元素绑定事件。
		 * @example
	     *	myGrid.curPage;
		 *
		 * 
		 */
		curPage:1,
		tableGridID:'',
		/**
		 * 初始化，拼装数据和模版加载到容器
		 * 
		 * @param {Object} option 参数对象
		 */
		init: function(params) {
			CreateTable(params)
		},
		/** 
		 * @description 获取、修改grid数据
		 * @param {String} params.rowIdx - 表单行号
		 * @param {String} params.colName - 表单列名
		 * @param {String} params.value - 设置值
		 * @todo 获取表单行时，不需传入params.colName 和params.value
		 * @todo 获取表单列时，不需传入params.value
		 * @example
	     *	myGrid.gridData({
	     * 		rowIdx:1,
	     * 		colName:2
	     * 		});
 	     *	myGrid.gridData({
	     * 		rowIdx:1,
	     * 		colName:2,
	     * 		value:"6666"
	     * 		});
		 */
		gridData: function(params) {
			var def = {
				'rowIdx': 1,
				'colName': undefined,
				'value': undefined
			};
			var opts = $.extend(def, params);
			if (opts.colName) {
				if (opts.value) {
					$("#"+this.tableGridID+" .ui-grid-table-tbody   tr > td[name='" + opts.colName + "']").eq(opts.rowIdx).text(opts.value);
				} else {
					return $("#"+this.tableGridID+" .ui-grid-table-tbody   tr > td[name='" + opts.colName + "']").eq(opts.rowIdx);
				}
			} else {
				return $("#"+this.tableGridID+" .ui-grid-table-tbody   tr").eq(opts.rowIdx);
			}

		}
	}

	CreateTable = function(options) {
		//code here
		var tableID = 'gridTable'+IDs++;
		AIGrid.prototype.tableGridID = tableID;
//		var curPage = 1;
		var defaults = {
			'heads': [],
			'loadFunc': (function() {})
		};
		var settings = $.extend(defaults, options);
		var markup, thMarkup = '',
			tdMarkup = '';

		$.each(settings.heads, function(colsIdx, aCol) {
			thMarkup += '<th class="ui-grid-table-thead-tr-th fn-text-nowrap"'+(aCol.stype?' stype="'+aCol.stype+'"':'')+'>' + aCol.text + '</th>';
			tdMarkup += '<td name="' + aCol.name + '" class="ui-grid-table-tbody-tr-td"></td>';
		});
		this.cloneMarkup = '			    <tr id="cloneTr" class="ui-grid-table-tbody-tr">                               ' 
			+ tdMarkup +'			     </tr>                                          ';
		markup = [
			'<table id="' + tableID + '" class="ui-grid-table">  ',
			'			<thead class="ui-grid-table-thead">                                             ',
			'				<tr  class="ui-grid-table-thead-tr">                                            ',
			thMarkup,
			'				</tr>                                           ',
			'			</thead>                                            ',
			'			<tbody class="ui-grid-table-tbody">                                             ',
			this.cloneMarkup,
			'			 </tbody>                                           ',
			'</table>  		                                                '
		].join('');
		$(markup).appendTo(options.sel);
		GenerateTable(settings.loadFunc(AIGrid.prototype.curPage));
		var drag = options.sel.drag({
			loadUpFn: function(e) {
				//				$("#demo-grid").CreateTable();
				// 为了测试，延迟1秒加载
				setTimeout(function() {
					$(".ui-grid-table-tbody-tr").remove();
					AIGrid.prototype.curPage = 1;
					$(this.cloneMarkup).appendTo(options.sel.find('tbody'));
					GenerateTable(settings.loadFunc(AIGrid.prototype.curPage));
					e.resetload();
				}, 1000);
			},
			loadDownFn: function(e) {
				// 为了测试，延迟1秒加载
				setTimeout(function() {
					$(this.cloneMarkup).appendTo(options.sel.find('tbody'));
					GenerateTable(settings.loadFunc(++AIGrid.prototype.curPage));
					e.resetload();
				}, 1000);
			}
		});
		$("#cloneTr").remove();
		if (typeof(settings.action)=="function") {
			$("#"+AIGrid.prototype.tableGridID+" .ui-grid-table-tbody   tr").on("click", settings.action);
		}
		gridSort(tableID + '');
	};
	GenerateTable = function(options) {
		//code here
		var defaults = {
			"field": []
		};
		var settings = $.extend(defaults, options);
		var tdMarkup = '';
		var tr = $("#cloneTr");
		$.each(settings.field, function(rowIdx, rowData) {
			var clonedTr = tr.clone();
			clonedTr.attr('id', "generatedTr");
			clonedTr.children("td").each(function(colIdx) {
				$(this).html(rowData[$(this).attr('name')]);
			});
			clonedTr.insertAfter(tr);
		});
		$("#cloneTr").remove();
	};

	var w = $(window);
	var GridSort = function(GID) {
		this.AIGrid = document.getElementById(GID);
		this.Gbody = this.AIGrid.tBodies[0];
		this.Ghead = this.AIGrid.tHead;
	}

	GridSort._StringByConvert = function(cell, valType) {
		var val = '';
		if (cell.firstChild) {
			val = cell.firstChild.nodeValue;
		}
		if (!valType) return val.toString();
		switch (valType.toLowerCase()) {
			case 'int':
				return parseInt(val);
			case 'float':
				return parseFloat(val);
			case 'date':
				return new Date(Date.parse(val));
			default:
				return val.toString();
		}
	}

	GridSort.prototype._Sequence = function(colIdx, colType) {
		//这里相信JS的高手们一下就可以看出来这是一个匿名方法体
		//这个方法体在这里不会执行，它会return到调用_Sequence()的函数上去执行
		//在这里这个匿名方法体是属于Array的Sort（）函数的参数
		//细心的童鞋可能主要到了arguments
		//我们将这两个参数看做为A跟B，接下来我们来看看这两个参数是如何比较的
		//译：
		//若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
		//若 a 等于 b，则返回 0。
		//若 a 大于 b，则返回一个大于 0 的值。
		return (function() {
			var _rowPrevVal = GridSort._StringByConvert(arguments[0].cells[colIdx], colType), //这个相当于A参数
				_rowAfterVal = GridSort._StringByConvert(arguments[1].cells[colIdx], colType); //这个相当于B参数
			console.log(_rowPrevVal);
			console.log(_rowAfterVal);
			if (_rowPrevVal < _rowAfterVal)
				return -1;
			else if (_rowPrevVal > _rowAfterVal)
				return 1;
			else
				return 0;
		});
	}

	GridSort.prototype.BindClickHeadSort = function() {
		var _rowsHead = this.Ghead.rows[0].cells,
			_gbody = this.Gbody,
			_gridRows = _gbody.rows,
			_girdSort = this._Sequence;

		//为每个Grid列头绑定一个Click的点击事件，这样比直接在dom上添加onclick更简洁
		for (var i = 0, count = _rowsHead.length; i < count; i++) {

			//注意这里，这里为了避免闭包的影响使用了匿名函数
			(function(idx) {
				_rowsHead[idx].onclick = function() {
					var _sortRows = [],
						_sortType = this.getAttribute('stype'),
						_orderby = _gbody.getAttribute('orderby');

					//首先将Grid中的Row Copy到一个空数组中，以便之后排序
					for (var i = 0, count = _gridRows.length; i < count; i++) {
						_sortRows[i] = _gridRows[i];
					}

					//这里的_orderby是我们自己设置的属性，为了区分是降序还是升序
					if (!_orderby) {
						//开始执行Array的Sort()函数，可能很多童鞋都还米有看见过Sort()函数中加参数的用法
						//不了解Sort()函数参数的童鞋，请马上跳到_Sequence()函数那里继续看吧，那里我会解释
						_sortRows.sort(_girdSort(idx, _sortType));
						_gbody.setAttribute('orderby', 'asc');
					} else {
						_sortRows.reverse();
						_gbody.removeAttribute('orderby');
					}

					//这里创建文档碎片，然后通过上面已排好序的Rows从新添加到文档碎片中
					//使用文档碎片的好处是，避免了浏览器的绘制过程，加快了页面响应速度
					var _newRows = document.createDocumentFragment();
					for (var j = 0, count2 = _sortRows.length; j < count2; j++) {
						_newRows.appendChild(_sortRows[j]);
					}

					//最后一次性的加载到了Grid的内部
					_gbody.appendChild(_newRows);
				}
			})(i);
		}
	}

	gridSort = (function(gid) {
		new GridSort(gid).BindClickHeadSort();
	});
})(jQuery);