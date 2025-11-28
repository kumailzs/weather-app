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

let hr1 = document.getElementById("hr1");
let hr2 = document.getElementById("hr2");
let hr3 = document.getElementById("hr3");
let hr4 = document.getElementById("hr4");
let hr5 = document.getElementById("hr5");
let hr6 = document.getElementById("hr6");
let hr7 = document.getElementById("hr7");
let hr8 = document.getElementById("hr8");

let time_1 = document.getElementById("time_1");
let time_2 = document.getElementById("time_2");
let time_3 = document.getElementById("time_3");
let time_4 = document.getElementById("time_4");
let time_5 = document.getElementById("time_5");
let time_6 = document.getElementById("time_6");
let time_7 = document.getElementById("time_7");
let time_8 = document.getElementById("time_8");

let i1= document.getElementById("i1");
let i2= document.getElementById("i2");
let i3= document.getElementById("i3");
let i4= document.getElementById("i4");
let i5= document.getElementById("i5");
let i6= document.getElementById("i6");
let i7= document.getElementById("i7");
let i8= document.getElementById("i8");

let im_1=document.getElementById("im_1");
let im_2=document.getElementById("im_2");
let im_3=document.getElementById("im_3");
let im_4=document.getElementById("im_4");
let im_5=document.getElementById("im_5");
let im_6=document.getElementById("im_6");
let im_7=document.getElementById("im_7");

let main = document.getElementById("main");
let hero = document.getElementById("hero");
let navbar = document.getElementById("navbar");

let nt_h;
let e_btn;
let error_hed;
let one = 0;
let one_t = 0;
let onetime = 0;


let err=0;

function notfound(){
  main.style.display="none";
  if(one==0){
    hero.insertAdjacentHTML("afterend",`<h2 id="nt_h">No Search result found!</h2>`)
   nt_h =document.getElementById("nt_h");
    one=1;
  }
  nt_h.style.margin="25px 0px";
  nt_h.style.textAlign="center"
}
function fetch_error() {
    main.style.display="none";
    hero.style.display="none";
    if(one_t==0){
      console.log("hello");
      navbar.insertAdjacentHTML("afterend",`<div id="error"></div>`);
      error_hed = document.getElementById("error");
      error_hed.style.display="flex";
      error_hed.style.flexDirection="column";
      error_hed.style.alignItems="center";
      error_hed.insertAdjacentHTML("afterbegin",`<button id="e_btn"> <img src="assets/images/icon-retry.svg"> Retry</btn>`)
      error_hed.insertAdjacentHTML("afterbegin",`<p>We couldn't connect to the server (API error). Please again in a few moments.</p>`)
      error_hed.insertAdjacentHTML("afterbegin",`<h1>Something went wrong</h1>`)
      error_hed.insertAdjacentHTML("afterbegin",`<img width="30" src="assets/images/icon-error.svg">`)
      e_btn= document.getElementById("e_btn");
      one_t=1;
    }
        e_btn.addEventListener("click",()=>{
          window.location.reload();
});

}

