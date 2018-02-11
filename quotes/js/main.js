var currentQuote;
var currentAuthor;

function getQuote() {
	// e.preventDefault();

	var randomHex = '#'+Math.floor(Math.random()*16777215).toString(16);
	$('body').css('background-color', randomHex);
	$('#getQuoteButton').css('background-color', randomHex);
	$('.twitter-share-button').css('background-color', randomHex);
	$('.tumbler-share-button').css('background-color', randomHex);
	randomHex = '';
    
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
	  
};

function twitterQuote() {
	$('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?text="' + currentQuote + '" - ' + currentAuthor);
}

function tumblerQuote() {
	$('.tumbler-share-button').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&caption='+ currentAuthor +'&content=' + currentQuote + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');


}


$(document).ready(function() {
	getQuote();
	$('#getQuoteButton').on('click', getQuote);
	$('.twitter-share-button').on('click', twitterQuote);
	$('.tumbler-share-button').on('click', tumblerQuote);
});
