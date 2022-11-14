//display the current date and time
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//search engine

let searchBar = document.querySelector("#search-bar");
let h1 = document.querySelector("h1");
searchBar.addEventListener("submit", handleSubmit);

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

//today's forecast

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  h1.innerHTML = response.data.name;

  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("#temp-max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°F`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°F`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed * 0.62
  )} mph`;
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

//show current location button

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${units}`;
  axios.get(url).then(showWeather);
}

function getCurrentWeather() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

//daily forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col day">
          <div class="dayOfWeek">${formatDay(forecastDay.dt)}</div>
          <div class="highTemperature">${Math.round(
            forecastDay.temp.max
          )}°</div>

          <div class="lowTemperature">${Math.round(forecastDay.temp.min)}°</div>

          <div class="weatherDescription">${
            forecastDay.weather[0].description
          }</div>

          <img src = "http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt = ""
          id="icon"
          width="55"
          />
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentTemp = document.querySelector("#current-temp");

let units = "units=imperial";
let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentWeather);

searchBar.addEventListener("submit", handleSubmit);

search("New York");
