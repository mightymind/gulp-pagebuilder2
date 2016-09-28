# [gulp](https://github.com/wearefractal/gulp)-pagebuilder

Pagebuilder2 is a build and real time include engine for HTML, JavaScript, CSS and in general any type of text file that you wish to might want to "include" other files into.
It is modification of gulp-pagebuilder

## Install

Install with [npm](https://npmjs.org/package/gulp-pagebuilder2).

```
npm install --save-dev gulp-pagebuilder2
```

## Examples

```js
var gulp = require('gulp'),
	pagebuilder2 = require('gulp-pagebuilder2'));

gulp.task('default', function () {
	gulp.src('src/*.html')
		.pipe(pagebuilder2('src'))
		.pipe(gulp.dest('build/'));
});
```

## How use it in sources

```html
<div class="someclass" >
	[[azbntple tpl="some/block/in/src/somefile.html" class="foo bar" ]]
</div>
```

## Content of some/block/in/src/somefile.html

```html
<div class="otherclass {{class}}" >
	Some content
</div>
```

## Result after compile

```html
<div class="someclass" >
	<div class="otherclass foo bar" >
		Some content
	</div>
</div>
```
