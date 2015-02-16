
app.tools = ->
	app.video.init()
	app.goto.init()
	app.faq.init()
	app.previewfile.init()
	app.placeholder.init()
	app.tabs.init()


app.video = 
	init: ->
		$("[data-video]").click ->
			app.video.insert $(this)
	insert: (element) ->
		id = element.attr("data-video")
		element.addClass("video-playing")
		element.append '<iframe width="420" height="315" src="//www.youtube.com/embed/'+id+'?rel=0&controls=1&showinfo=0&autoplay=1&autohide=1" frameborder="0" allowfullscreen></iframe>'


app.goto =
	init: ->
		$("[data-goto]").click (e) ->
			to = $(this).attr "data-goto"
			app.goto.to to
			e.preventDefault()
	to: (to,add=0) ->
		top = $(to).offset().top - $(".header-primary").height() - add - $("header .header-top").height()
		$("body").animate
			scrollTop: top


app.faq =
	init: ->
		$(".faq").each ->
			faq = $(this)
			faq.find(".faq-item:not(.faq-open) .faq-answer").hide()
			faq.find(".faq-question").click ->
				faq_index = $(this).parent().index()
				$(".faq .faq-item").each ->
					if $(this).index() == faq_index
						$(this).find(".faq-answer").slideToggle()
						$(this).toggleClass("faq-open")
					else
						$(this).find(".faq-answer").slideUp()
						$(this).removeClass("faq-open")


app.tabs = 
	init: ->
		$(".tabs").each ->
			tab = $(this)
			tab.find(".tabs-header .tab").eq(0).addClass("tab-active")
			tab.find(".tabs-body .tab").eq(0).addClass("tab-active")
			tab.find(".tabs-header .tab").click (e) ->
				index = $(this).index()
				app.tabs.open tab,index
				e.preventDefault()

	open: (tab,index) ->
		tab.find(".tabs-header .tab").removeClass("tab-active")
		tab.find(".tabs-header .tab").eq(index).addClass("tab-active")
		tab.find(".tabs-body .tab").removeClass("tab-active")
		tab.find(".tabs-body .tab").eq(index).addClass("tab-active")


app.previewfile =
	init: ->
		$("input[type='file'][data-to]").live "change", (evt) ->
			esto = $(this)
			files = evt.target.files
			esto.parent(".prev").children(".sel").html ""
			i = 0
			f = undefined
			to = $(this).attr("data-to")

			while f = files[i]
				#console.log f
				continue unless f.type.match("image.*")
				reader = new FileReader()
				reader.onload = ((theFile) ->
					(e) ->
						$(to).html "<div class='preview'><div class='preview-bg' style='background-image:url(" + e.target.result + ")'></div><img src='" + e.target.result + "'' /></div>"
					)(f)
				reader.readAsDataURL f
				i++


app.placeholder =
	init: ->

		$("[placeholder]").focus(->
			input = $(this)
			if input.val() is input.attr("placeholder")
				input.val ""
				input.removeClass "placeholder"
		).blur(->
			input = $(this)
			if input.val() is "" or input.val() is input.attr("placeholder")
				input.addClass "placeholder"
				input.val input.attr("placeholder")
		).blur()

		$("[placeholder]").parents("form").submit ->
			$(this).find("[placeholder]").each ->
				input = $(this)
				input.val ""  if input.val() is input.attr("placeholder")


