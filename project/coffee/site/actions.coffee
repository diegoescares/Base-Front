
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



