const API_KEY = 'e59f9d123dd4afb704b335380b98a978'; 

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const weatherDiv = document.getElementById('weather');

const locationText = document.getElementById('location');
const tempText = document.getElementById('temp');
const descText = document.getElementById('desc');
const humidityText = document.getElementById('humidity');
const windText = document.getElementById('wind');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  }
});

geoBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  fetchWeather(url);
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      updateWeather(data);
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

function updateWeather(data) {
  locationText.textContent = `${data.name}, ${data.sys.country}`;
  tempText.textContent = Math.round(data.main.temp);
  descText.textContent = data.weather[0].description;
  humidityText.textContent = data.main.humidity;
  windText.textContent = (data.wind.speed * 3.6).toFixed(1);
  weatherDiv.classList.remove('hidden');
}
