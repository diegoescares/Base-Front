
app.slider =
	init: ->

		$(".slider").each ->

			slider = $(this)

			# Generate slider elements

			if slider.find(".slide").length > 1
				slider.append "<div class='slider-bullets'></div>"
				slider.append ""+
					"<div class='slider-navigation'>"+
						"<div class='slider-nav slider-nav-left'><span class='fa fa-angle-left'></span></div>"+
						"<div class='slider-nav slider-nav-right'><span class='fa fa-angle-right'></span></div>"+
					"</div>"

			slider.find(".slide").each ->

				slide   = $(this)

				slide.imagesLoaded ->
					slide.addClass("slide-loaded")

				if slider.find(".slider-bullets").length
					slider.find(".slider-bullets").append("<div class='slider-bullet'></div>")


			# Active first slide
			app.slider.go slider, 0


		# Actions slider: nav click

		$(".slider .slider-nav").click ->
			slider = $(this).closest(".slider")
			app.slider.next(slider) if $(this).hasClass "slider-nav-right"
			app.slider.prev(slider) if $(this).hasClass "slider-nav-left"


		# Actions slider: swipe

		$(".slider").on "swipeleft", ->
			app.slider.next $(this)

		$(".slider").on "swiperight", ->
			app.slider.prev $(this)


		# Actions slider: bullets

		$(".slider .slider-bullet").click ->
			slider = $(this).closest(".slider")
			app.slider.go slider, $(this).index()


		# Autoplay

		app.slider.autoplay()



	next: (slider) ->
		current = slider.find(".slide.slide-active").index()
		goto    = current + 1
		goto    = 0 if goto >= slider.find(".slide").length
		app.slider.go slider, goto, "right"


	prev: (slider) ->
		current = slider.find(".slide.slide-active").index()
		goto    = current - 1
		goto    = slider.find(".slide").length - 1 if goto < 0
		app.slider.go slider, goto, "left"


	go: (slider,goto,dir=false) ->

		current = slider.find(".slide.slide-active").index()

		if !slider.hasClass("slider-animate") && current!=goto
			
			if !dir
				if current < goto
					dir = "right"
				else
					dir = "left"

			slider.removeClass("slider-dir-left")
			slider.removeClass("slider-dir-right")
			slider.addClass "slider-animate"
			slider.addClass "slider-dir-"+dir if dir

			slider.find(".slide.slide-active").addClass("slide-out").removeClass("slide-active")
			slider.find(".slide").eq(goto).addClass("slide-active")
			
			slider.find(".slider-bullet").removeClass("slider-bullet-active")
			slider.find(".slider-bullet").eq(goto).addClass("slider-bullet-active")

			setTimeout ->
				slider.find(".slide-out").removeClass("slide-out")
				slider.removeClass("slider-animate")
			,500

			app.relayout()



	autoplay: ->

		play_timeout = false

		$(".slider").mouseenter ->
			clearTimeout(play_timeout)

		$(".slider").mouseleave ->
			play()

		play = ->
			clearTimeout(play_timeout)
			play_timeout = setTimeout ->
				#if app.isMobile()
				$(".slider").each ->
					app.slider.next $(this)
				play()
			,6000

		play()


