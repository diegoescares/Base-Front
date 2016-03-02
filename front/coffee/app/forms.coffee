
app.forms =

	init: ->


		# Label checked class

		checkradio = "input[type='checkbox'], input[type='radio']"

		$(checkradio).each ->
			if $(this).is(":checked")
				$(this).closest("label").addClass("label-checked")
			else
				$(this).closest("label").removeClass("label-checked")
		
		$(checkradio).change ->
			$(checkradio).each ->
				if $(this).is(":checked")
					$(this).closest("label").addClass("label-checked")
				else
					$(this).closest("label").removeClass("label-checked")



		# Date format


		$("input[type='date']").attr("type","text").addClass("input-date")
		 
		$(".input-date").attr("maxlength",10).attr("placeholder","dd-mm-aaaa").keyup (e) ->
			if e.which != 8 && e.which != 189
				app.formatDate $(this)

		$(".input-date").change ->
			app.formatDate $(this), true





	validate: (containers,callback=false) ->

		containers.each ->

			container = $(this)

			container.find("input,textarea,select").on "blur, change", ->
				app.forms.validateInput $(this)

			container.find("[type='submit'],.button").click (e) ->

				e.preventDefault()

				send = true

				container.find("input,textarea,select").each ->
					app.forms.validateInput($(this),true)

				diverror = container.find(".control-error").eq(0)

				if diverror.length

					send = false
					top = diverror.offset().top - $(".header-top").height() - 50

					app.goto.to "html,body"

					setTimeout ->
						diverror.find("input,textarea,select").eq(0).focus()
					,500

				if send == true

					if callback
						callback()
					else
						# Traditional post
						if container.is("form")
							container.submit()
						else
							container.closest("form").submit()




	validateInput: (input,validateEmpty=false) ->

		parent = input.closest(".control-value")

		controls = input.closest(".controls")
		control  = input.closest(".control")

		fvErrors =
			"empty": "Requerido"
			"emptySelect": "Requerido"
			"emptyRadio": "Selecciona una opción"
			"emptyCheckbox": "Selecciona al menos una opción"
			"invalid": "Inválido"
			"invalidRepeat": "No es igual a la anterior"
			"invalidPass": "Debe ser mayor a 6 carácteres"
			"terms": "Debes aceptar los términos legales"


		if !input.hasClass("optional") && input.attr("type")!="submit" && input.attr("type")!="hidden" && input.attr("name")

			error = false
			
			if !input.val()

				# Validar si el campo se llena (opcional)
				if validateEmpty == true
					if input.is("select")
						app.forms.validateInputMessage(input,fvErrors.emptySelect)
					else
						app.forms.validateInputMessage(input,fvErrors.empty)
			else

				# Validar email
				if input.is("[type='email']")
					if ! app.forms.email( input, input.val() ) 
						app.forms.validateInputMessage(input,fvErrors.invalid)
						error = true


				# Validar contraseña
				if input.is("[type='password']")
					if input.val().length < 6
						app.forms.validateInputMessage(input,fvErrors.invalidPass)
						error = true


				# Validar repetir contraseña
				if input.is("[data-repeat]")
					if input.val() != controls.find("[name='"+input.attr("data-repeat")+"']").val()
						if input.is("[type='password']")
							app.forms.validateInputMessage(input,fvErrors.invalidRepeat)
							error = true
						if input.is("[type='email']")
							app.forms.validateInputMessage(input,fvErrors.invalidRepeat)
							error = true


				# Validar checkboxs/radios
				if (input.is("[type='checkbox']") || input.is("[type='radio']"))
					if !controls.find("input[name='"+input.attr("name")+"']:checked").length
						app.forms.validateInputMessage(input,fvErrors.emptyCheckbox) if input.is("[type='checkbox']")
						app.forms.validateInputMessage(input,fvErrors.emptyRadio)    if input.is("[type='radio']")
						app.forms.validateInputMessage(input,fvErrors.terms)         if input.is(".input-terms")
						error = true
						parent.find(".control-error").removeClass("error")


				# Validar RUT
				if input.is(".input-rut")
					input.val( $.Rut.formatear($.Rut.quitarFormato(input.val()),$.Rut.getDigito($.Rut.quitarFormato(input.val()))) )
					if !$.Rut.validar(input.val())
						app.forms.validateInputMessage(input,fvErrors.invalid)
						error = true

				# Validar select
				if input.is("select") && input.val().indexOf("elecciona") > 0
					app.forms.validateInputMessage(input,fvErrors.emptySelect)
					error = true


				# Si no hay errores, se quita el mensaje de error
				if error == false
					app.forms.validateInputMessage(input,false)



	validateInputMessage: (input,message) ->
		if message
			control = input.closest(".control")
			control.addClass("control-error")
			control.find(".control-name").find(".control-message").remove()
			control.find(".control-name").append(" <span class='control-message'>"+message+"</span>")

		else
			control = input.closest(".control")
			control.removeClass("control-error")	
			control.find(".control-name").find(".control-message").remove()



	email: (elemento,valor) ->
		if /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)
			return true
		else
			return false



