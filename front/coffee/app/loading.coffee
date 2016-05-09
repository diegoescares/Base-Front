

app.loading =

	init: ->

		if $("[data-loading]").length
			app.loading.in()
			$("body").imagesLoaded ->
				app.loading.out()

		$(".loading-test").click (e) ->
			e.preventDefault()
			app.loading.in()
			setTimeout ->
				app.loading.out()
			,2000

	in: (element) ->
		element = $("body") if !element
		element.append ''+
			'<div class="loading">'+
				'<svg viewBox="25 25 50 50">'+
				'	<circle cx="50" cy="50" r="20"></circle>'+
				'</svg>'+
			'</div>'

	out: ->
		$(".loading").addClass "out"
		setTimeout ->
			$(".loading").remove()
		,500
		$("body").addClass("loaded")

