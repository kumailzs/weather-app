// DOM Selection

let feel = document.getElementById("feel");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let pret = document.getElementById("percipation");
let info = document.querySelector(".info");
let sta = document.querySelector(".status");
let load = document.getElementById("load");
let inp = document.getElementById("input");
let btn = document.getElementById("btn");

let [t1, t2, t3, t4, t5, t6, t7] = "";

let day_1 = document.getElementById("day_1");
let day_2 = document.getElementById("day_2");
let day_3 = document.getElementById("day_3");
let day_4 = document.getElementById("day_4");
let day_5 = document.getElementById("day_5");
let day_6 = document.getElementById("day_6");
let day_7 = document.getElementById("day_7");

let min_d1 = document.getElementById("min_d1");
let min_d2 = document.getElementById("min_d2");
let min_d3 = document.getElementById("min_d3");
let min_d4 = document.getElementById("min_d4");
let min_d5 = document.getElementById("min_d5");
let min_d6 = document.getElementById("min_d6");
let min_d7 = document.getElementById("min_d7");

let max_d1 = document.getElementById("max_d1");
let max_d2 = document.getElementById("max_d2");
let max_d3 = document.getElementById("max_d3");
let max_d4 = document.getElementById("max_d4");
let max_d5 = document.getElementById("max_d5");
let max_d6 = document.getElementById("max_d6");
let max_d7 = document.getElementById("max_d7");
let onetime = 0;

// Weather Data Fetch
async function weather(city) {
  try {
    let p = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    let res = await p.json();
    let {
      results: [{ latitude: lat, longitude: log, name, country }],
    } = res;
    let response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`
    );
    let data = await response.json();
    up_display(data, name, country);
  } catch (e) {
    if (e.message.includes("Cannot read properties of undefined")) {
      console.log("No Found");
    } else {
      console.log("Fetch Api Failed");
    }
  }
}

function one_time() {
  info.insertAdjacentHTML("afterbegin", '<h3 id="city"></h3>');
  info.insertAdjacentHTML("beforeend", '<h5 id="curr_day"></h5>');
  sta.insertAdjacentHTML("beforeend", '<h1 id="curr_temp"></h1>');
  sta.style.background = "url(assets/images/bg-today-large.svg)";
  sta.style.justifyContent = "space-between";
  load.hidden = "true";
  onetime = 1;
}

// Current Weather Display
function curr_weather_dis(data, name, country) {
  let city_name = document.getElementById("city");
  let curr_day = document.getElementById("curr_day");
  let curr_temp = document.getElementById("curr_temp");
  let {
    current: {
      temperature_2m: temp,
      apparent_temperature: feellike,
      relative_humidity_2m: humi,
      precipitation: prec,
      wind_speed_10m: win,
      time,
    },
  } = data;
  let {
    current_units: {
      temperature_2m: temp_u,
      apparent_temperature: feellike_u,
      relative_humidity_2m: humi_u,
      precipitation: prec_u,
      wind_speed_10m: win_u,
    },
  } = data;
  curr_temp.textContent = temp + temp_u;
  feel.textContent = feellike + feellike_u;
  humidity.textContent = humi + humi_u;
  wind.textContent = win + win_u;
  pret.textContent = prec + prec_u;
  city_name.textContent = `${name}, ${country}`;
  curr_day.textContent = time;
}

// Function that convert date into day
function date_to_day(v1, v2, v3, v4, v5, v6, v7) {
  t1 = new Date(v1).toLocaleDateString("en-US", { weekday: "short" });
  t2 = new Date(v2).toLocaleDateString("en-US", { weekday: "short" });
  t3 = new Date(v3).toLocaleDateString("en-US", { weekday: "short" });
  t4 = new Date(v4).toLocaleDateString("en-US", { weekday: "short" });
  t5 = new Date(v5).toLocaleDateString("en-US", { weekday: "short" });
  t6 = new Date(v6).toLocaleDateString("en-US", { weekday: "short" });
  t7 = new Date(v7).toLocaleDateString("en-US", { weekday: "short" });
}

function forecast_dis(data) {
  let {
    daily: { time, temperature_2m_min: tem },
  } = data;

  // Days of Forecast
  let [time_1, time_2, time_3, time_4, time_5, time_6, time_7] = time;
  date_to_day(time_1, time_2, time_3, time_4, time_5, time_6, time_7);
  day_1.textContent=t1;
  day_2.textContent=t2;
  day_3.textContent=t3;
  day_4.textContent=t4;
  day_5.textContent=t5;
  day_6.textContent=t6;
  day_7.textContent=t7;
  // Minimum temperature
  let [d1, d2, d3, d4, d5, d6, d7] = tem;

  min_d1.textContent = d1;
  min_d2.textContent = d2;
  min_d3.textContent = d3;
  min_d4.textContent = d4;
  min_d5.textContent = d5;
  min_d6.textContent = d6;
  min_d7.textContent = d7;

  // Maximum temperature
  let {
    daily: { temperature_2m_max: mtem },
  } = data;
  let [md1, md2, md3, md4, md5, md6, md7] = mtem;
  max_d1.textContent = md1;
  max_d2.textContent = md2;
  max_d3.textContent = md3;
  max_d4.textContent = md4;
  max_d5.textContent = md5;
  max_d6.textContent = md6;
  max_d7.textContent = md7;
}

// Display Update Function
function up_display(data, name, country) {
  if (onetime == 0) {
    one_time();
  }
  curr_weather_dis(data, name, country);
  forecast_dis(data);
}

btn.addEventListener("click", () => {
  if (inp.value == "") {
    return;
  }
  weather(inp.value);
});
inp.addEventListener("keypress", () => {
  if (inp.value == "") {
    return;
  }
  if (event.key == "Enter") {
    weather(inp.value);
  } else {
    return;
  }
});

// function sugges(){
//     if(onetime == 0){
//         suggest_bar.insertAdjacentHTML("beforeend","<p>Karachi</p>");
//         suggest_bar.insertAdjacentHTML("beforeend","<p>Lahore</p>");
//         suggest_bar.insertAdjacentHTML("beforeend","<p>Islamabad</p>");
//         onetime++
//     }
//     else{
//         return
//     }
// }

// inp.addEventListener("keypress",()=>{
//     if(event.key == "Enter"){
//         weather(inp.value)
//     }
//     else{
//         sugges()
//     }

// })
