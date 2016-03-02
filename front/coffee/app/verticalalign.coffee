

app.verticalalign = ->

	$(".va").each ->
		_this = $(this)
		_top = (_this.parent().outerHeight() - _this.outerHeight()) / 2
		_top = 0 if _top < 0
		_this.css
			position: "relative"
			top: _top + "px"

