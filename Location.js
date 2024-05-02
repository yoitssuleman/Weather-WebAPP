// Gets location from your machine using your IP 
const ipkey = // your api key here
$.getJSON(`https://ipgeolocation.abstractapi.com/v1/?api_key=${ipkey}`, function(data) {
    let MainLocation = data.city;
    function GetData(city) {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`)
          .then(response => response.json())
          .then(data => {
          HandleData(data);
           })
          .catch(error => {
            console.error('Error:', error);
          });
        }
    GetData(MainLocation);

    function HandleData(data){

        const { location: { name }, current:{temp_c,humidity,feelslike_c,condition:{code,text,icon}}} = data;
        document.getElementById("celsius").innerHTML =`Temprature: ${temp_c}°C`;
        document.getElementById("feels").innerHTML =`Feels like: ${feelslike_c}°C`;
        document.getElementById("humidity").innerHTML = `Humidity: ${humidity}%`;
        document.getElementById("city").innerHTML = name.toUpperCase();
        document.getElementById("text").innerHTML = text;
        // handle img change
// Clear/Sunny
if (parseInt(code) === 1000) {
    document.getElementById("icon").style.backgroundImage = "url('assets/sunny.jpeg')";
}

// Cloudy/Overcast
else if (parseInt(code) === 1003 || parseInt(code) === 1006 || parseInt(code) === 1009) {
    document.getElementById("icon").style.backgroundImage = "url('assets/cloudy.jpeg')";
}

// Rainy
else if ((parseInt(code) >= 1030 && parseInt(code) <= 1201) || (parseInt(code) >= 1240 && parseInt(code) <= 1264)) {
    document.getElementById("icon").style.backgroundImage = "url('assets/rain.jpeg')";
}

// Snowy
else if (parseInt(code) === 1066 || (parseInt(code) >= 1114 && parseInt(code) <= 1225)) {
    document.getElementById("icon").style.backgroundImage = "url('assets/snowy.jpeg')";
}

else if ((parseInt(code) === 1087) || (parseInt(code) >= 1273 && parseInt(code) <= 1282)) {
    // Code for Thunderstorms
    document.getElementById("icon").style.backgroundImage = "url('assets/thunder.jpeg')";
}
}});
