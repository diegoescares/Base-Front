
app.actions = 
	init: ->

		console.log "Hello world!"

		# On load window
		# $(window).on "load", ->

		# On load images
		# $("body").imagesLoaded ->

		# On resize window
		# $(window).resize ->

		# On resize window with delay
		###
		r_time = false
		$(window).resize ->
			r = true
			clearTimeout(r_time)
			r_time = setTimeout ->
				r = false
				console.log "End!"
			,600
		###



	plugins: ->

		###
		#  Autosize
		$("textarea").autosize
			append: "\n"

		# Isotope
		if $(".isotope").length
			isotope = $(".isotope").isotope()

		# Slider
		setTimeout ->
			if $(".royalSlider").length

				$(".royalSlider").royalSlider
					imageScaleMode: 'fit'
					sliderDrag: false
					arrowsNavAutoHide: false
					loop: true
					#loopRewind: true
					slidesSpacing: 0
					transitionSpeed: 600
					autoPlay:
						enabled: true
						pauseOnHover: true
						delay: 4000
					imageScalePadding: 0
					addActiveClass: true
					navigateByClick: false
					autoHeight: true
		,50


		###



	relayout: ->

		###
		app.alert.equidist()

		if $(".isotope").length
			$(".isotope").isotope
				relayout: true
	
		$("body").imagesLoaded ->
			app.alert.equidist()
			if $(".isotope").length
				$(".isotope").isotope
					relayout: true
		###



