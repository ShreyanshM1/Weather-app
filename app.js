let url = "https://geocoding-api.open-meteo.com/v1/search?count=1&name=";

let btn = document.querySelector("button");

let div = document.createElement("div");
let box = document.querySelector(".box");
div.classList.add("box2");
box.appendChild(div);

btn.addEventListener("click", async () => {
  const inp = document.querySelector("input");
  let city = inp.value;
  div.textContent = "Loading...";
  let cityArr = await getLocation(city);
  console.log(cityArr);
  if(!cityArr || !cityArr.results){
    div.innerText = "";
    let err = document.createElement('p');
    err.innerText = "City not found";
    div.appendChild(err);
  }
  else{
    let latitude = cityArr.results[0].latitude;
    let longitude = cityArr.results[0].longitude;
  
    let cityCurrent = await getWeather(latitude,longitude);
    let humidity = cityCurrent.relative_humidity_2m;
    let temp = cityCurrent.temperature_2m;
    let time = cityCurrent.time;
    let wind_speed = cityCurrent.wind_speed_10m;
    
  
    div.innerHTML = "";
    let humidityPara = document.createElement("p");
    let tempPara = document.createElement("p");
    let timePara = document.createElement("p");
    let windPara = document.createElement("p");
  
    humidityPara.textContent = `Humidity : ${humidity}`;
    tempPara.textContent = `Temperature : ${temp}`;
    timePara.textContent = `Time : ${time}`;
    windPara.textContent = `Wind Speed : ${wind_speed}`;
    div.appendChild(humidityPara);
    div.appendChild(tempPara);
    div.appendChild(timePara);
    div.appendChild(windPara);
  }
  
});

async function getWeather(latitude, longitude) {
  try {
    let url2 =
      "https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&latitude=" +
      latitude +
      "&longitude=" +
      longitude;
    let res = await axios.get(url2);
    return res.data.current;
  } catch (e) {
    return null;
  }
}

async function getLocation(city) {
  try {
    let res = await axios.get(`${url}${city}`);
    return res.data;
  } catch (e) {
    return null;
  }
}
