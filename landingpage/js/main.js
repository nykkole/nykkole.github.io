// --------------------- set up Firebase data base
// Initialize Firebase
// var config = {
// 	apiKey: "AIzaSyC5-2aGEptI85JXh1z4oTe5O74EUofpug8",
// 	authDomain: "test-landingpage-d5ed3.firebaseio.com",
// 	databaseURL: "https://test-landingpage-d5ed3.firebaseio.com",
// 	storageBucket: "test-landingpage-d5ed3.appspot.com",
// };

// firebase.initializeApp(config);
// console.log('test');
// // Connect to Database
// var database = firebase.database();

//record page load in database
// $(document).ready(function() {
// 	var visit = 'visited ' + new Date();
// 	var userReference = database.ref('user');
// 		userReference.push({
// 		userVisit: visit
// 	});
// 	console.log('start');
// });

// --------------------- button to add new place to the map
// $('#input-form').on('submit', function(e) {
// 	e.preventDefault();

// 	var email;
// 	var turnover;
// 	var incentives;
// 	var gamification;

// 	// clear error messages
// 	$('#emailError').html('');
// 	$('#turnoverError').html('');
// 	$('#incentivesError').html('');
// 	$('#gamificationError').html('');

// 	// get input from #email
// 	if ($('#email').val() === '') {
// 		$('#emailError').html('Please enter your email address.')
// 	} else {
// 		email = $('#email').val();
// 	}
	
// 	//email error message
// 	if ($('#email').val() === '') {
// 		$('#emailError').html('Please enter your email address.')
// 	} else {
// 		email = $('#email').val();
// 	}

// 	//get input from #turnover - radio input
// 	if ($('input[name=turnover]:checked').val() === undefined) {
// 		$('#turnoverError').html("Please choose 'Yes' or 'No'.");
// 	} else if ($('input[name=turnover]:checked').val() === 'yes') {
// 		turnover = 'Yes - have turnover';
// 	} else if ($('input[name=turnover]:checked').val() === 'no') {
// 		turnover = 'No turnover';
// 	}
	
// 	//get input from #incentives
// 	if ($('input[name=incentives]:checked').val() === undefined) {
// 		$('#incentivesError').html("Please choose one of the options.");
// 	} else if ($('input[name=incentives]:checked').val() === 'daily') {
// 		incentives = 'daily';
// 	} else if ($('input[name=incentives]:checked').val() === 'weekly') {
// 		incentives = 'weekly';
// 	} else if ($('input[name=incentives]:checked').val() === 'yearly') {
// 		incentives = 'yearly';
// 	} else if ($('input[name=incentives]:checked').val() === 'no') {
// 		incentives = 'No - donnot use incentives';
// 	}

// 	//get input from #gamification
// 	if ($('input[name=gamification]:checked').val() === undefined) {
// 		$('#gamificationError').html("Please choose one of the options.");
// 	} else if ($('input[name=gamification]:checked').val() === 'yes') {
// 		gamification = 'yes - use gamification';
// 	} else if ($('input[name=gamification]:checked').val() === 'no') {
// 		gamification = "no - don't use gamification";
// 	} else if ($('input[name=gamification]:checked').val() === 'gamification') {
// 		gamification = 'What is gamification?';
// 	}

// 	// save information in Firebase
// 	// create section for places in db
// 	if ($('#emailError').html() === '') {
// 		$('#email').val('');
// 		var userReference = database.ref('user');
// 			userReference.push({
// 			userTurnover: turnover,
// 			userIncentives: incentives,
// 			userGamification: gamification,
// 			userEmail: email + ' ' + new Date()
// 		});
// 		// pat on the back
// 		console.log('success');	

// 		//show success message
// 		$('#input-form').toggle();
// 		$('#success').toggle();
// 	}
// });