


app.gmap =

	init: ->
	
		$(".map:visible").each ->
			app.gmap.insert $(this)


	insert: (m) ->

		if m.length && !m.hasClass("map-ready")

			# Markers & infowindows
			markers = new Array()
			infowindow = false

			# Config
			map_zoom = parseInt(m.attr("data-zoom"))
			map_lat = m.attr("data-lat")
			map_lng = m.attr("data-lng")


			# Options
			mapOptions =
				center: new google.maps.LatLng(map_lat,map_lng)
				zoom: map_zoom
				mapTypeId: google.maps.MapTypeId.ROADMAP
				disableDefaultUI: true
				scrollwheel: false
				streetViewControl: false
				backgroundColor: "#FFFFFF"


			# Create map

			if !m.find(".map-gmap").length
				m.append '<div class="map-gmap"></div>'

			map = new google.maps.Map(m.find(".map-gmap")[0], mapOptions)


			# Custom zoom buttons

			m.append ''+
	            '<div class="map-zoom">'+
	                '<button class="map-zoom-button map-zoom-in  button button-small button-white"><i class="fa fa-plus"></i></button>'+
	                '<button class="map-zoom-button map-zoom-out button button-small button-white"><i class="fa fa-minus"></i></button>'+
	            '</div>'

			m.find(".map-zoom-in").click ->
				map.setZoom map.getZoom() + 1
				false

			m.find(".map-zoom-out").click ->
				map.setZoom map.getZoom() - 1
				false


			# Load markers

			m.find(".map-marker").each ->

				m_marker          = $(this)
				m_marker_content  = "<div class='map-infowindow'>" + m_marker.html() + "</div>"
				m_marker_lat      = m_marker.attr("data-lat")
				m_marker_lng      = m_marker.attr("data-lng")
				m_marker_index    = m_marker.index()

				marker = new google.maps.Marker(
					position: new google.maps.LatLng(m_marker_lat, m_marker_lng)
					animation: google.maps.Animation.DROP
					map: map
				)

				marker['content'] = m_marker_content
				marker['index']   = m_marker_index


				# Click infowindow
				
				infowindow = new google.maps.InfoWindow(content:"") if !infowindow

				google.maps.event.addListener map, 'click', ->
					infowindow.close()

				if m_marker.html().length
					google.maps.event.addListener marker, "click", ->
						infowindow.close()
						infowindow.setContent m_marker_content
						infowindow.open map, this
						#map.setCenter(marker.getPosition())

				markers.push(marker)



			m.addClass("map-ready")

