
app.tour = 

	init: ->

		if !app.isMobile()

			setTimeout ->

				if $("[data-tour]").length


					$("[data-tour][data-tour-in]").each ->
						element = $(this)
						tour_in = element.attr("data-tour-in")
						$(tour_in).attr "data-tour", element.attr("data-tour")
						$(tour_in).attr "data-tour-content", element.attr("data-tour-content") if element.attr("data-tour-content") 
						$(tour_in).attr "data-tour-next", element.attr("data-tour-next") if element.attr("data-tour-next") 
						element.remove()
						element = $(tour_in)

					i = 1
					$("[data-tour]").each ->
						$(this).attr "data-tour-id", i
						i++

					app.tour.open $("[data-tour]").eq(0)

					$(window).resize ->
						setTimeout ->
							app.tour.styles $(".tour-active")
						, 600

			,1000


	open: (element) ->

		title   = element.attr "data-tour"
		content = element.attr "data-tour-content"
		next    = element.attr "data-tour-next"
		top     = element.offset().top
		index   = parseInt element.attr "data-tour-id"

		if next
			button_next = '<a href="'+next+'" class="button button-line tour-button-nextpage">Siguiente página <i class="fa fa-angle-right"></i></a>'
		else
			button_next = ""
	
		if !$(".tour").length
			$("body").append ""+
				'<div class="tour-container">'+
					'<div class="tour">'+
						'<div class="tour-bg tour-bg-top"></div>'+
						'<div class="tour-bg tour-bg-bottom"></div>'+
						'<div class="tour-bg tour-bg-left"></div>'+
						'<div class="tour-bg tour-bg-right"></div>'+
						'<a class="tour-close"><i class="fa fa-times"></i></a>'+
						'<div class="tour-tip">'+
						'</div>'+
					'</div>'+
				'</div>'

		$(".tour .tour-tip").html ""+
			'<div class="tour-tip-inner">'+
				'<div class="tour-body">'+
					'<div class="tour-title">'+title+'</div>'+
					'<div class="tour-content">'+content+'</div>'+
				'</div>'+
				'<div class="tour-buttons">'+
					'<a href="#" class="button button-line tour-button tour-button-prev"><i class="fa fa-angle-left"></i></a> '+
					'<a href="#" class="button button-line tour-button tour-button-next"><i class="fa fa-angle-right"></i></a> '+
					button_next+
				'</div>'+
			'</div>'

		$("body").addClass "tour-in"

		$("html,body").animate
			scrollTop: top - 100
		,500

		$("[data-tour]").removeClass "tour-active"
		element.addClass "tour-active"

		app.tour.styles element

		if index == 1
			$(".tour-button-prev").addClass("tour-button-inactive")

		if index == $("[data-tour]").length
			$(".tour-button-next").addClass("tour-button-inactive")

		if $("[data-tour]").length == 1
			$(".tour-button").remove()

		$(".tour-button").click ->
			id = parseInt $(".tour-active").attr("data-tour-id")
			if !$(this).is(".tour-button-inactive")
				if $(this).is(".tour-button-next")
					console.log id+1
					app.tour.open $("[data-tour-id='"+(id+1)+"']")
				if $(this).is(".tour-button-prev")
					app.tour.open $("[data-tour-id='"+(id-1)+"']")
			false

		$(".tour-close").click ->
			$(".tour-container").addClass "out"
			$("body").removeClass "tour-in"
			setTimeout ->
				$(".tour-container").remove()
			,500
			false


	styles: (element) ->

		padding = 10

		width   = element.outerWidth()  + padding*2
		height  = element.outerHeight() + padding*2
		top     = element.offset().top  - padding
		left    = element.offset().left - padding
		
		height_container = $(document).height()

		$(".tour-container").css
			height: height_container

		$(".tour").css
			left: left
			top: top
			width: width
			height: height

