var csvFileContent = '';
//var year;

$('#button').on('click', function(e) {
    e.preventDefault();
    
    // clear table of previous content
    $('#chatTuesdays').html('');
    $('#newsletterDays').html('');
    $('#download').html('');
    
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
        function createDates(week, chatTime){
            return function (){
                getChatDates(getTuesdays(2, week, new Date(chosenYear, i)), chatTime);
                //console.log(chatTime);
            }
        }
        for (i=0; i<12; i++) {
        // Second Tuesday of month i of chosen year.
        createDates(2, 12)();
        // Fourth Tuesday of month i of chosen year.
        createDates(4, 18)();
        }
        $('#download').append('<a href="data:application/octet-stream,Subject%2CStart%20Date%2CStart%20Time%2CEnd%20Date%2CEnd%20Time%2CAll%20day%20event%0A' + csvFileContent + '" download="schedule' + chosenYear + '.csv">Download CSV file</a>');
    }

    function getChatDates(s, time) {
        // --------- get chat dates to display as 'MM/DD/YYYY'
        var chatMonth = s.getMonth() + 1;
        var chatDay = s.getDate();
        var chatYear = s.getFullYear();
        //year = chatYear;
        //console.log(year);
        var chatDate = chatMonth + '/' + chatDay + '/' + chatYear;
        $('#chatTuesdays').append('<li>' + chatDate + '</li>');
        //append information for CSV file. get time from parameter! ----------------- create download file, see: 
                                                                                    //http://jsfiddle.net/VBJ9h/319/
                                                                                    //https://www.w3schools.com/tags/ref_urlencode.asp
        var endTime = time + 1;
        csvFileContent = csvFileContent + 'Chat%2C' + chatDate + '%2C' +  time + ':00%2C' +  chatDate + '%2C' + endTime + ':00%2CFALSE%0A';                                                                
        // --------- get the date 9 days after each chat Tuesday
        var followingThursday = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 9);

        // --------- get newsletter dates to display as 'MM/DD/YYYY'
        var newsletterMonth = followingThursday.getMonth() + 1;
        //console.log(chatMonth);
        var newsletterDay = followingThursday.getDate();
        var newsletterYear = followingThursday.getFullYear();
        var newsletterDate = newsletterMonth + '/' + newsletterDay + '/' + newsletterYear;
        $('#newsletterDays').append('<li>' + newsletterDate + '</li>');
        //append information for CSV file Subject:Newsletter, All day event:TRUE, dates from variables. ----------------- create download file, see: http://jsfiddle.net/VBJ9h/319/
        csvFileContent = csvFileContent + 'Newsletter%2C' + newsletterDate + '%2C%2C' + newsletterDate + '%2C%2C' + 'TRUE%0A';
    }

// -------- this function returns chat dates
    function getTuesdays(weekday, n, date) {
            var date = new Date(date.getFullYear(), date.getMonth(), 1);
            var add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;
            date.setDate(1 + add);

            return date;
    }
}); 


