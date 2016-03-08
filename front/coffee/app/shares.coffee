

app.shares =

	init: ->

		# Cambia el href para que se abra la aplicación nativa (sólo mobile)
		$(".share").each ->
			app.shares.nativeShare $(this)

		# Si no, o si no existe el nativeshare, se usa el webshare
		$(document).on "click", ".share:not(.share-nativeapp)", (e) ->
			app.shares.webShare $(this)
			e.preventDefault()


	nativeShare: (element) ->

		if app.isMobile()
			share_url  = encodeURIComponent(element.attr("data-url")) if element.attr("data-url")
			share_url  = encodeURIComponent(element.attr("href")) if !share_url
			share_text = encodeURIComponent(element.attr("data-text")) if element.attr("data-text")

			#if element.is(".share-facebook")
			#	element.addClass("share-nativeapp").attr "href", "fb://qp?post="+share_text+"&message="+share_text+"&text="+share_text+"&href="+share_url+"&u="+share_url+"&url="+share_url

			if element.is(".share-twitter")
				element.addClass("share-nativeapp").attr "href", "twitter://post?message="+share_text+"&url="+share_url

			if element.is(".share-whatsapp")
				element.addClass("share-nativeapp").attr "href", "whatsapp://send?text="+share_text+encodeURIComponent(" ")+share_url

		else
			if element.is(".share-whatsapp")
				$(".share-whatsapp").remove()


	webShare: (element) ->

		share_url  = encodeURIComponent(element.attr("data-url")) if element.attr("data-url")
		share_url  = encodeURIComponent(element.attr("href")) if !share_url
		share_text = encodeURIComponent(element.attr("data-text")) if element.attr("data-text")
		share_img  = encodeURIComponent(element.attr("data-img")) if element.attr("data-img")

		if element.is(".share-facebook")
			app.shares.webSharePopup "https://www.facebook.com/sharer/sharer.php?u="+share_url, 500, 310

		if element.is(".share-twitter")
			app.shares.webSharePopup "https://twitter.com/intent/tweet?source=webclient&amp;text="+share_text+"&amp;url="+share_url, 500, 310

		if element.is(".share-pinterest")
			app.shares.webSharePopup "http://pinterest.com/pin/create/button/?url="+share_url+"&media="+share_img+"&description="+share_text, 620, 310

		if element.is(".share-googleplus")
			app.shares.webSharePopup "https://plus.google.com/share?url="+share_url, 500, 310

		if element.is(".share-linkedin")
			app.shares.webSharePopup "http://www.linkedin.com/shareArticle?mini=true&url="+share_url+"&title="+share_text+"&summary="+share_text+"&source="+share_url, 500, 420


	webSharePopup: (url, w, h) ->
		left = ( $(window).width() / 2 )  - (w / 2)
		top  = ( $(window).height() / 2 ) - (h / 2)
		return window.open(url, "Compartir", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left)

