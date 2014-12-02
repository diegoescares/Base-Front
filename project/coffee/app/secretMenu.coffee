

app.secretMenu =

	init: ->

		# Compare URL in menu
		###
		url = document.URL
		url_split = url.split("/")
		name_page = url_split[url_split.length-1]
		name_page_split = name_page.split("?") 
		name_page_clear = name_page_split[0]
		li = $(".secretmenu-content a[href='"+name_page_clear+"']").parent("li")
		li.addClass "current-item"
		li.parent().parent("li").addClass "current-item"
		###

		# Desktop
		$(".secretmenu-content ul li a").each ->
			if $(this).parent().find("ul").length
				if !$(this).hasClass("secretmenu-parent")
					$(this).addClass("secretmenu-parent").prepend('<i class="fa fa-chevron-right"></i>')
					$(this).parent().find("ul").prepend '<li><a href="#" class="secretmenu-back"><i class="fa fa-chevron-left"></i> Atrás</a></li>'

		if $(".secretmenu-content ul li.current-item a.secretmenu-parent").length
			app.secretMenu.openLvlDesktop $(".secretmenu-content ul li.current-item a.secretmenu-parent")

		# Mobile

		$(".secretmenu-button").click ->
			if !$("body").hasClass("secretmenu-in")
				app.secretMenu.open $(".secretmenu-content").html()
			else
				app.secretMenu.close()
		$(".secretmenu-container-front").click ->
			if $("body").hasClass("secretmenu-in")
				app.secretMenu.close()
		true

	openLvlDesktop: (element) ->
		ul = element.parent().find("ul")
		ul.addClass("in")
		ul.find("a.secretmenu-back").unbind("click").bind "click", ->
			ul.addClass("out")
			setTimeout ->
				ul.removeClass("in out")
			,700
			false


	open: (html,children=false,direction="left") ->

		length    = $(".secretmenu").length + 1
		container = '<div class="secretmenu secretmenu-lvl-'+($(".secretmenu").length + 1)+'"></div>'

		if !children
			$(".secretmenu-container-back").html(container) 
		else
			$(".secretmenu-container-back").append(container)

		$(".secretmenu").eq(-1).html('<div class="secretmenu-inner">'+html+'</div>')

		$("body").addClass("secretmenu-in secretmenu-"+direction)
		$("body").attr("data-secretmenu-lvl",length)

		# Si tiene hijos
		$(".secretmenu ul li a").each ->
			if $(this).parent().find("ul").length
				if !$(this).hasClass("secretmenu-parent")
					$(this).addClass("secretmenu-parent").prepend('<i class="fa fa-chevron-right"></i>')

		# Click en item de menú
		$(".secretmenu ul li a.secretmenu-parent").unbind("click").bind "click", ->
			app.secretMenu.open "<ul>"+$(this).parent().find("ul").html()+"</ul>", true
			false

		$(".secretmenu a.secretmenu-back").unbind("click").bind "click", ->
			lastmenu = parseInt $("body").attr("data-secretmenu-lvl")
			$("body").attr("data-secretmenu-lvl",(lastmenu-1))
			$(".secretmenu.secretmenu-lvl-"+lastmenu).addClass("out")
			setTimeout ->
				$(".secretmenu.secretmenu-lvl-"+lastmenu).remove()
			,700
			false

	close: ->

		$("body").addClass("secretmenu-out")
		setTimeout ->
			$("body").removeClass "secretmenu-in secretmenu-out secretmenu-left secretmenu-right secretmenu-lvl-"+$("body").attr("data-secretmenu-lvl")
			$("body").removeAttr("data-secretmenu-lvl")
			$(".secretmenu").remove()
		,700


