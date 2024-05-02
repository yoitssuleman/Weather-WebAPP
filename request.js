const key = //your api key here
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#card");
  const CityInput = document.querySelector("#CityName");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const City = CityInput.value.toLowerCase();
    GetData(City)
  })});
async function GetData(city) {
  try{ const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`);
  const data = await response.json();
  HandleData(data);}
  catch{(error => {
        console.error('Error:', error);
      })};
  }

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
if (parseInt(code) === 1003 || parseInt(code) === 1006 || parseInt(code) === 1009) {
  document.getElementById("icon").style.backgroundImage = "url('assets/cloudy.jpeg')";
}

// Rainy
if ((parseInt(code) >= 1030 && parseInt(code) <= 1201) || (parseInt(code) >= 1240 && parseInt(code) <= 1264)) {
  document.getElementById("icon").style.backgroundImage = "url('assrts/rain.jpeg')";
}

// Snowy
else if (parseInt(code) === 1066 || (parseInt(code) >= 1114 && parseInt(code) <= 1225)) {
  document.getElementById("icon").style.backgroundImage = "url('assets/snowy.jpeg')";
}

// Thunderstorms (optional)
else if ((parseInt(code) === 1087) || (parseInt(code) >= 1273 && parseInt(code) <= 1282)) {
  document.getElementById("icon").style.backgroundImage = "url('assets/thunder.jpeg')";
}
}




 
