

app.faq =

	init: ->
		$(".faq").each ->
			faq = $(this)
			faq.find(".faq-item:not(.faq-open) .faq-answer").hide()
			faq.find(".faq-question").click ->
				index = $(this).parent().index()
				app.faq.open faq, index

	open: (faq,index) ->
		faq.find(".faq-item").each ->
			if $(this).index() == index
				$(this).find(".faq-answer").slideToggle()
				$(this).toggleClass("faq-open")
			else
				$(this).find(".faq-answer").slideUp()
				$(this).removeClass("faq-open")
