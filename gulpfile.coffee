
gulp         = require("gulp")
coffee       = require("gulp-coffee")
stylus       = require("gulp-stylus")
watch        = require("gulp-watch")
livereload   = require("gulp-livereload")
include      = require("gulp-include")
prefix       = require("gulp-autoprefixer")
notify       = require("gulp-notify")
plumber      = require("gulp-plumber")
concat       = require("gulp-concat")
jade         = require("gulp-jade")
addsrc       = require("gulp-add-src")
uglify       = require("gulp-uglify")
csso         = require("gulp-csso")
imagemin     = require("gulp-imagemin")
pngquant     = require("imagemin-pngquant")
changed      = require("gulp-changed")


path		 = "front"
pathwp       = "wp/wp-content/themes/theme"

files =

	jade:
		watch:        path + "/jade/*.jade"
		watchfolders: path + "/jade/*/*.jade"
		src:          path + "/jade/*.jade"
		dest:         path

	stylus:
		watch:        path + "/stylus/**/*.styl"
		src:          path + "/stylus/main.styl"
		dest:         path + "/css"
		destwp:       pathwp + "/css"

	coffee:
		watch:        path + "/coffee/**/*.coffee"
		src:          path + "/coffee/app.coffee"
		plugins:      path + "/js/plugins/*.js"
		dest:         path + "/js"
		destwp:       pathwp + "/js"

	images:
		watch:        path + "/img_max/*"
		src:          path + "/img_max/*"
		dest:         path + "/img"
		destwp:       pathwp + "/img"


gulp.task "default", ->

	livereload.listen()
	gulp.watch(files.stylus.dest+"/*").on "change", livereload.changed

	gulp.watch files.jade.watch,        [ "build:html" ]
	gulp.watch files.jade.watchfolders, [ "build:html-full" ]
	gulp.watch files.stylus.watch,      [ "build:css" ]
	gulp.watch files.coffee.watch,      [ "build:js" ]
	gulp.watch files.images.watch,      [ "build:images" ]

	return


gulp.task 'build', [
	'build:html-full'
	'build:js'
	'build:css'
	'build:images'
]


gulp.task "build:html", ->
	gulp.src(files.jade.src)
		.pipe(changed(path,extension: ".html"))
		.pipe(plumber(errorHandler: notify.onError("<%= error.message %>")))
		.pipe(jade(pretty: true))
		.pipe(notify("Compiled: <%= file.relative %>"))
		.pipe(gulp.dest(files.jade.dest))
	return

gulp.task "build:html-full", ->
	gulp.src(files.jade.src)
		.pipe(plumber(errorHandler: notify.onError("<%= error.message %>")))
		.pipe(jade(pretty: true))
		.pipe(notify("Compiled: <%= file.relative %>"))
		.pipe(gulp.dest(files.jade.dest))
	return

gulp.task "build:css", ->
	gulp.src(files.stylus.src)
		.pipe(include())
		.pipe(plumber(errorHandler: notify.onError("<%= error.message %>")))
		.pipe(stylus())
		.pipe(notify("Compiled: <%= file.relative %>"))
		.pipe(prefix())
		.pipe(gulp.dest(files.stylus.dest))
		#.pipe(csso())
		#.pipe(gulp.dest(files.stylus.destwp))
	return

gulp.task "build:js", ->
	gulp.src(files.coffee.src)
		.pipe(include())
		.pipe(plumber(errorHandler: notify.onError("<%= error.message %>")))
		.pipe(coffee(bare: true))
		.pipe(notify("Compiled: <%= file.relative %>"))
		.pipe(addsrc.prepend(files.coffee.plugins))
		.pipe(concat("main.js"))
		.pipe(gulp.dest(files.coffee.dest))
		#.pipe(uglify())
		#.pipe(gulp.dest(files.coffee.destwp))
	return

gulp.task "build:images", ->
	gulp.src(files.images.src)
		.pipe(changed(path,extension: ".jpg|.png|.gif"))
		.pipe(imagemin( progressive: true, use: [ pngquant(quality: "70-80") ] ))
		.pipe(plumber(errorHandler: notify.onError("<%= error.message %>")))
		.pipe(notify("Compiled: <%= file.relative %>"))
		.pipe(gulp.dest(files.images.dest))
		#.pipe(gulp.dest(files.images.destwp))
	return



