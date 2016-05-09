

app.scroll =

	init: ->

		if !app.isMobile() && $(window).width()>=960

			app.scroll.dscroll(0)

			scroll_prev = 0

			#app.scroll.navscroll.init $("section")

			$(window).scroll ->
				scroll = $(window).scrollTop()
				app.scroll.dscroll(scroll)
				#app.scroll.navscroll.comprobe $("section"), scroll


				# Esconder header
				###
				height_window = $(window).height()
				height_body = $("body").height()
				if scroll > 50 && scroll + height_window < height_body - 50
					if scroll-scroll_prev > 0
						$("header").addClass "hide"
					else
						$("header").removeClass "hide"
						scroll_init = 0
				else
					$("header").removeClass "hide"
				scroll_prev = scroll
				###
				

		else
			$(".dscroll").addClass("dscroll-in")


		# Go to
		$("[data-goto]").click (e) ->
			to = $(this).attr "data-goto"
			app.scroll.goto to
			e.preventDefault()


	dscroll: (scroll) ->

		# Mostrar en scroll

		if $(".dscroll").length
			element_top_prev  = 0
			element_top_delay = 0
			$(".dscroll:visible:not(.dscroll-in)").each ->
				element = $(this)
				element_top = element.offset().top
				if scroll + $(window).height() > element_top + 100
					element.addClass "dscroll-in"

					if element_top == element_top_prev
						element_top_delay++
						delay = element_top_delay*0.2
						element.css
							'-webkit-animation-delay': delay+"s"
							'animation-delay': delay+"s"
					else
						element_top_delay=0


					element_top_prev = element_top



	goto: (to,add=false,seconds=1000) ->
		add = $("header").height() + 20 if !add
		top = to.offset().top - add
		$("body").animate
			scrollTop: top
		,seconds


