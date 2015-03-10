

app.tabs = 
	init: ->
		$(".tabs").each ->
			tab = $(this)
			app.tabs.open(tab,0)
			tab.find(".tabs-header .tab").click (e) ->
				index = $(this).index()
				app.tabs.open tab,index
				e.preventDefault()

	open: (tab,index) ->
		tab.find(".tabs-header .tab").removeClass("tab-active")
		tab.find(".tabs-header .tab").eq(index).addClass("tab-active")
		tab.find(".tabs-body .tab").removeClass("tab-active")
		tab.find(".tabs-body .tab").eq(index).addClass("tab-active")

