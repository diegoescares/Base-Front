
# console.log sólo para localhost

app.log = (log) ->
	if window.location.hostname == "localhost"
		console.log log

# simple

log = (log) ->
	app.log(log)
