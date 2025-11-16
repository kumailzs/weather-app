// DOM Selection

let feel = document.getElementById("feel");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let pret = document.getElementById("percipation");
let info = document.querySelector(".info");
let sta = document.querySelector(".status");
let load = document.getElementById("load")
let inp = document.getElementById("input");
let btn = document.getElementById("btn");
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
function up_display(data, name, country) {
  if (onetime == 0) {
    info.insertAdjacentHTML("afterbegin", '<h3 id="city"></h3>');
    info.insertAdjacentHTML("beforeend", '<h5 id="curr_day"></h5>');
    sta.insertAdjacentHTML("beforeend", '<h1 id="curr_temp"></h1>');
    sta.style.background="url(assets/images/bg-today-large.svg)";
    sta.style.justifyContent="space-between";
    load.hidden="true"
    onetime = 1;
  }
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
