const temperatureEl = document.getElementById("temp");
const windSpeedEl = document.getElementById("wind");

const temp = parseFloat(temperatureEl.textContent);
const speed = parseFloat(windSpeedEl.textContent);

function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

const windChillEl = document.getElementById("windChill");

if (temp <= 10 && speed > 4.8) {
  windChillEl.textContent = calculateWindChill(temp, speed) + " °C";
} else {
  windChillEl.textContent = "N/A";
}


// Footer year & last modified
const getYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

const year = new Date().getFullYear();
getYear.textContent = year;

lastModified.textContent = `Last modified: ${document.lastModified}`;
