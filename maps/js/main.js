var map;
var geocoder = new google.maps.Geocoder();

function initialize() {
	var mapOptions = {
		//https://marklewin.github.io/gmaps/latlongfinder/index.html
		center: new google.maps.LatLng(0,0), //west of Africa
		zoom: 4, // the higher the more zoomed in
		disableDefaultUI: true,
		scrollwheel: false,
		zoomControl: true,
		//zoomControlOptions: {
		// 	style: google.maps.ZoomControlStyle.SMALL,
		// 	position: google.maps.ControlPosition.BOTTOM_LEFT //wonky
		// },
		//panControl: true, //doesn't work
		mapTypeControl: true,
		//mapTypeControlOptions: {
		// 	mapTypeIds: [google.maps.MapTypeId.ROADMAP,
		// 	google.maps.MapTypeId.HYBRID],
		// 	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		// },
		scaleControl: false,
		streetViewControl: true, //doesn't work?
		rotateControl: true,
		overviewMapControl: true,
		//overviewMapControlOpitons: {
			// opened: true // doesn't work 
	};

	var initialCenter = mapOptions.center;
	var initialZoom = mapOptions.zoom;

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	addButtons(map);

	addGoToInitialExtent(map, initialCenter, initialZoom);

	drawMarkers(map);
	drawPolyline(map);
	drawCircle(map);
	//drawPolygon(map); //same as editablePolygon without //editable: true
	drawEditablePolygon(map);
	//drawRectangle(map); // same as draggableRectangle without //draggable: true
	drawDraggableRectangle(map);

	groundOverlay(map);

	//addKMLLayer(map);

	addShowCoords(map);
	addElevationService(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

//-----------Functions---------------
console.log('just before functions');
function addElevationService() {
	console.log('Inside addElevationService function');
	//Create an ElevationService
	elevationService = new google.maps.ElevationService();

	//Add a listener for the double click event and call getElevation on that location
	google.maps.event.addListener(map, 'click', getElevation);
	console.log('Inside addElevationService function');
}

function getElevation(event) {
	console.log('Inside getElevation function');
	var locations = [];
	var infowindow = new google.maps.InfoWindow();
	//Retrieve the clicked location and add it to the array
	var userClickLocation = event.latLng;
	console.log('userClickLocation is ' + userClickLocation);
	locations.push(userClickLocation);
	//Create a LocationElevationRequest object using the array's signle value
	var positionalRequest = {
		'locations': locations
	}
	//Send the location request
	elevationService.getElevationForLocations(
		positionalRequest, function (results, status) {
			console.log('insode function to get ElevationForLocation');
			if (status == google.maps.ElevationStatus.OK) {
				//Retrieve the first result
				if (results[0]) { //first result of an array of one
					//Open an info window indicating the elevation at the clicked location
					infowindow.setContent("The elevation at this point is " + Math.round(results[0].elevation) + " meters.");
					infowindow.setPosition(userClickLocation);
					infowindow.open(map);
				} else {
					alert("No results found.");
				}
			} else {
				alert("Elevation service failed due to: " + status);
			}
		});
}

function calcRoute() {
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	var start = document.getElementById('start').value;
	var end = new google.maps.LatLng(52.345, -3.051);
	var request = {
		origin: start,
		destination: end,
		travelMode: google.maps.TravelMode.DRIVING //default
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		} else {
			alert('Could not calculate directions.');
		}
	});
}

function geocodeAddress() {
	var address = document.getElementById('address').value;
	geocoder.geocode({'address': address},
		function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
				map.setZoom(17);
				map.panTo(marker.position)
			} else {
				alert("Geocode failed with the following error: " + status);
			}
		}
		)
}

function addShowCoords(map) {
	google.maps.event.addListener(map, 'center_changed',
		function() {
			var newCenter = map.getCenter();
			var zoom = map.getZoom();
			document.getElementById('coordsDiv').style.display="inline";
			document.getElementById('coordsDiv').innerHTML = " Center: " 
			+ newCenter.toString() + "<br>Zoom: " + zoom;
		});
}

function addGoToInitialExtent(map, initialCenter, initialZoom) {
	google.maps.event.addListener(map, 'rightclick',
		function() {
			map.setCenter(initialCenter);
			map.setZoom(initialZoom);
		});
}

