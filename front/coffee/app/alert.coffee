

app.alert =

	init: ->

		if $("[data-alert]").length

			$("a[data-alert]").click ->
				element = $(this)
				app.alert.open
					title: element.attr("data-alert")
					content: element.attr("data-content")
					accept: true
					cancel: true
					callback_true: ->
						location.href = element.attr("href")
				false

			$("div[data-alert]").each ->
				element = $(this)
				app.alert.open
					title: element.attr("data-alert")
					content: element.attr("data-content")
					accept: true


	open: (options) ->

		title = ""
		content = ""
		buttons = ""
		close = ""

		if options.static == true
			alertlightclass    = ''
			options.close = false
		else
			alertlightclass = ' false'

		if options.alertclass
			alertclass = "alert-" + options.alertclass
		else
			alertclass = "alert-default"

		if options.title
			title = "<h3 class='alert-title'>" + options.title + "</h3>"

		if options.content
			content = "<div class='alert-content'>" + options.content + "</div>"

		if options.close == undefined
			options.close = true

		if options.close == true
			close = '<button class="alert-close false"><i class="fa fa-times"></i></button>'

		if options.buttons
			buttons += options.buttons + " "

		if options.cancel == true
			buttons += '<button class="button button-lighter false">Cancelar</button> '

		if options.accept == true
			buttons += '<button class="button true">Aceptar</button> '

		if buttons
			buttons = '<div class="alert-buttons">'+buttons+'</div>'


		html =
			'<div class="alert '+alertclass+' in">'+
				'<div class="alert-light '+alertlightclass+'"></div>'+
				'<div class="alert-box va">'+
					'<div class="alert-inner">'+
						close +
						title +
						content +
						buttons +
					'</div>'+
				'</div>'+
			'</div>'


		$("body").append(html)
		$("body").addClass("alert-in")

		app.relayout()

		$(".alert .true, .alert .false").unbind("click").bind "click", -> 

			alertorigin = $(this).closest(".alert")

			alertorigin.addClass("out")
			setTimeout ->
				alertorigin.remove()
				$("body").removeClass("alert-in")
			,200

			if $(this).hasClass("true") && options.callback_true
				options.callback_true()

			if $(this).hasClass("false") && options.callback_false
				options.callback_false()

			return true

	closeall: ->
		$(".alert").addClass("out")
		$("body").removeClass("alert-in")

	removeall: ->
		$(".alert").addClass("out")
		setTimeout ->
			$(".alert").remove()
			$("body").removeClass("alert-in")
		,200

	load: (href,cssclass="default",callback=false) ->
		$.ajax(
			url: href
			type: 'GET'
		).done (result) ->
			app.alert.open
				content: result
				alertclass: cssclass
			if callback
				callback()


