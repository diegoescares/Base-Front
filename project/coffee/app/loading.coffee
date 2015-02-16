

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
				'<div class="loading-icon">'+
					'<div class="loading-icon-circle"><div></div></div>'+
				'</div>'+
			'</div>'
	out: ->
		$(".loading").addClass "out"
		setTimeout ->
			$(".loading").remove()
		,500
		$("body").addClass("loaded")

