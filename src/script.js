//In your project, display the current date and time
//using JavaScript: Tuesday 16: 00

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}

let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `${day} </br> ${hour}:${minute}`;

//Add a search engine, when searching for a city
//(i.e.Paris), display the city name on the page
//after the user submits the form.

let searchBar = document.querySelector("#search-bar");
let h1 = document.querySelector("h1");
searchBar.addEventListener("submit", handleSubmit);

//make the search engine actually connected to real data input:

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}°C`;
  h1.innerHTML = response.data.name;

  document.querySelector("#temp-max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
}

//make another button to show current location

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${units}`;
  axios.get(url).then(showWeather);
}

function getCurrentWeather() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentTemp = document.querySelector("#current-temp");
let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
let units = "units=metric";

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentWeather);

searchBar.addEventListener("submit", handleSubmit);

search("New York");
