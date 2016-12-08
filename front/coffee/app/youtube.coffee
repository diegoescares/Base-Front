
app.youtube = 

	init: ->

		$("[data-youtube]:not([data-youtube-auto])").click (e) ->
			e.preventDefault()
			app.youtube.iframe.insert $(this), $(this).attr("data-youtube")

		$(document).on "click", ".youtube-iframe-close", (e) ->
			e.stopPropagation()
			element = $(this).closest(".youtube")
			element.addClass("youtube-out")
			setTimeout ->
				element.find(".youtube-iframe").remove()
				element.removeClass("youtube-playing youtube-out")
			,500



	getid: (url) ->
		regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
		match = url.match(regExp)
		if match and match[7].length == 11 then match[7] else false


	iframe:

		insert: (element, id) ->
			if !element.hasClass("youtube-playing")
				element.addClass("youtube-playing")
				element.append app.youtube.iframe.html(id)

		html: (id) ->

			options = [
				'rel=0'
				'controls=0'
				'showinfo=0'
				'autoplay=1'
				'autohide=1'
				'iv_load_policy=3'
			]

			url = 'https://www.youtube.com/embed/'+id+'?' + options.join('&')

			html = ""
			html += "<div class='youtube-iframe'>"
			html += '<iframe width="420" height="315" src="'+url+'" frameborder="0" allowfullscreen id="yt'+id+'"></iframe>'
			html += "<button class='youtube-iframe-close close'><span class='fa fa-times'></span></button>"
			html += "</div>"

			return html



	api: 
		ready: false
		inserted: false

		insertScript: ->
			tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			app.youtube.api.inserted = true

		insert: (element,id,opt) ->

			if !app.youtube.api.ready
				app.youtube.api.insertScript()
			
			insertReady = ->

				rand   = Math.floor(Math.random()*10000)
				htmlid = "YT"+rand+"-"+id

				element.append "<div class='youtube-iframe youtube-iframe-api'><div id='"+htmlid+"'></div></div>"

				player = new (YT.Player)(htmlid,
					height: '390'
					width: '640'
					videoId: id
					playerVars:
						autoplay: 1
						controls: 0
						disablekb: 1
						loop: if opt=='bg' then 1 else 0
						modestbranding: 1
						showinfo: 0
						autohide: 1
						iv_load_policy: 3
						rel: 0
					events:
						'onReady': (e) ->
							if opt=='bg'
								player.mute()
						'onStateChange': (e) ->
							if e.data == 1
								element.find(".youtube-iframe-api").addClass("youtube-iframe-ready");

					)

			comprobeReady = ->
				if app.youtube.api.ready
					insertReady()
				else
					setTimeout comprobeReady, 100
			comprobeReady()






onYouTubePlayerAPIReady = ->
	app.youtube.api.ready = true


