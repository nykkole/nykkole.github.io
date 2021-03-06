var map;
var infowindow;
//var markerCluster;

// cluster pins in WA, CR and IRE when zoomed out
// https://developers.google.com/maps/documentation/javascript/marker-clustering

//different style clusters?

// change pins to dots until click
// https://stackoverflow.com/questions/15523100/google-map-api-v3-change-marker-icon-on-click

// click event on map to clear infowindow

// --------------------- map and pins
function initMap() {

	var styles = [
	  {
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
        center: {lat: 15.092, lng: 10.000},  //38.092807, -56.085236
        zoom: 2.25,
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
      scenic: 'https://maps.google.com/mapfiles/kml/pal2/icon4.png',
      dining: iconBase + 'dining_maps.png',
      highlight: iconBase + 'capital_big_highlight_maps.png',
      sleeping: iconBase + 'lodging_maps.png',
      camping: iconBase + 'campground_maps.png'
    };

    // --------------------- array of places
    var places = [
    //Camping trips
    {
        heading: 'Wenberg county park, April 2018',
        description: 'Well-funded campground near Lake Goodwin (no alcohol policy)',
        position: new google.maps.LatLng(48.137409, -122.289359),
        type: 'camping'
      }, {
        heading: 'Fort Ebey, April 2018',
        description: 'WA state park with hiking trails and gorgeous views',
        position: new google.maps.LatLng(48.222825, -122.765617),
        type: 'camping'
      }, {
        heading: 'Millersylvania, Jan 2018',
        description: 'National park with a lake and an old orchard',
        position: new google.maps.LatLng(46.912214, -122.911650),
        type: 'camping'
      }, {
        heading: 'Belfair State Park, Oct 2017',
        description: 'Waterside camping',
        position: new google.maps.LatLng(47.429605, -122.878229),
        type: 'camping'
      }, {
        heading: 'Dash Point State Park, Nov 2017',
        description: 'Camping near the sound',
        position: new google.maps.LatLng(47.318974, -122.408130),
        type: 'camping'
      }, {
        heading: 'Kanaskat-Palmer State Park, Oct 2017',
        description: 'Camping along a river with salmons',
        position: new google.maps.LatLng(47.319986, -121.904917),
        type: 'camping'
      }, {
        heading: 'Walla Walla State Park, Jun 2017',
        description: 'Camping on the grass',
        position: new google.maps.LatLng(47.444916, -120.318303),
        type: 'camping'
      }, {
        heading: 'Friday Creek campground, Sep 2016',
        description: 'Gorgeous trees and a small creek',
        position: new google.maps.LatLng(48.582519, -122.340627),
        type: 'camping'
      }, {
        heading: 'Gold Basin campground, May 2017',
        description: 'Camping right by a river with a small beach',
        position: new google.maps.LatLng(48.076546, -121.731436),
        type: 'camping'
      }, {
        heading: 'Olympia Campground, Sep 2016',
        description: '',
        position: new google.maps.LatLng(46.966341, -122.921822),
        type: 'camping'
      }, {
        heading: 'Klahowya Campground, Sep 2016',
        description: 'Camping amongs giganting trees, sheltered from other campers',
        position: new google.maps.LatLng(48.066313, -124.114836),
        type: 'camping'
      }, {
        heading: 'Secret camping spot, June 2018',
        description: 'Camping along the river',
        position: new google.maps.LatLng(48.069147, -121.669201),
        type: 'camping'
      }, {
        heading: 'Three River Resorts, July 2018',
        description: 'Cabin with outside firepit',
        position: new google.maps.LatLng(47.913241, -124.534123),
        type: 'camping'
      }, {
        heading: 'Lost Resort, July 2018',
        description: 'Cabin in the middle of the woods',
        position: new google.maps.LatLng(48.153682, -124.658083),
        type: 'camping'
      }, {
        heading: 'Near Lake Pend Oreille, Aug 2018',
        description: 'Birthday camping',
        position: new google.maps.LatLng(48.258898, -116.472774),
        type: 'camping'
      }, {
        heading: 'Secret camping spot, Sept 2018',
        description: 'Camping along the river',
        position: new google.maps.LatLng(48.0690, -121.6692),
        type: 'camping'
      }, {
        heading: 'Game Farm Wilderness Park, Apr 2019',
        description: 'Camping next to a disc golf course',
        position: new google.maps.LatLng(47.279237, -122.195413),
        type: 'camping'
      }, {
        heading: '',
        description: '',
        position: new google.maps.LatLng(),
        type: 'camping'
      },
    // Ireland  Aug 17
    {
        heading: "Conolly's Folly",
        description: 'Geocache and interesting story<br><img src="images/IRE_conolly.jpg" alt="Conolly&#34;s Folly" width="300px">',
        position: new google.maps.LatLng(53.3698532,-6.5623387),
        type: 'highlight'
      }, {
        heading: "Kilbeggan distillery",
        description: 'Try the TyrConnel 12 yrs!',
        position: new google.maps.LatLng(53.369334, -7.502820),
        type: 'dining'
      }, {
        heading: "The Pie Maker",
        description: 'Very yummy food and good dark beer!<br><img src="images/IRE_pie.jpg" alt="The Pie Maker" height="300px">',
        position: new google.maps.LatLng(53.2716242,-9.0540488),
        type: 'dining'
      }, {
        heading: "B&B in Galway",
        description: '<a href="https://www.booking.com/hotel/ie/sli-na-mara.html" target="_blank">Book here</a>',
        position: new google.maps.LatLng(53.2656137,-9.0628821),
        type: 'sleeping'
      }, {
        heading: "Dunguaire Castle",
        description: 'Stand under archway and ask a question, you shall have the answer before the end of the day :)<br><img src="images/IRE_dunguaire.jpg" alt="Dunguaire Castle" width="300px">',
        position: new google.maps.LatLng(53.1422132,-8.9282717),
        type: 'highlight'
      }, {
        heading: "Hazel Mountain Chocolate",
        description: 'Very yummy food!<br><img src="images/IRE_chocolate.jpg" alt="Yummy food" width="300px">',
        position: new google.maps.LatLng(53.1262304,-9.0502399),
        type: 'dining'
      }, {
        heading: "Cliffs of Moher",
        description: 'Beautiful scenery!<br><img src="images/IRE_moher.jpg" alt="View of the cliffs" width="300px">',
        position: new google.maps.LatLng(52.9715489,-9.4396372),
        type: 'scenic'
      }, {
        heading: "B&B in Kilarney",
        description: 'Nothing special, but this is where we stayed.',
        position: new google.maps.LatLng(52.0634107,-9.5074038),
        type: 'sleeping'
      }, {
        heading: "Celtic Whiskey Bar & Larder",
        description: 'Go here! Drink whiskey!<br><img src="images/IRE_whiskeybar.jpg" alt="Rare whiskey" height="300px">',
        position: new google.maps.LatLng(52.0587019,-9.5115221),
        type: 'dining'
      }, {
        heading: "Geocache in park in Kilarney",
        description: 'Beautiful park with view of castle<br><img src="images/IRE_park.jpg" alt="View near the cache" width="300px">',
        position: new google.maps.LatLng(52.046483, -9.538767),
        type: 'scenic'
      }, {
        heading: "Torc Waterfall",
        description: 'Gorgeous waterfall<br><img src="images/IRE_torc.jpg" alt="Torc Waterfall" height="300px">',
        position: new google.maps.LatLng(52.0044866,-9.507272),
        type: 'scenic'
      }, {
        heading: "Viewpoint: Ladies View",
        description: 'Gorgeous view<br><img src="images/IRE_ladyview.jpg" alt="The view" width="300px">',
        position: new google.maps.LatLng(51.968600, -9.594750),
        type: 'scenic'
      }, {
        heading: "Avoca",
        description: 'Very yummy food<br><img src="images/IRE_avoca.jpg" alt="Lemon meringue pie" width="300px">',
        position: new google.maps.LatLng(51.9387363,-9.6589553),
        type: 'dining'
      }, {
        heading: "Geocache in Kenmare",
        description: 'Worth a visit<br><img src="images/IRE_kenmare.jpg" alt="On the peninsula" width="300px">',
        position: new google.maps.LatLng(51.877517, -9.571600),
        type: 'scenic'
      }, {
        heading: "The Ewe Experience",
        description: '<a href="http://www.theewe.com/" target="_blank">Learn more</a><br><img src="images/IRE_ewe.jpg" alt="Statue in the garden" width="300px">',
        position: new google.maps.LatLng(51.777426, -9.569102),
        type: 'highlight'
      }, {
        heading: "Kilkenny Castle",
        description: 'Very interesting caslte tour<br><img src="images/IRE_kilkenny.jpg" alt="Castle gardens" width="300px">',
        position: new google.maps.LatLng(52.650729, -7.250017),
        type: 'highlight'
      }, {
        heading: "Tynan's Bridge House Bar",
        description: 'Oldest Pub in Kilkenny',
        position: new google.maps.LatLng(52.6519252,-7.2507919),
        type: 'dining'
      }, {
        heading: "Glendalough Monastic Site",
        description: 'Ruins from the year 800<br><img src="images/IRE_glendalough.jpg" alt="The old monastary" height="300px">',
        position: new google.maps.LatLng(53.0119921,-6.3385948),
        type: 'highlight'
      }, {
        heading: "Europe's first cache",
        description: '!!!<br><img src="images/IRE_first.jpg" alt="View from the cache" width="300px">',
        position: new google.maps.LatLng(53.1913032,-6.0824887),
        type: 'scenic'
      }, {
        heading: "Guinness Storehouse",
        description: "It's like Charlie and the Chocolate Factory!<br><img src='images/IRE_guiness.jpg' alt='View from the top floor' height='200px'>",
        position: new google.maps.LatLng(53.341881, -6.286710),
        type: 'highlight'
      }, {
        heading: "Jameson Distillery Bow St.",
        description: 'Awesome whiskey tasting!<br><img src="images/IRE_jameson.jpg" alt="Learning about the history" width="300px">',
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
        position: new google.maps.LatLng(53.347705, -6.278770),
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
      },
       // Australia Nov 18
      {
        heading: "AirBnB",
        description: 'Apartment with Bema06 during Mega', 
        position: new google.maps.LatLng(-37.786351, 144.941317),
        type: 'sleeping'
      }, {
        heading: "First cache on Big Day Out",
        description: '4WDing up the hill', 
        position: new google.maps.LatLng(-37.927477, 146.820242),
        type: 'scenic'
      }, {
        heading: "Picnic at Licola Village",
        description: 'Point where the group split', 
        position: new google.maps.LatLng(-37.628113, 146.623675),
        type: 'scenic'
      }, {
        heading: "Jamieson Berries",
        description: 'Ice cream!', 
        position: new google.maps.LatLng(-37.279378, 146.141121),
        type: 'dining'
      }, {
        heading: "Mt Buller",
        description: 'Parrots and Webcame Cache', 
        position: new google.maps.LatLng(-37.146562, 146.447093),
        type: 'scenic'
      }, {
        heading: "Victoria's first cache",
        description: '..and lots of kangaroos', 
        position: new google.maps.LatLng(-37.254879, 145.167246),
        type: 'scenic'
      }, {
        heading: "AirBnB",
        description: '', 
        position: new google.maps.LatLng(-37.786351, 144.941317),
        type: 'sleeping'
      }, {
        heading: "Torquay surf beach",
        description: 'surfing lesson without sharks', 
        position: new google.maps.LatLng(-38.342916, 144.318708),
        type: 'highlight'
      }, {
        heading: "Sunshine Chinese Massage",
        description: 'so relaxing!', 
        position: new google.maps.LatLng(-38.331686, 144.324414),
        type: 'scenic'
      }, {
        heading: "Tiny house",
        description: 'Our first night in a tiny house', 
        position: new google.maps.LatLng(-38.320999, 144.323412),
        type: 'scenic'
      }, {
        heading: "Cafe La Hoot",
        description: 'Coffee break on the way to Warnambook', 
        position: new google.maps.LatLng(-38.240196, 143.990747),
        type: 'dining'
      }, {
        heading: "Botanic Cafe on the Lake",
        description: 'Coffee break on the way to Warnambook', 
        position: new google.maps.LatLng(-38.333022, 143.587184),
        type: 'dining'
      }, {
        heading: "Mt Leura outlook",
        description: 'EarthCache', 
        position: new google.maps.LatLng(-38.244420, 143.157672),
        type: 'scenic'
      }, {
        heading: "Lake Bullen and Gnotuk outlook",
        description: 'EarthCache', 
        position: new google.maps.LatLng(-38.235240, 143.112182),
        type: 'scenic'
      }, {
        heading: "Hopkins Falls",
        description: 'EarthCache', 
        position: new google.maps.LatLng(-38.333693, 142.619509),
        type: 'highlight'
      }, {
        heading: "Tower Hill Wildlife reserve",
        description: 'Park on an island with lots of wildlife', 
        position: new google.maps.LatLng(-38.321018, 142.359777),
        type: 'highlight'
      }, {
        heading: "Deep Blue Hot Springs",
        description: 'Relaxing hot pool in a hotel', 
        position: new google.maps.LatLng(-38.396787, 142.473525),
        type: 'highlight'
      }, {
        heading: "The Grotto",
        description: 'Impressive geological formation', 
        position: new google.maps.LatLng(-38.618625, 142.914390),
        type: 'highlight'
      }, {
        heading: "London Bridge",
        description: 'Impressive geological formation', 
        position: new google.maps.LatLng(-38.622630, 142.931726),
        type: 'scenic'
      }, {
        heading: "12 Apostels",
        description: 'Impressive geological formation', 
        position: new google.maps.LatLng(-38.666213, 143.104180),
        type: 'scenic'
      }, {
        heading: "Gully glows",
        description: 'Glow worms in a park', 
        position: new google.maps.LatLng(-38.697567, 143.369433),
        type: 'highlight'
      }, {
        heading: "Lavers Hill Roadside Tavern",
        description: 'Food, gas, and souvenirs', 
        position: new google.maps.LatLng(-38.682703, 143.385780),
        type: 'dining'
      }, {
        heading: "Cape Otway Lighthouse",
        description: 'Lighthouse park, with koalas nearby', 
        position: new google.maps.LatLng(-38.855871, 143.513414),
        type: 'scenic'
      }, {
        heading: "Stone beach",
        description: 'Gorgous stone beach hidden behind bushes', 
        position: new google.maps.LatLng(-38.721514, 143.727078),
        type: 'scenic'
      }, 
      // India 2019
      {
        heading: "Treebo",
        description: 'First hotel in India', 
        position: new google.maps.LatLng(18.965424, 72.818499),
        type: 'sleeping'
      }, {
        heading: "The Park",
        description: 'First hotel in Hyderabad', 
        position: new google.maps.LatLng(17.423298, 78.462541),
        type: 'sleeping'
      }, {
        heading: "Farzi Cafe",
        description: 'Indian streetfood in a cafe/restaurant', 
        position: new google.maps.LatLng(18.994624, 72.825018),
        type: 'dining'
      }, {
        heading: "Gateway of India",
        description: '', 
        position: new google.maps.LatLng(18.921990, 72.834583),
        type: 'highlight'
      }, {
        heading: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
        description: 'History and art museum', 
        position: new google.maps.LatLng(18.926718, 72.832493),
        type: 'highlight'
      }, {
        heading: "Burma Burma",
        description: 'Delishes Burmese food', 
        position: new google.maps.LatLng(18.929534, 72.831992),
        type: 'dining'
      }, {
        heading: "Cross Maidan Garden",
        description: 'Concert during Art Festival', 
        position: new google.maps.LatLng(18.933694, 72.829171),
        type: 'scenic'
      }, {
        heading: "Kanheri Caves",
        description: 'Archeological site of cave dwellings', 
        position: new google.maps.LatLng(19.207895, 72.904887),
        type: 'highlight'
      }, {
        heading: "Bonobo",
        description: 'Rooftop bar', 
        position: new google.maps.LatLng(19.065456, 72.834102),
        type: 'dining'
      }, {
        heading: "Samrat",
        description: 'North Indian restaurant', 
        position: new google.maps.LatLng(18.930513, 72.826468),
        type: 'dining'
      }, {
        heading: "Samrat",
        description: 'North Indian dining', 
        position: new google.maps.LatLng(18.930513, 72.826468),
        type: 'dining'
      }, {
        heading: "Hanghing Gardens",
        description: 'Park with geocache', 
        position: new google.maps.LatLng(18.956657, 72.804896),
        type: 'scenic'
      }, {
        heading: "Pramod Navalkar Viewing Gallery",
        description: '', 
        position: new google.maps.LatLng(18.956253, 72.805960),
        type: 'scenic'
      }, {
        heading: "Golconda Fort",
        description: '500 year old fortress', 
        position: new google.maps.LatLng(17.384195, 78.402702),
        type: 'highlight'
      }, {
        heading: "Hatiyan Jhad Baobab Tree",
        description: 'Biggest Baobab Tree in India', 
        position: new google.maps.LatLng(17.392901, 78.410797),
        type: 'scenic'
      }, {
        heading: "Autumn Leaf Cafe",
        description: 'Cafe with outdoor seating in garden', 
        position: new google.maps.LatLng(17.434033, 78.402043),
        type: 'dining'
      }, {
        heading: "Prost Brewpub",
        description: 'Good beer and indian streetfood (Paani Puri)', 
        position: new google.maps.LatLng(17.431530, 78.400390),
        type: 'dining'
      }, {
        heading: "Paradise Biryani",
        description: '', 
        position: new google.maps.LatLng(17.401087, 78.485711),
        type: 'dining'
      }, {
        heading: "Charminar",
        description: 'Mosque with four minarets', 
        position: new google.maps.LatLng(17.361650, 78.474667),
        type: 'highlight'
      }, {
        heading: "Doctor Homi J Bhabha Community Hall",
        description: 'Excellent place to hold a wedding', 
        position: new google.maps.LatLng(17.474324, 78.559429),
        type: 'highlight'
      }, {
        heading: "The Coffee Cup",
        description: 'Coffee and food', 
        position: new google.maps.LatLng(17.483193, 78.552071),
        type: 'dining'
      }, {
        heading: "Aalankrita Resort & Spa",
        description: '', 
        position: new google.maps.LatLng(17.571818, 78.557920),
        type: 'sleeping'
      }, {
        heading: "Dialogue In The Dark",
        description: 'Dining without light', 
        position: new google.maps.LatLng(17.433919, 78.386282),
        type: 'dining'
      }
    ];

	// ------------------------- from API documentation
	// https://developers.google.com/maps/documentation/javascript/custom-markers
	infowindow = new google.maps.InfoWindow({}); 
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
            //marker.setIcon('https://www.google.com/mapfiles/marker_green.png'); //change image to different icon
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
    calcRouteAUS(map);
	populateMap();

//Cluster
//https://googlemaps.github.io/js-marker-clusterer/docs/reference.html
    // var mcOptions = {gridSize: 20, maxZoom: 5, imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'};
    // markerCluster = new MarkerClusterer(map, markers, mcOptions);
};

function calcRouteCR() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({});
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    directionsDisplay.setOptions({preserveViewport: true});

    var start = 'Juan Santamaria Airport';
    var end = 'Juan Santamaria Airport';
    var request = {
        origin: start,
        waypoints: [
        {location: 'Costa Rica Guesthouse'},
        {location: 'Nuevo Arenal Costa Rica'},
        {location: 'La Fortuna Costa Rica'},
        {location: 'Hostel Casa Tranquilo, Costa Rica'},
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
            alert('Could not calculate calcRouteCR directions because: ' + status);
        }
    });
}

