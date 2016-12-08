
app.gallery = 

	init: ->

		# Set default group
		$("[data-gallery]").each ->
			if !$(this).attr("data-gallery")
				$(this).attr "data-gallery", "default"
 
		$(document).on "click", "[data-gallery]", (e) ->
			e.preventDefault()
			group = $(this).attr("data-gallery")
			index = $(this).index("[data-gallery]")
			app.gallery.open group, index

		$(document).on "click", ".gallery-close", (e) ->
			app.gallery.remove()


	open: (group, index=0) ->

		items = []
		$("[data-gallery='"+group+"']").each ->

			href = $(this).attr("href")
			ytid = app.youtube.getid($(this).attr("href"))			
			
			if href && !ytid # Image
				items.push "<div class='bg'><img src='"+href+"' /></div>"
			
			if href && ytid # Video
				items.push "<div class='bg-video' data-youtube='"+ytid+"' data-youtube-auto></div>"

		if items.length > 0

			gallery = app.gallery.create()

			gallery.append app.loader.html()
			gallery.append app.slider.create(items)

			app.slider.createElements gallery.find(".slider")
			app.slider.go gallery.find(".slider"), index

			app.loadingContent()


	create: () ->
		html  = "<div class='gallery'>"
		html += "<button class='gallery-close close'><span class='fa fa-times'></span></button>"
		html += "</div>"
		$("body").append html
		return $(".gallery")


	remove: ->
		$(".gallery").addClass("out")
		setTimeout ->
			$(".gallery").remove()
		,200

