
$('#button').on('click', function(e) {
    e.preventDefault();
    
    // clear table of previous content
    $('#chatTuesdays').html('');
    $('#newsletterDays').html('');
    
    // get input year
    var chosenYear = $('#year').val()

    // check if input year is numeric
    if ($.isNumeric(chosenYear) != true) {
        $('#errorMessage').html('This will only work if you enter a number.');
        //console.log(chosenYear.isNumeric);
    // if input year is numeric, clear error message and get dates of chat
    } else {
        //console.log(chosenYear);
        $('#errorMessage').html('');
        // -------- loop toDateString get second and fourth Tuesday of a month
        for (i=0; i<12; i++) {
                     // Second Tuesday of month i of chosen year.
        getChatDates(getTuesdays(2, 2, new Date(chosenYear, i)));
                     // Fourth Tuesday of month i of chosen year.
        getChatDates(getTuesdays(2, 4, new Date(chosenYear, i)));
        }
    }

    function getChatDates(s) {

        // --------- get chat dates to display as 'Month XX'
        var chatDates = s.toDateString().split(' '); // split date object where spaces are
        $('#chatTuesdays').append('<li>' + chatDates[1] + ' ' + chatDates[2] + '</li>'); //display only month and date of array
        console.log(chatDates[1]);
        // --------- get the date 9 days after each chat Tuesday
        var followingThursday = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 9);

        // --------- get newsletter dates to display as 'Month XX'
        var newsletterDates = followingThursday.toDateString().split(' '); // split date object where spaces are
        $('#newsletterDays').append('<li>' + newsletterDates[1] + ' ' + newsletterDates[2] + '</li>'); //display only month and date of array
    }

// -------- this function returns chat dates
    function getTuesdays(weekday, n, date) {
            var date = new Date(date.getFullYear(), date.getMonth(), 1);
            var add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;
            date.setDate(1 + add);

            return date;
    }
}); 


