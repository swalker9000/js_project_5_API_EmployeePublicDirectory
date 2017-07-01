

//defining url for .getJSON function
var randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us';
//defining data options for .getJSON function
var dataOptions = {
	dataType: 'json'
};

function getEmployeeInfo(data) {
	//builds HTML for employee profile
	var employeeHTML;
	//filters through returned json results
	$.each (data.results, function (i, profile) {
		employeeHTML = '<td class="employee-profile">';
		employeeHTML += '<img class="profile-picture" src="' + profile.picture.large + '">';
		employeeHTML += '<div class="contact-info">';
		employeeHTML += '<h3 class="name">'+ profile.name.first + " " + profile.name.last + '</h3>';
		employeeHTML += '<p class="email">' + profile.email + '</p>';
		employeeHTML += '<p class="username"">' + profile.login.username + '</p>';
		employeeHTML += '<p class="city">' + profile.location.city + '</p>';
		employeeHTML += '<p class="country">' + profile.nat + '</p>';
		//appends employee profile to table row
		$("tr").append(employeeHTML);
		
	});

	//builds HTML for employee modal
	var detailedHTML;
	//filters through returned json results
	$.each (data.results, function (i, profile) {
		var DOB = new Date( profile.dob );
		detailedHTML = '<div class="modal">';
		detailedHTML += '<div class="modal-content">';
		detailedHTML += '<span class="close">&times;</span>';
		detailedHTML += '<img src="' + profile.picture.large + '">';
		detailedHTML += '<h3 class="name">'+ profile.name.first + " " + profile.name.last + '</h3>';
		detailedHTML += '<p class="email">' + profile.email + '</p>';
		detailedHTML += '<a href=#><img class="left-arrow" src="http://img.freepik.com/free-icon/keyboard-left-arrow-button_318-76527.jpg?size=338&ext=jpg"></a>';
		detailedHTML += '<a href=#><img class="right-arrow" src="https://image.flaticon.com/icons/svg/60/60758.svg"></a>';
		detailedHTML += '<p class="city">' + profile.location.city + '</p>';
		detailedHTML += '<hr>';
		detailedHTML += '<p class="username">' + profile.login.username + '</p>';
		detailedHTML += '<p class="number">' + profile.cell + '</p>';
		detailedHTML += '<p class="address">' + profile.location.street + ', ' + profile.location.state + ' ' + profile.location.postcode + '</p>';
		detailedHTML += '<p class="country">' + profile.nat + '</p>';
		detailedHTML += '<p class="DOB"> Birthday: ' + DOB.getMonth() + '/' + DOB.getDate() + '/' + DOB.getYear() + '</p>';
		detailedHTML += '</div>';
		detailedHTML += '</div>';
		//appends employee profile to modal div
		$("#myModal").append(detailedHTML);
	});
	
}


//activates search bar and returns matching employee profile for searched: name and username
function searchbar() {
	//when search button is clicked...
	$('button').click( function (e) {
		e.preventDefault();
		//clears any reset buttons created from previous searches
		$('button[type="reset"]').remove();
		//clears no match message from previous searches
		$('.no-match').remove();
		//hides employee profiles from previous searches
		$('td').hide();
		//saves input value to a variable
		var searchValue = $('input').val().toLowerCase();
		//hides all employee profiles
		$('td').hide();
		//clears input box
		$('input').val('');
		//hides arrows for scrolling through modals
		$('.right-arrow, .left-arrow').hide();
		//if the search has no results then append a no match error message
		if ( $('h3:contains(' + searchValue + ')').length === 0 && $('.username:contains(' + searchValue + ')').length === 0 ) {
			$('table').append('<p class="no-match">No matches found.</p>');
		} 
		//if username or name matches search value then display matching results
		else if ($('h3:contains(' + searchValue + ')').length > 0 || $('.username:contains(' + searchValue + ')').length > 0 ) { 
			$('h3:contains(' + searchValue + ')').parents('td').show();
			$('.username:contains(' + searchValue + ')').parents('td').show();
		} 
		//call reset button
		resetButton();
	})
}


//creates reset button to display all employee profiles after search results have been displayed
function resetButton() {
	//create reset button
	$('table').append('<button type="reset">Reset Search</button>');
	//when reset button is clicked...
	$('button[type="reset"]').click( function () {
		//display all employee profiles
		$('td').show();
		//reactive next/prev arrows in modal view
		$('.right-arrow, .left-arrow').show();
		//remove reset button from display
		$('button[type="reset"]').remove();
	})
}

//display modal for selected employee profile
function selectProfile() {
	//hide all modals
	$('.modal').hide();
	//when profile is clicked...
	$('td').click( function (e) { 
		e.preventDefault();
		//display modal for selected modal
		$('.modal:eq(' + $(this).index() + ')').show().addClass("active");
	});
}


//activate next button in modal view
function nextProfile() {
	//when right arrow is clicked...
	$('.right-arrow').click( function (e) { 
		e.preventDefault();
		//if the right arrow clicked is the last employee
		if( $('.right-arrow').parents('.modal:last-child').hasClass('active') ) {
			//remove active class from modal and hide
			$('.active').removeClass('active').hide();
			//target first modal, activate, and show
			$('.modal:first-child').addClass('active').show();
		} 
		//otherwise...
		else {
			//when right arrow is clicked remove active class, hide
			//select next employee modal and show
			$('.active').removeClass('active').hide().next().addClass('active').show();
		} 
	})
}

//activate previous button in modal view
function prevProfile() {
	//when left arrow is clicked...
	$('.left-arrow').click( function (e) { 
		e.preventDefault();
		//if the left arrow clicked is the first employee
		if( $('.left-arrow').parents('.modal:first-child').hasClass('active') ) {
			//remove active class from modal and hide
			$('.active').removeClass('active').hide();
			//target last modal, activate, and show
			$('.modal:last-child').addClass('active').show();
		} 
		//otherwise...
		else {
			//when left arrow is clicked remove active class, hide
			//select previous employee modal and show
			$('.active').removeClass('active').hide().prev().addClass('active').show();
		} 
	})
}


//activate hover on employee profile
function hoverProfile() {
	//when employee profile is hovered over
	$('td').hover(function() {
		//set the background to specified color when hovering
		$(this).css("background", "rgba(0 , 0, 0, 0.04");
	},	function() {
		//when mouse leaves reset color to white
		$(this).css("background", "#fff");
	})
}


//activate close out button
function closeModal() {
	//when X is clicked...
	$('.close').click(function(e) {
		e.preventDefault();
		//remove active class from modal and hide
		$('.modal').removeClass('active').hide();
	})
}

//call all functions for default screen view
function loadScreen() {
	selectProfile();
	hoverProfile();
	closeModal();
	prevProfile();
	nextProfile();
}


//calls get JSON for random user API
$.getJSON(randomUserAPI, dataOptions, getEmployeeInfo);

//calls functions to be run upon loading
searchbar();
loadScreen();





    