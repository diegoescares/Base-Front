

app.loading =

	init: ->
		if $("[data-loading]").length
			app.loading.in()
		###
		app.loading.in()
		$("body").imagesLoaded ->
			app.loading.out()
		###

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

