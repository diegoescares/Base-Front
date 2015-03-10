

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

