const input = document.querySelector("input");
const btn = document.querySelector("button");

const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");

const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&APPID=e370a486d73c22355ac21d93f35a2ca0";
const units = "&units=metric";
let city;
let url;

const getWeather = () => {
  city = !input.value ? "Warsaw" : input.value;
  url = apiLink + city + apiKey + units;

  axios
    .get(url)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      const status = Object.assign({}, ...res.data.weather);

      cityName.textContent = res.data.name;
      weather.textContent = status.main;
      temperature.textContent = Math.floor(temp) + "°C";
      humidity.textContent = hum + "%";

      warning.textContent = "Text";
      warning.style.color = "transparent";
      input.value = "";

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute("src", "./images/thunderstorm.svg");
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute("src", "./images/drizzle.svg");
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute("src", "./images/rain.svg");
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute("src", "./images/ice.svg");
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute("src", "./images/fog.svg");
      } else if (status.id === 800) {
        photo.setAttribute("src", "./images/sun.svg");
      } else if (status.id >= 800 && status.id < 900) {
        photo.setAttribute("src", "./images/cloud.svg");
      } else {
        photo.setAttribute("src", "./images/unknown.svg");
      }
    })
    .catch(() => {
      warning.textContent = "Enter correct city name";
      warning.style.color = "red";
    });
};

const enterCheck = (event) => {
  if (event.keyCode === 13) {
    getWeather();
  }
};

getWeather();
btn.addEventListener("click", getWeather);
input.addEventListener("keyup", enterCheck);
