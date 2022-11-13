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

currentTime.innerHTML = `${day} ${hour}:${minute}`;

//Add a search engine, when searching for a city
//(i.e.Paris), display the city name on the page
//after the user submits the form.

let searchBar = document.querySelector("#search-bar");
let h1 = document.querySelector("h1");
searchBar.addEventListener("submit", handleSubmit);

// convert to fahrenheit/celsius with link
function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let farTemp = document.querySelector("#current-temp");
  farTemp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temp");
  celsiusTemp.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

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

//forecast api call

function getForecast(coords) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  h1.innerHTML = response.data.name;

  celsiusTemperature = Math.round(response.data.main.temp);

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
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].main}@2x.png`
    );

  getForecast(response.data.coord);
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

//forecast

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2 day">
          <div class="dayOfWeek">${day}</div>
          <div class="highTemperature">70°F</div>

          <div class="lowTemperature">58°F</div>

          <div class="weatherDesctiption">Partly Cloudy</div>

          <div class="emoji">⛅️</div>
          </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//make active and non active c and f buttons:

let celsiusTemperature = null;

let currentTemp = document.querySelector("#current-temp");

let units = "units=metric";
let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentWeather);

searchBar.addEventListener("submit", handleSubmit);

search("New York");
