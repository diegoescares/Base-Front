
$(document).ready ->
	app.init()

app =

	init: ->

		# Browsers
		app.browsers()

		# Menú
		app.secretMenu.init()

		# Shares
		app.shares.init()

		# Tooltips
		app.tooltips()

		# Alertas
		app.alert.init()

		# Validación de formularios
		app.validation.form $(".controls")

		# Loading
		app.loading.init()

		# Mapa
		app.gmap()

		# Eventos en scroll
		app.scroll()

		# Plugins
		app.plugins.init()

		# Tools
		app.tools()

#=include_tree app
