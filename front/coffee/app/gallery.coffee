
app.gallery = 

	init: ->

		$("[data-gallery]").each ->
			if !$(this).attr("data-gallery")
				$(this).attr "data-gallery", "default"
 
		$(document).on "click", "[data-gallery]", (e) ->
			e.preventDefault()
			group = $(this).attr("data-gallery")
			index = $(this).index("[data-gallery]")
			app.gallery.open group, index

		$(document).on "click", ".gallery-close", (e) ->
			app.gallery.close()


	open: (group, index=0) ->

		data = []
		$("[data-gallery='"+group+"']").each ->
			if !$(this).attr("data-gallery-youtube")
				data.push "<div class='bg'><img src='"+$(this).attr("href")+"' /></div>"
			else
				data.push "<div class='bg-video cover' data-youtube-bg='"+$(this).attr("data-gallery-youtube")+"'>"

		html = ""
		html += "<div class='gallery'>"
		html += app.slider.create(data)
		html += "<button class='gallery-close close'><span class='fa fa-times'></span></button>"
		html += "</div>"

		$("body").append html

		app.slider.createElements $(".gallery .slider")
		app.slider.go $(".gallery .slider"), index
		app.loadingContent()

	close: ->
		console.log "close!!"
		$(".gallery").addClass("out")
		setTimeout ->
			$(".gallery").remove()
		,200

