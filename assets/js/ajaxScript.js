console.log('Script Loaded');


$('#searchBtn').click( (e) => {
	e.preventDefault();

	// Getting Labels
	var cityName = $('#city').val();
	var city = $('.place');
	var temp = $('.temp');
	var weather = $('.weatherCondition');
	var weatherDes = $('.weatherDes');
	var date = $('.date');
	var icon = $('.icon');


	var cityName = cityName.toLowerCase();
	var token = "5f6aaa2f7afc7ec45bbbfe66d0d2457d";
	var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+token+"";

	var cardTitle = $('.card-title');

	$.ajax({
		url: url,
		method: "post",
		responseType: "json",
		success: function (data) {
			if (data.cod === 200) {
				$('.card-box').fadeIn(1000);
				city.html(data.name);
				weather.html(data.weather[0].main);
				weatherDes.html(data.weather[0].description);
				icon.attr("src", fetchIcon(data.weather[0].icon));
				temp.html(formatTemp(data.main.temp));
			}
		},
		error: function () {
			alert('City Not Found');
		},
	});

	// Converting F to C
	function formatTemp(temp) {
		tempC = Number(temp) - 273;
		tempC = tempC.toFixed(2) + "&deg;" ;
		return tempC;
	}

	// Fetching icon URL
	function fetchIcon(code) {
		var iconURL = "https://openweathermap.org/img/w/" + code + ".png";
		return iconURL;
	}
});