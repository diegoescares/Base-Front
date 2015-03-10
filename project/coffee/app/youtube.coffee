
app.youtube = 
	init: ->
		$("[data-youtube]").click ->
			app.youtube.insert $(this), $(this).attr("data-youtube")

	insert: (element,id) ->
		element.addClass("youtube-playing")
		element.append '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+id+'?rel=0&controls=0&showinfo=0&autoplay=1&autohide=1" frameborder="0" allowfullscreen></iframe>'

