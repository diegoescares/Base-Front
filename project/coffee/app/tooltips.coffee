

app.tooltips =

	init: ->

		$("[data-tooltip]").each ->
			pos = $(this).attr("data-tooltip-position")
			pos = "bottom" if !pos
			$(this).addClass "tooltip-parent"
			$(this).append "<span class='tooltip tooltip-"+pos+"'><span class='tooltip-content'>" + $(this).attr("data-tooltip") + "</span></span>"


