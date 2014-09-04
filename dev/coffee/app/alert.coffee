

app.alert =

	open: (options) ->

		title = ""
		content = ""
		buttons = ""
		close = ""

		if options.title
			title = "<h2>" + options.title + "</h2>"

		if options.content
			content = "<div>" + options.content + "</div>"

		if options.static == true
			alertlightclass    = ''
			options.close = false
		else
			alertlightclass = ' false'

		if options.alertclass
			alertclass = "alert-" + options.alertclass
		else
			alertclass = "alert-default"

		options.close = true if options.close == undefined

		if options.close == true
			close = '<button class="close false"><i class="fa fa-times"></i></button>'

		if options.buttons
			buttons += options.buttons + " "

		if options.cancel == true
			buttons += '<button class="button button-medium false">Cancelar</button> '

		if options.accept == true
			buttons += '<button class="button button-medium button-primary true">Aceptar</button> '

		if buttons
			buttons = '<div class="buttons">'+buttons+'</div>'


		html =
			'<div class="alert in '+alertclass+'">'+
				'<div class="alert-light '+alertlightclass+'"></div>'+
				'<div class="alert-box equidist">'+
					'<div class="alert-inner">'+
						close +
						'<div class="alert-content">' +
							title +
							content +
							buttons +
						'</div>' +
					'</div>'+
				'</div>'+
			'</div>'


		$("body").append(html)
		$("body").addClass("alert-in")

		app.alert.equidist()


		$(".alert .true, .alert .false").unbind("click").bind "click", -> 

			alertorigin = $(this).closest(".alert")

			alertorigin.addClass("out")
			setTimeout ->
				alertorigin.remove()
				#alertorigin.removeClass("in out")
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

	equidist: ->
		$(".equidist").each ->
			_this = $(this)
			_left = (_this.parent().width() - _this.width()) / 2
			_left = 0 if _left < 0
			_top = (_this.parent().height() - _this.height()) / 2
			_top = 0 if _top < 0
			_this.css
			  left: _left + "px"
			  top: _top + "px"

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
			app.plugins.relayout()


