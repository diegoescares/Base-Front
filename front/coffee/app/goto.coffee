

app.goto =
	init: ->
		$("[data-goto]").click (e) ->
			to = $(this).attr "data-goto"
			app.goto.to to
			e.preventDefault()
	to: (to,add=0,seconds=1000) ->
		top = $(to).offset().top - add - $(".goto-height").height()
		$("body").animate
			scrollTop: top
		,seconds

