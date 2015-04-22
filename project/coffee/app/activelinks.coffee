

app.activelinks = 

	init: ->

		url = document.URL

		name_page_clear = url

		name_page_split = name_page_clear.split("?") 
		name_page_clear = name_page_split[0]

		name_page_split = name_page_clear.split("#") 
		name_page_clear = name_page_split[0]

		console.log name_page_clear

		name_page_split = name_page_clear.split("/")
		name_page_end = name_page_split[name_page_split.length-1]


		console.log name_page_end


		a = $("header a[href$='"+name_page_end+"']")
		li = a.parent("li")

		a.addClass "current"

		li.addClass "current-menu-item"
		li.parent().parent("li").addClass "current-menu-item"