//documentation: https://developers.google.com/maps/documentation/javascript/examples/groundoverlay-simple
function groundOverlay(map) {
	var imageBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(40.712216, -74.22655),
		new google.maps.LatLng(40.773941, -74.12544)
	);
	var historicalOverlay = new google.maps.GroundOverlay('https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg', imageBounds);
	historicalOverlay.setMap(map);
}

function drawPolyline(map) {
	var pathCoordinates = [
		new google.maps.LatLng(0,0),
		new google.maps.LatLng(1,1),
		new google.maps.LatLng(2,2),
		new google.maps.LatLng(1,3),
		new google.maps.LatLng(0,4),
		new google.maps.LatLng(1,5),
		new google.maps.LatLng(2,6)
	];

	var pathToCenter = new google.maps.Polyline({
		path: pathCoordinates,
		geodesic: false,
		strokeColor: '#006400',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	pathToCenter.setMap(map);
}

function drawEditablePolygon(map) {
	var natureCoords = [
		new google.maps.LatLng(5,5),
		new google.maps.LatLng(6,7),
		new google.maps.LatLng(8,9),
		new google.maps.LatLng(10,7)
	];
	var natureArea = new google.maps.Polygon({
		path: natureCoords,
		strokeColor: "#FFFFF",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#00FF00",
		fillOpacity: 0.6,
		editable: true
	})

	natureArea.setMap(map);
}

function drawCircle(map) {
	var circle = new google.maps.Circle({
		map: map,
		center: new google.maps.LatLng (40.740, -74.18),
		fillColor: "#92D050",
		fillOpacity: 0.6,
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2
	});
	circle.setRadius(58000); //radius in meter
}

function drawDraggableRectangle(map) {
	var bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(50, -4), //SW corner
		new google.maps.LatLng(51, -3) //NE corner
		)
	var rectangle = new google.maps.Rectangle({
		bounds: bounds,
		map: map,
		fillColor: "#00FF00",
		fillOpacity: "0.6",
		strokeColor: "#00FF00",
		strokeOpacity: 0.8,
		strokeWeight: 3,
		draggable: true
	})
}

function drawMarkers(map) {
	//var image = 'https://maxcdn.icons8.com/Share/icon/Maps//marker1600.png'; //image for marker icon
	var centerMarker = new google.maps.Marker({
		//icon: image,
		position: new google.maps.LatLng(0,0),
		map: map,
		title: "Center coordinates"
	});

	var contentString = 
	'<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h1 id="firstHeading" class="firstHeading">Center of LatLong</h1>' +
		'<div id="bodyContent">' +
		'<p>This is the point on the map where Latitude and Longitude are both Zero</p>' +
		'</div>' +
	'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	google.maps.event.addListener(centerMarker, 'click',
		function () {
			infowindow.open(map, centerMarker)
			console.log(infowindow);
		});

	google.maps.event.addListener(centerMarker, 'click',
		function() {
			infowindow.open(map, centerMarker)
		});

	var pubMarker = new google.maps.Marker({
		//icon = image,
		position: new google.maps.LatLng(52.343, -3.049), //example from class
		map: map,
		title: "The Knighton Hotel"
	});
}

function addButtons(map) {
	//-----------standard JavaScript-----------
	document.getElementById('btnTerrain').addEventListener('click', function(){
		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
	 });

	//----------Google API DOM listeners--------
	google.maps.event.addDomListener(btnHybrid, 'click', 
		function() {
		map.setMapTypeId(google.maps.MapTypeId.HYBRID);
	});
	google.maps.event.addDomListener(btnSatellite, 'click', 
		function(){
		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
	});
	google.maps.event.addDomListener(btnRoadmap, 'click', 
		function(){
		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	});
}

//-----add a KML layer to map
function addKMLLayer(map) {
	var GOT = new google.maps.KmlLayer("https://www.gearthblog.com/wp-content/uploads/2017/07/Game-of-Thrones.kml");
	GOT.setMap(map);

	//----add a GeoRSS feed to map
	// var earthQuakesRSS = new google.maps.KmlLayer("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week_age_link.kml");
	// earthQuakesRSS.setMap(map);
	
	//-----to remove KML layer from map:
	//kmlLayer.setMap(null);
	//kmlLayer = null;
}

