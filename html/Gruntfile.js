module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			build: {
				src: ["mobile/js/btn.js", "mobile/js/drag.js", "mobile/js/core.js", "mobile/js/btn-bak.js", "mobile/js/grid.js", "mobile/js/input.js", "mobile/js/list.js", "mobile/js/operate-load.js", "mobile/js/picker.js", "mobile/js/progress-top.js", "mobile/js/select.js", "mobile/js/tab.js", "mobile/js/tips.js", "mobile/js/loader.js", "mobile/js/loader-new.js", "mobile/js/load.js", "mobile/js/showMore.js","mobile/js/collapse.js","mobile/js/shade.js","mobile/js/selList.js"],
				dest: "webui/1.0.0/phone/js/<%= pkg.name %>.js"
			},
			pcbuild: {
				src: ["desktop/js/webui.js", "desktop/js/select.js", "desktop/js/selectLinkage.js", "desktop/js/step.js","desktop/js/checkTextBox.js","desktop/js/defaultChars.js","desktop/js/keyTip.js","desktop/js/toastTip.js","desktop/js/operateBtn.js","desktop/js/jquery.blockUI.js","desktop/js/shade.js","desktop/js/stepBar.js"],
				dest: "webui/1.0.0/pc/js/<%= pkg.name %>.js"
			},
			cssbuild: {
				src: ["mobile/css320/base.css", "mobile/css320/btn.css", "mobile/css320/drag.css", "mobile/css320/category.css", "mobile/css320/grid.css", "mobile/css320/input.css", "mobile/css320/list.css", "mobile/css320/operate-load.css", "mobile/css320/page.css", "mobile/css320/picker.css", "mobile/css320/progress-top.css", "mobile/css320/select.css", "mobile/css320/select.css", "mobile/css320/tips.css", "mobile/css320/uiload.css", "mobile/css320/load.css","mobile/css320/collapse.css","mobile/css320/shade.css","mobile/css320/selList.css"],
				dest: "webui/1.0.0/phone/css/<%= pkg.name %>.css"
			},
			pccssbuild: {
				src: ["desktop/css/base.css", "desktop/css/panel.css", "desktop/css/window.css", "desktop/css/icon.css", "desktop/css/dialog.css", "desktop/css/combo.css", "desktop/css/linkbutton.css", "desktop/css/accordion.css", "desktop/css/combobox.css", "desktop/css/datagrid.css", "desktop/css/tree.css", "desktop/css/datebox.css", "desktop/css/calendar.css", "desktop/css/messager.css", "desktop/css/pagination.css", "desktop/css/select.css", "desktop/css/spinner.css", "desktop/css/step.css", "desktop/css/table.css", "desktop/css/textbox.css", "desktop/css/tooltip.css", "desktop/css/toast.css", "desktop/css/tabs.css", "desktop/css/keytip.css", "desktop/css/operateBtn.css","desktop/css/pagination.css","desktop/css/stepinfo.css","desktop/css/shade.css","desktop/css/stepBar.css"],
				dest: "webui/1.0.0/pc/css/<%= pkg.name %>.css"
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			bulid: {
				// 动态文件映射，
				// 当任务运行时会自动在 "lib/" 目录下查找 "**/*.js" 并构建文件映射，
				// 添加或删除文件时不需要更新 Gruntfile。
				files: [{
					"webui/1.0.0/phone/js/<%= pkg.name %>.min.js": ['<%= concat.build.dest %>']
				},{
					"webui/1.0.0/pc/js/<%= pkg.name %>.min.js": ['<%= concat.pcbuild.dest %>']
				}]
			}
		},
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify: {
					ascii_only: true
				}
			},
			build: {
				files: [{
					"webui/1.0.0/phone/css/<%= pkg.name %>.min.css": ['<%= concat.cssbuild.dest %>']
				},{
					"webui/1.0.0/pc/css/<%= pkg.name %>.min.css": ['<%= concat.pccssbuild.dest %>']
				}]
			}
		},
		/*//清除目录
		clean: {
			js: 'webui/1.0.0/phone/webui.js',
			css: 'webui/1.0.0/phone/webui.css'
		}*/
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	/*grunt.loadNpmTasks('grunt-contrib-clean');*/
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
	/*grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'clean']);*/
}