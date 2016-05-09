
app.tabs = 

	init: ->
		$(".tabs").each ->
			tab = $(this)
			if !tab.find(".tab-active").length
				app.tabs.open(tab,0)
			tab.find(".tabs-header .tab").click (e) ->
				e.preventDefault()
				index = $(this).index()
				app.tabs.open tab,index

	open: (tab,index) ->
		tab.find(".tabs-header .tab").removeClass("tab-active")
		tab.find(".tabs-header .tab").eq(index).addClass("tab-active")
		tab.find(".tabs-body .tab").removeClass("tab-active")
		tab.find(".tabs-body .tab").eq(index).addClass("tab-active")

