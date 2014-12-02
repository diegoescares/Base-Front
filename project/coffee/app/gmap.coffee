

app.gmap = ->

	if $(".map").length

		$(".map").each ->

			m = $(this)

			markers = new Array()
			infowindow = false

			map_zoom = parseInt(m.attr("data-zoom"))

			map_lat = m.attr("data-lat")
			map_lng = m.attr("data-lng")

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

			if !m.find(".map-gmap").length
				m.append '<div class="map-gmap"></div>'


			map = new google.maps.Map(m.find(".map-gmap")[0], mapOptions)


			m.append ''+
	            '<div class="map-zoom">'+
	                '<button class="map-zoom-button map-zoom-in  button button-small button-dark"><i class="fa fa-plus"></i></button>'+
	                '<button class="map-zoom-button map-zoom-out button button-small button-dark"><i class="fa fa-minus"></i></button>'+
	            '</div>'

			m.find(".map-zoom-in").click ->
				map.setZoom map.getZoom() + 1
				false

			m.find(".map-zoom-out").click ->
				map.setZoom map.getZoom() - 1
				false



			# Cargar coordenadas

			m.find(".map-marker").each ->

				marker = new google.maps.Marker(
					position: new google.maps.LatLng($(this).attr("data-lat"), $(this).attr("data-lng"))
					animation: google.maps.Animation.DROP
					#icon: "img/marker.png"
					map: map
				)
			
				content =
					"<div class='map-infowindow'>"+
						$(this).html()+
					"</div>"


				marker['content'] = content
				marker['value'] = $(this).val()

				if !infowindow
					infowindow = new google.maps.InfoWindow(content:"x")

				google.maps.event.addListener map, 'click', ->
					infowindow.close()

				if $(this).html().length
					google.maps.event.addListener marker, "click", ->
						infowindow.close()
						infowindow.setContent content
						infowindow.open map, this
						#map.setCenter(marker.getPosition())

				markers.push(marker)





