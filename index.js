var	fs = require('fs'),
	path = require('path'),
	through = require('through2'),
	gutil = require('gulp-util')
	;

const PLUGIN_NAME = 'gulp-pagebuilder2';

function pageBuilder2(root) {
	
	root = __dirname + '/../../' + (root || '');
	root = path.normalize(root);
	
	var tple = new require('azbn-tple')({
		part_path : root,
		cache : {
			tpls : [
				//'tpl.html',
			],
		},
	})
	
	return through.obj(function(file, enc, cb) {
		
		//var __this = this;
		
		if(file.isStream()) {
			//this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return cb();
		}
		
		if(file.isBuffer()) {
			//file.contents = Buffer.concat([prefixText, file.contents]);
			
			var code = file.contents.toString();
			var o = new Object();
			
			var html = tple.parseStrSync(code, o);
			
			file.contents = new Buffer(html, 'utf8');
			
		}
		
		this.push(file);
		
		cb();
		
	});
	
}

module.exports = pageBuilder2;