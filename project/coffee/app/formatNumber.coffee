

app.formatNumber = (n) ->
	n.toFixed(0).replace /./g, (c, i, a) ->
		(if i and c isnt "," and not ((a.length - i) % 3) then "." + c else c)

