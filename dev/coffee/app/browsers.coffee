
app.isMobile = ->
	if /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		true
	else
		false

app.browsers = ->

	# Mobile
	if app.isMobile()
		$("body").addClass("is-mobile")

	# IE
	if $.browser.msie || navigator.appVersion.indexOf('Trident/')!=-1
		$("body").addClass("is-ie")
		$("body").addClass("is-ie"+$.browser.version)
		if parseInt($.browser.version) <= 7
			app.alert.open
				title: "Estás usando un navegador muy antiguo"
				content: "Actualiza tu navegador ahora y disfruta de una mejor experiencia en Falabella Novios."
				buttons: "<a href='http://browsehappy.com/?locale=es' target='_blank' class='button button-primary button-big'>Actualizar ahora</a>"
				static: true
