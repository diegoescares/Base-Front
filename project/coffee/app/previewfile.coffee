
app.previewfile =
	init: ->
		$("input[type='file'][data-to]").change (evt) ->
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

