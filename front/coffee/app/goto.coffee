
app.goto =

	init: ->
		$("[data-goto]").click (e) ->
			to = $(this).attr "data-goto"
			app.goto.to to
			e.preventDefault()

	to: (to,add=false,seconds=1000) ->
		add = $("header").height() + 20 if !add
		top = $(to).offset().top - add - $(".goto-height").height()
		$("body").animate
			scrollTop: top
		,seconds

