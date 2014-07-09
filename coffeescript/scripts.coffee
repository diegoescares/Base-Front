

$(document).ready ->





	resizing_timeout = false

	$(window).resize ->

		# Centrar alertas
		equidist()

		resizing = true
		clearTimeout(resizing_timeout)
		resizing_timeout = setTimeout ->
			$container.isotope
				relayout: true
			resizing = false
		,200




	# Tooltips
	$("[data-tooltip]").each ->
		$(this).append "<span class='newtooltip'><span class='newtooltip-container'><span class='newtooltip-triangle'></span><span class='newtooltip-content'>" + $(this).attr("data-tooltip") + "</span></span></span>"


	# Click tabs
	$(".box-tabs .box-tabs-header a").live "click", ->
		index = $(this).index()
		#console.log index
		parent = $(this).parent().parent()
		parent.find(".box-tabs-header a").removeClass "active"
		parent.find(".box-tabs-header a").eq(index).addClass "active"
		parent.find(".box-tabs-content").removeClass "active"
		parent.find(".box-tabs-content").eq(index).addClass "active"
		$container.isotope
			relayout: true
		false


	# Goto
	$(".goto").click ->
		$("html,body").animate
			scrollTop: $(".gotoend").offset().top - $("header").height() - 20



	# Cargar más contenido
	$(".load-more").click ->
		$(this).html("CARGANDO...")
		$.ajax
			type: "GET"
			url: $(this).attr("href")
			async: false
			success: (html) ->
				html = $(html)
				$newItems = html.find(".articles >")
				#console.log $newItems
				link_next = html.find(".load-more").attr("href")
				$container.isotope( 'insert', $newItems )
				setTimeout ->
					$(".load-more").html("CARGAR MÁS CONTENIDO").attr "href", link_next
					$container.isotope
						relayout: true
					equidist()
				,500
				$(window).load ->
					$container.isotope
						relayout: true
					equidist()
		return false


	# Validación de formularios

	formValidation $("form.controls")




	# Slider personalizado para el home.

	setTimeout ->

		if $("#sliderhome").length

			_n_slides = 0
			$("#sliderhome .royalSlider .rsContent").each ->
				$(this).attr("data-slide",$(this).index())
				_n_slides++
			
			$("#sliderhome .royalSlider").royalSlider
				imageScaleMode: 'fit'
				sliderDrag: false
				arrowsNavAutoHide: false
				loop: true
				#loopRewind: true
				slidesSpacing: 10
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















