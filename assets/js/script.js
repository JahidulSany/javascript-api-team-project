// Weather API call for getting the City Name
let apiKey = '2e63d9aadc65efaf2637aa107b187327';

const getCoordinates = (city) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) {
        throw new Error('City not found.');
      }
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    });
};

const getWeatherData = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
  ).then((res) =>
    res.json().then((data) => {
      return data;
    }),
  );
};

const fetchWeatherData = (city) => {
  getCoordinates(city)
    .then(({ lat, lon }) => {
      return getWeatherData(lat, lon);
    })
    .then((weatherData) => {
      return showWeatherData(weatherData);
    })
    .catch((error) => {
      const weatherContainer = document.getElementById('weatherContainer');
      weatherContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
    });
};

const showWeatherData = (data) => {
  // get the main weather container
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.innerHTML = '';

  const weatherDetailsEl = document.createElement('div');

  weatherDetailsEl.classList.add('weatherDetailsEl');

  weatherDetailsEl.innerHTML = `
        <div class="bg-info p-3 rounded-1 my-2">
            <span class="fw-bolder fs-3">Now</span>
            <h2 class="fw-bolder fs-1 my-2">${data.main.temp}°C</h2>
            <h4>Feels Like: ${data.main.feels_like}°C</h4>
            <p class="text-uppercase">${data.weather[0].description}</p>
        </div>
        <div class="weather-data-container bg-primary p-3 rounded-1">
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center g-4">
                    <div class="col-sm-6">
                        <h4>Wind</h4>
                        <p class="text-white">Wind Speed</p>
                        <big>${data.wind.speed} meter/sec</big>
                    </div>
                    <div class="col-sm-6">
                        <h4>Tamperature</h4>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p>Min Temp</p>
                                <big>${data.main.temp_min}°C</big>
                            </div>
                            <div>
                                <p>Max Temp</p>
                                <big>${data.main.temp_max}°C</big>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h4>Humidity</h4>
                        <big>${data.main.humidity} %</big>
                    </div>
                    <div class="col-sm-6">
                        <h4>Pressure</h4>
                        <big>${data.main.pressure} hPa</big>
                    </div>
                    <div class="col-sm-6">
                        <h4>Visibility</h4>
                        <big>${data.visibility} km</big>
                    </div>
                    <div class="col-sm-6">
                        <h4>Sunrise and Sunset</h4>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p>Sunrise</p>
                                <big>${formatTime(data.sys.sunrise, data.timezone)}
                                </big>
                            </div>
                            <div>
                                <p>Sunset</p>
                                <big>${formatTime(data.sys.sunset, data.timezone)}</big>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  weatherContainer.appendChild(weatherDetailsEl);
};

const handleUserInput = () => {
  // Get the input box container
  const inputEl = document.getElementById('floatingInput');
  const city = inputEl.value.trim();

  // Empty validation
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  fetchWeatherData(city);

  // Clean up input
  inputEl.value = '';
};

// Format time
const formatTime = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);

  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
