
app.actions =
	init: ->

		app.loading.in()

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


		# Menu

		$hnav       = $(".header-nav")
		$hnavbutton = $(".header-hamburger")
		
		$hnavbutton.click ->
			if !$hnav.hasClass("in")
				$hnav.addClass("in")
			else
				$hnav.removeClass("in").addClass("out")
				setTimeout ->
					$hnav.removeClass("out")
				,500

		$hnav.find("ul li a").each ->
			ul_children = $(this).closest("li").find(">ul")
			if ul_children.length
				$(this).append("<span class='fa fa-angle-right'></span>")

		$hnav.find("ul li ul").prepend "<li><a href='#' class='header-nav-back'><span class='fa fa-angle-left'></span> Atrás</a></li>"

		$hnav.find("ul li a").click (e) ->
			ul_children = $(this).closest("li").find(">ul")
			if ul_children.length
				e.preventDefault()
				ul_children.addClass("in")

		$hnav.find(".header-nav-back").click (e) ->
			e.preventDefault()
			ul_parent = $(this).closest("ul")
			ul_parent.removeClass("in").addClass("out")
			setTimeout ->
				ul_parent.removeClass("out")
			,500



app.loadingContent = ->

	# On load articles
	$("article:not(.article-loaded)").each ->
		article = $(this)
		article.imagesLoaded ->
			article.addClass("article-loaded")
			app.relayout()

	# On load backgrounds
	$(".bg:not(.bg-loaded)").each ->
		bg = $(this)
		imgsrc = bg.find("img").attr("src")
		if imgsrc
			bg.css
				"background-image": "url('"+imgsrc+"')"		
		bg.imagesLoaded ->
			bg.addClass("bg-loaded")

	# On load images
	$("img:not(.img-loaded)").each ->
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

