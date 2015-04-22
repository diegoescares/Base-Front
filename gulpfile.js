
var gulp		= require('gulp');
var coffee		= require('gulp-coffee');
var stylus		= require('gulp-stylus');
var watch		= require('gulp-watch');
var livereload	= require('gulp-livereload');
var include		= require('gulp-include');
var prefix		= require('gulp-autoprefixer');
var notify		= require('gulp-notify');
var plumber 	= require('gulp-plumber');
var concat 		= require('gulp-concat');
var jade 		= require('gulp-jade');
var addsrc 		= require('gulp-add-src');
var uglify 		= require('gulp-uglify');
var csso 		= require('gulp-csso');
var combineMq 	= require('gulp-combine-mq');
var imagemin	= require('gulp-imagemin');
var pngquant	= require('imagemin-pngquant'); 
var svgo		= require('imagemin-svgo');
var changed     = require('gulp-changed');
var rename      = require("gulp-rename");
var unescapeHtml= require('gulp-unescape-html')

var path	= "project/"

var files = {
	coffee: {
		from: path+"/coffee/**/*.coffee",
		to:   path+"/coffee/app.coffee"
	},
	stylus: {
		from: path+"/stylus/**/*.styl",
		to:   path+"/stylus/main.styl"
	},
	jade: {
		from: path+"/jade/**/*.jade",
		to:   path+"/jade/*.jade"
	}
}

gulp.task('default', function () {
	livereload.listen();
    gulp.watch(path + '/css/**/*.css').on('change', livereload.changed);
	gulp.watch(files.stylus.from,['build-css']);
	gulp.watch(files.coffee.from,['build-js']);
	//gulp.watch(files.jade.from,['build-html']);
	gulp.watch(files.jade.from,['build-php']);
});

gulp.task("build-js",function(){
	gulp.src(files.coffee.to)
	.pipe(include())
	.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
	.pipe(coffee({bare: true}))
	.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(addsrc.prepend(path+'/js/plugins/*.js')) 
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path+'/js'));
});

gulp.task("build-css",function(){
	gulp.src(files.stylus.to)
	.pipe(include())
	.pipe(plumber({errorHandler: notify.onError( "<%= error.message %>" ) }))
	.pipe(stylus())
	.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(prefix())
	.pipe(combineMq())
	.pipe(csso())
	.pipe(gulp.dest(path+'/css'))
});

gulp.task("build-html",function(){
	gulp.src(files.jade.to)
	.pipe(changed(path+"html/",{extension: ".html"}))
	.pipe(plumber({errorHandler: notify.onError( "<%= error.message %>" ) }))
	.pipe(jade({pretty: true}))
	.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(gulp.dest(path+"html/"))
});

gulp.task("build-php",function(){
	gulp.src(files.jade.to)
	//.pipe(changed(path,{extension: ".html"}))
	.pipe(plumber({errorHandler: notify.onError( "<%= error.message %>" ) }))
	.pipe(jade({pretty: true}))
	.pipe(notify("Compiled: <%= file.relative %>"))
	.pipe(unescapeHtml())
	.pipe(rename({extname: ".php"}))
	.pipe(gulp.dest(path))
});

gulp.task('imagemin', function () {
    gulp.src([path+'/img_origin/**/*'])
        .pipe(imagemin({
            progressive: true,
			use: [pngquant({quality: '50-70'}) ]
        }))
        .pipe(gulp.dest(path+'/img'));
});


