const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = "06d22220d45b5e5784610693cc20e8fb";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
    return response.json();
    })
    .then(function(json) {
       const temperature = json.main.temp;
       const place = json.name;
       weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const coordsObj = {
    latitude,
    longitude
};
saveCoords(coordsObj);
getWeather(latitude, longitude);
}

function handleGeoError(position) {
    console.log("Cant access your location");
    }

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    console.log("dd");
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}



function init() {

loadCoords();
}

init();