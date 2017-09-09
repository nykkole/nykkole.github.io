var map;
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
            center: {lat: 53.000, lng: -7.671},  //53.203823, -7.671809
            zoom: 7,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
            scrollwheel: false,
            styles: styles
        });

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        //http://kml4earth.appspot.com/icons.html
        var icons = {
          scenic: {
            icon: iconBase + 'parks_maps.png'
          },
          dining: {
            icon: iconBase + 'dining_maps.png'
          },
          highlight: {
            icon: iconBase + 'capital_big_highlight_maps.png'
          },
          sleeping: {
            icon: iconBase + 'lodging_maps.png'
          }
        };

        var features = [
          {
            //Conolly's Folly
            position: new google.maps.LatLng(53.3698532,-6.5623387),
            type: 'highlight'
          }, {
            //The Pie Maker
            position: new google.maps.LatLng(53.2716242,-9.0540488),
            type: 'dining'
          }, {
            //B&B in Galway
            //https://www.booking.com/hotel/ie/sli-na-mara.html
            position: new google.maps.LatLng(53.2656137,-9.0628821),
            type: 'sleeping'
          }, {
            //Dunguaire Castle
            position: new google.maps.LatLng(53.1422132,-8.9282717),
            type: 'highlight'
          }, {
            //Hazel Mountain Chocolate
            position: new google.maps.LatLng(53.1262304,-9.0502399),
            type: 'dining'
          }, {
            //Cliffs of Moher
            position: new google.maps.LatLng(52.9715489,-9.4396372),
            type: 'scenic'
          }, {
            //B&B in Kilarney
            position: new google.maps.LatLng(52.0634107,-9.5074038),
            type: 'sleeping'
          }, {
            //Celtic Whiskey Bar & Larder
            position: new google.maps.LatLng(52.0587019,-9.5115221),
            type: 'dining'
          }, {
            //Geocache in park in Kilarney
            position: new google.maps.LatLng(52.046483, -9.538767),
            type: 'scenic'
          }, {
            //Torc Waterfall
            position: new google.maps.LatLng(52.0044866,-9.507272),
            type: 'scenic'
          }, {
            //Ladies View, viewpoint
            position: new google.maps.LatLng(51.968600, -9.594750),
            type: 'scenic'
          }, {
            //Avoca
            position: new google.maps.LatLng(51.9387363,-9.6589553),
            type: 'dining'
          }, {
            //Geocache in Kenmare
            position: new google.maps.LatLng(51.877517, -9.571600),
            type: 'scenic'
          }, {
            //Kilkenny Castle
            position: new google.maps.LatLng(52.6504656,-7.2514866),
            type: 'highlight'
          }, {
            //Oldest Pub in Kilkenny, Tynan's Bridge House Bar
            position: new google.maps.LatLng(52.6519252,-7.2507919),
            type: 'dining'
          }, {
            //Glendalough Monastic Site
            position: new google.maps.LatLng(53.0119921,-6.3385948),
            type: 'highlight'
          }, {
            //Europe's first cache
            position: new google.maps.LatLng(53.1913032,-6.0824887),
            type: 'scenic'
          }, {
            //Guinness Storehouse
            position: new google.maps.LatLng(53.341881, -6.286710),
            type: 'highlight'
          }, {
            //Jameson Distillery Bow St.
            position: new google.maps.LatLng(53.3483793,-6.2795431),
            type: 'highlight'
          }, {
            //The Woollen Mills
            position: new google.maps.LatLng(53.3465466,-6.2635723),
            type: 'dining'
          }, {
            //Third Space Smithfield, Cafe near Jameson Distillery
            position: new google.maps.LatLng(53.3478248,-6.2790488),
            type: 'dining'
          }, {
            //Parking in Dublin, Christchurch Car Park
            position: new google.maps.LatLng(53.3423698,-6.26984),
            type: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }, {
            //
            position: new google.maps.LatLng(),
            type: ''
          }, {
            //
            position: new google.maps.LatLng(),
            type: ''
          }

        ];

        // Create markers.
        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        });
      }