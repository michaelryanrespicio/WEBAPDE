var root = 'https://jsonplaceholder.typicode.com';

$(document).ready(function() {
	$.ajax({
	  url: root + '/posts/1',
	  method: 'GET'
	}).then(function(data) {
		$("#puname1").text(data.username)
		$("#ptitle1").text(data.title + " | ");
		$("#pbody1").text(data.body);
	  //console.log(data.body);
	});
});
