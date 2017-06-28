var randomUserAPI = 'https://randomuser.me/api/?results=12&nat=us';
var dataOptions = {
	dataType: 'json'
};

function getEmployeeInfo(data) {
	var employeeHTML;
	$.each (data.results, function (i, profile) {
		employeeHTML = '<div class="employee-profile">';
		employeeHTML += '<img src="' + profile.picture.thumbnail + '">';
		employeeHTML += '<div class="contact-info">';
		employeeHTML += '<h3>'+ profile.name.first + " " + profile.name.last + '</h3>';
		employeeHTML += '<p>' + profile.email + '</p>';
		employeeHTML += '<p>' + profile.location.city + '</p>';
		employeeHTML += '</div></div>';
		$(".employees").append(employeeHTML);
	});
}


$.getJSON(randomUserAPI, dataOptions, getEmployeeInfo);


    