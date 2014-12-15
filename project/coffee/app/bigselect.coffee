
app.bigselect =

	init: ->

		$(".bigselect-open").click ->
			bigselect = $(".bigselect-"+ $(this).attr("data-bigselect") )
			bigselect.addClass("in")
			$("body").addClass("bigselect-in")

			bigselect_height = bigselect.find(".bigselect-front").height()
			window_height = $(window).outerHeight()
			if bigselect_height < window_height
				bigselect.find(".bigselect-front").css
					"margin-top": ( window_height - bigselect_height ) / 2

			false

		$(".bigselect-back, .bigselect-close, .bigselect-option").click ->			
			$(".bigselect").addClass("out")
			setTimeout ->
				$(".bigselect").removeClass("in out")
				$("body").removeClass("bigselect-in")
			,500