// Weather Data Fetch
async function weather(city) {
  try {
    let p = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    let resp = await p.json();
    let {
      results: [{ latitude: lat, longitude: log, name, country }],
    } = resp;
    let response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto&hourly=weathercode
&daily=weathercode`
    );
    let data = await response.json();
    err=undefined;
    up_display(data, name, country);
  } catch (e) {
    if (e.message.includes("Cannot read properties of undefined") || e.message.includes("Cannot destructure property 'Symbol(Symbol.iterator)")) {
      notfound();
      err=e;

    } else {
      console.log("Fetch Api Failed");
      fetch_error();
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

// Convert date into day function
function date_to_day(v) {
  return new Date(v).toLocaleDateString("en-US", { weekday: "short" });
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
  curr_temp.textContent = Math.floor(temp) + temp_u;
  feel.textContent = Math.floor(feellike) + feellike_u;
  humidity.textContent = humi + humi_u;
  wind.textContent = win + win_u;
  pret.textContent = prec + prec_u;
  city_name.textContent = `${name}, ${country}`;
  curr_day.textContent = `${date_to_day(time.split("T")[0])}, ${time.split("T")[0]}`
}


// Forecast Image Function
function forecast_img(value){

 if (value < 2) {
    return "assets/images/icon-sunny.webp";
} else if (value < 3) {
    return "assets/images/icon-partly-cloudy.webp";
} else if (value < 5) {
    return "assets/images/icon-overcast.webp";
} else if(value < 49){
    return "assets/images/icon-drizzle.webp"
} else if(value < 58){
    return "assets/images/icon-fog.webp"
} else if (value < 66) {
    return "assets/images/icon-rain.webp";
} else if (value < 76) {
    return "assets/images/icon-snow.webp";
} else if (value < 100) {
    return "assets/images/icon-storm.webp";
} else {
    
}
}
function forecast_dis(data) {
  let {
    daily: { time, temperature_2m_min: tem, weathercode:code },
  } = data;

  // Days of Forecast
  let[time_1,time_2,time_3,time_4,time_5,time_6,time_7]=time;
  let ar =[time_1,time_2,time_3,time_4,time_5,time_6,time_7].map((n)=>date_to_day(n));
  let [t1, t2, t3, t4, t5, t6, t7] = ar;
  day_1.textContent=t1;
  day_2.textContent=t2;
  day_3.textContent=t3;
  day_4.textContent=t4;
  day_5.textContent=t5;
  day_6.textContent=t6;
  day_7.textContent=t7;
  // Minimum temperature
  let [d1, d2, d3, d4, d5, d6, d7] = tem;

  min_d1.textContent = Math.floor(d1);
  min_d2.textContent = Math.floor(d2);
  min_d3.textContent = Math.floor(d3);
  min_d4.textContent = Math.floor(d4);
  min_d5.textContent = Math.floor(d5);
  min_d6.textContent = Math.floor(d6);
  min_d7.textContent = Math.floor(d7);

  // Maximum temperature
  let {
    daily: { temperature_2m_max: mtem },
  } = data;
  let [md1, md2, md3, md4, md5, md6, md7] = mtem;
  max_d1.textContent = Math.floor(md1);
  max_d2.textContent = Math.floor(md2);
  max_d3.textContent = Math.floor(md3);
  max_d4.textContent = Math.floor(md4);
  max_d5.textContent = Math.floor(md5);
  max_d6.textContent = Math.floor(md6);
  max_d7.textContent = Math.floor(md7);

let [c1,c2,c3,c4,c5,c6,c7]=code;
let arr =[c1,c2,c3,c4,c5,c6,c7].map((n)=> forecast_img(n));
let [img1,img2,img3,img4,img5,img6,img7]=arr;
im_1.src=img1;
im_2.src=img2;
im_3.src=img3;
im_4.src=img4;
im_5.src=img5;
im_6.src=img6;
im_7.src=img7;

}

function hr_forecast_dis(data){
  let {hourly_units:{temperature_2m:unit},hourly:{time,temperature_2m:[t1,t2,t3,t4,t5,t6,t7,t8],weathercode:wc}}=data;
  // Hourly Temperature
  hr1.textContent= Math.floor(t1)+unit;
  hr2.textContent= Math.floor(t2)+unit;
  hr3.textContent= Math.floor(t3)+unit;
  hr4.textContent= Math.floor(t4)+unit;
  hr5.textContent= Math.floor(t5)+unit;
  hr6.textContent= Math.floor(t6)+unit;
  hr7.textContent= Math.floor(t7)+unit;
  hr8.textContent= Math.floor(t8)+unit;

  // Hourly Time
  time_1.textContent=time[0].split("T")[1]; 
  time_2.textContent=time[1].split("T")[1];
  time_3.textContent=time[2].split("T")[1]; 
  time_4.textContent=time[3].split("T")[1];
  time_5.textContent=time[4].split("T")[1]; 
  time_6.textContent=time[5].split("T")[1];
  time_7.textContent=time[6].split("T")[1]; 
  time_8.textContent=time[7].split("T")[1]; 

  let arr=[wc[0],wc[1],wc[2],wc[3],wc[4],wc[5],wc[6],wc[7]].map((n)=> forecast_img(n));
  let [img1,img2,img3,img4,img5,img6,img7,img8]=arr;
  i1.src=img1;
  i2.src=img2;
  i3.src=img3;
  i4.src=img4;
  i5.src=img5;
  i6.src=img6;
  i7.src=img7;
  i8.src=img8;

}

// Display Update Function
function up_display(data, name, country) {
  if (onetime == 0) {
    one_time();
  }
  curr_weather_dis(data, name, country);
  forecast_dis(data);
  hr_forecast_dis(data);
}

btn.addEventListener("click", async () => {
  if (inp.value == "") {
    return;
  }
  await weather(inp.value);
  if(err==undefined){
  main.style.display="grid";
  nt_h.style.display="none"
  }
   if (err.message.includes("Cannot read properties of undefined") || err.message.includes("Cannot destructure property 'Symbol(Symbol.iterator)")) {
  nt_h.style.display="block"; 
    } 
});
inp.addEventListener("keypress", () => {
  if (inp.value == "") {
    return;
  }
  if (event.key == "Enter") {
    weather(inp.value);
   if(err==undefined){
  main.style.display="grid";
  nt_h.style.display="none"
   if (err.message.includes("Cannot read properties of undefined") || err.message.includes("Cannot destructure property 'Symbol(Symbol.iterator)")) {
  nt_h.style.display="block"; 
    } 
  }
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
