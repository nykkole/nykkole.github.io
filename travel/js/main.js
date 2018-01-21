var map;

// --------------------- map and pins
function initMap() {

	var styles = [
	  {
	    stylers: [
	      {hue: '#193341'},
	      {saturation: -20}
	    ]
	  }, {
	    featureType: 'road',
	    elementType: 'geometry',
	    stylers: [
	      {lightness: 100},
	      {visibility: 'simplified'}
	    ]
	  }, {
	    featureType: 'road',
	    elementType: 'labels',
	    stylers: [
	      {visibility: 'off'}
	    ]
	  }
	];

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.660, lng: -8.271},  //53.203823, -7.671809
        zoom: 8,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false,
        scrollwheel: true,
        styles: styles
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    //http://kml4earth.appspot.com/icons.html
    var icons = {
      scenic: iconBase + 'parks_maps.png',
      dining: iconBase + 'dining_maps.png',
      highlight: iconBase + 'capital_big_highlight_maps.png',
      sleeping: iconBase + 'lodging_maps.png'
    };

    // --------------------- array of places
    // Ireland  Aug 17
    var places = [{
        heading: "Conolly's Folly",
        description: 'Geocache and interesting story',
        position: new google.maps.LatLng(53.3698532,-6.5623387),
        type: 'highlight'
      }, {
        heading: "Kilbeggan distillery",
        description: 'Try the TyrConnel 12 yrs!',
        position: new google.maps.LatLng(53.369334, -7.502820),
        type: 'dining'
      }, {
        heading: "The Pie Maker",
        description: 'Very yummy food and good dark beer!',
        position: new google.maps.LatLng(53.2716242,-9.0540488),
        type: 'dining'
      }, {
        heading: "B&B in Galway",
        description: '<a href="https://www.booking.com/hotel/ie/sli-na-mara.html" target="_blank">Book here</a>',
        position: new google.maps.LatLng(53.2656137,-9.0628821),
        type: 'sleeping'
      }, {
        heading: "Dunguaire Castle",
        description: 'Stand under archway and ask a question, you shall have the answer before the end of the day :)',
        position: new google.maps.LatLng(53.1422132,-8.9282717),
        type: 'highlight'
      }, {
        heading: "Hazel Mountain Chocolate",
        description: 'Very yummy food!',
        position: new google.maps.LatLng(53.1262304,-9.0502399),
        type: 'dining'
      }, {
        heading: "Cliffs of Moher",
        description: 'Beautiful scenery!',
        position: new google.maps.LatLng(52.9715489,-9.4396372),
        type: 'scenic'
      }, {
        heading: "B&B in Kilarney",
        description: 'Nothing special, but this is where we stayed.',
        position: new google.maps.LatLng(52.0634107,-9.5074038),
        type: 'sleeping'
      }, {
        heading: "Celtic Whiskey Bar & Larder",
        description: 'Go here! Drink whiskey!',
        position: new google.maps.LatLng(52.0587019,-9.5115221),
        type: 'dining'
      }, {
        heading: "Geocache in park in Kilarney",
        description: 'Beautiful park with view of castle',
        position: new google.maps.LatLng(52.046483, -9.538767),
        type: 'scenic'
      }, {
        heading: "Torc Waterfall",
        description: 'Gorgeous waterfall',
        position: new google.maps.LatLng(52.0044866,-9.507272),
        type: 'scenic'
      }, {
        heading: "Viewpoint: Ladies View",
        description: 'Gorgeous view',
        position: new google.maps.LatLng(51.968600, -9.594750),
        type: 'scenic'
      }, {
        heading: "Avoca",
        description: 'Very yummy food',
        position: new google.maps.LatLng(51.9387363,-9.6589553),
        type: 'dining'
      }, {
        heading: "Geocache in Kenmare",
        description: 'Worth a visit',
        position: new google.maps.LatLng(51.877517, -9.571600),
        type: 'scenic'
      }, {
        heading: "The Ewe Experience",
        description: '<a href="http://www.theewe.com/" target="_blank">Learn more</a>',
        position: new google.maps.LatLng(51.777426, -9.569102),
        type: 'highlight'
      }, {
        heading: "Kilkenny Castle",
        description: 'Very interesting caslte tour',
        position: new google.maps.LatLng(52.6504656,-7.2514866),
        type: 'highlight'
      }, {
        heading: "Tynan's Bridge House Bar",
        description: 'Oldest Pub in Kilkenny',
        position: new google.maps.LatLng(52.6519252,-7.2507919),
        type: 'dining'
      }, {
        heading: "Glendalough Monastic Site",
        description: 'Ruins from the year 800',
        position: new google.maps.LatLng(53.0119921,-6.3385948),
        type: 'highlight'
      }, {
        heading: "Europe's first cache",
        description: '!!!',
        position: new google.maps.LatLng(53.1913032,-6.0824887),
        type: 'scenic'
      }, {
        heading: "Guinness Storehouse",
        description: "It's like Charlie and the Chocolate Factory!",
        position: new google.maps.LatLng(53.341881, -6.286710),
        type: 'highlight'
      }, {
        heading: "Jameson Distillery Bow St.",
        description: 'Awesome whiskey tasting!',
        position: new google.maps.LatLng(53.3483793,-6.2795431),
        type: 'highlight'
      }, {
        heading: "The Woollen Mills",
        description: 'Great food',
        position: new google.maps.LatLng(53.3465466,-6.2635723),
        type: 'dining'
      }, {
        heading: "Third Space Smithfield",
        description: 'Cafe near Jameson Distillery',
        position: new google.maps.LatLng(53.3478248,-6.2790488),
        type: 'dining'
      }, {
        heading: "Christchurch Car Park",
        description: 'Affordable parking in Dublin', 
        position: new google.maps.LatLng(53.3423698,-6.26984),
        type: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      }, 
      // Costa Rica Dec 17 - Jan 18
      {
        heading: "Costa Rica Guesthouse",
        description: 'First night in Costa Rica', 
        position: new google.maps.LatLng(9.930774, -84.068125),
        type: 'sleeping'
      }, {
        heading: "Casa Brew Garden",
        description: 'Brew pub with local beer', 
        position: new google.maps.LatLng(9.932169, -84.066548),
        type: 'dining'
      }, {
        heading: "Parque Arenal Mundo Aventura",
        description: 'Ziplining and repelling in the rainforest<br>arenalmundoaventura.com', 
        position: new google.maps.LatLng(10.456285, -84.644264),
        type: 'scenic'
      }, {
        heading: "Free natural hot springs",
        description: '', 
        position: new google.maps.LatLng(10.489162, -84.723362),
        type: 'scenic'
      }, {
        heading: "Ecothermales",
        description: 'Hot srpings with multiple pools and restaurant<br>ecotermalesfortuna.cr', 
        position: new google.maps.LatLng(10.484028, -84.674879),
        type: 'scenic'
      }, {
        heading: "Gingerbread Restaurant",
        description: 'Yummy food!<br>gingerbreadarenal.com', 
        position: new google.maps.LatLng(10.533661, -84.883402),
        type: 'dining'
      }, {
        heading: "Moya's Place",
        description: 'Bar with live music and food', 
        position: new google.maps.LatLng(10.545355, -84.892506),
        type: 'dining'
      }, {
        heading: "Tree House",
        description: 'Restaurant and bar around a live tree', 
        position: new google.maps.LatLng(10.317435, -84.824491),
        type: 'dining'
      }, {
        heading: "Hostel Casa Tranquilo",
        description: 'Cosy hostel with huge dog', 
        position: new google.maps.LatLng(10.316100, -84.825778),
        type: 'sleeping'
      }, {
        heading: "Catarata Falls",
        description: 'Waterfall with natural pool to swim in', 
        position: new google.maps.LatLng(10.524398, -85.298543),
        type: 'scenic'
      }, {
        heading: "Entertwined",
        description: 'A stunning strangler fig', 
        position: new google.maps.LatLng(10.320731, -84.819566),
        type: 'scenic'
      }, {
        heading: "Rinconcito Lodge",
        description: 'Cozy hotel in the rain forest', 
        position: new google.maps.LatLng(10.732674, -85.301033),
        type: 'sleeping'
      }, {
        heading: "La Cangreja Waterfall",
        description: 'Gorgeous waterfall at the end of a 5km hike', 
        position: new google.maps.LatLng(10.774150, -85.378470),
        type: 'scenic'
      }, {
        heading: "Mud pots",
        description: 'Bubbling mud!', 
        position: new google.maps.LatLng(10.769506, -85.345257),
        type: 'scenic'
      }, {
        heading: "Playa Grande",
        description: 'This beach was almost completely empty at 10 am in the morning', 
        position: new google.maps.LatLng(10.336239, -85.850868),
        type: 'scenic'
      }, {
        heading: "Playa Avellana",
        description: 'Lots of surfing going on here!', 
        position: new google.maps.LatLng(10.227631, -85.837378),
        type: 'scenic'
      }, {
        heading: "Quicksilver Surfing School",
        description: 'Best surf lesson we got!', 
        position: new google.maps.LatLng(10.304149, -85.838502),
        type: 'highlight'
      }, {
        heading: "Shrimp Hole",
        description: 'Great food, good people', 
        position: new google.maps.LatLng(10.297148, -85.841626),
        type: 'dining'
      }, {
        heading: "Patagonia",
        description: 'This Argentinian grill was recommended to us and the food was superb!', 
        position: new google.maps.LatLng(10.299712, -85.841152),
        type: 'dining'
      }, {
        heading: "Relax Hostel",
        description: 'Nice hostel!', 
        position: new google.maps.LatLng(9.934595, -84.097172),
        type: 'sleeping'
      }
    ];

	// ------------------------- from API documentation
	// https://developers.google.com/maps/documentation/javascript/custom-markers
	var infowindow = new google.maps.InfoWindow({}); 
	var markers = [];
	// function to add pins to map
	function addMarker(feature) {
		var contentString = '<div id="content">'+
					    	'<h3 class="firstHeading">'+feature.heading+'</h3>'+  //titel goes here
					    	//id was probably only necessary for delete function
					    	'<div id="bodyContent" data-id="' + feature.placesId + '">'+ 
					    		'<p>'+feature.description+'</p>'+   // description goes here
					    	'</div>'+
					    	'</div>';

		var marker = new google.maps.Marker({
        	position: feature.position,
			map: map,
			icon: icons[feature.type]
		});
		
		//eventlistener to display information when pin is clicked
		marker.addListener('click', function() {
			infowindow.close();
			infowindow = new google.maps.InfoWindow({
	    		content: contentString,
	  		});
	     	infowindow.open(map, this);
	  	 });

		markers.push(marker);
	}

    // loop through array and call add marker function for each item
    var populateMap = function() {
		// for loop goes through database and calls addMarker() to add pins to map
		for (var item in places) {
		// Create an object literal with the data we'll pass to addMarker function
			var all = {
				position: places[item].position,
				heading: places[item].heading,
				description: places[item].description,
				type: places[item].type,
			};

			addMarker(all);
		}
	};

	//drawPolyline(map);
    calcRouteIRE(map);
    calcRouteCR(map);
	populateMap();
};

