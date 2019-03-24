// --------------------- set up Firebase data base
console.log('start');
// Initialize Firebase
var config = {
	apiKey: "AIzaSyC5-2aGEptI85JXh1z4oTe5O74EUofpug8",
	authDomain: "test-landingpage-d5ed3.firebaseio.com",
	databaseURL: "https://test-landingpage-d5ed3.firebaseio.com",
	storageBucket: "test-landingpage-d5ed3.appspot.com",
};

firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();


// --------------------- button to add new place to the map
$('#input-form').on('submit', function(e) {
	e.preventDefault();
	
	var email;

	// clear error messages
	$('#emailError').html('');

	// get input from #email
	if ($('#email').val() === '') {
		$('#emailError').html('Please enter your email address.')
	} else {
		email = $('#email').val();
	}
	
	// save information in Firebase
	// create section for places in db
	
	if ($('#emailError').html() === '') {
		$('#email').val('');
		var userReference = database.ref('user');
			userReference.push({
			userEmail: email
		});
		// pat on the back
		console.log('success');	
		//show success message
		$('#input-form').toggle();
		$('#success').toggle();
	}
});