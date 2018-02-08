function getQuote() {
	// e.preventDefault();

	var randomHex = '#'+Math.floor(Math.random()*16777215).toString(16);
	$('body').css('background-color', randomHex);
	$('#getQuoteButton').css('background-color', randomHex);
	randomHex = '';
	console.log('randomHex is ' + randomHex);
    
    $.ajax({
    	headers: {
    		"X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
    		Accept: "application/json",
    		"Content-Type": "application/x-www-form-urlencoded"
    	},
    	url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    	success: function(r) {
    		if (typeof r === 'string') {
    			r = JSON.parse(r); 
    		}

    		currentQuote = r.quote;
	      	currentAuthor = r.author;

	      	$("#quoteText").html(r.quote);
	      	$("#quoteAuthor").html('- ' + r.author);
	      }
	});
	  
	console.log('quote');
};


$(document).ready(function() {
	getQuote();
	$('#getQuoteButton').on('click', getQuote);
});