function calcRouteCR() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({});
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true });

    var start = 'Juan Santamaria Airport';
    var end = 'Juan Santamaria Airport';
    var request = {
        origin: start,
        waypoints: [
        {location: 'Costa Rica Guesthouse'},
        {location: 'Nuevo Arenal Costa Rica'},
        {location: 'La Fortuna Costa Rica'},
        {location: 'Hostel Casa Tranquilo'},
        {location: 'Catarata Falls, Guanacaste Province, Bagaces, Costa Rica'},
        {location: 'Liberia Airport Costa Rica'},
        {location: 'Rinconcito Lodge Costa Rica'},
        {location: 'Rincon de la Vieja National Park Las Pailas Section Ranger Station'},
        {location: 'Tamarindo Costa Rica'},
        {location: 'Playa Avellana Costa Rica'},
        {location: 'Tamarindo Costa Rica'},
        {location: 'Playa Grande Costa Rica'},
        {location: 'Tamarindo Costa Rica'},
        {location: 'Playa Flamingo Costa Rica'},
        {location: 'Nueovo Colon Costa Rica'},
        {location: 'Liberia Airport Costa Rica'},
        {location: 'Tamarindo Costa Rica'},
        {location: 'Relax Hostel Costa Rica'}
        ],
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING //default
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            alert('Could not calculate directions because: ' + status);
        }
    });
}

