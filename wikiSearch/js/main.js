$("#keyword").focus();

// makes submit via enter button work
$("#searchForm").submit(function() {
    $('#search').click();
    return false;
});

function searchWiki() {
  $('#errors').text('');
  $('#results').text('');
  $('#keyword').select();

  // -------------- get keyword from input field
  var keyword = $('#keyword').val(); 

  // -------------- find out if anything was entered
  if (keyword === '') {
    $('#errors').text("Enter a keyword to search");

  } else {
    $("#startText").css("padding-top", "1rem");

    // $.get('https://en.wikipedia.org/w/api.php?action=query&srsearch=' + keyword + '&list=search&prop=revisions&rvprop=content&format=json&origin=*',
    //   function(result) {$('#results').append("<div>success<div>")}, "html");

    var url = 'https://en.wikipedia.org/w/api.php?action=query&srsearch=' + keyword + '&list=search&prop=revisions&rvprop=content&format=json&origin=*' ;
    $.ajax({
      url: url,
      type: 'GET',
      data: {
        format: 'json'
      },
      timeout: 5000, //ms
      success: function(response) {

        // return array with numbers of search results, e.g. 0-9 for 10 search results
        var searchResults = response.query.search;

        //return pageid of search results
        for (let name of searchResults) {
          var title = `${name.title}`;
          var snippet = `${name.snippet}`;
          var id = `${name.pageid}`
          $('#results').append("<a href='http://en.wikipedia.org/?curid=" + id + "' target='_blank'><div id='snippet'><h1 id='title'>" + title + "</h1><p>" + snippet + "</p></div></a>");
        }

      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  }
}

