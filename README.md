# ☁️ Skye — Weather App

A clean, responsive weather app built with plain HTML, CSS, and JavaScript. Powered by the OpenWeatherMap API.

**Live on GitHub Pages** — no backend, no server needed!

---

## 📁 Project Structure

```
weather-app/
├── index.html   ← The page structure
├── style.css    ← All styling (responsive, glassmorphism design)
├── script.js    ← API calls + weather display logic
└── README.md
```

---

## 🚀 Getting Started

### Step 1 — Get a free API key

1. Go to [https://openweathermap.org](https://openweathermap.org)
2. Click **Sign Up** (it's free)
3. After signing in, go to **API Keys** tab in your account
4. Copy your default key (or create a new one)
5. ⚠️ Wait ~10 minutes for the key to activate

### Step 2 — Add your API key

Open `script.js` and replace line 7:

```js
// Before
const API_KEY = "YOUR_API_KEY_HERE";

// After
const API_KEY = "abc123youractualkey456";
```

### Step 3 — Run it

Just open `index.html` in your browser. That's it — no server needed!

---

## 🌐 Host on GitHub Pages

1. Push this folder to a GitHub repo
2. Go to repo **Settings → Pages**
3. Under **Source**, select `main` branch → `/ (root)`
4. Click **Save**
5. Your app will be live at `https://YOUR_USERNAME.github.io/REPO_NAME`

---

## ✨ Features

- 🔍 Search any city in the world
- 🌡️ Temperature, feels like, min/max
- 💧 Humidity, wind speed, visibility, pressure
- 🌅 Sunrise & sunset times (in the city's local time!)
- 📱 Fully responsive — works on mobile, tablet, and desktop
- ⚡ Auto-loads Hyderabad weather on startup

---

## 🧠 What you learn from this

| Concept | Where it appears |
|---|---|
| `fetch()` & Promises | `fetchWeather()` in script.js |
| `async / await` | How the API call is handled |
| Error handling | `try/catch` block |
| DOM manipulation | `document.getElementById().textContent` |
| Responsive CSS | `@media` queries in style.css |
| API keys & URLs | `BASE_URL` + `API_KEY` in script.js |

---

## 📌 Next Steps (Ideas)

- [ ] Add a 5-day forecast (needs a different API endpoint)
- [ ] Add dark/light mode toggle
- [ ] Save last searched city to localStorage
- [ ] Add geolocation ("use my location" button)
- [ ] Then build the mobile version with React Native!
