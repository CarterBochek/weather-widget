function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherAndLocation);
    } else {
        alert("Geolocation is not supported by your current browser");
    }
}

function getWeatherAndLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let API_KEY = "8a8a81fda9977409b7e63aeaed6e20d9";
    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    let forecastURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=${API_KEY}`;

    $.get(weatherURL, function (weatherRes) {
        let temp = Math.floor(weatherRes.main.temp - 273);
        let condition = weatherRes.weather[0].description;

        $('#weather-temp').html(`${temp}°C`);
        $('#weather-condition').html(condition);

        $.get(forecastURL, function (forecastRes) {
            let forecastData = forecastRes.daily;
            let forecastList = document.getElementById('forecast-list');
            forecastList.innerHTML = '';

            for (let i = 1; i <= 7; i++) {
                let forecastItem = document.createElement('li');
                let date = new Date(forecastData[i].dt * 1000);
                let day = date.toLocaleDateString('en-US', { weekday: 'long' });
                let forecastTemp = Math.floor(forecastData[i].temp.day - 273);
                let forecastCondition = forecastData[i].weather[0].description;

                forecastItem.innerHTML = `${day}: ${forecastTemp}° - ${forecastCondition}`;
                forecastList.appendChild(forecastItem);
            }
        });

        let reverseGeocodingURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`;

        $.get(reverseGeocodingURL, function (locationRes) {
            let location = locationRes[0].name + ', ' + locationRes[0].country;
            $('#location').html(location);
        });
    });
}

getLocation();
