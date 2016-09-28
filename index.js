var	fs = require('fs'),
	path = require('path'),
	through = require('through2'),
	gutil = require('gulp-util'),
	azbntple = require('azbn-tple')
	;

const PLUGIN_NAME = 'gulp-pagebuilder2';

function pageBuilder2(root) {
	
	root = __dirname + '/../../' + (root || '');
	root = path.normalize(root);
	
	var tple = new azbntple({
		part_path : root,
		cache : {
			tpls : [
				//'tpl.html',
			],
		},
	})
	
	return stream = through.obj(function(file, enc, cb) {
		
		var __this = this;
		
		if (file.isStream()) {
			//this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return cb();
		}
		
		if (file.isBuffer()) {
			//file.contents = Buffer.concat([prefixText, file.contents]);
			
			var code = file.contents.toString();
			
			tple.parseStr(code, {}, function(err, res_str){
				file.contents = new Buffer(res_str, 'utf8');
				
				__this.push(file);
				
				cb();
			});
			
		} else {
			
			file.contents = new Buffer(code, 'utf8');
			
			this.push(file);
			
			cb();
			
		}
		
	});
	
}

module.exports = pageBuilder2;