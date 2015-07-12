
app = []
#=include_tree app
#=include_tree site

$(document).ready ->
	app.init()



app.init = ->

	# Menú
	app.secretmenu.init()

	# Menú
	app.activelinks.init()

	# Browsers classes
	app.browsers.init()

	# Shares
	app.shares.init()

	# Tooltips
	app.tooltips.init()

	# Alertas
	app.alert.init()

	# Loading
	app.loading.init()

	# Mapa
	app.gmap.init()

	# Eventos en scroll
	app.scroll.init()

	# Slider
	app.slider.init()

	# Youtube insert iframe
	app.youtube.init()

	# Goto scroll
	app.goto.init()

	# Faq
	app.faq.init()

	# Tabs
	app.tabs.init()

	# Validation forms
	app.forms.init()

	# Preview file input
	#app.previewfile.init()

	# Actions
	app.actions.init()



