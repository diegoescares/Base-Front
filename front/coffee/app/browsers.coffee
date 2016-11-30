
app.isMobile = ->
	if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		true
	else
		false

app.browsers =
	init: ->

		# Mobile
		if app.isMobile()
			$("html").addClass("is-mobile")

		# IE
		if $("html").hasClass("lt-ie9")
			app.modal.open
				title: "Estás usando un navegador muy antiguo"
				content: "Actualiza tu navegador ahora y disfruta de una experiencia mucho mejor."
				buttons: "<a href='http://browsehappy.com/?locale=es' target='_blank' class='button button-primary button-big'>Actualizar ahora</a>"
				#static: true
		