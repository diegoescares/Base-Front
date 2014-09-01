

app.gmap = ->

	if $("#map").length

		markers = new Array()
		infowindow = false

		map_zoom = parseInt($("#map").attr("data-zoom"))

		map_lat = $("#map").attr("data-lat")
		map_lng = $("#map").attr("data-lng")

		blackandwhite = [
			featureType: "all"
			elementType: "all"
			stylers: [
				saturation: -100
			]
		]

		mapOptions =
			zoom: map_zoom
			center: new google.maps.LatLng(map_lat,map_lng)
			mapTypeId: google.maps.MapTypeId.ROADMAP
			disableDefaultUI: true
			scrollwheel: false
			streetViewControl: false
			styles: blackandwhite


		map = new google.maps.Map(document.getElementById("map"), mapOptions)

		$(".map-zoom-in").click ->
			map.setZoom map.getZoom() + 1
			false

		$(".map-zoom-out").click ->
			map.setZoom map.getZoom() - 1
			false



		# Cargar coordenadas

		$("#map-coords .map-coord").each ->

			marker = new google.maps.Marker(
				position: new google.maps.LatLng($(this).attr("data-lat"), $(this).attr("data-lng"))
				animation: google.maps.Animation.DROP
				icon: "img/marker.png"
				map: map
			)
		
			content =
				"<div class='map-infowindow'>"+
					"<h3>"+$(this).text()+"</h3>"+
					"<ul>"+
						'<li><i class="fa fa-home"></i> '+$(this).attr("data-address")+'</li>' +
						'<li><a href="tel:'+$(this).attr("data-phone")+'"><i class="fa fa-phone"></i> '+$(this).attr("data-phone")+'</a></li>' +
						'<li><a href="mailto:'+$(this).attr("data-email")+'"><i class="fa fa-envelope"></i> '+$(this).attr("data-email")+'</a></li>' +
					"</ul>"+
				"</div>"


			marker['content'] = content
			marker['value'] = $(this).val()

			if !infowindow
				infowindow = new google.maps.InfoWindow(content:"x")

			google.maps.event.addListener map, 'click', ->
				infowindow.close()

			google.maps.event.addListener marker, "click", ->
				infowindow.close()
				infowindow.setContent content
				infowindow.open map, this
				$("#map-coords").val(marker.value)
				map.setCenter(marker.getPosition())

			markers.push(marker)


		$("#map-coords").change ->
			index = $("#map-coords")[0].selectedIndex - 1
			if index >= 0
				infowindow.close()
				infowindow.setContent markers[index]['content']
				infowindow.open map, markers[index]
				map.setCenter(markers[index].getPosition())


