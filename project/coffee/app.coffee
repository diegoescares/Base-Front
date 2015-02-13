
$(document).ready ->
	app.init()

app =

	init: ->

		# Browsers
		app.browsers()

		# Menú
		app.secretmenu.init()

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

		# Tools
		app.tools()

		# Actions
		app.actions.init()


#=include_tree app
