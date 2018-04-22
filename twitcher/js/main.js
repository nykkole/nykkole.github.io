$('document').ready(function(){
	// get status from all stations
	var stations = ['freecodecamp', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

	for (var i = 0; i < stations.length; i++) {
		(function(i) {
			var stationName = stations[i];
			var url = 'https://wind-bow.gomix.me/twitch-api/streams/' + stationName + '?callback=?'
			$.getJSON(url, function(data) {
				console.log(data);
				var stream = data.stream; //returns null when not streaming
				if (stream != null) {
	  				$('#' + stationName).addClass('live');
	  				$('#' + stationName).append('<a href="https://www.twitch.tv/' + stationName + '" target="_blank"><span>Live: '+data.stream.game+'</span></a>');
				} else {
					$('#' + stationName).addClass('offline');
					$('#' + stationName).append('<a href="https://www.twitch.tv/' + stationName + '" target="_blank"><span>Offline</span></a>');
				}
			});
		})(i);
	}
});

function showAll() {
	$('li').removeClass('active');
	$('#showAll').addClass('active');
	$('.station').removeClass('hide');
}

function showLive() {
	$('li').removeClass('active');
	$('#showLive').addClass('active');

	$('.station').removeClass('hide');
	$('.offline').addClass('hide');
}

function showOffline() {
	$('li').removeClass('active');
	$('#showOffline').addClass('active');

	$('.station').removeClass('hide');
	$('.live').addClass('hide');
}