

app =

	init: ->

		# Clase IE
		$("body").addClass "ie" + parseInt($.browser.version) if $.browser.msie

		# Mobile
		if app.isMobile()
			$(".displayscroll").addClass("in")

		# IE
		if ($.browser.msie && parseInt($.browser.version) <= 8) || navigator.appVersion.indexOf('Trident/')!=-1
			$(".displayscroll").addClass("in")
			$("body").addClass("ie")
			if parseInt($.browser.version) <= 7
				app.alert.open
					title: "Estás usando un navegador muy antiguo"
					content: "Actualiza tu navegador ahora y disfruta de una mejor experiencia en Falabella Novios."
					buttons: "<a href='http://browsehappy.com/?locale=es' target='_blank' class='button button-primary button-big'>Actualizar ahora</a>"
					static: true
		else
			$("head").append "<link href='http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>"

		# Menú
		app.secretMenu.init()

		# Shares
		app.shares.init()

		# Tooltips
		app.tooltips()

		# Alertas
		app.alert.equidist()
		setTimeout ->
			app.alert.equidist()
		,1000

		# Validación de formularios
		app.validation.form $(".controls")

		# Mapa
		app.gmap()

		# Eventos en scroll
		app.scroll()

		# Plugins
		#app.plugins.init()
