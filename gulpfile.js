
var gulp		= require('gulp');
var coffee		= require('gulp-coffee');
var stylus		= require('gulp-stylus');
var watch		= require('gulp-watch');
var livereload	= require('gulp-livereload');
var include		= require('gulp-include');
var sourcemaps	= require('gulp-sourcemaps');
var prefix		= require('gulp-autoprefixer');
var notify		= require('gulp-notify');
var plumber 	= require('gulp-plumber');
var concat 		= require('gulp-concat');
var jade 		= require('gulp-jade');

var path_dev	= "project/"

var files = {
	coffee: {
		from: path_dev+"/coffee/**/*.coffee",
		to:   path_dev+"/coffee/app.coffee"
	},
	stylus: {
		from: path_dev+"/stylus/**/*.styl",
		to:   path_dev+"/stylus/main.styl"
	},
	jade: {
		from: path_dev+"/jade/**/*.jade",
		to:   path_dev+"/jade/*.jade"
	}
}

gulp.task('default', function () {
	livereload.listen();
    gulp.watch(path_dev + '/css/**/*.css').on('change', livereload.changed);
	gulp.watch(files.stylus.from,['build-css']);
	gulp.watch(files.coffee.from,['build-js']);
	gulp.watch(files.jade.from,['build-html']);
});

gulp.task("build-js",function(){
	gulp.src(files.coffee.to)
	.pipe(include())
	//.pipe(sourcemaps.init())
	.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
	.pipe(coffee({bare: true}))
	.pipe(notify("Compiled: <%= file.relative %>"))
	//.pipe(sourcemaps.write())
	.pipe(gulp.dest(path_dev+'/js'));
});

gulp.task("build-js-plugins",function(){
	gulp.src(path_dev+"/js/plugins/**/*.js")
	.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
	.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(concat('plugins.js'))
	.pipe(gulp.dest(path_dev+'/js'));
});

gulp.task("build-css",function(){
	gulp.src(files.stylus.to)
	.pipe(include())
	//.pipe(sourcemaps.init())
	.pipe(plumber({errorHandler: notify.onError( "<%= error.message %>" ) }))
	.pipe(stylus())
	.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(prefix())
	//.pipe(sourcemaps.write())
	.pipe(gulp.dest(path_dev+'/css'))
});

gulp.task("build-html",function(){
	gulp.src(files.jade.to)
	//.pipe(plumber({errorHandler: notify.onError( "<%= error.message %>" ) }))
	.pipe(jade())
	//.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(gulp.dest(path_dev+'/jade'))
});


