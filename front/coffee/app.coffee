
app = []
#=include_tree app
#=include_tree site

$(document).ready ->
	app.init()



app.init = ->

	# Menú
	app.activelinks.init()

	# Browsers classes
	app.browsers.init()

	# Shares
	app.shares.init()

	# Tooltips
	app.tooltips.init()

	# Modal
	app.modal.init()

	# Mapa
	app.gmap.init()

	# Eventos en scroll
	app.scroll.init()

	# Slider
	app.slider.init()

	# Youtube insert iframe
	app.youtube.init()

	# Faq
	app.faq.init()

	# Tabs
	app.tabs.init()

	# Gallery
	app.gallery.init()

	# Validation forms
	app.forms.init()

	# Preview file input
	#app.previewfile.init()

	# Actions
	app.actions.init()