var flightPlanCoordinates = [
{lat: 47.681481, lng: -122.341368}, //47.681481, -122.341368
{lat: 47.672948, lng: -122.337252}, //47.672948, -122.337252
];

var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
});

        flightPath.setMap(map);

var flightPlanCoordinates = [
          {lat: 47.677602, lng: -122.332493}, //47.677602, -122.332493
          {lat: 47.672031, lng: -122.343396}, //47.672031, -122.343396
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);


function calcRouteIRE() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({});
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    directionsDisplay.setOptions({preserveViewport: true} );

    var start = 'Dublin Airport';
    var end = 'Dublin Airport';
    var request = {
        origin: start,
        waypoints: [
    {location: 'Kilbeggan Distillery Experience'},
    {location: 'Galway'},
    {location: 'Doolin'},
    {location: 'Cliffs of Moher, County Clare, Ireland'}, //previously issue with loading route
    {location: 'Ennis Ireland'},
    {location: 'Kilarney'},
    {location: 'Eirk, Molls Gap, County Kerry, Ireland'},
    {location: 'Glengarriff'},
    {location: 'Blarney'},
    {location: 'Kilkenny'},
    {location: 'Glendalough Ireland'},
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
            alert('Could not calculate IRE directions because: ' + status);
        }
    });
}

