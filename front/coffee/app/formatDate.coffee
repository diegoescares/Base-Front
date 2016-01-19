
app.formatDate = (input,formatYear=false) ->

	val =  input.val()
	val_clean = val.replace(/\D/g,"")

	val_1 = false
	val_2 = false
	val_3 = false
	val_1 = val_clean.substr(0,2) if val_clean.length > 0
	val_2 = val_clean.substr(2,2) if val_clean.length > 2
	val_3 = val_clean.substr(4,4) if val_clean.length > 4

	val_1 = 31 if parseInt(val_1) > 31 && val_1
	val_2 = 12 if parseInt(val_2) > 12 && val_2

	if formatYear
		if parseInt(val_3) < 1900 && val_3
			val_3 = 1900

	val_format = val_clean

	if val_1
		val_format = val_1
		if val_format.length == 2
			val_format += "-"

	if val_2
		val_format = val_1+"-"+val_2
		if val_format.length == 5
			val_format += "-"

	if val_3
		val_format = val_1+"-"+val_2+"-"+val_3

	input.val val_format