function calcRouteIRE() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({});
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );

    var start = 'Dublin Airport';
    var end = 'Dublin Airport';
    var request = {
        origin: start,
        waypoints: [
    {location: 'Kilbeggan Distillery Experience'},
    {location: 'Galway'},
    {location: 'Doolin'},
    {location: 'Cliffs of Moher'},
    {location: 'Ennis'},
    {location: 'Kilarney'},
    {location: 'Eirk, Molls Gap, County Kerry, Ireland'},
    {location: 'Glengarriff'},
    {location: 'Blarney'},
    {location: 'Kilkenny'},
    {location: 'Glendalough'},
    {location: 'Bray'},
    {location: 'Christchurch Car Park, Werburgh Street, Wood Quay, Dublin 8, Ireland'}
    ],
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING //default
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            alert('Could not calculate directions because: ' + status);
        }
    });
}


// //function to draw polyline
// function drawPolyline(map) {
// 	var pathCoordinates = [
// 		new google.maps.LatLng(53.410592, -6.234463),//Dublin
// 		new google.maps.LatLng(53.2656137,-9.0628821),//Galway
// 		new google.maps.LatLng(53.1262304,-9.0502399),//The Burren
// 		new google.maps.LatLng(52.9715489,-9.4396372),//Cliffs of Moher
// 		new google.maps.LatLng(52.0634107,-9.5074038),//Kilarney
// 		new google.maps.LatLng(51.750081, -9.550392),//southern tip
// 		new google.maps.LatLng(51.931493, -8.568476),//barley stone
// 		new google.maps.LatLng(52.6504656,-7.2514866),//Kilkenny
// 		new google.maps.LatLng(53.0119921,-6.3385948),//Glendalough
// 		new google.maps.LatLng(53.1913032,-6.0824887),//Europe's first
// 		new google.maps.LatLng(53.410592, -6.234463),//Dublin
// 	];

// 	var pathToCenter = new google.maps.Polyline({
// 		path: pathCoordinates,
// 		geodesic: false,
// 		strokeColor: '#006400',
// 		strokeOpacity: 1.0,
// 		strokeWeight: 2
// 	});

// 	pathToCenter.setMap(map);
// }