const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const weatherCond = document.getElementById("condition");
const temperature = document.getElementById("temp");
const timeZone = document.getElementById("timeZone");
const description = document.getElementById("description");
const warning = document.getElementById("warning");
const toggleBtn = document.getElementById("toggleTemp");

let currentTempC = null;
let isCelsius = true;

// 🌡️ Convert
function toF(celsius) {
  return (celsius * 9 / 5) + 32;
}

// 🎨 Background
export function setWeatherBackground(condition) {
  const body = document.body;
  body.className = "";

  const cond = condition.toLowerCase();

  if (cond.includes("rain")) {
    body.classList.add("rainy");
  } else if (cond.includes("cloud")) {
    body.classList.add("cloudy");
  } else {
    body.classList.add("sunny");
  }
}

// 🌦️ MAIN FUNCTION
export async function weather() {
  try {
    const city = cityInput.value.trim();

    if (!city) {
      warning.textContent = "Enter a City!";
      return;
    }

    warning.textContent = "";

    const date1 = new Date().toISOString().split("T")[0];
    const API_KEY = "QK2DKCCTHH3LSU8KWRY96BS6C";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // 🌡️ store temp
    currentTempC = data.currentConditions.temp;
    isCelsius = true;

    // 🖥️ display
    cityName.textContent = `CITY: ${data.resolvedAddress}`;
    temperature.textContent = `TEMP: ${currentTempC} °C`;
    weatherCond.textContent = `CONDITION: ${data.currentConditions.conditions}`;
    timeZone.textContent = `TIME ZONE: ${data.timezone}`;
    description.textContent = `DESCRIPTION: ${data.description}`;

    // 🎨 background
    setWeatherBackground(data.currentConditions.conditions);

  } catch (error) {
    console.log(error);
    warning.textContent = "Something went wrong!";
  }
}

// 🔁 Toggle temperature
toggleBtn.addEventListener("click", () => {
  if (currentTempC === null) return;

  if (isCelsius) {
    temperature.textContent = `TEMP: ${toF(currentTempC).toFixed(1)} °F`;
    isCelsius = false;
  } else {
    temperature.textContent = `TEMP: ${currentTempC} °C`;
    isCelsius = true;
  }
});