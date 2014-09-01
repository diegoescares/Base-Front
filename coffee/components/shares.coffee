

app.shares =

	init: ->
		$(".share").click ->
			app.shares.share $(this)

	share: (element) ->

		share_url = encodeURIComponent(element.attr("data-url"))
		share_text = encodeURIComponent(element.attr("data-text"))
		share_img = encodeURIComponent(element.attr("data-img"))

		if(element.hasClass("share-facebook"))
			app.shares.popupWindow "https://www.facebook.com/sharer/sharer.php?u="+share_url, 500, 310

		if(element.hasClass("share-twitter"))
			app.shares.popupWindow "https://twitter.com/intent/tweet?source=webclient&amp;text="+share_text+"&amp;url="+share_url, 500, 310

		if(element.hasClass("share-pinterest"))
			app.shares.popupWindow "http://pinterest.com/pin/create/button/?url="+share_url+"&media="+share_img+"&description="+share_text, 620, 310

		if(element.hasClass("share-googleplus"))
			app.shares.popupWindow "https://plus.google.com/share?url="+share_url, 500, 310

		if(element.hasClass("share-linkedin"))
			app.shares.popupWindow "http://www.linkedin.com/shareArticle?mini=true&url="+share_url+"&title="+share_text+"&summary="+share_text+"&source="+share_url, 500, 420

		false

	popupWindow: (url, w, h) ->
		left = ( $(window).width() / 2 )  - (w / 2)
		top  = ( $(window).height() / 2 ) - (h / 2)
		return window.open(url, "Compartir", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left)

