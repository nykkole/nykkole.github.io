getLocation();

console.log('script runs');

// Get location
var x = document.getElementById("demo");
var lat;
var lon;

//Temperature scales
var Fahrenheit;
var Celsius;
var FC;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
  	  getWeather();
  	}, function() {
      x.innerHTML = "Geolcoation supported";
      getWeather();
  	});
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
      console.log(x.innerHTML);
  }
}

// Open Weather Map API Key: https://home.openweathermap.org/api_keys
function getWeather() {
	var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=f881946d4d6218901b7f685cb5d473f0';
	$.ajax({
    url: url,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      var Kelvin = response.main.temp;
      Kelvin = parseFloat(Kelvin);
      Fahrenheit = Math.round((Kelvin-273.15)*1.8)+32;
      Celsius = Math.round(Kelvin-273.15);

      $('#location').html(response.name + ', ' + response.sys.country);
      $('#temp').html(Fahrenheit + ' <span id="scale">F</span>');
      $('#conditions').html('Conditions: ' + response.weather[0].main);
      $('#animation').attr('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });
}

function changeTemp() {
  FC = $('#scale').html();
  if (FC === 'F') {
    $('#temp').html(Celsius + ' <span id="scale">C</span>');
    FC = $('#scale').html();
  } else {
    FC = 'F';
    $('#temp').html(Fahrenheit + ' <span id="scale">F</span>');
  }
};



