

app.secretmenu =

	init: ->

		secretmenu_mouseenter = false


		# Copy links in menu
		if $(".secretmenu-lvl").length
			if $(".secretmenu-lvl").attr("data-copy")
				$(".secretmenu-lvl").html $( $(".secretmenu-lvl").attr("data-copy") ).html()
			if $(".secretmenu-lvl").attr("data-copy-2")
				$(".secretmenu-lvl").append $( $(".secretmenu-lvl").attr("data-copy-2") ).html()


		# Icon in lvl parents

		$(".secretmenu a").each ->
			brother = $(this).parent("li").children("ul")
			if brother.length
				$(this).prepend "<span class='fa fa-angle-right'></div>"

		app.secretmenu.lvl.init()


		# Button menu

		$(".secretmenu-button").html ''+
			'<div class="secretmenu-button-bars">'+
			'	<div class="secretmenu-button-bar"></div>'+
			'	<div class="secretmenu-button-bar"></div>'+
			'	<div class="secretmenu-button-bar"></div>'+
			'</div>'

		$(".secretmenu-button").click ->

			if !$("body").hasClass("secretmenu-in")
				app.secretmenu.open()

			else
				if !$("body").hasClass("secretmenu-opening")
					app.secretmenu.close()

		if secretmenu_mouseenter

			$(".secretmenu-button").mouseenter ->
				if $(window).width() >= 720
					app.secretmenu.open()

			$("header").mouseleave ->
				if $(window).width() >= 720
					app.secretmenu.close()



	open:  ->
		if !$("body").hasClass("secretmenu-in")
			$("body").addClass("secretmenu-in secretmenu-right")
			$("body").addClass("secretmenu-opening")
			setTimeout ->
				$("body").removeClass("secretmenu-opening")
			,700

	close: ->
		if $("body").hasClass("secretmenu-in")
			$("body").removeClass("secretmenu-in")
			$("body").addClass("secretmenu-out")
			setTimeout ->
				$("body").removeClass("secretmenu-out")
				app.secretmenu.lvl.closeall()
			,700


	lvl:

		init: ->

			$(".secretmenu a").unbind("click").bind "click", (e) ->
				parent = $(this).parent("li").parent("ul")
				brother = $(this).parent("li").children("ul")
				if brother.length
					e.preventDefault()

					$(".secretmenu-lvl").eq(-1).after ""+
						"<div class='secretmenu-lvl'>"+
							"<ul>"+
								"<li><a href='#' class='secretmenu-back'><span class='fa fa-angle-left'></span> Atrás</a></li>"+
								brother.html()+
							"</ul>"+
						"</div>"

					app.secretmenu.lvl.open()
					app.secretmenu.lvl.init()

			$(".secretmenu .secretmenu-back").unbind("click").bind "click", ->
				app.secretmenu.lvl.close()

		open: ->

			$(".secretmenu-lvl").eq(-1).addClass("secretmenu-lvl-enter")
			$(".secretmenu-lvl").eq(-2).addClass("secretmenu-lvl-prev")

		close: ->
			$(".secretmenu-lvl").eq(-1).addClass("secretmenu-lvl-leave")
			$(".secretmenu-lvl").eq(-2).removeClass("secretmenu-lvl-prev")
			setTimeout ->
				$(".secretmenu-lvl-leave").remove()
			,700

		closeall: ->
			$(".secretmenu-lvl").removeClass("secretmenu-lvl-prev secretmenu-lvl-enter")
			$(".secretmenu-lvl:not(:first-child)").remove()



