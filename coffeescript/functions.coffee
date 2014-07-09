
_in = (element) ->
	element.addClass("in")

_out = (element) ->
	element.addClass("out")
	setTimeout ->
		element.removeClass("in out")
	,500




popupWindow = (url, w, h) ->
	left = ( $(window).width() / 2 )  - (w / 2)
	top  = ( $(window).height() / 2 ) - (h / 2)
	return window.open(url, "Compartir", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left)



validarEmail = (elemento,valor) ->
	if /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)
		return true
	else
		return false






equidist = ->
	$(".equidist").each ->
		_this = $(this)
		_left = (_this.parent().width() - _this.width()) / 2
		_left = 0 if _left < 0
		_top = (_this.parent().height() - _this.height()) / 2
		_top = 0 if _top < 0
		_this.css
		  left: _left + "px"
		  top: _top + "px"

openAlert = (options) ->

	title = ""
	content = ""
	buttons = ""
	close = ""

	if options.title
		title = "<h2>" + options.title + "</h2>"

	if options.content
		content = "<div class='alert-content'>" + options.content + "</p>"

	options.close = true if options.close == undefined

	if options.close == true
		close = '<button class="close false">X</button>'

	if options.buttons
		buttons += options.buttons + " "

	if options.cancelar == true
		buttons += '<button class="button false">Cancelar</button> '

	if options.aceptar == true
		buttons += '<button class="button true">Aceptar</button> '


	html =
		'<div class="alert in '+options.cssclass+'">'+
			'<div class="alert-light false"></div>'+
			'<div class="alert-box equidist">'+
				'<div class="inner">'+
					close +
					title +
					content +
					'<div class="buttons">'+buttons+'</div>'+
				'</div>'+
			'</div>'+
		'</div>'


	$("body").append(html)

	equidist()


	$(".alert .true, .alert .false").unbind("click").bind "click", -> 

		if $(this).parent().is(".alert")
			alertorigin = $(this).parent()

		if $(this).parent().parent().is(".alert")
			alertorigin = $(this).parent().parent()

		if $(this).parent().parent().parent().is(".alert")
			alertorigin = $(this).parent().parent().parent()

		if $(this).parent().parent().parent().parent().is(".alert")
			alertorigin = $(this).parent().parent().parent().parent()

		if $(this).parent().parent().parent().parent().parent().is(".alert")
			alertorigin = $(this).parent().parent().parent().parent().parent()

		alertorigin.addClass("out")
		setTimeout ->
			alertorigin.remove()
			#alertorigin.removeClass("in out")
		,200

		if $(this).hasClass("true") && options.callback_true
			options.callback_true()

		if $(this).hasClass("false") && options.callback_false
			options.callback_false()

		return true

closeAlerts = ->
	$(".alert").addClass("out")
	setTimeout ->
		$(".alert").remove()
	,200




isMobile = ->
	if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		true
	else
		false









formValidation = (forms,callback=false) ->

	forms.each ->
		form = $(this)

		form.find("input,textarea,select").each ->
			_this = $(this)
			_this.addClass( $(this).attr("type") )
			_this.after("<span class='icon-error icon-"+$(this).attr("type")+"'><span></span>x</span>")
			_this.live "blur", ->

				if !$(this).hasClass("optional") && $(this).attr("type") != "submit" && $(this).attr("type") != "hidden"

					if !_this.val()
						_this.addClass("error")
						_this.parent().addClass("error")
					else
						_this.removeClass("error")
						_this.parent().removeClass("error")

					if _this.hasClass("email")
						if validarEmail( _this, _this.val() ) 
							_this.removeClass("error")
							_this.parent().removeClass("error")
						else
							_this.addClass("error")
							_this.parent().addClass("error")


		if form.find(".rut").length
			form.find("input.rut").each ->
				_this = $(this)
				_this.Rut
					format_on: 'keyup'
					on_success: ->
						_this.removeClass("error")
						_this.parent().removeClass("error")
					on_error: ->
						_this.addClass("error")
						_this.parent().addClass("error")



		form.find("input.number").each ->
			$(this).removeClass("number").wrap("<div class='number'>").after("<button class='mas'>+</button><button class='menos'>-</button>")

		form.find(".number button").live "click", ->

			_input = $(this).parent().find("input")

			_max = parseInt(_input.attr("data-max"))
			_min = parseInt(_input.attr("data-min"))

			_steps = parseInt(_input.attr("data-steps"))
			_steps = 1 if !_steps

			_val = parseInt(_input.val())
			_val = _val + _steps if $(this).hasClass "mas"
			_val = _val - _steps if $(this).hasClass "menos"
			_val = _max if _val >= _max
			_val = _min if _val <= _min

			_input.val(_val)
			
			false

		form.find(".number input").live "blur", ->

			_input = $(this)

			_max = parseInt(_input.attr("data-max"))
			_min = parseInt(_input.attr("data-min"))

			_val = parseInt(_input.val())
			_val = _max if _val >= _max
			_val = _min if _val <= _min

			_input.val(_val)

			true



		form.submit ->

			enviar = true
			_this = $(this) 

			_this.find("input, textarea, select").each ->

				if !$(this).hasClass("optional") && $(this).attr("type") != "submit" && $(this).attr("type") != "hidden"

					if $(this).attr("type") == "checkbox" || $(this).attr("type") == "radio"
						if !$(this).find("input[name='"+$(this).attr("name")+"']:checked").length
							enviar = false
							$(this).addClass("error")
							$(this).parent().addClass("error")
						else
							$(this).removeClass("error")
							$(this).parent().removeClass("error")
					else
						if !$(this).val()
							enviar = false
							$(this).addClass("error")
							$(this).parent().addClass("error")
						else
							$(this).removeClass("error")
							$(this).parent().removeClass("error")

					if $(this).hasClass("email")
						if validarEmail( $(this), $(this).val() ) 
							$(this).removeClass("error")
							$(this).parent().removeClass("error")
						else
							enviar = false
							$(this).addClass("error")
							$(this).parent().addClass("error")


			if enviar == true
				if callback
					callback()
					enviar = false

			#console.log enviar
			return enviar
