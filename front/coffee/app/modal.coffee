

app.modal =

	init: ->

		if $("[data-modal]").length

			$("a[data-modal]").click ->
				element = $(this)
				app.modal.open
					title: element.attr("data-modal")
					content: element.attr("data-content")
					accept: true
					cancel: true
					callback_true: ->
						location.href = element.attr("href")
				false

			$("div[data-modal]").each ->
				element = $(this)
				app.modal.open
					title: element.attr("data-modal")
					content: element.attr("data-content")
					accept: true


	open: (options) ->

		title = ""
		content = ""
		buttons = ""
		close = ""

		if options.static == true
			modallightclass    = ''
			options.close = false
		else
			modallightclass = ' false'

		if options.modalclass
			modalclass = "modal-" + options.modalclass
		else
			modalclass = "modal-default"

		if options.title
			title = "<h3 class='modal-title'>" + options.title + "</h3>"

		if options.content
			content = "<div class='modal-content'>" + options.content + "</div>"

		if options.close == undefined
			options.close = true

		if options.close == true
			close = '<button class="modal-close false"><i class="fa fa-times"></i></button>'

		if options.buttons
			buttons += options.buttons + " "

		if options.cancel == true
			buttons += '<button class="button button-lighter false">Cancelar</button> '

		if options.accept == true
			buttons += '<button class="button true">Aceptar</button> '

		if buttons
			buttons = '<div class="modal-buttons">'+buttons+'</div>'


		html =
			'<div class="modal '+modalclass+' in">'+
				'<div class="modal-light '+modallightclass+'"></div>'+
				'<div class="modal-box va">'+
					'<div class="modal-inner">'+
						close +
						title +
						content +
						buttons +
					'</div>'+
				'</div>'+
			'</div>'


		$("body").append(html)
		$("body").addClass("modal-in")

		app.relayout()

		$(".modal .true, .modal .false").unbind("click").bind "click", -> 

			modalorigin = $(this).closest(".modal")

			modalorigin.addClass("out")
			setTimeout ->
				modalorigin.remove()
				$("body").removeClass("modal-in")
			,200

			if $(this).hasClass("true") && options.callback_true
				options.callback_true()

			if $(this).hasClass("false") && options.callback_false
				options.callback_false()

			return true

	closeall: ->
		$(".modal").addClass("out")
		$("body").removeClass("modal-in")

	removeall: ->
		$(".modal").addClass("out")
		setTimeout ->
			$(".modal").remove()
			$("body").removeClass("modal-in")
		,200

	load: (href,cssclass="default",callback=false) ->
		$.ajax(
			url: href
			type: 'GET'
		).done (result) ->
			app.modal.open
				content: result
				modalclass: cssclass
			if callback
				callback()


