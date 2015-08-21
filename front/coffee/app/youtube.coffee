
app.youtube = 

	init: ->
		$(".youtube[data-id]").click ->
			app.youtube.insert $(this), $(this).attr("data-id")

	insert: (element,id) ->
		html = ""
		html += "<div class='youtube-iframe'>"
		html += '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+id+'?rel=0&controls=0&showinfo=0&autoplay=1&autohide=1" frameborder="0" allowfullscreen></iframe>'
		html += "<button class='youtube-iframe-close close'><span class='fa fa-times'></span></button>"
		html += "</div>"
		element.addClass("youtube-playing")
		element.append html
		$(".youtube-iframe-close").click (e) ->
			e.stopPropagation()
			element.addClass("youtube-out")
			setTimeout ->
				element.find(".youtube-iframe").remove()
				element.removeClass("youtube-playing youtube-out")
			,500

