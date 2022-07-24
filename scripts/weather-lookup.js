//Gather the users location
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        alert("Geolocation is not supported by your current browser");
    }
}
//This will lookup the user's location and find their coordinates
//Here is the api Key: 8a8a81fda9977409b7e63aeaed6e20d9
function getWeather(position) {
    //Create a variable that gathers the latitude info
    let lat = position.coords.latitude;
    //Create a variable that gathers the longitude info
    let long = position.coords.longitude;

    //Create a variable that  shows the nearest city closest to you
    // let location = position.coords.accuracy;
    
    //Enter the API key; this will take a few hours to activate. It was generated around 6AM, June 10
    let API_KEY = "8a8a81fda9977409b7e63aeaed6e20d9";
    let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    $.get(baseURL,function(res){
        let data = res.current;
        let temp = Math.floor(data.temp - 273);
        let condition = data.weather[0].description;

         // Display data on the web page
        //  $('#weather-area').html(`${location}`);
        $('#weather-temp').html(`${temp}°`);
        $('#weather-condition').html(condition);
    })
}
//Call getLocation function
getLocation();