function calcRouteAUS() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({});
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    directionsDisplay.setOptions({preserveViewport: true});

    var start = 'Yates Ln, Parkville VIC, 3052';
    var end = 'Yates Ln, Parkville VIC, 3052';
    var request = {
        origin: start,
        waypoints: [
        {location: '-37.927477, 146.820242'}, //First cache on Big Day Out
        {location: 'Licola VIC, Australia'},
        {location: 'Mt Buller'},
        {location: '-37.254879, 145.167246'}, //Victoria's first cache
        {location: 'Yates Ln, Parkville VIC, 3052'},
        {location: 'Torquay surf beach'},
        {location: 'Sunshine Chinese Massage'},
        {location: 'Cafe La Hoot'},
        {location: 'Camperdown Botanic Gardens'},
        {location: 'Hopkins Falls'},
        {location: 'Tower Hill Wildlife reserve'},
        {location: 'Deep Blue Hotel & Hot Springs'},
        {location: 'The Grotto, Peterborough VIC, Australia'},
        {location: 'Melba Gully, Great Otway National Park'},
        {location: 'Cape Otway Lighthouse'},
        {location: 'Lorne'},
        ],
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING //default
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            alert('Could not calculate calcRouteAUS directions because: ' + status);
        }
    });
}

function zoomtoIRE() { 
    infowindow.close();
    map.setCenter({lat: 52.580, lng: -8.361}); //52.580414, -8.361462
    map.setZoom(8);
}

function zoomtoCR(){
    infowindow.close();
    map.setCenter({lat: 10.341, lng: -84.875}); //10.341040, -84.875685
    map.setZoom(9);
}

function zoomtoAU(){
    infowindow.close();
    map.setCenter({lat: -38.016, lng: 144.458}); //-38.016526, 144.458635
    map.setZoom(8);
}

function zoomtoWA(){
    infowindow.close();
    map.setCenter({lat: 47.680, lng: -122.161}); //47.680027, -122.161136
    map.setZoom(8);
}

function zoomtoMUM(){
    infowindow.close();
    map.setCenter({lat: 19.060, lng: 72.886}); //19.060, 72.886
    map.setZoom(11);
}

function zoomtoHYD(){
    infowindow.close();
    map.setCenter({lat: 17.434, lng: 78.484}); //17.434524, 78.414931
    map.setZoom(12);
}

function zoomout(){
    infowindow.close();
    map.setCenter({lat: 15.092, lng: 10.000});  //38.092807, -56.085236
    map.setZoom(2.25);
}

