
app = []
#=include_tree app

$(document).ready ->
	app.init()



app.init = ->

	# Menú
	app.secretmenu.init()

	# Menú
	app.activelinks.init()

	# Browsers classes
	app.browsers()

	# Shares
	app.shares.init()

	# Tooltips
	app.tooltips()

	# Alertas
	app.alert.init()

	# Loading
	app.loading.init()

	# Mapa
	app.gmap.init()

	# Eventos en scroll
	app.scroll.init()

	# Slider
	app.slider.init()

	# Youtube insert iframe
	app.youtube.init()

	# Goto scroll
	app.goto.init()

	# Faq
	app.faq.init()

	# Tabs
	app.tabs.init()

	# Validation forms
	#app.validation.form $(".validate")

	# Preview file input
	#app.previewfile.init()

	# Big select
	# app.bigselect.init()

	# Tour
	# app.tour.init()

	# Placeholder crossbrowser
	# app.placeholder.init()

	# Actions
	app.actions()


app.actions = ->

	app.relayout()

	# On load window
	$(window).on "load", ->
		app.relayout()

	# On load images
	$("body").imagesLoaded ->
		app.relayout()

	# On resize window
	$(window).resize ->
		app.relayout()

	# On resize window with delay
	r_time = false
	$(window).resize ->
		r = true
		clearTimeout(r_time)
		r_time = setTimeout ->
			r = false
			app.relayout()
		,600


app.relayout = ->

	app.verticalalign()

	$("img").each ->
	img = $(this)
	img.imagesLoaded ->
		img.addClass("img-loaded")
		app.verticalalign()



