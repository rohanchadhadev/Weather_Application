// ─────────────────────────────────────────────────────────────
//  IMPORTANT: Replace the value below with your own API key.
//  Get one free at: https://openweathermap.org/api
//  It takes ~10 minutes to activate after signup.
// ─────────────────────────────────────────────────────────────
const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ─── DOM Elements ─────────────────────────────────────────────
const cityInput   = document.getElementById("cityInput");
const searchBtn   = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const errorBox    = document.getElementById("errorBox");
const errorMsg    = document.getElementById("errorMsg");
const loadingEl   = document.getElementById("loading");
const searchHint  = document.getElementById("searchHint");

// ─── Weather Emoji Map ─────────────────────────────────────────
// Maps OpenWeatherMap condition codes to emojis
function getWeatherEmoji(code) {
  if (code >= 200 && code < 300) return "⛈️";   // Thunderstorm
  if (code >= 300 && code < 400) return "🌦️";   // Drizzle
  if (code >= 500 && code < 600) return "🌧️";   // Rain
  if (code >= 600 && code < 700) return "❄️";   // Snow
  if (code >= 700 && code < 800) return "🌫️";   // Mist/Fog
  if (code === 800)               return "☀️";   // Clear sky
  if (code === 801)               return "🌤️";   // Few clouds
  if (code === 802)               return "⛅";   // Scattered clouds
  if (code >= 803)               return "☁️";   // Overcast
  return "🌡️";
}

// ─── Format Unix Timestamp → "6:30 AM" ────────────────────────
function formatTime(unixTimestamp, timezoneOffset) {
  // OpenWeatherMap gives UTC timestamp + timezone offset in seconds
  const localMs = (unixTimestamp + timezoneOffset) * 1000;
  const date = new Date(localMs);
  const hours   = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm    = hours >= 12 ? "PM" : "AM";
  const h12     = hours % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

// ─── Format Today's Date ───────────────────────────────────────
function formatDate() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month:   "short",
    day:     "numeric"
  });
}

// ─── Show / Hide helpers ───────────────────────────────────────
function showLoading() {
  loadingEl.classList.add("show");
  weatherCard.classList.remove("show");
  errorBox.classList.remove("show");
  searchHint.style.display = "none";
}

function hideLoading() {
  loadingEl.classList.remove("show");
}

function showError(message) {
  hideLoading();
  errorMsg.textContent = message;
  errorBox.classList.add("show");
  weatherCard.classList.remove("show");
  searchHint.style.display = "block";
}

function showCard() {
  hideLoading();
  weatherCard.classList.add("show");
  errorBox.classList.remove("show");
}

// ─── Main: Fetch Weather Data ──────────────────────────────────
async function fetchWeather(city) {
  if (!city.trim()) return;

  // Check if API key has been set
  if (API_KEY === "YOUR_API_KEY_HERE") {
    showError("Please add your OpenWeatherMap API key in script.js");
    return;
  }

  showLoading();

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    // Handle non-OK responses (404 = city not found, 401 = bad key)
    if (!response.ok) {
      if (response.status === 404) {
        showError(`"${city}" not found. Check the spelling and try again.`);
      } else if (response.status === 401) {
        showError("Invalid API key. Check your key in script.js.");
      } else {
        showError("Something went wrong. Please try again.");
      }
      return;
    }

    const data = await response.json();
    displayWeather(data);

  } catch (err) {
    // Network error (no internet, etc.)
    showError("Network error. Check your internet connection.");
    console.error("Fetch error:", err);
  }
}

// ─── Display Weather Data in the Card ─────────────────────────
function displayWeather(data) {
  // Location
  document.getElementById("cityName").textContent    = data.name;
  document.getElementById("countryName").textContent = data.sys.country;
  document.getElementById("dateToday").textContent   = formatDate();

  // Main temp + description
  const code = data.weather[0].id;
  document.getElementById("weatherEmoji").textContent = getWeatherEmoji(code);
  document.getElementById("tempValue").textContent    = Math.round(data.main.temp);
  document.getElementById("weatherDesc").textContent  = data.weather[0].description;
  document.getElementById("feelsLike").textContent    = Math.round(data.main.feels_like);

  // Stats
  document.getElementById("humidity").textContent  = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${Math.round(data.wind.speed)} m/s`;
  document.getElementById("visibility").textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : "N/A";
  document.getElementById("pressure").textContent  = `${data.main.pressure} hPa`;

  // Sunrise / Sunset (converted to local city time)
  const tz = data.timezone;
  document.getElementById("sunrise").textContent = formatTime(data.sys.sunrise, tz);
  document.getElementById("sunset").textContent  = formatTime(data.sys.sunset, tz);

  // Min / Max
  document.getElementById("tempMin").textContent = `${Math.round(data.main.temp_min)}°C`;
  document.getElementById("tempMax").textContent = `${Math.round(data.main.temp_max)}°C`;

  showCard();
}

// ─── Event Listeners ───────────────────────────────────────────

// Click the Go button
searchBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value);
});

// Press Enter in the input
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchWeather(cityInput.value);
});

// Auto-search Hyderabad on load as a demo
window.addEventListener("load", () => {
  cityInput.value = "Hyderabad";
  fetchWeather("Hyderabad");
});
