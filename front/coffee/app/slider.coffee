
app.slider =
	init: ->

		$(".slider").each ->

			# Create elements: nav, bullets
			app.slider.createElements $(this)

			# Set first slide
			app.slider.go $(this), 0
	
			# Autoplay
			#app.slider.autoplay $(this)


		# Actions slider: nav click, swipe, bullets

		$(document).on "click", ".slider .slider-nav-left", ->
			app.slider.prev $(this).closest(".slider")

		$(document).on "click", ".slider .slider-nav-right", ->
			app.slider.next $(this).closest(".slider")

		$(document).on "swipeleft", ".slider", ->
			app.slider.next $(this)

		$(document).on "swiperight", ".slider", ->
			app.slider.prev $(this)

		$(document).on "click", ".slider .slider-bullet", ->
			app.slider.go $(this).closest(".slider"), $(this).index()


	create: (data) ->

		# Create new slider from some data
		slides = ""
		for d in data
			slides += "<div class='slide'>"+d+"</div>"

		slider = "<div class='slider slider-cover'>"+slides+"</div>"

		return slider


	createElements: (slider) ->

		# Generate slider elements

		if !slider.find("slider-slides").length
			slider.find(".slide").wrapAll("<div class='slider-slides' />")

		if slider.find(".slide").length > 1
			html = ""
			html += "<div class='slider-navigation'>"
			html += "<div class='slider-nav slider-nav-left'><span class='fa fa-angle-left'></span></div>"
			html += "<div class='slider-nav slider-nav-right'><span class='fa fa-angle-right'></span></div>"
			html += "</div>"
			html += "<div class='slider-bullets'></div>"
			slider.append html
			slider.find(".slide").each ->
				slider.find(".slider-bullets").append("<div class='slider-bullet'></div>")



	next: (slider) ->
		current = slider.find(".slide.slide-current").index()
		goto    = current + 1
		goto    = 0 if goto >= slider.find(".slide").length
		app.slider.go slider, goto, "right"


	prev: (slider) ->
		current = slider.find(".slide.slide-current").index()
		goto    = current - 1
		goto    = slider.find(".slide").length - 1 if goto < 0
		app.slider.go slider, goto, "left"


	go: (slider,goto,dir=false) ->

		current = slider.find(".slide.slide-current").index()

		if !slider.hasClass("slider-animate") && current!=goto
			
			if !dir && current>=0
				dir = if current < goto then "right" else "left"

			slider.removeClass("slider-dir-left slider-dir-right")
			slider.addClass "slider-animate"
			slider.addClass "slider-dir-"+dir if dir

			slider.find(".slide.slide-current").addClass("slide-out").removeClass("slide-current")
			slider.find(".slide").eq(goto).addClass("slide-current")
			
			slider.find(".slider-bullet")
				.removeClass("slider-bullet-current")
				.eq(goto).addClass("slider-bullet-current")


			ytauto = slider.find(".slide-current").find("[data-youtube-auto]")
			if ytauto.length
				app.youtube.api.insert ytauto, ytauto.attr("data-youtube"), ytauto.attr("data-youtube-auto")

			
			setTimeout ->
				slider.find(".slide-out").find("[data-youtube-auto]").html("")
				slider.find(".slide-out").removeClass("slide-out")
				slider.removeClass("slider-animate")
			,500

			app.relayout()


	autoplay: (slider) ->

		play_timeout = false

		slider.on "mouseenter", ->
			clearTimeout(play_timeout)

		slider.on "mouseleave", ->
			play()

		play = ->
			clearTimeout(play_timeout)
			play_timeout = setTimeout ->
				#if app.isMobile()
				slider.each ->
					app.slider.next $(this)
				play()
			,6000

		play()


