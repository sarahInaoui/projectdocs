const trains = [
  { id:"IC04", bestemming:"Gent-St-Pieters", tijd:"16:01", vertraging:"+8", perron:"10" },
  { id:"S70", bestemming:"Amsterdam", tijd:"16:15", vertraging:"", perron:"4" },
  { id:"IC22", bestemming:"Gent-Dampoort", tijd:"16:30", vertraging:"+8", perron:"2" },
  { id:"IC37", bestemming:"Brugge", tijd:"16:47", vertraging:"+1", perron:"3" },
  { id:"IC05", bestemming:"Hasselt", tijd:"17:27", vertraging:"", perron:"9" },
  { id:"S71", bestemming:"Rotterdam", tijd:"17:35", vertraging:"", perron:"1" }
];

const loader = document.getElementById("loader");
const content = document.querySelector(".content");
const tableBody = document.getElementById("tableBody");
const weatherEl = document.getElementById("weather");
const timeEl = document.getElementById("live-time");
const stationSelect = document.getElementById("stationSelect");
const searchInput = document.getElementById("searchInput");
const delayFilter = document.getElementById("delayFilter");
const toggleBtn = document.getElementById("themeToggle");

// LocalStorage voorkeuren
const savedTheme = localStorage.getItem("theme"); if(savedTheme==="light") document.body.classList.add("light");
const savedStation = localStorage.getItem("station"); if(savedStation) stationSelect.value = savedStation;

// Loader
function showLoader(duration=1500){loader.style.display="flex";content.style.display="none";setTimeout(()=>{loader.style.display="none";content.style.display="block";renderTable();updateWeatherAndMap();},duration);}
window.addEventListener("load",()=>showLoader());

// Clock
function updateClock(){const now=new Date();const d=["ZO","MA","DI","WO","DO","VR","ZA"][now.getDay()];const m=["JAN","FEB","MRT","APR","MEI","JUN","JUL","AUG","SEP","OKT","NOV","DEC"][now.getMonth()];timeEl.textContent=`${d} ${now.getDate()} ${m} ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;}
setInterval(updateClock,1000);updateClock();

// Table
function renderTable(){
  tableBody.innerHTML="";
  trains.forEach(t=>{
    const row=document.createElement("tr");
    row.classList.add(t.vertraging?"tr-vertraagd":"tr-stipt");
    row.innerHTML=`<td>${t.id}</td><td>${t.bestemming}</td><td>${t.tijd}</td><td class="${t.vertraging?'vertraging':''}">${t.vertraging}</td><td>${t.perron}</td>`;
    tableBody.appendChild(row);
  });
}

// Filter
function filterTable(){
  const searchVal=searchInput.value.toLowerCase();
  const delayVal=delayFilter.value;
  document.querySelectorAll("#trainTable tbody tr").forEach(row=>{
    const text=row.textContent.toLowerCase();
    const hasDelay=row.querySelector(".vertraging")?.textContent.trim()!=="";
    row.style.display=(text.includes(searchVal) && (delayVal==="all" || (delayVal==="delayed" && hasDelay) || (delayVal==="on-time" && !hasDelay)))?"":"none";
  });
}
searchInput.addEventListener("input",filterTable);
delayFilter.addEventListener("change",filterTable);

// Theme toggle
toggleBtn.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  toggleBtn.textContent=document.body.classList.contains("light")?"☀️":"🌙";
  localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark");
});

// Map + Weather
let map; const weatherCache={};
async function updateWeatherAndMap(){
  const [lat,lon]=stationSelect.value.split(",");
  localStorage.setItem("station",stationSelect.value);
  if(!map){map=L.map('map').setView([lat,lon],10);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);}
  else map.setView([lat,lon],10);

  const key=`${lat},${lon}`;
  if(weatherCache[key]){showWeather(weatherCache[key]);return;}
  try{
    const res=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data=await res.json();weatherCache[key]=data;showWeather(data);
  }catch{weatherEl.textContent="Weer niet beschikbaar";}
}
stationSelect.addEventListener("change",updateWeatherAndMap);

function showWeather(data){
  const w=data.current_weather;
  weatherEl.textContent=`🌡️ ${Math.round(w.temperature)}°C | 💨 ${Math.round(w.windspeed)} km/u`;
  weatherEl.dataset.tooltip=`Laatste update: ${new Date().toLocaleTimeString()}`;
}

// Auto-update (simulatie)
setInterval(()=>{
  trains.forEach(t=>{if(Math.random()<0.3)t.vertraging=Math.random()<0.5?"":`+${Math.floor(Math.random()*10)+1}`;});
  renderTable();
},60000);
