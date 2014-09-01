

app.cookie = 

	create: (name, value, days) ->
		if days
			date = new Date()
			date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
			expires = "; expires=" + date.toGMTString()
		else
			expires = ""
		document.cookie = name + "=" + value + expires + "; path=/"

	read: (name) ->
		nameEQ = name + "="
		ca = document.cookie.split(";")
		i = 0

		while i < ca.length
			c = ca[i]
			c = c.substring(1, c.length)  while c.charAt(0) is " "
			return c.substring(nameEQ.length, c.length)  if c.indexOf(nameEQ) is 0
			i++
		null

	delete: (name) ->
		app.cookie.create name, "", -1

