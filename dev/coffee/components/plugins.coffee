

app.plugins =

	init: ->

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

		$(window).on "load", ->
			app.plugins.relayout()

		r_time = false
		$(window).resize ->
			app.plugins.relayout()
			r = true
			clearTimeout(r_time)
			r_time = setTimeout ->
				app.plugins.relayout()
				r = false
			,600
		###



	relayout: ->

		###
		app.alert.equidist()
		if $(".isotope").length
			$(".isotope").isotope
				relayout: true
	
		$("body").imagesLoaded ->
			app.alert.equidist()
			app.alert.equidist()
			if $(".isotope").length
				$(".isotope").isotope
					relayout: true
		###

