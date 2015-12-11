
app.slider =
	init: ->

		$(".slider").each ->

			slider = $(this)
			slides_total = slider.find(".slide").length


			# Generate slider elements

			if slides_total > 1
				slider.append "<div class='slider-bullets'></div>"
				slider.append ""+
					"<div class='slider-navigation'>"+
						"<div class='slider-nav slider-nav-left'><span class='fa fa-angle-left'></span></div>"+
						"<div class='slider-nav slider-nav-right'><span class='fa fa-angle-right'></span></div>"+
					"</div>"

			slider.find(".slide").each ->

				slide   = $(this)
				slide_n = slide.index()

				slide.imagesLoaded ->
					slide.addClass("slide-loaded")

				if slider.find(".slider-bullets").length
					slider.find(".slider-bullets").append("<div class='slider-bullet'></div>")


			# Active first slide

			slider.find(".slide").eq(0).addClass("slide-active")
			slider.find(".slider-bullet").eq(0).addClass("slider-bullet-active")


		# Actions slider

		$(".slider .slider-nav").click ->

			slider = $(this).closest(".slider")
			slides_total = slider.find(".slide").length
			slide_current = slider.find(".slide-active").index()
			slide_next = slide_current + 1
			slide_next = 0 if slide_next >= slides_total
			slide_prev = slide_current - 1
			slide_prev = slides_total-1 if slide_prev < 0

			if $(this).hasClass "slider-nav-right"
				app.slider.changeSlide slider, slide_current, slide_next, "right"
			if $(this).hasClass "slider-nav-left"
				app.slider.changeSlide slider, slide_current, slide_prev, "left"


		$(".slider .slider-bullet").click ->
			slider = $(this).closest(".slider")
			app.slider.changeSlide slider, slider.find(".slider-bullet-active").index(), $(this).index()


	changeSlide: (slider,from,to,dir) ->

		if !slider.hasClass("slider-animate")

			if from != to

				slider.removeClass("slider-dir-left")
				slider.removeClass("slider-dir-right")
				slider.addClass("slider-dir-"+dir)

				slider.addClass("slider-animate")
				slider.find(".slide-active").addClass("slide-out").removeClass("slide-active")
				slider.find(".slide").eq(to).addClass("slide-active")

				#slider.find(".dscroll").addClass "dscroll-in"

				slider.find(".slider-bullet").removeClass("slider-bullet-active")
				slider.find(".slider-bullet").eq(to).addClass("slider-bullet-active")

				setTimeout ->
					slider.find(".slide-out").removeClass("slide-out")
					slider.removeClass("slider-animate")
				,700

				app.relayout()


