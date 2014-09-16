


app.validation =

	form: (forms,callback=false) ->

		forms.each ->

			form = $(this)

			form.find(".control .control-value").append("<div class='control-message'></div>")

			form.find("input,textarea,select").each ->
				input = $(this)				
				input.addClass( "input-"+$(this).attr("type") ) if $(this).is "input"
				input.addClass( "disabled" ) if input.is(":disabled")
				input.live "blur, change", ->
					app.validation.formInput(input)

			form.find(".input-checkbox, .input-radio").each ->
				if $(this).is(":checked")
					$(this).closest("label").addClass("checked")
				else
					$(this).closest("label").removeClass("checked")
			
			form.find(".input-checkbox, .input-radio").change ->
				form.find(".input-checkbox, .input-radio").each ->
					if $(this).is(":checked")
						$(this).closest("label").addClass("checked")
					else
						$(this).closest("label").removeClass("checked")


			form.find("input.number").each ->
				$(this).removeClass("number").wrap("<div class='number'>").after("<div class='number-button number-more'>+</div><div class='number-button number-less'>-</div>")

			form.find(".number .number-button").live "click", ->

				_input = $(this).parent().find("input")

				_max = parseInt(_input.attr("data-max"))
				_min = parseInt(_input.attr("data-min"))
				_min = 1 if !_min

				_steps = parseInt(_input.attr("data-steps"))
				_steps = 1 if !_steps

				_val = parseInt(_input.val())
				_val = _val + _steps if $(this).hasClass "number-more"
				_val = _val - _steps if $(this).hasClass "number-less"
				_val = _max if _val >= _max
				_val = _min if _val <= _min

				_input.val(_val)
				
				false

			form.find(".number input").live "blur", ->

				_input = $(this)

				_max = parseInt(_input.attr("data-max"))
				_min = parseInt(_input.attr("data-min"))
				_min = 1 if !_min

				_val = parseInt(_input.val())
				_val = _max if _val >= _max
				_val = _min if _val <= _min

				_input.val(_val)

				true



			form.submit ->

				send = true
				form = $(this) 

				form.find("input,textarea,select").each ->
					app.validation.formInput($(this),true)

				diverror = form.find(".control-error").eq(0)

				if diverror.length

					send = false
					top = diverror.offset().top - $(".header-top").height() - 25

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


	formInput: (input,validateEmpty=false) ->

		parent = input.closest(".control-value")

		controls = input.closest(".controls")
		control  = input.closest(".control")

		fvErrors = {
			"empty": "Este campo es requerido",
			"emptySelect": "Selecciona una opción",
			"emptyRadio": "Selecciona una opción",
			"emptyCheckbox": "Selecciona al menos una opción",
			"invalidEmail": "Email inválido",
			"invalidEmailRepeat": "El email ingresado no es igual al anterior"
			"invalidPass": "La contraseña debe ser mayor a 6 carácteres"
			"invalidPassRepeat": "La contraseña no es igual a la anterior"
			"invalidRut": "RUT inválido",
			"terms": "Debes aceptar los términos legales",
		}


		if !input.hasClass("optional") && input.attr("type")!="submit" && input.attr("type")!="hidden" && input.attr("name")

			error = false
			
			if !input.val()

				# Validar si el campo se llena (opcional)
				if validateEmpty == true
					if input.is("select")
						app.validation.formInputMessage(input,fvErrors.emptySelect)
					else
						app.validation.formInputMessage(input,fvErrors.empty)
			else

				# Validar email
				if input.is("[type='email']")
					if ! app.validation.email( input, input.val() ) 
						app.validation.formInputMessage(input,fvErrors.invalidEmail)
						error = true


				# Validar contraseña
				if input.is("[type='password']")
					if input.val().length < 6
						app.validation.formInputMessage(input,fvErrors.invalidPass)
						error = true


				# Validar repetir contraseña
				if input.is("[data-repeat]")
					if input.val() != controls.find("[name='"+input.attr("data-repeat")+"']").val()
						if input.is("[type='password']")
							app.validation.formInputMessage(input,fvErrors.invalidPassRepeat)
							error = true
						if input.is("[type='email']")
							app.validation.formInputMessage(input,fvErrors.invalidEmailRepeat)
							error = true


				# Validar checkboxs/radios
				if (input.is("[type='checkbox']") || input.is("[type='radio']"))
					if !controls.find("input[name='"+input.attr("name")+"']:checked").length
						app.validation.formInputMessage(input,fvErrors.emptyCheckbox) if input.is("[type='checkbox']")
						app.validation.formInputMessage(input,fvErrors.emptyRadio)    if input.is("[type='radio']")
						app.validation.formInputMessage(input,fvErrors.terms)         if input.is(".input-terms")
						error = true
						parent.find(".control-error").removeClass("error")


				# Validar RUT
				if input.is(".rut")
					input.val( $.Rut.formatear($.Rut.quitarFormato(input.val()),$.Rut.getDigito($.Rut.quitarFormato(input.val()))) )
					if !$.Rut.validar(input.val())
						app.validation.formInputMessage(input,fvErrors.invalidRut)
						error = true

				# Si no hay errores, se quita el mensaje de error
				if error == false
					app.validation.formInputMessage(input,false)



	formInputMessage: (input,message) ->
		if message
			input.addClass("control-error")
			parent = input.closest(".control-value")
			parent.addClass("control-error")
			parent.find(".control-message").text(message).addClass("in")
		else
			input.removeClass("control-error")
			parent = input.closest(".control-value")
			parent.removeClass("control-error")	
			parent.find(".control-message").addClass("out")
			setTimeout ->
				parent.find(".control-message").removeClass("in out").text("")
			,500



	email: (elemento,valor) ->
		if /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)
			return true
		else
			return false



