

app.scroll = ->

	if !app.isMobile() && !$.browser.msie
		scroll_prev = 0
		$(window).scroll ->

			# Esconder header

			scroll = $(window).scrollTop()
			height_window = $(window).height()
			height_body = $("body").height()
			if scroll > 50 && scroll + height_window < height_body - 50
				if scroll-scroll_prev > 0
					$(".header-top-elements").addClass "hide"
				else
					$(".header-top-elements").removeClass "hide"
					scroll_init = 0
			else
				$(".header-top-elements").removeClass "hide"
			scroll_prev = scroll


			# Mostrar en scroll

			if $(".displayscroll").length
				$(".displayscroll").each ->
					element = $(this)
					element_top = element.offset().top
					element_height = element.height()
					if scroll + height_window > element_height + element_top
						element.addClass "in"

