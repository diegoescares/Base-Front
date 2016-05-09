

app.activelinks = 

	init: ->

		url = document.URL

		name_page_clear = url

		name_page_split = name_page_clear.split("?") 
		name_page_clear = name_page_split[0]

		name_page_split = name_page_clear.split("#") 
		name_page_clear = name_page_split[0]

		if window.location.hostname == "localhost"
			name_page_split = name_page_clear.split("/")
			name_page_clear = name_page_split[name_page_split.length-1]

		a = $("header a[href='"+name_page_clear+"']")
		li = a.parent("li")

		a.addClass "current"
		li.addClass "current-menu-item"
		li.parent().parent("li").addClass "current-menu-item"

