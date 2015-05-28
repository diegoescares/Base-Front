

app.scroll =

	init: ->

		if !app.isMobile() && !$.browser.msie && $(window).width()>=960

			app.scroll.dscroll(0)

			scroll_prev = 0

			app.scroll.navscroll.init $(".article-itinerary")

			$(window).scroll ->
				scroll = $(window).scrollTop()
				app.scroll.dscroll(scroll)
				app.scroll.navscroll.comprobe $(".article-itinerary"), scroll


				# Esconder header
				###
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
				###
				

		else
			$(".dscroll").addClass("dscroll-in")
			$(".navscroll").remove()

	dscroll: (scroll) ->

		height_window = $(window).height()

		# Mostrar en scroll

		if $(".dscroll").length
			element_top_prev  = 0
			element_top_delay = 0
			$(".dscroll:visible:not(.dscroll-in)").each ->
				element = $(this)
				element_top = element.offset().top
				if scroll + height_window > element_top + 100
					element.addClass "dscroll-in"

					if element_top == element_top_prev
						element_top_delay++
						delay = element_top_delay*0.5
						element.css
							'-webkit-animation-delay': delay+"s"
							'animation-delay': delay+"s"
					else
						element_top_delay=0


					element_top_prev = element_top

	navscroll:

		init: (el) ->

			el.each ->
				$(".navscroll").append("<div class='navscroll-item'><div>"+$(this).find(".article-title").text()+"</div></div>")
			
			setTimeout ->
				app.scroll.navscroll.comprobe el, scroll
			,500

			$(".navscroll .navscroll-item").click ->
				index = $(this).index()
				# app.scroll.navscroll.change index
				app.goto.to el.eq(index), 20


		comprobe: (el,scroll) ->
			height_window = $(window).height()
			current = 999
			el.each ->
				index  = $(this).index()
				top    = $(this).offset().top
				if (height_window/2) + scroll > top && top < scroll + height_window
					current = $(this).index()
			app.scroll.navscroll.change current


		change: (index) ->
			#if !$(".navscroll-item").eq(index).hasClass "navscroll-item-active"
			$(".navscroll-item").removeClass "navscroll-item-active"
			$(".navscroll-item").eq(index).addClass "navscroll-item-active"



