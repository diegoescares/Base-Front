

app.shares =

	init: ->


		# Cambia el href para que se abra la aplicación nativa

		$(".share").each ->

			share = $(this)
			share_text = encodeURIComponent( share.attr("data-text") )
			share_url  = encodeURIComponent( share.attr("href") )

			#if share.is(".share-facebook")
			#	if app.isMobile()
			#		share.attr "href", "fb://qp?post="+share_text+"&message="+share_text+"&text="+share_text+"&href="+share_url+"&u="+share_url+"&url="+share_url

			if share.is(".share-twitter")
				if app.isMobile()
					share.addClass("share-nativeapp").attr "href", "twitter://post?message="+share_text+"&url="+share_url

			if share.is(".share-whatsapp")
				if app.isMobile()
					share.addClass("share-nativeapp").attr "href", "whatsapp://send?text="+share_text+encodeURIComponent(" ")+share_url
				else
					$(".share-whatsapp").remove()


		# Si no, usa el popup en desktop

		$(document).on "click", ".share", (e) ->
			if !$(this).is(".share-nativeapp")
				app.shares.share $(this)
				e.preventDefault()



	share: (element) ->

		share_url = encodeURIComponent(element.attr("href"))
		share_text = encodeURIComponent(element.attr("data-text"))
		share_img = encodeURIComponent(element.attr("data-img"))

		if element.is(".share-facebook")
			app.shares.popupWindow "https://www.facebook.com/sharer/sharer.php?u="+share_url, 500, 310

		if element.is(".share-twitter")
			app.shares.popupWindow "https://twitter.com/intent/tweet?source=webclient&amp;text="+share_text+"&amp;url="+share_url, 500, 310

		if element.is(".share-pinterest")
			app.shares.popupWindow "http://pinterest.com/pin/create/button/?url="+share_url+"&media="+share_img+"&description="+share_text, 620, 310

		if element.is(".share-googleplus")
			app.shares.popupWindow "https://plus.google.com/share?url="+share_url, 500, 310

		if element.is(".share-linkedin")
			app.shares.popupWindow "http://www.linkedin.com/shareArticle?mini=true&url="+share_url+"&title="+share_text+"&summary="+share_text+"&source="+share_url, 500, 420


	popupWindow: (url, w, h) ->
		left = ( $(window).width() / 2 )  - (w / 2)
		top  = ( $(window).height() / 2 ) - (h / 2)
		return window.open(url, "Compartir", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left)

