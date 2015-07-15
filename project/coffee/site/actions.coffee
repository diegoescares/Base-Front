
app.actions = ->

		# Isotope
		if $(".isotope").length
			$(".isotope").isotope()


		# Forms
		app.forms.validate $("form.validate")

		# Clases cuando se carga el contenido
		app.loadingContent()

		# Relayout
		app.relayout()

		# On load window
		$(window).on "load", ->
			app.relayout()

		# On resize window
		$(window).resize ->
			app.relayout()



app.loadingContent = ->

	# On load articles
	$("article:not(article-loaded)").each ->
		article = $(this)
		article.imagesLoaded ->
			article.addClass("article-loaded")
			app.relayout()

	# On load backgrounds
	$(".bg").each ->
		bg = $(this)
		imgsrc = bg.find("img").attr("src")
		if imgsrc
			bg.css
				"background-image": "url('"+imgsrc+"')"		
		bg.imagesLoaded ->
			bg.addClass("bg-loaded")

	# On load images
	$("img:not(img-loaded)").each ->
		img = $(this)
		img.imagesLoaded ->
			img.addClass("img-loaded")

	# On load all images
	$("body").imagesLoaded ->
		app.relayout()


app.relayout = ->

	app.verticalalign()

	if $(".isotope").length
		$(".isotope").isotope
			relayout: true

