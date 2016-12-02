
app.youtube = 

	init: ->
		$("[data-youtube]").click (e) ->
			e.preventDefault()
			#app.youtube.insert $(this), $(this).attr("data-youtube")
			app.youtube.insert $("body"), $(this).attr("data-youtube")

	insert: (element,id) ->

		html = app.youtube.html(id)

		element.addClass("youtube-playing")
		element.append html

		$(".youtube-iframe-close").click (e) ->
			e.stopPropagation()
			element.addClass("youtube-out")
			setTimeout ->
				element.find(".youtube-iframe").remove()
				element.removeClass("youtube-playing youtube-out")
			,500

	html: (id) ->

		options = [
			'rel=0'
			'controls=0'
			'showinfo=0'
			'autoplay=1'
			'loop=1'
			'playlist='+id
			'autohide=1'
			'iv_load_policy=3'
			'enablejsapi=1'
		]

		url = 'https://www.youtube.com/embed/'+id+'?' + options.join('&')

		html = ""
		html += "<div class='youtube-iframe'>"
		html += '<iframe width="420" height="315" src="'+url+'" frameborder="0" allowfullscreen></iframe>'
		#html += "<button class='youtube-iframe-close close'><span class='fa fa-times'></span></button>"
		html += "</div>"

		return html
