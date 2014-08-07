
_in = (element) ->
	element.addClass("in")

_out = (element) ->
	element.addClass("out")
	setTimeout ->
		element.removeClass("in out")
	,500




secretMenu = ->
	$(".secretmenu-button").click ->
		if !$("body").hasClass("secretmenu-in")
			secretMenuOpen( $(".secretmenu-content").html() )
		else
			secretMenuClose()
	$(".secretmenu-container-front").click ->
		if $("body").hasClass("secretmenu-in")
			secretMenuClose()

secretMenuOpen = (html,children=false,direction="left") ->

	length    = $(".secretmenu").length + 1
	container = '<div class="secretmenu secretmenu-lvl-'+($(".secretmenu").length + 1)+'"></div>'

	if !children
		$(".secretmenu-container-back").html(container) 
		back =""
	else
		$(".secretmenu-container-back").append(container)
		back ='<a href="#" class="secretmenu-back"><i class="fa fa-chevron-left"></i> Atrás</a>'

	$(".secretmenu").eq(-1).html('<div class="secretmenu-inner">'+back+html+'</div>')

	$("body").addClass("secretmenu-in secretmenu-"+direction)
	$("body").attr("data-secretmenu-lvl",length)

	# Si tiene hijos
	$(".secretmenu ul li a").each ->
		if $(this).parent().find("ul").length
			if !$(this).hasClass("secretmenu-parent")
				$(this).addClass("secretmenu-parent").prepend('<i class="fa fa-chevron-right"></i>')

	# Click en item de menú
	$(".secretmenu ul li a.secretmenu-parent").unbind("click").bind "click", ->
		secretMenuOpen("<ul>"+$(this).parent().find("ul").html()+"</ul>",true)
		false

	$(".secretmenu a.secretmenu-back").unbind("click").bind "click", ->
		lastmenu = parseInt $("body").attr("data-secretmenu-lvl")
		$("body").attr("data-secretmenu-lvl",(lastmenu-1))
		$(".secretmenu.secretmenu-lvl-"+lastmenu).addClass("out")
		setTimeout ->
			$(".secretmenu.secretmenu-lvl-"+lastmenu).remove()
		,700
		false

secretMenuClose = ->
	$("body").addClass("secretmenu-out")
	setTimeout ->
		$("body").removeClass "secretmenu-in secretmenu-out secretmenu-left secretmenu-right secretmenu-lvl-"+$("body").attr("data-secretmenu-lvl")
		$("body").removeAttr("data-secretmenu-lvl")
		$(".secretmenu").remove()
	,700





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
		close = '<button class="close false"><i class="fa fa-times"></i></button>'

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









fvInputMessage = (input,message) ->
	if message
		input.addClass("error")
		parent = input.closest(".control-value")
		parent.addClass("error")
		parent.find(".control-error").text(message).addClass("in")
	else
		input.removeClass("error")
		parent = input.closest(".control-value")
		parent.removeClass("error")	
		parent.find(".control-error").addClass("out")
		setTimeout ->
			parent.find(".control-error").removeClass("in out").text("")
		,500


fvInput = (input,validateEmpty=false) ->

	parent = input.closest(".control-value")

	fvErrors = {
		"empty": "Este campo es requerido",
		"emptySelect": "Selecciona una opción",
		"emptyRadio": "Selecciona una opción",
		"emptyCheckbox": "Selecciona al menos una opción",
		"invalidEmail": "Email inválido",
		"invalidPass": "La contraseña debe ser mayor a 6 carácteres"
		"invalidPassRepeat": "La contraseña no es igual a la anterior"
		"invalidRut": "RUT inválido",
		"terms": "Debes aceptar los términos legales",
	}


	if !input.hasClass("optional") && input.attr("type")!="submit" && input.attr("type")!="hidden"

		error = false
		
		if !input.val()

			# Validar si el campo se llena (opcional)
			if validateEmpty == true
				if input.is("select")
					fvInputMessage(input,fvErrors.emptySelect)
				else
					fvInputMessage(input,fvErrors.empty)
		else

			# Validar email
			if input.is("[type='email']")
				if ! validarEmail( input, input.val() ) 
					fvInputMessage(input,fvErrors.invalidEmail)
					error = true


			# Validar contraseña
			if input.is("[type='password']")
				if input.val().length < 6
					fvInputMessage(input,fvErrors.invalidPass)
					error = true


			# Validar repetir contraseña
			if input.is("[data-repeat]")
				if input.val() != $("[name='"+input.attr("data-repeat")+"']").val()
					fvInputMessage(input,fvErrors.invalidPassRepeat)
					error = true


			# Validar checkboxs/radios
			if (input.is("[type='checkbox']") || input.is("[type='radio']"))
				if !parent.find("input[name='"+input.attr("name")+"']:checked").length					
					fvInputMessage(input,fvErrors.emptyCheckbox) if input.is("[type='checkbox']")
					fvInputMessage(input,fvErrors.emptyRadio)    if input.is("[type='radio']")
					error = true
					parent.find(".error").removeClass("error")


			# Validar RUT
			if input.is(".rut")
				input.val( $.Rut.formatear($.Rut.quitarFormato(input.val()),$.Rut.getDigito($.Rut.quitarFormato(input.val()))) )
				if !$.Rut.validar(input.val())
					fvInputMessage(input,fvErrors.invalidRut)
					error = true

			# Si no hay errores, se quita el mensaje de error
			if error == false
				fvInputMessage(input,false)


formValidation = (forms,callback=false) ->

	forms.each ->

		form = $(this)

		form.find(".control .control-value").append("<div class='control-error'></div>")

		form.find("input,textarea,select").each ->
			input = $(this)
			input.addClass( $(this).attr("type") )
			input.live "blur, change", ->
				fvInput(input)
			
		form.submit ->

			send = true
			form = $(this) 

			form.find("input,textarea,select").each ->
				fvInput($(this),true)

			diverror = form.find(".error").eq(0)
			if diverror.length
				send = false
				top = diverror.offset().top - $("header").height() - 30

				$("html,body").animate
					scrollTop: top

				setTimeout ->
					diverror.find("input").eq(0).focus()
				,500

			if send == true
				if callback
					callback()
					send = false

			return send






scrolls = []

setScroll = (element) ->
	id = element.attr("id")
	if element.is(":visible")
		if element.hasClass("iscroll-loaded")
			scrolls[id].refresh()
			console.log "refresh"
		else
			console.log id
			scrolls[id] = new IScroll("#"+id,
				scrollX: true
				mouseWheel: true
				bounce: true
				scrollbars: "custom"
			)
			element.addClass("iscroll-loaded")



setTooltips = ->
	$("[data-tooltip]").each ->
		pos = $(this).attr("data-tooltip-position")
		pos = "bottom" if !pos
		$(this).addClass "tooltip-parent"
		$(this).append "<span class='tooltip tooltip-"+pos+"'><span class='tooltip-container'><span class='tooltip-triangle'></span><span class='tooltip-content'>" + $(this).attr("data-tooltip") + "</span></span></span>"








