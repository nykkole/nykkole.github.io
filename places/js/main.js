// --------------------- set up Firebase data base
console.log('start');
// Initialize Firebase
var config = {
	apiKey: "AIzaSyCd3B6_Qm9pG-6CIBu7FQ1TPC-9gK-w6ik",
	authDomain: "places-a81be.firebaseapp.com",
	databaseURL: "https://places-a81be.firebaseio.com",
	storageBucket: "places-a81be.appspot.com",
	// messagingSenderId: "1071722193639"
};

firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();

// --------------------- button to expand input form
$('#expand-btn').on('click', function(e){
	e.preventDefault;

	$('#input-form').toggle();
})

// --------------------- button to add new place to the map
$('#input-form').on('submit', function(e) {
	e.preventDefault();
	
	var whichPlace;
	var whereIsIt;
	var whatIsIt;
	var tellMeMore;

	// clear error messages
	$('#whichPlaceError').html('');
	$('#whereIsItError').html('');
	$('#whatIsItError').html('');

	// get input from #whichPlace
	if ($('#whichPlace').val() === '') {
		$('#whichPlaceError').html('Please enter a name.')
	} else {
		whichPlace = $('#whichPlace').val();
	}
	
	// get input from #whereIsIt 
	var whereIsItText = $('#whereIsIt').val(); // how to check that format is correct? TRY val <= 90 && val >= -90 and $.isNumeric(whereIsIt) --------------------
	whereIsIt = whereIsItText.split(', ');
	whereIsIt[0] = Number(whereIsIt[0]); 
	whereIsIt[1] = Number(whereIsIt[1]);
	//console.log(whereIsIt);
	if (whereIsIt[0] > 90 || isNaN(whereIsIt[0]) === true) {
		$('#whereIsItError').html('Please enter your coordinates in this format: 29.954161, -90.068035');
	} else if (whereIsIt[1] < -91 || isNaN(whereIsIt[1]) === true) {
		$('#whereIsItError').html('Please enter your coordinates in this format: 29.954161, -90.068035');
	}

	
	// get input from whatIsIt - radio input
	if ($('input[name=optradio]:checked').val() === undefined) {
		$('#whatIsItError').html('Please choose a type of place.');
	} else if ($('input[name=optradio]:checked').val() === 'Food&Drinks') {
		whatIsIt = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
	} else if ($('input[name=optradio]:checked').val() === 'Fun') {
		whatIsIt = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
	} else if ($('input[name=optradio]:checked').val() === 'Scenic place') {
		whatIsIt = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
	}
	
	// get input from #tellMeMore
	var tellMeMore = $('#tellMeMore').val();
	
	// save information in Firebase
	// create section for places in db
	
	if ($('#whatIsItError').html() === '' && $('#whereIsItError').html() === '' && $('#whichPlaceError').html() === '') {
		$('#whichPlace').val('');
		$('#whereIsIt').val('');
		$('input[name=optradio]').prop('checked', false);
		$('#tellMeMore').val('');
		var placeReference = database.ref('places');
			placeReference.push({
			placeName: whichPlace,
			coordinates: whereIsIt,
			placeType: whatIsIt,
			description: tellMeMore
		});
		// pat on the back
		console.log('success');	
	}
});


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

	var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 47.607, lng: -122.335},  //47.607753, -122.335462
	    zoom: 2,
	    zoomControl: true,
	  	mapTypeControl: true,
	  	scaleControl: true,
	  	streetViewControl: true,
	  	rotateControl: true,
	  	fullscreenControl: true,
	  	scrollwheel: false,
	  	styles: styles
	});

	// var marker = new google.maps.Marker({
	// 	position: {lat: 47.607753, lng: -122.335462},
	// 	map: map
	// });

// ------------------------- from API documentation
// https://developers.google.com/maps/documentation/javascript/custom-markers
var infowindow = new google.maps.InfoWindow({}); 
var markers = [];
// function to add pins to map
	function addMarker(feature) {
	//console.log(feature.placesId);
	//console.log('feature.typeOfPlace = ' + feature.typeOfPlace);
		var contentString = '<div id="content">'+
	    		'<div id="siteNotice">'+
	    		'</div>'+
		    	'<h3 class="firstHeading">'+feature.name+'</h3>'+  //titel goes here
		    	'<div id="bodyContent" data-id="' + feature.placesId + '">'+  //can I have 2 IDs in one element? --------------
		    		'<p>'+feature.description+'</p>'+   // description goes here
		    		'<button class="btn btn-default delete">Delete</button>'
		    	'</div>'+
	    	'</div>';

		var marker = new google.maps.Marker({
			position: {lat: feature.position[0], lng: feature.position[1]},
			map: map,
			icon: feature.typeOfPlace
			//title: feature.placeName // seems unnecessary
		});
		//eventlistener to display information when pin is clicked
		marker.addListener('click', function() {
			infowindow.close();
			infowindow = new google.maps.InfoWindow({
	    		content: contentString,
	    		//maxWidth: 200
	  		});
	     	infowindow.open(map, this);
	  	 });

		markers.push(marker);

		// google.maps.event.addDomListener(marker,'click',(function(marker) {
		//                         return function() {
		//                           //alert('clicked ' + cityList[i][0])
		//                           console.log(marker);
		//                         }
		//                       })(marker));

	}

    // use reference to database to listen for changes in places data
    var populateMap = function() {
		database.ref('places').on('value', function (results) {  //Firebase database works in real time.
		    // Get all places stored in the results we received back from Firebase
		    var allPlaces = results.val();

			// for loop goes through database and calls addMarker() to add pins to map
			for (var item in allPlaces) {
			// Create an object literal with the data we'll pass to addMarker function
				var all = {
					position: allPlaces[item].coordinates,
					name: allPlaces[item].placeName,
					description: allPlaces[item].description,
					typeOfPlace: allPlaces[item].placeType,
					placesId: item
				};

				addMarker(all);
			}
		});
	};

	$('.container').on('click', '.delete', function(e) {
			// Get the ID for the place to delete
			var id = $(e.target).parent().data('id');
			//console.log(e);
			// find places whose objectId is equal to the id we're searching with
			var placeReference = database.ref('places/' + id);
			// Use remove method to remove the place from the database
			placeReference.remove();
			infowindow.close();
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			
			populateMap();
		});
	populateMap();
};

