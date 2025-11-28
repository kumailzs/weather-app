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
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto&hourly=weathercode
&daily=weathercode`
    );
    let data = await response.json();
    console.log(data)
  } catch (e) {
    if (e.message.includes("Cannot read properties of undefined")) {
      console.log("No Found");
    } else {
      console.log("Fetch Api Failed");
    }
  }
}
weather("karachi")


